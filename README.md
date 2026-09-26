# Canadian Sheba Foundation

**Serving Communities, Supporting Dreams, Creating Opportunities.**

Phase 1 is the initial **static, public-facing website**. It is built to be
professional, accessible, search-engine friendly, and fast — and structured so
that a database, CMS, and authentication can be added later without rewriting
the frontend.

> **Status: foundation only.** The design system, component primitives, and
> project structure are in place. The real pages, navigation, and organization
> content have not been built yet, and no official organization content or brand
> assets have been supplied. Everything organisation-specific is currently a
> clearly-marked placeholder.

---

## Technology stack

| Layer | Choice | Version |
| --- | --- | --- |
| Framework | Next.js (App Router) | 16.3.6 |
| UI runtime | React | 19.2.8 |
| Language | TypeScript (strict) | 5.9.3 |
| Styling | Tailwind CSS (CSS-first config) | 4.x |
| Components | shadcn/ui | 4.21.0 |
| Linting | ESLint (flat config) | 9.x |
| Hosting | Vercel | — |

Node.js 20.9 or newer is required.

---

## Development setup

```bash
npm install     # install dependencies
npm run dev     # start the dev server on http://localhost:3000
```

## Available scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build locally |
| `npm run lint` | Run ESLint across the project |
| `npm run typecheck` | Run `tsc --noEmit` for type errors |

Run `npm run lint`, `npm run typecheck`, and `npm run build` before opening a
pull request.

---

## Folder structure

```
src/
├── app/                  Routes. Keep route files thin.
│   ├── layout.tsx        Root layout: fonts, <main>, skip link
│   ├── page.tsx          Home route
│   ├── globals.css       Design tokens (Tailwind v4 CSS-first)
│   ├── not-found.tsx     404
│   └── error.tsx         Route error boundary
│
│   No root loading.tsx: a root Suspense boundary flushes its fallback before
│   notFound()/permanentRedirect() can set a status, which turns 404s and
│   redirects into HTTP 200 client-side fallbacks. Add per-route loading UI
│   instead if a route ever needs it.
│
├── components/
│   ├── ui/               shadcn/ui — CLI-owned, do not hand-edit
│   ├── layout/           Site chrome: header, nav, footer
│   ├── sections/         Composable page blocks: hero, grids, CTA
│   └── shared/           Framework-agnostic primitives
│
├── content/              Organization content, separate from UI
├── lib/                  Utilities, SEO helpers
└── types/                Cross-cutting app types

public/
├── images/               Photography, program and event imagery
├── icons/                Icons and brand assets
└── files/                Reports and downloadable documents (planned)
```

Component tiers depend in one direction only:
`ui/` → `shared/` → `sections/` → `layout/` → `app/`.

---

## Design system overview

Tailwind v4 is configured **CSS-first**. There is deliberately **no
`tailwind.config.js`** — all tokens live in `src/app/globals.css`.

**Provisional palette.** The Foundation has not supplied official brand
colours. The current deep teal, warm sand, and ochre palette is a neutral
placeholder chosen to read as trustworthy and human rather than generic.
Rebranding means editing the `:root` block in `globals.css` — no component
hardcodes a colour value.

**Typography.** Inter for body copy and Source Serif 4 for headings, both
loaded through `next/font` (self-hosted at build time, no external requests).
A fluid type scale is exposed as `text-display`, `text-h1` … `text-h4`, and
`text-lead`.

**Headings.** Tailwind's preflight flattens heading sizes, so `globals.css`
re-establishes `h1`–`h6` defaults in `@layer base`. Pages get a correct,
accessible hierarchy automatically and can still override individual headings
with utilities.

**Contrast.** All text/background pairs were verified against WCAG AA (4.5:1)
and non-text indicators against 3:1. `--input` is deliberately darker than
`--border`, because form-field outlines must clear 3:1 while decorative
dividers are exempt.

**Dark mode** is not enabled in Phase 1. The `.dark` token block is retained so
shadcn components keep working; the class is never applied.

**shadcn/ui components are generated code.** Add them with
`npx shadcn@latest add <name>` rather than hand-writing them, and avoid
editing `src/components/ui/*` by hand.

---

## Content architecture

Organization content is kept out of components and pages. `src/content/` will
hold typed data modules that export **async accessor functions**:

```ts
export async function getPrograms(): Promise<Program[]>
export async function getProgram(slug: string): Promise<Program | null>
```

They resolve local arrays today. In a later phase the function *bodies* can
query a database or CMS while every page and component keeps working
unchanged. Keep these signatures stable.

**Never invent organization facts.** Charity registration numbers, addresses,
phone numbers, board members, leadership biographies, founding dates, impact
statistics, financial figures, and testimonials are all real-world claims.
Until the client supplies them, represent the value as `null` and render an
honest "information to be confirmed" state. Never ship a plausible-looking
placeholder, and never emit invented values into structured data.

---

## Phase 1 exclusions

Deliberately **not** built, and not to be introduced without an explicit
request:

- Supabase, PostgreSQL, Prisma, or any database
- Authentication, login, or registration (Better Auth, NextAuth)
- Admin dashboard or CMS
- API routes or any backend
- Payment or donation processing (Stripe, webhooks, receipts, donor records)
- Scholarship application handling or document uploads
- Volunteer registration or management
- Server-side contact form processing
- i18n, locale routing, or French content
- Dark mode

The site requires **no environment variables** to build or deploy.

---

## Future Phase 2 overview

The planned next phase may add a database, authentication, an admin area, a
CMS, and application workflows. The migration boundary is `src/content/`:
only those modules change. Public components must never import a database
client — they consume the accessor functions only.

Note for that phase: Next.js 16 renamed `middleware.ts` to `proxy.ts`, and
`revalidateTag()` now requires a `cacheLife` profile argument.

---

## Deployment

Vercel, with no configuration: the platform detects Next.js automatically.
Every route in Phase 1 is statically prerendered.
