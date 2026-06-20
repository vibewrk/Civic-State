# CivicState / brooks-history - Roadmap

## Overview

CivicState turns a civic concern into a researched, citation-backed, professionally drafted letter delivered to the correct officials. The existing `.planning/ROADMAP.md` describes a four-phase implementation path across foundation, AI pipeline, payment/delivery, and dashboard/compliance [evidence: .planning/ROADMAP.md].

As of 2026-06-20 [evidence: dispatch current_date], the root roadmap is aligned to the new business plan: validate whether this is a paid civic service before adding speculative scale features. The registry posture remains watchlist/personal-research until operator and market validation change it [evidence: registry note].

## What Is Already Planned

- Foundation: monorepo, Docker, CI/CD, database, auth, agent engine, and domain warming [evidence: .planning/ROADMAP.md].
- AI pipeline: submission wizard, officials directory, research, citation verification, letter drafting, and moderation [evidence: .planning/ROADMAP.md].
- Payment and delivery: Stripe checkout, treasury, Postmark email delivery, bounce tracking, and delivery status [evidence: .planning/ROADMAP.md].
- Dashboard and compliance: campaign dashboard, admin tools, legal pages, audit enforcement, and retention policy [evidence: .planning/ROADMAP.md].

## Business Alignment

The roadmap now serves these BUSINESS.md headings: Problem & Customer, Market, Product & Moat, Business Model, Go-To-Market, Financial Model, Risks & Anti-Plan, and Assumption Ledger [evidence: BUSINESS.md].

The next work should not be framed as scaling. It should be framed as evidence creation: prove payment conversion, official lookup coverage, email delivery, citation quality, moderation load, and operator time [assumption: EIR validation priority].

## Buildable Next Steps

- [ ] Problem & Customer: write a beta intake script and collect 20 concierge campaign attempts by 2026-08-31 [assumption: validation target].
- [ ] Product & Moat: document the current real product surface against the Prisma schema, API routes, worker agents, and web pages by 2026-07-17 [assumption: audit target].
- [ ] Business Model: instrument the $5, $15, and $25 pricing tiers so actual tier mix can be exported after the first 100 paid submissions [evidence: pricing tiers in apps/api/src/routes/payments.ts; assumption: cohort size].
- [ ] Go-To-Market: publish or draft three narrow issue landing pages for beta acquisition by 2026-08-15 [assumption: SEO/community test].
- [ ] Financial Model: add a simple weekly operator report with paid submissions, refunds, variable cost, delivery failures, and manual-review minutes by 2026-08-31 [assumption: operating metric set].
- [ ] Risks & Anti-Plan: run a deliverability and citation-failure review before production delivery, including the 10% bounce pause threshold and all-failed citation review path [evidence: .planning/REQUIREMENTS.md and apps/worker/src/agents/researcher.ts].
- [ ] Assumption Ledger: update BUSINESS.md after the first 20 campaigns and again after the first 100 paid submissions [assumption: validation cadence].

## Deferred Until Validation

- Organization/API sales remain deferred until the individual citizen loop works [evidence: .planning/PROJECT.md].
- Paid acquisition remains deferred because the modeled blended price is $13 and cannot tolerate expensive CAC [assumption: BUSINESS.md financial model].
- Certified mail, fax, multilingual support, coalition features, public social mechanics, and automated follow-up loops remain out of launch scope [evidence: MASTER_PLAN.md and .planning/REQUIREMENTS.md].
- Any WrkPlug migration should wait for operator approval and a platform contract decision [assumption: wrapper context; no signed platform migration in workspace].

## Decision Gates

| Gate date | Question | Continue if |
|---|---|---|
| 2026-07-03 [assumption: operator checkpoint] | Is brooks-history the correct project shell for CivicState? | Operator confirms the identity and pitch posture |
| 2026-08-31 [assumption: beta checkpoint] | Can the team complete paid or concierge campaigns without unacceptable manual burden? | 20 campaigns are completed with tracked outcomes [assumption: validation bar] |
| 2026-09-30 [assumption: demand checkpoint] | Is there enough paid demand to keep building? | 100 paid submissions, 3% conversion, and 85% delivery proxy are reached [assumption for 100; evidence for 3% and 85% gates in .planning/PROJECT.md] |
| 2026-10-15 [assumption: investment checkpoint] | Should this remain research, become a business, or fold into shared platform rails? | Operator signs the next operating thesis |
 
