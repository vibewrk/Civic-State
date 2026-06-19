# CivicState - Business Plan

## Thesis

As of 2026-06-19 [evidence: user dispatch], CivicState should be treated as a Watchlist civic-tech asset, not an investible BOS yet: if US residents will pay $5, $15, or $25 per civic-letter campaign [evidence: apps/api/src/routes/payments.ts; apps/web/app/page.tsx], then a focused operator can convert civic frustration into verified, AI-assisted constituent correspondence with attractive gross margin, but only after paid demand, official-data coverage, and deliverability are proven in-market.

## Problem & Customer

CivicState serves US residents with a specific civic concern who do not know which official has jurisdiction, what law or regulation applies, or how to write a credible letter [evidence: .planning/PROJECT.md]. The current repo product asks for an issue description, desired outcome, ZIP code, and anonymity preference, then routes the submission through moderation and an agent pipeline [evidence: apps/api/src/routes/submissions.ts; packages/shared/prisma/schema.prisma].

Primary customer definition: a non-technical US resident who has one concrete local, state, or federal concern and values a researched letter more than the time required to research officials, citations, and delivery manually [evidence: .planning/GENESIS.md]. The buyer is the citizen, not the official; officials are passive recipients and may create operational risk through bounces, spam complaints, or opt-outs [evidence: apps/worker/src/agents/delivery.ts].

Existing evidence supports a built product surface, not market pull: the repo includes a Next.js web app, Express API, Prisma schema, BullMQ workers, Clerk auth, Stripe checkout, Postmark delivery code, compliance pages, and tests [evidence: package.json; apps/api/src/index.ts; apps/worker/src/index.ts; tests]. It does not include revenue, user cohorts, live deliverability reports, or official response rates [evidence: no production data files found in repo].

## Market

TAM method is bottom-up because network research is unavailable. The broad theoretical TAM is annual paid civic-letter transactions, not total civic participation. A placeholder TAM of 5,000,000 paid campaigns per year times $15 average order value equals $75,000,000 annual transaction value [assumption: scenario sizing for US civic-action consumers; not externally verified]. This is intentionally narrower than "everyone who cares about politics."

SAM for a bootstrapped launch is the reachable organic and referral wedge: 50,000 addressable early users times 1.2 paid campaigns per user per year times $15 average order value equals $900,000 annual serviceable revenue [assumption: operator-scale launch model; not externally verified].

