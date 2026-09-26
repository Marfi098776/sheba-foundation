import type { ContactInfo } from "./types";

/**
 * Contact page content.
 *
 * All contact details are null until the client supplies them.
 * Do not replace null with placeholder values.
 */
export const contactContent = {
  title: "Contact Us",
  summary: "How to reach the Canadian Sheba Foundation.",
  introduction:
    "We welcome inquiries about the Foundation's programs, volunteer opportunities, and ways to support our work. Contact information will be published here once confirmed by the Foundation.",
  contact: {
    email: null,
    phone: null,
    address: null,
    hours: null,
  } satisfies ContactInfo,
  social: [] as Array<{ label: string; href: string | null }>,
  form: {
    enabled: false,
    note: "The contact form is currently being prepared. Please check back later or use the contact details above once published.",
  },
  generalNotice:
    "Contact information to be provided by the Foundation. This page will be updated once official details are confirmed.",
};

export type ContactPageContent = typeof contactContent;

export async function getContactContent(): Promise<ContactPageContent> {
  return contactContent;
}