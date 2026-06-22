# CivicState / Brooks History — Business Plan

## Thesis

As of 2026-06-22 [evidence: wrk.dog dispatch], CivicState is best treated as a personal/research civic-tech asset, not a near-term investible business, unless the operator validates that citizens will pay for AI-assisted constituent letters and that public officials will tolerate the delivery channel [evidence: wrk.dog registry note]. The falsifiable thesis is: if a user can describe a local civic issue, receive verified citations, and send a respectful letter for $5/$15/$25 [evidence: `apps/api/src/routes/payments.ts`; `tests/payment.test.ts`], then a narrow wedge of civic-engaged consumers will pay often enough to support a small owner-operated service [assumption: no repo evidence of paying customers].

## Problem & Customer

The customer is an individual constituent with a concrete civic concern, a ZIP code, and a desired government action [evidence: `apps/api/src/routes/submissions.ts`; `apps/web/app/submit/page.tsx`]. The current product is not for law firms, campaigns, PACs, regulated lobbying programs, insurance claims, medical claims, or legal demand notices [evidence: `MASTER_PLAN.md`; `apps/worker/src/agents/drafter.ts`].

The high-intent customer segments are:

- Time-poor local constituents who know what they want changed but do not know which official to contact [assumption: inferred from product workflow, no customer interviews in repo].
- Issue organizers who need polite, citation-backed letters without building a petition or community platform [assumption: inferred from product positioning].
- Civic hobbyists who value a searchable record of issue advocacy, if publication is later enabled [assumption: publication is described in `MASTER_PLAN.md`, but not evidenced as shipped].

Alternatives today include manually emailing elected officials, Resistbot, Change.org, Countable, Common Cause action tools, and hiring legal/document help such as LegalZoom for adjacent document drafting [assumption: market map from model knowledge, no network research available].

## Market

Workspace-only market sizing uses a bottom-up willingness-to-pay model, not a top-down civic-tech TAM claim.

| Scope | Method | Annual volume | Blended price | Annual revenue |
| --- | --- | ---: | ---: | ---: |
| TAM | U.S. issue-driven paid civic-letter purchases | 1,000,000 purchases/year [assumption: unvalidated demand proxy] | $13.00 [assumption: midpoint blend of repo tiers] | $13,000,000 [assumption: 1,000,000 x $13.00] |
| SAM | Reachable early SEO/direct-response audience | 100,000 purchases/year [assumption: 10.0% of TAM proxy] | $13.00 [assumption] | $1,300,000 [assumption: 100,000 x $13.00] |
| SOM | Owner-operated validation year | 1,200 purchases/year [assumption: 100 purchases/month validation case] | $13.00 [assumption] | $15,600 [assumption: 1,200 x $13.00] |

This sizing is intentionally conservative and weakly evidenced. The registry marks the project as watchlist/personal-research, so the current investment posture should require market validation before treating the asset as a BOS candidate [evidence: wrk.dog registry note].

## Product & Moat

Real as of 2026-06-22 [evidence: repo inspection]:

- A Next.js submission wizard for issue, outcome, ZIP code, research wait state, and letter preview [evidence: `apps/web/app/submit/page.tsx`].
- An Express API that validates submissions, applies moderation, stores submissions, and queues classifier jobs [evidence: `apps/api/src/routes/submissions.ts`].
- A PostgreSQL schema covering users, submissions, campaigns, letters, officials, payments, deliveries, ledger entries, audit logs, and agent action logs [evidence: `packages/shared/prisma/schema.prisma`].
- AI researcher and drafter workers constrained to verified legal/civic sources and required disclosures [evidence: `apps/worker/src/agents/researcher.ts`; `apps/worker/src/agents/drafter.ts`].
- Stripe pricing tiers at $5.00, $15.00, and $25.00 [evidence: `apps/api/src/routes/payments.ts`; `tests/payment.test.ts`].
- Postmark delivery logic with opt-out, invalid-email, and high-bounce safeguards [evidence: `apps/worker/src/agents/delivery.ts`].

Not real yet, or not evidenced in the repo:

- Paying customers: 0 evidenced customers [evidence: no customer data files found during workspace inspection].
- Official response rates: 0 evidenced response-rate records [evidence: no production metrics found during workspace inspection].
- SEO traffic engine: 0 evidenced indexed public campaign pages [evidence: no publication route found during workspace inspection].
- Legal/compliance clearance: 0 external legal opinions in repo [evidence: workspace inspection].

The defensible wedge, if it exists, is not proprietary AI. It is the narrow operational system: verified source retrieval, respectful civic framing, audit logs, payment-before-send, official suppression, and repeatable delivery controls [evidence: `MASTER_PLAN.md`; `apps/worker/src/agents/researcher.ts`; `apps/worker/src/agents/delivery.ts`].

## Platform Posture

Per wrk.vc portfolio posture, this venture should be a WrkPlug client, not a standalone auth/billing/identity company [assumption: WrkPlug Phase 0 not yet signed]. It should consume shared chassis services where available: single MCPWrk login, shared billing, shared identity, and shared EAI Layer-0 contracts [assumption: D-032 portfolio architecture not present in this repo].

