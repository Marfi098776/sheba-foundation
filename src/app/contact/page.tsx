import { PageHeader } from "@/components/sections/page-header";
import { InformationNotice } from "@/components/sections/information-notice";
import { SupportCta } from "@/components/sections/support-cta";
import { ContactForm } from "@/components/forms/contact-form";
import { getContactContent } from "@/content/contact";
import { getSiteContent } from "@/content/site";
import { Section } from "@/components/shared/section";
import { Container } from "@/components/shared/container";
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";
import { generatePageMetadata } from "@/lib/seo";

export const metadata = generatePageMetadata({
  title: "Contact Us",
  description: "How to reach the Canadian Sheba Foundation.",
  pathname: "/contact",
  openGraph: {
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
});

export default async function ContactPage() {
  const contactContent = await getContactContent();
  const { contact, name } = await getSiteContent();
  const hasContact = Boolean(contact.email || contact.phone || contact.address);

  return (
    <>
      <PageHeader
        eyebrow="Get in touch"
        title="Contact Us"
        description={`How to reach ${name}.`}
      />

      <Section>
        <Container className="max-w-4xl">
          <div className="prose prose-muted max-w-none">
            <p className="text-lead">{contactContent.introduction}</p>
          </div>
        </Container>
      </Section>

      <Section className="border-y border-border">
        <Container className="max-w-4xl">
          <h2 className="text-h3">Contact information</h2>
          {hasContact ? (
            <address className="mt-6 flex flex-col gap-6 not-italic">
              {contact.email && (
                <a
                  href={`mailto:${contact.email}`}
                  className="flex gap-4 p-4 rounded-xl border border-border bg-card transition-colors hover:border-primary/50"
                >
                  <div className="size-10 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center text-primary" aria-hidden="true">
                    <Mail className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="mt-1 text-primary underline underline-offset-4">{contact.email}</p>
                  </div>
                </a>
              )}
              {contact.phone && (
                <a
                  href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`}
                  className="flex gap-4 p-4 rounded-xl border border-border bg-card transition-colors hover:border-primary/50"
                >
                  <div className="size-10 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center text-primary" aria-hidden="true">
                    <Phone className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <p className="mt-1 text-primary underline underline-offset-4">{contact.phone}</p>
                  </div>
                </a>
              )}
              {contact.address && (
                <div className="flex gap-4 p-4 rounded-xl border border-border bg-card">
                  <div className="size-10 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center text-primary" aria-hidden="true">
                    <MapPin className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Mailing address</h3>
                    <div className="mt-1 text-muted-foreground">
                      {[
                        contact.address.street,
                        contact.address.locality,
                        [
                          contact.address.region,
                          contact.address.postalCode,
                        ]
                          .filter(Boolean)
                          .join(" "),
                        contact.address.country,
                      ]
                        .filter(Boolean)
                        .map((line, idx) => (
                          <span key={idx} className="block">
                            {line}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>
              )}
              {contact.hours && (
                <div className="flex gap-4 p-4 rounded-xl border border-border bg-card">
                  <div className="size-10 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center text-primary" aria-hidden="true">
                    <MessageSquare className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Office hours</h3>
                    <p className="mt-1 text-muted-foreground">{contact.hours}</p>
                  </div>
                </div>
              )}
              {!contact.email && !contact.phone && !contact.address && !contact.hours && (
                <p className="text-muted-foreground">
                  Contact details have not yet been published. The Foundation&apos;s
                  email address, phone number, and mailing address will be listed
                  here once confirmed.
                </p>
              )}
            </address>
          ) : (
            <InformationNotice
              title="Contact information pending"
              description="Contact details have not yet been published. The Foundation&apos;s email address, phone number, and mailing address will be listed here once confirmed."
              variant="pending"
            />
          )}
        </Container>
      </Section>

      {contactContent.social.length > 0 && (
        <Section>
          <Container className="max-w-4xl">
            <h2 className="text-h3">Social media</h2>
            <nav className="mt-4 flex flex-wrap gap-3" aria-label="Social media links">
              {contactContent.social.map((social) => (
                <a
                  key={social.label}
                  href={social.href ?? "#"}
                  className="flex gap-2 items-center px-4 py-2 rounded-lg border border-border bg-card text-sm font-medium transition-colors hover:border-primary/50 hover:text-primary"
                  aria-disabled={!social.href}
                  tabIndex={social.href ? 0 : -1}
                >
                  <span className="text-muted-foreground" aria-hidden="true">
                    {social.label}
                  </span>
                </a>
              ))}
            </nav>
          </Container>
        </Section>
      )}

      <Section className="border-y border-border">
        <Container className="max-w-4xl">
          <h2 className="text-h3">Send us a message</h2>
          <InformationNotice
            title="Contact form status"
            description={contactContent.form.note}
            variant="pending"
          />
          <ContactForm />
        </Container>
      </Section>

      <InformationNotice
        title="General notice"
        description={contactContent.generalNotice}
        variant="info"
      />

      <SupportCta
        title="Other ways to connect"
        description="Explore the Foundation's programs, volunteer opportunities, or make a donation to support our community work."
        primaryLabel="View Programs"
        primaryHref="/programs"
        secondaryLabel="Volunteer"
        secondaryHref="/volunteer"
        variant="subtle"
      />
    </>
  );
}