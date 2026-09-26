import { Container } from "@/components/shared/container";
import { Section } from "@/components/shared/section";
import { cn } from "@/lib/utils";

export type InformationNoticeProps = {
  title?: string;
  description: string;
  variant?: "info" | "warning" | "pending";
  className?: string;
};

/**
 * Standardised notice block for pending, missing, or upcoming information.
 * Used consistently across program pages so visitors recognise the pattern.
 */
export function InformationNotice({
  title,
  description,
  variant = "pending",
  className,
}: InformationNoticeProps) {
  const variants = {
    info: "bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-100",
    warning: "bg-amber-50 border-amber-200 text-amber-900 dark:bg-amber-900/20 dark:border-amber-800 dark:text-amber-100",
    pending: "bg-muted border-border text-muted-foreground",
  };

  const icons = {
    info: (
      <svg className="size-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4" />
        <path d="M12 8h.01" />
      </svg>
    ),
    warning: (
      <svg className="size-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <path d="M12 9v4" />
        <path d="M12 17h.01" />
      </svg>
    ),
    pending: (
      <svg className="size-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  };

  return (
    <Section tone="subtle" className={cn("border-y border-border", className)}>
      <Container>
        <div className={cn("flex gap-3 p-4 rounded-lg border", variants[variant])} role="status" aria-live="polite">
          <span aria-hidden="true">{icons[variant]}</span>
          <div className="flex-1">
            {title && <h3 className="font-medium text-sm">{title}</h3>}
            <p className={cn("mt-1 text-sm", title && "mt-2")}>{description}</p>
          </div>
        </div>
      </Container>
    </Section>
  );
}