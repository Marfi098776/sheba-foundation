export interface WhatsAppConfig {
  phoneNumber: string | null;
  defaultMessage?: string;
}

/**
 * Builds a WhatsApp URL from configuration.
 * Returns null if phone number is not configured.
 */
export function buildWhatsAppUrl(config: WhatsAppConfig): string | null {
  if (!config.phoneNumber) return null;

  // Strip all non-digit characters except leading +
  const cleaned = config.phoneNumber.replace(/[^\d+]/g, "");

  // Ensure it starts with + for international format
  const formatted = cleaned.startsWith("+") ? cleaned : `+${cleaned}`;

  const baseUrl = `https://wa.me/${formatted.replace("+", "")}`;
  const message = config.defaultMessage
    ? `?text=${encodeURIComponent(config.defaultMessage)}`
    : "";

  return `${baseUrl}${message}`;
}

/**
 * Checks if WhatsApp is configured and available.
 */
export function isWhatsAppConfigured(config: WhatsAppConfig): boolean {
  return Boolean(config.phoneNumber && config.phoneNumber.trim().length > 0);
}

/**
 * Default WhatsApp message for general inquiries.
 */
export const DEFAULT_WHATSAPP_MESSAGE =
  "Hello, I would like to learn more about Canadian Sheba Foundation.";

/**
 * Default WhatsApp message for contact page.
 */
export const CONTACT_WHATSAPP_MESSAGE =
  "Hello, I would like to contact Canadian Sheba Foundation.";

/**
 * Default WhatsApp message for volunteer page.
 */
export const VOLUNTEER_WHATSAPP_MESSAGE =
  "Hello, I am interested in volunteering with Canadian Sheba Foundation.";