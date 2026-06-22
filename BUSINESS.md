# CivicState - Business Plan

As of 2026-06-22 [evidence: dispatch context], this repo is a working CivicState product skeleton, not a validated venture. The registry calls the asset "Watchlist" and "personal/research asset, not near-term investible BOS" [evidence: dispatch registry notes]. This plan therefore treats CivicState as an operator-gated research asset until customer willingness to pay, official-routing coverage, and deliverability are proven.

## Thesis

CivicState can become a narrow paid utility for U.S. residents who want a researched, citation-backed constituent letter sent to the right public officials, if it proves that people will pay $5, $15, or $25 per campaign [evidence: `apps/api/src/routes/payments.ts`] and that government delivery works reliably enough to avoid refunds and reputational risk.

## Problem & Customer

The customer is an individual U.S. resident with a concrete civic issue, a desired outcome, and a ZIP code; the current product asks for issue text, desired outcome, ZIP code, and anonymity preference [evidence: `apps/api/src/routes/submissions.ts`]. The pain is practical: the user does not know which official has authority, which law or regulation is relevant, or how to write a credible formal letter [evidence: `.planning/PROJECT.md`].

Primary initial customer definition: civic-minded individuals facing local/state/federal policy or enforcement issues who are willing to spend under $25 per campaign [evidence: `apps/web/app/page.tsx`; evidence: `apps/api/src/routes/payments.ts`]. Exclusions matter: the product is not legal advice, not legal representation, not a claim filing service, not a lobbying firm, and not a social network at launch [evidence: `apps/web/app/terms/page.tsx`; evidence: `MASTER_PLAN.md`].

Stakeholders include the paying citizen, a lean operator handling flagged submissions, passive government official recipients, and future organizational/API consumers only after the individual loop is proven [evidence: `.planning/PROJECT.md`].

## Market

Workspace-only market sizing is assumption-led because no network research is available. The bottom-up method is: eligible U.S. adult internet users who have a civic issue in a year x reachable share x paid conversion x average order value.

