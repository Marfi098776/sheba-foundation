import Image from "next/image";
import { Container } from "@/components/shared/container";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Briefcase, GraduationCap, ImageIcon, ExternalLink } from "lucide-react";
import type { VolunteerInfo } from "@/content/types";

export type PersonProps = {
  name: string | null;
  role: string;
  bio: string | null;
  photo: string | null;
};

function PersonCard({ name, role, bio, photo }: PersonProps) {
  const hasName = !!name && name !== "[CLIENT TO PROVIDE]";

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-col items-center text-center gap-3">
        {photo ? (
          <div className="relative size-24 shrink-0 overflow-hidden rounded-full bg-muted">
            <Image
              src={photo}
              alt=""
              fill
              className="object-cover"
              sizes="96px"
            />
          </div>
        ) : (
          <div className="relative size-24 shrink-0 overflow-hidden rounded-full bg-muted flex items-center justify-center">
            <User className="size-10 text-muted-foreground/40" aria-hidden="true" />
          </div>
        )}
        <div>
          <CardTitle className="text-lg">
            {hasName ? name : <span className="text-muted-foreground">Name to be confirmed</span>}
          </CardTitle>
          <CardDescription className="text-sm">{role}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col h-full">
        {bio ? (
          <p className="text-sm text-muted-foreground flex-1">{bio}</p>
        ) : (
          <p className="text-sm text-muted-foreground flex-1">
            Biography to be provided by the Foundation.
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export type PeopleSectionProps = {
  title: string;
  description?: string;
  people: PersonProps[];
  emptyMessage?: string;
  icon?: React.ComponentType<{ className?: string; ariaHidden?: boolean }>;
};

/**
 * Generic section for displaying a group of people (board, leadership, volunteers).
 * Renders a professional pending state when the array is empty or all entries
 * lack confirmed names.
 */
export function PeopleSection({
  title,
  description,
  people,
  emptyMessage,
  icon: Icon,
}: PeopleSectionProps) {
  const hasConfirmedPeople = people.some((p) => !!p.name && p.name !== "[CLIENT TO PROVIDE]");

  if (!hasConfirmedPeople) {
    return (
      <Section tone="subtle" className="border-y border-border">
        <Container>
          <SectionHeading title={title} description={description} />
          <div className="mt-10 rounded-xl border border-border bg-muted p-8 sm:p-10 text-center">
            {Icon && <Icon className="mx-auto size-12 text-primary/30" aria-hidden="true" />}
            <h3 className="mt-4 font-heading text-h4 font-semibold">
              {emptyMessage ?? "Information coming soon"}
            </h3>
            <p className="mt-3 max-w-2xl mx-auto text-muted-foreground">
              {description ??
                "The Canadian Sheba Foundation has not yet published details for this section. It will be updated once approved materials are supplied."}
            </p>
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <Section tone="subtle" className="border-y border-border">
      <Container>
        <SectionHeading title={title} description={description} />
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {people
            .filter((p) => !!p.name && p.name !== "[CLIENT TO PROVIDE]")
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

export function BoardSection({ board }: { board: PersonProps[] }) {
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

export function LeadershipSection({ leadership }: { leadership: PersonProps[] }) {
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
    <Section tone="subtle" className="border-y border-border">
      <Container>
        <SectionHeading
          title="Volunteers"
          description={volunteers.description ?? "Volunteers support the Foundation through outreach, events, and fundraising."}
        />

        <div className="mt-10 rounded-xl border border-border bg-muted p-8 sm:p-10 text-center">
          <ImageIcon className="mx-auto size-12 text-primary/30" aria-hidden="true" />
          <h3 className="mt-4 font-heading text-h4 font-semibold">Volunteer profiles coming soon</h3>
          <p className="mt-3 max-w-2xl mx-auto text-muted-foreground">
            The Foundation has not yet published volunteer profiles. They will appear here once
            approved materials are supplied.
          </p>
        </div>

        {(volunteers.opportunities.length > 0 || volunteers.registrationAvailable) && (
          <div className="mt-10 max-w-2xl">
            <h3 className="font-heading text-h4 font-semibold">Current volunteer opportunities</h3>
            <ul className="mt-4 flex flex-col gap-2">
              {volunteers.opportunities.map((opp) => (
                <li key={opp} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-primary" />
                  {opp}
                </li>
              ))}
            </ul>
            {volunteers.registrationAvailable && volunteers.registrationUrl && (
              <div className="mt-6">
                <Button asChild variant="default" size="lg">
                  <a href={volunteers.registrationUrl} target="_blank" rel="noopener noreferrer">
                    Register to Volunteer
                    <ExternalLink className="size-4" aria-hidden="true" />
                  </a>
                </Button>
              </div>
            )}
            {!volunteers.registrationAvailable && (
              <p className="mt-4 text-sm text-muted-foreground">
                Volunteer registration is not currently available. Please check back later or{" "}
                <a href="/contact" className="text-primary hover:underline">
                  contact us
                </a>
                {" for more information."}
              </p>
            )}
          </div>
        )}
      </Container>
    </Section>
  );
}