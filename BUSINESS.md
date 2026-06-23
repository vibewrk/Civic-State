# CivicState - Business Plan

## Thesis

As of 2026-06-23 [evidence: dispatch current_date], CivicState is best treated as a watchlist personal/research asset until an operator confirms it should pitch as a business [evidence: registry note in dispatch]. If converted into a business, the falsifiable thesis is: US residents will pay for a compliant, citation-backed constituent-letter workflow when it saves them research, routing, and drafting work that they otherwise would abandon [assumption: no customer validation found in repo].

## Problem & Customer

The customer in the current repo narrative is an ordinary US resident with a civic concern, a desired government action, and uncertainty about the right official, law, and letter format [evidence: [.planning/PROJECT.md](.planning/PROJECT.md), [MASTER_PLAN.md](MASTER_PLAN.md)]. The repo also treats the platform operator as a second user: a small admin team reviews flagged submissions, payments, delivery failures, treasury discrepancies, and official-directory issues [evidence: [apps/api/src/routes/admin.ts](apps/api/src/routes/admin.ts), [.planning/REQUIREMENTS.md](.planning/REQUIREMENTS.md)].

Primary segments:

- Individual constituents who want a researched letter delivered to government officials for $5, $15, or $25 [evidence: [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts), [.planning/PROJECT.md](.planning/PROJECT.md)].
- Operators running a compliance-heavy civic delivery workflow with moderation, audit logs, delivery tracking, and reconciliation [evidence: [apps/api/src/lib/moderation.ts](apps/api/src/lib/moderation.ts), [apps/worker/src/agents/reconciliation.ts](apps/worker/src/agents/reconciliation.ts)].
- Future organizations such as HOAs or nonprofits are explicitly deferred, not launch customers [evidence: [.planning/PROJECT.md](.planning/PROJECT.md), [.planning/REQUIREMENTS.md](.planning/REQUIREMENTS.md)].

The current plan has no repo evidence of paying customers, signed partners, conversion data, or deliverability results [evidence: [.planning/PROJECT.md](.planning/PROJECT.md) "Validated: none yet"]. The customer definition remains an operator hypothesis [assumption: market validation not present in workspace].

## Market

Network research was unavailable in this worker run, so no external market-size fact is evidence. The market model below is a bottom-up planning proxy, not a claim about actual demand.

| Layer | Method | Value |
|---|---|---:|
| TAM proxy | 10,000,000 potential US civic-action payers [assumption: placeholder population basis; requires external sizing] x $15 average order value [assumption: midpoint of repo pricing] x 1 order per year [assumption: frequency placeholder] | $150,000,000/year [assumption: arithmetic proxy, not sourced market fact] |
| SAM proxy | 500,000 reachable search/social/referral users [assumption: launch-reachable slice placeholder] x $15 average order value [assumption: midpoint of repo pricing] x 1 order per year [assumption: frequency placeholder] | $7,500,000/year [assumption: arithmetic proxy, not sourced market fact] |
| SOM proxy | 15,000 paid submissions [assumption: early-scale operating target] x $15 average order value [assumption: midpoint of repo pricing] x 1 order per year [assumption: frequency placeholder] | $225,000/year [assumption: arithmetic proxy, not sourced market fact] |

The market is attractive only if three tests clear: paid conversion of at least 3% [assumption: prior plan gate in [.planning/PROJECT.md](.planning/PROJECT.md), not validated], government-email inbox placement of at least 85% [assumption: prior plan gate in [.planning/PROJECT.md](.planning/PROJECT.md), not validated], and official-lookup coverage high enough that users trust the result [assumption: provider coverage not validated in repo].

## Product & Moat

What is real in the repository as of 2026-06-23 [evidence: dispatch current_date]:

