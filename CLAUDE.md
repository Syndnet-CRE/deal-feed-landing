# nightdrop-landing
Inherits all rules from ~/.claude/CLAUDE.md. This file adds project context only.

## REPO
Path: ~/nightdrop-landing
Deploy: Netlify — auto-deploy on push to main via netlify.toml
Start: cd ~/nightdrop-landing && claude --dangerously-skip-permissions
Dev server: npm run dev (port 3456)

## PURPOSE
Landing page for Nightdrop, a CRE deal-feed product that runs nightly AI agents to surface distressed property deals matching investor buy boxes. The page drives waitlist signups and communicates the midnight run workflow, pricing, and methodology to commercial real estate operators.

## STACK
- Next.js (App Router) + TypeScript
- Tailwind CSS + shadcn/ui (components.json) + Radix UI
- lucide-react icons
- No database — static landing page with waitlist modal
- Netlify deploy

## KEY FILES
- app/page.tsx — page section order, imports all section components
- components/hero-section.tsx — hero copy, CTAs, dual-button layout
- components/pricing-section.tsx — three-tier pricing, trial copy (server component, no use client)
- components/waitlist-modal.tsx — waitlist signup modal (has current tools + monthly spend fields)
- components/faq-section.tsx — 9 FAQ questions
- components/cta-section.tsx — bottom CTA section
- components/footer-section.tsx — footer with mailto and Calendly placeholders

## NEW SECTIONS (feat/landing-redesign-v2 branch)
- components/vs-old-way-section.tsx — 7-row comparison grid vs VA/PropStream/BatchLeads
- components/midnight-run-section.tsx — vertical 5-step timeline (11:59 PM to 6:00 AM)
- components/methodology-section.tsx — 4 distress signal tiles with icons
- components/sample-deal-brief-section.tsx — anonymized deal brief (4711 Ridgeline Dr)

## KNOWN LANDMINES
- pricing-section.tsx is a server component — do NOT add "use client" or useState
- footer-section.tsx has placeholder strings: [contact@placeholder] and [CALENDLY_URL_PLACEHOLDER] — swap before launch
- Dev port is 3456, not 3000
- Trial mechanics (card required, 24h warning, dashboard tooltip) exist only as landing copy — not wired in backend yet

## SPEC DOCUMENTS
- Waitlist modal: captures current tools + monthly spend at signup
- Trial: 3-day free trial, card required, Starter = 3 boxes/15 deals, Operator = 5 boxes/75 deals

## SESSION RULES
- Feature branch: feat/landing-redesign-v2 (on origin, not yet merged to main)
- Brady reviews locally before opening PR
- Run npx tsc --noEmit before every commit
- Run npm run build before every commit
- Visual QA in browser at port 3456 before reporting complete
