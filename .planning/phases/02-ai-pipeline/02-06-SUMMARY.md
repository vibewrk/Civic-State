# Plan 02-06: Submission Wizard Frontend — Summary

**Status:** Complete
**Date:** 2026-04-25

## What Was Built

### 1. shadcn/ui Components (6 files)
Created manually following the existing `button.tsx` pattern with `cn()` from `@/lib/utils`:
- `components/ui/input.tsx` — Input with className forwarding
- `components/ui/textarea.tsx` — Textarea with className forwarding
- `components/ui/card.tsx` — Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter
- `components/ui/badge.tsx` — Badge with variant support (default, secondary, destructive, outline)
- `components/ui/progress.tsx` — Progress bar with value/max props and ARIA attributes
- `components/ui/label.tsx` — Label component

### 2. API Client (`lib/api.ts`)
Typed fetch wrapper with functions:
- `createSubmission(data)` — POST /api/submissions
- `getResearchStatus(id)` — GET /api/submissions/:id/research
- `getLetterPreviews(id)` — GET /api/submissions/:id/preview
- `lookupOfficials(zipCode)` — GET /api/officials?zipCode=
- Uses `NEXT_PUBLIC_API_URL` env var (default: http://localhost:3001)
- Proper error handling with typed response interfaces

### 3. Submission Wizard (`/submit` route)
Four-step wizard with progress tracking:

**Step 1 — Issue Form** (`components/wizard/issue-form.tsx`)
- Textarea for issue description (10-5000 chars) with character counter
- Textarea for desired outcome (10-2000 chars) with character counter
- Next button disabled until valid

**Step 2 — Location Form** (`components/wizard/location-form.tsx`)
- ZIP code input (5-digit, numeric-only, regex validated)
- "Stay anonymous" checkbox (default: checked)
- Optional full name (shown when not anonymous)
- Back and "Submit & Research" buttons
- POSTs to API on submit

**Step 3 — Research Loading** (`components/wizard/research-loading.tsx`)
- Polls research status every 3 seconds
- Progress bar with stage indicators (Classifying → Researching → Drafting → Ready)
- Check/pulse animations for completed/active stages
- Auto-advances to Step 4 when status is 'ready'

**Step 4 — Letter Preview** (`components/wizard/letter-preview.tsx`)
- Collapsible cards per official (click to expand/collapse)
- Shows official name, title, jurisdiction
- Letter content in formatted card body
- Citations list per letter
- AI-Generated disclosure badge
- Pricing tier selector: $5 (1 official), $15 (3 officials), $25 (all)
- "Proceed to Payment" button (placeholder for Phase 3)
- "Not legal advice" disclaimer

**Layout** (`app/submit/layout.tsx`)
- Centered layout with max-w-2xl, navy-50 background

### 4. Home Page Update (`app/page.tsx`)
- Hero section with value prop and pricing callout
- Gold "Get Started" CTA linking to /submit
- "How it works" 3-step section
- Navy+gold theme throughout

## Verification
- TypeScript: `tsc --noEmit` passes with zero errors
- All components follow existing project patterns (forwardRef, cn(), cva)
- Navy+gold theme colors used consistently
- Path alias `@/` resolves correctly (no `src/` prefix)
