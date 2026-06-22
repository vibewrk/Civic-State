# Brooks History / CivicState - Roadmap

Last updated: 2026-06-22 [evidence: dispatch current_date]. This roadmap merges the existing CivicState narrative with the EIR business plan and keeps the next work single-worker-sized.

## Narrative

The existing roadmap says CivicState moves from foundation to AI pipeline, payment and delivery, then dashboard and compliance [evidence: .planning/ROADMAP.md]. That narrative still fits the product evidenced in code, but the root soul must treat the current repo as draft because the dispatch identity is Brooks History while the implementation is CivicState [evidence: dispatch; package.json].

The roadmap serves the business plan: prove a narrow paid workflow before expanding into public campaign pages, organization APIs, subscriptions, or broader civic infrastructure [evidence: BUSINESS.md; .planning/GENESIS.md].

## Now

- [ ] Thesis: resolve whether this repo is Brooks History or CivicState, and update the operator-facing positioning without touching product code.
- [ ] Problem & Customer: define the first beta customer segment and the issue categories allowed for the first paid tests.
- [ ] Market: replace the $150,000,000 TAM assumption with sourced market evidence or a smaller operator-approved market envelope [assumption: BUSINESS.md model].
- [ ] Business Model: run a checkout-through-delivery dry run for the $5, $15, and $25 tiers [evidence: apps/api/src/routes/payments.ts].
- [ ] Product & Moat: verify that citation verification, official lookup, draft generation, and letter preview produce auditable artifacts for one sample ZIP code.
- [ ] Go-To-Market: recruit the first 100 submission attempts through operator-led channels and record every reason for non-conversion [assumption: BUSINESS.md first-customer plan].
- [ ] Risks & Anti-Plan: test government-email deliverability against the 85% gate before broad paid delivery [evidence: .planning/PROJECT.md].

## Next

After the Now checklist clears, the next sequence is paid beta, official coverage measurement, and a go/no-go decision on whether to keep this as a research asset or promote it to an investible wrk.vc business [evidence: dispatch registry note; BUSINESS.md].

Do not add enterprise APIs, subscriptions, public campaign SEO pages, certified mail, fax, or multi-language support until the $5 to $25 individual transaction model has live evidence [evidence: .planning/GENESIS.md; .planning/REQUIREMENTS.md].

## Validation Gates

Continue only if preview-to-payment conversion reaches 3% or better [evidence: .planning/PROJECT.md], deliverability reaches 85% or better [evidence: .planning/PROJECT.md], federal/state official coverage reaches 95% or better [evidence: .planning/PROJECT.md], and local coverage reaches 60% or better [evidence: .planning/PROJECT.md].

If any gate misses, the roadmap changes to research mode: document failure mode, remove venture language from wrk.vc, and preserve the codebase as a personal/research asset [evidence: dispatch registry note].

## Buildable Shape

Each Now item is scoped for one worker because it is either documentation, a contained dry run, a sample workflow verification, or a beta-operating task. None requires new infrastructure or speculative product expansion [assumption: EIR implementation judgment].
