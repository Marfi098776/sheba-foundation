import Link from "next/link";
import {
  GraduationCap,
  HandHeart,
  Landmark,
  Users,
} from "lucide-react";
import { Container } from "@/components/shared/container";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getHomeContent } from "@/content/home";
import { getPrograms } from "@/content/programs";
import type { Program, ProgramCategory } from "@/content/types";
import { toRoute } from "@/lib/routes";

/**
 * One icon per program category. Every icon is `aria-hidden`, so the program
 * title alone carries the meaning — the icon is never the only signal.
 */
const CATEGORY_ICONS: Record<ProgramCategory, typeof Users> = {
  "family-support": HandHeart,
  community: Users,
  volunteer: HandHeart,
  scholarships: GraduationCap,
  "newcomer-support": Landmark,
};

function programHref(program: Program): string {
  return program.dedicatedRoute ?? `/programs/${program.slug}`;
}

/**
 * Homepage preview of the confirmed program areas.
 *
 * Cards are intentionally compact: title, one-sentence summary, and a link. No
 * activity lists, so the row heights stay even and the section does not become
 * a wall of text.
 */
export async function ProgramsPreview() {
  const [{ programs: copy }, programs] = await Promise.all([
    getHomeContent(),
    getPrograms(),
  ]);

  return (
    <Section tone="muted">
      <Container>
        <SectionHeading
          eyebrow={copy.eyebrow}
          title={copy.title}
          description={copy.description}
        />

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((program) => {
            const Icon = CATEGORY_ICONS[program.category];

            return (
              <li key={program.slug} className="h-full">
                <Card className="h-full">
                  <CardHeader>
                    <Icon
                      aria-hidden="true"
                      className="size-6 text-primary"
                      strokeWidth={1.75}
                    />
                    {program.status === "pending-details" ? (
                      <Badge variant="secondary" className="mt-3">
                        Details to be confirmed
                      </Badge>
                    ) : null}
                    <h3 className="mt-3 font-heading text-lg leading-snug font-semibold">
                      {program.title}
                    </h3>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4">
                    <CardDescription>{program.summary}</CardDescription>
                    <Link
                      href={toRoute(programHref(program))}
                      className="mt-auto inline-flex w-fit items-center gap-1.5 rounded-sm text-sm font-medium text-primary hover:underline"
                    >
                      Learn More
                      <span aria-hidden="true">&rarr;</span>
                    </Link>
                  </CardContent>
                </Card>
              </li>
            );
          })}
        </ul>

        <Button asChild variant="outline" className="mt-8">
          <Link href={toRoute(copy.ctaHref)}>{copy.ctaLabel}</Link>
        </Button>
      </Container>
    </Section>
  );
}
