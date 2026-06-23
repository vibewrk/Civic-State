# Brooks History / CivicState Business Soul

## Snapshot Thesis

As of `2026-06-23` [evidence: worker current_date], the repository evidence describes **CivicState**, not a Brooks-history content project: a paid workflow for United States residents who want help researching, drafting, routing, and sending civic letters to government officials [evidence: `package.json`; evidence: `.planning/PROJECT.md`; evidence: `apps/web/app/page.tsx`].

The business thesis is **watchlist, validation-first, not investible yet**. The codebase contains real product surfaces for submissions, officials, payments, delivery, compliance, a Prisma schema, and worker agents [evidence: `apps/api/src/routes/submissions.ts`; evidence: `apps/api/src/routes/payments.ts`; evidence: `apps/worker/src/agents`; evidence: `packages/shared/prisma/schema.prisma`]. The repo and registry do **not** contain paid usage, production delivery, market research, or operator confirmation that this should be pitched as a near-term business [evidence: registry dispatch note; evidence: `.planning/existing-state.md`].

Ten-second read: CivicState may become a niche paid civic-letter workflow, but it should stay off the investible track until identity, willingness-to-pay, government inbox delivery, and compliance workload are proven [assumption: EIR judgment from workspace-only evidence].

## Evidence Base and Honesty Labels

This review was workspace-only: no network research was available [evidence: worker dispatch]. Repo files and registry notes are cited as `[evidence: ...]`. Market, competitor, financial, and demand claims without repo proof are tagged `[assumption: ...]`.

Evidence sources used:

- `package.json`: package name, product description, scripts, and CivicState identity [evidence: `package.json`].
- `.planning/PROJECT.md`: product definition, target user, pricing, validation gates, constraints, and decisions [evidence: `.planning/PROJECT.md`].
- `.planning/GENESIS.md`: demand hypothesis, value chain, distribution hypothesis, moat hypothesis, and break-even claim [evidence: `.planning/GENESIS.md`].
- `.planning/REQUIREMENTS.md`: current requirement status and deferred scope [evidence: `.planning/REQUIREMENTS.md`].
- `.planning/ROADMAP.md`: previous phase narrative and completion claims [evidence: `.planning/ROADMAP.md`].
- `.planning/existing-state.md`: stale audit claiming no app code and zero revenue [evidence: `.planning/existing-state.md`].
- `apps/api/src/routes/payments.ts`: hardcoded `$5`, `$15`, and `$25` checkout tiers [evidence: `apps/api/src/routes/payments.ts`].
- `apps/api/src/routes/officials.ts`: ZIP-based officials endpoint and request limiting [evidence: `apps/api/src/routes/officials.ts`].
- `apps/worker/src/agents/researcher.ts`: eCFR, CourtListener, state-cache search and citation verification workflow [evidence: `apps/worker/src/agents/researcher.ts`].
- `apps/worker/src/agents/delivery.ts`: Postmark delivery, opt-out skip, and bounce-threshold logic [evidence: `apps/worker/src/agents/delivery.ts`].
- `packages/shared/prisma/schema.prisma`: implemented data model for users, submissions, campaigns, letters, officials, payments, deliveries, ledger entries, audit logs, agent logs, and jobs [evidence: `packages/shared/prisma/schema.prisma`].
- Registry dispatch note: watchlist sensitivity, personal/research asset warning, and operator-confirmation requirement before pitching as a business [evidence: registry dispatch note].

## Customer Definition

Primary customer: an individual United States resident with a concrete civic issue, a desired outcome, a ZIP code, and willingness to pay for help turning that concern into a researched, citation-backed constituent letter [evidence: `.planning/PROJECT.md`; evidence: `.planning/GENESIS.md`; evidence: `apps/api/src/routes/submissions.ts`].

Buyer and user are the same at launch [assumption: no organization checkout or sales workflow appears in the repo]. Government officials are recipients, not customers [evidence: `.planning/PROJECT.md`]. Enterprise advocacy teams, HOAs, nonprofits, API consumers, legal claimants, and users seeking legal filings are outside launch scope [evidence: `.planning/REQUIREMENTS.md`].

