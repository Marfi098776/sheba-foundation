import { MetadataRoute } from "next";
import { SITE_URL } from "@/content/site";
import { getPrograms } from "@/content/programs";
import { getEventSlugs } from "@/content/events";
import { getNewsSlugs } from "@/content/news";

/**
 * Sitemap generation.
 *
 * Only includes public, indexable routes. Dynamic routes are generated from
 * the content layer so only real published content appears.
 *
 * If SITE_URL is not configured, the sitemap returns an empty array to avoid
 * generating fake URLs. The sitemap.xml will still be served but will be empty
 * until the production domain is confirmed.
 */

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!SITE_URL) {
    return [];
  }

  const baseUrl = SITE_URL.replace(/\/$/, "");
  const now = new Date();

  // Static routes that always exist
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/programs`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/scholarships`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/family-support`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/newcomer-refugee-support`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/donate`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/volunteer`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/events`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/financial-transparency`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/partnerships`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms-of-use`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  // Program detail pages (only those with dedicated routes)
  const programs = await getPrograms();
  const programRoutes: MetadataRoute.Sitemap = programs
    .filter((p) => p.dedicatedRoute && p.status === "active")
    .map((p) => ({
      url: `${baseUrl}${p.dedicatedRoute}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  // Event detail pages (only published/scheduled events)
  const eventSlugs = await getEventSlugs();
  const eventRoutes: MetadataRoute.Sitemap = eventSlugs.map((slug) => ({
    url: `${baseUrl}/events/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // News detail pages (only published articles)
  const newsSlugs = await getNewsSlugs();
  const newsRoutes: MetadataRoute.Sitemap = newsSlugs.map((slug) => ({
    url: `${baseUrl}/news/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...programRoutes, ...eventRoutes, ...newsRoutes];
}