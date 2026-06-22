# CivicState Roadmap

Document date: 2026-06-22 [evidence: worker environment current_date].

## Existing Narrative Preserved

CivicState's original roadmap is a four-phase build: foundation, AI pipeline, payment and delivery, then dashboard and compliance [evidence: .planning/ROADMAP.md]. The repo now contains application surfaces matching that plan: Next.js web routes, Express API routes, BullMQ worker agents, Prisma models, Stripe payment creation, Postmark delivery handling, and admin/compliance pages [evidence: rg file listing; apps/api/src/index.ts; packages/shared/prisma/schema.prisma].

The business roadmap must now shift from "build the planned product" to "validate whether the built product deserves growth investment." The project file still says there are no validated requirements and that the product must ship to validate [evidence: .planning/PROJECT.md].

## Operating Milestones

Milestone A: Evidence cleanup and beta readiness. Confirm what is actually deployed, which integrations have live credentials, and whether the repo's completion claims match runtime behavior [evidence: .planning/ROADMAP.md; .planning/STATE.md].

Milestone B: Controlled paid beta. Run a narrow operator-supervised beta with limited jurisdictions and issue categories; do not open national self-serve traffic until official lookup and deliverability gates clear [assumption: risk-control recommendation].

Milestone C: Business decision. If the beta reaches >=3% paid conversion, >=85% .gov inbox placement, >=95% federal/state official coverage, and >=60% local coverage, continue as a small commercial product; otherwise preserve it as a personal/research asset or operator-assisted tool [evidence: .planning/PROJECT.md Market Verdict].

## Validation Backlog

- [ ] Snapshot: produce a repo-vs-runtime status memo for web, API, worker, database, Stripe, Postmark, Clerk, and deployment.
- [ ] Product Reality: run a dry submission through moderation, classification, research, draft creation, payment-pending, and delivery-queued states with fake delivery disabled.
- [ ] Customer Definition: recruit a narrow beta cohort of residents with concrete local issues and record why each would or would not pay.
- [ ] Revenue Model: verify Stripe Checkout for the $5, $15, and $25 tiers [evidence: apps/api/src/routes/payments.ts] and reconcile each payment to the ledger.
- [ ] Market Sizing: replace the bottom-up assumptions in BUSINESS.md with live evidence from beta traffic, conversion, search demand, and customer interviews.
- [ ] Go-To-Market: test whether opted-in campaign pages can be safely published and indexed after privacy/legal review.
- [ ] Risks And Anti-Plan: run deliverability tests by recipient domain and document bounce, spam complaint, reply, and suppression behavior.
- [ ] Assumption Ledger: review the open assumptions after beta and mark each validated, invalidated, or still unknown.

## Build Rules

Keep work single-worker-sized, non-speculative, and traceable to BUSINESS.md headings. Do not add community, subscription, certified-mail, API-consumer, multilingual, or mobile-native scope until the beta gates clear [evidence: .planning/PROJECT.md Out of Scope].

## Decision Gate

Next gate date: 2026-07-22 [assumption: 30-day validation window from 2026-06-22]. Gate owner: operator. Gate posture: proposed until POM soul-review plus wrk.dog merge constitutes adoption [evidence: dispatch adoption note].
