/**
 * Partnerships and corporate sponsorship content.
 *
 * The Foundation has not yet published official partnership programs, sponsorship
 * tiers, or corporate partner details. The structure below supports future
 * partnership outreach while clearly indicating that specific opportunities
 * are pending confirmation.
 */

export type PartnershipCategory =
  | "corporate-sponsorship"
  | "community-partnership"
  | "event-partnership"
  | "in-kind-support"
  | "fundraising-collaboration";

export interface PartnershipOpportunity {
  id: string;
  title: string;
  category: PartnershipCategory;
  description: string;
  details: string | null;
  status: "available" | "pending-details";
}

export interface PartnershipPageContent {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
  };
  whyPartner: Array<{
    title: string;
    description: string;
  }>;
  opportunities: PartnershipOpportunity[];
  howToPartner: {
    title: string;
    description: string;
    ctaLabel: string;
    ctaHref: string;
  };
  statusNotice: string;
}

const partnershipsContent: PartnershipPageContent = {
  hero: {
    eyebrow: "Work with us",
    title: "Partnerships & Corporate Sponsorship",
    description:
      "The Canadian Sheba Foundation welcomes collaboration with organizations that share our commitment to serving communities and creating opportunities. Partnership opportunities are currently being developed and will be published once confirmed.",
  },
  whyPartner: [
    {
      title: "Direct community impact",
      description:
        "Partner with an organization focused on practical support for families, education, and community wellbeing.",
    },
    {
      title: "Alignment with purpose",
      description:
        "Demonstrate your organization's commitment to social responsibility and community investment.",
    },
    {
      title: "Recognition and visibility",
      description:
        "Gain visibility through event recognition, digital presence, and community goodwill (details to be confirmed).",
    },
    {
      title: "Flexible engagement",
      description:
        "Partnership models can be tailored to your organization's capacity and objectives.",
    },
  ],
  opportunities: [
    {
      id: "corporate-sponsorship",
      title: "Corporate Sponsorship",
      category: "corporate-sponsorship",
      description:
        "Support the Foundation's core programs or specific initiatives through financial sponsorship. Sponsorship tiers and benefits are pending confirmation.",
      details: null,
      status: "pending-details",
    },
    {
      id: "community-partnership",
      title: "Community Partnership",
      category: "community-partnership",
      description:
        "Collaborate with local organizations, service providers, and community groups to extend program reach and coordinate support.",
      details: null,
      status: "pending-details",
    },
    {
      id: "event-partnership",
      title: "Event Partnership",
      category: "event-partnership",
      description:
        "Co-host or sponsor community events, educational seminars, health-awareness programs, and fundraising activities.",
      details: null,
      status: "pending-details",
    },
    {
      id: "in-kind-support",
      title: "In-Kind Support",
      category: "in-kind-support",
      description:
        "Contribute goods, services, or expertise (e.g., venue space, professional services, supplies) to support Foundation operations and events.",
      details: null,
      status: "pending-details",
    },
    {
      id: "fundraising-collaboration",
      title: "Fundraising Collaboration",
      category: "fundraising-collaboration",
      description:
        "Partner on joint fundraising campaigns, matching gift programs, or cause-related marketing initiatives.",
      details: null,
      status: "pending-details",
    },
  ],
  howToPartner: {
    title: "How to discuss a partnership",
    description:
      "The Foundation does not yet have a formal partnership application process. Organizations interested in exploring collaboration are invited to contact us directly to start a conversation.",
    ctaLabel: "Contact Us",
    ctaHref: "/contact",
  },
  statusNotice:
    "Partnership opportunities, sponsorship tiers, and benefit packages are currently under development. The information above outlines potential areas for collaboration. Specific details will be published once approved by the Foundation. No formal partnerships or corporate sponsors are currently confirmed.",
};

export async function getPartnershipsContent(): Promise<PartnershipPageContent> {
  return partnershipsContent;
}