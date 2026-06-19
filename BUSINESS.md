# CivicState — Business Plan

**Document date:** 2026-06-19 [evidence: runner current_date]. **Workspace mode:** no network; repo files are evidence, external market statements are assumptions.

## Thesis

CivicState can become a narrowly useful civic-action utility if it proves that ordinary US residents will pay for researched, citation-backed letters to the correct officials, but as of 2026-06-19 [evidence: runner current_date] it should remain on the watchlist until willingness-to-pay, deliverability, and official-data coverage are validated.

## Problem & Customer

The customer is a US resident with a concrete civic concern who would contact government if the research, jurisdiction routing, drafting, and delivery work were handled for them [evidence: .planning/GENESIS.md]. The repo frames this as a constituent communication product, not a legal advice service, claim filing service, lobbying firm, or launch-stage social network [evidence: MASTER_PLAN.md].

Primary ICP: mobile-first residents with local or state issues such as infrastructure, zoning, school policy, enforcement failures, and agency service gaps [evidence: .planning/PROJECT.md]. Secondary users, deferred until the consumer loop is proven, are HOAs, nonprofits, and civic organizations [evidence: .planning/PROJECT.md].

Current alternatives are manual official lookup and letter writing, Resistbot-style civic messaging, Change.org-style petitioning, enterprise advocacy tools such as Quorum and VoterVoice, and general document/legal tools such as LegalZoom [evidence: MASTER_PLAN.md]. The explicit customer pain is that people abandon the work because they do not know the right official, applicable law, or formal conventions [evidence: .planning/PROJECT.md].

## Market

Market sizing is assumption-led because no network research was available.

| Layer | Method | Size |
|---|---|---:|
| TAM | US adults likely to take at least one civic action online in a year multiplied by an assumed one paid package per year at blended package price | $225,000,000 [assumption: 15,000,000 civically active digital users x $15 blended order value; model-only, not externally sourced] |
| SAM | English-language US residents with email-accessible official targets and civic issues suitable for constituent communication | $45,000,000 [assumption: 20% of TAM reachable under email-only, US-only, non-legal-advice constraints] |
| SOM | First focused wedge from organic search and direct civic communities before paid acquisition | $900,000 [assumption: 2% of SAM captured over the modeled horizon if SEO and referral loops work] |

The bottom-up method is intentionally conservative: paid campaigns rather than registered users drive revenue, because the repo's pricing and checkout implementation monetize completed letter delivery rather than membership [evidence: apps/api/src/routes/payments.ts].

## Product & Moat

What is real as of 2026-06-19 [evidence: repository inspection]: the repo contains a Next.js submission wizard, Express API routes, Prisma data models, Clerk auth middleware, Stripe checkout creation, Postmark webhooks, BullMQ workers, six worker queues [evidence: apps/worker/src/index.ts], legal-source adapters, citation verification, moderation, dashboard routes, admin routes, and compliance pages [evidence: apps/web/app/submit/page.tsx; apps/api/src/index.ts; packages/shared/prisma/schema.prisma; apps/worker/src/index.ts].

What remains unproven: live demand, production deliverability, official data coverage, real legal-source recall, actual AI citation quality, and whether the workflow creates letters officials take seriously [assumption: no production usage metrics or customer evidence found in repo].

Moat starts weak and only compounds with volume. The plausible assets are verified official contact history, bounce and opt-out history, reusable verified citation patterns, and optional public civic pages [evidence: .planning/GENESIS.md]. This is not a durable moat at launch; it becomes meaningful only after repeated paid jobs create data others cannot cheaply duplicate [assumption: data-network-effect thesis, not externally validated].

## Platform Posture

CivicState should be treated as a WrkPlug client rather than an independent platform chassis: shared auth, billing, identity, and operator rails would reduce duplicated infrastructure and make the venture cheaper to test [assumption: WrkPlug Phase 0 not yet signed]. The repo currently implements its own Clerk, Stripe, Postmark, BullMQ, PostgreSQL, Redis, and DigitalOcean/Vercel deployment posture [evidence: .planning/PROJECT.md; apps/api/src/index.ts; apps/api/src/routes/payments.ts].

Cost consequence: a shared chassis could reduce bespoke platform maintenance, but no signed integration or migration plan exists [assumption: operator confirmation needed]. Moat consequence: shared rails can compound operational learning across portfolio projects, while CivicState's project-specific moat must still come from civic data and deliverability history [assumption: portfolio operating model].

