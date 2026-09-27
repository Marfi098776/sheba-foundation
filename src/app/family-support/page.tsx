import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/sections/page-header";
import { PendingInformation } from "@/components/sections/pending-information";
import { ProgramActivityList } from "@/components/sections/program-activity-list";
import { WhoThisProgramIsFor } from "@/components/sections/who-this-program-is-for";
import { HowToGetInvolved } from "@/components/sections/how-to-get-involved";
import { SupportCta } from "@/components/sections/support-cta";
import { InformationNotice } from "@/components/sections/information-notice";
import { getSupportContent } from "@/content/support";
import { getProgram } from "@/content/programs";
import { CONTENT_PENDING_NOTICE } from "@/content/site";
import { generatePageMetadata } from "@/lib/seo";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

export async function generateMetadata(): Promise<Metadata> {
  const program = await getProgram("family-support");
  const content = await getSupportContent("family-support");

  return generatePageMetadata({
    title: program?.title ?? "Family Support",
    description: content.summary ?? CONTENT_PENDING_NOTICE,
    pathname: "/family-support",
    openGraph: {
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
    },
  });
}

export default async function FamilySupportPage() {
  const program = await getProgram("family-support");
  const content = await getSupportContent("family-support");

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
              <h2 className="text-h3">Introduction</h2>
              <p className="mt-4 text-lead">{content.introduction}</p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal delay={160}>
        <ProgramActivityList
          activities={content.activities ?? []}
          title="What this program includes"
          description="The Foundation's Family Support program currently focuses on the following areas:"
        />
      </ScrollReveal>

      <ScrollReveal delay={240}>
        <WhoThisProgramIsFor
          description="Children and families experiencing financial hardship who need practical support with education, nutrition, and essential expenses. Specific eligibility criteria have not been finalised and will be published when approved by the Foundation."
        />
      </ScrollReveal>

      <ScrollReveal delay={240}>
        <InformationNotice
          title="Financial assistance notice"
          description="Limited financial assistance is offered in special circumstances only, subject to the Foundation's future criteria. Assistance amounts, eligibility thresholds, and application requirements have not been confirmed. No guaranteed support is implied."
          variant="info"
        />
      </ScrollReveal>

      <ScrollReveal delay={240}>
        <section className="py-16 sm:py-20">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="prose prose-muted max-w-none">
              <h2 className="text-h3">How to learn more or request information</h2>
              <p className="mt-4 text-lead">{content.howToLearnMore}</p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal delay={320}>
        <HowToGetInvolved
          description="To learn more about Family Support or to inquire about eligibility, please contact the Foundation. You can also support this program through volunteering or donations."
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
          title="Support Family Support"
          description="Your donation helps the Foundation provide educational support, school supplies, healthy meals, and limited financial assistance to families in need."
          primaryLabel="Donate"
          primaryHref="/donate"
          secondaryLabel="Volunteer"
          secondaryHref="/volunteer"
        />
      </ScrollReveal>
    </>
  );
}