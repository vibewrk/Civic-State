# CivicState Business Plan

**Updated:** 2026-06-05
**Lifecycle phase:** BUILD
**Authority:** Planning artifact only. This does not approve pricing, production launch, compliance posture, provider contracts, or credential use.

## Thesis

CivicState is a community-funded civic-action board and letter platform. A resident submits a civic concern, the system researches relevant authority, identifies officials, drafts compliant constituent letters, collects one-time payment, delivers the letters, and gives the user a dashboard for tracking outcomes.

The launch business should prove one narrow loop before expansion: a user is willing to pay for a researched, correctly routed, compliant civic letter campaign, and the platform can deliver those letters to officials without unacceptable deliverability, compliance, or support burden.

## Customer

Primary customer: US residents with a specific local, state, or federal civic issue who do not know which officials to contact or how to write a formal, evidence-backed letter.

Secondary future customers such as HOAs, nonprofits, civic groups, and API consumers remain out of launch scope until the individual-user loop is validated.

## Offer

Launch offer: one-time paid letter delivery packages for an individual constituent campaign.

The repo currently describes fixed tiers of $5, $15, and $25. Treat those as implementation placeholders until pricing, Stripe fees, AI token costs, deliverability costs, refund policy, and margin rules are revalidated by the production owner.

## Differentiation

- Official targeting by ZIP and jurisdiction rather than generic petition broadcasting.
- AI-assisted research and drafting with citation verification before delivery.
- Compliance-first delivery: AI disclosure, not-legal-advice language, CAN-SPAM elements, opt-out suppression, and audit logging.
- User dashboard and reply capture instead of one-shot anonymous sending.

## Launch Constraints

- CivicState is not a law firm, lobbying firm, legal filing service, claim submission service, or social network at launch.
- The platform must not send legal advice, legal demands, threats, harassment, defamation-risk content, or claims it cannot safely support.
- Production launch depends on verified account state for Clerk, Stripe, Postmark, Anthropic, OpenStates, congress.gov, hosting, monitoring, and banking.
- Email deliverability and official opt-out handling are launch-critical. DNS records, Postmark configuration, bounce thresholds, inbound reply routing, and warming status must be verified live.
- Local official coverage is a launch-quality risk until Cicero, BallotReady, or another provider is selected and tested.

## Validation Gates

| Gate | Success signal | Owner evidence required |
|------|----------------|-------------------------|
| Willingness to pay | Users complete checkout for real civic campaigns at an acceptable conversion rate. | Stripe dashboard/export plus product analytics. |
| Official coverage | Federal/state coverage is reliable and local coverage is explicit about confidence gaps. | Provider test matrix by ZIP/jurisdiction. |
| Deliverability | Government-domain delivery and bounce/complaint rates stay within policy thresholds. | Postmark dashboard, DNS checks, suppression logs. |
| Compliance operations | Flagged queue, deletion SLA, audit logs, and opt-out flows work under operator review. | Admin dashboard smoke tests and audit samples. |
| Unit economics | Gross margin remains above floor after Stripe, AI, email, hosting, and support costs. | Reconciliation report with real cost assumptions. |

## Near-Term Roadmap

1. Verify deployment and runtime accounts.
2. Decide and test local officials provider.
3. Verify deliverability and domain warming.
4. Verify AI model names, cost assumptions, and moderation/drafting behavior.
5. Run production readiness and observability pass.
6. Run a human decision gate for public campaign/SEO behavior.

## Deferred Expansion

- Public campaign board and SEO growth loops.
- Organization/team accounts.
- Certified mail or fax fallback.
- Reply summarization and follow-up campaign automation.
- Dynamic pricing agent.
- Third-party API access.

## Unknowns

Production analytics, live account configuration, provider contracts, production deliverability, and user willingness-to-pay data are not present in repo truth. They remain gated and must not be inferred from historical planning text.
