# CivicState Roadmap

## Overview

CivicState's existing planning narrative describes a full pipeline from civic concern to official action: foundation, AI research and drafting, payment and delivery, dashboard, admin, and compliance [evidence: .planning/ROADMAP.md]. The current repo now contains much of that build shape in code: web, API, worker, shared Prisma schema, tests, payment routes, compliance routes, and delivery workers [evidence: package.json; apps/api/src/index.ts; apps/worker/src/index.ts; packages/shared/prisma/schema.prisma; tests].

This roadmap now serves the business plan rather than the other way around. The next work is not more speculative surface area; it is validation of the paid, citation-backed civic-letter loop under the Watchlist constraint that the operator must confirm whether this should pitch as a business [evidence: user dispatch].

## Current Build State

- Built surfaces: Next.js web app, Express API, BullMQ worker, Prisma data model, Stripe checkout route, Postmark delivery worker, admin routes, dashboard routes, privacy and terms pages [evidence: apps/web; apps/api; apps/worker; packages/shared/prisma/schema.prisma].
- Implemented price points: $5, $15, and $25 [evidence: apps/api/src/routes/payments.ts].
- Implemented risk controls: moderation, citation verification path, audit logs, append-only ledger intent, opt-out handling, bounce-rate gate, and CCPA-style deletion/export routes [evidence: apps/api/src/lib/moderation.ts; apps/worker/src/lib/legal/citation-verifier.ts; packages/shared/prisma/schema.prisma; apps/worker/src/agents/delivery.ts; apps/api/src/routes/compliance.ts].
- Not yet evidenced: paid users, revenue, official response rate, real deliverability, production provider configuration, CAC, retention, refund rate, and legal review [evidence: no production operations data found in repo].

## Now / Next / Later

- [ ] Thesis: confirm by 2026-06-30 whether the operator wants CivicState pitched as a business or held as a personal/research asset [assumption: operator validation milestone].
- [ ] Problem & Customer: run 25 recruited user sessions by 2026-07-31 and record the issue type, willingness to pay, and abandonment reason [assumption: validation milestone].
- [ ] Business Model: complete an end-to-end sandbox purchase for the $15 tier and verify Stripe webhook, payment record, treasury ledger, and campaign status [evidence: apps/api/src/routes/payments.ts; apps/worker/src/agents/treasury.ts].
- [ ] Product & Moat: seed and verify an initial official directory cohort with sourceApi and lastVerifiedAt populated before any real delivery [evidence: packages/shared/prisma/schema.prisma].
- [ ] Risks & Anti-Plan: run a deliverability test and document bounce, spam complaint, opt-out, and refund handling before scaling beyond concierge volume [evidence: apps/worker/src/agents/delivery.ts].
- [ ] Go-To-Market: recruit the first 100 paid or explicitly comped letter attempts manually before SEO or paid acquisition [assumption: Watchlist validation sequence].
- [ ] Assumption Ledger: replace the placeholder TAM, SAM, SOM, conversion, and margin assumptions in BUSINESS.md with sourced data or measured repo operating data [assumption: workspace-only research gap].

## Buildable Sequence

Near term work should be single-worker-sized and non-speculative:

- Provider configuration audit: enumerate required Clerk, Stripe, Postmark, Redis, PostgreSQL, Anthropic, OpenStates, congress.gov, and local-official-provider environment variables without changing source [evidence: .env.example; apps/api; apps/worker].
- End-to-end dry run: create one test submission, one campaign, one payment session, one letter draft, and one delivery attempt in sandbox mode [assumption: launch-readiness test].
- Metrics ledger: define a manual beta spreadsheet or database report for conversion, AOV, refund, bounce, complaint, response, review minutes, and citation failure [assumption: operator analytics need].
- Legal posture review: resolve the CAN-SPAM contradiction between planning and terms before live delivery [evidence: .planning/PROJECT.md; apps/web/app/terms/page.tsx].

## Later

Only after the validation gates clear should the project invest in public campaign pages, search-before-create, API access for organizations, certified mail, fax, multilingual support, paid acquisition, or automated follow-up letters [evidence: .planning/GENESIS.md; .planning/REQUIREMENTS.md].

## Decision Gates

- Continue if paid conversion is 3% or higher, inbox placement is 85% or higher, and local official coverage reaches 60% or higher [evidence: .planning/PROJECT.md].
- Pause if the first 100 letter attempts show repeated citation failures, official opt-out pressure, high refund load, or operator review time that cannot fit a one-person workflow [assumption: beta kill criteria].
- Reposition as research if the operator does not want a business pitch by 2026-09-30 [assumption: Watchlist governance milestone].
