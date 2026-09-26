import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/shared/container";
import { Section } from "@/components/shared/section";
import { DonateButton } from "@/components/shared/donate-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getHomeContent } from "@/content/home";
import { getPrograms } from "@/content/programs";
import { getSiteContent } from "@/content/site";
import type { HomeContent } from "@/content/types";
import { toRoute } from "@/lib/routes";

type HeroImage = HomeContent["heroImage"];

/**
 * Decorative artwork for the hero's image slot.
 *
 * Purely ornamental: `aria-hidden`, and it never carries meaning. It exists so
 * the slot reads as an intentional design element rather than an empty box, and
 * it disappears as soon as a real photograph is supplied.
 */
function HeroPlaceholderArtwork() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 400 500"
      preserveAspectRatio="xMidYMid slice"
      className="size-full text-primary/20"
    >
      <g fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="200" cy="215" r="70" />
        <circle cx="200" cy="215" r="115" />
        <circle cx="200" cy="215" r="160" />
      </g>
      <g fill="currentColor">
        <circle cx="200" cy="145" r="9" />
        <circle cx="270" cy="215" r="9" />
        <circle cx="200" cy="285" r="9" />
        <circle cx="130" cy="215" r="9" />
      </g>
    </svg>
  );
}

/**
 * Hero image slot.
 *
 * Renders a real photograph as soon as one exists in the content layer. Until
 * then it shows a clearly-labelled placeholder — never a stock photo presented
 * as Foundation activity. Setting `heroImage.src` and `heroImage.alt` in
 * `src/content/home.ts` is the only change needed to swap it in; the frame, its
 * aspect ratios, and the layout around it stay exactly as they are.
 */
function HeroVisual({ heroImage }: { heroImage: HeroImage }) {
  const hasPhoto = Boolean(heroImage.src && heroImage.alt);

  return (
    <div>
      <div className="relative aspect-4/5 overflow-hidden rounded-xl border border-border bg-card sm:aspect-16/11 lg:aspect-4/5">
        {hasPhoto ? (
          <Image
            src={heroImage.src as string}
            alt={heroImage.alt as string}
            fill
            priority
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        ) : (
          <>
            <HeroPlaceholderArtwork />
            <div className="absolute inset-x-0 bottom-0 p-4">
              <Badge variant="secondary">{heroImage.pendingLabel}</Badge>
            </div>
          </>
        )}
      </div>
      {hasPhoto ? null : (
        <p className="mt-3 text-xs text-muted-foreground">
          {heroImage.pendingNote}
        </p>
      )}
    </div>
  );
}

/**
 * Homepage hero: the site's single `h1`, the Foundation's main message, and the
 * two primary calls to action.
 */
export async function Hero() {
  const [{ hero, heroImage }, { tagline }, programs] = await Promise.all([
    getHomeContent(),
    getSiteContent(),
    getPrograms(),
  ]);

  return (
    <Section tone="subtle" size="tall">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <p className="text-sm font-semibold tracking-wide text-primary uppercase">
              {hero.eyebrow}
            </p>

            {/*
              The tagline is 58 characters, so the display scale's 2.25rem floor
              wraps to six lines on a 320px screen. Stepping down to text-3xl
              below the sm breakpoint keeps it to three or four lines without
              weakening the hero on larger screens.
            */}
            <h1 className="mt-4 text-3xl sm:text-display">{tagline}</h1>

            <p className="mt-6 max-w-2xl text-lead text-muted-foreground">
              {hero.supportingText}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <DonateButton size="lg" className="w-full sm:w-auto">
                Support Our Work
              </DonateButton>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
              >
                <Link href={toRoute("/programs")}>Explore Our Programs</Link>
              </Button>
            </div>

            <div className="mt-10 border-t border-border pt-6">
              <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                Program areas
              </p>
              <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
                {programs.map((program) => (
                  <li
                    key={program.slug}
                    className="after:ml-5 after:text-border after:content-['·'] last:after:content-none"
                  >
                    {program.title}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-5">
            <HeroVisual heroImage={heroImage} />
          </div>
        </div>
      </Container>
    </Section>
  );
}
