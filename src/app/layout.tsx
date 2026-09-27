import type { Metadata, Viewport } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SkipLink } from "@/components/shared/skip-link";
import { HtmlClassEnhancer } from "@/components/shared/html-class-enhancer";
import { SITE_TAGLINE } from "@/content/site";
import { cn } from "@/lib/utils";
import { generatePageMetadata } from "@/lib/seo";
import { buildOrganizationSchema, buildWebSiteSchema, serializeJsonLd, combineJsonLd } from "@/lib/structured-data";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  display: "swap",
});

export const metadata: Metadata = generatePageMetadata({
  title: undefined,
  description: SITE_TAGLINE,
});

export const viewport: Viewport = {
  themeColor: "#1E3A8A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// Pre-compute JSON-LD for root layout
const organizationSchema = buildOrganizationSchema();
const webSiteSchema = buildWebSiteSchema();
const rootJsonLd = combineJsonLd(organizationSchema, webSiteSchema);
const rootJsonLdScript = rootJsonLd ? serializeJsonLd(rootJsonLd) : null;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={cn(inter.variable, sourceSerif.variable)}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {rootJsonLdScript && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: rootJsonLdScript }}
          />
        )}
      </head>
      <body className="flex min-h-dvh flex-col antialiased">
        <SkipLink />
        <HtmlClassEnhancer />
        <SiteHeader />
        <main id="main-content" tabIndex={-1} className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}