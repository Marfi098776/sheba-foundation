/**
 * Email utility for the Canadian Sheba Foundation.
 *
 * Uses Resend as the transactional email provider. Resend is well-suited for
 * Vercel/Next.js server-side usage with a simple HTTP API.
 *
 * All provider-specific code is isolated here so form logic remains decoupled.
 */

interface EmailOptions {
  to: string;
  from: string;
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
}

interface SendEmailResult {
  success: boolean;
  error?: string;
}

const RESEND_API_URL = "https://api.resend.com/emails";

/**
 * Sends an email using Resend's HTTP API.
 *
 * This function runs only on the server. It reads the API key from the
 * environment and never exposes it to the client.
 */
export async function sendEmail(options: EmailOptions): Promise<SendEmailResult> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return {
      success: false,
      error: "Email service not configured: RESEND_API_KEY is missing",
    };
  }

  const payload = {
    from: options.from,
    to: [options.to],
    subject: options.subject,
    html: options.html,
    text: options.text,
    ...(options.replyTo ? { reply_to: options.replyTo } : {}),
  };

  try {
    const response = await fetch(RESEND_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        error: `Email provider error: ${response.status} ${errorData.message || response.statusText}`,
      };
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown email sending error",
    };
  }
}

/**
 * Validates that required email configuration is present.
 * Use this in API routes before attempting to send.
 */
export function validateEmailConfig(): { valid: boolean; missing: string[] } {
  const missing: string[] = [];

  if (!process.env.RESEND_API_KEY) missing.push("RESEND_API_KEY");
  if (!process.env.CONTACT_RECIPIENT_EMAIL) missing.push("CONTACT_RECIPIENT_EMAIL");
  if (!process.env.EMAIL_FROM) missing.push("EMAIL_FROM");

  return { valid: missing.length === 0, missing };
}

/**
 * Sanitizes a string for safe inclusion in email content.
 * Strips control characters and limits length.
 */
export function sanitizeForEmail(value: string, maxLength: number = 2000): string {
  if (!value) return "";
  return value
    .replace(/[\x00-\x1F\x7F]/g, "") // Remove control characters
    .trim()
    .slice(0, maxLength);
}

/**
 * Builds the contact form email HTML.
 */
