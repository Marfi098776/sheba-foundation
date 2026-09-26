"use client";

import { useEffect } from "react";
import { Container } from "@/components/shared/container";
import { Section } from "@/components/shared/section";
import { Button } from "@/components/ui/button";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Section>
      <Container className="flex flex-col items-start gap-4">
        <p className="text-sm font-semibold tracking-wide text-destructive uppercase">
          Error
        </p>
        <h1>Something went wrong</h1>
        <p className="max-w-2xl text-muted-foreground">
          An unexpected error occurred while loading this page. Please try
          again.
        </p>
        <Button onClick={reset} className="mt-2">
          Try again
        </Button>
      </Container>
    </Section>
  );
}
