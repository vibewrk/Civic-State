# CivicState / Brooks History — Roadmap

## Current Position

As of 2026-06-22 [evidence: wrk.dog dispatch], this repo contains a substantially implemented CivicState application: Next.js web app, Express API, PostgreSQL schema, BullMQ worker agents, Stripe pricing, Postmark delivery, dashboards, and compliance pages [evidence: `package.json`; `packages/shared/prisma/schema.prisma`; `apps/api/src/routes/submissions.ts`; `apps/worker/src/agents/delivery.ts`].

The prior roadmap in `.planning/ROADMAP.md` records four complete phases, all completed on 2026-04-25 [evidence: `.planning/ROADMAP.md`]. That narrative is preserved here as implementation evidence, but the business roadmap now shifts from build completion to operator/market validation because the registry marks the project as watchlist and not near-term investible [evidence: wrk.dog registry note].

## Preserved Build Narrative

The original roadmap organized work into Foundation, AI Pipeline, Payment & Delivery, and Dashboard & Compliance [evidence: `.planning/ROADMAP.md`]. Those tracks map cleanly to the repo:

- Foundation: workspace, Docker, auth, database, Redis/BullMQ, and app shells [evidence: `.planning/ROADMAP.md`; `package.json`].
- AI Pipeline: submission wizard, moderation, official lookup, research, citation verification, and drafting [evidence: `.planning/ROADMAP.md`; `apps/api/src/routes/submissions.ts`; `apps/worker/src/agents/researcher.ts`].
- Payment & Delivery: $5/$15/$25 Stripe tiers and Postmark delivery logic [evidence: `apps/api/src/routes/payments.ts`; `apps/worker/src/agents/delivery.ts`].
- Dashboard & Compliance: user/admin dashboards, privacy, terms, audit logs, and deletion/compliance primitives [evidence: `apps/web/app/dashboard/page.tsx`; `apps/web/app/admin/page.tsx`; `apps/web/app/privacy/page.tsx`; `packages/shared/prisma/schema.prisma`].

## Buildable Next Steps

- [ ] Thesis: operator ruling on whether CivicState is a business validation candidate or remains a personal/research asset by 2026-07-15 [assumption: EIR milestone].
- [ ] Problem & Customer: define the first validation ICP and disallowed use cases in the product copy by 2026-07-22 [assumption].
- [ ] Product & Moat: add an operator-visible evidence checklist for each letter: verified citations, official source, moderation tier, delivery risk by 2026-08-01 [assumption].
- [ ] Business Model: instrument submission-start, preview, checkout-start, payment-success, refund, and delivery-success events by 2026-08-15 [assumption].
- [ ] Go-To-Market: run a concierge pilot for 20 paid campaigns before automated scale-up by 2026-08-31 [assumption].
- [ ] Risks & Anti-Plan: add a launch kill-switch policy for legal-threat, harassment, high-bounce, and spam-complaint patterns by 2026-09-15 [assumption].
- [ ] Financial Model: create a monthly validation scorecard comparing paid campaigns, blended price, variable cost, human-review time, refunds, and complaints by 2026-09-30 [assumption].

## Gate

The next roadmap gate is not more feature scope. It is evidence: paid demand, compliant delivery, low complaint rates, and operator confirmation of business intent [assumption: EIR synthesis; registry says watchlist/personal-research].

