# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Inherits all rules from ~/.claude/CLAUDE.md. This file adds project context only.

## REPO
Path: ~/nightdrop-landing
Deploy: Netlify — auto-deploy on push to main via netlify.toml
Start: cd ~/nightdrop-landing && claude --dangerously-skip-permissions
Dev server: npm run dev (port 3456)

## PURPOSE
Landing page for Nightdrop, a CRE deal-feed product that runs nightly AI agents to surface distressed property deals matching investor buy boxes. The page drives waitlist signups and communicates the midnight run workflow, pricing, and methodology to commercial real estate operators.

## COMMANDS
```bash
npm run dev          # dev server on port 3456
npm run build        # production build (run before every commit)
npm run lint         # ESLint
npm run clean:dev    # wipe .next and restart dev (use when Next caches stale state)
npx tsc --noEmit     # type check (run before every commit)
```

## STACK
- Next.js 15 (App Router) + TypeScript
- Tailwind CSS + shadcn/ui (components.json) + Radix UI primitives directly
- framer-motion for scroll animations
- lucide-react icons
- No database — static landing page with waitlist modal
- Netlify deploy via `@netlify/plugin-nextjs`

## ARCHITECTURE

### Page structure (`app/page.tsx`)
Section order: Hero → DashboardPreview → VsOldWay → Bento → MidnightRun → Methodology → SampleDealBrief → LargeTestimonial → Pricing → TestimonialGrid → FAQ → CTA → Footer

Every section (except Hero/DashboardPreview which are in a special overlap layout) is wrapped in `<AnimatedSection>` — a client component that uses framer-motion's `whileInView` for scroll-fade-in. Pass `id=` to AnimatedSection when anchor links need to target that section.

### Global state: waitlist modal
`components/waitlist-context.tsx` provides `WaitlistProvider` + `useWaitlist()` hook (`open`, `openWaitlist`, `closeWaitlist`). The provider wraps the entire app in `app/layout.tsx` alongside `<WaitlistModal />`. Any component that needs to open the waitlist calls `useWaitlist().openWaitlist()` — no prop drilling.

### Waitlist API (`app/api/waitlist/route.ts`)
POST handler fires two requests in parallel:
1. Google Apps Script URL (hardcoded) → writes to a Google Sheet
2. `NIGHTDROP_API_URL/api/dealfeed/webhooks/waitlist` (optional, requires both `NIGHTDROP_API_URL` and `NIGHTDROP_WEBHOOK_SECRET` env vars) → notifies the backend

Only the Google Sheet response is checked for success; the Nightdrop webhook failure is silently swallowed.

### Required env vars
| Var | Where | Purpose |
|---|---|---|
| `NEXT_PUBLIC_APP_URL` | `.env.local` / Netlify | Dashboard app URL; throws at build if missing |
| `NIGHTDROP_API_URL` | Netlify only | Optional waitlist webhook target |
| `NIGHTDROP_WEBHOOK_SECRET` | Netlify only | Auth header for waitlist webhook |

`lib/config.ts` exports `APP_URL`, `LOGIN_URL`, `SIGNUP_URL` derived from `NEXT_PUBLIC_APP_URL`. It throws at module load if the var is missing — add to `.env.local` for local dev.

### Brand tokens (hardcoded, not Tailwind vars)
- Brand green: `#1DAF29` (buttons, accents, active states)
- Modal background: `#1E1E24`
- Input background: `#0D0D0D` with `rgba(255,255,255,0.08)` border

## KEY FILES
- `app/page.tsx` — section order; imports all section components
- `app/layout.tsx` — WaitlistProvider + WaitlistModal wrapping entire app; Geist fonts; metadata
- `components/hero-section.tsx` — hero copy, dual CTA, trial microcopy
- `components/pricing-section.tsx` — three-tier pricing, server component (no "use client", no useState)
- `components/waitlist-modal.tsx` — full waitlist form (Radix Dialog, multi-field, submits to `/api/waitlist`)
- `components/waitlist-context.tsx` — global open/close state for the modal
- `components/animated-section.tsx` — framer-motion scroll-animation wrapper; SSR-safe via mounted guard
- `components/footer-section.tsx` — has `[contact@placeholder]` and `[CALENDLY_URL_PLACEHOLDER]` — swap before launch
- `lib/config.ts` — derives dashboard URLs from `NEXT_PUBLIC_APP_URL`

## KNOWN LANDMINES
- `pricing-section.tsx` is a server component — do NOT add `"use client"` or useState
- `footer-section.tsx` has literal placeholder strings `[contact@placeholder]` and `[CALENDLY_URL_PLACEHOLDER]` — not yet replaced
- Dev port is 3456, not 3000
- `lib/config.ts` throws at startup if `NEXT_PUBLIC_APP_URL` is not set — always have `.env.local`
- Trial mechanics (card required, 24h warning, dashboard tooltip) exist only as landing copy — not wired in backend
- Bento section is intentionally untouched — do not refactor it

## PRE-COMMIT CHECKLIST
1. `npx tsc --noEmit` — must pass
2. `npm run build` — must pass
3. Visual QA in browser at port 3456
