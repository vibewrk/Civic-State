# CivicState Roadmap

## Overview
CivicState's existing planning narrative describes a four-phase build: foundation, AI pipeline, payment and delivery, and dashboard/compliance [evidence: [.planning/ROADMAP.md](.planning/ROADMAP.md)]. The root roadmap now aligns that build narrative with the business plan: prove paid demand, government deliverability, official coverage, and legal-adjacent safety before scaling acquisition.

## Preserved Existing Narrative
The workspace roadmap says Phase 1 Foundation, Phase 2 AI Pipeline, Phase 3 Payment & Delivery, and Phase 4 Dashboard & Compliance are complete as of 2026-04-25 [evidence: [.planning/ROADMAP.md](.planning/ROADMAP.md)]. The requirements file is more conservative: many product requirements remain pending even while infrastructure and some implementation files exist [evidence: [.planning/REQUIREMENTS.md](.planning/REQUIREMENTS.md)]. The build plan should resolve that mismatch through verification, not new scope.

## Business-Plan Alignment
The plan's gating thesis is simple: do not invest behind scale until CivicState proves preview-to-payment conversion, .gov deliverability, official coverage, and citation safety [evidence: [BUSINESS.md](BUSINESS.md)]. Roadmap work must therefore prefer instrumentation, validation, and operator controls over more features.

## Buildable Next Work (wrk.dog)
- [ ] Problem & Customer: add a beta-cohort tracking note that records source, issue category, preview completion, and paid checkout outcome.
- [ ] Market: add a small validation report template for TAM/SAM/SOM assumptions and actual paid-submission volume.
- [ ] Product & Moat: verify the submission-to-research-to-preview path against current API, worker, and frontend code and document gaps.
- [ ] Business Model: instrument tier selection, Stripe checkout starts, completed payments, refunds, and chargebacks against the $5-$25 pricing model [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)].
- [ ] Competition: add a one-page substitute analysis for Resistbot, Change.org, Quorum, VoterVoice, LegalZoom, and manual email.
- [ ] Go-To-Market: run a manually sourced beta cohort before any SEO/public-campaign scaling.
- [ ] Risks & Anti-Plan: complete the official-provider spike and record Cicero/BallotReady/local deferral decision.
- [ ] Assumption Ledger: refresh the root BUSINESS.md assumptions after each validation milestone.

## Validation Gates
Preview-to-checkout conversion must reach 3.0% [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)]. Government-domain inbox placement must reach 85.0% [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)]. Chargebacks must stay below 0.5% [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)]. Official coverage should target 95.0% federal/state and 60.0% local before broad launch [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)].

## Dates
2026-06-20 [evidence: worker dispatch current_date]: root soul upgraded for wrk.dog scrutiny.

2026-07-15 [assumption: operator schedule]: official-provider decision due.

2026-08-31 [assumption: operator schedule]: deliverability and paid beta results due.
