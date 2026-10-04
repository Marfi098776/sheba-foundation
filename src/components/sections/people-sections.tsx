import Image from "next/image";
import { Container } from "@/components/shared/container";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import {
  User,
  Briefcase,
  GraduationCap,
  ImageIcon,
  ExternalLink,
} from "lucide-react";
import type { VolunteerInfo } from "@/content/types";
import { MobilePeopleCarousel } from "./mobile-people-carousel";


export type PersonProps = {
  name: string | null;
  role: string;
  bio: string | null;
  photo: string | null;
};

/* -------------------------------------------------------------------------- */
/* Person Card                                                                */
/* -------------------------------------------------------------------------- */

function PersonCard({ name, role, bio, photo }: PersonProps) {
  const hasName = !!name && name !== "[CLIENT TO PROVIDE]";

  return (
    <article
      className="
        group
        relative
        overflow-hidden
        rounded-2xl
        border
        border-[#4a2a82]/15
        bg-white
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-[0_18px_45px_rgba(74,42,130,0.18)]
      "
    >
      {/* ------------------------------------------------------------------ */}
      {/* Portrait                                                           */}
      {/* ------------------------------------------------------------------ */}

      <div
        className="
          relative
          aspect-square
          w-full
          overflow-hidden
          rounded-t-2xl
          bg-[#f3eff9]
        "
      >
        {photo ? (
          <div
            className="
              absolute
              inset-0
              flex
              items-end
              justify-center
              transition-all
              duration-500
              ease-out
              group-hover:scale-[1.04]
            "
          >
            <Image
              src={photo}
              alt={hasName ? `Portrait of ${name}` : ""}
              fill
              sizes="
                (min-width: 1024px) 30vw,
                (min-width: 640px) 45vw,
                100vw
              "
              className="
                object-cover
                object-top
              "
            />
          </div>
        ) : (
          <div
            className="
              absolute
              inset-0
              flex
              items-center
              justify-center
              bg-[#f3eff9]
            "
          >
            <User
              className="size-16 text-[#4a2a82]/25"
              aria-hidden="true"
            />
          </div>
        )}

        {/* Purple image shadow / glow */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            opacity-0
            shadow-[inset_0_-30px_45px_rgba(74,42,130,0.12)]
            transition-opacity
            duration-300
            group-hover:opacity-100
          "
        />
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Information                                                        */}
      {/* ------------------------------------------------------------------ */}

      <div
        className="
          relative
          z-10
          bg-white
          px-5
          py-5
          text-center
        "
      >
        {/* Name */}
        <h3
          className="
            font-heading
            text-lg
            font-semibold
            leading-tight
            text-[#21164f]
          "
        >
          {hasName ? (
            name
          ) : (
            <span className="text-muted-foreground">
              Name to be confirmed
            </span>
          )}
        </h3>

        {/* Role */}
        <p
          className="
            mt-1.5
            text-sm
            font-medium
            text-[#5b3a8f]
          "
        >
          {role}
        </p>

        {/* Biography */}
        <div className="mt-4 min-h-[48px]">
          {bio ? (
            <p className="text-sm leading-relaxed text-muted-foreground">
              {bio}
            </p>
          ) : (
            <p className="text-sm leading-relaxed text-muted-foreground">
              Biography to be provided by the Foundation.
            </p>
          )}
        </div>
      </div>
    </article>
  );
}

/* -------------------------------------------------------------------------- */
/* Generic People Section                                                    */
/* -------------------------------------------------------------------------- */

export type PeopleSectionProps = {
  title: string;
  description?: string;
  people: PersonProps[];
  emptyMessage?: string;
  icon?: React.ComponentType<{
    className?: string;
    ariaHidden?: boolean;
  }>;
  marquee?: boolean;
};

export function PeopleSection({
  title,
  description,
  people,
  emptyMessage,
  icon: Icon,
}: PeopleSectionProps) {
  const hasConfirmedPeople = people.some(
    (p) => !!p.name && p.name !== "[CLIENT TO PROVIDE]",
  );

  /* ---------------------------------------------------------------------- */
  /* Empty state                                                            */
  /* ---------------------------------------------------------------------- */

  if (!hasConfirmedPeople) {
    return (
      <Section tone="subtle" className="border-y border-border">
        <Container>
          <SectionHeading
            title={title}
            description={description}
          />

          <div
            className="
              mt-10
              rounded-2xl
              border
              border-[#4a2a82]/10
              bg-[#f7f4fb]
              p-8
              text-center
              sm:p-10
            "
          >
            {Icon && (
              <Icon
                className="mx-auto size-12 text-[#4a2a82]/30"
                aria-hidden="true"
              />
            )}

            <h3
              className="
                mt-4
                font-heading
                text-h4
                font-semibold
                text-[#21164f]
              "
            >
              {emptyMessage ?? "Information coming soon"}
            </h3>

            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              {description ??
                "The Canadian Sheba Foundation has not yet published details for this section. It will be updated once approved materials are supplied."}
            </p>
          </div>
        </Container>
      </Section>
    );
  }

  /* ---------------------------------------------------------------------- */
  /* People                                                                  */
  /* ---------------------------------------------------------------------- */

  return (
    <Section tone="subtle" className="border-y border-border">
      <Container>
        <SectionHeading
          title={title}
          description={description}
        />

        {(() => {
          const confirmedPeople = people.filter(
            (p) => !!p.name && p.name !== "[CLIENT TO PROVIDE]",
          );

          return (
            <>
              {/* ============================================================
          MOBILE — CAROUSEL
          ============================================================ */}
              <MobilePeopleCarousel people={confirmedPeople} />

              {/* ============================================================
          TABLET / DESKTOP — GRID
          ============================================================ */}
              <ul
                className="
          mt-10
          hidden
          gap-7
          sm:grid
          sm:grid-cols-2
          lg:grid-cols-3
        "
              >
                {confirmedPeople.map((person) => (
                  <li
                    key={`${person.name}-${person.role}`}
                    className="h-full"
                  >
                    <PersonCard {...person} />
                  </li>
                ))}
              </ul>
            </>
          );
        })()}
      </Container>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */
/* Board                                                                      */
/* -------------------------------------------------------------------------- */

export function BoardSection({
  board,
}: {
  board: PersonProps[];
}) {
  return (
    <PeopleSection
      title="Board of Directors"
      description="The Board provides governance and strategic oversight for the Foundation."
      people={board}
      emptyMessage="Board members to be confirmed"
      icon={GraduationCap}
    />
  );
}

/* -------------------------------------------------------------------------- */
/* Leadership                                                                 */
/* -------------------------------------------------------------------------- */

export function LeadershipSection({
  leadership,
}: {
  leadership: PersonProps[];
}) {
  return (
    <PeopleSection
      title="Leadership Team"
      description="The executive team responsible for day-to-day operations and program delivery."
      people={leadership}
      emptyMessage="Leadership team to be confirmed"
      icon={Briefcase}
      marquee
    />
  );
}

/* -------------------------------------------------------------------------- */
/* Volunteers                                                                 */
/* -------------------------------------------------------------------------- */

export function VolunteersSection({
  volunteers,
}: {
  volunteers: VolunteerInfo;
}) {
  return (
    <Section tone="subtle" className="border-y border-border">
      <Container>
        <SectionHeading
          title="Volunteers"
          description={
            volunteers.description ??
            "Volunteers support the Foundation through outreach, events, and fundraising."
          }
        />

        <div
          className="
            mt-10
            rounded-2xl
            border
            border-[#4a2a82]/10
            bg-[#f7f4fb]
            p-8
            text-center
            sm:p-10
          "
        >
          <ImageIcon
            className="mx-auto size-12 text-[#4a2a82]/30"
            aria-hidden="true"
          />

          <h3
            className="
              mt-4
              font-heading
              text-h4
              font-semibold
              text-[#21164f]
            "
          >
            Volunteer profiles coming soon
          </h3>

          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            The Foundation has not yet published volunteer profiles.
            They will appear here once approved materials are supplied.
          </p>
        </div>

        {(volunteers.opportunities.length > 0 ||
          volunteers.registrationAvailable) && (
            <div className="mt-10 max-w-2xl">
              <h3
                className="
                font-heading
                text-h4
                font-semibold
                text-[#21164f]
              "
              >
                Current volunteer opportunities
              </h3>

              <ul className="mt-4 flex flex-col gap-2">
                {volunteers.opportunities.map((opp) => (
                  <li
                    key={opp}
                    className="
                    flex
                    items-center
                    gap-2
                    text-sm
                    text-muted-foreground
                  "
                  >
                    <span
                      aria-hidden="true"
                      className="
                      size-1.5
                      shrink-0
                      rounded-full
                      bg-[#5b3a8f]
                    "
                    />
                    {opp}
                  </li>
                ))}
              </ul>

              {volunteers.registrationAvailable &&
                volunteers.registrationUrl && (
                  <div className="mt-6">
                    <Button asChild size="lg">
                      <a
                        href={volunteers.registrationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Register to Volunteer
                        <ExternalLink
                          className="size-4"
                          aria-hidden="true"
                        />
                      </a>
                    </Button>
                  </div>
                )}

              {!volunteers.registrationAvailable && (
                <p className="mt-4 text-sm text-muted-foreground">
                  Volunteer registration is not currently available.
                  Please check back later or{" "}
                  <a
                    href="/contact"
                    className="font-medium text-[#5b3a8f] hover:underline"
                  >
                    contact us
                  </a>{" "}
                  for more information.
                </p>
              )}
            </div>
          )}
      </Container>
    </Section>
  );
}