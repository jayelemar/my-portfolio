import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      success: false,
      message:
        "Email codes are no longer needed. Refresh the page to send your message directly.",
    },
    { status: 410 },
  );
}
