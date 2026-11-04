import { NextRequest, NextResponse } from "next/server";
import { contactSubmissionSchema } from "@/lib/contact-schema";
import { errorResponse, parseJsonBody } from "@/lib/contact-http";
import { sendContactMessage } from "@/lib/contact-service";

export const runtime = "nodejs";
export async function POST(request: NextRequest) {
  try {
    const input = await parseJsonBody(request, contactSubmissionSchema);
    // Vercel overwrites this header at its trusted ingress. Do not trust it on other production hosts.
    const clientIp = process.env.VERCEL
      ? request.headers.get("x-forwarded-for")?.split(",")[0].trim()
      : process.env.NODE_ENV !== "production"
        ? "local-development"
        : undefined;
    if (!clientIp)
      return NextResponse.json(
        {
          success: false,
          message: "The contact service is temporarily unavailable.",
        },
        { status: 503 },
      );
    return NextResponse.json(await sendContactMessage(input, clientIp));
  } catch (error) {
    return errorResponse(error);
  }
}
