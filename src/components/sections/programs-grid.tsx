import Link from "next/link";
import { Container } from "@/components/shared/container";
import { Section } from "@/components/shared/section";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Program } from "@/content/types";
import { toRoute } from "@/lib/routes";

export type ProgramsGridProps = {
  programs: Program[];
};

/**
 * Renders the program directory as a responsive card grid. The page heading is
 * owned by `PageHeader`, so cards sit at `h2` directly beneath the page `h1`.
 */
export function ProgramsGrid({ programs }: ProgramsGridProps) {
  return (
    <Section>
      <Container>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((program) => {
            const href = program.dedicatedRoute ?? `/programs/${program.slug}`;

            return (
              <li key={program.slug} className="h-full">
                <Card className="h-full">
                  <CardHeader>
                    {program.status === "pending-details" ? (
                      <Badge variant="secondary" className="mb-1">
                        Details to be confirmed
                      </Badge>
                    ) : null}
                    <h2 className="font-heading text-lg leading-snug font-semibold">
                      <Link
                        href={toRoute(href)}
                        className="rounded-sm transition-colors hover:text-primary hover:underline"
                      >
                        {program.title}
                      </Link>
                    </h2>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{program.summary}</CardDescription>
                  </CardContent>
                </Card>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