TAM framing: 258,000,000 U.S. adults x 10% annual civic-issue intent x 3% willingness-to-pay x $15 average order value = $11,610,000 annual transactional TAM [assumption: rounded public-demographic memory plus repo's $5-$25 price points; no live source available]. This is a bounded consumer utility market, not a venture-scale certainty.

SAM framing: 5,000,000 reachable search/social/email users x 3% paid conversion x $15 average order value = $2,250,000 annual SAM [assumption: reachable audience estimate invented for planning; conversion threshold borrowed from `.planning/PROJECT.md` validation gate].

SOM framing: first validated operating target of 1,000 paid campaigns x $15 average order value = $15,000 annual SOM [assumption: validation-sized cohort; price points from `apps/api/src/routes/payments.ts`]. This is the right initial bar for a watchlist asset: prove the loop before claiming a platform market.

The prior soul used a "CONDITIONAL GO" with 72% confidence, a 3% conversion gate, 85% government inbox placement gate, and 95% federal/state plus 60% local data coverage gates [evidence: `.planning/PROJECT.md`]. Those remain useful as tests, not as achieved facts.

## Product & Moat

What is real today: the repo contains a Next.js web app, Express API, PostgreSQL/Prisma schema, Clerk auth hooks, Stripe Checkout tiers, BullMQ worker agents, moderation, official lookup clients, legal-source search wrappers, citation verification, drafting, delivery through Postmark, dashboards, admin pages, privacy policy, and terms [evidence: `package.json`; evidence: `packages/shared/prisma/schema.prisma`; evidence: `apps/api/src/routes/payments.ts`; evidence: `apps/worker/src/agents/researcher.ts`; evidence: `apps/worker/src/agents/drafter.ts`; evidence: `apps/worker/src/agents/delivery.ts`].

The moat is not model access. The plausible moat is accumulated routing/citation reliability, audit logs, official opt-out handling, deliverability reputation, and a narrow compliance posture around constituent communication [evidence: `packages/shared/prisma/schema.prisma`; evidence: `apps/api/src/lib/moderation.ts`; evidence: `apps/web/app/terms/page.tsx`].

The hardest product risk is official routing. The federal lookup client says Congress.gov does not expose email addresses and uses contact-form-style data instead [evidence: `apps/api/src/lib/officials/congress.ts`], while the delivery agent sends email through Postmark [evidence: `apps/worker/src/agents/delivery.ts`]. That gap can break the paid promise unless solved before launch.

## Platform Posture

CivicState should be treated as a WrkPlug client, not a standalone platform company, if WrkPlug shared rails become available. The plan should consume shared auth, billing, identity, login, and EAI Layer-0 contracts instead of rebuilding them [assumption: WrkPlug Phase 0 not yet signed].

Cost/moat consequence: shared rails could reduce fixed infrastructure, support a single MCPWrk login, and compound trust across the portfolio [assumption: platform economics not evidenced in this repo]. Until signed, the repo remains a standalone CivicState implementation using Clerk, Stripe, Postmark, PostgreSQL, Redis, and BullMQ [evidence: `package.json`; evidence: `apps/api/src/routes/payments.ts`; evidence: `apps/worker/src/agents/delivery.ts`].

## Business Model

Current revenue model: one-time paid letter campaigns at $5 single, $15 three-pack, and $25 full-spread [evidence: `apps/api/src/routes/payments.ts`]. The older plan included a 40% net margin floor and a $1,500 Mercury reserve [evidence: `MASTER_PLAN.md`; evidence: `.planning/PROJECT.md`], but the implemented payment route currently uses fixed tiers rather than dynamic pricing [evidence: `apps/api/src/routes/payments.ts`].

Unit economics must be validated. The prior soul claimed 91% gross margin, $132.50 monthly max burn, and break-even at 11 submissions [evidence: `.planning/PROJECT.md`]. Those numbers are planning estimates, not observed operating metrics. Until live costs are measured, use a conservative target: contribution margin at or above 40% after Stripe, LLM, email, refunds, and manual review [evidence: `MASTER_PLAN.md`].

Future revenue streams such as API access for HOAs, nonprofits, or civic organizations are explicitly out of launch scope [evidence: `.planning/PROJECT.md`]. They should not be priced into valuation until individual paid campaigns work.

## Competition

Named competitors and substitutes:

| Alternative | Customer substitute | CivicState position |
| --- | --- | --- |
| Resistbot | Free or low-cost constituent messages by SMS | CivicState aims for researched, cited, higher-context letters [evidence: `MASTER_PLAN.md`]. |
| Change.org | Public petition pages | CivicState sends individualized letters instead of only collecting signatures [evidence: `MASTER_PLAN.md`]. |
| LegalZoom | Paid legal/document help | CivicState must stay lower-stakes and non-legal-advice [evidence: `apps/web/app/terms/page.tsx`]. |
| Quorum / VoterVoice / FiscalNote-style tools | Enterprise advocacy infrastructure | CivicState targets individuals first; enterprise is future only [assumption: named category from model knowledge, no network source]. |
| Manual outreach | User researches officials and writes letters alone | CivicState bundles research, drafting, routing, payment, and delivery [evidence: `.planning/PROJECT.md`]. |

The strongest substitute is free manual outreach. The product only earns a fee if the perceived time savings and credibility exceed $5-$25 [evidence: `apps/api/src/routes/payments.ts`].

## Go-To-Market

First channel: high-intent search pages and issue templates are plausible because the prior plan positions SEO as core infrastructure [evidence: `MASTER_PLAN.md`]. This remains an assumption until pages exist and index [assumption: no production analytics in repo].

First 100 customers target: recruit 25 beta users from operator network, 25 users from local civic groups, 25 from issue-specific online communities, and 25 from search/content experiments [assumption: planning cohort; no customer list in repo]. The first conversion gate is 3% paid conversion from preview to checkout [evidence: `.planning/PROJECT.md`].

Launch sequence: private beta, manual review for every paid letter, measure deliverability, refund rate, official-coverage confidence, and support burden, then decide whether to broaden issue categories. Do not scale paid acquisition until 85% government inbox placement and official contact coverage gates are met [evidence: `.planning/PROJECT.md`].

## Financial Model

Planning P&L sketch, not observed performance:

| Period | Paid campaigns | Avg order value | Revenue | Variable cost | Fixed operating cost | Gross profit | Operating result |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Year A | 500 [assumption: beta volume] | $15 [evidence: midpoint of fixed tiers] | $7,500 [assumption: 500 x $15] | $1,500 [assumption: 20% of revenue] | $1,590 [evidence: $132.50/month planning burn x 12 from `.planning/PROJECT.md`] | $6,000 [assumption: revenue minus variable cost] | $4,410 [assumption: gross profit minus fixed cost] |
| Year B | 3,000 [assumption: repeatable niche channel] | $17 [assumption: mix shifts toward $25 tier] | $51,000 [assumption: 3,000 x $17] | $10,200 [assumption: 20% of revenue] | $12,000 [assumption: paid tools/operator support] | $40,800 [assumption: revenue minus variable cost] | $28,800 [assumption: gross profit minus fixed cost] |
| Year C | 12,000 [assumption: scaled but still narrow utility] | $18 [assumption: mix shifts toward multi-official sends] | $216,000 [assumption: 12,000 x $18] | $43,200 [assumption: 20% of revenue] | $60,000 [assumption: contractor review/support] | $172,800 [assumption: revenue minus variable cost] | $112,800 [assumption: gross profit minus fixed cost] |

Revenue assumptions: preview-to-paid conversion reaches 3% [evidence: `.planning/PROJECT.md`], average order value starts at $15 [evidence: `apps/api/src/routes/payments.ts`], refund/failed-delivery burden stays below 10% of paid orders [assumption: delivery reliability threshold derived from Postmark risk, no operating data].

Cost assumptions: base infrastructure can begin near $96/month for the specified DigitalOcean droplet [evidence: `MASTER_PLAN.md`], early max burn was estimated at $132.50/month [evidence: `.planning/PROJECT.md`], and variable cost is modeled at 20% of revenue until live LLM/email/manual-review costs are measured [assumption: conservative planning plug].

Sensitivity tests: if conversion is 1% instead of 3%, Year A revenue falls from $7,500 to $2,500 under the same traffic base [assumption: linear conversion sensitivity]. If average order value is $5 instead of $15, Year A revenue falls from $7,500 to $2,500 [evidence: pricing tier; assumption: mix sensitivity]. If manual review costs add $3 per campaign, Year C variable cost increases by $36,000 [assumption: 12,000 campaigns x $3].

## Risks & Anti-Plan

Skeptic's anti-plan: do not invest until the product proves that paid civic letters are a real buyer behavior and not a founder-interest project. The registry already warns it is a personal/research asset, not near-term investible BOS [evidence: dispatch registry notes]. A polished AI workflow does not create a market.

Risk: official delivery may fail because federal officials often use web forms and the repo's Congress.gov client returns no email addresses [evidence: `apps/api/src/lib/officials/congress.ts`]. Mitigation: run a delivery spike before paid beta. Residual risk: contact data and office policies remain outside product control.

Risk: legal/compliance positioning can drift into legal advice, lobbying, harassment, or commercial email ambiguity [evidence: `apps/web/app/terms/page.tsx`; evidence: `apps/api/src/lib/moderation.ts`]. Mitigation: keep human review for flagged content and maintain clear disclaimers. Residual risk: no legal opinion is present in repo.

Risk: consumer CAC could exceed the low $5-$25 transaction price [evidence: `apps/api/src/routes/payments.ts`]. Mitigation: rely on organic/content and operator-led beta first. Residual risk: if SEO does not work, paid acquisition likely kills the model.

Risk: the codebase is complete-looking but not evidenced as live in production [evidence: `.planning/ROADMAP.md`; evidence: `package.json`]. Mitigation: measure end-to-end production transactions. Residual risk: local tests do not prove deliverability, payment disputes, or official response behavior.

## Assumption Ledger

| Claim | Basis | Evidence-or-assumption | Test |
| --- | --- | --- | --- |
| Users will pay $5-$25 for the job | Implemented Stripe tiers | [evidence: `apps/api/src/routes/payments.ts`] | Run paid beta with 100 checkout-eligible previews [assumption: validation cohort]. |
| 3% preview-to-paid conversion is enough to continue | Prior plan gate | [evidence: `.planning/PROJECT.md`] | Instrument preview, checkout, payment, refund funnel. |
| Government inbox placement can reach 85% | Prior plan gate | [evidence: `.planning/PROJECT.md`] | Send monitored test batch to validated official addresses. |
| TAM is about $11,610,000 annually | Bottom-up assumption math | [assumption: 258,000,000 adults x 10% intent x 3% conversion x $15 AOV] | Replace with sourced survey/search/payment data. |
| Fixed infra can start under $200/month | Prior plan's $96 droplet and $132.50 burn | [evidence: `MASTER_PLAN.md`; evidence: `.planning/PROJECT.md`] | Reconcile actual Vercel, DigitalOcean, Postmark, Stripe, Clerk, LLM bills. |
| CivicState can avoid legal-advice/lobbying exposure | Terms and moderation posture | [evidence: `apps/web/app/terms/page.tsx`; evidence: `apps/api/src/lib/moderation.ts`] | Obtain operator/legal review before public launch. |
| WrkPlug rails reduce cost and friction | Portfolio platform theory | [assumption: WrkPlug Phase 0 not yet signed] | Confirm contract, migration path, and shared-login economics. |

## Self-Valuation

Current score: 2.5/10 [assumption: EIR judgment using product completeness, market uncertainty, and registry watchlist status]. The product has implementation depth, but no observed revenue, no customer evidence, and an unresolved delivery gap.

Twelve-month valuation bands under the $5,000,000-per-business program assumption [assumption: program framing from dispatch]: BEAR $0-$150,000 if deliverability or willingness-to-pay fails; BASE $250,000-$750,000 if 1,000 paid campaigns and 40%+ contribution margin are proven; BULL $1,500,000-$3,000,000 if 12,000 annual paid campaigns, repeatable organic acquisition, and low refund rates are proven [assumption: revenue multiple and validation-gate method, not market comps].

Comparables used for positioning, not valuation precision: Resistbot, Change.org, LegalZoom, and enterprise advocacy suites such as Quorum/VoterVoice [evidence: `MASTER_PLAN.md`; assumption: enterprise suite category from model knowledge]. What moves valuation: real paid conversion, delivery success, repeat usage, low support burden, legal review, and a defensible official-routing dataset.

## Milestones

By 2026-07-15 [assumption: operator schedule], complete an official-routing spike proving which federal, state, and local recipients can be reached by email versus web form, with a documented fallback for no-email officials.

By 2026-08-01 [assumption: operator schedule], run a private beta of 100 checkout-eligible previews and measure preview-to-paid conversion, aiming for at least 3% [evidence: `.planning/PROJECT.md`].

By 2026-08-15 [assumption: operator schedule], send a monitored deliverability batch and measure whether government inbox placement reaches at least 85% [evidence: `.planning/PROJECT.md`].

By 2026-09-15 [assumption: operator schedule], reconcile the first paid-campaign P&L with real Stripe, LLM, Postmark, hosting, refund, and manual-review costs.

## Surprise Spikes

Dispatch identity mismatch: the runner project is `brooks-history`, but the repo contents are CivicState/CivicState.com [evidence: dispatch context; evidence: `package.json`; evidence: `MASTER_PLAN.md`]. This plan follows repo evidence and flags the mismatch for operator review.

Native soul gap: root `BUSINESS.md`, `ROADMAP.md`, and `DECISIONS.md` were absent, while `.planning/PROJECT.md`, `.planning/ROADMAP.md`, and `MASTER_PLAN.md` carried the prior narrative [evidence: workspace file listing].

Commercial-email contradiction: the master plan says treat emails as commercial/CAN-SPAM compliant, while the terms say letters to officials are constituent correspondence and not subject to CAN-SPAM [evidence: `MASTER_PLAN.md`; evidence: `apps/web/app/terms/page.tsx`]. This needs operator/legal review.

Delivery contradiction: the older plan assumes email delivery; the federal official client returns empty emails for Congress.gov officials [evidence: `MASTER_PLAN.md`; evidence: `apps/api/src/lib/officials/congress.ts`]. This is the top buildable risk before public launch.

Roadmap contradiction: `.planning/ROADMAP.md` marks all four phases complete on 2026-04-25 [evidence: `.planning/ROADMAP.md`], but market validation remains unproven and several core assumptions are still unlabeled assumptions.