Customer pain is plausible but unvalidated: the user avoids researching jurisdiction, finding officials, drafting formal language, verifying citations, and sending the message [assumption: product thesis from `.planning/GENESIS.md`, not measured behavior].

## Product Reality

What is real in the repo:

- Next.js web surface with CivicState landing and submission-related routes [evidence: `apps/web/app/page.tsx`; evidence: `apps/web/app/submit/page.tsx`].
- Express API routes for submissions, officials, payments, webhooks, campaigns, admin, compliance, and health [evidence: `apps/api/src/index.ts`].
- Stripe Checkout creation tied to a submission and a selected pricing tier [evidence: `apps/api/src/routes/payments.ts`].
- Postmark delivery and inbound webhook handling surfaces [evidence: `apps/worker/src/agents/delivery.ts`; evidence: `apps/api/src/routes/webhooks.ts`].
- Worker agents for classification, research, drafting, delivery, treasury, and reconciliation [evidence: `apps/worker/src/agents`].
- Prisma schema with application data and append-only ledger/audit concepts [evidence: `packages/shared/prisma/schema.prisma`].
- Tests for payments, officials, moderation, compliance, delivery, treasury, citation verification, API routes, and admin surfaces [evidence: `tests`].

What is not proven:

- Production traffic is not evidenced [evidence: no analytics or production traffic file found in workspace].
- Production revenue is `$0` or unproven in repo evidence [evidence: `.planning/existing-state.md`; assumption: no ledger export or Stripe report exists in workspace].
- Live inbox placement, official response rate, chargebacks, paid conversion, and operator review load are not evidenced [assumption: no production metrics found].
- Brooks History identity is not supported by local product files; CivicState identity is [evidence: `package.json`; evidence: registry dispatch note].

## Market Sizing

No top-down TAM is claimed. In workspace-only mode, a credible market sizing section must be a validation ladder, not a venture forecast [assumption: diligence method].

Bottom-up validation ladder:

| Scenario | Paid submissions per month | Blended price | Monthly revenue | Why it matters |
|---|---:|---:|---:|---|
| Concierge proof | `25` [assumption: validation cohort] | `$15` [assumption: midpoint of repo tiers] | `$375` [assumption: `25` x `$15`] | Proves any willingness to pay before building more. |
| Local wedge | `100` [assumption: narrow beta scale] | `$12` [assumption: mix of `50` single, `30` three-pack, `20` full-spread] | `$1,200` [assumption: `50` x `$5` + `30` x `$15` + `20` x `$25`] | Enough volume to observe conversion, delivery, and review burden. |
| Small operating business | `400` [assumption: scenario, consistent with planning-scale examples] | `$15` [assumption: midpoint of repo tiers] | `$6,000` [assumption: `400` x `$15`] | Tests whether this is a useful owner-operated product. |
| National niche | `10,000` [assumption: scenario, not demand evidence] | `$15` [assumption: midpoint of repo tiers] | `$150,000` monthly / `$1,800,000` annual run-rate [assumption: `10,000` x `$15` x `12`] | Shows the distance to venture scale, not current evidence. |

The investibility hurdle is not market size on paper; it is whether the product can acquire paid submissions at low cost while keeping citation, moderation, deliverability, and compliance labor inside the economics [assumption: EIR judgment].

## Revenue Model and Pricing

Launch revenue model: one-time transactional checkout [evidence: `apps/api/src/routes/payments.ts`].

Hardcoded tiers:

- Single official: `$5` [evidence: `apps/api/src/routes/payments.ts`].
- Three officials: `$15` [evidence: `apps/api/src/routes/payments.ts`].
- Full spread: `$25` [evidence: `apps/api/src/routes/payments.ts`].

Planning constraints include a `40%` net margin floor [evidence: `.planning/PROJECT.md`] and a chargeback target below `0.5%` [evidence: `.planning/PROJECT.md`]. Payment tests model tier margins above `90%` under test assumptions [evidence: `tests/payment.test.ts`].

Revenue model risk: the route hardcodes price, but the business has not proven conversion, refund risk, complaint risk, or human review cost [assumption: no production metrics found].

## Financial Model

This is a validation model, not a forecast [assumption: no production revenue evidence].

