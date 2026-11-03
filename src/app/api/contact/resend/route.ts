import { NextRequest, NextResponse } from "next/server";
import { contactResendSchema } from "@/lib/contact-schema";
import { errorResponse, parseJsonBody } from "@/lib/contact-http";
import { resendContactVerification } from "@/lib/contact-service";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const { challengeId } = await parseJsonBody(request, contactResendSchema);
    const challenge = await resendContactVerification(challengeId);
    return NextResponse.json(challenge, { status: 202 });
  } catch (error) {
    return errorResponse(error);
  }
}
