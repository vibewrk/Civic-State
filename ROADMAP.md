# CivicState Roadmap

## Overview

CivicState turns a civic concern into researched, citation-backed correspondence delivered to the right government officials. The inherited planning roadmap described four completed build phases: foundation, AI pipeline, payment and delivery, and dashboard and compliance [evidence: [.planning/ROADMAP.md](.planning/ROADMAP.md)]. The current repo now contains meaningful application code across web, API, worker, shared Prisma schema, payments, moderation, admin, and legal pages [evidence: [package.json](package.json), [packages/shared/prisma/schema.prisma](packages/shared/prisma/schema.prisma), [apps/api/src/routes/submissions.ts](apps/api/src/routes/submissions.ts)].

This roadmap aligns the build with the business plan in [BUSINESS.md](BUSINESS.md). The priority is not adding speculative features; it is proving the product, revenue model, delivery reliability, and risk controls that make the plan credible.

## What Carries Forward

- Foundation work remains the base: pnpm workspaces, Next.js web app, Express API, worker process, Prisma, Redis/BullMQ, and shared package boundaries [evidence: package.json].
- The AI pipeline remains central: classify, research, verify citations, draft, and move through a state machine before payment and delivery [evidence: apps/worker/src/engine/state-machine.ts and apps/worker/src/agents/researcher.ts].
- Payment remains transactional: $5, $15, and $25 tiers are implemented in the payment route [evidence: apps/api/src/routes/payments.ts].
- Compliance remains a launch constraint: moderation, audit logging, not-legal-advice language, AI disclosure, privacy, and CCPA language exist in code or pages [evidence: apps/api/src/lib/moderation.ts, apps/web/app/terms/page.tsx, apps/web/app/privacy/page.tsx].

## What Changes

The old roadmap marked all phases complete on 2026-04-25 [evidence: .planning/ROADMAP.md]. The business review treats that as build-history evidence, not investibility evidence. The next roadmap stage must produce validation artifacts: paid demand, deliverability, citation quality, review load, and financial reconciliation.

## Mission Critical Next Builds

- [ ] **Product Reality: production readiness audit** - Run the app locally against the documented env vars, record which flows work end-to-end, and update the soul with real blockers.
- [ ] **Customer Definition: closed-beta intake cohort** - Add a simple operator-visible beta tracking note or dataset for recruited users, use cases, order intent, and reasons for non-payment.
- [ ] **Revenue Model: checkout-to-ledger proof** - Verify that the $5, $15, and $25 Stripe tiers create correct Payment records and campaign state transitions.
- [ ] **Financial Plan: cost and margin instrumentation** - Confirm token usage, delivery cost, Stripe amount, and ledger entries reconcile for each job.
- [ ] **Go To Market: safe public-page policy** - Define what can be published, anonymized, or withheld before any SEO campaign pages are enabled.
- [ ] **Risks And Anti-Plan: deliverability test harness** - Create an operator checklist for SPF/DKIM/DMARC, Postmark webhooks, bounce suppression, and spam complaint handling.
- [ ] **Assumption Ledger: validation dashboard** - Track paid orders, conversion, refunds, support minutes, citation failures, delivery outcomes, and official replies in one operator view.

## Deferred Until Proof

- Public campaign archive and SEO scale-up [assumption: needs privacy and demand validation].
- Organization/API revenue [evidence: .planning/PROJECT.md marks it future].
- Certified mail, fax, multilingual support, and mobile native apps [evidence: .planning/REQUIREMENTS.md out-of-scope and future requirements].
- Dynamic pricing agent and autonomous follow-up loops [evidence: .planning/PROJECT.md and .planning/REQUIREMENTS.md].

## Acceptance Criteria

The roadmap is business-aligned when every build item traces to a [BUSINESS.md](BUSINESS.md) heading, can be completed by one worker, and produces evidence that reduces a named assumption or risk. It is not complete when the code merely compiles; it is complete when the operator has a usable proof artifact.
