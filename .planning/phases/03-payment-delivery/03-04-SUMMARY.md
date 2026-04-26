# Plan 03-04: Payment UI Flow

**Status:** Complete
**Date:** 2026-04-25

## Tasks Completed

### Task 1: Payment API Function
- **File:** `apps/web/lib/api.ts`
- Added `PaymentSession` interface (`checkoutUrl`, `sessionId`)
- Added `createPaymentSession(submissionId, pricingTier)` function
  - POSTs to `/api/submissions/{id}/pay` with `{ pricingTier }`
  - Includes `credentials: 'include'` for auth cookies
- Added `PricingTier` type alias (`"single" | "three" | "all"`)

### Task 2: Letter Preview Payment Flow
- **File:** `apps/web/components/wizard/letter-preview.tsx`
- Wired "Proceed to Payment" button to `createPaymentSession()`
- Added `paying` loading state (button shows "Creating checkout session..." while pending)
- Added `payError` state with user-friendly error display
- On success, redirects to `checkoutUrl` via `window.location.href`
- Removed Phase 3 placeholder text

### Task 3: Success Page
- **File:** `apps/web/app/submit/success/page.tsx`
- Green checkmark icon with "Your letters are being delivered!" heading
- Explains each official receives a personalized letter
- "Track Delivery Status" button linking to `/dashboard`
- "Submit Another Issue" button linking to `/submit`
- Navy+gold theme consistent with app design

### Task 4: Cancel Page
- **File:** `apps/web/app/submit/cancel/page.tsx`
- "Payment Cancelled" heading with X icon
- Reassuring message: letters are saved, no charges made
- "Return to Submission" button linking to `/submit`
- Navy theme consistent with app design

## Architecture Notes
- Both success/cancel pages inherit the submit layout (`bg-navy-50`, centered, max-w-2xl)
- Pages are Server Components (no client-side JS needed)
- Payment flow: letter-preview -> Stripe checkout (external) -> success/cancel redirect