- A TypeScript monorepo with Next.js, Express, worker, shared Prisma package, Docker files, and tests [evidence: [package.json](package.json), [apps/web/app/page.tsx](apps/web/app/page.tsx), [apps/api/src/index.ts](apps/api/src/index.ts)].
- A database model for users, submissions, campaigns, letters, officials, payments, deliveries, ledger entries, audit logs, agent logs, and jobs [evidence: [packages/shared/prisma/schema.prisma](packages/shared/prisma/schema.prisma)].
- Submission creation with ZIP validation, moderation, audit logging, and BullMQ queueing [evidence: [apps/api/src/routes/submissions.ts](apps/api/src/routes/submissions.ts)].
- Stripe Checkout tiers of $5, $15, and $25 [evidence: [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts)].
- Postmark delivery, bounce handling, spam-complaint suppression, reply routing, and delivery webhooks in code [evidence: [apps/worker/src/agents/delivery.ts](apps/worker/src/agents/delivery.ts), [apps/api/src/routes/webhooks.ts](apps/api/src/routes/webhooks.ts)].
- Legal citation search and verification paths using eCFR, CourtListener, and a state cache [evidence: [apps/worker/src/agents/researcher.ts](apps/worker/src/agents/researcher.ts), [tests/citation-verifier.test.ts](tests/citation-verifier.test.ts)].

What is not proven:

- Real official data coverage, especially local officials, remains unvalidated [evidence: [.planning/STATE.md](.planning/STATE.md)].
- Live deliverability to government domains remains unvalidated [assumption: no delivery metrics found].
- The claimed demand for paid citizen advocacy letters remains unvalidated [evidence: [.planning/PROJECT.md](.planning/PROJECT.md) "Validated: none yet"].

Potential moat is operational, not algorithmic: compliance posture, citation discipline, official-directory quality, deliverability reputation, and audit trails can compound if the system is used repeatedly [assumption: defensibility mechanism inferred from repo architecture].

## Platform Posture

Per the dispatch template, this should be positioned as a WrkPlug client under D-032 [assumption: dispatch template basis]. The business should not hard-wire its own long-term auth, billing, identity, or login if WrkPlug shared rails become available [assumption: WrkPlug Phase 0 not signed]. Today, the repo already contains Clerk and Stripe integrations [evidence: [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts), [apps/api/src/middleware/auth.ts](apps/api/src/middleware/auth.ts)].

Cost and moat consequence: shared rails could reduce infrastructure and customer-acquisition overhead while letting CivicState focus on civic workflow, citation verification, official routing, and deliverability [assumption: platform benefit not validated for this repo]. Until operator adoption, CivicState should preserve its current standalone implementation while documenting the migration boundary [assumption: roadmap posture].

## Business Model

Launch revenue is transactional: one paid letter campaign per user submission, with tiers of $5, $15, and $25 [evidence: [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts)]. The repo previously mentions a 40% net margin floor [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)], while the active code uses hardcoded tiers and does not yet compute dynamic per-job margin [evidence: [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts)].

Revenue streams:

- Letter packages at $5, $15, and $25 [evidence: [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts)].
- Priority complex review at a premium price [assumption: mentioned in [MASTER_PLAN.md](MASTER_PLAN.md), not implemented in code].
- Organization/API access in a later phase [evidence: [.planning/REQUIREMENTS.md](.planning/REQUIREMENTS.md) lists third-party API as out of scope].

Unit economics model:

| Metric | Base value | Honesty label |
|---|---:|---|
| Average order value | $15 | [assumption: midpoint of hardcoded tiers] |
| Variable AI and email cost per paid job | $0.50 | [assumption: no live cost ledger found] |
| Payment processing burden | 3% plus $0.30 per order | [assumption: common card-processing placeholder, not verified in workspace] |
| Modeled variable cost per paid job | $1.25 | [assumption: $0.50 plus $0.45 plus $0.30 arithmetic from assumptions] |
| Modeled gross margin | 91.7% | [assumption: ($15 - $1.25) / $15] |
| Chargeback risk guardrail | below 0.5% | [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)] |

