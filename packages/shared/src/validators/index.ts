import { z } from 'zod';

/** Job lifecycle states per D-20 */
export const jobStatusSchema = z.enum([
  'submitted',
  'classifying',
  'researching',
  'drafting',
  'payment_pending',
  'paid',
  'delivering',
  'delivered',
  'failed',
]);

/** User roles per D-16 */
export const userRoleSchema = z.enum(['user', 'admin']);

/** Pricing tiers per PAY-01 */
export const pricingTierSchema = z.enum(['single', 'three_pack', 'full_spread']);

/** US ZIP code (5-digit or ZIP+4) */
export const zipCodeSchema = z
  .string()
  .regex(/^\d{5}(-\d{4})?$/, 'Invalid ZIP code format');

/** Jurisdiction levels */
export const jurisdictionLevelSchema = z.enum(['federal', 'state', 'local']);

/** Delivery status per Postmark webhooks */
export const deliveryStatusSchema = z.enum([
  'queued',
  'sent',
  'delivered',
  'bounced',
  'failed',
]);

/** Letter status */
export const letterStatusSchema = z.enum([
  'draft',
  'approved',
  'sending',
  'sent',
  'failed',
]);

/** Payment status */
export const paymentStatusSchema = z.enum([
  'pending',
  'completed',
  'failed',
  'refunded',
]);

/** Content moderation tier */
export const moderationTierSchema = z.enum(['block', 'flag', 'pass']);

/** Content moderation reason */
export const moderationReasonSchema = z.enum([
  'threat_of_violence',
  'illegal_activity',
  'harassment',
  'hate_speech',
  'self_harm',
  'explicit_content',
  'spam',
  'policy_violation',
  'clean',
]);

/** UUID v4 validation */
export const uuidSchema = z.string().uuid();

/** Email validation */
export const emailSchema = z.string().email();
