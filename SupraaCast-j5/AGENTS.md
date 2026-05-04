# AGENTS.md

## Essential Guidance

- This is a Next.js app using the app router (`/app/`). Main entrypoints: `app/layout.tsx`, `app/page.tsx`.
- User authentication and roles use Supabase; custom client logic is in `lib/auth-context.tsx`.

## Developer Commands

- Start dev server: `pnpm dev`
- Build: `pnpm build`
- Start production: `pnpm start`
- Lint: `pnpm lint`
- No explicit typecheck (`next.config.mjs` ignores build errors, so check manually with `tsc` if needed).

## Style & Infra

- Styling: Tailwind; configured via `postcss.config.mjs`.
- No custom image optimization: `images.unoptimized` is set.
- No pre-commit/CI/task runner detected in this workspace.

## Caution

- When making changes to roles or auth, update checks in **both** middleware and client (`auth-context.tsx`) for consistency.

---

# Open Questions:

- Are there any other "privileged" routes not covered by the default middleware? (Check for new routes as the app grows.)
