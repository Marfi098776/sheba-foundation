import Link from "next/link";
import { Container } from "@/components/shared/container";
import { Section } from "@/components/shared/section";
import { Button } from "@/components/ui/button";
import { getHomeContent } from "@/content/home";
import { toRoute } from "@/lib/routes";

/**
 * Mission / introduction: answers "what does the Foundation exist to do?".
 *
 * Copy comes from `src/content/home.ts`, which holds provisional wording pending
 * the Foundation's own approved text. It deliberately does not come from
 * `organization.ts`: `OrganizationInfo.mission` stays `null` because the official
 * statement is unknown, and moving unapproved wording into that field would make
 * it look official to every later consumer of the record.
 *
 * A narrow label column against a wide text column gives this section an
 * editorial, quieter rhythm than the card sections around it.
 */
export async function Mission() {
  const { mission } = await getHomeContent();

  return (
    <Section>
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <p className="text-sm font-semibold tracking-wide text-primary uppercase">
              {mission.eyebrow}
            </p>
          </div>

          <div className="lg:col-span-8">
            <h2 className="max-w-3xl">{mission.title}</h2>
            <p className="mt-5 max-w-2xl text-lead text-muted-foreground">
              {mission.body}
            </p>
            <Button asChild variant="outline" className="mt-8">
              <Link href={toRoute(mission.ctaHref)}>{mission.ctaLabel}</Link>
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
