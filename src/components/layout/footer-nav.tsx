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
    <nav aria-label="Footer" className="contents">
      {groups.map((group) => (
        <div key={group.key} className="min-w-0">
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
