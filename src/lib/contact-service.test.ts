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
    resendSend: vi.fn(),
  };
});

vi.mock("@upstash/redis", () => ({
  Redis: function Redis() {
    return testState.redis;
  },
}));

vi.mock("resend", () => ({
  Resend: function Resend() {
    return { emails: { send: testState.resendSend } };
  },
}));

const validContact = {
  name: "Test Visitor",
  email: "visitor@example.com",
  message: "I would like to discuss a new website project.",
  website: "",
};

function extractLatestCode() {
  const call = testState.resendSend.mock.calls.at(-1)?.[0] as
    | { text?: string }
    | undefined;
  const code = call?.text?.match(/\b\d{6}\b/)?.[0];
  if (!code)
    throw new Error("Verification code was not included in the email.");
  return code;
}

describe("contact verification service", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    testState.values.clear();
    testState.resendSend.mockResolvedValue({
      data: { id: "email_1" },
      error: null,
    });
    vi.stubEnv("UPSTASH_REDIS_REST_URL", "https://redis.example.com");
    vi.stubEnv("UPSTASH_REDIS_REST_TOKEN", "test-redis-token");
    vi.stubEnv("RESEND_API_KEY", "re_test_key");
    vi.stubEnv(
      "CONTACT_CODE_SECRET",
      "a-long-random-test-secret-with-at-least-32-characters",
    );
    vi.stubEnv("DISCORD_WEBHOOK_URL", "https://discord.example.com/webhook");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response(null, { status: 204 })),
    );
  });

  it("emails a code and only delivers the message after successful verification", async () => {
    const { requestContactVerification, verifyContactCode } = await import(
      "./contact-service.js"
    );

    const challenge = await requestContactVerification(validContact);
    const code = extractLatestCode();

    expect(testState.resendSend).toHaveBeenCalledTimes(1);
    expect(fetch).not.toHaveBeenCalled();
    const verificationEmail = testState.resendSend.mock.calls[0][0] as {
      subject: string;
      text: string;
      html: string;
    };
    expect(verificationEmail.subject).toBe(
      "One quick step to send your message",
    );
    expect(verificationEmail.text).toBe(`Thanks for reaching out!

You’re almost done. Enter the verification code below on my portfolio to confirm your email and send your message.

This quick check ensures I can reply to the right address while keeping unwanted messages away.

${code}

This code expires in 15 minutes. Your message will be delivered as soon as your email is confirmed.

If you didn’t request this, you can safely ignore this email. No message will be sent.`);
    expect(verificationEmail.html).toContain("<h2>Confirm your email</h2>");
    expect(verificationEmail.html).toContain("Thanks for reaching out!");
    expect(verificationEmail.html).toContain(
      "You’re almost done. Enter the verification code below on my portfolio to confirm your email and send your message.",
    );
    expect(verificationEmail.html).toContain(
      "This quick check ensures I can reply to the right address while keeping unwanted messages away.",
    );
    expect(verificationEmail.html).toContain(code);
    expect(verificationEmail.html).toContain(
      "This code expires in 15 minutes. Your message will be delivered as soon as your email is confirmed.",
    );
    expect(verificationEmail.html).toContain(
      "If you didn’t request this, you can safely ignore this email. No message will be sent.",
    );
    expect(verificationEmail.text).not.toContain(validContact.message);
    expect(verificationEmail.html).not.toContain(validContact.message);

    await expect(
      verifyContactCode(challenge.challengeId, code),
    ).resolves.toEqual({
      success: true,
    });
    expect(fetch).toHaveBeenCalledTimes(1);

    await expect(
      verifyContactCode(challenge.challengeId, code),
    ).rejects.toMatchObject({
      status: 410,
    });
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("does not email or store a honeypot submission", async () => {
    const { requestContactVerification } = await import("./contact-service.js");

    await requestContactVerification({
      ...validContact,
      website: "spam.example",
    });

    expect(testState.resendSend).not.toHaveBeenCalled();
    expect(fetch).not.toHaveBeenCalled();
    expect(
      [...testState.values.keys()].some((key) =>
        key.startsWith("contact:challenge:"),
      ),
    ).toBe(false);
  });

  it("limits verification emails sent to the same address", async () => {
    const { requestContactVerification } = await import("./contact-service.js");

    await requestContactVerification(validContact);
    await requestContactVerification(validContact);
    await requestContactVerification(validContact);

    await expect(
      requestContactVerification(validContact),
    ).rejects.toMatchObject({
      status: 429,
    });
    expect(testState.resendSend).toHaveBeenCalledTimes(3);
  });

  it("invalidates a challenge after five incorrect codes", async () => {
    const { requestContactVerification, verifyContactCode } = await import(
      "./contact-service.js"
    );
    const challenge = await requestContactVerification(validContact);
    const correctCode = extractLatestCode();
    const incorrectCode = correctCode === "000000" ? "999999" : "000000";

    for (let attempt = 1; attempt < 5; attempt += 1) {
      await expect(
        verifyContactCode(challenge.challengeId, incorrectCode),
      ).rejects.toMatchObject({ status: 400 });
    }

    await expect(
      verifyContactCode(challenge.challengeId, incorrectCode),
    ).rejects.toMatchObject({ status: 410 });
    await expect(
      verifyContactCode(challenge.challengeId, correctCode),
    ).rejects.toMatchObject({ status: 410 });
    expect(fetch).not.toHaveBeenCalled();
  });

  it("enforces the resend cooldown and replaces the old code", async () => {
    const {
      requestContactVerification,
      resendContactVerification,
      verifyContactCode,
    } = await import("./contact-service.js");
    const challenge = await requestContactVerification(validContact);
    const firstCode = extractLatestCode();

    await expect(
      resendContactVerification(challenge.challengeId),
    ).rejects.toMatchObject({ status: 429 });

    testState.values.delete(`contact:resend:${challenge.challengeId}`);
    await resendContactVerification(challenge.challengeId);
    const secondCode = extractLatestCode();

    expect(testState.resendSend).toHaveBeenCalledTimes(2);
    if (secondCode !== firstCode) {
      await expect(
        verifyContactCode(challenge.challengeId, firstCode),
      ).rejects.toMatchObject({ status: 400 });
    }
    await expect(
      verifyContactCode(challenge.challengeId, secondCode),
    ).resolves.toEqual({ success: true });
  });

  it("allows delivery to be retried when Discord temporarily fails", async () => {
    const { requestContactVerification, verifyContactCode } = await import(
      "./contact-service.js"
    );
    const challenge = await requestContactVerification(validContact);
    const code = extractLatestCode();
    vi.mocked(fetch)
      .mockResolvedValueOnce(new Response(null, { status: 500 }))
      .mockResolvedValueOnce(new Response(null, { status: 204 }));

    await expect(
      verifyContactCode(challenge.challengeId, code),
    ).rejects.toMatchObject({
      status: 502,
    });
    await expect(
      verifyContactCode(challenge.challengeId, code),
    ).resolves.toEqual({
      success: true,
    });
    expect(fetch).toHaveBeenCalledTimes(2);
  });
});
