import { cn } from "@/lib/utils";

export type SkipLinkProps = React.ComponentProps<"a">;

/**
 * Visually hidden until focused, then pinned to the top-left of the viewport.
 * Targets the <main id="main-content"> landmark rendered by the root layout.
 */
export function SkipLink({ className, children, ...props }: SkipLinkProps) {
  return (
    <a
      href="#main-content"
      className={cn(
        "sr-only rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground",
        "focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50",
        className
      )}
      {...props}
    >
      {children ?? "Skip to main content"}
    </a>
  );
}