The consequence is lower infra and CAC burden if WrkPlug exists, but the plan must not hard-wire that dependency until the operator confirms adoption [assumption: platform availability unvalidated]. In the standalone repo today, CivicState already uses Clerk, Stripe, Postmark, Redis/BullMQ, PostgreSQL, and Anthropic-facing workers [evidence: `package.json`; `MASTER_PLAN.md`].

## Business Model

Revenue model:

- Single-official letter package: $5.00 [evidence: `apps/api/src/routes/payments.ts`].
- Three-official package: $15.00 [evidence: `apps/api/src/routes/payments.ts`].
- Full-spread package: $25.00 [evidence: `apps/api/src/routes/payments.ts`].
- Future organization/API access: $99/month starter price [assumption: not in active repo; requires separate compliance and abuse review].

Unit economics in tests use cost estimates of $0.20, $0.40, and $0.60 per tier and assert margins greater than 90.0% [evidence: `tests/payment.test.ts`]. The master plan also states a 40.0% net-margin floor before presenting a job [evidence: `MASTER_PLAN.md`].

Revenue only counts after Stripe webhook-confirmed payment; the code path rejects unauthenticated payment requests and creates pending payment records before fulfillment [evidence: `apps/api/src/routes/payments.ts`; `tests/payment.test.ts`].

## Competition

| Competitor/substitute | What they own | CivicState position |
| --- | --- | --- |
| Manual email to officials | Free and familiar [assumption: common behavior] | CivicState must save research/routing time and improve letter quality enough to justify $5.00+ [evidence: repo pricing]. |
| Resistbot | Low-friction lawmaker contact by SMS [assumption: model knowledge, no network] | CivicState positions on citations, research, and more formal letters [assumption: differentiation from repo value prop]. |
| Change.org | Petition discovery and social proof [assumption: model knowledge, no network] | CivicState positions on direct official delivery, not signature accumulation [assumption]. |
| Countable/Common Cause action tools | Advocacy workflows around public issues [assumption: model knowledge, no network] | CivicState positions as issue-agnostic constituent tooling [assumption]. |
| LegalZoom/DIY document tools | Paid document workflows [assumption: model knowledge, no network] | CivicState must avoid legal-advice framing and stay in constituent communications [evidence: `MASTER_PLAN.md`; `apps/worker/src/agents/drafter.ts`]. |

## Go-To-Market

The first 100 paying customers [assumption: GTM target, no pipeline evidenced] should come from narrow, searchable civic problems rather than broad brand marketing:

- Publish issue-specific landing pages only after compliance review, starting with low-risk municipal categories such as roads, trash, noise, permits, parks, and transit [assumption: category strategy].
- Use the product itself to create opt-in read-only campaign summaries after payment, but only when anonymity and moderation rules pass [evidence: `MASTER_PLAN.md`; publication not evidenced as shipped].
- Recruit local civic newsletters, neighborhood forums, and small nonprofit organizers as referral partners [assumption: channel hypothesis].
- Run concierge validation for 20 paid users [assumption: validation sample size] before scaling automated delivery.

Primary activation metric: paid campaigns per 100 submission starts [assumption: no analytics events evidenced]. Primary trust metric: percent of letters with verified citations and no human-review escalation [evidence: researcher/drafter controls exist; metric not yet instrumented].

## Financial Model

Scenario assumptions are deliberately labeled and do not claim current traction.

| Line | Validation case | Base case | Growth case |
| --- | ---: | ---: | ---: |
| Paid campaigns | 300 [assumption: validation case] | 1,200 [assumption: SOM case] | 4,800 [assumption: growth case] |
| Blended price | $13.00 [assumption] | $13.00 [assumption] | $13.00 [assumption] |
| Gross revenue | $3,900 [assumption: 300 x $13.00] | $15,600 [assumption: 1,200 x $13.00] | $62,400 [assumption: 4,800 x $13.00] |
| Variable AI/delivery cost | $180 [assumption: 300 x $0.60 conservative cap from `tests/payment.test.ts`] | $720 [assumption: 1,200 x $0.60] | $2,880 [assumption: 4,800 x $0.60] |
| Payment processing | $117 [assumption: 3.0% card-processing heuristic, not verified] | $468 [assumption: 3.0%] | $1,872 [assumption: 3.0%] |
| Cloud/tools | $3,600 [assumption: $300/month owner-operated stack] | $3,600 [assumption] | $6,000 [assumption: scale cushion] |
| Gross contribution after listed costs | $3 [assumption: $3,900 - $180 - $117 - $3,600] | $10,812 [assumption] | $51,648 [assumption] |

Revenue assumptions:

- Blended price is $13.00 [assumption: midpoint blend across $5/$15/$25 repo tiers].
- Conversion from submission start to paid campaign reaches 5.0% [assumption: unvalidated consumer checkout behavior].
- Repeat purchase rate reaches 15.0% annually [assumption: civic issues are episodic, not daily].

Cost assumptions:

- Conservative variable cost is $0.60 per paid campaign [evidence: highest cost estimate in `tests/payment.test.ts`; extrapolated as assumption for average].
- Payment processing is 3.0% of revenue [assumption: generic card heuristic, no Stripe contract in repo].
- Operator labor is $0 cash cost in the validation model but is not free economically [assumption: owner-operated validation].

