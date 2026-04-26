---
phase: 04-dashboard-compliance
plan: 01
status: complete
requirements_met:
  - DASH-01
  - DASH-02
  - DASH-03
  - DASH-04
  - DASH-05
---

# 04-01 Summary: User Dashboard

## What was built

### API Endpoints (apps/api/src/routes/campaigns.ts)
- **GET /api/campaigns** — lists all campaigns for the authenticated user with submission, letters, officials, and latest delivery status
- **GET /api/campaigns/:id** — single campaign with full details including all deliveries, payments, and official contact info
- **PATCH /api/campaigns/:id/anonymity** — toggles isAnonymous on the submission with HMAC audit logging; blocked after delivery

### Postmark Inbound Webhook (apps/api/src/routes/webhooks.ts)
- **POST /api/webhooks/postmark/inbound** — handles reply emails sent to `reply+{campaignId}@civicstate.com`
- Parses campaignId from the To address via regex
- Stores reply text (truncated to 5k/10k chars) as an HMAC-checksummed audit log entry
- Sends email notification to the user via Postmark with a link to their campaign dashboard

### Dashboard Frontend
- **Dashboard page** (`apps/web/app/dashboard/page.tsx`) — client component that fetches and displays all campaigns
- **Campaign detail page** (`apps/web/app/dashboard/campaigns/[id]/page.tsx`) — full campaign view with per-letter tracking
- **CampaignList component** (`apps/web/components/dashboard/campaign-list.tsx`) — card list with derived overall status, metadata, and status badges
- **CampaignDetail component** (`apps/web/components/dashboard/campaign-detail.tsx`) — full detail view with:
  - Issue description and desired outcome
  - Per-letter delivery status with timestamps (DASH-02)
  - Official info (name, title, jurisdiction, email)
  - Anonymity toggle with pre-delivery guard (DASH-05)
  - Payment history
- **DeliveryStatus component** (`apps/web/components/dashboard/delivery-status.tsx`) — color-coded badges: queued=gray, sent=blue, delivered=green, bounced=red, failed=red
- **API client functions** (`apps/web/lib/api.ts`) — getCampaigns, getCampaign, toggleAnonymity

### Design
- Navy + gold theme consistent with existing admin dashboard
- Auth required via Clerk middleware (already configured in layout)
- Responsive layout with mobile-friendly card design

## Requirements Coverage
| Req | Description | Status |
|---|---|---|
| DASH-01 | Campaign list view | Done |
| DASH-02 | Per-letter delivery tracking | Done |
| DASH-03 | Reply display + inbound webhook | Done |
| DASH-04 | Email notification on reply | Done |
| DASH-05 | Anonymity toggle | Done |
