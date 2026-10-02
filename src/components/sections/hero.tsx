import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/shared/container";
import { Section } from "@/components/shared/section";
import { DonateButton } from "@/components/shared/donate-button";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { getHomeContent } from "@/content/home";
import { getPrograms } from "@/content/programs";
import { getSiteContent } from "@/content/site";
import { toRoute } from "@/lib/routes";

/**
 * Homepage hero with:
 * - Full background image
 * - Existing left-side hero content
 * - Video panel on the right
 * - ScrollReveal animation for the video
 */
export async function Hero() {
  const [{ hero, heroImage }, { tagline }, programs] = await Promise.all([
    getHomeContent(),
    getSiteContent(),
    getPrograms(),
  ]);

  const hasPhoto = Boolean(heroImage.src && heroImage.alt);

  return (
    <Section size="tall" className="relative isolate overflow-hidden">
      {/* ===== BACKGROUND IMAGE ====================== */}
      {hasPhoto ? (
        <Image src="/images/hero.jpeg" alt="Hero background" fill priority sizes="100vw" className="object-cover object-center"
        />
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-primary"
        />
      )}

      {/* ================================================================
          DARK / BRAND OVERLAY
          ================================================================ */}
      <div
        aria-hidden="true"
        className="
          absolute inset-0
          bg-gradient-to-l
          from-[#21164f]/95
          via-[#21164f]/75
          to-[#21164f]/35
        "
      />

      {/* Additional subtle bottom gradient */}
      <div
        aria-hidden="true"
        className="
          absolute inset-x-0 bottom-0 h-40
          bg-gradient-to-t
          from-black/25
          to-transparent
        "
      />

      {/* ================================================================
          CONTENT
          ================================================================ */}
      <Container className="relative z-10">
        <div
          className="
            grid
            min-h-[650px]
            items-center
            gap-12
            py-20
            lg:min-h-[720px]
            lg:grid-cols-12
            lg:gap-10
          "
        >
          {/* ============================================================
              LEFT SIDE — EXISTING HERO CONTENT
          ============================================================ */}
          <div className="lg:col-span-7">
            {/* Eyebrow */}
            <p
              className="
                text-sm
                font-semibold
                tracking-[0.18em]
                text-white/90
                uppercase
              "
            >
              {hero.eyebrow}
            </p>

            {/* Main heading */}
            <h1
              className="
                mt-5
                max-w-3xl
                font-heading
                text-4xl
                font-semibold
                leading-[1.1]
                tracking-tight
                text-white
                sm:text-5xl
                lg:text-6xl
              "
            >
              {tagline}
            </h1>

            {/* Supporting text */}
            <p
              className="
                mt-7
                max-w-2xl
                text-lg
                leading-relaxed
                text-white/85
                sm:text-xl
              "
            >
              {hero.supportingText}
            </p>

            {/* CTA buttons */}
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <DonateButton
                size="lg"
                className="
                  w-full
                  border border-white/20
                  bg-white
                  text-[#21164f]
                  shadow-lg
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-white
                  hover:shadow-xl
                  sm:w-auto
                "
              >
                Support Our Work
              </DonateButton>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="
                  w-full
                  border-white/40
                  bg-white/10
                  text-white
                  backdrop-blur-sm
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-white
                  hover:bg-white
                  hover:text-[#21164f]
                  sm:w-auto
                "
              >
                <Link href={toRoute("/programs")}>
                  Explore Our Programs
                </Link>
              </Button>
            </div>

            {/* Program areas */}
            <div
              className="
                mt-10
                max-w-3xl
                border-t
                border-white/20
                pt-6
              "
            >
              <p
                className="
                  text-xs
                  font-semibold
                  tracking-[0.15em]
                  text-white/70
                  uppercase
                "
              >
                Program areas
              </p>

              <ul
                className="
                  mt-3
                  flex
                  flex-wrap
                  gap-x-5
                  gap-y-2
                  text-sm
                  text-white/75
                "
              >
                {programs.map((program) => (
                  <li
                    key={program.slug}
                    className="
                      after:ml-5
                      after:text-white/30
                      after:content-['·']
                      last:after:content-none
                    "
                  >
                    {program.title}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ============================================================
              RIGHT SIDE — VIDEO
          ============================================================ */}
          <div className="lg:col-span-5">
            <ScrollReveal delay={160}>
              <div className="relative mx-auto w-full max-w-[360px]">

                {/* Shadow behind the video */}
                <div
                  aria-hidden="true"
                  className="
          absolute
          inset-4
          rounded-[2rem]
          bg-[#21164f]/60
          blur-2xl
          scale-105
        "
                />

                {/* Video */}
                <div
                  className="
          relative
          aspect-[9/16]
          overflow-hidden
          rounded-2xl
          shadow-2xl
          transition-all
          duration-500
          hover:-translate-y-1
          hover:shadow-[0_25px_60px_rgba(0,0,0,0.35)]
        "
                >
                  <video
                    className="block h-full w-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    controls
                    preload="metadata"
                    aria-label="Canadian Sheba Foundation introduction"
                  >
                    <source
                      src="/videos/cad2.mp4"
                      type="video/mp4"
                    />

                    Your browser does not support the video element.
                  </video>

                  {/* Subtle video overlay */}
                  <div
                    aria-hidden="true"
                    className="
            pointer-events-none
            absolute
            inset-0
            bg-gradient-to-t
            from-black/20
            via-transparent
            to-white/5
          "
                  />
                </div>

              </div>
            </ScrollReveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}