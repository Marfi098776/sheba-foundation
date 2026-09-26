"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavigationItem } from "@/content/types";
import { toRoute } from "@/lib/routes";
import { cn } from "@/lib/utils";

export type MainNavProps = {
  items: NavigationItem[];
  className?: string;
};

/**
 * Desktop primary navigation.
 *
 * A Client Component purely so the current destination can be marked with
 * `aria-current="page"`, which is the accessible way to orient a sighted or
 * screen-reader user within the site. The marginal cost is negligible because
 * the mobile menu already puts a client boundary in this layout.
 */
export function MainNav({ items, className }: MainNavProps) {
  const pathname = usePathname();

  return (
    <nav aria-label="Main" className={cn("hidden lg:block", className)}>
      <ul className="flex items-center gap-1">
        {items.map((item) => {
          const isCurrent =
            item.href === "/"
              ? pathname === "/"
              : pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <li key={item.href}>
              <Link
                href={toRoute(item.href)}
                aria-current={isCurrent ? "page" : undefined}
                className={cn(
                  "inline-block rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isCurrent
                    ? "text-primary underline underline-offset-[6px]"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
