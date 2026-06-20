# CivicState - Business Plan

## Thesis

If CivicState can convert high-intent US residents into paid, citation-backed constituent letter campaigns at $5-$25 per campaign [evidence: MASTER_PLAN.md section 11.2; .planning/PROJECT.md Core Value], keep government-email deliverability at or above 85% [evidence: .planning/PROJECT.md validation gates], and prove paid preview conversion at or above 3% [evidence: .planning/PROJECT.md validation gates], then it can become a useful, cash-flowing civic workflow asset; as of 2026-06-20 [evidence: dispatch current_date], it should stay on the Watchlist because registry context says this is a personal/research asset, not a near-term investible business [evidence: wrk.dog registry note in dispatch, 2026-06-20].

## Problem & Customer

CivicState serves ordinary US residents who have a concrete civic concern but do not know the relevant regulation, the correct official, or how to write a professional letter [evidence: .planning/PROJECT.md "What This Is"]. The first customer is not "everyone interested in politics"; it is a high-intent individual with a local, state, or federal issue and a desired government action [evidence: .planning/PROJECT.md Active requirements SUBM/OFCL/LETR].

Priority segments:

| Segment | Job to be done | Current alternative | Why CivicState could win |
|---|---|---|---|
| Local service or enforcement complaints | Turn a specific issue into an official letter | Manual web search and email | ZIP-based official routing plus letter drafting [evidence: apps/web/app/submit/page.tsx; apps/api/src/routes/submissions.ts] |
| State/federal policy concerns | Make a professional ask without learning legislative process | Generic petition or direct email | Citation-backed research and per-official drafts [evidence: MASTER_PLAN.md sections 5.2 and 8] |
| Time-constrained constituents | Pay a small one-time fee to avoid research/admin work | Do nothing or copy a template | $5, $15, and $25 tiers [evidence: apps/api/src/routes/payments.ts; MASTER_PLAN.md section 11.2] |
| Future civic organizations | Repeatable letter operations for members | Enterprise advocacy suites | Deferred API only after citizen workflow proof [evidence: .planning/REQUIREMENTS.md v2/out-of-scope] |

Sensitivity constraints are part of the customer definition. Political opinion, identity, ZIP code, and letter content are sensitive data, so the product cannot behave like a casual petition site [evidence: .planning/PROJECT.md Constraints; packages/shared/prisma/schema.prisma]. It must ship with user-as-author framing, not-legal-advice language, moderation, audit logs, and deletion workflow before it asks for trust [evidence: .planning/REQUIREMENTS.md LGAL and MODR sections].

## Market

No network research was available in this worker run, so all external market sizing is modeled bottom-up and tagged as assumptions. The plan does not claim a census-sized civic-tech TAM. It sizes the reachable wedge from the product's own route to demand.

