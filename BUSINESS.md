# CivicState / brooks-history — Business Plan

**Document date:** 2026-06-21 [evidence: runner context]. **Freshness:** workspace-only review; no network research was available, so repo facts are cited as [evidence] and all external market claims are labeled [assumption: basis]. **Investment posture:** Watchlist / personal-research asset, not near-term investible BOS until the operator confirms this should pitch as a business [evidence: dispatch registry note].

## Thesis

CivicState can become a paid constituent-communications product if ordinary residents will pay $5, $15, or $25 per campaign [evidence: `tests/payment.test.ts`] for AI-assisted, citation-backed letters that reach the correct government officials, but today it is a research-grade prototype whose investibility depends on demand, deliverability, official-data coverage, and legal/operator validation.

## Problem & Customer

The primary customer is a US resident with a concrete civic problem, a desired government action, and low confidence in official routing, legal framing, or formal letter writing [evidence: `.planning/PROJECT.md`]. The initial ICP is not advocacy organizations; it is the individual constituent who wants a professional letter without learning agencies, statutes, or political-office hierarchy [evidence: `.planning/PROJECT.md`].

Customer segments:

| Segment | Job to be done | Current alternative | Purchase trigger |
|---|---|---|---|
| Individual resident | Turn a civic concern into a sent letter | Manual search, email, phone call, or no action [assumption: common constituent behavior; must validate] | A visible issue such as housing, roads, permits, schools, utilities, or enforcement [assumption: likely civic categories; must validate] |
| Local organizer | Coordinate consistent letters without running a platform | Shared docs, petitions, email templates [assumption: common grassroots tooling; must validate] | A time-bound local decision or hearing [assumption: must validate] |
| Future nonprofit / HOA buyer | Add civic-letter workflow for members | Quorum, VoterVoice, manual CRM workflows [evidence: `.planning/PROJECT.md`; assumption: org workflow fit must validate] | Repeatable campaigns and reporting needs [assumption: must validate] |

## Market

Bottom-up market sizing is the only defensible method in workspace-only mode. The model treats "campaigns paid for by individual constituents" as the unit, not broad civic-engagement spend.

| Layer | Method | Annual value |
|---|---|---|
| TAM proxy | 260,000,000 US adults [assumption: public population memory; verify externally] x 10% with at least one annual civic issue they care enough to write about [assumption: unvalidated behavior] x 2% willing to pay [assumption: conservative paid-conversion guess] x $15 weighted average package [evidence: midpoint of tiers in `tests/payment.test.ts`] | $7,800,000 [assumption: arithmetic from stated assumptions] |
| SAM | 5,000,000 reachable online residents in early target geographies [assumption: launch-focus proxy; verify externally] x 2% willing to pay [assumption: unvalidated] x $15 weighted average package [evidence: `tests/payment.test.ts`] | $1,500,000 [assumption: arithmetic from stated assumptions] |
| SOM | 10,000 paid campaigns in the first 24 months [assumption: operator-led SEO/community target] x $15 weighted average package [evidence: `tests/payment.test.ts`] | $150,000 [assumption: arithmetic from stated assumptions] |

This is not venture-scale yet. The credible market question is whether a wedge can expand from one-off citizen letters into repeat local organizers and eventually nonprofit / HOA workflows.

## Product & Moat

What is real as of 2026-06-21 [evidence: runner context]: a pnpm monorepo named `civicstate` [evidence: `package.json`], Next.js web app surfaces [evidence: `apps/web/app/page.tsx`], Express API routes [evidence: `apps/api/src/index.ts`], BullMQ worker agents [evidence: `apps/worker/src/index.ts`], Prisma models for users, submissions, campaigns, letters, officials, payments, deliveries, ledgers, audit logs, and jobs [evidence: `packages/shared/prisma/schema.prisma`], payment-tier tests for $5 / $15 / $25 [evidence: `tests/payment.test.ts`], content-moderation tests [evidence: `tests/moderation.test.ts`], citation-verification tests [evidence: `tests/citation-verifier.test.ts`], and compliance / admin / delivery tests [evidence: `tests/*.test.ts`].

What remains unproven: real user demand, real official lookup quality, real legal-citation freshness, real email deliverability to government domains, real Stripe/Postmark/Clerk production credentials, and operator review load [assumption: inferred from repo tests and planning docs; production evidence absent].

