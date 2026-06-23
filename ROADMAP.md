# CivicState Roadmap

**As-of date:** 2026-06-23 [evidence: dispatch wrapper, 2026-06-23]  
**Registry posture:** Watchlist; personal/research asset until operator confirms business intent [evidence: dispatch registry note, 2026-06-23]  
**Source roadmap preserved:** [`.planning/ROADMAP.md`](.planning/ROADMAP.md) [evidence: repo file, 2026-06-23]

## Overview

CivicState delivers the pipeline from civic frustration to official action: guided issue capture, official lookup, legal/civic research, verified citation-backed drafting, paid delivery, and dashboard tracking [evidence: [`.planning/PROJECT.md`](.planning/PROJECT.md), 2026-06-23]. The existing roadmap records four completed implementation phases on 2026-04-25 [evidence: [`.planning/ROADMAP.md`](.planning/ROADMAP.md), 2026-06-23], but the business roadmap must now shift from building features to validating the venture.

The roadmap serves the plan in `BUSINESS.md`: do not scale acquisition until operator intent, official-data coverage, citation quality, deliverability, payment conversion, and moderation load are proven.

## Built Foundation

- [x] Foundation: monorepo, Docker, CI/CD, database, auth, agent engine, and domain warming work were marked complete in the planning roadmap [evidence: [`.planning/ROADMAP.md`](.planning/ROADMAP.md), 2026-06-23].
- [x] AI pipeline: submission wizard, officials directory, research, citation verification, drafting, and moderation were marked complete in the planning roadmap [evidence: [`.planning/ROADMAP.md`](.planning/ROADMAP.md), 2026-06-23].
- [x] Payment and delivery: Stripe, treasury, Postmark delivery, and bounce tracking were marked complete in the planning roadmap [evidence: [`.planning/ROADMAP.md`](.planning/ROADMAP.md), 2026-06-23].
- [x] Dashboard and compliance: user dashboard, admin tools, legal pages, audit, and deletion endpoints were marked complete in the planning roadmap [evidence: [`.planning/ROADMAP.md`](.planning/ROADMAP.md), 2026-06-23].

## Validation Roadmap

### Operator Next Actions

- [ ] **Thesis:** decide whether the brooks-history registry entry should become a CivicState business pitch or remain a research asset.
- [ ] **Problem & Customer:** run a human-reviewed beta intake with issue-specific users and record whether they would pay before seeing a final delivery.
- [ ] **Market:** replace the bottom-up assumptions in `BUSINESS.md` with actual funnel data from beta traffic, previews, payments, and completed deliveries.
- [ ] **Product & Moat:** run an official-coverage audit across selected ZIP codes and document federal, state, and local coverage gaps.
- [ ] **Business Model:** reconcile actual Stripe payments, direct AI/vendor cost, refunds, and operator time against the $5, $15, and $25 tiers [evidence: [`apps/api/src/routes/payments.ts`](apps/api/src/routes/payments.ts), 2026-06-23].
- [ ] **Risks & Anti-Plan:** red-team moderation, citation hallucination, legal-adjacent phrasing, and official opt-out handling before public launch.
- [ ] **Go-To-Market:** test a narrow concierge channel before SEO scale; promote only if paid delivery and complaint metrics are acceptable.

## Gate Criteria

| Gate | Required proof |
|---|---|
| Business identity gate | Operator records whether project id brooks-history maps to CivicState or should be renamed/archived [evidence: dispatch wrapper and repo mismatch, 2026-06-23] |
| Coverage gate | Local official provider decision made; Cicero is currently a stub [evidence: [`apps/api/src/lib/officials/cicero.ts`](apps/api/src/lib/officials/cicero.ts), 2026-06-23] |
| Safety gate | Citation verification and moderation pass red-team review [evidence: [`tests/citation-verifier.test.ts`](tests/citation-verifier.test.ts), 2026-06-23] |
| Deliverability gate | Bounce/complaint monitoring stays under the repo's 10% per-domain pause threshold [evidence: [`apps/worker/src/agents/delivery.ts`](apps/worker/src/agents/delivery.ts), 2026-06-23] |
| Economics gate | Paid beta shows revenue covers direct job costs, processor cost, and human review time [assumption: EIR validation standard; no network access] |

## Milestone Dates

| Date | Milestone |
|---|---|
| 2026-07-15 [assumption: EIR schedule; no network access] | Operator rules on business vs research asset |
| 2026-08-01 [assumption: EIR schedule; no network access] | Local official provider spike complete |
| 2026-08-15 [assumption: EIR schedule; no network access] | Closed beta opens with human review |
| 2026-09-15 [assumption: EIR schedule; no network access] | Paid beta review and investibility decision |
| 2026-10-01 [assumption: EIR schedule; no network access] | wrk.vc promotion, rename, or archive decision |

## Deferred Until Proof

- Organization API and subscriptions remain deferred until consumer willingness to pay is proven [evidence: [`.planning/REQUIREMENTS.md`](.planning/REQUIREMENTS.md), 2026-06-23].
- Public campaign SEO pages remain deferred until privacy, moderation, and legal review are operator-approved [assumption: EIR risk posture; no network access].
- Certified mail, fax, multilingual support, and mobile apps remain out of launch scope [evidence: [`.planning/REQUIREMENTS.md`](.planning/REQUIREMENTS.md), 2026-06-23].
