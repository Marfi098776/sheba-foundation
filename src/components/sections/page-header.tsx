import { Container } from "@/components/shared/container";
import { Section } from "@/components/shared/section";
import { cn } from "@/lib/utils";

export type PageHeaderProps = {
  title: string;
  eyebrow?: string;
  description?: string;
  className?: string;
};

/**
 * Standard page opening: an optional eyebrow, the page's single `h1`, and a
 * short lead paragraph. Used by every top-level route so page headers stay
 * consistent and the heading hierarchy is correct by construction.
 */
export function PageHeader({
  title,
  eyebrow,
  description,
  className,
}: PageHeaderProps) {
  return (
    <Section tone="subtle" size="compact" className={cn("border-b border-border", className)}>
      <Container className="flex flex-col gap-3">
        {eyebrow ? (
          <p className="text-sm font-semibold tracking-wide text-primary uppercase">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="max-w-3xl">{title}</h1>
        {description ? (
          <p className="max-w-2xl text-lead text-muted-foreground">{description}</p>
        ) : null}
      </Container>
    </Section>
  );
}
