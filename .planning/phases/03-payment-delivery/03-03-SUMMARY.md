# 03-03 Treasury Agent & Financial Controls — Execution Summary

**Status:** Complete
**Date:** 2026-04-25

## What was built

### Task 1: Treasury helper functions (`apps/worker/src/lib/treasury.ts`)

- **recordLedgerEntry()** — Creates append-only ledger entries with HMAC-SHA256 checksums via `computeRowHmac` from `shared/hmac`. Supports all `LedgerEntryType` values (payment, refund, api_cost, postage, adjustment).
- **authorizeJobBudget()** — Returns estimated cost in cents by pricing tier: single=$0.20, three_pack=$0.40, full_spread=$0.60.
- **checkBudgetCeiling()** — Sums api_cost + postage ledger entries for a job and compares against 150% of the tier estimate. Returns `{ exceeded, actual, ceiling }`.
- **runDailyReconciliation()** — Queries yesterday's Stripe payments (status=completed) and ledger payment entries, computes discrepancy, flags if >$0.10. Identifies missing ledger entries and orphaned entries by cross-referencing `stripePaymentIntentId` against ledger `reference`.
- **formatPnLEmail()** — Aggregates yesterday's ledger entries by type into a P&L report with revenue, API costs, postage, refunds, adjustments, and net income. Returns `{ subject, body }` ready for email.

### Task 2: Real Treasury agent (`apps/worker/src/agents/treasury.ts`)

- Replaced mock/TODO implementation with full handler.
- **`record_payment` action** — Records payment to ledger via `recordLedgerEntry()` with type=payment.
- **`record_cost` action** — Records API/postage cost to ledger, then checks budget ceiling if `pricingTier` is provided. If budget exceeds 150% of estimate, sets submission status to `flagged` and logs a warning.
- Exhaustive switch ensures unknown actions cause a compile-time error.
- All actions logged via `logAgentAction` per AGNT-05/AGNT-06.

### Task 3: Daily reconciliation worker (`apps/worker/src/agents/reconciliation.ts`)

- New BullMQ worker on `reconciliation` queue with concurrency=1.
- **registerReconciliationSchedule()** — Registers a repeatable job via `upsertJobScheduler` with cron `0 7 * * *` (7:00 AM UTC daily).
- Reconciliation job:
  1. Runs `runDailyReconciliation()` and logs results/warnings.
  2. Generates P&L email via `formatPnLEmail()`.
  3. Sends to operator via Postmark API (native `fetch`) if `POSTMARK_SERVER_TOKEN` and `OPERATOR_EMAIL` are set; otherwise logs the report.
  4. Checks for `MERCURY_API_KEY` — logs warning if not set (placeholder for future bank balance monitoring).
- Registered in `apps/worker/src/index.ts` alongside existing agents. Queue is closed on graceful shutdown.

## Files created/modified

| File | Action |
|------|--------|
| `apps/worker/src/lib/treasury.ts` | Created — all treasury helper functions |
| `apps/worker/src/agents/treasury.ts` | Replaced — real implementation with record_payment and record_cost |
| `apps/worker/src/agents/reconciliation.ts` | Created — daily reconciliation worker + scheduler |
| `apps/worker/src/index.ts` | Modified — added reconciliation worker import, registration, and shutdown |

## Verification

- TypeScript compiles cleanly (`tsc --noEmit` passes for all new/modified files).
- Pre-existing delivery.ts errors are unrelated to this work.

## Environment variables used

| Variable | Required | Purpose |
|----------|----------|---------|
| `HMAC_SECRET_KEY` | Yes | HMAC checksums on ledger entries |
| `DATABASE_URL` | Yes | Prisma database connection |
| `REDIS_URL` | Yes | BullMQ queue connection |
| `POSTMARK_SERVER_TOKEN` | No | Send P&L emails (logs if unset) |
| `POSTMARK_FROM_EMAIL` | No | From address (defaults to system@civicstate.com) |
| `OPERATOR_EMAIL` | No | Recipient for P&L reports |
| `MERCURY_API_KEY` | No | Future bank balance monitoring (placeholder) |
