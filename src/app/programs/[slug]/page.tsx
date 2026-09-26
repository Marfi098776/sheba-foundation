import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { ProgramDetail } from "@/components/sections/program-detail";
import { getProgram, getPrograms } from "@/content/programs";
import { toRoute } from "@/lib/routes";
import { generatePageMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  const programs = await getPrograms();
  return programs.map((program) => ({ slug: program.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/programs/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const program = await getProgram(slug);

  if (!program) {
    return { title: "Program not found" };
  }

  return generatePageMetadata({
    title: program.title,
    description: program.summary,
    pathname: `/programs/${slug}`,
    openGraph: {
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
    },
  });
}

export default async function ProgramPage({
  params,
}: PageProps<"/programs/[slug]">) {
  const { slug } = await params;
  const program = await getProgram(slug);

  if (!program) {
    notFound();
  }

  if (program.dedicatedRoute) {
    permanentRedirect(toRoute(program.dedicatedRoute));
  }

  return <ProgramDetail program={program} />;
}
