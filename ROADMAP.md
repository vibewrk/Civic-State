# CivicState Roadmap

**As-of date:** 2026-06-22 [evidence: worker dispatch current_date].  
**Status:** Build appears structurally advanced in code, but commercial validation is not evidenced [evidence: [apps](apps), [packages](packages), [.planning/ROADMAP.md](.planning/ROADMAP.md)].

## Existing Narrative

The original roadmap describes four phases: foundation, AI pipeline, payment and delivery, and dashboard/compliance [evidence: [.planning/ROADMAP.md](.planning/ROADMAP.md)]. That narrative still fits the product: a resident submits an issue, CivicState identifies officials, researches citations, drafts letters, takes payment, sends letters, tracks delivery, and preserves audit/compliance records [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)].

The important correction is that roadmap completion is not the same as business readiness. The code may cover the planned workflow, but the repo does not show live credentials, production deployment, paid customers, deliverability results, or official response outcomes [assumption: workspace review found no production metrics].

## Buildable Shape

The next roadmap should be validation-first and sized for single-worker tasks. Each item maps to a BUSINESS.md heading.

- [ ] **Product And Current State:** Run a local end-to-end smoke test from `/submit` through API job creation, preview, Stripe test checkout, webhook handling, and dashboard status [evidence: code paths exist in apps/web and apps/api].
- [ ] **Customer Definition:** Create a closed-beta intake rubric for one civic issue category and one geography, including exclusion rules for legal claims and threats [assumption: focused beta reduces moderation and demand ambiguity].
- [ ] **Revenue Model:** Instrument preview-to-payment conversion, blended price, Stripe fee, AI cost, Postmark cost, and margin per campaign [assumption: live ledger needed to replace estimates].
- [ ] **Go-To-Market:** Launch a manual beta with one operator-reviewed cohort before any SEO or paid acquisition push [assumption: trust and deliverability should be validated before scale].
- [ ] **Market Sizing:** Replace bottom-up scenario assumptions with actual paid campaign counts, repeat use, and channel source data from the beta [assumption: real funnel data is the first credible sizing input].
- [ ] **Competition:** Run a workspace-plus-network competitor refresh on Resistbot, Change.org, LegalZoom, Quorum, and VoterVoice before any investor-facing materials [assumption: current competitor claims are repo-derived and stale].
- [ ] **Risks And Anti-Plan:** Complete the Cicero versus BallotReady spike and a .gov deliverability test before expanding beyond one geography [evidence: local official provider and deliverability are known blockers in [.planning/STATE.md](.planning/STATE.md)].

## Validation Gates

Proceed only if these gates clear:

- Preview-to-payment conversion reaches at least 3% [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)].
- Government email inbox placement reaches at least 85% [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)].
- Federal/state official coverage reaches at least 95% and local coverage reaches at least 60% [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)].
- Net margin remains above 40% after Stripe, AI, email, and infrastructure costs [evidence: [.planning/REQUIREMENTS.md](.planning/REQUIREMENTS.md)].

## Deferred

- Public campaign SEO flywheel, organization API access, priority complex review, certified mail, fax, reply summarization, and dynamic pricing remain deferred until the paid individual workflow proves repeatable [evidence: [MASTER_PLAN.md](MASTER_PLAN.md), [.planning/REQUIREMENTS.md](.planning/REQUIREMENTS.md)].
