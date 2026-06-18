import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"SmartAI for Work" <${process.env.GMAIL_USER}>`,
      to: "smartaiforwork@gmail.com",
      replyTo: email,
      subject: `[Contact] ${subject} — from ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;border:1px solid #e5e7eb;border-radius:12px">
          <h2 style="color:#1E293B;margin-bottom:16px">New Contact Form Submission</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;color:#6B7280;width:100px;vertical-align:top"><strong>Name</strong></td><td style="padding:8px 0;color:#1E293B">${name}</td></tr>
            <tr><td style="padding:8px 0;color:#6B7280;vertical-align:top"><strong>Email</strong></td><td style="padding:8px 0;color:#1E293B"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding:8px 0;color:#6B7280;vertical-align:top"><strong>Subject</strong></td><td style="padding:8px 0;color:#1E293B">${subject}</td></tr>
            <tr><td style="padding:8px 0;color:#6B7280;vertical-align:top"><strong>Message</strong></td><td style="padding:8px 0;color:#1E293B;white-space:pre-wrap">${message}</td></tr>
          </table>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0"/>
          <p style="font-size:12px;color:#9CA3AF">Sent via SmartAIforWork.com contact form</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact email error:", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