## Business Model

Launch revenue is transactional: one-time letter packages priced at $5, $15, and $25 [evidence: .planning/PROJECT.md; apps/api/src/routes/payments.ts]. The product records Stripe payments and only enqueues delivery after webhook-confirmed payment [evidence: apps/api/src/routes/webhooks.ts].

Unit economics assumptions:

| Item | Figure |
|---|---:|
| Single package | $5 [evidence: apps/api/src/routes/payments.ts] |
| Three-official package | $15 [evidence: apps/api/src/routes/payments.ts] |
| All-official package | $25 [evidence: apps/api/src/routes/payments.ts] |
| AI cost per submission placeholder | $0.20 [evidence: .planning/PROJECT.md] |
| Required pricing margin floor | 40% [evidence: .planning/REQUIREMENTS.md] |
| Budget overage pause threshold | 150% [evidence: .planning/REQUIREMENTS.md] |

Future revenue streams are higher-touch human-reviewed sends and organization/API access, but both should stay deferred until the consumer loop validates [evidence: MASTER_PLAN.md].

## Competition

Named competitors and substitutes:

| Player | Position | CivicState response |
|---|---|---|
| Resistbot | Civic messaging through chat-style flows [evidence: MASTER_PLAN.md] | Compete on research, citations, and ZIP-to-official routing [evidence: .planning/PROJECT.md] |
| Change.org | Petition discovery and social proof [evidence: MASTER_PLAN.md] | Avoid petition mechanics at launch; send actual constituent letters [evidence: MASTER_PLAN.md] |
| Quorum | Enterprise advocacy software [evidence: .planning/PROJECT.md] | Do not compete enterprise-first; stay consumer transactional until validated [evidence: .planning/PROJECT.md] |
| VoterVoice | Organization advocacy tooling [evidence: .planning/PROJECT.md] | Price and workflow for individual residents, not institutions [evidence: .planning/PROJECT.md] |
| LegalZoom | General legal/document drafting substitute [evidence: MASTER_PLAN.md] | Stay out of legal advice and filings; focus on constituent communication [evidence: MASTER_PLAN.md] |
| Manual outreach | User researches officials and writes letters manually [evidence: .planning/GENESIS.md] | Compress lookup, research, drafting, and delivery into one paid workflow [evidence: .planning/GENESIS.md] |

## Go-To-Market

First wedge: organic search around local civic problems and official-contact intent [evidence: .planning/GENESIS.md]. The repo's older plan assumes optional public campaign pages can create long-tail acquisition content [evidence: .planning/GENESIS.md], but the current v1 code evidence [evidence: app version language in repo docs] is stronger for submission, preview, payment, and delivery than for public SEO publishing [evidence: apps/web/app/submit/page.tsx; apps/api/src/routes/campaigns.ts].

First customers: recruit direct beta users from local civic groups, neighborhood associations, HOA boards, issue-specific Reddit or Facebook communities, and newsletter audiences [assumption: channel hypothesis, not externally sourced]. The near-term goal is not scale; it is proof that users pay, letters deliver, and officials do not treat messages as spam [assumption: validation-first GTM].

First validation gates:

| Gate | Target |
|---|---:|
| Visitor-to-paid conversion | 3% [evidence: .planning/PROJECT.md] |
| Government inbox placement | 85% [evidence: .planning/PROJECT.md] |
| Federal and state official coverage | 95% [evidence: .planning/PROJECT.md] |
| Local official coverage | 60% [evidence: .planning/PROJECT.md] |
| Per-domain bounce pause | 10% [evidence: apps/worker/src/agents/delivery.ts] |

## Financial Model

