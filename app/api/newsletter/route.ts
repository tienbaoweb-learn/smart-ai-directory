import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { escapeHtml } from "@/lib/escape-html";
import { getClientIp, isRateLimited } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  try {
    if (isRateLimited(`newsletter:${getClientIp(req)}`)) {
      return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
    }

    const { email, website } = await req.json();

    // Honeypot: hidden field real users never fill — pretend success for bots
    if (website) {
      return NextResponse.json({ success: true });
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    if (String(email).length > 254) {
      return NextResponse.json({ error: "Input too long" }, { status: 400 });
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
      subject: `[Newsletter] New subscriber: ${email}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;border:1px solid #e5e7eb;border-radius:12px">
          <h2 style="color:#1E293B;margin-bottom:8px">New Newsletter Subscriber</h2>
          <p style="color:#6B7280;font-size:14px;margin-bottom:16px">Someone just subscribed to the SmartAI for Work weekly newsletter.</p>
          <div style="background:#f8fafc;border-radius:8px;padding:16px">
            <p style="margin:0;color:#1E293B;font-size:16px;font-weight:600">${escapeHtml(String(email))}</p>
          </div>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0"/>
          <p style="font-size:12px;color:#9CA3AF">Sent via SmartAIforWork.com newsletter form</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Newsletter email error:", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
