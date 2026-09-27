import type { VolunteerInfo } from "./types";

/**
 * Volunteer page content.
 *
 * Opportunities restate the confirmed areas the Foundation has identified.
 * No registration system exists in Phase 1.
 */
export type VolunteerPageContent = VolunteerInfo & {
  title: string;
  summary: string;
  hero: { eyebrow: string; title: string; description: string };
  whyVolunteer: Array<{ title: string; description: string }>;
  waysToVolunteer: Array<{ title: string; description: string }>;
  whatVolunteersContribute: string[];
  faq: Array<{ question: string; answer: string }>;
  finalCta: {
    title: string;
    description: string;
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel: string;
    secondaryHref: string;
  };
  whatsapp: {
    enabled: boolean;
    defaultMessage: string;
  };
};

export const volunteerContent: VolunteerPageContent = {
  title: "Volunteer",
  summary:
    "Ways to support the Foundation's work through outreach, events, and fundraising.",
  description: null,
  opportunities: [
    "Community outreach",
    "Event volunteering",
    "Fundraising support",
  ],
  registrationAvailable: false,
  registrationUrl: null,
  hero: {
    eyebrow: "Get involved",
    title: "Volunteer with Us",
    description:
      "Volunteers are essential to the Foundation's community-focused work. Whether you can give a few hours or a regular commitment, there are meaningful ways to contribute.",
  },
  whyVolunteer: [
    {
      title: "Direct community impact",
      description:
        "Your time helps deliver programs and events that reach families and individuals where they live.",
    },
    {
      title: "Build connections",
      description:
        "Work alongside other volunteers, community members, and the Foundation's team.",
    },
    {
      title: "Use your skills",
      description:
        "Contribute professional expertise, organisational ability, or simply your enthusiasm.",
    },
    {
      title: "Flexible involvement",
      description:
        "Opportunities range from one-time events to ongoing roles, so you can participate in a way that fits your schedule.",
    },
  ],
  waysToVolunteer: [
    {
      title: "Community outreach",
      description:
        "Help connect the Foundation with local communities, share information about programs, and build relationships with partner organisations.",
    },
    {
      title: "Event volunteering",
      description:
        "Support the planning and delivery of educational seminars, health-awareness programs, community workshops, charity events, and fundraising events.",
    },
    {
      title: "Fundraising support",
      description:
        "Assist with donor outreach, campaign coordination, event fundraising, and other activities that sustain the Foundation's programs.",
    },
  ],
  whatVolunteersContribute: [
    "Time and energy at events and activities",
    "Professional skills (communications, finance, administration, etc.)",
    "Community knowledge and local connections",
    "Enthusiasm for the Foundation's mission",
  ],
  faq: [
    {
      question: "Do I need previous volunteer experience?",
      answer:
        "No. We welcome volunteers at all experience levels. Training and guidance are provided for each role.",
    },
    {
      question: "What is the time commitment?",
      answer:
        "It varies. Some roles are a few hours at a single event; others involve a regular weekly or monthly commitment. You can choose what fits your schedule.",
    },
    {
      question: "Are there age requirements?",
      answer:
        "Most roles are open to adults 18+. Youth volunteer opportunities may be available for certain events with parental consent. Specific requirements will be listed with each opportunity.",
    },
    {
      question: "Can I volunteer remotely?",
      answer:
        "Some roles, such as administrative support or outreach planning, may be done remotely. Event-based roles typically require in-person attendance.",
    },
    {
      question: "How will I know about upcoming opportunities?",
      answer:
        "Once the registration system is live, registered volunteers will receive updates about new opportunities. Until then, check this page and the Foundation's communications for announcements.",
    },
  ],
  finalCta: {
    title: "Ready to help?",
    description:
      "When volunteer registration opens, you'll be able to sign up and choose the opportunities that match your interests and availability.",
    primaryLabel: "Check for updates",
    primaryHref: "/volunteer",
    secondaryLabel: "Contact us",
    secondaryHref: "/contact",
  },
  whatsapp: {
    enabled: false,
    defaultMessage: "Hello, I am interested in volunteering with Canadian Sheba Foundation.",
  },
};

export async function getVolunteerContent(): Promise<VolunteerPageContent> {
  return volunteerContent;
}