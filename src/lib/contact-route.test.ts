import { NextRequest } from "next/server";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "@/app/api/contact/request/route";
import { POST as verify } from "@/app/api/contact/verify/route";
import { POST as resend } from "@/app/api/contact/resend/route";
import { sendContactMessage } from "./contact-service";

vi.mock("@/lib/contact-service", () => ({ sendContactMessage: vi.fn() }));
const input = {
  name: "Visitor",
  email: "visitor@example.com",
  message: "I would like to discuss a website project.",
  turnstileToken: "test-token",
  submissionId: "1d449f88-75a0-4ad4-b1bb-12b19857598d",
};
const request = (body: unknown, ip?: string) =>
  new NextRequest("https://elemar.site/api/contact/request", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(ip ? { "x-forwarded-for": ip } : {}),
    },
    body: JSON.stringify(body),
  });
describe("contact routes", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.stubEnv("VERCEL", "1");
    vi.mocked(sendContactMessage).mockResolvedValue({ success: true });
  });
  it("delivers a valid submission using the trusted ingress IP", async () => {
    const response = await POST(request(input, "203.0.113.1"));
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ success: true });
    expect(sendContactMessage).toHaveBeenCalledWith(
      { ...input, website: "" },
      "203.0.113.1",
    );
  });
  it("rejects stale clients without a protection token", async () => {
    const response = await POST(
      request(
        { name: input.name, email: input.email, message: input.message },
        "203.0.113.1",
      ),
    );
    expect(response.status).toBe(400);
    expect(sendContactMessage).not.toHaveBeenCalled();
  });
  it("fails closed when a trusted ingress IP is missing", async () => {
    expect((await POST(request(input))).status).toBe(503);
    expect(sendContactMessage).not.toHaveBeenCalled();
  });
  it("retires verification endpoints without sending messages", async () => {
    for (const handler of [verify, resend]) {
      const response = await handler();
      expect(response.status).toBe(410);
      expect((await response.json()).message).toContain("Refresh");
    }
    expect(sendContactMessage).not.toHaveBeenCalled();
  });
});