## Competition

Named alternatives and competitors:

| Competitor/substitute | Position | CivicState differentiation |
|---|---|---|
| Resistbot | SMS/contact-your-representative substitute [assumption: external description not verified in this run; name appears in [MASTER_PLAN.md](MASTER_PLAN.md)] | More emphasis on research-backed citations and paid delivery [assumption: differentiation from repo plan, not market validated] |
| Change.org | Petition and public campaign substitute [assumption: external description not verified in this run; name appears in [MASTER_PLAN.md](MASTER_PLAN.md)] | Direct constituent letters instead of petition aggregation [assumption: not externally verified] |
| Quorum | Enterprise public-affairs platform [assumption: external description not verified in this run; name appears in [.planning/PROJECT.md](.planning/PROJECT.md)] | Individual transactional workflow instead of enterprise subscriptions [assumption: not externally verified] |
| VoterVoice | Advocacy campaign platform [assumption: external description not verified in this run; name appears in [.planning/PROJECT.md](.planning/PROJECT.md)] | User-initiated civic research and delivery [assumption: not externally verified] |
| Manual direct outreach | Free substitute [assumption: user behavior hypothesis] | Saves research, drafting, routing, and tracking effort [assumption: value hypothesis] |

The most dangerous competitor is not a company; it is user unwillingness to pay because officials can already be contacted for free [assumption: anti-plan risk].

## Go-To-Market

The first one hundred customers [assumption: launch target, not evidence] should come from narrow civic issue pages, local community groups, and operator-led pilots where the value of correct routing and professional drafting is visible. Paid acquisition is not justified until conversion, inbox placement, and official coverage are measured [assumption: no CAC data in repo].

Launch channels:

- Search-led pages around civic problems and agency contact workflows [assumption: SEO strategy appears in [MASTER_PLAN.md](MASTER_PLAN.md), not validated].
- Small issue-specific pilots with residents who already intend to contact an official [assumption: customer-acquisition hypothesis].
- Partnerships with local civic groups, HOAs, and nonprofits only after the individual workflow works [assumption: future channel; organization API is out of scope in [.planning/REQUIREMENTS.md](.planning/REQUIREMENTS.md)].

Near-term GTM gates:

- Confirm willingness to pay at the $5, $15, and $25 tiers [evidence: code tiers; assumption: customer demand].
- Measure whether research preview drives account creation before payment [assumption: funnel metric not found].
- Verify government-domain delivery and reply capture before expanding traffic [assumption: deliverability not measured].

## Financial Model

This is a planning model, not a forecast. It uses repo pricing and explicit assumptions so the math can be falsified.

Revenue assumptions:

- Average order value is $15 [assumption: midpoint of hardcoded tiers].
- Paid submissions are 500 in operating year A, 3,000 in operating year B, and 12,000 in operating year C [assumption: scenario volumes].
- No subscription, API, or marketplace revenue is included [evidence: [.planning/PROJECT.md](.planning/PROJECT.md) removed subscriptions from active plan].

Cost assumptions:

- Variable cost is $1.25 per paid job [assumption: modeled AI, email, and payment-processing burden].
- Fixed platform cost is $6,552 in operating year A [assumption: $1,152 DigitalOcean from [MASTER_PLAN.md](MASTER_PLAN.md) plus $5,400 assumed tools/provider spend].
- Fixed platform cost is $12,000 in operating year B and $60,000 in operating year C [assumption: added provider, monitoring, support, and infrastructure scale].
- Paid headcount is 0 FTE in operating year A, 0 FTE in operating year B, and 1 FTE in operating year C [assumption: lean operator model; no payroll evidence in repo].