Sensitivity tests:

- Downside conversion at 1.0% [assumption] makes SEO volume or partnerships mandatory.
- Bounce/complaint constraints above 10.0% pause delivery domains [evidence: `apps/worker/src/agents/delivery.ts`], which can cap volume even if demand exists.
- If blended price falls to $7.00 [assumption], the 2027 base revenue becomes $8,400 [assumption: 1,200 x $7.00], leaving little room for paid acquisition.

## Risks & Anti-Plan

The anti-plan is that this is a polished mechanism for a market that does not exist. Citizens who care enough to contact officials may use free tools; citizens who do not care enough will not pay $5.00 [evidence: repo pricing; demand skepticism is assumption]. Officials may treat automated constituent mail as spam, and a high bounce or complaint rate could make the delivery product unusable even with good intentions [evidence: `apps/worker/src/agents/delivery.ts`]. The legal boundary is also fragile: users will try to turn civic letters into legal threats, claim filings, or harassment, forcing expensive human review [evidence: `MASTER_PLAN.md`; `apps/api/src/lib/moderation.ts`].

Mitigations:

- Keep launch categories narrow and non-legal until operator validates complaint rates [assumption: operating policy].
- Require payment before send and preserve audit logs for every agent action [evidence: `apps/worker/src/engine/state-machine.ts`; `packages/shared/prisma/schema.prisma`].
- Cap official counts and escalate high-risk submissions to human review [evidence: `MASTER_PLAN.md`; `apps/worker/src/agents/drafter.ts`].

Residual risks remain high: no customer proof, no official acceptance proof, no legal review proof, and no CAC proof [evidence: workspace inspection].

## Assumption Ledger

| Claim | Basis | Evidence-or-assumption | Test |
| --- | --- | --- | --- |
| Consumers will pay for civic letters | Product thesis | [assumption: no revenue records in repo] | Concierge-sell 20 paid campaigns by 2026-09-30 [assumption]. |
| $13.00 blended price is viable | Repo tier midpoint | [assumption: derived from repo prices] | Track realized average order value after 100 paid orders [assumption]. |
| Officials tolerate the channel | Delivery design includes bounce controls | [assumption: no production delivery metrics] | Measure bounce, spam complaint, and reply rates for 100 sends [assumption]. |
| Citations improve conversion | Product value prop | [assumption: no A/B tests] | Compare preview-to-payment conversion with and without verified citation emphasis [assumption]. |
| WrkPlug reduces infra/CAC burden | Portfolio posture | [assumption: WrkPlug Phase 0 not yet signed] | Operator signs platform posture decision before build migration [assumption]. |
| SEO can acquire users | Master plan content engine | [assumption: no indexed pages evidenced] | Publish 25 compliant pages by 2026-10-31 and measure organic starts [assumption]. |

## Self-Valuation

Current score: 2.0/10.0 [assumption: EIR judgment based on repo completeness but no market proof]. Under the $5,000,000-per-business program assumption [assumption: wrk.vc portfolio framing supplied in brief], this asset is not yet investible; it is an option on a validated civic-communication wedge.

| Case | Twelve-month value band | Method |
| --- | ---: | --- |
| Bear | $0-$50,000 [assumption] | Source-code/research asset only; no demand or compliance proof. |
| Base | $100,000-$300,000 [assumption] | Owner-operated tool with modest revenue and reusable civic-delivery workflow. |
| Bull | $750,000-$1,500,000 [assumption] | Evidence of paid repeat use, compliant delivery, low complaint rate, and organic acquisition. |

Comparables are functional, not valuation comps: Resistbot, Change.org, LegalZoom, and advocacy action-center tools [assumption: model knowledge]. What moves valuation is not more code; it is paid demand, delivery trust, legal review, and repeatable acquisition [assumption].

## Milestones

By 2026-07-15 [assumption: EIR milestone], operator decides whether this remains a research asset or gets business validation budget.

By 2026-08-15 [assumption], run a manual/concierge pilot for 20 paid campaigns and record customer source, refund requests, official delivery status, and human-review time.

By 2026-09-30 [assumption], decide whether to continue only if at least 50 paid campaigns, less than 5.0% refund rate, less than 1.0% spam complaint rate, and at least 80.0% verified-citation coverage are observed [assumption: validation thresholds; metrics not yet evidenced].

By 2026-12-31 [assumption], either convert to a narrow WrkPlug client business with compliance review or archive as a reusable research/delivery asset.

## Surprise Spikes

The prior master plan describes a self-replenishing SEO business with autonomous treasury and 88.0%-92.0% margins [evidence: `MASTER_PLAN.md`], while the registry flags the asset as personal/research and not near-term investible [evidence: wrk.dog registry note]. That contradiction should stay visible: the codebase is more built than the business proof.

The `.planning/ROADMAP.md` marks all four phases complete on 2026-04-25 [evidence: `.planning/ROADMAP.md`], but the business plan cannot treat that as market validation. Build completion is not customer adoption.
