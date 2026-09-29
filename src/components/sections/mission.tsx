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


  return (
    <Section className="relative overflow-hidden py-24">
      {/* Background image */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/community-programs.jpeg')",
        }}
      />

      {/* Dark gradient overlay */}
      <div aria-hidden="true" className="absolute inset-0 bg-linear-to-r from-[#21164f]/90 via-[#21164f]/70 to-[#21164f]/35"
      />

      {/* Subtle bottom fade */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-black/20 to-transparent"
      />

      <Container className="relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-[0.7fr_1.3fr]">

          {/* Eyebrow */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/80">
              WHO WE ARE
            </p>
          </div>

          {/* Content */}
          <div className="max-w-3xl">
            <h2 className="font-heading text-3xl font-semibold leading-tight text-white md:text-4xl lg:text-5xl">
              What the Foundation exists to do
            </h2>

            <p className="mt-6 text-lg leading-8 text-white/85">
              Families and communities are at the centre of the Foundation&apos;s
              work. That work is organised around practical, direct areas:
              family support, community programs, the volunteer program,
              scholarships and grants, and newcomer and refugee support. Each
              area is described on this site with only the detail that has been
              confirmed so far, and fuller information is published as it is
              confirmed.
            </p>

            <Link
              href={toRoute("/about")}
              className="mt-8 inline-flex items-center rounded-md border border-white/30 bg-white px-5 py-2.5 text-sm font-medium text-[#21164f] shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/95 hover:shadow-xl"
            >
              About the Foundation
              <span aria-hidden="true" className="ml-2">
                →
              </span>
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
