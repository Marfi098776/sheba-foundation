import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getSiteContent } from "@/content/site";
import { toRoute } from "@/lib/routes";
import { cn } from "@/lib/utils";

export type DonateButtonProps = {
  size?: "sm" | "default" | "lg";
  className?: string;
  children?: React.ReactNode;
};

/**
 * The site's single donation call to action.
 *
 * Phase 1 does not process payments. `DonationInfo.status` decides the target:
 *
 * - "confirmed" — links straight to the external donation platform.
 * - "pending"    — links to /donate, the page that explains how to give. No
 *                  placeholder is ever rendered as if it were a live donation
 *                  link, and nothing collects card details.
 *
 * This is an async Server Component because it reads the content layer
 * directly, which keeps it reusable with no prop plumbing. It therefore cannot
 * be rendered inside a Client Component; pass an explicit href where one is
 * already known.
 */
export async function DonateButton({
  size = "default",
  className,
  children = "Donate",
}: DonateButtonProps) {
  const { donation } = await getSiteContent();
  const isExternal = donation.status === "confirmed" && donation.url !== null;
  const href = isExternal ? (donation.url as string) : "/donate";

  if (isExternal) {
    return (
      <Button asChild size={size} className={className}>
        <Link
          href={toRoute(href)}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
          <span className="sr-only">
            {" "}
            (opens the donation platform in a new tab)
          </span>
        </Link>
      </Button>
    );
  }

  return (
    <Button asChild size={size} className={className}>
      <Link href={toRoute(href)}>{children}</Link>
    </Button>
  );
}

/**
 * Read-only status line for the /donate page. Says plainly that the external
 * platform has not been confirmed yet instead of showing a dead button.
 */
export async function DonationStatusNote({ className }: { className?: string }) {
  const { donation } = await getSiteContent();

  if (donation.status === "confirmed") {
    return (
      <p className={cn("text-sm text-muted-foreground", className)}>
        Donations are processed securely by {donation.platform}. The Foundation
        does not collect payment details on this website.
      </p>
    );
  }

  return (
    <p className={cn("text-sm text-muted-foreground", className)}>
      The Foundation intends to accept donations through an established external
      donation platform. That platform has not yet been confirmed, so no
      donation link is shown here. This website does not process payments.
    </p>
  );
}
