import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const webHookURL = process.env.DISCORD_WEBHOOK_URL;

    const payload = {
      content: "New message from portfolio contact form:",
      embeds: [
        {
          title: "Form Data",
          color: 0x875ffe,
          fields: Object.entries(body).map(([key, value]) => ({
            name: key,
            value: String(value),
            inline: false,
          })),
          timestamp: new Date().toISOString(),
        },
      ],
    };

    await fetch(webHookURL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to send Discord message",
      },
      { status: 500 },
    );
  }
}
