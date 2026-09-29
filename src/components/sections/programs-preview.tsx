import Link from "next/link";
import Image from "next/image";
import {
  GraduationCap,
  HandHeart,
  Landmark,
  Users,
  ArrowRight,
} from "lucide-react";
import { Container } from "@/components/shared/container";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { getHomeContent } from "@/content/home";
import { getPrograms } from "@/content/programs";
import type { Program, ProgramCategory } from "@/content/types";
import { toRoute } from "@/lib/routes";

const CATEGORY_ICONS: Record<ProgramCategory, typeof Users> = {
  "family-support": HandHeart,
  community: Users,
  volunteer: HandHeart,
  scholarships: GraduationCap,
  "newcomer-support": Landmark,
};

function programHref(program: Program): string {
  return program.dedicatedRoute ?? `/programs/${program.slug}`;
}

const STAGGER_DELAYS = [0, 80, 160, 240, 320];

export async function ProgramsPreview() {
  const [{ programs: copy }, programs] = await Promise.all([
    getHomeContent(),
    getPrograms(),
  ]);

  return (
    <Section className="relative overflow-hidden bg-gradient-to-br from-[#21164f] via-[#3b2375] to-[#65418f] py-20 text-white">
      {/* Decorative background pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(45deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "70px 70px",
        }}
      />

      {/* Decorative glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-20 size-96 rounded-full bg-purple-300/10 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-0 size-96 rounded-full bg-violet-300/10 blur-3xl"
      />

      <Container className="relative z-10">
        {/* Section heading */}
        <div className="[&_p]:text-white/75 [&_h2]:text-white">
          <SectionHeading
            eyebrow={copy.eyebrow}
            title={copy.title}
            description={copy.description}
          />
        </div>

        {/* Program cards */}
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((program, index) => {
            const Icon = CATEGORY_ICONS[program.category];
            const delay = STAGGER_DELAYS[index % STAGGER_DELAYS.length];

            return (
              <ScrollReveal key={program.slug} delay={delay}>
                <li className="h-full">
                  <div
                    className="
    group relative h-[420px] overflow-hidden rounded-2xl
    shadow-lg
    transition-all duration-500
    hover:-translate-y-2 hover:shadow-2xl
  "
                  >
                    {/* Full background image */}
                    <Image
                      src={program.image}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="
      object-cover
      transition-transform duration-700
      group-hover:scale-110
    "
                    />

                    {/* Dark gradient overlay */}
                    <div
                      aria-hidden="true"
                      className="
      absolute inset-0
      bg-gradient-to-t
      from-black/85
      via-black/45
      to-black/10
    "
                    />

                    {/* Purple hover overlay */}
                    <div
                      aria-hidden="true"
                      className="
      absolute inset-0
      bg-gradient-to-t
      from-[#21164f]/70
      via-[#3b2375]/20
      to-transparent
      opacity-0
      transition-opacity duration-500
      group-hover:opacity-100
    "
                    />

                    {/* Content */}
                    <div className="absolute inset-x-0 bottom-0 z-10 p-6 text-white">
                      {/* Icon */}
                      <div
                        className="
        mb-5 flex size-14 items-center justify-center
        rounded-2xl
        bg-white/15
        backdrop-blur-md
        ring-1 ring-white/25
        transition-transform duration-300
        group-hover:scale-110
      "
                      >
                        <Icon
                          aria-hidden="true"
                          className="size-7 text-white"
                          strokeWidth={1.75}
                        />
                      </div>

                      {/* Status */}
                      {program.status === "pending-details" ? (
                        <Badge
                          variant="secondary"
                          className="mb-3 border-white/20 bg-white/15 text-white backdrop-blur-sm"
                        >
                          Details to be confirmed
                        </Badge>
                      ) : null}

                      {/* Title */}
                      <h3
                        className="
        font-heading text-2xl font-semibold
        leading-tight
        drop-shadow-md
      "
                      >
                        {program.title}
                      </h3>

                      {/* Subtitle */}
                      <p
                        className="
        mt-3 max-w-md
        text-sm leading-relaxed
        text-white/80
      "
                      >
                        {program.summary}
                      </p>

                      {/* Learn More */}
                      <Link
                        href={toRoute(programHref(program))}
                        className="
        mt-5 inline-flex items-center gap-2
        text-sm font-semibold text-white
        transition-all duration-300
        hover:text-white/80
      "
                      >
                        Learn More

                        <ArrowRight
                          aria-hidden="true"
                          className="
          size-4
          transition-transform duration-300
          group-hover:translate-x-1
        "
                        />
                      </Link>
                    </div>
                  </div>
                </li>
              </ScrollReveal>
            );
          })}
        </ul>

        {/* Main CTA */}
        <div className="mt-12 flex justify-center">
          <Button
            asChild
            size="lg"
            className="
              border border-white/20
              bg-white
              px-7
              text-[#2b1b61]
              shadow-lg
              transition-all
              duration-300
              hover:-translate-y-1
              hover:bg-white
              hover:shadow-xl
            "
          >
            <Link href={toRoute(copy.ctaHref)}>
              {copy.ctaLabel}
              <ArrowRight
                aria-hidden="true"
                className="ml-2 size-4"
              />
            </Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}