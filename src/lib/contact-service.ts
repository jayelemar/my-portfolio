import {
  createHash,
  createHmac,
  randomInt,
  randomUUID,
  timingSafeEqual,
} from "node:crypto";
import { Redis } from "@upstash/redis";
import { Resend } from "resend";
import type { ContactRequest } from "./contact-schema";
import { ContactApiError } from "./contact-http";

const CHALLENGE_TTL_SECONDS = 15 * 60;
const RESEND_COOLDOWN_SECONDS = 60;
const MAX_CODE_ATTEMPTS = 5;
const MAX_EMAILS_PER_CHALLENGE = 3;
const LOCK_TTL_SECONDS = 15;

type ChallengeStatus = "pending" | "processing";

export type ContactChallenge = {
  id: string;
  name: string;
  email: string;
  message: string;
  codeDigest: string;
  attempts: number;
  emailSends: number;
  generation: number;
  status: ChallengeStatus;
  createdAt: number;
  expiresAt: number;
};

type ChallengeResponse = {
  challengeId: string;
  maskedEmail: string;
  expiresAt: number;
  resendAvailableAt: number;
};

type RequiredConfig = {
  redisUrl: string;
  redisToken: string;
  resendApiKey: string;
  codeSecret: string;
  discordWebhookUrl: string;
};

let redisClient: Redis | undefined;
let resendClient: Resend | undefined;

function requireConfig(): RequiredConfig {
  const config = {
    redisUrl: process.env.UPSTASH_REDIS_REST_URL,
    redisToken: process.env.UPSTASH_REDIS_REST_TOKEN,
    resendApiKey: process.env.RESEND_API_KEY,
    codeSecret: process.env.CONTACT_CODE_SECRET,
    discordWebhookUrl: process.env.DISCORD_WEBHOOK_URL,
  };

  if (
    Object.values(config).some((value) => !value) ||
    (config.codeSecret?.length ?? 0) < 32
  ) {
    throw new ContactApiError(503, "The contact service is not configured.");
  }

  return config as RequiredConfig;
}

function getClients() {
  const config = requireConfig();
  redisClient ??= new Redis({ url: config.redisUrl, token: config.redisToken });
  resendClient ??= new Resend(config.resendApiKey);
  return { config, redis: redisClient, resend: resendClient };
}

export function generateVerificationCode() {
  return randomInt(0, 1_000_000).toString().padStart(6, "0");
}

export function digestVerificationCode(
  challengeId: string,
  code: string,
  secret: string,
) {
  return createHmac("sha256", secret)
    .update(`${challengeId}:${code}`)
    .digest("hex");
}

export function verificationCodeMatches(
  expectedDigest: string,
  submittedDigest: string,
) {
  const expected = Buffer.from(expectedDigest, "hex");
  const submitted = Buffer.from(submittedDigest, "hex");
  return (
    expected.length === submitted.length && timingSafeEqual(expected, submitted)
  );
}

export function maskEmail(email: string) {
  const [local, domain] = email.split("@");
  if (!local || !domain) return "your email address";
  return `${local.slice(0, 1)}${"*".repeat(Math.min(Math.max(local.length - 1, 1), 5))}@${domain}`;
}

function challengeKey(id: string) {
  return `contact:challenge:${id}`;
}

function lockKey(id: string) {
  return `contact:lock:${id}`;
}

function rateKey(scope: string, identifier: string) {
  return `contact:rate:${scope}:${identifier}`;
}

