import type { HomeContent } from "./types";

/**
 * Homepage copy.
 *
 * PROVISIONAL. The Foundation has not yet supplied approved website wording, so
 * every string below is temporary and is deliberately written to restate only
 * what has already been confirmed — the program areas in `programs.ts` and the
 * volunteering activities in `organization.ts`. There are no statistics, dates,
 * locations, beneficiary counts, or outcomes here, because none have been
 * verified.
 *
 * The hero heading is not stored here: it is `SITE_TAGLINE` in `site.ts`, which
 * is the Foundation's own main message.
 *
 * Replace this file's contents with approved copy when it arrives. The section
 * components take no copy props, so nothing else needs to change.
 */
const home: HomeContent = {
  hero: {
    eyebrow: "Canadian Sheba Foundation",
    supportingText:
      "The Foundation brings together practical support for families, educational programs, community events, and volunteering, with the aim of creating opportunities for the people and communities it serves.",
  },

  mission: {
    eyebrow: "Who we are",
    title: "What the Foundation exists to do",
    body: "Families and communities are at the centre of the Foundation's work. That work is organised around practical, direct areas: family support, community programs, the volunteer program, scholarships and grants, and newcomer and refugee support. Each area is described on this site with only the detail that has been confirmed so far, and fuller information is published as it is confirmed.",
    ctaLabel: "About the Foundation",
    ctaHref: "/about",
  },

  programs: {
    eyebrow: "What we do",
    title: "Our Programs",
    description:
      "The Foundation's program areas, described with the detail currently confirmed.",
    ctaLabel: "View all programs",
    ctaHref: "/programs",
  },

  values: {
    eyebrow: "Our focus",
    title: "What We Focus On",
    description:
      "The themes the Foundation's confirmed program areas add up to. Figures are published here only once they have been verified.",
  },

  getInvolved: {
    eyebrow: "Take part",
    title: "Get Involved",
    description:
      "There are several ways to support the Foundation's work and stay connected to its community.",
    paths: [
      {
        id: "volunteer",
        title: "Volunteer",
        description:
          "Support the Foundation's work directly. Current volunteering activities are listed on the volunteer page.",
        href: "/volunteer",
        linkLabel: "Volunteer with us",
        icon: "volunteer",
      },
      {
        id: "partner",
        title: "Partner With Us",
        description:
          "Get in touch to discuss partnership ideas. The Foundation has not published a formal partnership process yet.",
        href: "/contact",
        linkLabel: "Start a conversation",
        icon: "partner",
      },
      {
        id: "events",
        title: "Attend Events",
        description:
          "Community events and fundraising events are part of the Foundation's program areas. Dates are posted on the events page.",
        href: "/events",
        linkLabel: "See events",
        icon: "events",
      },
    ],
  },

  support: {
    eyebrow: "Support our work",
    title: "Support Our Work",
    body: "Supporting the Foundation helps sustain its community-focused work across family support, education, community programs, and volunteering.",
    secondaryLabel: "Learn About Our Work",
    secondaryHref: "/about",
  },

  updates: {
    eyebrow: "Stay informed",
    title: "Events & Updates",
    description:
      "Community events, fundraising events, and Foundation news appear here as they are published.",
    emptyTitle: "No events or updates published yet",
    emptyBody:
      "The Foundation has not published any events or news articles yet. Both pages are updated as content is confirmed.",
  },

  final: {
    title: "Be Part of the Community",
    body: "Volunteer, donate, or get in touch. Each of these supports the Foundation's community-focused work.",
    volunteerLabel: "Volunteer",
    donateLabel: "Donate",
    contactLabel: "Contact Us",
  },

  heroImage: {
    src: null,
    alt: null,
    pendingLabel: "Image pending",
    pendingNote:
      "Official Foundation photography has not been supplied yet. This space is reserved for it.",
  },
};

/**
 * Async so the body can be swapped for a CMS or database query in a later phase
 * without changing any caller. See AGENTS.md.
 */
export async function getHomeContent(): Promise<HomeContent> {
  return home;
}
