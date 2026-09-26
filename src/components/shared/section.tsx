import { cn } from "@/lib/utils";

const tones = {
  default: "",
  muted: "bg-muted",
  subtle: "bg-secondary",
} as const;

const sizes = {
  compact: "py-10 sm:py-12",
  default: "py-16 sm:py-20 lg:py-24",
  tall: "py-20 sm:py-28 lg:py-32",
} as const;

export type SectionProps = React.ComponentProps<"section"> & {
  tone?: keyof typeof tones;
  size?: keyof typeof sizes;
};

/**
 * Vertical rhythm and surface tone for a page block. An unnamed <section> is not
 * exposed as a landmark, so these can be used freely without polluting the
 * accessibility tree.
 */
export function Section({
  className,
  tone = "default",
  size = "default",
  ...props
}: SectionProps) {
  return (
    <section className={cn(tones[tone], sizes[size], className)} {...props} />
  );
}