The defensibility thesis is not "AI writes letters." The potential moat is a verified official-contact graph, a citation-verification workflow, deliverability reputation, moderation/audit history, and a data corpus of civic requests that improves routing and templates over time [assumption: product strategy; must validate].

## Platform Posture

CivicState should be treated as a WrkPlug client, not a standalone identity/billing chassis builder [assumption: WrkPlug Phase zero not yet signed]. If adopted, it should consume shared login, billing, identity, and EAI Layer-zero rails rather than duplicating auth, payment, and account infrastructure [assumption: portfolio architecture]. The cost/moat consequence is lower infrastructure drag and shared-rails compounding, but this must not be hard-wired until the operator approves the dependency [assumption: operator validation required].

## Business Model

Launch revenue is transactional: $5 single-official package, $15 three-official package, and $25 all-officials package [evidence: `tests/payment.test.ts`]. The repository also records a 40% net-margin floor [evidence: `.planning/REQUIREMENTS.md`] and tests variable-cost assumptions of $0.20, $0.40, and $0.60 per package [evidence: `tests/payment.test.ts`].

Unit economics, using the current test model:

| Tier | Price | Tested variable cost | Gross profit before fixed costs | Gross margin |
|---|---:|---:|---:|---:|
| Single official | $5.00 [evidence: `tests/payment.test.ts`] | $0.20 [evidence: `tests/payment.test.ts`] | $4.80 [evidence: arithmetic from `tests/payment.test.ts`] | 96.0% [evidence: arithmetic from `tests/payment.test.ts`] |
| Three officials | $15.00 [evidence: `tests/payment.test.ts`] | $0.40 [evidence: `tests/payment.test.ts`] | $14.60 [evidence: arithmetic from `tests/payment.test.ts`] | 97.3% [evidence: arithmetic from `tests/payment.test.ts`] |
| All officials | $25.00 [evidence: `tests/payment.test.ts`] | $0.60 [evidence: `tests/payment.test.ts`] | $24.40 [evidence: arithmetic from `tests/payment.test.ts`] | 97.6% [evidence: arithmetic from `tests/payment.test.ts`] |

The model only works if customers trust citation quality and delivery enough to pay before sending. A freemium preview with auth at payment is already in the planning narrative [evidence: `.planning/PROJECT.md`].

## Competition

| Competitor / substitute | Position | CivicState implication |
|---|---|---|
| Resistbot | Citizen-to-lawmaker messaging substitute named in prior soul [evidence: `.planning/PROJECT.md`] | CivicState must prove research/citation value, not just sending convenience. |
| Change.org | Petition-hosting substitute named in `MASTER_PLAN.md` [evidence: `MASTER_PLAN.md`] | CivicState competes on official delivery and individualized letters, not public signature volume. |
| Quorum | Enterprise advocacy platform named in prior soul [evidence: `.planning/PROJECT.md`] | Too heavy for individual consumers; future organization-buyer expansion must avoid enterprise feature creep. |
| VoterVoice | Advocacy platform named in prior soul [evidence: `.planning/PROJECT.md`] | Similar org-buyer risk; individual wedge must be validated first. |
| Phone2Action / Capitol Canary | Digital advocacy incumbent [assumption: market memory; verify externally] | Raises bar for nonprofit/association expansion. |
| Manual outreach | Free substitute [assumption: common behavior; must validate] | Price must buy time saved, confidence, and better framing. |

## Go-To-Market

The first 100 paying customers [assumption: launch validation target] should come from narrow civic pain, not generic "participate in democracy" messaging. Candidate wedges: tenant habitability issues, road/sidewalk repairs, school-board concerns, permitting delays, and utility-service complaints [assumption: likely high-intent categories; validate with interviews].

Validation plan:

| Step | Method | Success threshold |
|---|---|---|
| Landing-page waitlist | Drive issue-specific pages and measure intent | 100 waitlist signups [assumption: launch threshold] by 2026-08-15 [assumption: proposed milestone] |
| Concierge send | Operator reviews every paid campaign before delivery | 20 paid campaigns [assumption: validation threshold] with zero unresolved safety incidents [assumption: operator risk threshold] |
| Deliverability pilot | Send to known public official inboxes with consent or safe test routing | 85% inbox placement [evidence: `.planning/PROJECT.md` threshold] before scaling |
| Data coverage pilot | Compare official lookup output against manual research | 95% federal/state coverage and 60% local coverage [evidence: `.planning/PROJECT.md`] |

