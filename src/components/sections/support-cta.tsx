import Link from "next/link";
import { Container } from "@/components/shared/container";
import { Section } from "@/components/shared/section";
import { Button } from "@/components/ui/button";
import {
  DonateButton,
  DonationStatusNote,
} from "@/components/shared/donate-button";
import { getHomeContent } from "@/content/home";
import { toRoute } from "@/lib/routes";
import { cn } from "@/lib/utils";

export type SupportCtaProps = {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  variant?: "default" | "primary" | "subtle";
  className?: string;
};

/**
 * Donation call to action.
 *
 * Two modes:
 * - With props: Used by program pages for custom CTAs.
 * - Without props (async): Used by homepage, reads from content layer.
 */
export async function SupportCta(props?: SupportCtaProps) {
  // If props are provided, use them (program pages)
  if (props?.title && props?.description && props?.primaryLabel && props?.primaryHref) {
    const { title, description, primaryLabel, primaryHref, secondaryLabel, secondaryHref, variant = "default", className } = props;

    const variants = {
      default: "bg-primary text-primary-foreground",
      primary: "bg-primary text-primary-foreground",
      subtle: "bg-secondary text-secondary-foreground border-y border-border",
    };

    return (
      <Section tone="subtle" className={cn(variants[variant], className)}>
        <Container className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-xl text-center sm:text-left">
            <h2 className="text-h3">{title}</h2>
            <p className="mt-2 text-lead opacity-90">{description}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center w-full sm:w-auto">
            <Button asChild variant={variant === "subtle" ? "outline" : "default"} size="lg" className="w-full sm:w-auto">
              <Link href={toRoute(primaryHref)}>{primaryLabel}</Link>
            </Button>
            {secondaryLabel && secondaryHref && (
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                <Link href={toRoute(secondaryHref)}>{secondaryLabel}</Link>
              </Button>
            )}
          </div>
        </Container>
      </Section>
    );
  }

  // Fallback: original homepage behaviour
  const { support } = await getHomeContent();

  return (
    <Section tone="subtle" className="bg-primary text-primary-foreground">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-14">
          <div className="lg:col-span-7">
            <p className="text-sm font-semibold tracking-wide text-primary-foreground/80 uppercase">
              {support.eyebrow}
            </p>
            <h2 className="mt-3 text-h1">{support.title}</h2>
            <p className="mt-4 max-w-2xl text-lead text-primary-foreground/85">
              {support.body}
            </p>
          </div>

          <div className="flex flex-col items-start gap-4 lg:col-span-5">
            <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center">
              <DonateButton size="lg" className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90 sm:w-auto">
                Donate
              </DonateButton>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                <Link href={toRoute(support.secondaryHref)}>
                  {support.secondaryLabel}
                </Link>
              </Button>
            </div>
            <DonationStatusNote className="text-primary-foreground/80" />
          </div>
        </div>
      </Container>
    </Section>
  );
}