| Market layer | Method | Annual campaigns | ARPA | Annual revenue |
|---|---|---:|---:|---:|
| Narrow TAM | 50,000 issue/jurisdiction landing opportunities x 20 qualified visits/year x 4% checkout-start rate x 50% checkout-completion rate [assumption: SEO demand envelope; external keyword data not available] | 20,000 [assumption: formula above] | $18 [evidence: MASTER_PLAN.md section 19.2] | $360,000 [assumption: 20,000 x $18] |
| Launch SAM | Month 12 run-rate of 400 submissions/month annualized [evidence: MASTER_PLAN.md section 19.2] | 4,800 [evidence: 400/month x 12 months from MASTER_PLAN.md section 19.2] | $18 [evidence: MASTER_PLAN.md section 19.2] | $86,400 [evidence: 4,800 x $18 using MASTER_PLAN.md section 19.2] |
| Year 1 SOM | Paid ramp before SEO authority [assumption: 1,800 campaigns derived from Month 3, Month 6, and Month 12 scenario interpolation] | 1,800 [assumption: ramp model] | $17 [assumption: blended mix below plan's $18 Month 12 ARPA] | $30,600 [assumption: 1,800 x $17] |
| Future org adjacency | 100 small organizations x $1,200/year [assumption: future API pricing and adoption; explicitly out of current scope] | N/A | $1,200/year [assumption: future contract placeholder] | $120,000 [assumption: 100 x $1,200] |

The takeaway is uncomfortable but useful: the near-term market is more likely a profitable micro-SaaS or portfolio cash-flow product than a standalone venture-scale company [assumption: based on the bottom-up model above and registry Watchlist note].

## Product & Moat

What is real as of 2026-06-20 [evidence: dispatch current_date]:

| Surface | Current fact | Evidence |
|---|---|---|
| Monorepo | Web, API, worker, and shared packages exist | [evidence: package.json; apps/*/package.json; packages/shared/package.json] |
| Data model | Prisma schema includes users, submissions, campaigns, letters, officials, payments, deliveries, ledger, audit, agent logs, and jobs | [evidence: packages/shared/prisma/schema.prisma] |
| Web workflow | Landing page and four-step submission flow exist | [evidence: apps/web/app/page.tsx; apps/web/app/submit/page.tsx] |
| API workflow | Submission, payment, officials, webhooks, admin, campaign, compliance, and health routes are wired | [evidence: apps/api/src/index.ts] |
| Agent shell | Classifier, researcher, drafter, delivery, treasury, and reconciliation workers are registered | [evidence: apps/worker/src/index.ts] |
| Pricing | $5, $15, and $25 Stripe Checkout tiers are implemented | [evidence: apps/api/src/routes/payments.ts] |

What is not yet proven: production deployment, real traffic, real payments, official email deliverability, user willingness to pay, citation quality, local-official coverage, chargeback behavior, and operator workload [evidence: .planning/PROJECT.md validation gates; .planning/REQUIREMENTS.md pending items].

Moat is initially workflow integration, not proprietary data. The defensible pieces would have to compound over time: verified official directory freshness, bounce/opt-out history, issue-to-jurisdiction routing data, moderation decisions, and a public corpus of high-quality civic letters where users opt in [assumption: moat path inferred from MASTER_PLAN.md sections 7, 9, and 13].

## Platform Posture

CivicState should be treated as a WrkPlug client, not as a company that needs to build its own identity, billing, and portfolio distribution rails from scratch [assumption: WrkPlug Phase 0 not yet signed]. The repo currently implements Clerk auth and Stripe payments directly [evidence: apps/api/package.json; apps/web/package.json; apps/api/src/routes/payments.ts], but the business posture should remain compatible with shared wrk.vc/wrk.dog rails because that can reduce infrastructure burden and CAC if the portfolio channel becomes real [assumption: shared-rails cost and distribution benefit, not yet contractually validated].

Consequence: do not hard-wire the investment case to bespoke auth or billing. The near-term product can use Clerk and Stripe, but the business case should measure whether shared account, billing, and distribution rails reduce launch cost by at least 20% [assumption: target savings threshold for WrkPlug validation].

## Business Model

Launch revenue is transactional: users pay once to send a letter campaign [evidence: MASTER_PLAN.md section 2.2; apps/api/src/routes/payments.ts].

| Revenue stream | Status | Price | Margin posture |
|---|---|---:|---|
| Single official letter | Implemented in API pricing | $5 [evidence: apps/api/src/routes/payments.ts] | Must stay above 40% net margin floor [evidence: MASTER_PLAN.md section 2.3] |
| Three-official package | Implemented in API pricing | $15 [evidence: apps/api/src/routes/payments.ts] | Master plan models about 92% gross margin for Amplify [evidence: MASTER_PLAN.md section 19.1] |
| Full-spread package | Implemented in API pricing | $25 [evidence: apps/api/src/routes/payments.ts] | Master plan models about 92% gross margin for Complex [evidence: MASTER_PLAN.md section 19.1] |
| Priority review | Planned, not proved | $35 [assumption: premium tier placeholder; not in current API] | Human-time constrained [assumption: operator review capacity unknown] |
| Organization API | Deferred | $1,200/year [assumption: future pricing; .planning/REQUIREMENTS.md marks API as future] | Not part of the launch model |

The plan should reject subscription pressure until repeat usage is observed. A one-time payment matches a sporadic civic need and avoids pretending a typical resident has monthly demand [assumption: usage-frequency risk inferred from customer job].

## Competition

Named alternatives:

| Competitor or substitute | Current customer behavior | CivicState positioning |
|---|---|---|
| Resistbot | Low-friction messages to lawmakers [assumption: general market knowledge, not verified in this worker] | More researched, cited, and paid workflow [evidence: .planning/PROJECT.md Context] |
| Change.org | Petition discovery and signatures [assumption: general market knowledge, not verified in this worker] | Direct letter delivery to officials, not petition hosting [evidence: MASTER_PLAN.md section 2.4] |
| Quorum | Enterprise advocacy tooling [assumption: general market knowledge, not verified in this worker] | Individual-first pricing below enterprise budgets [evidence: .planning/PROJECT.md Context] |
| VoterVoice | Organization advocacy campaigns [assumption: general market knowledge, not verified in this worker] | Transactional constituent workflow [evidence: .planning/PROJECT.md Context] |
| Manual search/email | Free but slow | CivicState sells time saved and quality control [assumption: customer behavior inference] |
| Generic AI chat | Drafting help without routing/delivery | CivicState adds official lookup, citation checks, payment, delivery, and audit trail [evidence: packages/shared/prisma/schema.prisma; apps/api/src/index.ts] |

The competition risk is not that nobody else can draft letters. The risk is that a free chatbot plus manual official lookup is "good enough" for most users [assumption: core substitution risk].

## Go-To-Market

The first 100 paid campaigns should be acquired manually, not through a broad launch [assumption: validation-first GTM].

| Step | Target | Method | Pass/fail signal |
|---|---:|---|---|
| Operator beta | 20 paid campaigns [assumption: small beta size] | Recruit from founder network and civic issue communities | At least 3% preview-to-paid conversion [evidence: .planning/PROJECT.md validation gates] |
| Issue-page SEO test | 50 pages [assumption: single-worker content batch] | Publish pages only from verified issue templates and opted-in campaigns | At least 1 paid campaign per 500 qualified visits [assumption: low-volume SEO hurdle] |
| Local wedge | 3 jurisdictions [assumption: focus constraint] | Manually verify official data and bounce behavior before expanding | At least 85% .gov inbox placement [evidence: .planning/PROJECT.md validation gates] |
| Refund learning loop | 10 refunds reviewed [assumption: enough to classify early failure modes] | Proactive refund for undelivered jobs | Chargeback rate below 0.5% [evidence: MASTER_PLAN.md section 12.10] |

Distribution wedge: high-intent search and issue-specific pages, not social virality. The SEO engine in MASTER_PLAN.md is plausible only after successful paid sends produce safe, opt-in, indexable records [evidence: MASTER_PLAN.md sections 9 and 18].

## Financial Model

Revenue build reconciles as paid campaigns x ARPA = revenue.

| Line | First year [assumption: financial model period] | Second year [assumption: financial model period] | Third year [assumption: financial model period] |
|---|---:|---:|---:|
| Paid campaigns | 1,800 [assumption: ramp model] | 14,400 [assumption: 1,200/month average] | 36,000 [assumption: 3,000/month average] |
| ARPA | $17 [assumption: mix below MASTER_PLAN.md Month 12 ARPA] | $20 [evidence: MASTER_PLAN.md section 19.2 Month 24 ARPA] | $22 [assumption: mix shift to full-spread/priority review] |
| Revenue | $30,600 [assumption: 1,800 x $17] | $288,000 [assumption: 14,400 x $20] | $792,000 [assumption: 36,000 x $22] |
| Stripe fees | $1,224 [assumption: 4% of revenue; MASTER_PLAN.md section 19.3 models 4%] | $11,520 [assumption: 4% of revenue] | $31,680 [assumption: 4% of revenue] |
| Token/email variable COGS | $2,448 [assumption: 8% of revenue; MASTER_PLAN.md section 19.3 models 8%] | $23,040 [assumption: 8% of revenue] | $63,360 [assumption: 8% of revenue] |
| Fixed infrastructure | $2,400 [evidence: MASTER_PLAN.md section 19.3 models about $200/month] | $7,200 [assumption: managed DB/storage added] | $24,000 [assumption: scale monitoring and redundancy] |
| Human operations/support | $12,000 [assumption: part-time operator budget] | $60,000 [assumption: contractor/operator coverage] | $180,000 [assumption: small support/compliance team] |
| Compliance/legal/admin | $6,000 [assumption: policies, review, filings] | $18,000 [assumption: recurring counsel/reviews] | $48,000 [assumption: higher regulatory/customer support load] |
| Estimated operating profit | $6,528 [assumption: revenue less listed costs] | $168,240 [assumption: revenue less listed costs] | $444,960 [assumption: revenue less listed costs] |

Revenue assumptions:

| Assumption | Value | Basis |
|---|---:|---|
| Paid conversion gate | 3% [evidence: .planning/PROJECT.md validation gates] | Beta must prove willingness to pay |
| Launch ARPA | $17 [assumption: blended price below documented $18 Month 12 scenario] | Conservative mix of $5, $15, and $25 tiers |
| Year 2 volume | 14,400 campaigns [assumption: 1,200/month average] | Uses MASTER_PLAN.md Month 24 scenario as a reference point |

Cost assumptions:

| Assumption | Value | Basis |
|---|---:|---|
| Variable COGS | 8% of revenue [evidence: MASTER_PLAN.md section 19.3] | Token and email costs |
| Stripe fees | 4% of revenue [evidence: MASTER_PLAN.md section 19.3] | Payment processing approximation |
| Reserve before accepting payments | $1,500 [evidence: MASTER_PLAN.md section 12.10] | Pre-funded operating buffer |

Sensitivity tests:

| Test | Result |
|---|---|
| Conversion falls to 1% [assumption: downside test] | Year 1 revenue falls to about $10,200 [assumption: one-third of $30,600], likely not worth operator time |
| .gov inbox placement stays below 85% [evidence: .planning/PROJECT.md gate threshold] | Product promise breaks even if drafting works |
| Variable COGS doubles to 16% [assumption: AI/retry cost stress] | Year 2 operating profit falls by about $23,040 [assumption: incremental 8% of $288,000] |
| Chargebacks exceed 0.5% [evidence: MASTER_PLAN.md section 12.10 target] | Stripe risk can halt payouts and destroy trust |

## Risks & Anti-Plan

The partner-kill case is strong: CivicState may be a clever demo around a low-frequency, low-urgency job that people praise but do not pay for. Most citizens can already use a free chatbot to draft a letter and copy an official's email address. If CivicState cannot prove that its verified citations, official routing, and delivery tracking create enough incremental trust to justify even $5 [evidence: apps/api/src/routes/payments.ts], the business should not graduate from Watchlist.

| Hole | Mitigation | Residual risk |
|---|---|---|
| Willingness to pay may be weak | Run paid beta before broad SEO | Even 3% conversion [evidence: .planning/PROJECT.md] may be too low for durable CAC |
| Government email deliverability may fail | SPF/DKIM/DMARC, domain warming, bounce monitoring [evidence: scripts/setup-dns.md; MASTER_PLAN.md section 13] | Filters can still block automated civic mail |
| Legal/compliance ambiguity | Not-legal-advice, user-as-author, AI disclosure, moderation [evidence: .planning/REQUIREMENTS.md LGAL/MODR] | A bad letter or recipient complaint can create reputational/legal risk |
| Official data coverage may be poor locally | Start in 3 jurisdictions [assumption: focused launch] and manually verify | Local data vendors may be costly or incomplete |
| Operator workload may exceed the premise | Admin queue and thresholds [evidence: .planning/REQUIREMENTS.md ADMN] | Human review can erase margin on complex cases |
| Project identity mismatch | Rename/confirm with operator before public dossier | Current dispatch says brooks-history, repo says CivicState [evidence: dispatch; package.json] |

## Assumption Ledger

| Claim | Basis | Evidence or assumption | Test |
|---|---|---|---|
| Users will pay $5-$25 for civic letters | Implemented pricing and plan | [evidence: apps/api/src/routes/payments.ts; MASTER_PLAN.md section 11.2] | Paid beta with real checkout |
| 3% paid conversion is enough for early proof | Existing validation gate | [evidence: .planning/PROJECT.md] | Track preview-to-paid conversion |
| 85% inbox placement is minimum viable | Existing validation gate | [evidence: .planning/PROJECT.md] | Seeded deliverability test across .gov domains |
| Narrow TAM is $360,000/year | Bottom-up SEO funnel model | [assumption: no external keyword/customer data in workspace] | Keyword research and landing-page cohort |
| Year 1 revenue can reach $30,600 | 1,800 campaigns x $17 | [assumption: ramp model] | Monthly cohort dashboard |
| Gross margins can stay near 92% on core packages | Master plan unit economics | [evidence: MASTER_PLAN.md section 19.1] | Production token/email/Stripe reconciliation |
| Shared WrkPlug rails can reduce cost/CAC | Portfolio platform thesis | [assumption: WrkPlug Phase 0 not yet signed] | Compare Clerk/Stripe/direct CAC against shared-rail integration |

## Self-Valuation

Score: 42/100 [assumption: EIR scoring based on current evidence, Watchlist status, and unvalidated demand].

Under a $5,000,000-per-business program ceiling [assumption: wrk.vc portfolio program framing from dispatch], current 12-month valuation bands [assumption: EIR valuation window] are:

| Case | Value | Method |
|---|---:|---|
| Bear | $50,000 [assumption: asset value of code/spec only] | Fails paid conversion or deliverability gates |
| Base | $250,000 [assumption: 1.5x-$168,240 Year 2 operating-profit potential discounted for proof risk] | Clears beta but remains micro-SaaS |
| Bull | $1,250,000 [assumption: about 3x-$444,960 Year 3 operating profit, still below program ceiling] | Proves SEO distribution and low operator load |

Comparables used qualitatively: Resistbot, Change.org, Quorum, and VoterVoice [assumption: named market references not externally verified in this worker]. What would move valuation: real paid conversion, deliverability logs, repeat use, low refund/chargeback rates, and a verified official directory with measurable coverage [assumption: valuation drivers].

## Milestones

| Date | Milestone | Pass/fail test |
|---|---|---|
| 2026-06-20 [evidence: dispatch current_date] | Soul upgrade complete | BUSINESS.md, ROADMAP.md, DECISIONS.md, and gate files exist |
| 2026-07-15 [assumption: operator scheduling] | Operator identity/product-name ruling | Decide whether this repo is CivicState, brooks-history, or a renamed asset |
| 2026-08-01 [assumption: build schedule] | Paid beta instrumentation | Conversion, deliverability, refund, and operator-time metrics visible |
| 2026-09-01 [assumption: validation schedule] | 20 paid campaigns completed | At least 3% conversion and at least 85% inbox placement [evidence: .planning/PROJECT.md] |
| 2026-10-01 [assumption: validation schedule] | Investment decision gate | Promote, keep as personal/research asset, or stop |

## Surprise Spikes

- Dispatch identity conflict: the worker context says PROJECT=brooks-history and REPO=RPLogic-Inc/brookss-history, but the repository product, package name, and planning docs are CivicState [evidence: dispatch; package.json; .planning/PROJECT.md]. This must be resolved before a public wrk.vc dossier.
- Registry says personal/research asset, not near-term investible BOS [evidence: wrk.dog registry note in dispatch, 2026-06-20]. The repo narrative is much more commercial and should be operator-confirmed before pitching as a business.
- Planning state is internally stale: .planning/ROADMAP.md marks all phases complete, while .planning/REQUIREMENTS.md still shows many core requirements pending and the source appears scaffolded rather than production-proven [evidence: .planning/ROADMAP.md; .planning/REQUIREMENTS.md; apps/api/src/index.ts].
- MASTER_PLAN.md v2.1 references Next.js 14 in the tech stack, while package files use Next.js 15 [evidence: MASTER_PLAN.md section 20; apps/web/package.json].
