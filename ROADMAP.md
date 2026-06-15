# CivicState Roadmap

Prepared as of 2026-06-15 [evidence: dispatch current_date]. This root roadmap aligns the implementation roadmap with the business plan in [BUSINESS.md](BUSINESS.md). It preserves the existing narrative from `.planning/ROADMAP.md`: CivicState moves a user from civic concern to official action through foundation, AI pipeline, payment and delivery, then dashboard and compliance [evidence: [.planning/ROADMAP.md](.planning/ROADMAP.md)].

## Current Read

The prior internal roadmap marks Phase 1 through Phase 4 complete on 2026-04-25 [evidence: [.planning/ROADMAP.md](.planning/ROADMAP.md)]. The project state file, however, still reports Phase 1 as the current focus and complete [evidence: [.planning/STATE.md](.planning/STATE.md)]. For the business plan, this means the repo has substantial code and planning artifacts, but market validation remains unproven.

The dispatch wrapper labels the project `brooks-history`, while the workspace implements CivicState [evidence: [package.json](package.json); [.planning/PROJECT.md](.planning/PROJECT.md)]. This roadmap follows the actual workspace product and leaves the registry mismatch for operator resolution.

## Strategy

The roadmap now serves the business thesis: prove that users pay USD 5 to USD 25 [evidence: [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts)] for researched, citation-backed constituent letters and that government-email delivery works at the required reliability. Feature work that does not improve conversion, delivery, citation quality, or operator review throughput should wait.

## Next 6 Buildable Moves

- [ ] Thesis - add a beta validation dashboard for preview-to-paid conversion, delivery acceptance, and chargebacks.
- [ ] Problem & Customer - instrument the submission funnel so each abandoned step records issue category, ZIP, and selected tier.
- [ ] Market - run a single-metro official-data coverage audit and record federal, state, and local hit rates.
- [ ] Product & Moat - add an operator-visible citation verification report per campaign before delivery.
- [ ] Business Model - reconcile Stripe payments, token usage, Postmark sends, and ledger entries into per-campaign gross margin.
- [ ] Go-To-Market - create a private beta intake page for one launch metro and route all traffic to the same measured funnel.
- [ ] Risks & Anti-Plan - add a deliverability review queue for bounced domains, opted-out officials, and high-risk content holds.

## Validation Gates

| Gate | Target | Source |
| --- | --- | --- |
| Preview-to-paid conversion | 3 percent | [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)] |
| Government-email delivery acceptance | 85 percent | [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)] |
| Federal/state official coverage | 95 percent | [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)] |
| Local official coverage | 60 percent | [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)] |
| Chargeback rate | below 0.5 percent | [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)] |

## Non-Goals Until Gates Pass

Do not prioritize public community features, coalition mechanics, certified mail, automated follow-up loops, dynamic pricing agents, organization API access, or crowdfunding adjacency before paid conversion and delivery reliability are known [evidence: [.planning/PROJECT.md](.planning/PROJECT.md); [MASTER_PLAN.md](MASTER_PLAN.md)].

## Operating Cadence

Review the gates weekly during beta [assumption: launch operating cadence]. If a gate misses for 2 consecutive weekly reviews [assumption: escalation threshold], the next worker should stop new surface-area work and write a focused diagnostic against the failing gate.
