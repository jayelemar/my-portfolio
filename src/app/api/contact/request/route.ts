import { NextRequest, NextResponse } from "next/server";
import { contactRequestSchema } from "@/lib/contact-schema";
import { errorResponse, parseJsonBody } from "@/lib/contact-http";
import { requestContactVerification } from "@/lib/contact-service";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const input = await parseJsonBody(request, contactRequestSchema);
    const challenge = await requestContactVerification(input);
    return NextResponse.json(challenge, { status: 202 });
  } catch (error) {
    return errorResponse(error);
  }
}
