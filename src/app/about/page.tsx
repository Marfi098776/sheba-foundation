import Link from "next/link";
import { PageHeader } from "@/components/sections/page-header";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { BoardSection, LeadershipSection, VolunteersSection } from "@/components/sections/people-sections";
import { Section } from "@/components/shared/section";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Eye, Users, Target } from "lucide-react";
import { getOrganization } from "@/content/organization";
import { toRoute } from "@/lib/routes";
import { generatePageMetadata } from "@/lib/seo";

export const metadata = generatePageMetadata({
  title: "About Us",
  description:
    "Learn about the Canadian Sheba Foundation's mission, vision, history, governance, and leadership.",
  openGraph: {
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
});

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "About Us" },
];

export default async function AboutPage() {
  const { about, mission, vision, charitablePurposes, history, board, leadership, foundingPatronsNote, volunteers } =
    await getOrganization();

  return (
    <>
      <Section tone="subtle" size="compact" className="border-b border-border">
        <Container className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Breadcrumb items={breadcrumbItems} />
        </Container>
      </Section>

      <PageHeader
        eyebrow="About"
        title="About Us"
        description={about ?? "The Canadian Sheba Foundation brings together practical support for families, educational programs, community events, and volunteering."}
      />

      <Section tone="subtle" className="border-y border-border">
        <Container className="max-w-4xl">
          <SectionHeading
            title="Mission & Vision"
            description="The Foundation's purpose and long-term direction."
          />
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            {mission ? (
              <div>
                <h3 className="font-heading text-h4 font-semibold flex items-center gap-2">
                  <Heart className="size-5 text-primary" aria-hidden="true" />
                  Mission
                </h3>
                <p className="mt-4 text-lead text-muted-foreground">{mission}</p>
              </div>
            ) : (
              <div>
                <h3 className="font-heading text-h4 font-semibold flex items-center gap-2">
                  <Heart className="size-5 text-primary/30" aria-hidden="true" />
                  Mission
                </h3>
                <p className="mt-4 text-muted-foreground">
                  The official mission statement has not been supplied yet. It will be
                  published here once approved by the Foundation.
                </p>
              </div>
            )}
            {vision ? (
              <div>
                <h3 className="font-heading text-h4 font-semibold flex items-center gap-2">
                  <Eye className="size-5 text-primary" aria-hidden="true" />
                  Vision
                </h3>
                <p className="mt-4 text-lead text-muted-foreground">{vision}</p>
              </div>
            ) : (
              <div>
                <h3 className="font-heading text-h4 font-semibold flex items-center gap-2">
                  <Eye className="size-5 text-primary/30" aria-hidden="true" />
                  Vision
                </h3>
                <p className="mt-4 text-muted-foreground">
                  The official vision statement has not been supplied yet. It will be
                  published here once approved by the Foundation.
                </p>
              </div>
            )}
          </div>
        </Container>
      </Section>

      {charitablePurposes && charitablePurposes.length > 0 && (
        <Section tone="subtle" className="border-y border-border">
          <Container className="max-w-4xl">
            <SectionHeading
              title="Charitable Purposes"
              description="The Foundation's registered charitable purposes as filed with regulators."
            />
            <ul className="mt-10 flex flex-col gap-4">
              {charitablePurposes.map((purpose, index) => (
                <li key={index} className="flex gap-3">
                  <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary" />
                  <span className="text-muted-foreground">{purpose}</span>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      {history && (
        <Section tone="subtle" className="border-y border-border">
          <Container className="max-w-4xl">
            <SectionHeading
              title="History & Founding Purpose"
              description="How the Foundation began and why it exists."
            />
            <div className="mt-10 prose prose-muted max-w-none">
              <p className="text-lead">{history}</p>
            </div>
          </Container>
        </Section>
      )}

      {(!history && !charitablePurposes.length && !mission && !vision) && (
        <Section tone="subtle" className="border-y border-border">
          <Container className="max-w-4xl">
            <SectionHeading
              title="Who We Are"
              description="Learn about the Foundation's purpose, history, and direction."
            />
            <div className="mt-10 rounded-xl border border-border bg-muted p-8 sm:p-10 text-center">
              <Users className="mx-auto size-12 text-primary/30" aria-hidden="true" />
              <h3 className="mt-4 font-heading text-h4 font-semibold">Information coming soon</h3>
              <p className="mt-3 max-w-2xl mx-auto text-muted-foreground">
                The Canadian Sheba Foundation has not yet supplied approved materials for this
                section. Mission, vision, history, and charitable purposes will be published here
                once they are confirmed.
              </p>
            </div>
          </Container>
        </Section>
      )}

      {board.length > 0 || leadership.length > 0 ? (
        <>
          {board.length > 0 && <BoardSection board={board} />}
          {leadership.length > 0 && <LeadershipSection leadership={leadership} />}
        </>
      ) : (
        <Section tone="subtle" className="border-y border-border">
          <Container className="max-w-4xl">
            <SectionHeading
              title="Governance & Leadership"
              description="The people who guide and operate the Foundation."
            />
            <div className="mt-10 rounded-xl border border-border bg-muted p-8 sm:p-10 text-center">
              <Users className="mx-auto size-12 text-primary/30" aria-hidden="true" />
              <h3 className="mt-4 font-heading text-h4 font-semibold">Board and leadership to be confirmed</h3>
              <p className="mt-3 max-w-2xl mx-auto text-muted-foreground">
                The Foundation has not yet published board member or leadership team details.
                This section will be updated once approved materials are supplied.
              </p>
            </div>
          </Container>
        </Section>
      )}

      {foundingPatronsNote && (
        <Section tone="subtle" className="border-y border-border">
          <Container className="max-w-4xl">
            <SectionHeading
              title="Founding Patrons"
              description="Recognition for the Foundation's major supporters."
            />
            <div className="mt-10 rounded-xl border border-border bg-muted p-8 sm:p-10 text-center">
              <p className="text-lead text-muted-foreground">{foundingPatronsNote}</p>
            </div>
          </Container>
        </Section>
      )}

      <VolunteersSection volunteers={volunteers} />

      <Section tone="subtle" className="bg-primary text-primary-foreground border-t border-border">
        <Container className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-xl">
            <h2 className="text-h3">Support Our Work</h2>
            <p className="mt-2 text-primary-foreground/80">
              The Foundation relies on community support to deliver its programs.
              Every contribution makes a difference.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="secondary" size="lg">
              <Link href={toRoute("/programs")}>
                Explore Our Programs
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
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
          </div>
        </Container>
      </Section>
    </>
  );
}