The model uses blended average order value of $15 [assumption: equal emphasis on the repo's middle tier] and does not count subscriptions or enterprise API revenue.

| Period ending | Paid campaigns | Revenue build | Revenue | Direct AI and delivery cost | Platform and tools | Operator/contractor cost | Contribution after listed costs |
|---|---:|---|---:|---:|---:|---:|---:|
| 2026-12-31 [assumption: first modeled period] | 300 [assumption: six-month beta after soul adoption] | 300 [assumption] x $15 [assumption] | $4,500 [assumption: 300 x $15] | $240 [assumption: $0.80 per campaign including AI, email, and retries] | $1,176 [assumption: $96 per month droplet for six months plus $100 per month tools] | $3,000 [assumption: light operator review budget] | $84 [assumption: revenue minus listed costs] |
| 2027-12-31 [assumption: second modeled period] | 2,400 [assumption: 200 paid campaigns per month average] | 2,400 [assumption] x $15 [assumption] | $36,000 [assumption: 2,400 x $15] | $1,920 [assumption: $0.80 per campaign] | $4,752 [assumption: $96 per month droplet plus $300 per month tools] | $18,000 [assumption: part-time operator support] | $11,328 [assumption: revenue minus listed costs] |
| 2028-12-31 [assumption: third modeled period] | 12,000 [assumption: 1,000 paid campaigns per month average] | 12,000 [assumption] x $15 [assumption] | $180,000 [assumption: 12,000 x $15] | $9,600 [assumption: $0.80 per campaign] | $15,552 [assumption: $96 per month base plus scaling, data, and support tools] | $72,000 [assumption: dedicated operator/compliance coverage] | $82,848 [assumption: revenue minus listed costs] |

Revenue assumptions: blended AOV stays $15 [assumption: tier mix], paid demand reaches 1,000 campaigns per month by the final modeled period [assumption: GTM success], refunds and chargebacks stay below 0.5% [evidence: .planning/PROJECT.md].

Cost assumptions: AI plus email cost averages $0.80 per campaign [assumption: model and retry buffer], DigitalOcean base remains about $96 per month [evidence: .planning/PROJECT.md], human review is needed because flagged civic content cannot be fully automated [evidence: .planning/PROJECT.md].

Sensitivity tests: if AOV falls to $10 [assumption: users over-select the smallest tier], final-period revenue falls to $120,000 [assumption: 12,000 campaigns x $10]. If paid campaigns reach only 250 per month [assumption: weak GTM], final-period annual revenue is $45,000 [assumption: 3,000 campaigns x $15]. If per-campaign direct cost rises to $2.50 [assumption: citation research and retries are more expensive], final-period direct cost rises to $30,000 [assumption: 12,000 campaigns x $2.50].

## Risks & Anti-Plan

The hard skeptic case: this is a personal/research asset, not a venture-backed business yet [evidence: registry note in dispatch]. It may produce polished letters that users like but officials ignore, block, or classify as automated spam [assumption: government inbox behavior risk]. The product could also drift into legal advice, defamation, harassment, or political-advocacy compliance issues despite disclaimers [evidence: .planning/PROJECT.md; MASTER_PLAN.md].

Holes, mitigations, and residual risks:

| Hole | Mitigation | Residual risk |
|---|---|---|
| Demand may not exist at paid price points | Run paid beta before scaling content or automation | Users may praise the concept and still refuse $5 to $25 pricing [evidence: repo pricing; assumption: willingness-to-pay risk] |
| Deliverability may fail | Warm domains, monitor bounce rate, suppress officials, pause above 10% per-domain bounces [evidence: apps/worker/src/agents/delivery.ts] | Government filters may still suppress AI-assisted mail [assumption: inbox-placement risk] |
| Citation quality may fail | Only cite search-result sources, verify citations, strip unverified citations, flag all-fail jobs [evidence: apps/worker/src/agents/researcher.ts] | Legal-source coverage may be too sparse for local issues [assumption: local legal-data gap] |
| Official targeting may be incomplete | Use congress.gov, OpenStates, and local-provider evaluation [evidence: .planning/PROJECT.md] | Local official coverage may stay below the 60% target [evidence: .planning/PROJECT.md] |
| Compliance risk may dominate operations | Preserve human review and audit logs [evidence: apps/api/src/routes/admin.ts; packages/shared/prisma/schema.prisma] | One operator may not safely handle flagged volume if campaigns scale [assumption: staffing risk] |

## Assumption Ledger

| Claim | Basis | Evidence-or-assumption | Test |
|---|---|---|---|
| Users will pay for constituent-letter delivery | Repo thesis and pricing | $5 to $25 package evidence [evidence: apps/api/src/routes/payments.ts] plus demand assumption | Paid beta conversion target of 3% [evidence: .planning/PROJECT.md] |
| Email delivery is enough for launch | Existing product scope | Email-only launch [evidence: .planning/PROJECT.md] | Inbox placement target of 85% [evidence: .planning/PROJECT.md] |
| Market can support venture path later | Bottom-up model | $900,000 SOM [assumption: modeled wedge] | Measure monthly paid campaigns and organic acquisition |
| Data moat can compound | Genesis moat hypothesis | Volume-dependent contact and citation data [evidence: .planning/GENESIS.md] | Track reusable citations, verified officials, and bounce history |
| One operator can manage early risk | Existing operations assumption | No 24/7 staffing and exception workflow [evidence: .planning/PROJECT.md] | Measure flagged queue age against 24-hour threshold [evidence: .planning/REQUIREMENTS.md] |
| WrkPlug posture could reduce cost | Portfolio operating assumption | Shared-rails claim [assumption: WrkPlug Phase 0 not signed] | Operator decision and migration estimate |

## Self-Valuation

Score: 2.5 out of 10 [assumption: EIR judgment under watchlist context]. This is not near-term investible as a standalone BOS until paid demand and deliverability are proven [evidence: registry note in dispatch].

Under the $5,000,000 per-business program assumption [assumption: wrk.vc portfolio framing], a reasonable twelve-month value band is:

| Case | Value | Basis |
|---|---:|---|
| BEAR | $50,000 [assumption: codebase asset value only] | No paid conversion or deliverability proof |
| BASE | $250,000 [assumption: validated beta but small revenue] | Paid users, working delivery, early retention signals |
| BULL | $1,000,000 [assumption: clear repeatable acquisition and strong unit economics] | Monthly paid volume, low complaints, visible SEO/referral loop |

Comparables used as positioning references, not valuation comps: Resistbot, Change.org, Quorum, VoterVoice, and LegalZoom [evidence: MASTER_PLAN.md; .planning/PROJECT.md]. What would move valuation: paid conversion above 3% [evidence: .planning/PROJECT.md], inbox placement above 85% [evidence: .planning/PROJECT.md], local coverage above 60% [evidence: .planning/PROJECT.md], and repeat purchase or referral proof [assumption: investor validation criteria].

## Milestones

| Date | Milestone | Pass condition |
|---|---|---|
| 2026-07-15 [assumption: operator review deadline] | Operator ruling on identity mismatch and business intent | Decide whether `brooks-history` should become CivicState or be reclassified [evidence: registry dispatch; repo content] |
| 2026-07-31 [assumption: beta dry-run deadline] | End-to-end paid beta dry run | Stripe webhook creates payment, delivery job sends to safe test recipients, and ledger/audit entries reconcile [evidence: apps/api/src/routes/webhooks.ts; apps/worker/src/agents/delivery.ts] |
| 2026-08-31 [assumption: coverage-spike deadline] | Official data coverage spike | Confirm federal/state/local coverage against a sample of 100 ZIP codes [assumption: validation sample size] |
| 2026-09-30 [assumption: demand-gate deadline] | Demand gate | Achieve at least 30 paid campaigns from direct beta or mark venture thesis failed [assumption: small paid-demand threshold] |
| 2026-10-31 [assumption: deliverability-gate deadline] | Deliverability gate | Maintain complaint rate below 0.5% [evidence: .planning/PROJECT.md] and pause domains above 10% bounce rate [evidence: apps/worker/src/agents/delivery.ts] |

## Surprise Spikes

The registry project id is `brooks-history`, but the repo is overwhelmingly a CivicState civic-letter platform [evidence: dispatch; .planning/PROJECT.md; MASTER_PLAN.md; apps/api/src/index.ts]. This cannot be smoothed over; the operator must decide whether the registry label is stale, the repo is misassigned, or the business plan should be re-scoped.

The dispatch calls the asset personal/research and not near-term investible, while the repo contains a surprisingly complete product implementation and a much more aggressive business narrative [evidence: registry note in dispatch; .planning/ROADMAP.md; apps/api/src/index.ts]. The plan therefore treats the codebase as a real prototype but the company thesis as unvalidated.

The planning state says Phase 1 [evidence: .planning/STATE.md] is complete and later phases are pending [evidence: .planning/STATE.md], while code evidence shows many later-phase features already exist [evidence: apps/api/src/routes/payments.ts; apps/api/src/routes/admin.ts; apps/worker/src/agents/delivery.ts]. Roadmap and investor posture should be reset around validation, not more feature buildout.
