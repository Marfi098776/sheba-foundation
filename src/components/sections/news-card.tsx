import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/shared/container";
import { Section } from "@/components/shared/section";
import { Card, CardContent, CardHeader, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";
import { formatNewsDate } from "@/lib/date-utils";
import { toRoute } from "@/lib/routes";
import type { NewsArticle } from "@/content/types";

export type NewsCardProps = {
  article: NewsArticle;
  variant?: "default" | "featured";
  showCategory?: boolean;
};

/**
 * News article card component for listings.
 * Uses the existing Card component pattern.
 */
export function NewsCard({ article, variant = "default", showCategory = true }: NewsCardProps) {
  const cardContent = (
    <Card className="h-full flex flex-col">
      {article.featuredImage ? (
        <div className="relative aspect-video w-full overflow-hidden rounded-t-xl">
          <Image
            src={article.featuredImage}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      ) : null}
      <CardHeader>
        <div className="flex flex-wrap gap-2 mb-2">
          {showCategory && article.category && (
            <Badge variant="secondary">{article.category}</Badge>
          )}
          {article.featured && <Badge variant="default">Featured</Badge>}
        </div>
        {article.href ? (
          <h3 className="font-heading text-lg leading-snug font-semibold">
            <Link
              href={toRoute(article.href)}
              className="rounded-sm transition-colors hover:text-primary hover:underline"
            >
              {article.title}
            </Link>
          </h3>
        ) : (
          <h3 className="font-heading text-lg leading-snug font-semibold">{article.title}</h3>
        )}
        <CardDescription>{article.excerpt}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-auto">
          <time dateTime={article.publishedAt} className="flex items-center gap-1.5">
            <Calendar className="size-4 shrink-0" aria-hidden="true" />
            {formatNewsDate(article.publishedAt, article.updatedAt)}
          </time>
          {article.author && (
            <span className="flex items-center gap-1.5">
              <Clock className="size-4 shrink-0" aria-hidden="true" />
              By {article.author}
            </span>
          )}
        </div>
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
 * News list item for compact listings (e.g., related articles).
 */
export function NewsListItem({ article }: { article: NewsArticle }) {
  return (
    <li className="flex gap-4 p-4 rounded-xl border border-border bg-card">
      <div className="flex-shrink-0 w-16 text-center text-sm text-muted-foreground">
        <time dateTime={article.publishedAt} className="font-semibold block">
          {new Intl.DateTimeFormat("en-CA", { month: "short", day: "numeric", timeZone: "UTC" }).format(new Date(article.publishedAt))}
        </time>
      </div>
      <div className="flex-1 min-w-0">
        {article.href ? (
          <Link
            href={toRoute(article.href)}
            className="font-medium truncate block hover:text-primary hover:underline"
          >
            {article.title}
          </Link>
        ) : (
          <h4 className="font-medium truncate">{article.title}</h4>
        )}
        {article.category && (
          <p className="text-xs text-muted-foreground truncate capitalize">{article.category}</p>
        )}
      </div>
    </li>
  );
}

/**
 * Related news section for article detail pages.
 */
export type RelatedNewsProps = {
  articles: NewsArticle[];
  currentSlug: string;
  limit?: number;
  title?: string;
};

export function RelatedNews({ articles, currentSlug, limit = 3, title = "Related Updates" }: RelatedNewsProps) {
  const related = articles
    .filter((a) => a.slug !== currentSlug && a.status === "published")
    .slice(0, limit);

  if (related.length === 0) return null;

  return (
    <Section>
      <Container className="max-w-4xl">
        <h2 className="text-h3">{title}</h2>
        <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((article) => (
            <NewsCard key={article.slug} article={article} />
          ))}
        </ul>
      </Container>
    </Section>
  );
}