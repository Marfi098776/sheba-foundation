import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { getUpcomingEvents } from "@/content/events";
import { getHomeContent } from "@/content/home";
import { getLatestNews } from "@/content/news";
import type { SiteEvent, NewsArticle } from "@/content/types";
import { toRoute } from "@/lib/routes";

/** Fixed to UTC so a statically prerendered page never shifts with the build machine. */
const DATE_FORMAT: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
};

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-CA", DATE_FORMAT).format(new Date(iso));
}

function EventRow({ event }: { event: SiteEvent }) {
  return (
    <li className="border-t border-border py-5">
      <p className="text-xs font-semibold tracking-wide text-primary uppercase">
        {formatDate(event.startsAt)}
      </p>
      <h3 className="mt-2 font-heading text-h4 font-semibold">{event.title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{event.description}</p>
    </li>
  );
}

function NewsRow({ article }: { article: NewsArticle }) {
  return (
    <li className="border-t border-border py-5">
      <p className="text-xs font-semibold tracking-wide text-primary uppercase">
        {formatDate(article.publishedAt)}
      </p>
      <h3 className="mt-2 font-heading text-h4 font-semibold">
        {article.href ? (
          <Link
            href={toRoute(article.href)}
            className="rounded-sm hover:text-primary hover:underline"
          >
            {article.title}
          </Link>
        ) : (
          article.title
        )}
      </h3>
      <p className="mt-2 text-sm text-muted-foreground">{article.excerpt}</p>
    </li>
  );
}

/**
 * Upcoming events and latest news preview.
 *
 * Designed to be populated: add a `SiteEvent` to `src/content/events.ts` or a
 * `NewsArticle` to `src/content/news.ts` and the corresponding column appears,
 * with no change here.
 *
 * An article's title is only linked when that article carries an `href`, i.e.
 * when it really has a page of its own. A headline is never linked to a route
 * that does not exist — the "View all news" link below the list is the
 * guaranteed destination. Events are not linked for the same reason: no event
 * detail route exists yet.
 *
 * While both are empty it renders a deliberate content-pending panel with working
 * links to both pages, rather than placeholder headlines. Inventing an event or
 * a news item would be a fabricated fact — see AGENTS.md rule 8.
 */
export async function ContentPreview() {
  const [{ updates }, events, articles] = await Promise.all([
    getHomeContent(),
    getUpcomingEvents(),
    getLatestNews(3),
  ]);

  const hasEvents = events.length > 0;
  const hasNews = articles.length > 0;
  const isEmpty = !hasEvents && !hasNews;

  return (
    <Section>
      <Container>
        <SectionHeading
          eyebrow={updates.eyebrow}
          title={updates.title}
          description={updates.description}
        />

        {isEmpty ? (
          <div className="mt-10 rounded-xl border border-border bg-muted p-8 sm:p-10">
            <h3 className="font-heading text-h4 font-semibold">
              {updates.emptyTitle}
            </h3>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              {updates.emptyBody}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href={toRoute("/events")}
                className="inline-flex items-center gap-1.5 rounded-sm text-sm font-medium text-primary hover:underline"
              >
                Visit the events page
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
              <Link
                href={toRoute("/news")}
                className="inline-flex items-center gap-1.5 rounded-sm text-sm font-medium text-primary hover:underline"
              >
                Visit the news page
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-14">
            {hasEvents ? (
              <section aria-labelledby="homepage-upcoming-events">
                <h3
                  id="homepage-upcoming-events"
                  className="font-heading text-h4 font-semibold"
                >
                  Upcoming Events
                </h3>
                <ul className="mt-4">
                  {events.map((event) => (
                    <EventRow key={event.slug} event={event} />
                  ))}
                </ul>
                <Link
                  href={toRoute("/events")}
                  className="mt-4 inline-flex items-center gap-1.5 rounded-sm text-sm font-medium text-primary hover:underline"
                >
                  View all events
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              </section>
            ) : null}

            {hasNews ? (
              <section aria-labelledby="homepage-latest-news">
                <h3
                  id="homepage-latest-news"
                  className="font-heading text-h4 font-semibold"
                >
                  Latest News
                </h3>
                <ul className="mt-4">
                  {articles.map((article) => (
                    <NewsRow key={article.slug} article={article} />
                  ))}
                </ul>
                <Link
                  href={toRoute("/news")}
                  className="mt-1 inline-flex items-center gap-1.5 rounded-sm text-sm font-medium text-primary hover:underline"
                >
                  View all news
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              </section>
            ) : null}
          </div>
        )}
      </Container>
    </Section>
  );
}
