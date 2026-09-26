import Link from "next/link";
import { cn } from "@/lib/utils";

export type LogoProps = {
  className?: string;
};

/**
 * Placeholder wordmark.
 *
 * The Foundation has not supplied an official logo, so this renders the
 * organization name as a two-line text lockup rather than inventing a mark. The
 * accessible name comes from the text itself, so no redundant ARIA is needed.
 *
 * To adopt the official asset, replace the two spans with an <Image> and keep
 * the wrapping <Link>. No call site needs to change.
 */
export function Logo({ className }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex flex-col rounded-sm font-heading leading-none font-bold tracking-[0.1em] text-foreground uppercase transition-colors hover:text-primary",
        className
      )}
    >
      <span className="text-[0.95rem]">Canadian</span>
      <span className="text-[0.95rem]">Sheba Foundation</span>
    </Link>
  );
}
