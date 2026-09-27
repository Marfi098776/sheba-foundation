import { PageHeader } from "@/components/sections/page-header";
import { InformationNotice } from "@/components/sections/information-notice";
import { SupportCta } from "@/components/sections/support-cta";
import { VolunteerForm } from "@/components/forms/volunteer-form";
import { WhatsAppCTA } from "@/components/shared/whatsapp-cta";
import { getVolunteerContent } from "@/content/volunteer";
import { getSiteContent } from "@/content/site";
import { toRoute } from "@/lib/routes";
import { Section } from "@/components/shared/section";
import { Container } from "@/components/shared/container";
import { Users, Heart, Award, Clock } from "lucide-react";
import { generatePageMetadata } from "@/lib/seo";

export const metadata = generatePageMetadata({
  title: "Volunteer",
  description:
    "Volunteer opportunities with the Canadian Sheba Foundation, including community outreach, event volunteering, and fundraising support.",
  pathname: "/volunteer",
  openGraph: {
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
});

export default async function VolunteerPage() {
  const content = await getVolunteerContent();
  const { whatsappPhone } = await getSiteContent();

  // Check if form should be enabled based on email configuration
  const formEnabled = Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_RECIPIENT_EMAIL && process.env.EMAIL_FROM);

  // Check if WhatsApp is configured
  const whatsAppEnabled = Boolean(whatsappPhone);

  return (
    <>
      <PageHeader
        eyebrow={content.hero.eyebrow}
        title={content.hero.title}
        description={content.hero.description}
      />

      <InformationNotice
        title="Registration status"
        description={content.registrationAvailable
          ? content.registrationUrl
            ? `Register at ${content.registrationUrl}`
            : "Registration is available."
          : "Online volunteer registration is not yet available. The Foundation intends to provide registration through an external service; details will be published once confirmed."}
        variant="pending"
      />

      <Section>
        <Container className="max-w-4xl">
          <h2 className="text-h3">Why volunteer with us?</h2>
          <ul className="mt-6 grid gap-6 sm:grid-cols-2">
            {content.whyVolunteer.map((reason, index) => (
              <li key={index} className="flex gap-4 p-4 rounded-xl border border-border bg-card">
                <div className="size-10 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center text-primary" aria-hidden="true">
                  {(() => {
                    switch (index) {
                      case 0:
                        return <Heart className="size-5" />;
                      case 1:
                        return <Users className="size-5" />;
                      case 2:
                        return <Award className="size-5" />;
                      case 3:
                        return <Clock className="size-5" />;
                      default:
                        return <Heart className="size-5" />;
                    }
                  })()}
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
        <Container className="max-w-4xl">
          <h2 className="text-h3">Ways to volunteer</h2>
          <ul className="mt-6 flex flex-col gap-4">
            {content.waysToVolunteer.map((way, index) => (
              <li key={index} className="flex gap-4 p-4 rounded-xl border border-border bg-card">
                <div className="size-10 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center text-primary" aria-hidden="true">
                  <Users className="size-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{way.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{way.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section>
        <Container className="max-w-4xl">
          <h2 className="text-h3">What volunteers can contribute</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {content.whatVolunteersContribute.map((item, index) => (
              <li key={index} className="flex gap-3">
                <span aria-hidden="true" className="mt-2 size-2 shrink-0 rounded-full bg-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* WhatsApp CTA for volunteer page */}
      {whatsAppEnabled && (
        <Section>
          <Container className="max-w-4xl">
            <WhatsAppCTA
              config={{ phoneNumber: whatsappPhone, defaultMessage: content.whatsapp.defaultMessage }}
              title="Quick question about volunteering?"
              description="Message us on WhatsApp to learn more about volunteer opportunities."
            />
          </Container>
        </Section>
      )}

      <Section className="border-y border-border">
        <Container className="max-w-4xl">
          <h2 className="text-h3">Volunteer registration</h2>
          {formEnabled ? (
            <>
              <p className="mt-2 text-muted-foreground text-lead">
                Fill out the form below to express your interest in volunteering.
              </p>
              <InformationNotice
                title="Volunteer registration active"
                description="Complete the form below and our team will review your application."
                variant="info"
              />
              <VolunteerForm />
            </>
          ) : (
            <>
              <p className="mt-2 text-muted-foreground text-lead">
                The volunteer registration form below is for demonstration purposes.
                Online registration is not yet available.
              </p>
              <VolunteerForm />
            </>
          )}
        </Container>
      </Section>

      <Section>
        <Container className="max-w-4xl">
          <h2 className="text-h3">Frequently asked questions</h2>
          <dl className="mt-6 flex flex-col gap-4">
            {content.faq.map((item, index) => (
              <div key={index} className="p-4 rounded-xl border border-border bg-card">
                <dt className="font-medium">{item.question}</dt>
                <dd className="mt-2 text-muted-foreground">{item.answer}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      <Section tone="subtle" className="border-y border-border">
        <Container className="max-w-4xl text-center">
          <h2 className="text-h3">{content.finalCta.title}</h2>
          <p className="mt-2 max-w-2xl mx-auto text-muted-foreground text-lead">
            {content.finalCta.description}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a
              href={toRoute(content.finalCta.primaryHref)}
              className="font-medium text-primary underline underline-offset-4"
            >
              {content.finalCta.primaryLabel}
            </a>
            <a
              href={toRoute(content.finalCta.secondaryHref)}
              className="font-medium text-primary underline underline-offset-4"
            >
              {content.finalCta.secondaryLabel}
            </a>
          </div>
        </Container>
      </Section>

      <SupportCta
        title="Support the Foundation's work"
        description="Your donation helps sustain the programs that volunteers help deliver. The Foundation does not process payments directly; donations go through an external platform."
        primaryLabel="Donate"
        primaryHref="/donate"
        secondaryLabel="Contact Us"
        secondaryHref="/contact"
      />
    </>
  );
}