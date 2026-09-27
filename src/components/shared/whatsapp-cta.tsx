"use client";

import { Button } from "@/components/ui/button";
import { MessageCircle, ExternalLink } from "lucide-react";
import { buildWhatsAppUrl, isWhatsAppConfigured, WhatsAppConfig } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

interface WhatsAppButtonProps {
  config: WhatsAppConfig;
  variant?: "default" | "outline" | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  children?: React.ReactNode;
}

/**
 * A button that opens a WhatsApp chat with the configured number.
 * Renders as a disabled button with a pending message if not configured.
 */
export function WhatsAppButton({
  config,
  variant = "default",
  size = "default",
  className,
  children,
}: WhatsAppButtonProps) {
  const url = buildWhatsAppUrl(config);
  const configured = isWhatsAppConfigured(config);

  if (!configured) {
    return (
      <Button
        variant={variant}
        size={size}
        className={cn("opacity-50 cursor-not-allowed", className)}
        disabled
        aria-disabled={true}
      >
        <MessageCircle className="size-4 mr-2" aria-hidden="true" />
        {children || "WhatsApp (pending)"}
      </Button>
    );
  }

  return (
    <a
      href={url!}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(className)}
    >
      <Button
        variant={variant}
        size={size}
        asChild
      >
        <MessageCircle className="size-4 mr-2" aria-hidden="true" />
        {children || "Message us on WhatsApp"}
        <ExternalLink className="size-4 ml-2" aria-hidden="true" />
      </Button>
    </a>
  );
}

interface WhatsAppCTAProps {
  config: WhatsAppConfig;
  title?: string;
  description?: string;
  variant?: "default" | "card";
  className?: string;
}

/**
 * A call-to-action section for WhatsApp communication.
 * Shows a pending state if not configured.
 */
export function WhatsAppCTA({
  config,
  title = "Connect on WhatsApp",
  description = "Send us a message directly on WhatsApp for a quick response.",
  variant = "card",
  className,
}: WhatsAppCTAProps) {
  const configured = isWhatsAppConfigured(config);

  if (variant === "card") {
    return (
      <div
        className={cn(
          "rounded-xl border p-6 transition-colors",
          configured
            ? "border-border bg-card hover:border-primary/50"
            : "border-border bg-muted/50",
          className
        )}
      >
        <div className="flex items-start gap-4">
          <div
            className={cn(
              "size-12 shrink-0 rounded-lg flex items-center justify-center",
              configured ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
            )}
            aria-hidden="true"
          >
            <MessageCircle className="size-6" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-lg">{title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
            {configured && (
              <div className="mt-4">
                <WhatsAppButton config={config} size="lg" />
              </div>
            )}
            {!configured && (
              <p className="mt-4 text-sm text-muted-foreground">
                WhatsApp contact is not yet configured. Please check back later.
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Default inline variant
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <div
        className={cn(
          "size-10 shrink-0 rounded-lg flex items-center justify-center",
          configured ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
        )}
        aria-hidden="true"
      >
        <MessageCircle className="size-5" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-medium">{title}</h3>
        <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
      </div>
      {configured && <WhatsAppButton config={config} />}
      {!configured && (
        <Button variant="outline" disabled className="opacity-50">
          WhatsApp (pending)
        </Button>
      )}
    </div>
  );
}