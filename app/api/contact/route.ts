import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { escapeHtml } from "@/lib/escape-html";
import { getClientIp, isRateLimited } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  try {
    if (isRateLimited(`contact:${getClientIp(req)}`)) {
      return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
    }

    const { name, email, subject, message, website } = await req.json();

    // Honeypot: hidden field real users never fill — pretend success for bots
    if (website) {
      return NextResponse.json({ success: true });
    }

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    if (
      String(name).length > 100 ||
      String(email).length > 254 ||
      String(subject).length > 200 ||
      String(message).length > 5000
    ) {
      return NextResponse.json({ error: "Input too long" }, { status: 400 });
    }

    const safe = {
      name: escapeHtml(String(name)),
      email: escapeHtml(String(email)),
      subject: escapeHtml(String(subject)),
      message: escapeHtml(String(message)),
    };

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
            <tr><td style="padding:8px 0;color:#6B7280;width:100px;vertical-align:top"><strong>Name</strong></td><td style="padding:8px 0;color:#1E293B">${safe.name}</td></tr>
            <tr><td style="padding:8px 0;color:#6B7280;vertical-align:top"><strong>Email</strong></td><td style="padding:8px 0;color:#1E293B"><a href="mailto:${safe.email}">${safe.email}</a></td></tr>
            <tr><td style="padding:8px 0;color:#6B7280;vertical-align:top"><strong>Subject</strong></td><td style="padding:8px 0;color:#1E293B">${safe.subject}</td></tr>
            <tr><td style="padding:8px 0;color:#6B7280;vertical-align:top"><strong>Message</strong></td><td style="padding:8px 0;color:#1E293B;white-space:pre-wrap">${safe.message}</td></tr>
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
