import { MetadataRoute } from "next";
import { SITE_URL } from "@/content/site";

/**
 * Robots.txt generation.
 *
 * Allows public pages, does not block CSS/JS/images needed for rendering.
 * References sitemap only when SITE_URL is configured.
 * Does not use broad disallow rules.
 */

export default function robots(): MetadataRoute.Robots {
  const rules: MetadataRoute.Robots["rules"] = [
    {
      userAgent: "*",
      allow: [
        "/",
        "/about",
        "/programs",
        "/scholarships",
        "/family-support",
        "/newcomer-refugee-support",
        "/donate",
        "/volunteer",
        "/events",
        "/news",
        "/financial-transparency",
        "/partnerships",
        "/contact",
        "/privacy-policy",
        "/terms-of-use",
      ],
      // No disallow rules needed for public content
    },
  ];

  const sitemap = SITE_URL ? `${SITE_URL.replace(/\/$/, "")}/sitemap.xml` : undefined;

  return {
    rules,
    sitemap,
    host: SITE_URL ? SITE_URL.replace(/^https?:\/\//, "").replace(/\/$/, "") : undefined,
  };
}