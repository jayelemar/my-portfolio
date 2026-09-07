import { describe, expect, it } from "vitest";
import {
  contactRequestSchema,
  contactResendSchema,
  contactVerificationSchema,
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

describe("contact verification schemas", () => {
  const challengeId = "1d449f88-75a0-4ad4-b1bb-12b19857598d";

  it("only accepts six-digit verification codes", () => {
    expect(
      contactVerificationSchema.safeParse({ challengeId, code: "123456" })
        .success,
    ).toBe(true);
    expect(
      contactVerificationSchema.safeParse({ challengeId, code: "12345a" })
        .success,
    ).toBe(false);
  });

  it("requires a valid challenge id for resends", () => {
    expect(contactResendSchema.safeParse({ challengeId }).success).toBe(true);
    expect(
      contactResendSchema.safeParse({ challengeId: "not-a-uuid" }).success,
    ).toBe(false);
  });
});