SOM for the next credible operating target is 400 paid campaigns per month by 2027-06-30, or 4,800 annual campaigns times $15 average order value equals $72,000 annual revenue [assumption: bottom-up target based on the prior planning model's 400-per-month database scale, adjusted as unvalidated]. The old planning file also named a break-even target around 25 Amplify-tier submissions per month and about $340 MRR [evidence: .planning/GENESIS.md], while .planning/PROJECT.md named break-even at 11 submissions [evidence: .planning/PROJECT.md]. That inconsistency is a surprise spike, not a settled fact.

The market remains unproven until at least three gates clear: paid conversion of 3% or higher [evidence: .planning/PROJECT.md], government-email inbox placement of 85% or higher [evidence: .planning/PROJECT.md], and official data coverage of 95% federal/state plus 60% local [evidence: .planning/PROJECT.md]. Those are planning gates, not achieved metrics [evidence: tests only cover code behavior, not production traction].

## Product & Moat

Real today: a monorepo with apps/web, apps/api, apps/worker, and packages/shared [evidence: pnpm-workspace.yaml; package.json]. The API exposes health, submissions, officials, payments, webhooks, campaigns, admin, and compliance routes [evidence: apps/api/src/index.ts]. The worker registers classifier, researcher, drafter, delivery, treasury, and reconciliation workers [evidence: apps/worker/src/index.ts]. The database schema covers users, submissions, campaigns, letters, officials, payments, deliveries, ledger entries, audit logs, agent action logs, and jobs [evidence: packages/shared/prisma/schema.prisma].

Real compliance and trust posture: letters include AI disclosure, not-legal-advice language, and a CAN-SPAM style footer in the drafter [evidence: apps/worker/src/agents/drafter.ts]. The app has privacy, terms, about, dashboard, admin, and CCPA-style compliance routes [evidence: apps/web/app/privacy/page.tsx; apps/web/app/terms/page.tsx; apps/api/src/routes/compliance.ts].

Not proven today: official contact freshness, legal-citation accuracy in live use, deliverability into government domains, willingness to pay, refund rates, chargeback rates, response rates, and whether recipients tolerate AI-assisted constituent mail [evidence: no live operations data found in repo].

Moat hypothesis: the moat is not the app code. The potential moat is a growing officials directory, bounce history, opt-out suppression list, verified citation library, and campaign outcome dataset [evidence: .planning/GENESIS.md; packages/shared/prisma/schema.prisma]. That moat does not exist at zero users [evidence: no production data files found in repo].

## Platform Posture

CivicState should be modeled as a client of the shared WrkPlug chassis, not a company that must build every shared rail itself [assumption: WrkPlug Phase Zero not yet signed; registry and brief ask for this posture]. Single login, shared account identity, shared billing primitives, and EAI Layer-zero behind a platform contract could reduce duplicated auth, billing, and compliance work [assumption: platform architecture benefit; not proven in this repo].

The current repo nevertheless implements direct Clerk, Stripe, Postmark, Redis, PostgreSQL, BullMQ, and Prisma integrations [evidence: apps/api/package.json; apps/worker/package.json; packages/shared/prisma/schema.prisma]. If WrkPlug becomes binding, CivicState should migrate high-friction shared rails before scaling spend; until then, the repo remains a standalone implementation [evidence: current code imports Clerk, Stripe, Postmark, BullMQ].

## Business Model

Revenue model: one-time campaign purchases at $5 for one official, $15 for three officials, and $25 for all matched officials [evidence: apps/api/src/routes/payments.ts]. The web home page repeats the $5 to $25 range [evidence: apps/web/app/page.tsx]. There is no subscription in v1 [evidence: .planning/GENESIS.md].

Gross margin thesis: the old planning soul asserted 91% gross margin, $132.50 per month max burn, and break-even at 11 submissions [evidence: .planning/PROJECT.md]. A separate genesis note asserted 88% to 92% margin on $5 to $25 packages and $0.35 to $0.75 per job [evidence: .planning/GENESIS.md]. The repo's actual treasury code records payments and costs but does not prove those economics [evidence: apps/worker/src/agents/treasury.ts; apps/worker/src/lib/treasury.ts].

Near-term revenue streams should stay narrow: paid citizen campaigns first, refunded or blocked campaigns handled explicitly, and no API, subscriptions, paid ads, coalition features, or certified-mail upsells until live conversion and deliverability are known [evidence: .planning/GENESIS.md; .planning/REQUIREMENTS.md].

## Competition

Named substitutes and competitors:

| Competitor or substitute | Why it matters | CivicState position |
| --- | --- | --- |
| Resistbot | Closest civic-letter substitute named in prior soul; lacks the planned legal research and citation layer [evidence: .planning/PROJECT.md] | Charge for citation-backed research and delivery, not just message routing [evidence: .planning/PROJECT.md] |
| Quorum | Enterprise advocacy incumbent named in prior soul [evidence: .planning/PROJECT.md] | Avoid enterprise sales at launch; serve individuals at $5 to $25 [evidence: apps/api/src/routes/payments.ts] |
| VoterVoice | Enterprise advocacy incumbent named in prior soul [evidence: .planning/PROJECT.md] | Compete on consumer workflow and price, not organization tooling |
| Change.org | Petition platform substitute [assumption: general market knowledge; not network verified] | Focus on direct official correspondence rather than public petitions |
| Manual email or phone call | Free substitute [assumption: obvious user alternative; not externally sourced] | Win only when research, drafting, and routing are worth more than $5 to $25 to the user [evidence: apps/api/src/routes/payments.ts] |
| Local attorneys or advocacy groups | High-trust alternative for legal-adjacent issues [assumption: general market knowledge; not network verified] | Avoid legal advice and keep the product to constituent communication [evidence: apps/web/app/terms/page.tsx] |

## Go-To-Market

First channel: organic content from issue-specific public or shareable campaign pages is the old distribution hypothesis [evidence: .planning/GENESIS.md], but the current repo does not show public campaign publishing as launched [evidence: apps/web/app/dashboard and apps/web/app/submit exist; no public campaign route found]. Treat SEO as a later compounding channel, not a launch proof.

First 100 customers should come from hand-recruited civic pain cohorts: tenant concerns, zoning and nuisance issues, local school policy, permitting or enforcement failures, and consumer-facing public works complaints [assumption: plausible high-intent civic categories; not externally verified]. The operator should recruit manually, watch every job, and capture conversion, refund, bounce, and response data before scaling.

Initial GTM sequence:

- Recruit 25 test users by 2026-07-31 [assumption: operator validation target] and require actual payment unless the operator labels the cohort as free research.
- Deliver 100 paid or explicitly comped letters by 2026-08-31 [assumption: validation batch size] while measuring bounce, complaint, refund, and official-response rates.
- Keep paid acquisition at $0 until the product proves a repeatable conversion loop [assumption: capital discipline for Watchlist asset].
- Add public campaign pages only after moderation, privacy, and recipient-spam risks are understood [evidence: .planning/GENESIS.md].

## Financial Model

Base case uses the implemented $15 midpoint package as average order value [evidence: apps/api/src/routes/payments.ts]. The revenue build reconciles as paid campaigns times average order value.

| Period | Paid campaigns | AOV | Revenue | Direct variable cost | Gross profit | Notes |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
| 2026 launch half | 600 [assumption: early manual cohort] | $15 [evidence: apps/api/src/routes/payments.ts] | $9,000 [assumption: 600 times $15] | $900 [assumption: 10% variable cost] | $8,100 [assumption: revenue minus variable cost] | Requires live delivery before 2026-12-31 [assumption: operating target] |
| 2027 base | 4,800 [assumption: 400 per month times 12 months] | $15 [evidence: apps/api/src/routes/payments.ts] | $72,000 [assumption: 4,800 times $15] | $7,200 [assumption: 10% variable cost] | $64,800 [assumption: revenue minus variable cost] | Mirrors old Month-12 scale concept but not achieved [evidence: .planning/existing-state.md] |
| 2028 base | 18,000 [assumption: modest regional scale] | $15 [evidence: apps/api/src/routes/payments.ts] | $270,000 [assumption: 18,000 times $15] | $27,000 [assumption: 10% variable cost] | $243,000 [assumption: revenue minus variable cost] | Still operator-led, not venture-scale |

Revenue assumptions:

- AOV stays near $15 because the current tiers are $5, $15, and $25 [evidence: apps/api/src/routes/payments.ts].
- Paid conversion must reach at least 3% before scaling [evidence: .planning/PROJECT.md].
- Refund and chargeback drag stays below 5% of gross revenue [assumption: consumer checkout control target; not measured].

Cost assumptions:

- Variable delivery, AI, payment, and support cost is modeled at 10% of revenue [assumption: conservative blend of unverified model/API/payment costs].
- Prior planning named $96 per month for the DigitalOcean backend host and $132.50 per month max burn [evidence: .planning/PROJECT.md; .planning/existing-state.md].
- One operator remains sufficient below 400 campaigns per month [assumption: based on .planning/GENESIS.md one-human-operator hypothesis, not validated].

Sensitivity tests:

- Downside demand: 100 paid campaigns in 2027 at $15 AOV produces $1,500 revenue [assumption: failed launch case], which is not a company.
- Delivery failure: if 20% of letters bounce or require refund [assumption: government inbox risk], customer trust and gross margin collapse despite low software cost.
- CAC pressure: if paid acquisition costs $20 per first purchase [assumption: untested paid channel], a $15 AOV transaction is structurally unprofitable without repeat use.

## Risks & Anti-Plan

The kill-case is simple: CivicState may be a useful personal research asset but not a business. The registry already flags it as Watchlist and "personal/research asset, not near-term investible BOS" [evidence: user dispatch]. If users will not pay, officials block or ignore the mail, citations fail, or the operator cannot safely review edge cases, the correct move is to stop pitching it as venture-backed and keep it as research infrastructure.

Major holes:

- Demand hole: no paid users, no conversion data, no retention, and no willingness-to-pay evidence in repo [evidence: no production revenue/user files found]. Mitigation: run a paid concierge beta. Residual risk: people say they want civic help but will not pay.
- Deliverability hole: government inboxes may reject or deprioritize templated AI-assisted mail [assumption: email deliverability risk; not externally verified]. Mitigation: Postmark, SPF/DKIM/DMARC, bounce gates, opt-out suppression [evidence: scripts/setup-dns.md; apps/worker/src/agents/delivery.ts]. Residual risk: good infrastructure still cannot force official attention.
- Legal and trust hole: legal-adjacent language, political speech, AI disclosure, privacy, and recipient opt-outs create reputational and compliance risk [evidence: apps/web/app/terms/page.tsx; apps/web/app/privacy/page.tsx]. Mitigation: no legal advice, moderation, citation verification, audit logs. Residual risk: one bad letter can define the brand.
- Data-quality hole: local official data may be stale or paid-provider dependent [evidence: .planning/PROJECT.md; apps/api/src/lib/officials]. Mitigation: cache, source tracking, lastVerifiedAt, bounce monitoring [evidence: packages/shared/prisma/schema.prisma]. Residual risk: local coverage is the product and may be expensive.
- Venture-scale hole: even the base model of $72,000 annual revenue in 2027 [assumption: financial model above] is not VC-scale. Mitigation: prove wedge, then evaluate B2B/API or WrkPlug distribution. Residual risk: the market caps out as a small tool.

## Assumption Ledger

| Claim | Basis | Evidence or assumption | Test |
| --- | --- | --- | --- |
| Citizens will pay $5 to $25 for researched civic letters | Implemented pricing and prior soul | [evidence: apps/api/src/routes/payments.ts; .planning/PROJECT.md] | Paid beta conversion by 2026-07-31 [assumption: validation date] |
| 3% conversion is the minimum launch gate | Prior planning gate | [evidence: .planning/PROJECT.md] | Instrument submit-to-pay funnel |
| 85% inbox placement is necessary | Prior planning gate | [evidence: .planning/PROJECT.md] | Seed and live .gov deliverability tests |
| A 5,000,000-campaign TAM is plausible | Scenario only | [assumption: bottom-up placeholder without network research] | Replace with sourced civic participation and paid-intent data |
| Official directory quality can compound | Product data model | [evidence: packages/shared/prisma/schema.prisma; .planning/GENESIS.md] | Measure bounce and correction rate over first 100 letters [assumption: validation batch size] |
| One operator can run launch ops | Prior planning hypothesis | [evidence: .planning/GENESIS.md] | Track review minutes per flagged submission |
| WrkPlug shared rails lower infra and CAC | Platform posture requested by brief | [assumption: WrkPlug Phase Zero not signed] | Operator confirms platform adoption path |

## Self-Valuation

Score: 42 out of 100 [assumption: EIR judgment based on built asset strength versus zero market proof]. The codebase appears materially real, but commercial evidence is absent and the registry says Watchlist [evidence: user dispatch; package.json; apps/api/src/index.ts].

Twelve-month bands under the $5,000,000-per-business program assumption [assumption: program framing from brief, not a market valuation]:

| Case | Value band | Rationale |
| --- | ---: | --- |
| Bear | $0 to $150,000 [assumption: asset value only] | No paid conversion or deliverability; remains research code |
| Base | $300,000 to $800,000 [assumption: small revenue multiple plus product asset] | 400 campaigns per month by 2027-06-30 [assumption: target] with acceptable support burden |
| Bull | $1,500,000 to $3,000,000 [assumption: strategic option value] | Repeatable paid funnel, low refund rate, official data moat, and WrkPlug distribution |

Comparable categories used: Resistbot-like civic messaging, Quorum/VoterVoice-like advocacy infrastructure, Change.org-like civic intent capture, and legal-document automation tools [assumption: category comparables; not network verified].

## Milestones

- 2026-06-30 [assumption: operator target]: confirm whether the project should pitch as a business or remain a personal/research asset.
- 2026-07-15 [assumption: operator target]: run a full end-to-end test using real provider sandboxes, with payment, webhook, treasury, letter generation, and delivery logs.
- 2026-07-31 [assumption: operator target]: complete first 25 recruited user sessions and measure submit-to-pay conversion.
- 2026-08-31 [assumption: operator target]: deliver 100 paid or explicitly comped letters and report bounce rate, refund rate, and official response rate.
- 2026-09-30 [assumption: operator target]: operator ruling on continue, pivot to WrkPlug client, or freeze as research.

## Surprise Spikes

- Repo reality contradicts stale planning: .planning/existing-state.md says there is zero application code, but the current repo contains a web app, API, worker, Prisma schema, and tests [evidence: .planning/existing-state.md; package.json; apps/api/src/index.ts; apps/worker/src/index.ts; tests].
- Business identity is unsettled: prior files call the project CivicState [evidence: .planning/PROJECT.md], while the worker dispatch identifies project `brooks-history` and repo `RPLogic-Inc/brookss-history` [evidence: user dispatch].
- Economic claims conflict: .planning/PROJECT.md says break-even at 11 submissions and 91% gross margin [evidence: .planning/PROJECT.md], while .planning/GENESIS.md says break-even at about 25 Amplify-tier submissions and 88% to 92% margin [evidence: .planning/GENESIS.md]. The upgraded plan treats both as unvalidated planning inputs.
- Terms say letters to officials are not subject to CAN-SPAM [evidence: apps/web/app/terms/page.tsx], while the planning posture says treat all emails as commercial for safety [evidence: .planning/PROJECT.md]. Operator/legal review is required before launch.
