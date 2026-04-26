# 03-01 Stripe Payment Integration — Execution Summary

**Status:** Complete
**Date:** 2026-04-25

## What was built

### Task 1: Stripe Payment Route (`apps/api/src/routes/payments.ts`)

- **POST `/api/submissions/:id/pay`** — Creates a Stripe Checkout session for a submission
- Three pricing tiers:
  - `single` — $5 (1 official)
  - `three_pack` — $15 (3 officials)
  - `full_spread` — $25 (all matched officials)
- Requires Clerk authentication via `getAuth()`
- Finds or creates a Campaign for the submission, updates pricing tier
- Creates a `Payment` record in the database (status: `pending`, with `stripeSessionId`)
- Returns `{ checkoutUrl, sessionId }` for frontend redirect
- Uses lazy-init `getStripe()` pattern for the Stripe client
- Registered on `app.use(paymentsRouter)` in `index.ts`

### Task 2: Stripe Webhook Handler (`apps/api/src/routes/webhooks.ts`)

- **POST `/api/webhooks/stripe`** — Handles `checkout.session.completed` events
- Uses `express.raw()` for raw body parsing + `stripe.webhooks.constructEvent()` for signature verification
- Registered BEFORE `express.json()` in `index.ts` to ensure raw body is available
- On payment success:
  - Updates `Payment` status to `completed` (with `stripePaymentIntentId`)
  - Updates `Campaign` status to `paid`
  - Updates `Job` status from `payment_pending` to `paid`
  - Enqueues delivery job to BullMQ `delivery` queue
  - Writes HMAC-checksummed audit log entry

## Files created/modified

| File | Action |
|------|--------|
| `apps/api/src/routes/payments.ts` | Created |
| `apps/api/src/routes/webhooks.ts` | Created |
| `apps/api/src/index.ts` | Modified — imports + route registration |
| `apps/api/package.json` | Modified — added `stripe ^22.1.0` |

## Environment variables required

| Variable | Purpose |
|----------|---------|
| `STRIPE_SECRET_KEY` | Stripe API secret key |
| `STRIPE_WEBHOOK_SECRET` | Webhook endpoint signing secret |
| `FRONTEND_URL` | Base URL for Checkout success/cancel redirects (defaults to `http://localhost:3000`) |

## Verification

- TypeScript typecheck passes (`tsc --noEmit` — zero errors)
- All existing routes unaffected
- Webhook route correctly placed before JSON body parser in middleware stack
