import Image from "next/image";
import { Container } from "@/components/shared/container";
import { Section } from "@/components/shared/section";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, ExternalLink } from "lucide-react";
import { formatEventDateRange, isEventUpcoming, isEventPast } from "@/lib/date-utils";
import type { SiteEvent } from "@/content/types";

export type EventCardProps = {
  event: SiteEvent;
  variant?: "default" | "featured";
  showStatus?: boolean;
};

/**
 * Event card component for listings.
 * Uses the existing Card component pattern.
 */
export function EventCard({ event, variant = "default", showStatus = true }: EventCardProps) {
  const isUpcoming = isEventUpcoming(event.startsAt);
  const isPast = isEventPast(event.startsAt, event.endsAt);

  const getStatusBadge = () => {
    if (!showStatus) return null;
    if (event.status === "draft") return <Badge variant="secondary">Draft</Badge>;
    if (event.status === "cancelled") return <Badge variant="destructive">Cancelled</Badge>;
    if (isUpcoming) return <Badge variant="default">Upcoming</Badge>;
    if (isPast) return <Badge variant="outline">Past</Badge>;
    return <Badge variant="default">Ongoing</Badge>;
  };

  const cardContent = (
    <Card className="h-full flex flex-col">
      {event.image ? (
        <div className="relative aspect-video w-full overflow-hidden rounded-t-xl">
          <Image
            src={event.image}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      ) : null}
      <CardHeader>
        {showStatus && <div className="mb-2">{getStatusBadge()}</div>}
        <CardTitle className="text-lg">{event.title}</CardTitle>
        {event.excerpt && <CardDescription>{event.excerpt}</CardDescription>}
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <div className="flex flex-col gap-2 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1.5">
            <Calendar className="size-4 shrink-0" aria-hidden="true" />
            <time dateTime={event.startsAt}>{formatEventDateRange(event.startsAt, event.endsAt)}</time>
          </div>
          {event.location?.name && (
            <div className="flex items-center gap-1.5">
              <MapPin className="size-4 shrink-0" aria-hidden="true" />
              <span>
                {event.location.name}
                {event.location.address?.locality && `, ${event.location.address.locality}`}
              </span>
            </div>
          )}
          {event.location?.isOnline && (
            <div className="flex items-center gap-1.5">
              <span className="size-4 shrink-0" aria-hidden="true">🌐</span>
              <span>Online event</span>
            </div>
          )}
        </div>
        {event.registrationUrl && (
          <a
            href={event.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline mt-auto"
          >
            Register
            <ExternalLink className="size-3.5" aria-hidden="true" />
            <span className="sr-only">(opens in new tab)</span>
          </a>
        )}
      </CardContent>
    </Card>
  );

  if (variant === "featured") {
    return (
      <article className="h-full">
        {cardContent}
      </article>
    );
  }

  return <li className="h-full">{cardContent}</li>;
}

/**
 * Event list item for compact listings (e.g., related events).
 */
export function EventListItem({ event, showStatus = true }: { event: SiteEvent; showStatus?: boolean }) {
  const isUpcoming = isEventUpcoming(event.startsAt);

  return (
    <li className="flex gap-4 p-4 rounded-xl border border-border bg-card">
      <div className="flex-shrink-0 w-16 text-center text-sm text-muted-foreground">
        <time dateTime={event.startsAt} className="font-semibold block">
          {new Intl.DateTimeFormat("en-CA", { month: "short", day: "numeric", timeZone: "UTC" }).format(new Date(event.startsAt))}
        </time>
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-medium truncate">{event.title}</h4>
        {event.location?.name && (
          <p className="text-sm text-muted-foreground truncate">{event.location.name}</p>
        )}
      </div>
      {showStatus && (
        <Badge variant={isUpcoming ? "default" : "outline"} className="flex-shrink-0">
          {isUpcoming ? "Upcoming" : "Past"}
        </Badge>
      )}
    </li>
  );
}

/**
 * Related events section for event detail pages.
 */
export type RelatedEventsProps = {
  events: SiteEvent[];
  currentSlug: string;
  limit?: number;
  title?: string;
};

export function RelatedEvents({ events, currentSlug, limit = 3, title = "Related Events" }: RelatedEventsProps) {
  const related = events
    .filter((e) => e.slug !== currentSlug && e.status === "scheduled")
    .slice(0, limit);

  if (related.length === 0) return null;

  return (
    <Section>
      <Container className="max-w-4xl">
        <h2 className="text-h3">{title}</h2>
        <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((event) => (
            <EventCard key={event.slug} event={event} />
          ))}
        </ul>
      </Container>
    </Section>
  );
}

/**
 * Status badge for event detail pages.
 */
export function EventStatusBadge({ event }: { event: SiteEvent }) {
  const isUpcoming = isEventUpcoming(event.startsAt);

  switch (event.status) {
    case "draft":
      return <Badge variant="secondary">Draft</Badge>;
    case "cancelled":
      return <Badge variant="destructive">Cancelled</Badge>;
    case "scheduled":
      return isUpcoming ? <Badge variant="default">Upcoming</Badge> : <Badge variant="default">Ongoing</Badge>;
    case "completed":
      return <Badge variant="outline">Completed</Badge>;
    default:
      return null;
  }
}