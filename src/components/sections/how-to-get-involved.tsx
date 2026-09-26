import Link from "next/link";
import { Container } from "@/components/shared/container";
import { Section } from "@/components/shared/section";
import { Button } from "@/components/ui/button";
import { toRoute } from "@/lib/routes";

export type HowToGetInvolvedProps = {
  title?: string;
  description: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  tertiaryLabel?: string;
  tertiaryHref?: string;
  className?: string;
};

/**
 * Standardised section for "How to get involved or access this program".
 * Provides consistent action buttons across program pages.
 */
export function HowToGetInvolved({
  title = "How to get involved or access this program",
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel = "Volunteer with this program",
  secondaryHref = "/volunteer",
  tertiaryLabel = "Support this program",
  tertiaryHref = "/donate",
  className,
}: HowToGetInvolvedProps) {
  return (
    <Section className={className}>
      <Container className="max-w-4xl">
        <h2 className="text-h3">{title}</h2>
        {description && <p className="mt-2 text-muted-foreground text-lead">{description}</p>}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          {primaryLabel && primaryHref && (
            <Button asChild variant="default" size="lg">
              <Link href={toRoute(primaryHref)}>{primaryLabel}</Link>
            </Button>
          )}
          <Button asChild variant="outline" size="lg">
            <Link href={toRoute(secondaryHref)}>{secondaryLabel}</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href={toRoute(tertiaryHref)}>{tertiaryLabel}</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}