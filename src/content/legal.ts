/**
 * Legal content for Privacy Policy and Terms of Use.
 *
 * The Foundation has not supplied official legal copy. The content below is
 * structural placeholder text that clearly indicates its draft/pending status.
 * When official legal copy is approved, it replaces these placeholders without
 * requiring page redesign.
 */

export type LegalStatus = "draft" | "published";

export interface LegalSection {
  id: string;
  title: string;
  content: string | string[];
}

export interface LegalDocument {
  slug: string;
  title: string;
  description: string | null;
  status: LegalStatus;
  effectiveDate: string | null;
  lastUpdated: string | null;
  sections: LegalSection[];
}

/**
 * Privacy Policy structure.
 *
 * Current status: DRAFT - Information to be finalized by the Foundation.
 * Official legal copy has not been supplied.
 */
export const privacyPolicy: LegalDocument = {
  slug: "privacy-policy",
  title: "Privacy Policy",
  description:
    "How the Canadian Sheba Foundation collects, uses, and protects your personal information.",
  status: "draft",
  effectiveDate: null,
  lastUpdated: null,
  sections: [
    {
      id: "introduction",
      title: "Introduction",
      content:
        "This Privacy Policy describes how the Canadian Sheba Foundation (\"the Foundation\", \"we\", \"us\", or \"our\") collects, uses, and shares information when you visit our website or interact with our organization. This policy is a draft and will be replaced with the Foundation's official privacy policy once approved.",
    },
    {
      id: "information-collected",
      title: "Information We Collect",
      content: [
        "We may collect the following types of information:",
        "Personal information you provide voluntarily (e.g., name, email, phone) when you contact us, sign up for updates, or express interest in volunteering or donating.",
        "Automatically collected information such as IP address, browser type, pages visited, and referral source through standard web analytics.",
        "Information from third-party services when you interact with embedded content (e.g., donation platforms, social media).",
      ],
    },
    {
      id: "how-information-used",
      title: "How We Use Your Information",
      content: [
        "We may use collected information to:",
        "Respond to inquiries and provide information about our programs.",
        "Process volunteer interest and coordinate volunteer activities.",
        "Facilitate donations through external platforms (we do not process payments directly).",
        "Send organizational updates and newsletters (with your consent).",
        "Improve our website and user experience.",
        "Comply with legal obligations.",
      ],
    },
    {
      id: "how-information-shared",
      title: "How We Share Your Information",
      content: [
        "We do not sell personal information. We may share information with:",
        "Third-party service providers who operate on our behalf (e.g., donation platforms, email services) under data processing agreements.",
        "Legal authorities when required by law.",
        "Partners only with your explicit consent for specific programs.",
      ],
    },
    {
      id: "cookies-analytics",
      title: "Cookies and Analytics",
      content:
        "Our website may use cookies and similar technologies for essential functionality and analytics. We use privacy-respecting analytics that do not track individuals across sites. You can configure your browser to refuse cookies, though some site features may not function as intended.",
    },
    {
      id: "third-party-services",
      title: "Third-Party Services",
      content: [
        "Our website may integrate with or link to third-party services including:",
        "External donation platforms (when confirmed).",
        "Social media platforms.",
        "Analytics providers.",
        "These services have their own privacy policies. We encourage you to review them.",
      ],
    },
    {
      id: "data-retention",
      title: "Data Retention",
      content:
        "We retain personal information only as long as necessary to fulfill the purposes outlined in this policy, or as required by law. When information is no longer needed, we securely delete or anonymize it.",
    },
    {
      id: "security",
      title: "Security",
      content:
        "We implement reasonable technical and organizational measures to protect personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure.",
    },
    {
      id: "user-rights",
      title: "Your Rights",
      content: [
        "Depending on your jurisdiction, you may have rights regarding your personal information, including:",
        "The right to access, correct, or delete your data.",
        "The right to object to or restrict processing.",
        "The right to data portability.",
        "The right to withdraw consent.",
        "To exercise these rights, please contact us using the information below.",
      ],
    },
    {
      id: "contact-information",
      title: "Contact Information",
      content:
        "Questions about this Privacy Policy or our data practices can be directed to the Foundation through our Contact page. Official contact details will be published once confirmed by the Foundation.",
    },
    {
      id: "policy-updates",
      title: "Policy Updates",
      content:
        "We may update this Privacy Policy from time to time. The effective date at the top of this page indicates the most recent revision. Continued use of our website after changes constitutes acceptance of the updated policy.",
    },
  ],
};

