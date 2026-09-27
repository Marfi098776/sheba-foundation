import { NextRequest, NextResponse } from "next/server";
import {
  sendEmail,
  validateEmailConfig,
  buildContactEmailHtml,
  buildContactEmailText,
  sanitizeForEmail,
} from "@/lib/email";

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  honeypot?: string;
}

const MAX_BODY_SIZE = 1024 * 1024; // 1 MB

export async function POST(request: NextRequest) {
  // Basic request size check
  const contentLength = request.headers.get("content-length");
  if (contentLength && parseInt(contentLength, 10) > MAX_BODY_SIZE) {
    return NextResponse.json(
      { success: false, error: "Request too large" },
      { status: 413 }
    );
  }

  // Parse and validate JSON body
  let body: ContactFormData;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body" },
      { status: 400 }
    );
  }

  // Honeypot bot detection
  if (body.honeypot && body.honeypot.trim().length > 0) {
    // Silently succeed to not reveal the honeypot
    return NextResponse.json({ success: true });
  }

  // Server-side validation
  const errors: Record<string, string> = {};

  const name = sanitizeForEmail(body.name, 100);
  if (!name || name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters";
  }

  const email = sanitizeForEmail(body.email, 254);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.email = "Valid email is required";
  }

  const phone = body.phone ? sanitizeForEmail(body.phone, 30) : undefined;
  if (phone && phone.length > 30) {
    errors.phone = "Phone number is too long";
  }

  const subject = sanitizeForEmail(body.subject, 200);
  if (!subject || subject.trim().length === 0) {
    errors.subject = "Subject is required";
  }

  const message = sanitizeForEmail(body.message, 5000);
  if (!message || message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters";
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { success: false, error: "Validation failed", details: errors },
      { status: 400 }
    );
  }

  // Validate email configuration
  const config = validateEmailConfig();
  if (!config.valid) {
    console.error("Email configuration missing:", config.missing);
    return NextResponse.json(
      { success: false, error: "Email service is not configured. Please try again later." },
      { status: 503 }
    );
  }

  const recipientEmail = process.env.CONTACT_RECIPIENT_EMAIL!;
  const fromEmail = process.env.EMAIL_FROM!;
  const submittedAt = new Date().toISOString();

  // Send email
  const result = await sendEmail({
    to: recipientEmail,
    from: fromEmail,
    subject: `Contact Form: ${subject}`,
    html: buildContactEmailHtml({ name, email, phone, subject, message, submittedAt }),
    text: buildContactEmailText({ name, email, phone, subject, message, submittedAt }),
    replyTo: email,
  });

  if (!result.success) {
    console.error("Failed to send contact email:", result.error);
    return NextResponse.json(
      { success: false, error: "Failed to send message. Please try again or contact us through WhatsApp." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}