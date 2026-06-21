# CivicState Roadmap

As of 2026-06-21 [evidence: worker dispatch current_date], this root roadmap supersedes the stale planning conflict between `.planning/ROADMAP.md` and `.planning/STATE.md` for soul-review purposes only. It preserves the existing narrative: CivicState is a web product that turns civic concerns into researched, citation-backed letters sent to government officials for $5 to $25 [evidence: .planning/PROJECT.md; apps/web/app/page.tsx]. It also reflects the registry constraint that the project is watchlist/personal research, not near-term investible until validation exists [evidence: dispatch registry notes, 2026-06-21].

## Current Build Evidence

- Product surface exists: Next.js app, submission wizard, dashboard/admin routes, privacy/terms/about pages [evidence: apps/web/app; .planning/phases/02-ai-pipeline/02-06-SUMMARY.md; .planning/phases/04-dashboard-compliance/04-03-SUMMARY.md].
- Backend surface exists: Express routes for submissions, officials, payments, webhooks, admin, compliance, and campaigns [evidence: apps/api/src/routes].
- Data and worker surface exists: Prisma models and BullMQ-style worker agents [evidence: packages/shared/prisma/schema.prisma; apps/worker/src].
- Business evidence does not exist yet: no repo evidence of live revenue, paid submissions, production deliverability, attorney review, payment processor approval, or user conversion [evidence: repository file scan, 2026-06-21].

## Now

- [ ] Thesis - reconcile stale planning state by updating `.planning/existing-state.md`, `.planning/STATE.md`, and `.planning/ROADMAP.md` in a future planning-only pass; they currently contradict the current codebase [evidence: .planning files; apps; packages/shared].
- [ ] Customer Definition - run a concierge beta with at least 30 paid submissions [assumption: minimum validation sample] from individual civic issue submitters, recording conversion, refunds, and qualitative objections.
- [ ] Revenue Model - verify Stripe checkout, webhook fulfillment, ledger entries, and refund path using $5, $15, and $25 tiers [evidence: .planning/PROJECT.md; apps/api/src/routes/payments.ts].
- [ ] Risks And Anti-Plan - complete attorney review for terms, AI disclosure, CAN-SPAM posture, legal-adjacent citation language, moderation rules, and official opt-out handling [assumption: required risk review, no attorney evidence in repo].
- [ ] Evidence And Freshness - run live DNS/Postmark/domain-warming checks before any government-office delivery; target at least 85% inbox placement for the first validation cohort [evidence: .planning/PROJECT.md; scripts/setup-dns.md].
- [ ] Assumption Ledger - audit at least 20 generated letters [assumption: small manual QA batch] for citation accuracy, fabricated law, tone, legal-demand language, and unverifiable factual claims before paid launch.

## Next

- [ ] Go To Market - publish only opt-in, privacy-safe campaign pages and measure 90-day search impressions and conversion [assumption: SEO validation window; evidence for SEO strategy: .planning/GENESIS.md].
- [ ] Competition - compare CivicState against Resistbot, Change.org, LegalZoom, Quorum, and VoterVoice with fresh source-backed notes once network research is allowed [assumption: competitor details need external verification; evidence that names matter: MASTER_PLAN.md; .planning/PROJECT.md].
- [ ] Market Sizing Method - replace the $15,000 first-year scenario in BUSINESS.md with observed funnel math from traffic, conversion, AOV, refunds, chargebacks, and repeat usage [assumption: current figure is scenario-only].
- [ ] Product Reality - test local/state/federal official lookup coverage by ZIP and document gaps for local provider choice, including Cicero vs BallotReady if still current [evidence: .planning/PROJECT.md; apps/api/src/lib/officials].
- [ ] Risks And Anti-Plan - instrument operator workload: flagged queue count, oldest item age, minutes per review, complaint rate, bounce rate, and chargebacks below 0.5% [evidence: MASTER_PLAN.md].

## Later

- [ ] Revenue Model - consider subscriptions, certified mail, fax, API access, or organization plans only after the email-first transactional loop has repeat paid demand [evidence: .planning/GENESIS.md; MASTER_PLAN.md].
- [ ] Go To Market - test partnerships or paid acquisition only after organic and concierge channels produce positive unit economics [assumption: sequencing discipline].
- [ ] Thesis - revisit whether this should remain a personal/research asset or become a business-of-scale candidate after validation gates are met [evidence: dispatch registry notes, 2026-06-21].

## Buildable Shape

The next roadmap is deliberately validation-heavy rather than feature-heavy. Each Now item should fit a single worker pass: collect evidence, add/update planning artifacts, or verify one production readiness surface. Do not expand product scope until the current business gaps are closed.
