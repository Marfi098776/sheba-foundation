import { Container } from "@/components/shared/container";
import { Section } from "@/components/shared/section";
import type { ProgramActivity } from "@/content/types";

export type SupportFeatureGridProps = {
  items: ProgramActivity[];
  title: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
};

/**
 * Reusable grid for displaying program features, activities, or support areas.
 * Uses the existing card pattern from programs-grid but with more flexibility.
 */
export function SupportFeatureGrid({
  items,
  title,
  description,
  icon,
  className,
}: SupportFeatureGridProps) {
  return (
    <Section className={className}>
      <Container className="max-w-4xl">
        <div className="flex flex-col gap-2 text-center sm:max-w-2xl sm:mx-auto">
          <h2 className="text-h3">{title}</h2>
          {description && <p className="text-muted-foreground text-lead">{description}</p>}
        </div>

        {items.length > 0 ? (
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, index) => (
              <li key={`${item.title}-${index}`} className="flex flex-col gap-3 p-4 rounded-xl border border-border bg-card">
                {icon && <div className="size-10 text-primary" aria-hidden="true">{icon}</div>}
                <div className="flex-1">
                  <h3 className="font-medium text-base">{item.title}</h3>
                  {item.description && (
                    <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-8 text-center text-muted-foreground">
            Specific details for this area have not been confirmed yet. Information
            will be added when approved by the Foundation.
          </p>
        )}
      </Container>
    </Section>
  );
}