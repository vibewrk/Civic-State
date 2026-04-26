# Plan 03-02: Delivery Agent with Postmark Integration — Summary

**Status:** Complete
**Executed:** 2026-04-25

## Tasks Completed

### Task 1: Real Delivery Agent (apps/worker/src/agents/delivery.ts)
Replaced mock implementation with full Postmark integration:
- Processes jobs from `delivery` BullMQ queue
- Fetches campaign with letters + officials from Prisma
- Per-official delivery logic:
  - **Skip opted-out** officials (`official.optedOut`)
  - **Skip invalid emails** containing `@placeholder`
  - **Bounce-rate gate**: queries deliveries in last 30 days per domain; skips if >10% bounced
  - **Sends via Postmark** `ServerClient.sendEmail()`
    - `From: letters@civicstate.com` (configurable via `POSTMARK_FROM_EMAIL`)
    - `ReplyTo: reply+{campaignId}@civicstate.com` (DLVR-08)
    - `Subject: "Constituent Communication Regarding {district/ZIP}"`
    - Tracks opens, tags as `civic-letter`, includes metadata
  - Creates `Delivery` record with `postmarkMessageId`, `status: sent`, `sentAt`
  - Updates `Letter.status` to `sent`
- Handles partial failures: individual letter failures don't block others
- State transitions: `paid → delivering → delivered` (or `failed` if 0 sent)
- Logs delivery stats via `logAgentAction` (AGNT-05, AGNT-06)

### Task 2: Postmark Webhook Handler (apps/api/src/routes/webhooks.ts)
Added `POST /api/webhooks/postmark` to existing webhooks router:
- Uses per-route `express.json()` parser (router is mounted before global parser for Stripe raw body)
- Looks up `Delivery` by `postmarkMessageId`
- **Delivery event**: sets `status: delivered`, `deliveredAt`
- **Bounce event**: sets `status: bounced`, `bouncedAt`, `bounceType`; increments `official.bounceCount`
- **SpamComplaint event**: sets `official.optedOut = true`; creates HMAC-signed `AuditLog` entry; console warning
- Always returns 200 to prevent Postmark retry storms on processing errors

### Task 3: Postmark Package in Worker
- Installed `postmark@^4.0.7` in `apps/worker/package.json` via pnpm

## Environment Variables Required
| Variable | Purpose |
|---|---|
| `POSTMARK_SERVER_TOKEN` | Postmark API server token (required) |
| `POSTMARK_FROM_EMAIL` | Sender address (default: `letters@civicstate.com`) |
| `REPLY_TO_DOMAIN` | Reply-to domain (default: `civicstate.com`) |

## Files Modified
- `apps/worker/src/agents/delivery.ts` — full rewrite
- `apps/worker/package.json` — added postmark dependency
- `apps/api/src/routes/webhooks.ts` — added Postmark webhook handler

## Schema Fields Used (Delivery model)
`id`, `letterId`, `postmarkMessageId`, `status`, `sentAt`, `deliveredAt`, `bouncedAt`, `bounceType`, `spamComplaintAt`

## Verification Checklist
- [x] Opted-out officials skipped
- [x] Placeholder emails skipped
- [x] Per-domain bounce rate checked (30-day window, 10% threshold)
- [x] Postmark send with correct From/ReplyTo/Subject
- [x] Delivery records created for all outcomes (sent, skipped, failed)
- [x] Letter status updated to `sent` on success
- [x] Partial failure handling (some succeed, some fail)
- [x] State machine transitions (paid → delivering → delivered/failed)
- [x] Agent action logging with delivery stats
- [x] Webhook: Delivery → status update
- [x] Webhook: Bounce → status + bounceCount increment
- [x] Webhook: SpamComplaint → optedOut + audit log
- [x] Always return 200 to Postmark webhooks