| Line | Local wedge model |
|---|---:|
| Paid submissions | `100` per month [assumption: beta target] |
| Tier mix | `50` single, `30` three-pack, `20` full-spread [assumption: illustrative mix] |
| Gross revenue | `$1,200` [assumption: `50` x `$5` + `30` x `$15` + `20` x `$25`] |
| Variable cost per submission | `$1.10` [assumption: placeholder for model calls, payment fees, email, and operations not proven by bills] |
| Total variable cost | `$110` [assumption: `100` x `$1.10`] |
| Contribution profit before fixed cost | `$1,090` [assumption: `$1,200` - `$110`] |
| Contribution margin | `90.8%` [assumption: `$1,090` / `$1,200`] |
| Backend droplet | `$96` per month [evidence: `.planning/PROJECT.md`] |
| Required reserve | `$1,500` [evidence: `.planning/PROJECT.md`] |
| Mercury warning threshold | `$2,000` [evidence: `.planning/PROJECT.md`] |
| Mercury emergency threshold | `$500` [evidence: `.planning/PROJECT.md`] |
| Reconciliation discrepancy alert | `$0.10` [evidence: `.planning/REQUIREMENTS.md`] |
| Job overage pause | `150%` of estimated budget [evidence: `.planning/REQUIREMENTS.md`] |

The table reconciles internally: gross revenue is the tier build, and contribution profit is revenue less variable cost [assumption: arithmetic model]. The weakest input is variable cost because no real vendor bill or operator-time data exists [assumption: no production financial records found].

## Go To Market

Do not start with SEO or paid acquisition. Start with an operator-led beta in one geography or one issue category [assumption: best validation path given no demand evidence].

Sequence:

- Recruit a narrow cohort of residents with active civic issues [assumption: first cohort must be manually sourced because no traffic exists].
- Run the end-to-end workflow and require real checkout before delivery [assumption: willingness-to-pay is the first gate].
- Measure preview-to-payment conversion against the `3%` validation target [evidence: `.planning/PROJECT.md`].
- Measure government inbox placement against the `85%` validation target [evidence: `.planning/PROJECT.md`].
- Measure federal/state coverage against the `95%` target and local coverage against the `60%` target [evidence: `.planning/PROJECT.md`].
- Only after delivery and privacy are proven, consider opt-in public campaign pages for organic search [evidence: `.planning/GENESIS.md`; assumption: SEO claim not externally validated].

## Competition

Named competitors and substitutes:

- Resistbot: consumer civic-contact substitute named by repo planning [evidence: `.planning/PROJECT.md`; assumption: current product comparison not independently verified].
- Quorum: enterprise advocacy platform named by repo planning [evidence: `.planning/PROJECT.md`; assumption: current pricing and feature comparison not independently verified].
- VoterVoice: enterprise advocacy platform named by repo planning [evidence: `.planning/PROJECT.md`; assumption: current pricing and feature comparison not independently verified].
- Change.org: public petition substitute named in previous gate examples and common category analysis [assumption: not evidenced by current repo files].
- LegalZoom and general AI drafting tools: partial substitutes for drafting or legal-adjacent help [assumption: category analysis].
- Manual official email/contact forms: free substitute [assumption: category analysis].

Positioning claim: CivicState differs only if it reliably combines official targeting, verified citations, letter drafting, payment, and delivery in one workflow [assumption: differentiation depends on live performance].

## Risks and Anti-Plan

The strongest kill case: this may be a polished civic-tech demo for a problem people will not pay to solve, delivered into inboxes that may filter it, with legal-adjacent review work that destroys the margin [assumption: EIR anti-plan].

Specific risks:

