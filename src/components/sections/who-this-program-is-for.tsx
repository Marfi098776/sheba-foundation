import { Container } from "@/components/shared/container";
import { Section } from "@/components/shared/section";

export type WhoThisProgramIsForProps = {
  title?: string;
  description: string;
  className?: string;
};

/**
 * Standardised section explaining who a program is intended to support.
 * Used consistently across program pages.
 */
export function WhoThisProgramIsFor({
  title = "Who this program is for",
  description,
  className,
}: WhoThisProgramIsForProps) {
  return (
    <Section className={className}>
      <Container className="max-w-4xl">
        <h2 className="text-h3">{title}</h2>
        <p className="mt-4 text-muted-foreground text-lead">{description}</p>
      </Container>
    </Section>
  );
}