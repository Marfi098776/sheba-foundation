import { DonateButton, DonationStatusNote } from "@/components/shared/donate-button";
import { getSiteContent } from "@/content/site";

export type DonateCtaProps = {
  size?: "sm" | "default" | "lg";
  className?: string;
};

/**
 * Donation call to action for the /donate page.
 *
 * Shows a working outbound button only once the client has confirmed the
 * external platform. Until then it states the position plainly instead of
 * rendering a link that cannot work.
 */
export async function DonateCta({ size = "lg", className }: DonateCtaProps) {
  const { donation } = await getSiteContent();
  const isReady = donation.status === "confirmed" && donation.url !== null;

  if (!isReady) {
    return <DonationStatusNote className={className} />;
  }

  return (
    <div className={`flex flex-col items-start gap-3 ${className ?? ""}`}>
      <DonateButton size={size}>Donate securely</DonateButton>
      <DonationStatusNote />
    </div>
  );
}
