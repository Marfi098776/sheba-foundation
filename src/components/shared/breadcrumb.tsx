"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { toRoute } from "@/lib/routes";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export type BreadcrumbProps = {
  items: BreadcrumbItem[];
  className?: string;
};

/**
 * Accessible breadcrumb navigation. The last item is the current page and
 * receives `aria-current="page"`. All links use `toRoute` for typed routing.
 */
export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex items-center gap-1.5 text-sm text-muted-foreground", className)}
    >
      <ol className="flex items-center gap-1.5" role="list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const showSeparator = !isLast;

          return (
            <li key={item.label} className="flex items-center gap-1.5">
              {isLast ? (
                <span aria-current="page" className="text-foreground font-medium">
                  {item.label}
                </span>
              ) : item.href ? (
                <Link
                  href={toRoute(item.href)}
                  className="transition-colors hover:text-primary hover:underline"
                >
                  {item.label}
                </Link>
              ) : (
                <span>{item.label}</span>
              )}
              {showSeparator && (
                <ChevronRight
                  aria-hidden="true"
                  className="size-3.5 shrink-0 text-muted-foreground/60"
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}