import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    console.log("POST /api/sendEmail called");
    const { name, email, subject, message } = await request.json();
    console.log("Received payload:", { name, email, subject, message });

    console.log("Using Gmail user from env:", process.env.GMAIL_USER);

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_USER, 
        pass: process.env.GMAIL_PASSWORD, 
      },
      debug: true,
      logger: true,
    });

    console.log("Transporter created. Verifying connection...");
    transporter.verify((error, success) => {
      if (error) {
        console.error("Transporter verification error:", error);
      } else {
        console.log("Server is ready to take our messages");
      }
    });

    console.log("Sending email...");
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: "zainjamshaid55@gmail.com",
      subject: `New message from ${name}: ${subject}`,
      text: `
        You have a new message from your contact form.
        
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
      html: `
        <p>You have a new message from your contact form.</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/> ${message}</p>
      `,
    });
    console.log("Email sent successfully.");

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { success: false, error: error.toString() },
      { status: 500 }
    );
  }
}
