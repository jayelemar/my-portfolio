import { NextRequest, NextResponse } from "next/server";
import { contactVerificationSchema } from "@/lib/contact-schema";
import { errorResponse, parseJsonBody } from "@/lib/contact-http";
import { verifyContactCode } from "@/lib/contact-service";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const { challengeId, code } = await parseJsonBody(
      request,
      contactVerificationSchema,
    );
    const result = await verifyContactCode(challengeId, code);
    return NextResponse.json(result);
  } catch (error) {
    return errorResponse(error);
  }
}