## Financial Model

The following three-year model is a planning scenario, not a forecast [assumption: no customer or revenue evidence]. Revenue reconciles as paid campaigns x weighted average revenue per campaign.

| Period | Paid campaigns | Weighted ARPU | Revenue | Variable cost | Fixed platform/tools | Operator/legal reserve | Operating result |
|---|---:|---:|---:|---:|---:|---:|---:|
| Validation year | 600 [assumption: 50/month average] | $15 [evidence: `tests/payment.test.ts`] | $9,000 [assumption: 600 x $15] | $600 [assumption: $1/campaign loaded cost] | $2,400 [assumption: lean hosting/tools] | $3,000 [assumption: review/legal budget] | $3,000 [assumption: arithmetic] |
| Early scale year | 3,000 [assumption: 250/month average] | $15 [evidence: `tests/payment.test.ts`] | $45,000 [assumption: 3,000 x $15] | $3,000 [assumption: $1/campaign loaded cost] | $6,000 [assumption: higher tools/provider costs] | $12,000 [assumption: operator/legal budget] | $24,000 [assumption: arithmetic] |
| Expansion year | 10,000 [assumption: 833/month average] | $15 [evidence: `tests/payment.test.ts`] | $150,000 [assumption: 10,000 x $15] | $10,000 [assumption: $1/campaign loaded cost] | $18,000 [assumption: scaled infra/tools] | $36,000 [assumption: part-time ops/legal] | $86,000 [assumption: arithmetic] |

Revenue assumptions: paid conversion of 2% [assumption: unvalidated], weighted ARPU of $15 [evidence: `tests/payment.test.ts`], refund/chargeback drag below 0.5% [evidence: `.planning/PROJECT.md` constraint].

Cost assumptions: loaded AI/delivery cost of $1 per campaign [assumption: higher than repo test values to include retries], initial fixed platform/tools cost of $2,400 per year [assumption: minimal production stack], operator/legal reserve of $3,000 in validation year [assumption: conservative manual review budget].

Sensitivity tests: if conversion is 0.5% [assumption: downside], validation-year campaigns fall to 150 [assumption: arithmetic] and revenue falls to $2,250 [assumption: 150 x $15]; if deliverability requires paid providers at $500/month [assumption: provider-cost scenario], validation fixed costs rise by $6,000 [assumption: arithmetic]; if operator review takes 12 minutes per campaign [assumption: workload test], 600 campaigns require 120 hours [assumption: arithmetic], which breaks the solo-operator premise.

## Risks & Anti-Plan

A skeptical partner should kill this plan unless the next validation tranche answers these holes:

| Hole | Why it can kill the business | Mitigation | Residual risk |
|---|---|---|---|
| People may not pay for civic letters | Free alternatives are obvious and emotional urgency may not translate to payment [assumption: behavior risk] | Concierge beta with paid checkout before delivery | High until paid conversion is observed |
| Official data may be wrong or stale | Sending to the wrong person destroys trust [assumption: product risk] | Coverage-confidence UI, manual audit sample, provider comparison | High for local officials |
| Government email deliverability may fail | The product promise depends on messages landing in inboxes [evidence: `.planning/PROJECT.md`] | Domain warming, per-domain bounce pauses, Postmark monitoring [evidence: `.planning/REQUIREMENTS.md`] | Medium/high until pilot evidence |
| Legal/compliance posture may be fragile | The product touches political opinion, AI disclosure, CAN-SPAM, privacy, and "not legal advice" boundaries [evidence: `.planning/REQUIREMENTS.md`] | Counsel review before public launch | High until counsel signs off |
| Registry posture says research asset | The portfolio already flags this as not near-term investible [evidence: dispatch registry note] | Treat as watchlist until operator ruling | High unless strategy changes |

## Assumption Ledger

