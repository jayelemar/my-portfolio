import { beforeEach, describe, expect, it, vi } from "vitest";

type StoredValue = {
  value: unknown;
  expiresAt?: number;
};

const testState = vi.hoisted(() => {
  const values = new Map<string, StoredValue>();

  const purgeExpired = (key: string) => {
    const stored = values.get(key);
    if (stored?.expiresAt && stored.expiresAt <= Date.now()) values.delete(key);
  };

  const redis = {
    set: vi.fn(
      async (
        key: string,
        value: unknown,
        options?: { ex?: number; nx?: boolean },
      ) => {
        purgeExpired(key);
        if (options?.nx && values.has(key)) return null;
        values.set(key, {
          value: structuredClone(value),
          ...(options?.ex
            ? { expiresAt: Date.now() + options.ex * 1_000 }
            : {}),
        });
        return "OK";
      },
    ),
    get: vi.fn(async (key: string) => {
      purgeExpired(key);
      const stored = values.get(key);
      return stored ? structuredClone(stored.value) : null;
    }),
    del: vi.fn(async (key: string) => (values.delete(key) ? 1 : 0)),
    ttl: vi.fn(async (key: string) => {
      purgeExpired(key);
      const stored = values.get(key);
      if (!stored) return -2;
      if (!stored.expiresAt) return -1;
      return Math.max(0, Math.ceil((stored.expiresAt - Date.now()) / 1_000));
    }),
    eval: vi.fn(async (script: string, keys: string[], args: string[]) => {
      const key = keys[0];
      if (script.includes("INCR")) {
        purgeExpired(key);
        const current = Number(values.get(key)?.value ?? 0) + 1;
        const existingExpiry = values.get(key)?.expiresAt;
        values.set(key, {
          value: current,
          expiresAt: existingExpiry ?? Date.now() + Number(args[0]) * 1_000,
        });
        return current > Number(args[1]) ? 0 : current;
      }

      purgeExpired(key);
      if (values.get(key)?.value === args[0]) {
        values.delete(key);
        return 1;
      }
      return 0;
    }),
  };

  return {
    values,
    redis,
  };
});

vi.mock("@upstash/redis", () => ({
  Redis: function Redis() {
    return testState.redis;
  },
}));

const validContact = {
  name: "Test Visitor",
  email: "visitor@example.com",
  message: "I would like to discuss a new website project.",
  website: "",
  turnstileToken: "test-token",
  submissionId: "1d449f88-75a0-4ad4-b1bb-12b19857598d",
};
const verification = {
  success: true,
  hostname: "www.elemar.site",
  action: "contact",
};
const webhook = "https://discord.example.com/webhook";
const deliveries = () =>
  vi.mocked(fetch).mock.calls.filter(([url]) => url === webhook);
const fresh = () => ({ ...validContact, submissionId: crypto.randomUUID() });

