import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { PageHeader } from "@/components/sections/page-header";
import { Section } from "@/components/shared/section";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { RelatedNews } from "@/components/sections/news-card";
import { getNewsArticle, getPublishedNews, getNewsSlugs } from "@/content/news";
import { formatDate } from "@/lib/date-utils";
import { toRoute } from "@/lib/routes";
import { generatePageMetadata } from "@/lib/seo";
import { buildNewsArticleSchema, serializeJsonLd } from "@/lib/structured-data";
import { Calendar, Clock, ArrowRight, Newspaper, Tag } from "lucide-react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

export async function generateStaticParams() {
  const slugs = await getNewsSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await getNewsArticle(slug);

  if (!article) {
    return { title: "Article Not Found" };
  }

  return generatePageMetadata({
    title: article.title,
    description: article.excerpt,
    pathname: `/news/${slug}`,
    openGraph: {
      type: "article",
      images: article.featuredImage ? [{ url: article.featuredImage }] : [],
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt ?? undefined,
      authors: article.author ? [article.author] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      images: article.featuredImage ? [article.featuredImage] : [],
    },
  });
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getNewsArticle(slug);

  if (!article) {
    notFound();
  }

  const allArticles = await getPublishedNews();

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "News & Updates", href: "/news" },
    { label: article.title },
  ];

  // Build JSON-LD for this article
  const articleSchema = buildNewsArticleSchema(article);
  const articleJsonLd = serializeJsonLd(articleSchema);

  return (
    <>
      {articleJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: articleJsonLd }}
        />
      )}
      <Section tone="subtle" size="compact" className="border-b border-border">
        <Container className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Breadcrumb items={breadcrumbItems} />
        </Container>
      </Section>

      <ScrollReveal delay={0}>
        <PageHeader
          eyebrow="News & Updates"
          title={article.title}
          description={article.excerpt}
        />
      </ScrollReveal>

      <article>
        <ScrollReveal delay={80}>
          <Section>
            <Container className="max-w-4xl">
              <header className="flex flex-wrap gap-3 mb-8">
                {article.category && (
                  <span className="px-3 py-1 rounded-full text-sm bg-muted text-muted-foreground flex items-center gap-1.5">
                    <Tag className="size-3.5" aria-hidden="true" />
                    {article.category}
                  </span>
                )}
                {article.featured && (
                  <span className="px-3 py-1 rounded-full text-sm bg-primary/10 text-primary flex items-center gap-1.5">
                    <Newspaper className="size-3.5" aria-hidden="true" />
                    Featured
                  </span>
                )}
              </header>

              <div className="prose prose-muted max-w-none">
                {article.featuredImage && (
                  <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border bg-card mb-8">
                    <Image
                      src={article.featuredImage}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority
                    />
                  </div>
                )}

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-8">
                  <time dateTime={article.publishedAt} className="flex items-center gap-1.5">
                    <Calendar className="size-4 shrink-0" aria-hidden="true" />
                    Published {formatDate(article.publishedAt)}
                  </time>
                  {article.updatedAt && (
                    <time dateTime={article.updatedAt} className="flex items-center gap-1.5">
                      <Clock className="size-4 shrink-0" aria-hidden="true" />
                      Updated {formatDate(article.updatedAt)}
                    </time>
                  )}
                  {article.author && (
                    <span className="flex items-center gap-1.5">
                      By {article.author}
                    </span>
                  )}
                </div>

                <div className="whitespace-pre-wrap text-lead">
                  {article.content.split("\n\n").map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </Container>
          </Section>
        </ScrollReveal>

        <ScrollReveal delay={160}>
          <RelatedNews articles={allArticles} currentSlug={article.slug} limit={3} />
        </ScrollReveal>
      </article>

      <ScrollReveal delay={240}>
        <Section tone="subtle" className="border-y border-border">
          <Container className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xl text-center sm:text-left">
              <h2 className="text-h3">Stay updated</h2>
              <p className="mt-2 text-muted-foreground text-lead">
                Read more updates or check our upcoming events.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center w-full sm:w-auto">
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                <Link href={toRoute("/news")}>
                  All News & Updates
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="default" size="lg" className="w-full sm:w-auto">
                <Link href={toRoute("/events")}>
                  Events
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              </Button>
            </div>
          </Container>
        </Section>
      </ScrollReveal>
    </>
  );
}