import { Metadata } from "next";
import { SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/content/site";

/**
 * Central SEO configuration.
 *
 * All values are derived from the content layer or are explicitly nullable.
 * No production domain is invented — SITE_URL remains null until the client
 * supplies a confirmed domain.
 */

export interface SEOConfig {
  siteName: string;
  defaultTitle: string;
  titleTemplate: string;
  defaultDescription: string;
  siteUrl: string | null;
  locale: string;
  twitterHandle: string | null;
}

export const seoConfig: SEOConfig = {
  siteName: SITE_NAME,
  defaultTitle: SITE_NAME,
  titleTemplate: `%s | ${SITE_NAME}`,
  defaultDescription: SITE_TAGLINE,
  siteUrl: SITE_URL,
  locale: "en_CA",
  twitterHandle: null,
};

/**
 * Builds a canonical URL only when SITE_URL is configured.
 * Returns null if no valid site URL exists.
 */
export function getCanonicalUrl(pathname: string): string | null {
  if (!SITE_URL) return null;
  const base = SITE_URL.replace(/\/$/, "");
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${base}${path}`;
}

/**
 * Open Graph metadata shape (compatible with Next.js Metadata).
 */
export interface OpenGraphData {
  title?: string;
  description?: string;
  type?: "website" | "article";
  locale?: string;
  siteName?: string;
  url?: string;
  images?: Array<{ url: string; width?: number; height?: number; alt?: string }>;
  // Article-specific fields
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  section?: string;
  tags?: string[];
}

/**
 * Twitter/X card metadata shape.
 */
export interface TwitterData {
  card?: "summary" | "summary_large_image";
  title?: string;
  description?: string;
  images?: string[];
  creator?: string;
  site?: string;
}

/**
 * Builds Open Graph metadata with safe fallbacks.
 * Does not generate absolute URLs when SITE_URL is null.
 */
export function buildOpenGraph(
  params: {
    title?: string;
    description?: string;
    pathname?: string;
    images?: Array<{ url: string; width?: number; height?: number; alt?: string }>;
    type?: "website" | "article";
    publishedTime?: string;
    modifiedTime?: string;
    authors?: string[];
    section?: string;
    tags?: string[];
  } = {}
): OpenGraphData {
  const {
    title,
    description,
    pathname,
    images,
    type = "website",
    publishedTime,
    modifiedTime,
    authors,
    section,
    tags,
  } = params;

  const og: OpenGraphData = {
    title: title ?? seoConfig.defaultTitle,
    description: description ?? seoConfig.defaultDescription,
    type,
    locale: seoConfig.locale,
    siteName: seoConfig.siteName,
  };

  if (pathname) {
    const canonical = getCanonicalUrl(pathname);
    if (canonical) {
      og.url = canonical;
    }
  }

  if (images && images.length > 0) {
    og.images = images.map((img) => ({
      url: img.url,
      width: img.width ?? 1200,
      height: img.height ?? 630,
      alt: img.alt ?? seoConfig.siteName,
    }));
  }

  // Article-specific fields - only add when type is "article"
  if (type === "article") {
    if (publishedTime) og.publishedTime = publishedTime;
    if (modifiedTime) og.modifiedTime = modifiedTime;
    if (authors && authors.length > 0) og.authors = authors;
    if (section) og.section = section;
    if (tags && tags.length > 0) og.tags = tags;
  }

  return og;
}

/**
 * Builds Twitter/X card metadata.
 * Does not include creator/site handles unless officially supplied.
 */
export function buildTwitter(
  params: {
    title?: string;
    description?: string;
    images?: string[];
    card?: "summary" | "summary_large_image";
  } = {}
): TwitterData {
  const { title, description, images, card = "summary_large_image" } = params;

  const twitter: TwitterData = {
    card,
    title: title ?? seoConfig.defaultTitle,
    description: description ?? seoConfig.defaultDescription,
  };

  if (images && images.length > 0) {
    twitter.images = images;
  }

  if (seoConfig.twitterHandle) {
    twitter.creator = seoConfig.twitterHandle;
    twitter.site = seoConfig.twitterHandle;
  }

  return twitter;
}

/**
 * Builds robots metadata.
 */
export function buildRobots(
  params: {
    index?: boolean;
    follow?: boolean;
    noarchive?: boolean;
    nosnippet?: boolean;
  } = {}
): Metadata["robots"] {
  const { index = true, follow = true, noarchive = false, nosnippet = false } = params;

  const robots: Metadata["robots"] = {
    index,
    follow,
  };

  if (noarchive) robots.noarchive = true;
  if (nosnippet) robots.nosnippet = true;

  return robots;
}

/**
 * Generates complete page metadata with safe defaults.
 */
export function generatePageMetadata(
  params: {
    title?: string;
    description?: string;
    pathname?: string;
    openGraph?: Parameters<typeof buildOpenGraph>[0];
    twitter?: Parameters<typeof buildTwitter>[0];
    robots?: Parameters<typeof buildRobots>[0];
  } = {}
): Metadata {
  const { title, description, pathname, openGraph, twitter, robots } = params;

  const canonical = pathname ? getCanonicalUrl(pathname) : null;

  return {
    title: title ?? seoConfig.defaultTitle,
    description: description ?? seoConfig.defaultDescription,
    openGraph: buildOpenGraph(openGraph) as Metadata["openGraph"],
    twitter: buildTwitter(twitter) as Metadata["twitter"],
    robots: buildRobots(robots),
    alternates: canonical
      ? {
          canonical,
        }
      : undefined,
    metadataBase: seoConfig.siteUrl ? new URL(seoConfig.siteUrl) : undefined,
  };
}