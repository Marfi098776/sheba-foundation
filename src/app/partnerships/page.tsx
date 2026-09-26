import { PageHeader } from "@/components/sections/page-header";
import { Section } from "@/components/shared/section";
import { Container } from "@/components/shared/container";
import { Badge } from "@/components/ui/badge";
import { getPartnershipsContent } from "@/content/partnerships";
import { SupportCta } from "@/components/sections/support-cta";
import { ArrowRight, Handshake, Users, Award, Gift, Heart } from "lucide-react";
import { toRoute } from "@/lib/routes";
import { generatePageMetadata } from "@/lib/seo";

const CATEGORY_ICONS: Record<string, typeof Handshake> = {
  "corporate-sponsorship": Handshake,
  "community-partnership": Users,
  "event-partnership": Award,
  "in-kind-support": Gift,
  "fundraising-collaboration": Heart,
};

export const metadata = generatePageMetadata({
  title: "Partnerships & Corporate Sponsorship",
  description:
    "Explore partnership and sponsorship opportunities with the Canadian Sheba Foundation.",
  pathname: "/partnerships",
  openGraph: {
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
});

export default async function PartnershipsPage() {
  const content = await getPartnershipsContent();

  return (
    <>
      <PageHeader
        eyebrow={content.hero.eyebrow}
        title={content.hero.title}
        description={content.hero.description}
      />

      <Section className="border-y border-border">
        <Container className="max-w-3xl">
          <div className="flex flex-col gap-3 p-4 rounded-xl border border-border bg-muted/50" role="status">
            <span className="text-sm font-medium text-muted-foreground">Current Status</span>
            <p className="text-muted-foreground">{content.statusNotice}</p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="max-w-3xl">
          <h2 className="text-h3">Why partner with the Foundation</h2>
          <ul className="mt-6 grid gap-6 sm:grid-cols-2">
            {content.whyPartner.map((reason, index) => (
              <li
                key={index}
                className="flex gap-4 p-4 rounded-xl border border-border bg-card"
              >
                <div className="size-10 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center text-primary" aria-hidden="true">
                  <Handshake className="size-5" />
                </div>
                <div>
                  <h3 className="font-medium">{reason.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{reason.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="subtle">
        <Container className="max-w-3xl">
          <h2 className="text-h3">Partnership Opportunities</h2>
          <p className="mt-4 text-lead">
            The following categories represent potential areas for collaboration.
            Specific details, tiers, and benefits are pending confirmation by the
            Foundation.
          </p>
          <ul className="mt-8 space-y-4" role="list" aria-label="Partnership opportunities">
            {content.opportunities.map((opportunity) => {
              const Icon = CATEGORY_ICONS[opportunity.category] || Handshake;
              return (
                <li
                  key={opportunity.id}
                  className="flex flex-col gap-3 p-4 rounded-xl border border-border bg-card sm:flex-row sm:items-start sm:justify-between"
                  role="listitem"
                >
                  <div className="flex gap-4 flex-1">
                    <div className="size-10 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center text-primary" aria-hidden="true">
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{opportunity.title}</h3>
                        <Badge variant="secondary">{opportunity.status === "available" ? "Available" : "Details Pending"}</Badge>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">{opportunity.description}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </Container>
      </Section>

      <Section className="border-y border-border">
        <Container className="max-w-3xl">
          <h2 className="text-h3">{content.howToPartner.title}</h2>
          <p className="mt-4 text-lead">{content.howToPartner.description}</p>
          <div className="mt-6">
            <a
              href={toRoute(content.howToPartner.ctaHref)}
              className="inline-flex items-center gap-1.5 rounded-sm text-sm font-medium text-primary hover:underline"
            >
              {content.howToPartner.ctaLabel}
              <ArrowRight aria-hidden="true" className="size-4" />
            </a>
          </div>
        </Container>
      </Section>

      <SupportCta
        title="Other ways to get involved"
        description="Explore volunteer opportunities, make a donation, or learn about our programs."
        primaryLabel="Volunteer"
        primaryHref="/volunteer"
        secondaryLabel="Donate"
        secondaryHref="/donate"
        variant="subtle"
      />
    </>
  );
}