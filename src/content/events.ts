import type { SiteEvent } from "./types";

/**
 * Foundation events.
 *
 * EMPTY. The Foundation has not published any event dates, so this array holds
 * no placeholder entries. An invented event would be a fabricated fact, and the
 * homepage and /events render an explicit content-pending state instead.
 *
 * Real events are added here, or supplied by a CMS in a later phase, with no
 * change to any component. See AGENTS.md rule 8.
 *
 * Example structure for future events:
 * const events: SiteEvent[] = [
 *   {
 *     id: "evt-001",
 *     slug: "annual-fundraising-gala",
 *     title: "Annual Fundraising Gala",
 *     excerpt: "Join us for an evening of community and giving.",
 *     description: "Full event description...",
 *     startsAt: "2026-06-15T18:00:00-04:00",
 *     endsAt: "2026-06-15T22:00:00-04:00",
 *     location: {
 *       name: "Community Center",
 *       address: { street: "123 Main St", locality: "Toronto", region: "ON", postalCode: "M5V 1A1", country: "Canada" },
 *       isOnline: false,
 *     },
 *     image: null,
 *     category: "fundraising",
 *     registrationUrl: "https://example.com/register",
 *     status: "scheduled",
 *     featured: true,
 *     publishedAt: "2026-01-15",
 *   },
 * ];
 */
const events: SiteEvent[] = [];

/**
 * Async so the body can be swapped for a CMS or database query in a later phase
 * without changing any caller. See AGENTS.md.
 */
export async function getEvents(): Promise<SiteEvent[]> {
  return events;
}

/**
 * Returns only published (scheduled or completed) events, sorted by start date.
 * Draft and cancelled events are excluded from public listings.
 */
export async function getPublishedEvents(): Promise<SiteEvent[]> {
  const now = Date.now();
  return events
    .filter((event) => event.status === "scheduled" || event.status === "completed")
    .filter((event) => new Date(event.startsAt).getTime() >= now || event.status === "completed")
    .sort((a, b) => a.startsAt.localeCompare(b.startsAt));
}

/** Upcoming events only, soonest first. Empty until events are published. */
export async function getUpcomingEvents(): Promise<SiteEvent[]> {
  const now = Date.now();
  return events
    .filter((event) => event.status === "scheduled")
    .filter((event) => new Date(event.startsAt).getTime() >= now)
    .sort((a, b) => a.startsAt.localeCompare(b.startsAt));
}

/** Past events, most recent first. */
export async function getPastEvents(): Promise<SiteEvent[]> {
  const now = Date.now();
  return events
    .filter((event) => event.status === "completed" || (event.status === "scheduled" && new Date(event.startsAt).getTime() < now))
    .sort((a, b) => b.startsAt.localeCompare(a.startsAt));
}

/** Featured events for highlight sections. */
export async function getFeaturedEvents(): Promise<SiteEvent[]> {
  const now = Date.now();
  return events
    .filter((event) => event.featured && event.status === "scheduled")
    .filter((event) => new Date(event.startsAt).getTime() >= now)
    .sort((a, b) => a.startsAt.localeCompare(b.startsAt));
}

/** Returns undefined for an unknown slug so callers can call `notFound()`. */
export async function getEvent(slug: string): Promise<SiteEvent | undefined> {
  return events.find((event) => event.slug === slug);
}

/** Returns all slugs for static generation. */
export async function getEventSlugs(): Promise<string[]> {
  return events.map((event) => event.slug);
}