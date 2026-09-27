import type { NavigationItem, SiteInfo } from "./types";

/**
 * Site-level configuration.
 *
 * Only the organization name, tagline, and route structure are confirmed. Every
 * fact the client has not supplied — address, phone, email, social profiles,
 * charity registration number, and the external donation URL — is `null`.
 *
 * Do not replace a `null` with a plausible value. Add the real value when the
 * client provides it.
 */

/** Placeholder marker for a value the client has not supplied yet. */
export const CLIENT_TO_PROVIDE = "[CLIENT TO PROVIDE]";

/**
 * Shown wherever a page's real body copy is still awaiting approved
 * organization materials. Centralised so the wording stays consistent and can
 * be removed in one place.
 */
export const CONTENT_PENDING_NOTICE =
  "This section will be published once the Canadian Sheba Foundation supplies approved organization materials.";

export const SITE_NAME = "Canadian Sheba Foundation";

export const SITE_TAGLINE =
  "Serving Communities, Supporting Dreams, Creating Opportunities.";

/**
 * Deployment origin. The client has not supplied a production domain, so this
 * stays `null` rather than guessing at a real one. Phase 1 renders no canonical
 * URLs or sitemap, so nothing depends on it yet; a later phase must confirm the
 * domain before any absolute URL is emitted.
 */
export const SITE_URL: string | null = null;

/**
 * WhatsApp configuration. The phone number should be in international format
 * (e.g., +15551234567). Null until the client supplies the official number.
 */
export const WHATSAPP_PHONE: string | null = null;

const NAV_ITEMS: NavigationItem[] = [
  { label: "Home", href: "/", group: "organization", inHeader: false },
  { label: "About Us", href: "/about", group: "organization", inHeader: true },
  {
    label: "Our Programs",
    href: "/programs",
    group: "programs",
    inHeader: true,
  },
  {
    label: "Family Support",
    href: "/family-support",
    group: "programs",
    inHeader: false,
  },
  {
    label: "Newcomer & Refugee Support",
    href: "/newcomer-refugee-support",
    group: "programs",
    inHeader: false,
  },
  {
    label: "Scholarships & Grants",
    href: "/scholarships",
    group: "programs",
    inHeader: false,
  },
  {
    label: "Donate",
    href: "/donate",
    group: "getInvolved",
    inHeader: false,
  },
  {
    label: "Partnerships",
    href: "/partnerships",
    group: "getInvolved",
    inHeader: false,
  },
  {
    label: "Volunteer",
    href: "/volunteer",
    group: "getInvolved",
    inHeader: true,
  },
  { label: "Events", href: "/events", group: "getInvolved", inHeader: true },
  {
    label: "News & Updates",
    href: "/news",
    group: "getInvolved",
    inHeader: true,
  },
  {
    label: "Financial Transparency",
    href: "/financial-transparency",
    group: "resources",
    inHeader: false,
  },
  {
    label: "Contact Us",
    href: "/contact",
    group: "getInvolved",
    inHeader: true,
  },
  {
    label: "Privacy Policy",
    href: "/privacy-policy",
    group: "resources",
    inHeader: false,
  },
  {
    label: "Terms of Use",
    href: "/terms-of-use",
    group: "resources",
    inHeader: false,
  },
];

const siteInfo: SiteInfo = {
  name: SITE_NAME,
  shortName: null,
  tagline: SITE_TAGLINE,
  url: SITE_URL,
  locale: "en",
  contact: {
    email: null,
    phone: null,
    address: null,
    hours: null,
  },
  donation: {
    platform: null,
    url: null,
    status: "pending",
    note: null,
  },
  // Empty until the client confirms which platforms the Foundation uses.
  social: [],
  nav: NAV_ITEMS,
  whatsappPhone: WHATSAPP_PHONE,
};

/**
 * Async so the body can be swapped for a CMS or database query in a later
 * phase without changing any caller. See AGENTS.md.
 */
export async function getSiteContent(): Promise<SiteInfo> {
  return siteInfo;
}

/** Navigation for the desktop header. */
export async function getHeaderNav(): Promise<NavigationItem[]> {
  return siteInfo.nav.filter((item) => item.inHeader);
}

/** Every navigation destination, for the mobile menu. */
export async function getAllNav(): Promise<NavigationItem[]> {
  return siteInfo.nav;
}

/**
 * Returns the WhatsApp configuration for the site.
 * The phone number is read from environment at runtime in the component layer.
 */
export function getWhatsAppConfig() {
  return {
    phoneNumber: WHATSAPP_PHONE,
  };
}