- Identity mismatch: dispatch says `brooks-history`, repo says `CivicState`; wrong public framing would mislead wrk.vc readers [evidence: registry dispatch note; evidence: `package.json`].
- No paid demand evidence: `$0` production revenue is the only evidenced revenue posture [evidence: `.planning/existing-state.md`; assumption: no production payment records found].
- Official data risk: local provider integration is a stub/pending choice [evidence: `apps/api/src/lib/officials/cicero.ts`; evidence: `.planning/PROJECT.md`].
- Deliverability risk: government inbox performance is unproven; bounce pause logic exists but does not prove placement [evidence: `apps/worker/src/agents/delivery.ts`; assumption: no inbox-placement report found].
- Citation risk: verification logic exists, but production accuracy and edge cases are unproven [evidence: `apps/worker/src/agents/researcher.ts`; assumption: no production citation audit found].
- Compliance risk: civic/political and legal-adjacent speech may require counsel and human moderation before launch [assumption: regulatory/legal conclusion not made].
- Operator-load risk: a low-ticket workflow can fail if each flagged item needs manual editing [assumption: no queue-depth metrics found].
- Provider risk: payments, AI, email, and hosting vendors may treat civic/political content cautiously [assumption: external provider-risk claim not verified in workspace-only mode].

Anti-plan: do **not** raise, pitch, or scale until an operator confirms business intent, the first paid cohort completes delivery, and metrics show conversion, inbox placement, official coverage, citation verification, chargebacks, and review minutes are inside thresholds [assumption: EIR recommendation].

## Assumption Ledger

| Assumption | Basis | Validation |
|---|---|---|
| Users will pay `$5` to `$25` for civic letter help | Repo pricing and product thesis [evidence: `apps/api/src/routes/payments.ts`; assumption: willingness-to-pay unvalidated] | Live checkout conversion. |
| A `$12` to `$15` blended price is reachable | Midpoint and local wedge model [assumption: tier mix] | Actual tier distribution. |
| Variable cost can stay near `$1.10` per paid submission | Placeholder model for API, email, payment, and review cost [assumption: no vendor bills] | Ledger, token logs, Stripe fees, Postmark bills, operator-time logs. |
| Organic search can later compound | Repo genesis distribution hypothesis [evidence: `.planning/GENESIS.md`; assumption: no traffic evidence] | Indexed public pages, impressions, conversion. |
| One operator can handle launch moderation | Repo operating thesis [evidence: `.planning/GENESIS.md`; assumption: no queue-depth evidence] | Review minutes per flagged submission and oldest-item SLA. |
| Government inbox placement can hit `85%` | Repo validation target [evidence: `.planning/PROJECT.md`; assumption: not yet measured] | Seeded deliverability test. |
| Federal/state official coverage can hit `95%` and local coverage can hit `60%` | Repo validation target [evidence: `.planning/PROJECT.md`; assumption: not yet measured] | ZIP sample audit. |

## Milestones and Gates

Validation gates before business pitch:

- Operator identity ruling: should this be CivicState, Brooks History, or a personal/research asset? [evidence: registry dispatch note].
- Paid beta: at least `25` paid submissions [assumption: minimum useful cohort] with no unpaid delivery exceptions [assumption: validation discipline].
- Conversion: preview-to-checkout at or above `3%` [evidence: `.planning/PROJECT.md`].
- Deliverability: government inbox placement at or above `85%` [evidence: `.planning/PROJECT.md`].
- Coverage: federal/state official coverage at or above `95%`, local coverage at or above `60%` [evidence: `.planning/PROJECT.md`].
- Chargebacks: below `0.5%` [evidence: `.planning/PROJECT.md`].
- Review load: median human review time below `10` minutes per flagged item [assumption: margin-preserving operator threshold].

## Surprise Spikes

- The registry names `brooks-history`, but the workspace product is CivicState [evidence: registry dispatch note; evidence: `package.json`].
- `.planning/existing-state.md` says zero application code exists, yet the current repo contains a Next.js app, Express API, worker agents, Prisma schema, and tests [evidence: `.planning/existing-state.md`; evidence: `apps`; evidence: `packages`; evidence: `tests`].
- `.planning/ROADMAP.md` marks all phases complete, while `.planning/REQUIREMENTS.md` still marks many launch requirements pending [evidence: `.planning/ROADMAP.md`; evidence: `.planning/REQUIREMENTS.md`].
- The current implementation is stronger than the stale audit, but business evidence is still absent [assumption: EIR synthesis].

## Recommendation

Keep CivicState/Brooks History on watchlist as a validation project. It is not a near-term investible business until the operator resolves identity and proves paid demand, official targeting, citation quality, inbox delivery, compliance posture, and operator workload with live data [assumption: EIR recommendation].
