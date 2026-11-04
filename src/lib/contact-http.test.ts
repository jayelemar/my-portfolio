import { NextRequest } from "next/server";
import { describe, expect, it } from "vitest";
import { contactRequestSchema } from "./contact-schema";
import { ContactApiError, parseJsonBody } from "./contact-http";

const endpoint = "https://www.elemar.site/api/contact/request";

function makeRequest(body: BodyInit, headers: HeadersInit = {}) {
  return new NextRequest(endpoint, {
    method: "POST",
    body,
    headers,
  });
}

describe("parseJsonBody", () => {
  it("parses valid JSON using the supplied schema", async () => {
    const request = makeRequest(
      JSON.stringify({
        name: "Visitor",
        email: "visitor@example.com",
        message: "I would like to discuss a new website project.",
      }),
      { "Content-Type": "application/json" },
    );

    await expect(parseJsonBody(request, contactRequestSchema)).resolves.toEqual(
      {
        name: "Visitor",
        email: "visitor@example.com",
        message: "I would like to discuss a new website project.",
        website: "",
      },
    );
  });

  it("rejects non-JSON content types", async () => {
    const request = makeRequest("code=123456", {
      "Content-Type": "application/x-www-form-urlencoded",
    });

    await expect(
      parseJsonBody(request, contactRequestSchema),
    ).rejects.toMatchObject({
      status: 400,
    } satisfies Partial<ContactApiError>);
  });

  it("rejects malformed JSON", async () => {
    const request = makeRequest("{", { "Content-Type": "application/json" });

    await expect(
      parseJsonBody(request, contactRequestSchema),
    ).rejects.toMatchObject({
      status: 400,
      message: "Invalid JSON body.",
    } satisfies Partial<ContactApiError>);
  });

  it("rejects bodies larger than 16 KiB", async () => {
    const request = makeRequest(JSON.stringify({ value: "x".repeat(17_000) }), {
      "Content-Type": "application/json",
    });

    await expect(
      parseJsonBody(request, contactRequestSchema),
    ).rejects.toMatchObject({
      status: 413,
    } satisfies Partial<ContactApiError>);
  });
});
