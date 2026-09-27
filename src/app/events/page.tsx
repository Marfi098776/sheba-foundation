import { PageHeader } from "@/components/sections/page-header";
import { Section } from "@/components/shared/section";
import { Container } from "@/components/shared/container";
import { EventCard } from "@/components/sections/event-card";
import { getPublishedEvents, getUpcomingEvents, getPastEvents, getFeaturedEvents } from "@/content/events";
import { CONTENT_PENDING_NOTICE } from "@/content/site";
import { toRoute } from "@/lib/routes";
import { Link, ArrowRight, CalendarDays } from "lucide-react";
import { generatePageMetadata } from "@/lib/seo";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

export const metadata = generatePageMetadata({
  title: "Events",
  description: "Upcoming and past events from the Canadian Sheba Foundation.",
  pathname: "/events",
  openGraph: {
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
});

export default async function EventsPage() {
  const [allEvents, upcomingEvents, pastEvents, featuredEvents] = await Promise.all([
    getPublishedEvents(),
    getUpcomingEvents(),
    getPastEvents(),
    getFeaturedEvents(),
  ]);

  const hasEvents = allEvents.length > 0;

  return (
    <>
      <ScrollReveal delay={0}>
        <PageHeader
          eyebrow="What's on"
          title="Events"
          description={hasEvents ? "Community events, fundraisers, workshops, and more." : CONTENT_PENDING_NOTICE}
        />
      </ScrollReveal>

      {!hasEvents ? (
        <ScrollReveal delay={80}>
          <Section className="py-16 sm:py-20">
            <Container className="max-w-2xl text-center">
              <div className="flex flex-col items-center gap-4">
                <CalendarDays className="size-16 text-primary/30" aria-hidden="true" />
                <h2 className="text-h3">No events scheduled</h2>
                <p className="text-muted-foreground text-lead">
                  Upcoming events will be announced here. Check back soon or visit our
                  <Link href={toRoute("/news")} className="text-primary underline underline-offset-4">
                    News & Updates
                  </Link>
                  page for the latest announcements.
                </p>
              </div>
            </Container>
          </Section>
        </ScrollReveal>
      ) : (
        <>
          {featuredEvents.length > 0 && (
            <ScrollReveal delay={80}>
              <Section className="py-16 sm:py-20">
                <Container className="max-w-4xl">
                  <h2 className="text-h3">Featured Event</h2>
                  <div className="mt-6">
                    <EventCard event={featuredEvents[0]} variant="featured" />
                  </div>
                </Container>
              </Section>
            </ScrollReveal>
          )}

          {upcomingEvents.length > 0 && (
            <ScrollReveal delay={160}>
              <Section className="py-16 sm:py-20 border-y border-border">
                <Container className="max-w-6xl">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
                    <h2 className="text-h3">Upcoming Events</h2>
                  </div>
                  <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {upcomingEvents.map((event, index) => (
                      <ScrollReveal key={event.slug} delay={index * 80}>
                        <EventCard event={event} />
                      </ScrollReveal>
                    ))}
                  </ul>
                </Container>
              </Section>
            </ScrollReveal>
          )}

          {pastEvents.length > 0 && (
            <ScrollReveal delay={160}>
              <Section className="py-16 sm:py-20 border-y border-border">
                <Container className="max-w-6xl">
                  <h2 className="text-h3">Past Events</h2>
                  <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {pastEvents.map((event, index) => (
                      <ScrollReveal key={event.slug} delay={index * 80}>
                        <EventCard event={event} />
                      </ScrollReveal>
                    ))}
                  </ul>
                </Container>
              </Section>
            </ScrollReveal>
          )}

          <ScrollReveal delay={240}>
            <Section tone="subtle" className="border-t border-border">
              <Container className="text-center">
                <h2 className="text-h3">Stay informed about upcoming events</h2>
                <p className="mt-2 max-w-2xl mx-auto text-muted-foreground text-lead">
                  Subscribe to updates or check our news page for event announcements.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <Link
                    href={toRoute("/news")}
                    className="inline-flex items-center gap-1.5 rounded-sm text-sm font-medium text-primary hover:underline"
                  >
                    Visit News & Updates
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </Link>
                  <Link
                    href={toRoute("/contact")}
                    className="inline-flex items-center gap-1.5 rounded-sm text-sm font-medium text-primary hover:underline"
                  >
                    Contact Us
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </Link>
                </div>
              </Container>
            </Section>
          </ScrollReveal>
        </>
      )}
    </>
  );
}