import {
  BookOpen,
  Dumbbell,
  HeartHandshake,
  Lightbulb,
  Sparkles,
  Users,
} from "lucide-react";
import { Container } from "@/components/shared/container";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { getHomeContent } from "@/content/home";
import { getImpactContent, getVerifiedStats } from "@/content/impact";
import type { ValueIconKey } from "@/content/types";

const VALUE_ICONS: Record<ValueIconKey, typeof Users> = {
  community: Users,
  education: BookOpen,
  opportunity: Lightbulb,
  health: Dumbbell,
  volunteer: HeartHandshake,
  connection: Sparkles,
};

/**
 * Community impact / values.
 *
 * Built around the Foundation's confirmed themes rather than statistics. The
 * verified-figures row is already wired up: it renders only when
 * `getVerifiedStats()` returns something, so adding a human-confirmed number to
 * `src/content/impact.ts` makes it appear with no change here. Until then no
 * figure is shown at all.
 *
 * Laid out as a hairline matrix rather than cards, so it reads differently from
 * the program grid directly above it.
 */
export async function ValuesPreview() {
  const [{ values: copy }, { values }, stats] = await Promise.all([
    getHomeContent(),
    getImpactContent(),
    getVerifiedStats(),
  ]);

  return (
    <Section>
      <Container>
        <SectionHeading
          eyebrow={copy.eyebrow}
          title={copy.title}
          description={copy.description}
        />

        {stats.length > 0 ? (
          <dl className="mt-10 grid gap-6 border-y border-border py-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.id}>
                <dt className="text-sm text-muted-foreground">{stat.label}</dt>
                <dd className="mt-1 text-display">
                  {stat.value}
                  {stat.suffix ? (
                    <span className="text-h2 text-muted-foreground">
                      {stat.suffix}
                    </span>
                  ) : null}
                </dd>
                {stat.description ? (
                  <p className="mt-2 text-sm text-muted-foreground">
                    {stat.description}
                  </p>
                ) : null}
              </div>
            ))}
          </dl>
        ) : null}

        <ul className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value) => {
            const Icon = VALUE_ICONS[value.icon];

            return (
              <li key={value.id} className="border-t border-border pt-6">
                <Icon
                  aria-hidden="true"
                  className="size-6 text-primary"
                  strokeWidth={1.75}
                />
                <h3 className="mt-4 font-heading text-h4 font-semibold">
                  {value.title}
                </h3>
                <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                  {value.description}
                </p>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
