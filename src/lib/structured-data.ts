import { SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/content/site";

/**
 * JSON-LD Structured Data utilities.
 *
 * Only uses verified information. Does not invent address, phone, email,
 * social profiles, registration numbers, or other unconfirmed facts.
 */

/**
 * Builds Organization/NGO schema using only confirmed information.
 * Returns null if SITE_URL is not configured (cannot create valid schema without URL).
 */
export function buildOrganizationSchema(): object | null {
  if (!SITE_URL) {
    return null;
  }

  const baseUrl = SITE_URL.replace(/\/$/, "");

  return {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: SITE_NAME,
    description: SITE_TAGLINE,
    url: baseUrl,
    logo: `${baseUrl}/icons/icon-512.png`,
    sameAs: [],
    // Only include contact info if verified (currently all null)
    // contactPoint: {},
    // address: {},
    // telephone: {},
    // email: {},
    // foundingDate: null,
    // numberOfEmployees: null,
    // areaServed: null,
  };
}

/**
 * Builds WebSite schema.
 * Only generated when SITE_URL is configured.
 */
export function buildWebSiteSchema(): object | null {
  if (!SITE_URL) {
    return null;
  }

  const baseUrl = SITE_URL.replace(/\/$/, "");

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: baseUrl,
    description: SITE_TAGLINE,
    // No SearchAction - site doesn't have a functioning search feature
  };
}

/**
 * Builds BreadcrumbList schema for a given breadcrumb trail.
 * Only creates schema when the breadcrumbs exist in the UI.
 */
export function buildBreadcrumbSchema(
  items: Array<{ label: string; url?: string }>
): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: item.url ? (SITE_URL ? `${SITE_URL.replace(/\/$/, "")}${item.url}` : item.url) : undefined,
    })),
  };
}

/**
 * Builds Event schema for event detail pages.
 */
export function buildEventSchema(event: {
  title: string;
  description: string;
  startsAt: string;
  endsAt: string | null;
  location: { name: string | null; address: { street: string | null; locality: string | null; region: string | null; postalCode: string | null; country: string | null } | null; isOnline: boolean } | null;
  image: string | null;
  registrationUrl: string | null;
  status: string;
}): object {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.description,
    startDate: event.startsAt,
    eventStatus: mapEventStatus(event.status),
  };

  if (event.endsAt) {
    schema.endDate = event.endsAt;
  }

  if (event.location) {
    if (event.location.isOnline) {
      schema.eventAttendanceMode = "https://schema.org/OnlineEventAttendanceMode";
      schema.location = {
        "@type": "VirtualLocation",
        url: event.registrationUrl ?? (SITE_URL ?? ""),
      };
    } else if (event.location.name || event.location.address) {
      schema.eventAttendanceMode = "https://schema.org/OfflineEventAttendanceMode";
      const location: Record<string, unknown> = {
        "@type": "Place",
        name: event.location.name ?? "Venue",
      };
      if (event.location.address) {
        const addr = event.location.address;
        const addressParts = [addr.street, addr.locality, addr.region, addr.postalCode, addr.country].filter(Boolean);
        if (addressParts.length > 0) {
          location.address = {
            "@type": "PostalAddress",
            streetAddress: addr.street ?? undefined,
            addressLocality: addr.locality ?? undefined,
            addressRegion: addr.region ?? undefined,
            postalCode: addr.postalCode ?? undefined,
            addressCountry: addr.country ?? undefined,
          };
        }
      }
      schema.location = location;
    }
  }

  if (event.image) {
    schema.image = event.image;
  }

  if (event.registrationUrl) {
    schema.offers = {
      "@type": "Offer",
      url: event.registrationUrl,
      availability: "https://schema.org/InStock",
    };
  }

  return schema;
}

/**
 * Builds NewsArticle schema for news detail pages.
 */
export function buildNewsArticleSchema(article: {
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  updatedAt: string | null;
  author: string | null;
  featuredImage: string | null;
  category: string | null;
}): object {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt,
    articleBody: article.content,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    author: article.author
      ? {
          "@type": "Person",
          name: article.author,
        }
      : undefined,
    image: article.featuredImage ?? undefined,
    articleSection: article.category ?? undefined,
  };

  return schema;
}

/**
 * Builds FAQPage schema for FAQ sections.
 */
export function buildFAQSchema(
  faqs: Array<{ question: string; answer: string }>
): object {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Maps internal event status to schema.org event status.
 */
function mapEventStatus(status: string): string {
  switch (status) {
    case "scheduled":
      return "https://schema.org/EventScheduled";
    case "completed":
      return "https://schema.org/EventCompleted";
    case "cancelled":
      return "https://schema.org/EventCancelled";
    case "draft":
      return "https://schema.org/EventDraft";
    default:
      return "https://schema.org/EventScheduled";
  }
}

/**
 * Safely serializes JSON-LD for Next.js script injection.
 * Escapes </script> to prevent injection issues.
 */
export function serializeJsonLd(data: object): string {
  return JSON.stringify(data).replace(/<\/script>/gi, "<\\/script>");
}

/**
 * Combines multiple JSON-LD objects into a single @graph array.
 */
export function combineJsonLd(...schemas: (object | null)[]): object {
  const valid = schemas.filter((s): s is object => s !== null);
  if (valid.length === 0) {
    return { "@context": "https://schema.org", "@graph": [] };
  }
  if (valid.length === 1) {
    return valid[0];
  }
  return {
    "@context": "https://schema.org",
    "@graph": valid,
  };
}