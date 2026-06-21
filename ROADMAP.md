# CivicState — Roadmap

Updated: 2026-06-21 [evidence: worker environment current_date]

## Current Narrative

CivicState is intended to turn a civic concern into researched, citation-backed letters delivered to the correct government officials through a web workflow [evidence: MASTER_PLAN.md; .planning/PROJECT.md]. The existing planning system describes four phases [evidence: .planning/ROADMAP.md]: foundation, AI pipeline, payment/delivery, and dashboard/compliance. The repo now contains source for each broad area, but there is no repo evidence of production traction, paid customers, live deliverability metrics, or operator adoption as an investible business [evidence: source tree; dispatch registry note].

The roadmap therefore shifts from "build everything" to "prove the risky loop": paid submission, verified citation preview, official delivery, and operator-safe compliance.

## Roadmap Principles

- Preserve the current Express/Next/Prisma/worker implementation while auditing what is real versus stubbed [evidence: apps/api/src/index.ts; apps/web/app/page.tsx; apps/worker/src/index.ts; packages/shared/prisma/schema.prisma].
- Treat all market, financial, and conversion claims as assumptions until beta data exists [assumption: workspace-only mode and no revenue artifact].
- Keep direct Clerk/Stripe/Postmark integrations as prototype rails, but do not make them permanent if WrkPlug adoption is approved [assumption: WrkPlug Phase 0 not yet signed].
- Do not expand into subscriptions, organization APIs, public campaign SEO, certified mail, fax, or automated follow-up until the paid individual loop works [evidence: .planning/PROJECT.md out-of-scope section].

## Near-Term Build Plan

- [ ] Thesis / Evidence: reconcile `.planning/ROADMAP.md`, `.planning/STATE.md`, and source reality into one status audit by 2026-07-15 [assumption: single-worker audit date].
- [ ] Product & Moat: run route-by-route smoke tests for submission, official lookup, research, drafting, payment, delivery, dashboard, admin, and compliance by 2026-07-22 [assumption: one worker can execute with local env].
- [ ] Business Model: verify Stripe test checkout for the $5/$15/$25 tiers and record the exact fee/margin math by 2026-07-31 [evidence: apps/api/src/routes/payments.ts; assumption: test deadline].
- [ ] Risks & Anti-Plan: run a citation failure drill proving unverified citations are stripped or flagged before delivery by 2026-08-07 [evidence: apps/worker/src/agents/researcher.ts; assumption: drill date].
- [ ] Go-To-Market: complete 10 concierge beta submissions with operator review before any self-serve launch [assumption: validation batch size].
- [ ] Financial Model: replace assumed $0.80/submission variable cost with token, email, and lookup logs from beta runs by 2026-08-31 [assumption: measurement target].
- [ ] Platform Posture: get operator ruling on watchlist vs business and direct-stack vs WrkPlug client before public launch [evidence: dispatch registry note; assumption: WrkPlug Phase 0 not yet signed].

## Validation Gates

| Gate | Threshold | Why it matters |
|---|---:|---|
| Paid conversion | 3.0% [assumption: prior planning threshold] | Proves people pay rather than only admire the idea |
| Deliverability | 85.0% accepted/delivered [assumption: prior planning threshold] | Proves government inboxes accept the format |
| Local official coverage | 60.0% [assumption: prior planning threshold] | Proves the routing layer is useful outside federal/state cases |
| Bounce suppression | 10.0% per-domain threshold [evidence: apps/worker/src/agents/delivery.ts] | Prevents sender reputation collapse |
| Operator workload | under 30 minutes/day [assumption: prior lean-operator design] | Confirms this is not a hidden services business |

## Deferred Work

Subscriptions, organization APIs, certified mail, fax, public campaign SEO, automated follow-up letters, multi-language support, and native mobile apps remain deferred until the validation gates pass [evidence: .planning/PROJECT.md; .planning/GENESIS.md].

## Evidence Sources

- `MASTER_PLAN.md` [evidence: prior product blueprint].
- `.planning/PROJECT.md` [evidence: planning context and constraints].
- `.planning/ROADMAP.md` and `.planning/STATE.md` [evidence: conflicting planning status].
- `apps/api/src/routes/payments.ts`, `apps/api/src/routes/submissions.ts`, `apps/worker/src/agents/researcher.ts`, `apps/worker/src/agents/delivery.ts`, `packages/shared/prisma/schema.prisma` [evidence: current implementation surface].
