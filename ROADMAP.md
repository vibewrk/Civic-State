# CivicState Roadmap

## Context

The existing planning roadmap describes CivicState as a four-phase pipeline from civic concern to official action and marks all phases complete [evidence: .planning/ROADMAP.md]. The codebase does contain substantial application surface now, but repo evidence also shows unresolved implementation and validation gaps [evidence: .planning/REQUIREMENTS.md; apps/api/src; apps/web/app; apps/worker/src].

This roadmap serves the current business plan: prove whether CivicState is an operator-run product worth validating, not a near-term investible BOS by default [evidence: registry note in dispatch].

## Preserved Narrative

CivicState remains a web platform that turns a civic issue into researched, citation-backed, professionally drafted letters delivered to government officials. The planned pipeline is: submission, official lookup, research, citation verification, drafting, payment, email delivery, dashboard tracking, admin review, and compliance [evidence: .planning/PROJECT.md; .planning/ROADMAP.md].

## Current Reality

- Frontend, API, worker, Prisma schema, payment, delivery, dashboard, admin, and compliance code exist [evidence: apps/web/app; apps/api/src/index.ts; apps/worker/src/index.ts; packages/shared/prisma/schema.prisma].
- There is no workspace evidence of live production traffic, live revenue, or validated customer demand [evidence: .planning/existing-state.md].
- Planning artifacts conflict: the roadmap marks completion while the requirements file keeps core product requirements pending [evidence: .planning/ROADMAP.md; .planning/REQUIREMENTS.md].
- The project is tagged as watchlist/personal/research unless the operator confirms it should pitch as a business [evidence: dispatch registry note].

## Now / Next / Later

- [ ] Thesis Current: reconcile planning status against the current codebase and replace "all phases complete" claims with evidence-backed status.
- [ ] Product Reality: fix the checkout tier mismatch between frontend and API, then verify a sandbox payment handoff.
- [ ] Product Reality: fix compliance export field names so the data-export route matches the Prisma schema.
- [ ] Customer Definition: run a small operator-reviewed pilot script for resident submissions before autonomous public launch.
- [ ] Market Sizing: measure preview-to-payment conversion against the 3% validation gate [evidence: .planning/PROJECT.md].
- [ ] Revenue Model: instrument average order value, refund rate, Stripe fee impact, and gross margin per job.
- [ ] Go-To-Market: validate one narrow SEO or community channel before paid acquisition or broad launch.
- [ ] Risks Anti-Plan: complete counsel/operator review for moderation, AI disclosure, CAN-SPAM posture, and not-legal-advice language.

## Buildability Rules

Each roadmap item above is sized for a single worker and maps to a BUSINESS.md heading. Speculative expansions such as enterprise API access, coalition pages, subscriptions, native apps, and certified mail remain later only after paid demand and deliverability are validated [evidence: .planning/GENESIS.md; .planning/REQUIREMENTS.md].

## Validation Gates

- Willingness to pay: preview-to-payment conversion at or above 3% [evidence: .planning/PROJECT.md].
- Deliverability: government-domain inbox placement at or above 85% [evidence: .planning/PROJECT.md].
- Coverage: federal/state official coverage at or above 95% and local coverage at or above 60% [evidence: .planning/PROJECT.md].
- Financial safety: maintain 40% net margin floor and $1,500 reserve [evidence: .planning/PROJECT.md].
- Operations: one operator can handle flagged queue, bounce exceptions, and user support within a 24-hour review expectation [evidence: .planning/GENESIS.md; .planning/ROADMAP.md].

## Later

Only after validation gates clear: public campaign archive, advanced SEO pages, paid local official data provider, certified mail fallback, AI reply summarization, enterprise/API offering, and dynamic pricing [evidence: .planning/REQUIREMENTS.md].

