import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST( request:NextRequest ) {
  try {
    const {name, email} = await request.json()

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        user: process.env.NEXT_PUBLIC_EMAIL_USER,
        pass: process.env.NEXT_PUBLIC_EMAIL_PASSWORD,
      }
    })
  
    const mailOption = {
      from: 'your-email@gmail.com',
      to: email,
      subject: 'New message from your website',
      html: `
      <h3>Hello ${name} </h3>
      <p> title: Email Confirmation of Jay Elemar Termulo's Portfolio </p>
      <p> Subject: Thank You for Your email. ill get back to you within the day</p>
      `
    }
  
    await transporter.sendMail(mailOption)
  
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
