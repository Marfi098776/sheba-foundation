import type { Metadata } from "next";
import { ContentPreview } from "@/components/sections/content-preview";
import { FinalCta } from "@/components/sections/final-cta";
import { GetInvolved } from "@/components/sections/get-involved";
import { Hero } from "@/components/sections/hero";
import { Mission } from "@/components/sections/mission";
import { ProgramsPreview } from "@/components/sections/programs-preview";
import { SupportCta } from "@/components/sections/support-cta";
import { ValuesPreview } from "@/components/sections/values-preview";
import { generatePageMetadata } from "@/lib/seo";

/**
 * Homepage.
 *
 * Composition only: this file defines the section order and nothing else. All
 * copy lives in `src/content/`, and the full SEO system (canonical URLs, Open
 * Graph, structured data, sitemap) is deliberately deferred to its own batch, so
 * only a description is set here. The title is inherited from the root layout,
 * which already resolves to the Foundation's name for the homepage.
 */
export const metadata: Metadata = generatePageMetadata({
  description:
    "The Canadian Sheba Foundation brings together practical support for families, educational programs, community events, and volunteering.",
  openGraph: {
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
});

export default function Home() {
  return (
    <>
      <Hero />
      <Mission />
      <ProgramsPreview />
      <ValuesPreview />
      <GetInvolved />
      <SupportCta />
      <ContentPreview />
      <FinalCta />
    </>
  );
}
