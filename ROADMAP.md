# CivicState Roadmap

**Document date:** 2026-06-19 [evidence: worker dispatch current-date context]  
**Roadmap status:** Buildable validation roadmap, aligned to `BUSINESS.md`.

## Current Position

The repo contains a broad implementation skeleton and many working surfaces, but it is not yet launch-proven. `.planning/ROADMAP.md` marks phases complete [evidence], while `.planning/REQUIREMENTS.md` still marks many v1 requirements pending [evidence]. This roadmap resolves that by focusing on validation gates, not phase optimism.

## Buildable Shape

- [ ] **Snapshot Thesis:** Resolve the `brooks-history` versus CivicState identity mismatch in operator-facing registry metadata.
- [ ] **Product Reality:** Run staging smoke tests for submit, classify, research, draft, preview, checkout, webhook, delivery, dashboard, and compliance export.
- [ ] **Customer Definition:** Recruit a controlled beta cohort of `25` to `50` U.S. residents [assumption: practical operator-led validation size].
- [ ] **Revenue Model and Pricing:** Verify `$5`, `$15`, and `$25` checkout tiers end-to-end with Stripe test mode [evidence: apps/api/src/routes/payments.ts].
- [ ] **Market Sizing:** Sample `50` ZIP codes for federal, state, and local official coverage [assumption: enough to expose API gaps].
- [ ] **Risks and Anti-Plan:** Complete deliverability test sends and measure against the `85%` inbox-placement gate [evidence: .planning/PROJECT.md].
- [ ] **Assumption Ledger:** Review `30` generated letters for citation accuracy, tone, and legal-risk language [assumption: early manual QA batch].
- [ ] **Go To Market:** Open only after preview-to-payment conversion reaches `3%` or higher in beta [evidence: .planning/PROJECT.md].

## Validation Phase

Goal: prove that a single user can create a legitimate civic concern, receive verified research, preview letters, pay, and get delivery tracking without operator heroics.

Exit criteria:

- `1` complete staging workflow with real external credentials or documented test-mode substitutions [assumption: minimum launch dry run].
- Official coverage report by jurisdiction level and ZIP sample [assumption: must precede paid launch].
- Measured moderation false-positive and false-negative review notes [assumption: civic workflows need trust calibration].
- Ledger and payment records reconcile to within `$0.10` [evidence: apps/worker/src/lib/treasury.ts].

## Beta Phase

Goal: validate willingness to pay and operational burden.

Exit criteria:

- `100` beta submissions invited or attempted [assumption: controlled validation cohort].
- Preview-to-payment conversion at or above `3%` [evidence: .planning/PROJECT.md].
- Chargeback/complaint rate below `0.5%` [evidence: .planning/PROJECT.md].
- Operator routine workload below `30` minutes per day [evidence: .planning/PROJECT.md].

## Launch Phase

Goal: cautiously open traffic once core risks are measured.

Exit criteria:

- Production deployment checklist complete for Vercel frontend and DigitalOcean backend [evidence: .planning/PROJECT.md].
- SPF, DKIM, and DMARC records verified and monitored [evidence: scripts/setup-dns.md].
- Local official provider decision made: Cicero, BallotReady, or explicit local-coverage exclusion [evidence: apps/api/src/lib/officials/cicero.ts; .planning/PROJECT.md].
- Terms, privacy, AI disclosure, opt-out handling, and data deletion flow reviewed by operator and counsel [assumption: legal review needed; no counsel memo in repo].

## Expansion Phase

Only after the paid consumer loop works:

- Add public campaign pages and SEO if users explicitly opt in [evidence: MASTER_PLAN.md].
- Evaluate nonprofit/HOA/API buyers only after consumer fulfillment is stable [evidence: .planning/REQUIREMENTS.md].
- Consider certified mail or fax fallback only when email deliverability blocks paid value [evidence: .planning/REQUIREMENTS.md].

## Out of Scope Until Validated

- Subscriptions [evidence: MASTER_PLAN.md].
- Legal filings, regulatory submissions, or claims [evidence: .planning/REQUIREMENTS.md].
- Automated follow-up campaigns [evidence: .planning/REQUIREMENTS.md].
- Venture-scale TAM claims without external research [assumption: workspace-only mode prevents current market sourcing].
