# CivicState Roadmap

Document date: 2026-06-16 [assumption: current worker runtime date]. This roadmap aligns the repo's existing CivicState build narrative with the upgraded business plan in [BUSINESS.md](BUSINESS.md). It does not replace the detailed engineering roadmap in [.planning/ROADMAP.md](.planning/ROADMAP.md) [evidence]; it turns that plan into investor-readable validation work.

## Current State

The planning roadmap marks the foundation, AI pipeline, payment and delivery, and dashboard/compliance phases complete on 2026-04-25 [evidence: .planning/ROADMAP.md]. The codebase contains the corresponding monorepo surface: Next.js app, Express API, worker agents, Prisma schema, Stripe checkout, Postmark webhooks, admin tools, and tests for payments, delivery, moderation, officials, compliance, and citation verification [evidence: apps/; packages/shared/; tests/].

The business state is much earlier than the build state. There is no workspace evidence of revenue, users, production traffic, paid conversion, official response rates, or government inbox placement [evidence: workspace review found no metrics or production data]. The roadmap therefore prioritizes proof over additional feature breadth.

## Buildable Strategy

The plan is to validate a narrow, paid CivicState loop before any scale claim: issue intake, official targeting, verified research, letter preview, payment, delivery, and status tracking [evidence: .planning/PROJECT.md; apps/web/components/wizard/letter-preview.tsx; apps/api/src/routes/payments.ts].

The product should stay transactional at $5, $15, and $25 [evidence: apps/api/src/routes/payments.ts] until paid demand is real. Enterprise API, coalition features, multilingual support, certified mail, and automated follow-up should remain deferred [evidence: .planning/REQUIREMENTS.md].

## Now / Next / Later

- [ ] **Thesis and identity validation:** confirm by 2026-07-15 [assumption: operator schedule] whether this repo is CivicState or is misregistered under brooks-history, and update the wrk.vc dossier posture accordingly.
- [ ] **Problem & Customer validation:** interview at least 15 target users [assumption: minimum qualitative sample] and test whether the described civic-letter job is painful enough to pay for.
- [ ] **Business Model validation:** run a paid checkout rehearsal using the $5 tier [evidence: apps/api/src/routes/payments.ts], Stripe webhook path [evidence: apps/api/src/routes/webhooks.ts], and ledger recording [evidence: apps/worker/src/lib/treasury.ts].
- [ ] **Product & Moat validation:** complete an end-to-end staging job that creates verified citations, strips unverified citations, drafts letters, and records delivery status [evidence: apps/worker/src/agents/researcher.ts; apps/worker/src/agents/drafter.ts; apps/worker/src/agents/delivery.ts].
- [ ] **Market validation:** gather at least 100 preview sessions [assumption: minimum funnel sample] and compare paid conversion to the 3% gate [evidence: .planning/PROJECT.md].
- [ ] **Go-To-Market validation:** run one narrow local or issue-based acquisition test [assumption: EIR recommendation] and record source, preview rate, checkout rate, and refund requests.
- [ ] **Risks & Anti-Plan validation:** prove at least 85% inbox placement [evidence: .planning/PROJECT.md], keep domain bounce rate under 10% [evidence: apps/worker/src/agents/delivery.ts], and obtain operator decision on legal/compliance review before live scale.

## Decision Gates

Continue only if the product clears paid conversion, deliverability, and official coverage gates. The prior plan names 3% conversion [evidence: .planning/PROJECT.md], 85% inbox placement [evidence: .planning/PROJECT.md], and official data coverage targets of 95% federal/state and 60% local [evidence: .planning/PROJECT.md]. Those are still useful gates, but all remain unvalidated.

Pause or archive if the brooks-history identity mismatch is unresolved by 2026-07-15 [assumption: operator schedule], if conversion is below 3% [evidence: .planning/PROJECT.md], if deliverability is below 85% [evidence: .planning/PROJECT.md], or if legal/compliance review finds the letter product cannot be responsibly operated [assumption: EIR risk standard].

## Roadmap Notes

This roadmap intentionally avoids new speculative features. The existing repo has enough surface area to test the business; the next work is measurement, operator confirmation, legal review, and a very small paid beta.
