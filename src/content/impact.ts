import type { ImpactContent } from "./types";

/**
 * Values and impact figures.
 *
 * The value descriptions restate program areas the Foundation has already
 * confirmed, so the section communicates purpose without asserting results.
 *
 * `stats` is deliberately empty. `ImpactStat.verified` gates rendering, so a
 * figure only appears once a human has confirmed it; verified numbers can be
 * added here without any change to the component. See AGENTS.md rule 8.
 */
const impact: ImpactContent = {
  values: [
    {
      id: "community-support",
      title: "Community Support",
      description:
        "Practical support for children and families experiencing financial hardship.",
      icon: "community",
    },
    {
      id: "education",
      title: "Education",
      description:
        "Supporting children from low-income families to take part in education.",
      icon: "education",
    },
    {
      id: "opportunity",
      title: "Opportunity",
      description:
        "Scholarships and grants are a program area the Foundation is developing.",
      icon: "opportunity",
    },
    {
      id: "health",
      title: "Health & Wellbeing",
      description:
        "Health-awareness programs are part of the Foundation's community work.",
      icon: "health",
    },
    {
      id: "volunteerism",
      title: "Volunteerism",
      description:
        "Volunteers support the Foundation through outreach, events, and fundraising.",
      icon: "volunteer",
    },
    {
      id: "connection",
      title: "Community Connection",
      description:
        "Community events and workshops bring people together.",
      icon: "connection",
    },
  ],
  stats: [],
};

/**
 * Async so the body can be swapped for a CMS or database query in a later phase
 * without changing any caller. See AGENTS.md.
 */
export async function getImpactContent(): Promise<ImpactContent> {
  return impact;
}

/**
 * Only figures a human has confirmed, and only once a value exists. A statistic
 * with no number is treated as unpublished rather than rendered as zero.
 */
export async function getVerifiedStats() {
  const { stats } = await getImpactContent();
  return stats.filter((stat) => stat.verified && stat.value !== null);
}
