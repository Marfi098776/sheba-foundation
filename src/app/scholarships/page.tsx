import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/sections/page-header";
import { InformationNotice } from "@/components/sections/information-notice";
import { PendingInformation } from "@/components/sections/pending-information";
import { WhoThisProgramIsFor } from "@/components/sections/who-this-program-is-for";
import { HowToGetInvolved } from "@/components/sections/how-to-get-involved";
import { SupportCta } from "@/components/sections/support-cta";
import { getSupportContent } from "@/content/support";
import { getProgram } from "@/content/programs";
import { CONTENT_PENDING_NOTICE } from "@/content/site";
import { generatePageMetadata } from "@/lib/seo";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

export async function generateMetadata(): Promise<Metadata> {
  const program = await getProgram("scholarships-grants");
  const content = await getSupportContent("scholarships-grants");

  return generatePageMetadata({
    title: program?.title ?? "Scholarships & Grants",
    description: content.summary ?? CONTENT_PENDING_NOTICE,
    pathname: "/scholarships",
    openGraph: {
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
    },
  });
}

export default async function ScholarshipsPage() {
  const program = await getProgram("scholarships-grants");
  const content = await getSupportContent("scholarships-grants");

  if (!program) {
    notFound();
  }

  return (
    <>
      <ScrollReveal delay={0}>
        <PageHeader
          eyebrow="Our Programs"
          title={program.title}
          description={program.summary}
        />
      </ScrollReveal>

      <ScrollReveal delay={80}>
        <PendingInformation status={program.status} programTitle={program.title} />
      </ScrollReveal>

      <ScrollReveal delay={160}>
        <section className="py-16 sm:py-20">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="prose prose-muted max-w-none">
              <h2 className="text-h3">Overview</h2>
              <p className="mt-4 text-lead">{content.introduction}</p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal delay={160}>
        <WhoThisProgramIsFor
          description={content.whoMayBeSupported?.join(" ") ?? "Eligibility criteria and target recipients have not been confirmed. Details will be published when approved by the Foundation."}
        />
      </ScrollReveal>

      <ScrollReveal delay={240}>
        <section className="py-16 sm:py-20">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="prose prose-muted max-w-none">
              <h2 className="text-h3">How applications will work</h2>
              <p className="mt-4 text-lead">{content.howApplicationsWillWork}</p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal delay={240}>
        <section className="py-16 sm:py-20">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="prose prose-muted max-w-none">
              <h2 className="text-h3">Application requirements</h2>
              <p className="mt-4 text-lead">{content.applicationRequirements}</p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal delay={240}>
        <InformationNotice
          title="Application status"
          description={content.applicationStatus ?? "Applications are not currently open. Official application details will be published by the Foundation when available."}
          variant="pending"
        />
      </ScrollReveal>

      <ScrollReveal delay={320}>
        <HowToGetInvolved
          description="When the Scholarships & Grants program launches, details on how to apply will be published here. In the meantime, you can reach out with questions or explore other ways to support the Foundation's work."
          primaryLabel="Contact us for details"
          primaryHref="/contact"
          secondaryLabel="Volunteer"
          secondaryHref="/volunteer"
          tertiaryLabel="Donate"
          tertiaryHref="/donate"
        />
      </ScrollReveal>

      <ScrollReveal delay={320}>
        <SupportCta
          title="Support the Scholarships & Grants program"
          description="Your donation helps make future scholarships and grants possible. The Foundation does not process payments directly; donations go through an external platform."
          primaryLabel="Donate"
          primaryHref="/donate"
          secondaryLabel="Volunteer"
          secondaryHref="/volunteer"
        />
      </ScrollReveal>
    </>
  );
}