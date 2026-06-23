# Brooks History / CivicState Roadmap

## Current Position

As of `2026-06-23` [evidence: worker current_date], the repo contains a CivicState application surface, not a Brooks-history content product [evidence: `package.json`; evidence: `apps/web/app/page.tsx`; evidence: `apps/api/src/index.ts`]. The prior `.planning/ROADMAP.md` narrative claimed all phases complete [evidence: `.planning/ROADMAP.md`], while `.planning/REQUIREMENTS.md` still marks many launch requirements pending [evidence: `.planning/REQUIREMENTS.md`]. This roadmap preserves the existing CivicState direction but reframes it as buildable validation work.

## Existing Narrative Preserved

The original plan describes a pipeline from civic frustration to official action: issue submission, official lookup, regulation research, citation verification, letter drafting, payment, delivery, dashboards, admin tooling, treasury, and compliance [evidence: `.planning/ROADMAP.md`; evidence: `.planning/PROJECT.md`]. That remains the product narrative, but the business plan now treats it as unvalidated until paid users and deliverability data exist [assumption: EIR synthesis].

## Operating Principle

Roadmap work must serve the business gates in `BUSINESS.md`: customer definition, product reality, market sizing, revenue model, financial model, go to market, competition, risks, assumption ledger, and surprise spikes [evidence: `BUSINESS.md`]. No new speculative features should be added before the first paid validation loop [assumption: validation discipline].

## Buildable Next Steps

- [ ] **Snapshot Thesis**: Add an operator-facing note confirming whether the public asset should be framed as CivicState, Brooks History, or personal/research only [evidence: registry dispatch note].
- [ ] **Product Reality**: Run the current local submission-to-payment-to-delivery path with mocked providers and record which steps pass, fail, or require credentials [evidence: `apps/api/src/routes/submissions.ts`; evidence: `apps/api/src/routes/payments.ts`; evidence: `apps/worker/src/agents/delivery.ts`].
- [ ] **Customer Definition**: Define the first beta wedge as one geography and one civic issue type before recruiting users [assumption: narrow beta is required to measure coverage and review load].
- [ ] **Revenue Model and Pricing**: Verify Stripe Checkout tier behavior for `$5`, `$15`, and `$25` packages without changing prices [evidence: `apps/api/src/routes/payments.ts`].
- [ ] **Financial Model**: Add measurement hooks or a simple operating log for vendor cost, token cost, email cost, refunds, and operator review minutes [assumption: current financial model lacks real bills].
- [ ] **Go To Market**: Recruit a manual paid beta cohort before SEO or public campaign pages [assumption: no traffic evidence exists].
- [ ] **Risks and Anti-Plan**: Test government-domain deliverability and local official coverage before claiming the full value proposition [evidence: `.planning/PROJECT.md`; evidence: `apps/api/src/lib/officials/cicero.ts`].
- [ ] **Assumption Ledger**: Update `BUSINESS.md` only with measured conversion, coverage, deliverability, and review-load data after the beta [assumption: prevents factory output from becoming false evidence].

## Deferred Until Validation

- Public campaign SEO pages beyond private beta needs [evidence: `.planning/GENESIS.md`; assumption: SEO should wait for privacy and delivery proof].
- Organization/API buyer motion [evidence: `.planning/REQUIREMENTS.md`].
- Certified mail, fax, multilingual support, mobile apps, and automated follow-ups [evidence: `.planning/REQUIREMENTS.md`].
- Fundraising or wrk.vc investible positioning [evidence: registry dispatch note; assumption: business proof absent].

## Validation Gates

- Paid conversion at or above `3%` [evidence: `.planning/PROJECT.md`].
- Government inbox placement at or above `85%` [evidence: `.planning/PROJECT.md`].
- Federal/state official coverage at or above `95%` and local coverage at or above `60%` [evidence: `.planning/PROJECT.md`].
- Chargeback rate below `0.5%` [evidence: `.planning/PROJECT.md`].
- Human review workload low enough that `$5` to `$25` transactions still make sense [evidence: `apps/api/src/routes/payments.ts`; assumption: operator workload threshold not yet measured].

## Review Cadence

Next soul review should occur after the first paid beta cohort or by `2026-07-07` [assumption: two-week review cadence from `2026-06-23`], whichever comes first.
