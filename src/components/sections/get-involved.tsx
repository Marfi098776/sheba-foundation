import Link from "next/link";
import { CalendarDays, Handshake, HeartHandshake } from "lucide-react";
import { Container } from "@/components/shared/container";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { getHomeContent } from "@/content/home";
import { getOrganization } from "@/content/organization";
import type { InvolvedPathIconKey } from "@/content/types";
import { toRoute } from "@/lib/routes";

const PATH_ICONS: Record<InvolvedPathIconKey, typeof HeartHandshake> = {
  volunteer: HeartHandshake,
  partner: Handshake,
  events: CalendarDays,
};

/**
 * Get involved: the three concrete ways to take part.
 *
 * The volunteer entry lists the Foundation's confirmed volunteering activities,
 * read from `src/content/organization.ts` rather than restated here. No
 * partnership benefits, event dates, or registration promises are implied — the
 * partner entry says outright that no formal process is published, and every
 * path links to a page that carries the same honest status.
 *
 * Rows are separated by rules rather than cards, so this section has a
 * different texture from the program grid above it.
 */
export async function GetInvolved() {
  const [{ getInvolved: copy }, { volunteers }] = await Promise.all([
    getHomeContent(),
    getOrganization(),
  ]);

  return (
    <Section tone="muted">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow={copy.eyebrow}
              title={copy.title}
              description={copy.description}
            />
          </div>

          <div className="lg:col-span-8">
            <ul className="flex flex-col">
              {copy.paths.map((path) => {
                const Icon = PATH_ICONS[path.icon];

                return (
                  <li
                    key={path.id}
                    className="grid gap-4 border-t border-border py-7 sm:grid-cols-[auto_1fr_auto] sm:items-start sm:gap-6"
                  >
                    <Icon
                      aria-hidden="true"
                      className="size-6 text-primary"
                      strokeWidth={1.75}
                    />

                    <div>
                      <h3 className="font-heading text-h4 font-semibold">
                        {path.title}
                      </h3>
                      <p className="mt-2 max-w-xl text-sm text-muted-foreground">
                        {path.description}
                      </p>
                      {path.id === "volunteer" &&
                      volunteers.opportunities.length > 0 ? (
                        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-muted-foreground">
                          {volunteers.opportunities.map((opportunity) => (
                            <li key={opportunity}>{opportunity}</li>
                          ))}
                        </ul>
                      ) : null}
                    </div>

                    <Link
                      href={toRoute(path.href)}
                      className="inline-flex w-fit items-center gap-1.5 rounded-sm text-sm font-medium text-primary hover:underline"
                    >
                      {path.linkLabel}
                      <span aria-hidden="true">&rarr;</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}
