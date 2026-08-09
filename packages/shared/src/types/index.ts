/**
 * Shared TypeScript types for CivicState.
 * These mirror the database schema enums and provide type safety across workspaces.
 */

/** Job lifecycle states per D-20 state machine */
export type JobStatus =
  | 'submitted'
  | 'classifying'
  | 'researching'
  | 'drafting'
  | 'payment_pending'
  | 'paid'
  | 'delivering'
  | 'delivered'
  | 'failed';

/** User roles per D-16 Clerk RBAC */
export type UserRole = 'user' | 'admin';

/** Official jurisdiction level */
export type JurisdictionLevel = 'federal' | 'state' | 'local';

/** Email delivery status per Postmark webhooks */
export type DeliveryStatus = 'queued' | 'sent' | 'delivered' | 'bounced' | 'failed';

/** Letter lifecycle status */
export type LetterStatus = 'draft' | 'approved' | 'sending' | 'sent' | 'failed';

/** Payment status per Stripe webhooks */
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';

/** Pricing tier per PAY-01 hardcoded tiers */
export type PricingTier = 'single' | 'three_pack' | 'full_spread';

/** Submission status */
export type SubmissionStatus = 'submitted' | 'processing' | 'completed' | 'failed' | 'flagged';

/** Campaign status */
export type CampaignStatus = 'draft' | 'pending_payment' | 'paid' | 'delivering' | 'delivered' | 'failed';

/** Ledger entry types */
export type LedgerEntryType = 'payment' | 'refund' | 'api_cost' | 'postage' | 'adjustment';

/** A government official record returned from API lookups */
export interface OfficialRecord {
  id?: string;
  name: string;
  title: string;
  email: string;
  jurisdiction: string;
  level: JurisdictionLevel;
  district: string;
  state: string;
  party: string;
  phone?: string;
  sourceApi: string;
  sourceUrl?: string;
  sourceLastVerifiedAt?: string;
  optedOut?: boolean;
}

/** Result of looking up officials for a ZIP code */
export interface OfficialLookupResult {
  officials: OfficialRecord[];
  coverage: Record<JurisdictionLevel, number>;
  confidenceLabel: string;
}

/** Audit log action categories */
export type AuditAction =
  | 'user.created'
  | 'user.updated'
  | 'user.deleted'
  | 'submission.created'
  | 'submission.flagged'
  | 'submission.blocked'
  | 'submission.moderated'
  | 'campaign.created'
  | 'campaign.paid'
  | 'letter.drafted'
  | 'letter.approved'
  | 'letter.sent'
  | 'delivery.status_changed'
  | 'admin.reviewed'
  | 'admin.approved'
  | 'admin.rejected'
  | 'official.opted_out'
  | 'official.bounced';

/** Content moderation tier — three-tier pipeline result */
export type ModerationTier = 'block' | 'flag' | 'pass';

/** Reason categories for moderation decisions */
export type ModerationReason =
  | 'threat_of_violence'
  | 'illegal_activity'
  | 'harassment'
  | 'hate_speech'
  | 'self_harm'
  | 'explicit_content'
  | 'spam'
  | 'policy_violation'
  | 'clean';
