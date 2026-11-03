import { z } from "zod";

const threeWords = /\S+\s+\S+\s+\S+/;

export const contactRequestSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters.")
      .max(80, "Name must be 80 characters or fewer."),
    email: z
      .string()
      .trim()
      .max(254, "Email must be 254 characters or fewer.")
      .email("Invalid email format."),
    message: z
      .string()
      .trim()
      .min(20, "Message must be at least 20 characters.")
      .max(2_000, "Message must be 2,000 characters or fewer.")
      .regex(threeWords, "Message must contain at least 3 words."),
    website: z.string().max(200).optional().default(""),
  })
  .strict();

export const contactVerificationSchema = z
  .object({
    challengeId: z.string().uuid("Invalid verification request."),
    code: z.string().regex(/^\d{6}$/, "Enter the 6-digit code."),
  })
  .strict();

export const contactResendSchema = z
  .object({
    challengeId: z.string().uuid("Invalid verification request."),
  })
  .strict();

export type ContactRequest = z.infer<typeof contactRequestSchema>;
export type ContactVerification = z.infer<typeof contactVerificationSchema>;