function hashIdentifier(value: string) {
  return createHash("sha256").update(value).digest("hex");
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
      "Too many verification emails. Please try again later.",
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

async function getChallenge(redis: Redis, id: string) {
  return redis.get<ContactChallenge>(challengeKey(id));
}

async function saveChallenge(
  redis: Redis,
  challenge: ContactChallenge,
  ttlSeconds = CHALLENGE_TTL_SECONDS,
) {
  await redis.set(challengeKey(challenge.id), challenge, { ex: ttlSeconds });
}

async function acquireLock(redis: Redis, id: string) {
  const token = randomUUID();
  const acquired = await redis.set(lockKey(id), token, {
    nx: true,
    ex: LOCK_TTL_SECONDS,
  });

  if (acquired !== "OK") {
    throw new ContactApiError(
      409,
      "This verification request is already being processed.",
    );
  }

  return token;
}

async function releaseLock(redis: Redis, id: string, token: string) {
  await redis.eval(
    `if redis.call("GET", KEYS[1]) == ARGV[1] then
       return redis.call("DEL", KEYS[1])
     end
     return 0`,
    [lockKey(id)],
    [token],
  );
}

async function sendVerificationEmail(
  resend: Resend,
  challenge: ContactChallenge,
  code: string,
) {
  const { error } = await resend.emails.send(
    {
      from: "Jay Elemar Portfolio <verify@mail.elemar.site>",
      to: challenge.email,
      subject: "One quick step to send your message",
      text: `Thanks for reaching out!

You’re almost done. Enter the verification code below on my portfolio to confirm your email and send your message.

This quick check ensures I can reply to the right address while keeping unwanted messages away.

${code}

This code expires in 15 minutes. Your message will be delivered as soon as your email is confirmed.

If you didn’t request this, you can safely ignore this email. No message will be sent.`,
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#171717">
          <h2>Confirm your email</h2>
          <p>Thanks for reaching out!</p>
          <p>You’re almost done. Enter the verification code below on my portfolio to confirm your email and send your message.</p>
          <p>This quick check ensures I can reply to the right address while keeping unwanted messages away.</p>
          <p style="font-size:32px;font-weight:700;letter-spacing:8px;margin:24px 0">${code}</p>
          <p>This code expires in 15 minutes. Your message will be delivered as soon as your email is confirmed.</p>
          <p style="color:#666">If you didn’t request this, you can safely ignore this email. No message will be sent.</p>
        </div>
      `,
    },
    { idempotencyKey: `contact-code/${challenge.id}/${challenge.generation}` },
  );

  if (error) {
    throw new ContactApiError(502, "We could not send the verification email.");
  }
}

async function sendDiscordMessage(
  webhookUrl: string,
  challenge: ContactChallenge,
) {
  let response: Response;
  try {
    response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: "New verified message from portfolio contact form:",
        allowed_mentions: { parse: [] },
        embeds: [
          {
            title: "Verified Contact",
            description: challenge.message,
            color: 0x875ffe,
            fields: [
              { name: "Name", value: challenge.name, inline: false },
              { name: "Email", value: challenge.email, inline: false },
            ],
            footer: { text: "Email ownership verified" },
            timestamp: new Date().toISOString(),
          },
        ],
      }),
      signal: AbortSignal.timeout(5_000),
    });
  } catch {
    throw new ContactApiError(
      502,
      "Your email was verified, but the message could not be delivered. Please retry.",
    );
  }

  if (!response.ok) {
    throw new ContactApiError(
      502,
      "Your email was verified, but the message could not be delivered. Please retry.",
    );
  }
}

function toChallengeResponse(challenge: ContactChallenge): ChallengeResponse {
  return {
    challengeId: challenge.id,
    maskedEmail: maskEmail(challenge.email),
    expiresAt: challenge.expiresAt,
    resendAvailableAt: Date.now() + RESEND_COOLDOWN_SECONDS * 1_000,
  };
}

export async function requestContactVerification(input: ContactRequest) {
  const { config, redis, resend } = getClients();

  if (input.website) {
    const now = Date.now();
    return {
      challengeId: randomUUID(),
      maskedEmail: maskEmail(input.email),
      expiresAt: now + CHALLENGE_TTL_SECONDS * 1_000,
      resendAvailableAt: now + RESEND_COOLDOWN_SECONDS * 1_000,
    };
  }

  await consumeEmailLimits(redis, input.email);

  const code = generateVerificationCode();
  const now = Date.now();
  const challenge: ContactChallenge = {
    id: randomUUID(),
    name: input.name,
    email: input.email,
    message: input.message,
    codeDigest: "",
    attempts: 0,
    emailSends: 1,
    generation: 1,
    status: "pending",
    createdAt: now,
    expiresAt: now + CHALLENGE_TTL_SECONDS * 1_000,
  };
  challenge.codeDigest = digestVerificationCode(
    challenge.id,
    code,
    config.codeSecret,
  );

  await saveChallenge(redis, challenge);
  await redis.set(`contact:resend:${challenge.id}`, "1", {
    ex: RESEND_COOLDOWN_SECONDS,
  });

  try {
    await sendVerificationEmail(resend, challenge, code);
  } catch (error) {
    await redis.del(challengeKey(challenge.id));
    throw error;
  }

  return toChallengeResponse(challenge);
}

export async function resendContactVerification(challengeId: string) {
  const { config, redis, resend } = getClients();
  const token = await acquireLock(redis, challengeId);

  try {
    const challenge = await getChallenge(redis, challengeId);
    if (!challenge) {
      throw new ContactApiError(410, "This verification request has expired.");
    }
    if (challenge.status !== "pending") {
      throw new ContactApiError(
        409,
        "This verification request is already being processed.",
      );
    }
    if (challenge.emailSends >= MAX_EMAILS_PER_CHALLENGE) {
      throw new ContactApiError(
        429,
        "The maximum number of verification emails has been reached.",
      );
    }

    const cooldownSet = await redis.set(`contact:resend:${challengeId}`, "1", {
      nx: true,
      ex: RESEND_COOLDOWN_SECONDS,
    });
    if (cooldownSet !== "OK") {
      throw new ContactApiError(
        429,
        "Please wait before requesting another code.",
      );
    }

    await consumeEmailLimits(redis, challenge.email);

    const code = generateVerificationCode();
    const now = Date.now();
    const updated: ContactChallenge = {
      ...challenge,
      codeDigest: digestVerificationCode(challenge.id, code, config.codeSecret),
      attempts: 0,
      emailSends: challenge.emailSends + 1,
      generation: challenge.generation + 1,
      expiresAt: now + CHALLENGE_TTL_SECONDS * 1_000,
    };
    await saveChallenge(redis, updated);
    await sendVerificationEmail(resend, updated, code);
    return toChallengeResponse(updated);
  } finally {
    try {
      await releaseLock(redis, challengeId, token);
    } catch (error) {
      console.error("Failed to release contact resend lock", error);
    }
  }
}

export async function verifyContactCode(challengeId: string, code: string) {
  const { config, redis } = getClients();
  const token = await acquireLock(redis, challengeId);

  try {
    const challenge = await getChallenge(redis, challengeId);
    if (!challenge) {
      throw new ContactApiError(410, "This verification request has expired.");
    }
    if (challenge.status !== "pending") {
      throw new ContactApiError(
        409,
        "This verification request is already being processed.",
      );
    }

    const submittedDigest = digestVerificationCode(
      challengeId,
      code,
      config.codeSecret,
    );
    if (!verificationCodeMatches(challenge.codeDigest, submittedDigest)) {
      const attempts = challenge.attempts + 1;
      if (attempts >= MAX_CODE_ATTEMPTS) {
        await redis.del(challengeKey(challengeId));
        throw new ContactApiError(
          410,
          "Too many incorrect codes. Please start again.",
        );
      }

      const ttl = await redis.ttl(challengeKey(challengeId));
      if (ttl <= 0) {
        throw new ContactApiError(
          410,
          "This verification request has expired.",
        );
      }
      await saveChallenge(redis, { ...challenge, attempts }, ttl);
      throw new ContactApiError(
        400,
        `Incorrect code. ${MAX_CODE_ATTEMPTS - attempts} attempts remaining.`,
      );
    }

    await saveChallenge(
      redis,
      { ...challenge, status: "processing" },
      Math.max(await redis.ttl(challengeKey(challengeId)), 1),
    );

    try {
      await sendDiscordMessage(config.discordWebhookUrl, challenge);
    } catch (error) {
      const ttl = await redis.ttl(challengeKey(challengeId));
      if (ttl > 0) {
        await saveChallenge(redis, { ...challenge, status: "pending" }, ttl);
      }
      throw error;
    }

    await redis.del(challengeKey(challengeId));
    return { success: true as const };
  } finally {
    try {
      await releaseLock(redis, challengeId, token);
    } catch (error) {
      console.error("Failed to release contact verification lock", error);
    }
  }
}
