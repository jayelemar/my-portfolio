import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const MAX_BODY_BYTES = 16 * 1_024;

export class ContactApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly details?: unknown,
  ) {
    super(message);
    this.name = "ContactApiError";
  }
}

export async function parseJsonBody<TSchema extends z.ZodTypeAny>(
  request: NextRequest,
  schema: TSchema,
): Promise<z.output<TSchema>> {
  const contentType = request.headers.get("content-type") ?? "";

  if (!contentType.toLowerCase().startsWith("application/json")) {
    throw new ContactApiError(400, "Content-Type must be application/json.");
  }

  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > MAX_BODY_BYTES) {
    throw new ContactApiError(413, "Request body is too large.");
  }

  const rawBody = await request.text();
  if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
    throw new ContactApiError(413, "Request body is too large.");
  }

  let body: unknown;
  try {
    body = JSON.parse(rawBody);
  } catch {
    throw new ContactApiError(400, "Invalid JSON body.");
  }

  const result = schema.safeParse(body);
  if (!result.success) {
    throw new ContactApiError(
      400,
      result.error.issues[0]?.message ?? "Invalid form data.",
      result.error.flatten(),
    );
  }

  return result.data as z.output<TSchema>;
}

export function errorResponse(error: unknown) {
  if (error instanceof ContactApiError) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
        ...(error.details ? { details: error.details } : {}),
      },
      { status: error.status },
    );
  }

  console.error("Contact API request failed", error);
  return NextResponse.json(
    {
      success: false,
      message: "The contact service is temporarily unavailable.",
    },
    { status: 503 },
  );
}
