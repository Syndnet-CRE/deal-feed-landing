HANDOFF
Date: 2026-05-09
Repo: nightdrop-landing (deal-feed-landing/landing_page_audit)
Session objective: Landing page v2 redesign — copy rewrite + four new sections
Status: COMPLETE

Branch: feat/landing-redesign-v2 (pushed to origin)
PR URL: https://github.com/Syndnet-CRE/nightdrop-landing/pull/new/feat/landing-redesign-v2

What was done:

Tranche 1 — copy rewrites (commit 59b24fb)
- components/hero-section.tsx:441-481 — new eyebrow ("We run agents every night · Nationwide"), headline ("Automate your acquisition pipeline."), 2-line subhead, dual CTA (primary "Submit your buy box before midnight →" + secondary "See how it works" anchored to #features-section), trial microcopy "3-day free trial · Card required · Cancel anytime"
- components/pricing-section.tsx — full rewrite. Dropped useState/annual toggle. Made server component (removed "use client"). Three tiers: Starter $149 (1 box, +$50/mo add'l), Operator $249 popular (5 boxes, 25 deals), Enterprise custom. Plan-specific trial lines on Starter (3 boxes/15 deals) and Operator (5 boxes/75 deals). No-refund fine print under grid.
- components/faq-section.tsx:7-49 — replaced 6 questions with 9: PropStream comparison, market coverage, ATTOM data source, Parcyl.ai 24h freshness, skip trace accuracy, not-relevant flow, asset classes, cancel, contract
- components/cta-section.tsx:105-128 — eyebrow "Get started tonight", headline "Tonight's run starts at 2 AM. Submit your buy box before midnight.", "Be in tomorrow's inbox →" button, trial microcopy

Tranche 2 — four new section components (commit a6dea2f)
- components/vs-old-way-section.tsx — 7-row comparison grid (Nightdrop ✓ vs you/VA on PropStream/BatchLeads ✗). Includes total-cost row ($149 flat vs $99 PropStream + $15/hr VA + skip trace fees).
- components/midnight-run-section.tsx — vertical timeline with 5 numbered steps (11:59 PM lock-in → 2:00 AM nationwide run → 3:00 AM distress gate → 4:30 AM briefs → 6:00 AM inbox). Gradient connector line, last step gets primary ring.
- components/methodology-section.tsx — eyebrow "Our Methodology". 4 distress signal tiles (Tax Delinquency / Pre-Foreclosure / Active Foreclosure / Auction Scheduled) with lucide icons (ShieldAlert/FileWarning/Gavel/Scale). Threshold framing — user sets bar, % NOT advertised.
- components/sample-deal-brief-section.tsx — anonymized 4711 Ridgeline Dr brief (Mike Jones, 281-330-8004, 87% confidence). Match score badge 9.1/10, distress tag pills, owner narrative paragraph, "Why this matched" panel, owner contact card.
- app/page.tsx — wired all four into the order Hero → SocialProof → VsOldWay → Bento → MidnightRun → Methodology → SampleDealBrief → LargeTestimonial → Pricing → TestimonialGrid → FAQ → CTA → Footer

Tranche 3 — footer (commit b0fc60e)
- components/footer-section.tsx:42-58 — added mailto:[contact@placeholder] on Contact link and "Book a call" link with [CALENDLY_URL_PLACEHOLDER] href

Decisions locked this session:
- Hero headline: "Automate your acquisition pipeline." (Brady's pick after rejecting all six A–F options)
- Trial: 3-day free trial, CARD REQUIRED at signup, plan picked at signup (Option C). Starter trial = 3 boxes/15 deals, Operator trial = 5 boxes/75 deals. 24h email warning + final-night countdown + dashboard tooltip "1 night left".
- Methodology tile: 70% threshold NOT advertised — user-controlled.
- No founder credibility on the page (Brady explicit: "nobody gives a fuck about the founder").
- Testimonials kept (LargeTestimonial + TestimonialGrid both unchanged).
- Bento section UNTOUCHED (Brady explicit).
- Sample brief uses Mike Jones / (281) 330-8004 / Round Rock TX.

Build / verification:
- npx tsc --noEmit: PASS (run after T1 and T2)
- npm run build: PASS three times. Final First Load JS 175 kB.
- typescript-reviewer agent run twice (T1 and T2): both CLEAN, no CRITICAL or HIGH findings.
- Branch pushed to origin/feat/landing-redesign-v2.

What was NOT done:
- PR not opened on GitHub (Brady to review locally first, then open via gh)
- Real contact email + Calendly URL still placeholders (literal [contact@placeholder] and [CALENDLY_URL_PLACEHOLDER] strings — Brady to swap)
- No visual QA in browser. Build passes but pixel-level layout was not verified live.
- Trial mechanics (card required, 24h email, dashboard tooltip) are LANDING COPY only — actual signup/billing flow needs to be implemented elsewhere to honor the promise. Critical to wire before launch.
- Operator trial line says "5 buy boxes · 75 deals" — math is 5 boxes × 5 deals × 3 nights = 75. Confirm this matches what the agent pipeline will actually emit during a 3-night trial.

Next session:
1. Visual QA in browser at port 3456 → make any spacing/contrast tweaks
2. Open PR via gh, deploy to Netlify preview
3. Swap contact + Calendly placeholders for real values
4. Wire trial mechanic on signup side (card capture, billing webhook, 24h reminder email, dashboard tooltip)

cd ~/deal-feed-landing/landing_page_audit && claude --dangerously-skip-permissions

Blockers for Brady (carried):
1. ANTHROPIC_API_KEY in ~/parcyl/parcyl-mcp-server/.env needs valid key with credits
2. Ask Adam: apply ETL enrichment on Render Neon branch (resolved_asset_type null in prod)
3. parcyl-mcp-server needs GitHub repo created and remote configured
4. Test deal-feed-dashboard Admin "Run Now" button on deployed Netlify
5. Decide: expose 9 scout views (v_scout_*) via chat?
6. Provide real contact email and Calendly URL for footer
7. Confirm Operator 3-night trial deal-volume math (5 × 5 × 3 = 75)