export function buildContactEmailHtml(data: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  submittedAt: string;
}): string {
  const { name, email, phone, subject, message, submittedAt } = data;

  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1f2937; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: #f8fafc; border-radius: 8px; padding: 24px; border: 1px solid #e2e8f0;">
      <h1 style="margin: 0 0 16px 0; font-size: 20px; font-weight: 600; color: #1e3a8a;">Contact Form Submission</h1>
      <p style="margin: 0 0 16px 0; color: #64748b; font-size: 14px;">Received on ${submittedAt}</p>
      
      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
      
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 0; font-weight: 600; color: #374151; width: 120px;">Name:</td>
          <td style="padding: 8px 0; color: #1f2937;">${sanitizeForEmail(name)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: 600; color: #374151;">Email:</td>
          <td style="padding: 8px 0; color: #1f2937;"><a href="mailto:${sanitizeForEmail(email)}" style="color: #1e3a8a;">${sanitizeForEmail(email)}</a></td>
        </tr>
        ${phone ? `
        <tr>
          <td style="padding: 8px 0; font-weight: 600; color: #374151;">Phone:</td>
          <td style="padding: 8px 0; color: #1f2937;">${sanitizeForEmail(phone)}</td>
        </tr>
        ` : ""}
        <tr>
          <td style="padding: 8px 0; font-weight: 600; color: #374151;">Subject:</td>
          <td style="padding: 8px 0; color: #1f2937;">${sanitizeForEmail(subject)}</td>
        </tr>
      </table>
      
      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
      
      <p style="margin: 0 0 8px 0; font-weight: 600; color: #374151;">Message:</p>
      <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 6px; padding: 16px; white-space: pre-wrap; word-wrap: break-word;">${sanitizeForEmail(message, 5000)}</div>
      
      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0 0 0;" />
      <p style="margin: 16px 0 0 0; font-size: 12px; color: #94a3b8;">This email was sent from the Canadian Sheba Foundation contact form.</p>
    </div>
  </body>
</html>
  `.trim();
}

/**
 * Builds the contact form email plain text version.
 */
export function buildContactEmailText(data: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  submittedAt: string;
}): string {
  const { name, email, phone, subject, message, submittedAt } = data;

  return `
Contact Form Submission
Received on ${submittedAt}

Name: ${sanitizeForEmail(name)}
Email: ${sanitizeForEmail(email)}
${phone ? `Phone: ${sanitizeForEmail(phone)}` : ""}
Subject: ${sanitizeForEmail(subject)}

Message:
${sanitizeForEmail(message, 5000)}

---
This email was sent from the Canadian Sheba Foundation contact form.
  `.trim();
}

/**
 * Builds the volunteer registration email HTML.
 */
export function buildVolunteerEmailHtml(data: {
  fullName: string;
  email: string;
  phone: string;
  areaOrCommunity?: string;
  areasOfInterest: string[];
  availability: string;
  message?: string;
  submittedAt: string;
}): string {
  const { fullName, email, phone, areaOrCommunity, areasOfInterest, availability, message, submittedAt } = data;

  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1f2937; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: #f8fafc; border-radius: 8px; padding: 24px; border: 1px solid #e2e8f0;">
      <h1 style="margin: 0 0 16px 0; font-size: 20px; font-weight: 600; color: #1e3a8a;">Volunteer Registration</h1>
      <p style="margin: 0 0 16px 0; color: #64748b; font-size: 14px;">Received on ${submittedAt}</p>
      
      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
      
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 0; font-weight: 600; color: #374151; width: 150px;">Full Name:</td>
          <td style="padding: 8px 0; color: #1f2937;">${sanitizeForEmail(fullName)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: 600; color: #374151;">Email:</td>
          <td style="padding: 8px 0; color: #1f2937;"><a href="mailto:${sanitizeForEmail(email)}" style="color: #1e3a8a;">${sanitizeForEmail(email)}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: 600; color: #374151;">Phone:</td>
          <td style="padding: 8px 0; color: #1f2937;">${sanitizeForEmail(phone)}</td>
        </tr>
        ${areaOrCommunity ? `
        <tr>
          <td style="padding: 8px 0; font-weight: 600; color: #374151;">Area/Community:</td>
          <td style="padding: 8px 0; color: #1f2937;">${sanitizeForEmail(areaOrCommunity)}</td>
        </tr>
        ` : ""}
        <tr>
          <td style="padding: 8px 0; font-weight: 600; color: #374151; vertical-align: top;">Interests:</td>
          <td style="padding: 8px 0; color: #1f2937;">${areasOfInterest.map(i => sanitizeForEmail(i)).join(", ")}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: 600; color: #374151;">Availability:</td>
          <td style="padding: 8px 0; color: #1f2937;">${sanitizeForEmail(availability)}</td>
        </tr>
      </table>
      
      ${message ? `
      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
      <p style="margin: 0 0 8px 0; font-weight: 600; color: #374151;">Additional Message:</p>
      <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 6px; padding: 16px; white-space: pre-wrap; word-wrap: break-word;">${sanitizeForEmail(message, 5000)}</div>
      ` : ""}
      
      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0 0 0;" />
      <p style="margin: 16px 0 0 0; font-size: 12px; color: #94a3b8;">This email was sent from the Canadian Sheba Foundation volunteer registration form.</p>
    </div>
  </body>
</html>
  `.trim();
}

/**
 * Builds the volunteer registration email plain text version.
 */
export function buildVolunteerEmailText(data: {
  fullName: string;
  email: string;
  phone: string;
  areaOrCommunity?: string;
  areasOfInterest: string[];
  availability: string;
  message?: string;
  submittedAt: string;
}): string {
  const { fullName, email, phone, areaOrCommunity, areasOfInterest, availability, message, submittedAt } = data;

  return `
Volunteer Registration
Received on ${submittedAt}

Full Name: ${sanitizeForEmail(fullName)}
Email: ${sanitizeForEmail(email)}
Phone: ${sanitizeForEmail(phone)}
${areaOrCommunity ? `Area/Community: ${sanitizeForEmail(areaOrCommunity)}` : ""}
Interests: ${areasOfInterest.map(i => sanitizeForEmail(i)).join(", ")}
Availability: ${sanitizeForEmail(availability)}
${message ? `\nAdditional Message:\n${sanitizeForEmail(message, 5000)}` : ""}

---
This email was sent from the Canadian Sheba Foundation volunteer registration form.
  `.trim();
}