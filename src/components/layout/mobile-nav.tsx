"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { NavigationItem } from "@/content/types";
import { toRoute } from "@/lib/routes";

export type MobileNavProps = {
  items: NavigationItem[];
};

const TRIGGER_LABEL = "Open main menu";

/**
 * Mobile navigation.
 *
 * Built on the shadcn `Sheet`, which wraps Radix Dialog. That supplies the parts
 * that are easy to get wrong by hand: a focus trap, focus restoration to the
 * trigger on close, Escape to dismiss, accessible labelling via `aria-modal`,
 * and a lock on background scrolling while the panel is open.
 */
export function MobileNav({ items }: MobileNavProps) {
  const pathname = usePathname();

  // Remounting on route change resets the open state, so a browser back or
  // forward navigation can never leave the panel hanging open. Keying by
  // pathname is preferable to an effect that calls setState, which forces an
  // extra render pass on every navigation.
  return <MobileNavPanel key={pathname} items={items} />;
}

function MobileNavPanel({ items }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon-lg"
          className="lg:hidden"
          aria-label={TRIGGER_LABEL}
          aria-expanded={open}
        >
          <MenuIcon />
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-full max-w-sm overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="font-heading text-base">Menu</SheetTitle>
        </SheetHeader>

        <nav aria-label="Mobile" className="mt-2">
          <ul className="flex flex-col gap-1 pb-8">
            {items.map((item) => {
              const isCurrent =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href ||
                    pathname.startsWith(`${item.href}/`);

              return (
                <li key={item.href}>
                  <Link
                    href={toRoute(item.href)}
                    onClick={() => setOpen(false)}
                    aria-current={isCurrent ? "page" : undefined}
                    className={`block rounded-md px-3 py-2.5 text-base font-medium transition-colors ${
                      isCurrent
                        ? "bg-secondary text-primary"
                        : "text-foreground hover:bg-muted"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

function MenuIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className="size-5"
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}
