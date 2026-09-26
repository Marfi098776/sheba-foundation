import Link from "next/link";
import { Container } from "@/components/shared/container";
import { Section } from "@/components/shared/section";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <Section>
      <Container className="flex flex-col items-start gap-4">
        <p className="text-sm font-semibold tracking-wide text-primary uppercase">
          Error 404
        </p>
        <h1>Page not found</h1>
        <p className="max-w-2xl text-muted-foreground">
          The page you are looking for does not exist, or it may have been
          moved.
        </p>
        <Link
          href="/"
          className={cn(buttonVariants(), "mt-2")}
        >
          Return to the homepage
        </Link>
      </Container>
    </Section>
  );
}
