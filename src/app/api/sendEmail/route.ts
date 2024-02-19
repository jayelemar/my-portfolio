import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST( request:NextRequest ) {
  try {
    const {name, email} = await request.json()

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.NEXT_PUBLIC_EMAIL_USER,
        pass: process.env.NEXT_PUBLIC_EMAIL_PASSWORD,
      }
    })
  
    const mailOption = {
      from: email,
      // to: email,
      to: "jetermulo@gmail.com",
      subject: 'New message from your website',
      text: "This is a test email sent using Nodemailer.",
      // html: `
      // <h3>Hello ${name} </h3>
      // <p> title: Email Confirmation of Jay Elemar Termulo's Portfolio </p>
      // <p> Subject: Thank You for Your email. ill get back to you within the day</p>
      // `
    }
  
    transporter.sendMail(mailOption, (error, info) => {
      if (error) {
        console.error("Error sending email: ", error);
      } else {
        console.log("Email sent: ", info.response);
      }
    });
  
    return NextResponse.json(
      {message: "BE: Email Sent Successfully"},
      {status:200},
    )
  } catch (error) {
    return NextResponse.json(
      {message: "BE: Failed to send email"},
      {status: 500},
    )
  }
}
