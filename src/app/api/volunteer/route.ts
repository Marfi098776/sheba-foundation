import { NextRequest, NextResponse } from "next/server";
import {
  sendEmail,
  validateEmailConfig,
  buildVolunteerEmailHtml,
  buildVolunteerEmailText,
  sanitizeForEmail,
} from "@/lib/email";

interface VolunteerFormData {
  fullName: string;
  email: string;
  phone: string;
  areaOrCommunity?: string;
  areasOfInterest: string[];
  availability: string;
  message?: string;
  honeypot?: string;
}

const MAX_BODY_SIZE = 1024 * 1024; // 1 MB
const VALID_INTERESTS = [
  "Community outreach",
  "Event volunteering",
  "Fundraising support",
  "Administrative support",
  "Communications and marketing",
  "Other",
];
const VALID_AVAILABILITY = [
  "Weekday mornings",
  "Weekday afternoons",
  "Weekday evenings",
  "Weekend mornings",
  "Weekend afternoons",
  "Flexible / varies",
];

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
  let body: VolunteerFormData;
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

  const fullName = sanitizeForEmail(body.fullName, 100);
  if (!fullName || fullName.trim().length < 2) {
    errors.fullName = "Full name must be at least 2 characters";
  }

  const email = sanitizeForEmail(body.email, 254);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.email = "Valid email is required";
  }

  const phone = sanitizeForEmail(body.phone, 30);
  if (!phone || phone.trim().length < 10) {
    errors.phone = "Phone number is required";
  }

  const areaOrCommunity = body.areaOrCommunity
    ? sanitizeForEmail(body.areaOrCommunity, 100)
    : undefined;

  const areasOfInterest = Array.isArray(body.areasOfInterest)
    ? body.areasOfInterest
        .map((i) => sanitizeForEmail(i, 100))
        .filter((i) => VALID_INTERESTS.includes(i))
    : [];
  if (areasOfInterest.length === 0) {
    errors.areasOfInterest = "Select at least one area of interest";
  }

  const availability = sanitizeForEmail(body.availability, 100);
  if (!availability || !VALID_AVAILABILITY.includes(availability)) {
    errors.availability = "Valid availability is required";
  }

  const message = body.message
    ? sanitizeForEmail(body.message, 5000)
    : undefined;

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
    subject: `Volunteer Registration: ${fullName}`,
    html: buildVolunteerEmailHtml({
      fullName,
      email,
      phone,
      areaOrCommunity,
      areasOfInterest,
      availability,
      message,
      submittedAt,
    }),
    text: buildVolunteerEmailText({
      fullName,
      email,
      phone,
      areaOrCommunity,
      areasOfInterest,
      availability,
      message,
      submittedAt,
    }),
    replyTo: email,
  });

  if (!result.success) {
    console.error("Failed to send volunteer email:", result.error);
    return NextResponse.json(
      { success: false, error: "Failed to send registration. Please try again or contact us through WhatsApp." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}