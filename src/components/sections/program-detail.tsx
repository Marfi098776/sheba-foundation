import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/shared/container";
import { Section } from "@/components/shared/section";
import { PageHeader } from "@/components/sections/page-header";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Target, ExternalLink } from "lucide-react";
import { CONTENT_PENDING_NOTICE } from "@/content/site";
import type { Program } from "@/content/types";
import { toRoute } from "@/lib/routes";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

export type ProgramDetailProps = {
  program: Program;
};

/**
 * Standard presentation for a single program. Shared by `/programs/[slug]` and
 * by the dedicated program pages so both render identically from one source.
 *
 * Sections rendered conditionally based on available data:
 * - Breadcrumb
 * - Program hero with image slot
 * - Overview
 * - What the program includes (activities)
 * - Who it is intended to support (audience)
 * - How to get involved / access information
 * - CTA
 */
export function ProgramDetail({ program }: ProgramDetailProps) {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Our Programs", href: "/programs" },
    { label: program.title },
  ];

  return (
    <>
      <Section tone="subtle" size="compact" className="border-b border-border">
        <Container className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Breadcrumb items={breadcrumbItems} />
        </Container>
      </Section>

      <ScrollReveal delay={0}>
        <PageHeader
          eyebrow="Our Programs"
          title={program.title}
          description={program.summary}
        />
      </ScrollReveal>

      {program.image ? (
        <ScrollReveal delay={80}>
          <Section tone="subtle" className="py-16 sm:py-20">
            <Container>
              <div className="relative aspect-video w-full max-w-4xl mx-auto overflow-hidden rounded-xl border border-border bg-card">
                <Image
                  src={program.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </Container>
          </Section>
        </ScrollReveal>
      ) : (
        <ScrollReveal delay={80}>
          <Section tone="subtle" className="py-16 sm:py-20">
            <Container>
              <div className="relative aspect-video w-full max-w-4xl mx-auto overflow-hidden rounded-xl border border-border bg-muted">
                <div className="flex h-full items-center justify-center p-8 text-center">
                  <div className="max-w-md">
                    <Users className="mx-auto size-16 text-primary/30" aria-hidden="true" />
                    <p className="mt-4 text-sm text-muted-foreground">
                      Official program photography has not been supplied yet. This
                      space is reserved for it.
                    </p>
                  </div>
                </div>
              </div>
            </Container>
          </Section>
        </ScrollReveal>
      )}

      <ScrollReveal delay={160}>
        <Section>
          <Container className="flex flex-col gap-10 max-w-4xl">
            {program.description ? (
              <div className="prose prose-muted max-w-none">
                <h2 className="text-h3">Overview</h2>
                <p className="mt-4 text-lead">{program.description}</p>
              </div>
            ) : (
              <div className="prose prose-muted max-w-none">
                <h2 className="text-h3">Overview</h2>
                <p className="mt-4 text-muted-foreground">{CONTENT_PENDING_NOTICE}</p>
              </div>
            )}

            {program.activities.length > 0 ? (
              <div>
                <h2 className="text-h3">What this program includes</h2>
                <ul className="mt-4 flex flex-col gap-3">
                  {program.activities.map((activity) => (
                    <li key={activity.title} className="flex gap-3">
                      <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary" />
                      <span>
                        <span className="font-medium">{activity.title}</span>
                        {activity.description ? (
                          <span className="text-muted-foreground">
                            {" — "}
                            {activity.description}
                          </span>
                        ) : null}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div>
              <h2 className="text-h3">Who this program is for</h2>
              {program.category === "family-support" && (
                <p className="mt-4 text-muted-foreground">
                  Children and families experiencing financial hardship who need
                  practical support with education, nutrition, and essential
                  expenses.
                </p>
              )}
              {program.category === "community" && (
                <p className="mt-4 text-muted-foreground">
                  Community members of all ages seeking educational opportunities,
                  health awareness, and connection through local events and
                  workshops.
                </p>
              )}
              {program.category === "volunteer" && (
                <p className="mt-4 text-muted-foreground">
                  Individuals and groups who want to contribute their time and
                  skills to support the Foundation&apos;s community-focused work.
                </p>
              )}
              {program.category === "scholarships" && (
                <p className="mt-4 text-muted-foreground">
                  Eligibility criteria and target recipients have not been
                  confirmed. Details will be published when approved by the
                  Foundation.
                </p>
              )}
              {program.category === "newcomer-support" && (
                <p className="mt-4 text-muted-foreground">
                  Specific services and target populations have not been confirmed.
                  Details will be published when approved by the Foundation.
                </p>
              )}
            </div>

            <div>
              <h2 className="text-h3">How to get involved or access this program</h2>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
                {program.dedicatedRoute ? (
                  <>
                    <Button asChild variant="default" size="lg">
                      <Link href={toRoute(program.dedicatedRoute)}>
                        Visit the {program.title} page
                        <ArrowRight className="size-4" aria-hidden="true" />
                      </Link>
                    </Button>
                  </>
                ) : (
                  <>
                    <Button asChild variant="outline" size="lg">
                      <Link href={toRoute("/contact")}>
                        Contact us for details
                        <ExternalLink className="size-4" aria-hidden="true" />
                      </Link>
                    </Button>
                  </>
                )}
                <Button asChild variant="outline" size="lg">
                  <Link href={toRoute("/volunteer")}>
                    Volunteer with this program
                    <Users className="size-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href={toRoute("/donate")}>
                    Support this program
                    <Target className="size-4" aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </div>
          </Container>
        </Section>
      </ScrollReveal>

      <ScrollReveal delay={240}>
        <Section tone="subtle" className="border-t border-border">
          <Container className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xl">
              <h2 className="text-h3">Want to help?</h2>
              <p className="mt-2 text-muted-foreground">
                Your support helps sustain programs like {program.title} and the
                Foundation&apos;s wider community work.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="default" size="lg">
                <Link href={toRoute("/donate")}>Donate</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href={toRoute("/volunteer")}>Volunteer</Link>
              </Button>
            </div>
          </Container>
        </Section>
      </ScrollReveal>
    </>
  );
}