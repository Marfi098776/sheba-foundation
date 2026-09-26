import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type PendingInformationProps = {
  status: "active" | "pending-details";
  programTitle?: string;
  className?: string;
};

/**
 * Standardised status indicator for program pages.
 * Shows a badge and explanatory text based on the program's status.
 */
export function PendingInformation({ status, programTitle, className }: PendingInformationProps) {
  if (status === "active") {
    return null;
  }

  return (
    <div className={cn("flex flex-col gap-2 sm:flex-row sm:items-center", className)}>
      <Badge variant="secondary">Details to be confirmed</Badge>
      <p className="text-sm text-muted-foreground">
        {programTitle
          ? `Official details for ${programTitle} — including eligibility, application processes, and specific services — have not yet been published by the Foundation. This page will be updated when information is confirmed.`
          : "Official details for this program — including eligibility, application processes, and specific services — have not yet been published by the Foundation. This page will be updated when information is confirmed."}
      </p>
    </div>
  );
}