# Roadmap: CivicState / brooks-history

## Alignment

This roadmap merges the existing CivicState build narrative with the EIR soul upgrade. The previous planning roadmap marked the foundation, AI pipeline, payment and delivery, and dashboard/compliance phases complete on 2026-04-25 [evidence: [.planning/ROADMAP.md](.planning/ROADMAP.md)]. The current soul review on 2026-06-22 [evidence: dispatch current_date] reframes the next work as validation and correction, not feature expansion.

The root issue is that the dispatch calls this project `brooks-history`, while the repository evidence describes CivicState [evidence: dispatch project id, [package.json](package.json)]. Before wrk.vc can present it cleanly, the operator needs a clear ruling on whether this is a personal/research asset, a CivicState business, or a mismapped repository.

## Current Build Shape

Built evidence includes a Next.js web app, Express API routes, Prisma models, worker state machine, pricing tiers, payment webhook handling, official lookup, moderation, audit logs, delivery webhooks, and tests [evidence: [apps](apps), [packages/shared/prisma/schema.prisma](packages/shared/prisma/schema.prisma), [tests](tests)]. Business evidence does not yet include live customers, live revenue, live deliverability metrics, or live official response data [evidence: no production metrics files found in workspace].

## Next Critical Path

- [ ] Reconcile Current Thesis: operator confirms whether this repo should pitch as CivicState, brooks-history, or a research-only asset.
- [ ] Tighten Product Reality: run the local end-to-end flow and record which promised flows actually pass.
- [ ] Validate Customer Definition: recruit a small paid beta from residents with active civic issues and record reasons for purchase or refusal.
- [ ] Prove Revenue Model And Unit Economics: capture actual Stripe, LLM, email, and support cost per paid campaign.
- [ ] Verify Evidence Sources And Freshness: replace stale planning claims with current implementation evidence and dated operator notes.
- [ ] Harden Risks And Anti-Plan: fix the compliance export schema mismatch and document residual legal, deliverability, and provider-risk controls.
- [ ] Build Go To Market Evidence: test a single operator-led acquisition channel before investing in SEO or public campaign pages [assumption: EIR validation sequence].

## Success Gates

The next gate is not "more features." It is a validation gate. Continue only if users pay before delivery, citations verify, government email delivery succeeds, and the operator can manage review workload. The repo's older targets remain useful as targets, not facts: >=3% paid conversion, >=85% inbox placement, >=95% federal/state coverage, and >=60% local coverage [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)].

## Defer

Defer subscriptions, organization accounts, public campaign SEO pages, API access, crowdfunding integrations, certified mail, multilingual support, and automated follow-up until the validation gate is passed [evidence: [.planning/GENESIS.md](.planning/GENESIS.md)]. Those are scale bets; the current problem is proof.
