import Link from "next/link";
import { Container } from "@/components/shared/container";
import { Section } from "@/components/shared/section";
import { DonateButton } from "@/components/shared/donate-button";
import { Button } from "@/components/ui/button";
import { getHomeContent } from "@/content/home";
import { toRoute } from "@/lib/routes";

/**
 * Closing call to action.
 *
 * Deliberately plain: three equal routes into the site, no urgency, no
 * emotional pressure, and no suggestion that any particular action produces a
 * particular outcome.
 */
export async function FinalCta() {
  const { final } = await getHomeContent();

  return (
    <Section tone="subtle">
      <Container>
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <h2 className="text-h1">{final.title}</h2>
          <p className="mt-4 max-w-2xl text-lead text-muted-foreground">
            {final.body}
          </p>

          <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href={toRoute("/volunteer")}>{final.volunteerLabel}</Link>
            </Button>
            <DonateButton size="lg" className="w-full sm:w-auto">
              {final.donateLabel}
            </DonateButton>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
            >
              <Link href={toRoute("/contact")}>{final.contactLabel}</Link>
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
