import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/sections/page-header";
import { PendingInformation } from "@/components/sections/pending-information";
import { ProgramActivityList } from "@/components/sections/program-activity-list";
import { HowToGetInvolved } from "@/components/sections/how-to-get-involved";
import { SupportCta } from "@/components/sections/support-cta";
import { InformationNotice } from "@/components/sections/information-notice";
import { getSupportContent } from "@/content/support";
import { getProgram } from "@/content/programs";
import { CONTENT_PENDING_NOTICE } from "@/content/site";
import { generatePageMetadata } from "@/lib/seo";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

export async function generateMetadata(): Promise<Metadata> {
  const program = await getProgram("newcomer-refugee-support");
  const content = await getSupportContent("newcomer-refugee-support");

  return generatePageMetadata({
    title: program?.title ?? "Newcomer & Refugee Support",
    description: content.summary ?? CONTENT_PENDING_NOTICE,
    pathname: "/newcomer-refugee-support",
    openGraph: {
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
    },
  });
}

export default async function NewcomerRefugeeSupportPage() {
  const program = await getProgram("newcomer-refugee-support");
  const content = await getSupportContent("newcomer-refugee-support");

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
          activities={content.areasOfSupport ?? []}
          title="Areas of support"
          description="The Foundation has identified Newcomer & Refugee Support as a program area. Specific services are still to be confirmed."
        />
      </ScrollReveal>

      <ScrollReveal delay={240}>
        <section className="py-16 sm:py-20">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="prose prose-muted max-w-none">
              <h2 className="text-h3">Community connection</h2>
              <p className="mt-4 text-lead">{content.communityConnection}</p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal delay={240}>
        <InformationNotice
          title="Program status"
          description="This program's specific services, eligibility criteria, and delivery model are still being developed by the Foundation. No services are currently confirmed or available. This page will be updated with details when they are approved."
          variant="pending"
        />
      </ScrollReveal>

      <ScrollReveal delay={240}>
        <section className="py-16 sm:py-20">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="prose prose-muted max-w-none">
              <h2 className="text-h3">How to get information</h2>
              <p className="mt-4 text-lead">{content.howToGetInformation}</p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal delay={320}>
        <HowToGetInvolved
          description="For questions about Newcomer & Refugee Support, please contact the Foundation. You can also support the Foundation's community work through volunteering or donations."
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
          title="Support Newcomer & Refugee Support"
          description="Your contribution helps the Foundation build this program and serve newcomer and refugee communities."
          primaryLabel="Donate"
          primaryHref="/donate"
          secondaryLabel="Volunteer"
          secondaryHref="/volunteer"
        />
      </ScrollReveal>
    </>
  );
}