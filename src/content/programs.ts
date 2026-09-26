import type { Program } from "./types";

/**
 * Program directory.
 *
 * The activity lists below restate program areas the Foundation has confirmed.
 * Nothing is added beyond that: no eligibility rules, award amounts, deadlines,
 * service commitments, or statistics.
 *
 * `dedicatedRoute` marks programs that also have a top-level page, so
 * `/programs/[slug]` can redirect to the canonical URL instead of creating a
 * duplicate page.
 */
const programs: Program[] = [
  {
    slug: "family-support",
    title: "Family Support",
    category: "family-support",
    summary:
      "Practical support for children and families experiencing financial hardship.",
    description: null,
    activities: [
      {
        title: "Educational support for children",
        description:
          "Support for children from low-income families to take part in education.",
      },
      { title: "School supplies", description: null },
      { title: "Healthy food and meal assistance", description: null },
      {
        title: "Limited financial assistance",
        description:
          "Offered in special circumstances.",
      },
    ],
    dedicatedRoute: "/family-support",
    status: "active",
    image: null,
  },
  {
    slug: "community-programs",
    title: "Community Programs",
    category: "community",
    summary:
      "Educational, health-awareness, and community events that bring people together.",
    description: null,
    activities: [
      { title: "Educational seminars", description: null },
      { title: "Health-awareness programs", description: null },
      { title: "Community workshops", description: null },
      { title: "Charity events", description: null },
      { title: "Fundraising events", description: null },
    ],
    dedicatedRoute: null,
    status: "active",
    image: null,
  },
  {
    slug: "volunteer-program",
    title: "Volunteer Program",
    category: "volunteer",
    summary:
      "Ways to support the Foundation's work through outreach, events, and fundraising.",
    description: null,
    activities: [
      { title: "Community outreach", description: null },
      { title: "Event volunteering", description: null },
      { title: "Fundraising support", description: null },
    ],
    dedicatedRoute: "/volunteer",
    status: "active",
    image: null,
  },
  {
    slug: "scholarships-grants",
    title: "Scholarships & Grants",
    category: "scholarships",
    summary:
      "A program area the Foundation has identified. Official eligibility and application details are still to be confirmed.",
    description: null,
    activities: [],
    dedicatedRoute: "/scholarships",
    status: "pending-details",
    image: null,
  },
  {
    slug: "newcomer-refugee-support",
    title: "Newcomer & Refugee Support",
    category: "newcomer-support",
    summary:
      "A program area the Foundation has identified. The specific services offered are still to be confirmed.",
    description: null,
    activities: [],
    dedicatedRoute: "/newcomer-refugee-support",
    status: "pending-details",
    image: null,
  },
];

export async function getPrograms(): Promise<Program[]> {
  return programs;
}

/** Returns undefined for an unknown slug so callers can call `notFound()`. */
export async function getProgram(slug: string): Promise<Program | undefined> {
  return programs.find((program) => program.slug === slug);
}
