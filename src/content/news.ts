import type { NewsArticle } from "./types";

/**
 * Foundation news and updates.
 *
 * EMPTY. No articles have been written or approved, so this array holds no
 * placeholder entries. The homepage and /news render an explicit
 * content-pending state instead of a fabricated headline.
 *
 * Real articles are added here, or supplied by a CMS in a later phase, with no
 * change to any component. See AGENTS.md rule 8.
 *
 * Example structure for future articles:
 * const news: NewsArticle[] = [
 *   {
 *     id: "news-001",
 *     slug: "foundation-announces-new-program",
 *     title: "Foundation Announces New Family Support Program",
 *     href: "/news/foundation-announces-new-program",
 *     excerpt: "The Canadian Sheba Foundation launches a new initiative...",
 *     content: "Full article content...",
 *     publishedAt: "2026-01-15",
 *     updatedAt: null,
 *     category: "announcement",
 *     featuredImage: null,
 *     author: "Foundation Team",
 *     status: "published",
 *     featured: true,
 *   },
 * ];
 */
const news: NewsArticle[] = [];

/**
 * Async so the body can be swapped for a CMS or database query in a later phase
 * without changing any caller. See AGENTS.md.
 */
export async function getNewsArticles(): Promise<NewsArticle[]> {
  return news;
}

/** Returns only published articles, most recent first. */
export async function getPublishedNews(): Promise<NewsArticle[]> {
  return news
    .filter((article) => article.status === "published")
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

/** Most recent published articles first, with optional limit. Empty until articles are published. */
export async function getLatestNews(limit = 3): Promise<NewsArticle[]> {
  const published = await getPublishedNews();
  return published.slice(0, limit);
}

/** Featured articles for highlight sections. */
export async function getFeaturedNews(): Promise<NewsArticle[]> {
  const published = await getPublishedNews();
  return published.filter((article) => article.featured);
}

/** Articles by category. */
export async function getNewsByCategory(category: NewsArticle["category"]): Promise<NewsArticle[]> {
  const published = await getPublishedNews();
  return published.filter((article) => article.category === category);
}

/** Returns undefined for an unknown slug so callers can call `notFound()`. */
export async function getNewsArticle(slug: string): Promise<NewsArticle | undefined> {
  return news.find((article) => article.slug === slug);
}

/** Returns all slugs for static generation. */
export async function getNewsSlugs(): Promise<string[]> {
  return news.map((article) => article.slug);
}