describe("direct contact delivery", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    testState.values.clear();
    vi.stubEnv("UPSTASH_REDIS_REST_URL", "https://redis.example.com");
    vi.stubEnv("UPSTASH_REDIS_REST_TOKEN", "redis-test");
    vi.stubEnv("TURNSTILE_SECRET_KEY", "secret-test");
    vi.stubEnv("TURNSTILE_ALLOWED_HOSTNAMES", "elemar.site,www.elemar.site");
    vi.stubEnv("DISCORD_WEBHOOK_URL", webhook);
    vi.stubEnv("VERCEL_ENV", "preview");
    vi.stubGlobal(
      "fetch",
      vi.fn(async (url) =>
        url === webhook
          ? new Response(null, { status: 204 })
          : Response.json(verification),
      ),
    );
  });
  it("checks Turnstile before delivery and suppresses confirmed retries", async () => {
    const { sendContactMessage } = await import("./contact-service.js");
    await expect(sendContactMessage(validContact, "ip1")).resolves.toEqual({
      success: true,
    });
    await expect(sendContactMessage(validContact, "ip1")).resolves.toEqual({
      success: true,
    });
    expect(deliveries()).toHaveLength(1);
    expect(fetch).toHaveBeenCalledTimes(2);
    const payload = JSON.parse(deliveries()[0][1]?.body as string);
    expect(payload.allowed_mentions.parse).toEqual([]);
    expect(payload.embeds[0].footer.text).toBe("Sender email is unverified");
    expect(payload.content).toBe("New portfolio inquiry");
  });
  it("silently discards honeypot submissions", async () => {
    const { sendContactMessage } = await import("./contact-service.js");
    await sendContactMessage({ ...validContact, website: "spam" }, "ip1");
    expect(fetch).not.toHaveBeenCalled();
    expect(testState.values.size).toBe(0);
  });
  it.each([
    { success: false },
    { ...verification, hostname: "attacker.example" },
    { ...verification, action: "login" },
  ])("rejects invalid tokens or context: %j", async (result) => {
    vi.mocked(fetch).mockResolvedValue(Response.json(result));
    const { sendContactMessage } = await import("./contact-service.js");
    await expect(sendContactMessage(validContact, "ip1")).rejects.toMatchObject(
      { status: 400 },
    );
    expect(deliveries()).toHaveLength(0);
  });
  it("fails closed on missing configuration or Turnstile outage", async () => {
    const { sendContactMessage } = await import("./contact-service.js");
    vi.stubEnv("TURNSTILE_SECRET_KEY", "");
    await expect(sendContactMessage(validContact, "ip1")).rejects.toMatchObject(
      { status: 503 },
    );
    expect(fetch).not.toHaveBeenCalled();
    vi.stubEnv("TURNSTILE_SECRET_KEY", "secret-test");
    vi.mocked(fetch).mockRejectedValue(new Error("offline"));
    await expect(sendContactMessage(validContact, "ip1")).rejects.toMatchObject(
      { status: 503 },
    );
  });
  it("limits attempts per IP", async () => {
    const { sendContactMessage } = await import("./contact-service.js");
    for (let n = 0; n < 3; n++)
      await sendContactMessage(
        { ...fresh(), email: `visitor${n}@example.com` },
        "ip1",
      );
    await expect(sendContactMessage(fresh(), "ip1")).rejects.toMatchObject({
      status: 429,
    });
    expect(deliveries()).toHaveLength(3);
  });
  it("limits messages per email across different IPs", async () => {
    const { sendContactMessage } = await import("./contact-service.js");
    for (let n = 0; n < 3; n++) await sendContactMessage(fresh(), `ip${n}`);
    await expect(sendContactMessage(fresh(), "ip4")).rejects.toMatchObject({
      status: 429,
    });
  });
  it("permits retry after failed delivery", async () => {
    const { sendContactMessage } = await import("./contact-service.js");
    vi.mocked(fetch)
      .mockResolvedValueOnce(Response.json(verification))
      .mockResolvedValueOnce(new Response(null, { status: 500 }));
    await expect(sendContactMessage(validContact, "ip1")).rejects.toMatchObject(
      { status: 502 },
    );
    await expect(
      sendContactMessage(
        { ...validContact, turnstileToken: "fresh-token" },
        "ip1",
      ),
    ).resolves.toEqual({ success: true });
    expect(deliveries()).toHaveLength(2);
  });
  it("rejects reuse of an ID for changed details", async () => {
    const { sendContactMessage } = await import("./contact-service.js");
    await sendContactMessage(validContact, "ip1");
    await expect(
      sendContactMessage(
        {
          ...validContact,
          message: "Different sufficiently long message here.",
        },
        "ip1",
      ),
    ).rejects.toMatchObject({ status: 409 });
    expect(deliveries()).toHaveLength(1);
  });
  it("blocks concurrent submissions with the same ID", async () => {
    const { sendContactMessage } = await import("./contact-service.js");
    const results = await Promise.allSettled([
      sendContactMessage(validContact, "ip1"),
      sendContactMessage(validContact, "ip1"),
    ]);
    expect(results.filter((r) => r.status === "fulfilled")).toHaveLength(1);
    expect(deliveries()).toHaveLength(1);
  });
});
