---
phase: 04-dashboard-compliance
plan: 03
status: complete
completed_at: 2026-04-25
requirements: [LGAL-01, LGAL-02, LGAL-03, LGAL-04, LGAL-05]
---

# Plan 04-03 Summary: Legal Compliance Pages & Data Management

## What Was Built

### Task 1: Legal Pages (LGAL-01, LGAL-02, LGAL-03)

**Privacy Policy** (`apps/web/app/privacy/page.tsx`)
- Three-tier data classification (Tier 1: encrypted PII, Tier 2: operational, Tier 3: public)
- Data collection disclosure with retention periods
- AI disclosure: Anthropic Claude usage, what data is sent, Anthropic's retention policy
- CCPA rights section: right to know, right to delete (72-hour SLA), right to opt-out, non-discrimination
- Contact: privacy@civicstate.com
- Third-party services listed (Clerk, Stripe, Postmark, Anthropic, Plausible)

**Terms of Service** (`apps/web/app/terms/page.tsx`)
- Prominent "NOT LEGAL ADVICE" disclaimer in bordered callout box
- Lobbying disclaimer (constituent communication, not lobbying)
- User-as-author assertion with approval affirmation
- Content policy (threats, hate speech, harassment, false claims, spam)
- Payment terms: $5-$25, refund policy for undelivered/moderated content
- CAN-SPAM compliance statement (LGAL-03)

**About Page** (`apps/web/app/about/page.tsx`)
- Mission statement
- AI transparency disclosure (Anthropic Claude, citation verification, content moderation)
- "What We Are Not" section (not a law firm, not lobbying)
- Physical address: CivicState, Inc., San Francisco, CA (CAN-SPAM requirement)
- Contact emails: hello@, privacy@, legal@civicstate.com

All pages are Server Components (no 'use client'), use navy theme with prose styling, and cross-link to each other.

### Task 2: CCPA Deletion Endpoint (LGAL-04)

**Compliance routes** (`apps/api/src/routes/compliance.ts`)
- `POST /api/compliance/delete-my-data` — requires auth, soft-deletes submissions/campaigns/letters, logs 72-hour SLA to audit trail with HMAC checksum, prevents duplicate requests within 72 hours
- `GET /api/compliance/data-export` — requires auth, returns all user data (submissions, campaigns, letters, audit logs) as JSON
- Registered in `apps/api/src/index.ts`

### Task 3: Data Retention Enforcement (LGAL-05)

**Added to daily reconciliation** (`apps/worker/src/agents/reconciliation.ts`)
- Agent action logs older than 24 months: soft-deleted
- Job snapshots older than 12 months: soft-deleted
- Financial/audit records: 7-year retention (exempt from automated deletion)
- All retention actions logged to audit trail with HMAC checksum

## Files Modified

| File | Action |
|------|--------|
| `apps/web/app/privacy/page.tsx` | Created |
| `apps/web/app/terms/page.tsx` | Created |
| `apps/web/app/about/page.tsx` | Created |
| `apps/api/src/routes/compliance.ts` | Created |
| `apps/api/src/index.ts` | Modified (added compliance router) |
| `apps/worker/src/agents/reconciliation.ts` | Modified (added data retention step) |

## Requirements Coverage

| Requirement | Status | Implementation |
|-------------|--------|----------------|
| LGAL-01 | Done | Privacy Policy with three-tier classification, AI disclosure, CCPA rights |
| LGAL-02 | Done | Terms of Service with disclaimers, content policy, payment terms |
| LGAL-03 | Done | CAN-SPAM compliance in ToS + physical address on About page |
| LGAL-04 | Done | CCPA deletion endpoint with 72-hour SLA, data export endpoint |
| LGAL-05 | Done | Data retention enforcement in daily reconciliation job |
