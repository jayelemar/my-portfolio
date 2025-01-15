// "use server";

// import { formSchema } from "@/components/contact/ContactForm";
// import {
//   AWS_EMAIL_USER,
//   AWS_SMTP_HOST,
//   AWS_SMTP_PASSWORD,
//   AWS_SMTP_USERNAME,
//   NEXT_PUBLIC_EMAIL_CC,
// } from "@/lib/secrets";
// import { NextRequest, NextResponse } from "next/server";
// import nodemailer from "nodemailer";
// import z from "zod";

// export const sendEmail = async (
//   values: z.infer<typeof formSchema>,
//   request: NextRequest,
// ) => {
//   try {
//     const { name, email, message } = await request.json();

//     // Create Email transporter
//     const transporter = nodemailer.createTransport({
//       // service: "gmail"
//       host: AWS_SMTP_HOST,
//       port: 587,
//       auth: {
//         user: AWS_SMTP_USERNAME,
//         pass: AWS_SMTP_PASSWORD,
//       },
//       tls: {
//         ciphers: "SSLv3",
//         rejectUnauthorized: false,
//       },
//     });

//     const mailOption = {
//       from: AWS_EMAIL_USER,
//       to: email,
//       cc: NEXT_PUBLIC_EMAIL_CC,
//       subject: "Email Confirmation from Jay Elemar Termulo's Portfolio",
//       html: `
//       <!DOCTYPE html>
//       <html lang="en">

//       <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>Auto-reply from Jay Termulo</title>
//         <style>
//           body {
//             font-family: 'Arial', sans-serif;
//             margin: 20px;
//             padding: 20px;
//             background-color: #f4f4f4;
//           }

//           h3 {
//             color: #333;
//           }

//           p {
//             color: #555;
//           }

//           .signature {
//             font-weight: bold;
//           }
//         </style>
//       </head>

//       <body>
//         <h3>Hello ${name},</h3>
//         <br />
//         <p>Thank you for contacting me. Your message has been received successfully.</p>
//         <p>This is an automated reply with the details of your message:</p>
//         <p>" ${message} "</p>
//         <br />
//         <br />
//         <p>I will review your message and get back to you as soon as possible.</p>
//         <br />
//         <br />
//         <p>Best Regards,</p>
//         <p class="signature">Jay Termulo</p>
//         <p>Your Frontend Developer</p>
//       </body>
//       </html>
//       `,
//     };

//     transporter.sendMail(mailOption, (error, info) => {
//       if (error) {
//         console.error("Error sending email: ", error);
//       } else {
//         console.log("Email sent: ", info.response);
//       }
//     });

//     return NextResponse.json(
//       { message: "BE: Email Sent Successfully" },
//       { status: 200 },
//     );
//   } catch (error) {
//     return NextResponse.json(
//       { message: "BE: Failed to send email" },
//       { status: 500 },
//     );
//   }
// };
