
import { EmailTemplate } from '@/components/email-template';
import { NextRequest } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST( request:NextRequest) {
  try {
    const body = await request.json()
    console.log("body", body);
    const { name, email, message } = body

    const { data, error } = await resend.emails.send({
      from: 'Jay Elemar <jetermulog@elemar.site>',
      cc: process.env.NEXT_PUBLIC_EMAIL_CC,
      to: email,
      subject: "Email Confirmation from Jay Elemar Termulo's Portfolio",
      react: EmailTemplate({ name, message  }) as React.ReactElement,
    });

    if (error) {
      return Response.json({ error });
    }

    return Response.json({ data });
  } catch (error) {
    return Response.json({ error });
  }
}