| Line | Operating year A | Operating year B | Operating year C |
|---|---:|---:|---:|
| Paid submissions | 500 [assumption] | 3,000 [assumption] | 12,000 [assumption] |
| Average order value | $15 [assumption] | $15 [assumption] | $15 [assumption] |
| Revenue | $7,500 [assumption: 500 x $15] | $45,000 [assumption: 3,000 x $15] | $180,000 [assumption: 12,000 x $15] |
| Variable costs | $625 [assumption: 500 x $1.25] | $3,750 [assumption: 3,000 x $1.25] | $15,000 [assumption: 12,000 x $1.25] |
| Gross profit | $6,875 [assumption] | $41,250 [assumption] | $165,000 [assumption] |
| Fixed platform and tools | $6,552 [assumption] | $12,000 [assumption] | $60,000 [assumption] |
| Operating profit before owner salary | $323 [assumption] | $29,250 [assumption] | $105,000 [assumption] |

Sensitivity tests:

- If average order value falls to $5 [evidence: lowest hardcoded tier], operating year A revenue falls to $2,500 [assumption: 500 x $5] and the model is uninvestible without much higher volume.
- If variable cost rises to $3.00 per job [assumption: LLM/research/provider downside], modeled gross margin at $15 average order value falls to 80.0% [assumption: ($15 - $3) / $15].
- If paid conversion is below 1% [assumption: downside funnel], organic traffic must be very large before the business funds even modest fixed costs [assumption: no traffic data found].

## Risks & Anti-Plan

The skeptic case is strong. This may not be a venture-backed business.

| Hole | Mitigation | Residual risk |
|---|---|---|
| Users may not pay for something they can do for free by emailing officials directly [assumption: core demand risk]. | Run paid pilots before expanding product scope [assumption]. | If conversion is below 1% [assumption], shut down the business pitch and keep as a personal/research asset. |
| Government-email deliverability may be poor, causing paid users to feel scammed [assumption: no inbox data found]. | Domain warming, bounce thresholds, Postmark webhooks, and suppression are built or planned [evidence: [apps/worker/src/agents/delivery.ts](apps/worker/src/agents/delivery.ts), [.planning/REQUIREMENTS.md](.planning/REQUIREMENTS.md)]. | A technically delivered email may still be ignored, filtered, or politically discounted [assumption]. |
| Official routing data may be incomplete or stale, especially local officials [evidence: [.planning/STATE.md](.planning/STATE.md)]. | Use congress.gov, OpenStates, and a paid local provider evaluation [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)]. | Local coverage could be too costly or unreliable for a low-price product [assumption]. |
| Citation-backed AI letters raise legal, compliance, and reputational risk [assumption: regulated-adjacent civic workflow]. | Citation verification, disclaimers, moderation, audit logs, and human review are in scope [evidence: [apps/worker/src/agents/researcher.ts](apps/worker/src/agents/researcher.ts), [apps/api/src/lib/moderation.ts](apps/api/src/lib/moderation.ts)]. | A bad letter, hallucinated authority, or harassment edge case could create outsized harm [assumption]. |
| The current repo may overstate completeness because roadmap files conflict [evidence: [.planning/ROADMAP.md](.planning/ROADMAP.md), [.planning/STATE.md](.planning/STATE.md)]. | Treat code and tests as reality, planning docs as intent [assumption: diligence method]. | Investor confidence suffers until a clean demo and deployment are verified [assumption]. |

## Assumption Ledger

