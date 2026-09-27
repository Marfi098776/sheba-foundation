import { PageHeader } from "@/components/sections/page-header";
import { Section } from "@/components/shared/section";
import { Container } from "@/components/shared/container";
import { NewsCard } from "@/components/sections/news-card";
import { getPublishedNews, getLatestNews, getFeaturedNews } from "@/content/news";
import { CONTENT_PENDING_NOTICE } from "@/content/site";
import { toRoute } from "@/lib/routes";
import { Link, ArrowRight, Newspaper } from "lucide-react";
import type { NewsCategory } from "@/content/types";
import { generatePageMetadata } from "@/lib/seo";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

export const metadata = generatePageMetadata({
  title: "News & Updates",
  description: "Latest news, announcements, and updates from the Canadian Sheba Foundation.",
  pathname: "/news",
  openGraph: {
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
});

const CATEGORIES: { key: NewsCategory; label: string }[] = [
  { key: "announcement", label: "Announcements" },
  { key: "event", label: "Events" },
  { key: "story", label: "Stories" },
  { key: "update", label: "Updates" },
];

export default async function NewsPage() {
  const [allArticles, latestArticles, featuredArticles] = await Promise.all([
    getPublishedNews(),
    getLatestNews(10),
    getFeaturedNews(),
  ]);

  const hasArticles = allArticles.length > 0;

  return (
    <>
      <ScrollReveal delay={0}>
        <PageHeader
          eyebrow="Latest"
          title="News & Updates"
          description={hasArticles ? "Announcements, stories, and updates from the Foundation." : CONTENT_PENDING_NOTICE}
        />
      </ScrollReveal>

      {!hasArticles ? (
        <ScrollReveal delay={80}>
          <Section className="py-16 sm:py-20">
            <Container className="max-w-2xl text-center">
              <div className="flex flex-col items-center gap-4">
                <Newspaper className="size-16 text-primary/30" aria-hidden="true" />
                <h2 className="text-h3">No updates yet</h2>
                <p className="text-muted-foreground text-lead">
                  News and updates will be published here. Check back soon or visit our
                  <Link href={toRoute("/events")} className="text-primary underline underline-offset-4">
                    Events
                  </Link>
                  page for upcoming activities.
                </p>
              </div>
            </Container>
          </Section>
        </ScrollReveal>
      ) : (
        <>
          {featuredArticles.length > 0 && (
            <ScrollReveal delay={80}>
              <Section className="py-16 sm:py-20">
                <Container className="max-w-4xl">
                  <h2 className="text-h3">Featured Update</h2>
                  <div className="mt-6">
                    <NewsCard article={featuredArticles[0]} variant="featured" />
                  </div>
                </Container>
              </Section>
            </ScrollReveal>
          )}

          <ScrollReveal delay={160}>
            <Section className="py-16 sm:py-20 border-y border-border">
              <Container className="max-w-6xl">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
                  <h2 className="text-h3">Latest Updates</h2>
                </div>

                <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {latestArticles.map((article, index) => (
                    <ScrollReveal key={article.slug} delay={index * 80}>
                      <NewsCard article={article} />
                    </ScrollReveal>
                  ))}
                </ul>

                {allArticles.length > latestArticles.length && (
                  <div className="mt-8 text-center">
                    <Link
                      href={toRoute("/news")}
                      className="inline-flex items-center gap-1.5 rounded-sm text-sm font-medium text-primary hover:underline"
                    >
                      View all updates
                      <ArrowRight aria-hidden="true" className="size-4" />
                    </Link>
                  </div>
                )}
              </Container>
            </Section>
          </ScrollReveal>

          <ScrollReveal delay={240}>
            <Section tone="subtle" className="border-t border-border">
              <Container className="text-center">
                <h2 className="text-h3">Browse by category</h2>
                <p className="mt-2 max-w-2xl mx-auto text-muted-foreground text-lead">
                  Filter updates by topic to find what interests you.
                </p>
                <nav className="mt-6 flex flex-wrap gap-3 justify-center" aria-label="News categories">
                  {CATEGORIES.map(({ key, label }) => (
                    <Link
                      key={key}
                      href={toRoute(`/news?category=${key}`)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border bg-card text-sm font-medium transition-colors hover:border-primary/50 hover:text-primary"
                    >
                      {label}
                    </Link>
                  ))}
                </nav>
              </Container>
            </Section>
          </ScrollReveal>
        </>
      )}
    </>
  );
}