/**
 * Terms of Use structure.
 *
 * Current status: DRAFT - Information to be finalized by the Foundation.
 * Official legal copy has not been supplied.
 */
export const termsOfUse: LegalDocument = {
  slug: "terms-of-use",
  title: "Terms of Use",
  description:
    "Terms and conditions for using the Canadian Sheba Foundation website.",
  status: "draft",
  effectiveDate: null,
  lastUpdated: null,
  sections: [
    {
      id: "acceptance",
      title: "Acceptance of Terms",
      content:
        "By accessing and using the Canadian Sheba Foundation website (\"the Site\"), you agree to be bound by these Terms of Use (\"Terms\"). If you do not agree with any part of these Terms, please do not use the Site. These Terms are a draft and will be replaced with the Foundation's official terms once approved.",
    },
    {
      id: "website-use",
      title: "Use of the Website",
      content: [
        "You may use the Site for lawful purposes and in accordance with these Terms. You agree not to:",
        "Use the Site in any way that violates applicable laws or regulations.",
        "Attempt to gain unauthorized access to any portion of the Site or its systems.",
        "Interfere with the proper functioning of the Site.",
        "Use the Site to transmit harmful code or spam.",
        "Scrape, harvest, or extract content without permission.",
      ],
    },
    {
      id: "intellectual-property",
      title: "Intellectual Property",
      content:
        "All content on the Site, including text, graphics, logos, images, and design, is the property of the Canadian Sheba Foundation or its licensors and is protected by copyright and other intellectual property laws. You may not reproduce, distribute, or create derivative works without prior written permission, except for personal, non-commercial use or as permitted by law.",
    },
    {
      id: "content-accuracy",
      title: "Content Accuracy",
      content:
        "We strive to provide accurate and up-to-date information on the Site. However, we make no warranties or representations regarding the completeness, accuracy, or reliability of any content. Information about programs, events, and services is subject to change without notice. The Foundation is not liable for any errors or omissions.",
    },
    {
      id: "external-links",
      title: "External Links",
      content:
        "The Site may contain links to third-party websites or services (e.g., donation platforms, social media). These links are provided for convenience only. The Foundation does not control, endorse, or assume responsibility for the content, privacy practices, or security of any third-party sites.",
    },
    {
      id: "donations",
      title: "Donations",
      content:
        "Donations to the Foundation are processed through external platforms. The Foundation does not collect payment information directly on this Site. Donation terms, receipting, and refund policies are governed by the external platform and the Foundation's official policies (when published). No donation terms on this Site constitute a binding agreement.",
    },
    {
      id: "volunteer-information",
      title: "Volunteer Information",
      content:
        "Information about volunteer opportunities is provided for informational purposes. Volunteer registration, when available, will be handled through an external service. The Foundation makes no guarantees regarding volunteer placement, scheduling, or specific roles until officially confirmed.",
    },
    {
      id: "user-submissions",
      title: "User Submissions",
      content:
        "Any content you submit through contact forms, volunteer interest forms, or other interactive features becomes the property of the Foundation. By submitting, you grant the Foundation a perpetual, royalty-free license to use, modify, and display such content for organizational purposes.",
    },
    {
      id: "limitation-of-liability",
      title: "Limitation of Liability",
      content:
        "To the fullest extent permitted by law, the Canadian Sheba Foundation and its directors, officers, employees, and volunteers shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Site or reliance on its content. This limitation applies regardless of the legal theory.",
    },
    {
      id: "changes-to-terms",
      title: "Changes to Terms",
      content:
        "We may modify these Terms at any time. Changes take effect upon posting to this page with an updated effective date. Your continued use of the Site after changes constitutes acceptance of the new Terms. We encourage you to review these Terms periodically.",
    },
    {
      id: "governing-law",
      title: "Governing Law",
      content:
        "These Terms shall be governed by and construed in accordance with the laws of the applicable Canadian jurisdiction. The official governing jurisdiction will be specified in the Foundation's final approved Terms.",
    },
    {
      id: "contact-information",
      title: "Contact Information",
      content:
        "Questions about these Terms of Use can be directed to the Foundation through our Contact page. Official contact details will be published once confirmed by the Foundation.",
    },
  ],
};

/**
 * Returns the privacy policy document.
 */
export async function getPrivacyPolicy(): Promise<LegalDocument> {
  return privacyPolicy;
}

/**
 * Returns the terms of use document.
 */
export async function getTermsOfUse(): Promise<LegalDocument> {
  return termsOfUse;
}