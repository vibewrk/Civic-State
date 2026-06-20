# CivicState Roadmap

## Existing Narrative

CivicState's existing roadmap describes four phases: foundation, AI pipeline, payment and delivery, and dashboard and compliance [evidence: `.planning/ROADMAP.md`]. The plan preserves the original product arc: build the monorepo and infrastructure, prove official lookup and citation-backed drafting, add Stripe/Postmark delivery, then complete dashboards, admin tooling, and compliance pages [evidence: `.planning/ROADMAP.md`, `.planning/REQUIREMENTS.md`].

The roadmap status needs a reset for business-readiness. `.planning/ROADMAP.md` marks all four phases complete on 2026-04-25 [evidence: `.planning/ROADMAP.md`], but `.planning/REQUIREMENTS.md` still lists many launch requirements as unchecked [evidence: `.planning/REQUIREMENTS.md`]. For wrk.vc/data-room purposes, treat the build as implemented-in-progress until production evidence exists for payments, delivery, citation verification, user dashboards, compliance workflows, and operator validation.

## Buildable Shape

The business plan now depends on narrow validation gates, not broad feature expansion. Each next step below is single-worker-sized and maps to a `BUSINESS.md` heading for traceability.

## Next Buildable Steps

- [ ] **Thesis Current:** add a lightweight launch-readiness checklist that reports payment, delivery, official lookup, citation verification, and admin-review status from existing routes.
- [ ] **Customer Definition:** create a beta intake form or admin note field that captures user segment, issue category, ZIP code, and whether the user would pay before checkout.
- [ ] **Market Sizing:** add a wedge coverage script that samples representative ZIP codes and reports federal, state, and local official-match rates.
- [ ] **Revenue Model:** reconcile the $15 three-pack vs five-draft package conflict and update pricing constants, UI copy, and unit-economics notes to match one package definition.
- [ ] **Financial Model:** add a simple transaction economics report that computes revenue, Stripe fees, estimated token cost, delivery cost, and gross margin per campaign.
- [ ] **Go To Market:** instrument the preview-to-paid funnel so beta traffic can report qualified previews, checkouts started, payments completed, and delivered campaigns.
- [ ] **Risks And Anti-Plan:** add operator-facing queues for citation failures, moderation flags, official lookup gaps, delivery bounces, and daily review minutes.
- [ ] **Evidence Sources:** refresh `.planning/existing-state.md` or replace it with a current implementation audit so the data room no longer contradicts the codebase.

## Validation Gates

The next roadmap milestone is not another broad feature phase. It is a launch-readiness proof package:

| Gate | Target | Label |
|---|---:|---|
| Paid conversion | 3% of qualified previews | [evidence: `.planning/PROJECT.md`; assumption: target threshold] |
| Delivery success | 85% inbox placement or accepted delivery on official domains | [evidence: `.planning/PROJECT.md`; assumption: target threshold] |
| Federal/state coverage | 95% coverage in selected wedge | [evidence: `.planning/PROJECT.md`; assumption: target threshold] |
| Local coverage | 60% coverage in selected wedge | [evidence: `.planning/PROJECT.md`; assumption: target threshold] |
| Routine operator load | Under 30 minutes per day | [evidence: `.planning/PROJECT.md`; assumption: target threshold] |

## Deferred

Do not prioritize organization/API sales, certified mail, fax delivery, multilingual support, social/community mechanics, or coalition features until the individual paid letter workflow proves demand and operational reliability [evidence: `.planning/GENESIS.md`, `.planning/REQUIREMENTS.md`].
