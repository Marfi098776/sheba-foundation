import Link from "next/link";
import { toRoute } from "@/lib/routes";
import type { NavigationGroup } from "@/content/types";

export type FooterNavProps = {
  groups: NavigationGroup[];
};

/**
 * Footer link columns. Groups are derived from the single navigation list in
 * `src/content/site.ts`, so a route is never declared twice.
 *
 * A Server Component: unlike the header, the footer does not need to mark the
 * current page, so it ships no JavaScript.
 */
export function FooterNav({ groups }: FooterNavProps) {
  return (
    <nav aria-label="Footer" className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {groups.map((group) => (
        <div key={group.key}>
          <h2 className="text-sm font-semibold tracking-wide text-foreground uppercase">
            {group.title}
          </h2>
          <ul className="mt-4 flex flex-col gap-3">
            {group.items.map((item) => (
              <li key={item.href}>
                <Link
                  href={toRoute(item.href)}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground hover:underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
