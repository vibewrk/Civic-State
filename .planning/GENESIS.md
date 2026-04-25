# CivicState — Genesis Context

> Informational, not a gate. Helps models build the right thing first.

## Key Assumptions

1. **Demand exists.** Citizens will pay $5-$25 to skip the research/drafting/routing work they currently abandon entirely.
2. **AI citation quality is sufficient.** Claude Sonnet/Opus can reliably find and cite applicable law (statute numbers, CFR sections, ordinances) without fabrication at production scale.
3. **Email-first is enough.** Physical mail and fax can wait — email delivery to officials is sufficient for initial traction and revenue.
4. **Non-partisan reframing works.** Outcome-focused language gets higher official response rates than grievance-first language, and users will accept the rewrite.
5. **Token economics hold.** At ~$0.35-$0.75 per job (Sonnet-tier), margins stay at 88-92% on $5-$25 packages. Anthropic pricing changes could compress this.
6. **One human operator is enough.** The flagging/escalation queue (legal-adjacent language, unverifiable claims, bulk patterns) can be handled by one person at launch volume.

## Value Chain

Sits between citizen intent and government official inbox. Replaces four steps people skip: (1) identify who has jurisdiction, (2) find applicable law, (3) draft effective language, (4) send to verified contacts. The platform captures value by collapsing a multi-hour task into a 5-minute form at a price point below the citizen's time value.

## Distribution Hypothesis

**Primary:** Organic search (SEO). Each opt-in public campaign page creates a long-tail civic query target (e.g., "petition [city] [official] about [issue]"). The product generates its own acquisition content as a byproduct of paid usage — near-zero marginal cost for each new indexed page.

**Secondary:** Social sharing from public campaign pages. Share buttons + public reply updates create shareable civic stories.

**Not planned:** Paid ads, app stores, partnerships. The bet is that SEO compounds fast enough in an underserved content niche (local civic action queries).

## Moat Hypothesis

**Type:** Compounding data + content. Weak at launch, strengthens with volume.

Three assets grow simultaneously with each paid submission:
1. **Officials directory** — verified emails, response rates, bounce history. Competitors start from zero.
2. **Regulation citation library** — reusable, validated legal references refined by real jobs. Gets more accurate over time.
3. **Public campaign archive** — SEO domain authority in a niche where no competitor has systematic, high-quality indexed content.

A new entrant would need thousands of real paid submissions to replicate the data quality. The moat is volume-dependent — it doesn't exist at 50 submissions/month but becomes real at 1,000+.

## Target User

US resident with a specific civic frustration (noise, potholes, zoning, enforcement failure, school policy) who would contact their government if someone else handled the research, drafting, and delivery — but who will never do it manually.

## Success Metric

**Primary:** Paid submissions per month. Break-even at ~25 Amplify-tier submissions/month (~$340 MRR). Phase 1 target: first paid submission delivered end-to-end.

**Secondary:** Delivery success rate (emails not bouncing), official response rate (letters actually getting replies), and organic search impressions (SEO flywheel spinning).

## Scope Exclusions

| Excluded | Why |
|----------|-----|
| Legal advice / claim filing | Liability; letters are constituent communications only |
| Subscriptions / recurring billing | Adds complexity before demand is proven |
| Community features (comments, votes, co-sign) | Moderation burden too early; not needed for core loop |
| Certified / physical mail | Email-first until delivery proves itself |
| Coalition / search-before-create | Social mechanics deferred until volume justifies |
| API access (HOA, nonprofit) | Future revenue stream, not launch scope |
| Crowdfunding integration | No confirmed affiliate program; ancillary at best |
| Spanish language | Post-PMF expansion |
| Paid acquisition | SEO-first; paid ads only if organic fails |

---

*Generated 2026-04-25 from raw-intake.md v2.1. Not a gate — context for the build.*
