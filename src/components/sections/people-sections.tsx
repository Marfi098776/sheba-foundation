import Image from "next/image";
import { Container } from "@/components/shared/container";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  User,
  Briefcase,
  GraduationCap,
  ImageIcon,
  ExternalLink,
} from "lucide-react";
import type { VolunteerInfo } from "@/content/types";

export type PersonProps = {
  name: string | null;
  role: string;
  bio: string | null;
  photo: string | null;
};

/**
 * Soft purple ambient light behind a section.
 * Purely decorative. Sits behind content (-z-10) inside an isolated section.
 */
function SectionGlow() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 -top-32 -z-10 size-96 rounded-full bg-primary/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -right-32 -z-10 size-[28rem] rounded-full bg-primary/10 blur-3xl"
      />
    </>
  );
}

/** Icon inside a glowing ring, used for empty states. */
function EmptyStateIcon({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex size-20 items-center justify-center rounded-full border border-primary/25 bg-primary/10 shadow-[0_0_40px_-8px] shadow-primary/50">
      {children}
    </div>
  );
}

function PersonCard({ name, role, bio, photo }: PersonProps) {
  const hasName = !!name && name !== "[CLIENT TO PROVIDE]";

  return (
    <div className="group h-full">
      {/* ============================================================
          PERSON IMAGE
          NOT INSIDE THE CARD
          Transparent PNG sits directly on the section background,
          framed by a soft purple arch and glow.
          ============================================================ */}
      <div className="relative flex h-72 items-end justify-center bg-transparent">
        {/* Arch frame behind the person */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-x-8
            bottom-0
            top-6
            rounded-t-full
            border
            border-b-0
            border-primary/20
            bg-gradient-to-t
            from-primary/25
            via-primary/10
            to-transparent
            transition-colors
            duration-500
            group-hover:border-primary/40
            motion-reduce:transition-none
          "
        />

        {photo ? (
          <div className="relative z-0 h-full w-full">
            {/* Floor glow */}
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                bottom-2
                left-1/2
                h-20
                w-44
                -translate-x-1/2
                rounded-full
                bg-primary/40
                opacity-40
                blur-2xl
                transition-opacity
                duration-500
                group-hover:opacity-90
                motion-reduce:transition-none
              "
            />

            <Image
              src={photo}
              alt={hasName ? `Portrait of ${name}` : "Portrait"}
              width={809}
              height={774}
              className="
                relative
                z-10
                mx-auto
                h-full
                w-auto
                object-contain
                object-bottom
                drop-shadow-[0_12px_24px_rgba(0,0,0,0.45)]
                transition-transform
                duration-500
                group-hover:scale-[1.03]
                motion-reduce:transform-none
                motion-reduce:transition-none
              "
            />
          </div>
        ) : (
          <div
            className="
              relative
              mb-6
              flex
              size-40
              items-center
              justify-center
              rounded-full
              border
              border-primary/25
              bg-gradient-to-br
              from-primary/20
              to-muted
              text-primary/50
              shadow-[0_0_48px_-10px]
              shadow-primary/50
            "
          >
            <User className="size-16" aria-hidden="true" />
          </div>
        )}
      </div>

      {/* ============================================================
          INFORMATION CARD
          The card begins BELOW the person's image.
          ============================================================ */}
      <Card
        className="
          relative
          -mt-px
          min-h-52
          overflow-hidden
          rounded-t-none
          border-primary/20
          bg-gradient-to-b
          from-primary/10
          to-background
          shadow-lg
          shadow-primary/5
          transition-all
          duration-300
          group-hover:border-primary/40
          group-hover:shadow-xl
          group-hover:shadow-primary/20
          motion-reduce:transition-none
        "
      >
        {/* Accent line along the top edge */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
        />

        <CardContent className="flex min-h-52 flex-col px-6 py-7 text-center">
          {/* Name */}
          <h3
            className="
              font-heading
              text-xl
              font-semibold
              leading-snug
              tracking-tight
              text-foreground
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
              mx-auto
              mt-3
              w-fit
              rounded-full
              border
              border-primary/30
              bg-primary/10
              px-3.5
              py-1
              text-xs
              font-medium
              text-primary
            "
          >
            {role}
          </p>

          {/* Divider */}
          <div
            aria-hidden="true"
            className="mx-auto mt-5 h-px w-12 bg-gradient-to-r from-transparent via-primary/60 to-transparent"
          />

          {/* Biography */}
          <div className="mt-5 flex-1">
            {bio ? (
              <p className="text-sm leading-relaxed text-muted-foreground">
                {bio}
              </p>
            ) : (
              <p className="text-sm italic leading-relaxed text-muted-foreground/80">
                Biography to be provided by the Foundation.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export type PeopleSectionProps = {
  title: string;
  description?: string;
  people: PersonProps[];
  emptyMessage?: string;
  icon?: React.ComponentType<{
    className?: string;
    ariaHidden?: boolean;
  }>;
};

/**
 * Generic section for displaying a group of people.
 *
 * Used for:
 * - Board
 * - Leadership
 * - Other people-based sections
 */
export function PeopleSection({
  title,
  description,
  people,
  emptyMessage,
  icon: Icon,
}: PeopleSectionProps) {
  const hasConfirmedPeople = people.some(
    (p) => !!p.name && p.name !== "[CLIENT TO PROVIDE]"
  );

  if (!hasConfirmedPeople) {
    return (
      <Section
        tone="subtle"
        className="relative isolate overflow-hidden border-y border-primary/20"
      >
        <SectionGlow />
        <Container>
          <SectionHeading
            title={title}
            description={description}
          />

          <div className="relative mt-10 overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-muted to-muted p-8 text-center shadow-lg shadow-primary/5 sm:p-12">
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
            />

            {Icon && (
              <EmptyStateIcon>
                <Icon
                  className="size-9 text-primary"
                  aria-hidden="true"
                />
              </EmptyStateIcon>
            )}

            <h3 className="mt-6 font-heading text-h4 font-semibold text-foreground">
              {emptyMessage ?? "Information coming soon"}
            </h3>

            <p className="mx-auto mt-3 max-w-2xl leading-relaxed text-muted-foreground">
              {description ??
                "The Canadian Sheba Foundation has not yet published details for this section. It will be updated once approved materials are supplied."}
            </p>
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <Section
      tone="subtle"
      className="relative isolate overflow-hidden border-y border-primary/20"
    >
      <SectionGlow />
      <Container>
        <SectionHeading
          title={title}
          description={description}
        />

        <ul className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {people
            .filter(
              (p) =>
                !!p.name &&
                p.name !== "[CLIENT TO PROVIDE]"
            )
            .map((person) => (
              <li key={person.name ?? person.role}>
                <PersonCard {...person} />
              </li>
            ))}
        </ul>
      </Container>
    </Section>
  );
}

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
    />
  );
}

export function VolunteersSection({
  volunteers,
}: {
  volunteers: VolunteerInfo;
}) {
  return (
    <Section
      tone="subtle"
      className="relative isolate overflow-hidden border-y border-primary/20"
    >
      <SectionGlow />
      <Container>
        <SectionHeading
          title="Volunteers"
          description={
            volunteers.description ??
            "Volunteers support the Foundation through outreach, events, and fundraising."
          }
        />

        <div className="relative mt-10 overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-muted to-muted p-8 text-center shadow-lg shadow-primary/5 sm:p-12">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
          />

          <EmptyStateIcon>
            <ImageIcon
              className="size-9 text-primary"
              aria-hidden="true"
            />
          </EmptyStateIcon>

          <h3 className="mt-6 font-heading text-h4 font-semibold text-foreground">
            Volunteer profiles coming soon
          </h3>

          <p className="mx-auto mt-3 max-w-2xl leading-relaxed text-muted-foreground">
            The Foundation has not yet published volunteer
            profiles. They will appear here once approved
            materials are supplied.
          </p>
        </div>

        {(volunteers.opportunities.length > 0 ||
          volunteers.registrationAvailable) && (
            <div className="mt-12 max-w-2xl">
              <h3 className="flex items-center gap-3 font-heading text-h4 font-semibold text-foreground">
                <span
                  aria-hidden="true"
                  className="h-6 w-1 rounded-full bg-gradient-to-b from-primary to-primary/30"
                />
                Current volunteer opportunities
              </h3>

              <ul className="mt-5 flex flex-col gap-3">
                {volunteers.opportunities.map((opp) => (
                  <li
                    key={opp}
                    className="
                      flex
                      items-center
                      gap-3
                      rounded-lg
                      border
                      border-primary/15
                      bg-primary/5
                      px-4
                      py-3
                      text-sm
                      text-foreground/80
                      transition-colors
                      duration-200
                      hover:border-primary/35
                      hover:bg-primary/10
                      motion-reduce:transition-none
                    "
                  >
                    <span
                      aria-hidden="true"
                      className="size-2 shrink-0 rounded-full bg-primary shadow-[0_0_10px] shadow-primary"
                    />
                    {opp}
                  </li>
                ))}
              </ul>

              {volunteers.registrationAvailable &&
                volunteers.registrationUrl && (
                  <div className="mt-8">
                    <Button
                      asChild
                      variant="default"
                      size="lg"
                      className="shadow-lg shadow-primary/30 transition-shadow hover:shadow-xl hover:shadow-primary/40"
                    >
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
                <p className="mt-5 rounded-lg border border-border/60 bg-muted/50 px-4 py-3 text-sm text-muted-foreground">
                  Volunteer registration is not currently
                  available. Please check back later or{" "}
                  <a
                    href="/contact"
                    className="font-medium text-primary underline-offset-4 hover:underline"
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