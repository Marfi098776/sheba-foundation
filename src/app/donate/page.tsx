import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/page-header";
import { Section } from "@/components/shared/section";
import { Container } from "@/components/shared/container";
import { DonateCta } from "@/components/sections/donate-cta";
import { SupportCta } from "@/components/sections/support-cta";
import { getSiteContent } from "@/content/site";
import { generatePageMetadata } from "@/lib/seo";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

export async function generateMetadata(): Promise<Metadata> {
  const { donation } = await getSiteContent();

  return generatePageMetadata({
    title: "Donate",
    description:
      donation.note ??
      "How to support the Canadian Sheba Foundation. Donations are handled by an external donation platform.",
    pathname: "/donate",
    openGraph: {
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
    },
  });
}

export default async function DonatePage() {
  const { donation } = await getSiteContent();

  return (
    <>
      <ScrollReveal delay={0}>
        <PageHeader
          eyebrow="Support us"
          title="Donate"
          description="Your support helps the Foundation serve communities, support dreams, and create opportunities."
        />
      </ScrollReveal>

      <ScrollReveal delay={80}>
        <Section>
          <Container className="max-w-3xl">
            <h2 className="text-h3">Why support the Foundation</h2>
            <p className="mt-4 text-lead">
              The Canadian Sheba Foundation directs resources toward practical, direct
              programs that help families, support education, and strengthen communities.
              Every contribution sustains work that is organized around confirmed program
              areas including Family Support, Community Programs, Scholarships & Grants,
              and Newcomer & Refugee Support.
            </p>
          </Container>
        </Section>
      </ScrollReveal>

      <ScrollReveal delay={160}>
        <Section tone="subtle">
          <Container className="max-w-3xl">
            <h2 className="text-h3">How donations support our work</h2>
            <ul className="mt-6 flex flex-col gap-4">
              <li className="flex gap-4 p-4 rounded-xl border border-border bg-card">
                <span aria-hidden="true" className="mt-1 size-8 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center text-primary">👨‍👩‍👧‍👦</span>
                <div>
                  <h3 className="font-medium">Family Support</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Educational support, school supplies, healthy meals, and limited
                    financial assistance for families experiencing hardship.
                  </p>
                </div>
              </li>
              <li className="flex gap-4 p-4 rounded-xl border border-border bg-card">
                <span aria-hidden="true" className="mt-1 size-8 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center text-primary">🎓</span>
                <div>
                  <h3 className="font-medium">Scholarships & Grants</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    A program area the Foundation has identified to support students
                    pursuing education. Details pending confirmation.
                  </p>
                </div>
              </li>
              <li className="flex gap-4 p-4 rounded-xl border border-border bg-card">
                <span aria-hidden="true" className="mt-1 size-8 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center text-primary">🌍</span>
                <div>
                  <h3 className="font-medium">Newcomer & Refugee Support</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    A program area the Foundation has identified. Specific services
                    are still to be confirmed.
                  </p>
                </div>
              </li>
              <li className="flex gap-4 p-4 rounded-xl border border-border bg-card">
                <span aria-hidden="true" className="mt-1 size-8 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center text-primary">🤝</span>
                <div>
                  <h3 className="font-medium">Community Programs</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Educational seminars, health-awareness programs, community
                    workshops, and charity events.
                  </p>
                </div>
              </li>
            </ul>
          </Container>
        </Section>
      </ScrollReveal>

      <ScrollReveal delay={240}>
        <Section className="border-y border-border">
          <Container className="max-w-3xl">
            <h2 className="text-h3">Donation method</h2>
            <p className="mt-4 text-lead">
              The Foundation intends to accept donations through an established
              external donation platform. We do not process payments, collect
              credit card information, or issue tax receipts directly on this
              website.
            </p>
            <DonateCta />
          </Container>
        </Section>
      </ScrollReveal>

      <ScrollReveal delay={240}>
        <Section tone="subtle" className="border-y border-border">
          <Container className="max-w-3xl">
            <h2 className="text-h3">Donation information and receipts</h2>
            <p className="mt-4 text-lead">
              Donation and receipt information will be provided by the Foundation.
              Official charitable registration details, tax-deductibility status,
              and receipting policies will be published here once confirmed.
            </p>
            {donation.platform && (
              <p className="mt-4 text-sm text-muted-foreground">
                Current platform: {donation.platform}
              </p>
            )}
          </Container>
        </Section>
      </ScrollReveal>

      <ScrollReveal delay={240}>
        <Section>
          <Container className="max-w-3xl">
            <h2 className="text-h3">Frequently asked questions</h2>

            <Accordion type="single" collapsible className="mt-6 w-full">
              <AccordionItem value="tax-deductible" className="p-4 m-2 rounded-xl border border-border bg-card">
                <AccordionTrigger className="hover:no-underline text-lg">
                  Is my donation tax-deductible?
                </AccordionTrigger>
                <AccordionContent>
                  Official charitable registration and tax-deductibility information
                  will be published by the Foundation once confirmed.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="recurring-donation" className="p-4 m-2 rounded-xl border border-border bg-card">
                <AccordionTrigger className="hover:no-underline text-lg">
                  Can I make a recurring donation?
                </AccordionTrigger>
                <AccordionContent>
                  Recurring donation options depend on the external donation platform.
                  Details will be available once the platform is confirmed.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="receipt" className="p-4 m-2 rounded-xl border border-border bg-card">
                <AccordionTrigger className="hover:no-underline text-lg">
                  Will I receive a receipt?
                </AccordionTrigger>
                <AccordionContent>
                  Receipting is handled by the external donation platform. The
                  Foundation will publish its official receipting policy when available.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="specific-program" className="p-4 m-2 rounded-xl border border-border bg-card">
                <AccordionTrigger className="hover:no-underline text-lg">
                  Can I direct my donation to a specific program?
                </AccordionTrigger>
                <AccordionContent>
                  Program-specific giving options will depend on the external platform&apos;s
                  capabilities and the Foundation&apos;s published policies.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="payment-methods" className="p-4 m-2 rounded-xl border border-border bg-card">
                <AccordionTrigger className="hover:no-underline text-lg">
                  What payment methods are accepted?
                </AccordionTrigger>
                <AccordionContent>
                  Accepted payment methods are determined by the external donation
                  platform and will be communicated once the platform is confirmed.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Container>
        </Section>
      </ScrollReveal>

      <ScrollReveal delay={320}>
        <SupportCta
          title="Other ways to help"
          description="Not ready to donate? You can still make an impact by volunteering your time or spreading the word about the Foundation's work."
          primaryLabel="Volunteer"
          primaryHref="/volunteer"
          secondaryLabel="Contact Us"
          secondaryHref="/contact"
          variant="subtle"
        />
      </ScrollReveal>
    </>
  );
}