| Claim | Basis | Evidence-or-assumption | Test |
|---|---|---|---|
| People will pay $5 to $25 for this workflow | Repo pricing and product hypothesis | [evidence: [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts)] plus [assumption: willingness to pay] | Run paid pilot and measure conversion |
| Average order value can be $15 | Midpoint of pricing tiers | [assumption: no mix data] | Track tier mix after first paid campaigns |
| Variable cost can stay near $1.25 per job | Modeled AI, email, and payment costs | [assumption: no live ledger] | Compare ledger_entries and provider invoices |
| Official coverage can support user trust | Hybrid provider plan | [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)] plus [assumption: local data quality] | ZIP-by-ZIP coverage audit |
| Inbox placement can exceed 85% | Prior plan gate | [assumption: no inbox data found] | Seed-list and real-recipient deliverability test |
| Compliance workflow can avoid abusive use | Moderation and admin tooling | [evidence: [apps/api/src/lib/moderation.ts](apps/api/src/lib/moderation.ts), [apps/api/src/routes/admin.ts](apps/api/src/routes/admin.ts)] plus [assumption: real-world adequacy] | Review flagged cases and false negatives |
| CivicState can become investible | Registry says watchlist, not near-term investible | [evidence: dispatch registry note] plus [assumption: operator may still choose to pitch] | Operator ruling after validation |

## Self-Valuation

Score: 2.1 out of 5.0 [assumption: EIR judgment based on repo maturity, unvalidated demand, and registry watchlist note].

Twelve-month valuation bands under the $5,000,000-per-business program assumption [assumption: dispatch/program framing, not market evidence]:

- Bear: $0 to $100,000 [assumption: remains personal/research asset or fails paid demand].
- Base: $300,000 to $700,000 [assumption: working product, modest paid pilots, unresolved venture scale].
- Bull: $1,000,000 to $2,000,000 [assumption: clear paid conversion, reliable delivery, sourced market evidence, and repeatable acquisition].

Comparables used: Resistbot, Change.org, Quorum, and VoterVoice [assumption: names from repo plan and model knowledge, not externally researched in this run]. Method: score the asset as a pre-revenue civic workflow with code evidence but no customer evidence; move valuation upward only with paid conversion, deliverability, and official coverage data [assumption: venture diligence method].

## Milestones

| Date | Milestone | Pass/fail test |
|---|---|---|
| 2026-07-15 [assumption: proposed] | Operator ruling on whether this is a business or personal/research asset | Written decision updates DECISIONS.md and registry posture |
| 2026-08-15 [assumption: proposed] | Product reality demo | End-to-end submission, moderation, research, draft, payment, delivery sandbox, and admin review run without manual database edits |
| 2026-09-15 [assumption: proposed] | Market evidence packet | At least one paid pilot cohort reports conversion, delivery, refund, and support metrics [assumption: target evidence requirement] |
| 2026-10-15 [assumption: proposed] | Investibility gate | Operator either promotes to build-operate-scale candidate or explicitly preserves as research asset |

## Surprise Spikes

- Project identity mismatch: dispatch calls the project `brooks-history`, while repo-local product files describe `CivicState` [evidence: dispatch, [.planning/PROJECT.md](.planning/PROJECT.md), [package.json](package.json)].
- Registry posture conflicts with the product plan: registry says watchlist and not near-term investible, while repo docs pitch a transactional civic-tech business [evidence: dispatch registry note, [.planning/PROJECT.md](.planning/PROJECT.md)].
- Roadmap state conflicts: `.planning/ROADMAP.md` marks all phases complete on 2026-04-25 [evidence: [.planning/ROADMAP.md](.planning/ROADMAP.md)], while `.planning/STATE.md` says only Phase 1 was complete on 2026-04-25 [evidence: [.planning/STATE.md](.planning/STATE.md)].
- Code maturity is ahead of the stated state file in several areas: payment, admin, delivery, treasury, and compliance code exists [evidence: [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts), [apps/api/src/routes/admin.ts](apps/api/src/routes/admin.ts), [apps/worker/src/agents/delivery.ts](apps/worker/src/agents/delivery.ts)].
- A possible implementation/schema mismatch exists in retention logic: reconciliation references `deletedAt` on job/agent log records, while the Prisma `Job` and `AgentActionLog` models shown in this workspace do not define `deletedAt` [evidence: [apps/worker/src/agents/reconciliation.ts](apps/worker/src/agents/reconciliation.ts), [packages/shared/prisma/schema.prisma](packages/shared/prisma/schema.prisma)].

