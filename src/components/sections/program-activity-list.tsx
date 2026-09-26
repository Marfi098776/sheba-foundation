import { Container } from "@/components/shared/container";
import { Section } from "@/components/shared/section";
import type { ProgramActivity } from "@/content/types";

export type ProgramActivityListProps = {
  activities: ProgramActivity[];
  title: string;
  description?: string;
  className?: string;
};

/**
 * Simple list component for program activities.
 * Renders as a clean bullet list with optional descriptions.
 */
export function ProgramActivityList({
  activities,
  title,
  description,
  className,
}: ProgramActivityListProps) {
  if (activities.length === 0) {
    return null;
  }

  return (
    <Section className={className}>
      <Container className="max-w-4xl">
        <div>
          <h2 className="text-h3">{title}</h2>
          {description && <p className="mt-2 text-muted-foreground text-lead">{description}</p>}
        </div>

        <ul className="mt-6 flex flex-col gap-4">
          {activities.map((activity, index) => (
            <li key={`${activity.title}-${index}`} className="flex gap-3 p-4 rounded-lg border border-border bg-card">
              <span aria-hidden="true" className="mt-2 size-2 shrink-0 rounded-full bg-primary" />
              <div>
                <h3 className="font-medium">{activity.title}</h3>
                {activity.description && (
                  <p className="mt-1 text-sm text-muted-foreground">{activity.description}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}