import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { PageHeader } from "@/components/sections/page-header";
import { Section } from "@/components/shared/section";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { RelatedEvents, EventStatusBadge } from "@/components/sections/event-card";
import { getEvent, getPublishedEvents, getEventSlugs } from "@/content/events";
import { formatEventDateRange } from "@/lib/date-utils";
import { toRoute } from "@/lib/routes";
import { generatePageMetadata } from "@/lib/seo";
import { buildEventSchema, serializeJsonLd } from "@/lib/structured-data";
import { Calendar, MapPin, ExternalLink, ArrowRight, AlertCircle } from "lucide-react";

export async function generateStaticParams() {
  const slugs = await getEventSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEvent(slug);

  if (!event) {
    return { title: "Event Not Found" };
  }

  return generatePageMetadata({
    title: event.title,
    description: event.excerpt ?? event.description.slice(0, 160),
    pathname: `/events/${slug}`,
    openGraph: {
      type: "website",
      images: event.image ? [{ url: event.image }] : [],
    },
    twitter: {
      card: "summary_large_image",
      images: event.image ? [event.image] : [],
    },
  });
}

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = await getEvent(slug);

  if (!event) {
    notFound();
  }

  const allEvents = await getPublishedEvents();

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Events", href: "/events" },
    { label: event.title },
  ];

  // Build JSON-LD for this event
  const eventSchema = buildEventSchema(event);
  const eventJsonLd = serializeJsonLd(eventSchema);

  return (
    <>
      {eventJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: eventJsonLd }}
        />
      )}
      <Section tone="subtle" size="compact" className="border-b border-border">
        <Container className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Breadcrumb items={breadcrumbItems} />
        </Container>
      </Section>

      <PageHeader
        eyebrow="Events"
        title={event.title}
        description={event.excerpt ?? undefined}
      />

      {event.image ? (
        <Section tone="subtle" className="py-16 sm:py-20">
          <Container>
            <div className="relative aspect-video w-full max-w-4xl mx-auto overflow-hidden rounded-xl border border-border bg-card">
              <Image
                src={event.image}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
            </div>
          </Container>
        </Section>
      ) : null}

      <Section>
        <Container className="max-w-4xl">
          <div className="flex flex-wrap gap-3 mb-6">
            <EventStatusBadge event={event} />
            {event.category && <span className="px-3 py-1 rounded-full text-sm bg-muted text-muted-foreground">{event.category}</span>}
          </div>

          <div className="prose prose-muted max-w-none">
            <h2 className="text-h3">Details</h2>
            <p className="mt-4 text-lead">{event.description}</p>
          </div>

          <dl className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="flex gap-3 p-4 rounded-lg border border-border bg-muted/50">
              <div className="size-10 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center text-primary" aria-hidden="true">
                <Calendar className="size-5" />
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Date & Time</dt>
                <dd className="mt-1">
                  <time dateTime={event.startsAt}>
                    {formatEventDateRange(event.startsAt, event.endsAt, { includeTime: true })}
                  </time>
                </dd>
              </div>
            </div>

            {event.location && (
              <div className="flex gap-3 p-4 rounded-lg border border-border bg-muted/50">
                <div className="size-10 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center text-primary" aria-hidden="true">
                  {event.location.isOnline ? (
                    <span className="text-2xl" aria-hidden="true">🌐</span>
                  ) : (
                    <MapPin className="size-5" />
                  )}
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Location</dt>
                  <dd className="mt-1">
                    {event.location.isOnline ? (
                      <span>Online event</span>
                    ) : (
                      <>
                        {event.location.name && <p className="font-medium">{event.location.name}</p>}
                        {event.location.address && (
                          <address className="not-italic mt-1">
                            {[
                              event.location.address.street,
                              event.location.address.locality,
                              [event.location.address.region, event.location.address.postalCode].filter(Boolean).join(" "),
                              event.location.address.country,
                            ]
                              .filter(Boolean)
                              .map((line) => <span key={line} className="block">{line}</span>)}
                          </address>
                        )}
                      </>
                    )}
                  </dd>
                </div>
              </div>
            )}
          </dl>

          {event.registrationUrl && (
            <div className="mt-8 p-4 rounded-lg border border-border bg-card">
              <h3 className="font-medium">Registration</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Registration is handled through an external platform.
              </p>
              <a
                href={event.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center justify-center gap-1.5 rounded-lg border border-transparent bg-primary text-primary-foreground px-2.5 py-2 text-sm font-medium hover:bg-primary/80 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                Register for this event
                <ExternalLink className="size-4" aria-hidden="true" />
                <span className="sr-only">(opens in new tab)</span>
              </a>
            </div>
          )}

          {event.status === "cancelled" && (
            <div className="mt-8 p-4 rounded-lg border border-destructive/50 bg-destructive/10" role="alert">
              <div className="flex gap-3">
                <AlertCircle className="size-5 shrink-0 text-destructive" aria-hidden="true" />
                <div>
                  <h3 className="font-medium text-destructive">This event has been cancelled</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    We apologize for any inconvenience. Please check our
                    <Link href={toRoute("/events")} className="text-primary underline underline-offset-4">
                      events page
                    </Link>
                    for other upcoming events.
                  </p>
                </div>
              </div>
            </div>
          )}
        </Container>
      </Section>

      <RelatedEvents events={allEvents} currentSlug={event.slug} limit={3} />

      <Section tone="subtle" className="border-y border-border">
        <Container className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-xl text-center sm:text-left">
            <h2 className="text-h3">Explore more</h2>
            <p className="mt-2 text-muted-foreground text-lead">
              Discover other upcoming events or read our latest news and updates.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center w-full sm:w-auto">
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <Link href={toRoute("/events")}>
                All Events
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="default" size="lg" className="w-full sm:w-auto">
              <Link href={toRoute("/news")}>
                News & Updates
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}