| Claim | Basis | Evidence-or-assumption | Test |
|---|---|---|---|
| Users will pay $5 to $25 [evidence: `tests/payment.test.ts`] for delivery | Existing pricing tiers | [evidence: `tests/payment.test.ts`] | Run paid concierge beta |
| Weighted ARPU can be $15 [evidence: `tests/payment.test.ts`] | Midpoint of current tiers | [evidence: `tests/payment.test.ts`] | Track tier mix after first 50 paid campaigns [assumption: validation sample] |
| 2% paid conversion is plausible [assumption: no repo evidence] | Conservative direct-response guess | [assumption: no repo evidence] | Measure preview-to-pay conversion |
| 85% inbox placement is needed [evidence: `.planning/PROJECT.md`] | Prior planning gate | [evidence: `.planning/PROJECT.md`] | Deliverability pilot |
| Local coverage is the hardest official-data gap | Prior planning concern | [evidence: `.planning/STATE.md`] | Compare Cicero/BallotReady/manual lookup |
| A solo operator can manage exceptions | Product design assumption | [assumption: no production evidence] | Time manual review minutes per campaign |
| WrkPlug shared rails lower cost | Portfolio architecture assumption | [assumption: WrkPlug Phase zero not yet signed] | Operator approval and integration spike |

## Self-Valuation

Current score: 46/100 [assumption: EIR judgment from repo maturity, registry watchlist, and unvalidated demand]. Method: discounted milestone value under the $5,000,000 per-business program assumption [assumption: wrk.vc program framing from brief], with comparables Resistbot, Change.org, Quorum, and VoterVoice used as category anchors [evidence: `.planning/PROJECT.md` and `MASTER_PLAN.md` for named competitors; external values not used].

| Scenario | 12-month value band [assumption: valuation horizon] | Why |
|---|---:|---|
| Bear | $25,000 to $75,000 [assumption: asset value of code/research only] | No paid conversion or deliverability proof |
| Base | $150,000 to $350,000 [assumption: validated narrow wedge, low revenue] | Paid beta works but remains niche |
| Bull | $750,000 to $1,500,000 [assumption: repeatable growth plus clean compliance] | Meaningful paid campaigns, reliable official data, and operator-ready rails |

What moves valuation: verified paid conversion above 3% [evidence: `.planning/PROJECT.md` validation gate], inbox placement above 85% [evidence: `.planning/PROJECT.md`], local official coverage above 60% [evidence: `.planning/PROJECT.md`], and legal review completed before public scale [assumption: investor diligence requirement].

## Milestones

| Date | Milestone | Pass condition |
|---|---|---|
| 2026-06-21 [evidence: runner context] | Soul upgrade complete | Business, roadmap, decisions, and gate artifacts exist |
| 2026-07-15 [assumption: proposed validation date] | Operator ruling | Confirm whether this remains personal/research or becomes a business pitch |
| 2026-08-15 [assumption: proposed validation date] | Concierge beta ready | Manual review path, payment, and safe delivery pilot defined |
| 2026-09-30 [assumption: proposed validation date] | Evidence gate | Paid conversion, deliverability, coverage, and review-load metrics collected |

## Surprise Spikes

The repo identity is inconsistent: dispatch names `brooks-history` / `RPLogic-Inc/brookss-history`, while the current code and planning docs describe `CivicState` [evidence: dispatch; `package.json`; `.planning/PROJECT.md`]. This must be resolved before wrk.vc presentation.

The planning audit says zero application code existed [evidence: `.planning/existing-state.md`], but the current workspace has API, web, worker, Prisma, and tests [evidence: `apps/`, `packages/shared/prisma/schema.prisma`, `tests/`]. The soul therefore treats old "not built" statements as stale.

The old roadmap marks all phases complete on 2026-04-25 [evidence: `.planning/ROADMAP.md`], yet `.planning/STATE.md` says current focus is Phase Foundation and phase two planning is needed [evidence: `.planning/STATE.md`]. The new roadmap resets around validation rather than accepting every checkmark as production truth.

## Evidence Sources

- `package.json` — product name, repo package description, monorepo scripts [evidence].
- `.planning/PROJECT.md` — original product thesis, pricing, customer, constraints, and competitor notes [evidence].
- `.planning/REQUIREMENTS.md` — requirements, compliance posture, pricing, data retention, and delivery constraints [evidence].
- `.planning/ROADMAP.md` — prior phase narrative and completion claims [evidence].
- `.planning/STATE.md` and `.planning/existing-state.md` — stale/current-state conflict [evidence].
- `packages/shared/prisma/schema.prisma`, `apps/**`, and `tests/*.test.ts` — implemented surfaces and tested behavior [evidence].
- Dispatch registry note — watchlist / personal-research posture [evidence].
