import { SITE_NAME, SITE_TAGLINE } from "@/content/site";

/**
 * Web App Manifest.
 *
 * Provides basic PWA metadata. Does not invent brand assets or colors
 * beyond the approved site name, tagline, and design tokens.
 */

const themeColor = "#4A6F8A"; // Derived from primary design token (oklch(0.44 0.072 208))
const backgroundColor = "#FEFDF8"; // Derived from background design token (oklch(0.995 0.002 90))

export default function manifest(): {
  name: string;
  short_name: string;
  description: string;
  start_url: string;
  display: "standalone";
  background_color: string;
  theme_color: string;
  lang: string;
  orientation: "portrait-primary";
  icons: Array<{
    src: string;
    sizes: string;
    type: string;
    purpose?: string;
  }>;
} {
  return {
    name: SITE_NAME,
    short_name: SITE_NAME,
    description: SITE_TAGLINE,
    start_url: "/",
    display: "standalone",
    background_color: backgroundColor,
    theme_color: themeColor,
    lang: "en-CA",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any maskable",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
  };
}