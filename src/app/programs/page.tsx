import Link from "next/link";
import { PageHeader } from "@/components/sections/page-header";
import { ProgramsGrid } from "@/components/sections/programs-grid";
import { Section } from "@/components/shared/section";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Target } from "lucide-react";
import { getPrograms } from "@/content/programs";
import { toRoute } from "@/lib/routes";
import { generatePageMetadata } from "@/lib/seo";

export const metadata = generatePageMetadata({
  title: "Our Programs",
  description:
    "Explore the Canadian Sheba Foundation's program areas: Family Support, Community Programs, Volunteer Program, Scholarships & Grants, and Newcomer & Refugee Support.",
  openGraph: {
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
});

export default async function ProgramsPage() {
  const programs = await getPrograms();

  return (
    <>
      <PageHeader
        eyebrow="What we do"
        title="Our Programs"
        description="The Foundation's program areas. Select a program for more detail."
      />

      <Section tone="subtle" className="border-y border-border">
        <Container className="max-w-4xl">
          <div className="prose prose-muted max-w-none">
            <p className="text-lead">
              The Foundation&apos;s work is organised around practical, direct program areas.
              Each program is described with only the detail that has been confirmed so far,
              and fuller information is published as it becomes available.
            </p>
            <p className="mt-4">
              Programs marked <strong>&ldquo;Details to be confirmed&rdquo;</strong> are recognised
              program areas where official eligibility criteria, application processes, or
              service specifics are still being finalised by the Foundation.
            </p>
          </div>
        </Container>
      </Section>

      <ProgramsGrid programs={programs} />

      <Section tone="subtle" className="bg-primary text-primary-foreground border-t border-border">
        <Container className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-xl">
            <h2 className="text-h3">Want to get involved?</h2>
            <p className="mt-2 text-primary-foreground/80">
              Volunteer your time, make a donation, or reach out to learn how you can
              support the Foundation&apos;s community-focused work.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="secondary" size="lg">
              <Link href={toRoute("/volunteer")}>
                Volunteer
                <Users className="size-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href={toRoute("/donate")}>
                Donate
                <Target className="size-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href={toRoute("/contact")}>
                Contact Us
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}