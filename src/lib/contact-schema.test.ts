import { describe, expect, it } from "vitest";
import {
  contactRequestSchema,
  contactSubmissionSchema,
} from "./contact-schema";

describe("contactRequestSchema", () => {
  it("accepts and trims a valid contact request", () => {
    expect(
      contactRequestSchema.parse({
        name: "  Jay Elemar  ",
        email: "  visitor@example.com  ",
        message: "  I would like to discuss a website project.  ",
      }),
    ).toEqual({
      name: "Jay Elemar",
      email: "visitor@example.com",
      message: "I would like to discuss a website project.",
      website: "",
    });
  });

  it("rejects short or low-effort messages", () => {
    expect(
      contactRequestSchema.safeParse({
        name: "Spammer",
        email: "spam@example.com",
        message: "aaaaaaaaaaaaaaaaaaaa",
      }).success,
    ).toBe(false);
  });

  it("rejects unknown fields", () => {
    expect(
      contactRequestSchema.safeParse({
        name: "Valid Name",
        email: "valid@example.com",
        message: "This is a sufficiently detailed message.",
        admin: true,
      }).success,
    ).toBe(false);
  });
});

describe("contactSubmissionSchema", () => {
  const payload = {
    name: "Valid Name",
    email: "visitor@example.com",
    message: "I would like to discuss a new website project.",
    turnstileToken: "token",
    submissionId: "1d449f88-75a0-4ad4-b1bb-12b19857598d",
  };
  it("requires a token and valid submission ID", () => {
    expect(contactSubmissionSchema.safeParse(payload).success).toBe(true);
    expect(
      contactSubmissionSchema.safeParse({ ...payload, turnstileToken: "" })
        .success,
    ).toBe(false);
    expect(
      contactSubmissionSchema.safeParse({ ...payload, submissionId: "bad-id" })
        .success,
    ).toBe(false);
    expect(
      contactSubmissionSchema.safeParse({
        ...payload,
        turnstileToken: "x".repeat(2049),
      }).success,
    ).toBe(false);
  });
});
