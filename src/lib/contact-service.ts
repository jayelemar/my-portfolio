import { createHash, randomUUID } from "node:crypto";
import { Redis } from "@upstash/redis";
import type { ContactSubmission } from "./contact-schema";
import { ContactApiError } from "./contact-http";

function hashIdentifier(value: string) {
  return createHash("sha256").update(value).digest("hex");
}
function rateKey(scope: string, identifier: string) {
  return `contact:rate:${scope}:${identifier}`;
}
async function consumeLimit(
  redis: Redis,
  key: string,
  limit: number,
  windowSeconds: number,
) {
  const result = await redis.eval<string[], number>(
    `local current = redis.call("INCR", KEYS[1])
     if current == 1 then redis.call("EXPIRE", KEYS[1], ARGV[1]) end
     if current > tonumber(ARGV[2]) then return 0 end
     return current`,
    [key],
    [windowSeconds.toString(), limit.toString()],
  );

  if (result === 0) {
    throw new ContactApiError(
      429,
      "Too many messages. Please try again later.",
    );
  }
}

async function consumeEmailLimits(redis: Redis, email: string) {
  const emailHash = hashIdentifier(email.trim().toLowerCase());
  const now = new Date();
  const hour = now.toISOString().slice(0, 13);
  const day = now.toISOString().slice(0, 10);

  await consumeLimit(
    redis,
    rateKey("email-hour", `${emailHash}:${hour}`),
    3,
    3_600,
  );
  await consumeLimit(
    redis,
    rateKey("email-day", `${emailHash}:${day}`),
    5,
    86_400,
  );
  await consumeLimit(redis, rateKey("global-day", day), 50, 86_400);
}

export async function sendContactMessage(
  input: ContactSubmission,
  clientIp: string,
) {
  // Bot traps never trigger external calls or store contact details.
  if (input.website) return { success: true as const };
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  const secret = process.env.TURNSTILE_SECRET_KEY;
  const webhook = process.env.DISCORD_WEBHOOK_URL;
  const hostnames = (process.env.TURNSTILE_ALLOWED_HOSTNAMES ?? "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
  if (!url || !token || !secret || !webhook || !hostnames.length) {
    throw new ContactApiError(
      503,
      "The contact service is temporarily unavailable. Please email me directly.",
    );
  }
  if (process.env.VERCEL_ENV === "production" && /^[123]x000000/.test(secret)) {
    throw new ContactApiError(503, "The contact service is not configured.");
  }
  const redis = new Redis({ url, token });
  const fingerprint = hashIdentifier(
    JSON.stringify([input.name, input.email.toLowerCase(), input.message]),
  );
  const deliveryKey = `contact:delivery:${input.submissionId}`;
  const lockKey = `contact:send-lock:${input.submissionId}`;
  const lockToken = randomUUID();
  if ((await redis.set(lockKey, lockToken, { nx: true, ex: 30 })) !== "OK") {
    throw new ContactApiError(
      409,
      "Your message is still being sent. Please wait a moment and retry.",
    );
  }
  try {
    const delivered = await redis.get<string>(deliveryKey);
    if (delivered) {
      if (delivered !== fingerprint)
        throw new ContactApiError(
          409,
          "The message has changed. Please refresh and try again.",
        );
      return { success: true as const };
    }
    await consumeLimit(redis, rateKey("ip", hashIdentifier(clientIp)), 3, 600);
    let verification: { success?: boolean; hostname?: string; action?: string };
    try {
      const response = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ secret, response: input.turnstileToken }),
          signal: AbortSignal.timeout(5000),
        },
      );
      if (!response.ok) throw new Error("Turnstile unavailable");
      verification = await response.json();
    } catch {
      throw new ContactApiError(
        503,
        "The security check is unavailable. Please retry or email me directly.",
      );
    }
    if (
      !verification.success ||
      !hostnames.includes(verification.hostname ?? "") ||
      verification.action !== "contact"
    ) {
      throw new ContactApiError(
        400,
        "The security check expired or failed. Please try again.",
      );
    }
    await consumeEmailLimits(redis, input.email);
    let response: Response;
    try {
      response = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: "New portfolio inquiry",
          allowed_mentions: { parse: [] },
          embeds: [
            {
              title: "New portfolio inquiry",
              description: input.message,
              color: 0x287743,
              fields: [
                { name: "Name", value: input.name },
                { name: "Email", value: input.email },
              ],
              footer: { text: "Sender email is unverified" },
              timestamp: new Date().toISOString(),
            },
          ],
        }),
        signal: AbortSignal.timeout(5000),
      });
    } catch {
      throw new ContactApiError(
        502,
        "Delivery could not be confirmed. Please retry or email me directly.",
      );
    }
    if (!response.ok)
      throw new ContactApiError(
        502,
        "Your message could not be delivered. Please retry.",
      );
    await redis.set(deliveryKey, fingerprint, { ex: 600 });
    return { success: true as const };
  } finally {
    try {
      await redis.eval(
        `if redis.call("GET", KEYS[1]) == ARGV[1] then return redis.call("DEL", KEYS[1]) end return 0`,
        [lockKey],
        [lockToken],
      );
    } catch {
      console.error("Failed to release contact delivery lock");
    }
  }
}
