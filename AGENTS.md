<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Canadian Sheba Foundation — Development Rules

Static public website for the Canadian Sheba Foundation. Phase 1 only.

## Project rules

1. **TypeScript strict mode is required.** `strict: true` is already set in
   `tsconfig.json`. Do not weaken it, and do not introduce `any` to silence an
   error.
2. **Server Components by default.** Add `"use client"` only when a component
   genuinely needs state, effects, or browser APIs.
3. **`"use client"` is a last resort.** Never mark a whole page as a client
   component. Keep route files thin: fetch content, compose components, define
   metadata.
4. **No database in Phase 1.** No Supabase, PostgreSQL, Prisma, or any
   persistence layer.
5. **No authentication in Phase 1.** No login, registration, sessions, or auth
   libraries.
6. **No admin dashboard or CMS in Phase 1.** Do not scaffold one, and do not
   create a fake version of one.
7. **No payment processing in Phase 1.** No Stripe, no card handling, no
   webhooks, no receipts, no donor records. Donations are handled by an external
   platform reached by link.
8. **Never invent organization facts.** This is a real nonprofit. Do not
   fabricate a charity registration number, legal name, address, phone number,
   email address, board members, leadership names, biographies, founding date,
   impact statistics, financial figures, partnerships, awards, testimonials,
   or government affiliations. Represent unconfirmed information as `null` and
   render an honest "to be confirmed" state. This applies to JSON-LD structured
   data as well as visible copy.
9. **Keep content separate from UI.** Organization content belongs in
   `src/content/` as typed data, never as large blocks of copy inside pages or
   components. Content files contain data and types only — no JSX.
10. **Prefer reusable components.** Extract to `shared/`, `sections/`, or
    `layout/` rather than duplicating markup. Do not create speculative
    components that nothing uses yet.
11. **Prioritize accessibility.** Semantic HTML first, ARIA only when native
    elements are insufficient. Maintain heading hierarchy, visible focus
    states, alt text, keyboard operability, and sufficient contrast.
12. **Prioritize SEO.** Every page needs a unique title and meta description,
    correct heading structure, and clean internal linking. No keyword stuffing,
    no duplicate or doorway pages.
13. **Avoid unnecessary dependencies.** Do not add a package unless the task
    genuinely requires it. No state-management, form, animation, or i18n
    libraries in Phase 1.
14. **Do not modify shadcn-generated components in `src/components/ui/`**
    unnecessarily. Add or update them through the shadcn CLI
    (`npx shadcn@latest add <component>`) so upstream changes stay mergeable.

## Additional conventions

- **Content accessors must stay `async`** and keep stable signatures. Phase 2
  replaces their bodies with database queries; callers must not need changes.
- **The root layout owns `<main id="main-content">`.** Pages must not add their
  own `<main>` element.
- **No hardcoded colours.** Use design tokens (`bg-primary`, `text-muted-foreground`,
  etc.). Brand values live only in the `:root` block of `src/app/globals.css`.
- **Tailwind v4 is CSS-first.** Do not create a `tailwind.config.js`.
- **No environment variables** are required. Do not introduce any.
- **No `middleware.ts`.** Next.js 16 uses `proxy.ts`, and Phase 1 needs neither.
- Verify work with `npm run lint`, `npm run typecheck`, and `npm run build`.
