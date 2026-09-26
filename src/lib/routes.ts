import type { Route } from "next";

/**
 * Narrows a data-driven href to Next.js's typed-route union.
 *
 * `typedRoutes` is on so that a hand-written typo like `/abuot` fails the build.
 * The content layer is deliberately framework-agnostic, though, so navigation
 * and program hrefs are plain `string`s that TypeScript cannot verify. This
 * helper is the single place that gap is bridged, rather than scattering casts
 * through every component.
 */
export function toRoute(href: string): Route {
  return href as Route;
}
