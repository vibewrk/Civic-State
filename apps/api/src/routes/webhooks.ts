import { Router, type IRouter } from 'express';
import express from 'express';
import Stripe from 'stripe';
import { Queue } from 'bullmq';
import Redis from 'ioredis';
import { computeRowHmac } from 'shared/hmac';
import { auditLogHmacFields } from 'shared/append-only-integrity';

const router: IRouter = Router();

// Lazy-init Stripe client
let stripeInstance: Stripe | null = null;
function getStripe(): Stripe {
  if (!stripeInstance) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      throw new Error('STRIPE_SECRET_KEY is not configured');
    }
    stripeInstance = new Stripe(key);
  }
  return stripeInstance;
}

// Singleton Redis connection for queue operations
let queueRedis: InstanceType<typeof Redis> | null = null;
function getQueueRedis(): InstanceType<typeof Redis> {
  if (!queueRedis) {
    queueRedis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379', {
      maxRetriesPerRequest: null,
      enableReadyCheck: false,
    });
  }
  return queueRedis;
}

// POST /api/webhooks/stripe — Stripe webhook handler
// Uses raw body for signature verification
router.post(
  '/api/webhooks/stripe',
  express.raw({ type: 'application/json' }),
  async (req, res) => {
    const stripe = getStripe();
    const sig = req.headers['stripe-signature'] as string | undefined;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!sig || !webhookSecret) {
      return res.status(400).json({ error: 'Missing signature or webhook secret' });
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return res.status(400).json({ error: 'Invalid signature' });
    }

    // Handle checkout.session.completed
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      try {
        const { prisma } = await import('shared');

        const campaignId = session.metadata?.campaignId;
        const userId = session.metadata?.userId;

        if (!campaignId) {
          console.error('Webhook: missing campaignId in session metadata');
          return res.status(400).json({ error: 'Missing campaignId in metadata' });
        }

        // Update Payment status to completed
        await prisma.payment.updateMany({
          where: {
            stripeSessionId: session.id,
            status: 'pending',
          },
          data: {
            stripePaymentIntentId: typeof session.payment_intent === 'string'
              ? session.payment_intent
              : session.payment_intent?.id ?? null,
            status: 'completed',
          },
        });

        // Update Campaign status to paid
        await prisma.campaign.update({
          where: { id: campaignId },
          data: { status: 'paid' },
        });

        // Update Job status from payment_pending to paid
        const campaign = await prisma.campaign.findUnique({
          where: { id: campaignId },
          select: { submissionId: true },
        });

        if (campaign) {
          await prisma.job.updateMany({
            where: {
              submissionId: campaign.submissionId,
              status: 'payment_pending',
            },
            data: { status: 'paid' },
          });

          // Enqueue delivery job via BullMQ
          try {
            const deliveryQueue = new Queue('delivery', {
              connection: getQueueRedis(),
            });

            await deliveryQueue.add(`deliver-${campaignId}`, {
              campaignId,
              submissionId: campaign.submissionId,
              userId,
            });

            await deliveryQueue.close();
          } catch (queueErr) {
            console.warn('Could not enqueue delivery job (worker may not be running):', queueErr);
          }
        }

        // Write audit log with HMAC
        const auditDetails = {
          event: 'payment.completed',
          stripeSessionId: session.id,
          campaignId,
          amount: session.amount_total,
          currency: session.currency,
        };

        const hmacFields = auditLogHmacFields({
          userId,
          userIdFallback: 'system',
          action: 'payment.completed',
          resource: 'payment',
          resourceId: session.id,
          details: auditDetails,
        });

        const hmacChecksum = computeRowHmac(hmacFields);

        await prisma.auditLog.create({
          data: {
            userId: userId ?? null,
            action: 'payment.completed',
            resource: 'payment',
            resourceId: session.id,
            details: auditDetails,
            hmacChecksum,
          },
        });

        console.log(`Payment completed for campaign ${campaignId}, delivery job enqueued`);
      } catch (err) {
        console.error('Webhook processing failed:', err);
        return res.status(500).json({ error: 'Webhook processing failed' });
      }
    }

    // Return 200 to acknowledge receipt
    res.json({ received: true });
  },
);

// ──────────────────────────────────────────
// POST /api/webhooks/postmark — Postmark delivery/bounce/spam webhook
// ──────────────────────────────────────────
// Postmark sends JSON, but this router is mounted before express.json()
// (because Stripe needs raw body), so we apply express.json() per-route.
router.post(
  '/api/webhooks/postmark',
  express.json(),
  async (req, res) => {
    try {
      const event = req.body;
      const recordType: string | undefined = event.RecordType;
      const messageId: string | undefined = event.MessageID;

      if (!recordType || !messageId) {
        return res.status(400).json({ error: 'Missing RecordType or MessageID' });
      }

      const { prisma } = await import('shared');

      // Look up the delivery by postmarkMessageId
      const delivery = await prisma.delivery.findFirst({
        where: { postmarkMessageId: messageId },
        include: {
          letter: {
            include: {
              official: true,
            },
          },
        },
      });

      if (!delivery) {
        // Unknown message ID — may be from a different stream; acknowledge
        console.warn(
          `[Webhook/Postmark] No delivery found for MessageID: ${messageId}`,
        );
        return res.status(200).json({ received: true, matched: false });
      }

      switch (recordType) {
        case 'Delivery': {
          await prisma.delivery.update({
            where: { id: delivery.id },
            data: {
              status: 'delivered',
              deliveredAt: new Date(event.DeliveredAt || new Date()),
            },
          });
          break;
        }

        case 'Bounce': {
          await prisma.delivery.update({
            where: { id: delivery.id },
            data: {
              status: 'bounced',
              bouncedAt: new Date(event.BouncedAt || new Date()),
              bounceType: event.Type || event.Name || 'unknown',
            },
          });

          // Increment official bounceCount
          await prisma.official.update({
            where: { id: delivery.letter.officialId },
            data: {
              bounceCount: { increment: 1 },
            },
          });
          break;
        }

        case 'SpamComplaint': {
          await prisma.delivery.update({
            where: { id: delivery.id },
            data: {
              status: 'bounced',
              spamComplaintAt: new Date(event.BouncedAt || new Date()),
            },
          });

          // Set official as opted out
          await prisma.official.update({
            where: { id: delivery.letter.officialId },
            data: { optedOut: true },
          });

          // Audit log for spam complaint
          const auditDetails = {
            postmarkMessageId: messageId,
            deliveryId: delivery.id,
            letterId: delivery.letterId,
            officialEmail: delivery.letter.official.email,
            officialName: delivery.letter.official.name,
          };

          const hmacFields = auditLogHmacFields({
            action: 'spam_complaint',
            resource: 'official',
            resourceId: delivery.letter.officialId,
            details: auditDetails,
          });

          const hmacChecksum = computeRowHmac(hmacFields);

          await prisma.auditLog.create({
            data: {
              action: 'spam_complaint',
              resource: 'official',
              resourceId: delivery.letter.officialId,
              details: auditDetails,
              hmacChecksum,
            },
          });

          console.warn(
            `[Webhook/Postmark] SpamComplaint from ${delivery.letter.official.email} — official ${delivery.letter.official.name} opted out`,
          );
          break;
        }

        default: {
          console.log(
            `[Webhook/Postmark] Unhandled RecordType: ${recordType} for MessageID: ${messageId}`,
          );
        }
      }

      res.status(200).json({ received: true, recordType, messageId });
    } catch (err) {
      console.error('[Webhook/Postmark] Processing error:', err);
      // Always return 200 to prevent Postmark from retrying on processing errors
      res.status(200).json({ received: true, error: 'processing_error' });
    }
  },
);

// ──────────────────────────────────────────
// POST /api/webhooks/postmark/inbound — Postmark inbound email webhook (DASH-04)
// Handles reply emails sent to reply+{campaignId}@civicstate.com
// ──────────────────────────────────────────
router.post(
  '/api/webhooks/postmark/inbound',
  express.json(),
  async (req, res) => {
    try {
      const event = req.body;
      const toAddress: string | undefined = event.To || event.OriginalRecipient;
      const fromAddress: string | undefined = event.From || event.FromFull?.Email;
      const subject: string | undefined = event.Subject;
      const textBody: string | undefined = event.TextBody;
      const htmlBody: string | undefined = event.HtmlBody;
      const messageId: string | undefined = event.MessageID;

      if (!toAddress) {
        return res.status(400).json({ error: 'Missing To address' });
      }

      // Parse campaignId from reply+{campaignId}@civicstate.com
      const replyMatch = toAddress.match(/reply\+([a-f0-9-]+)@/i);
      if (!replyMatch) {
        console.log(`[Webhook/Postmark/Inbound] Non-reply address: ${toAddress}`);
        return res.status(200).json({ received: true, matched: false });
      }

      const campaignId = replyMatch[1];
      const { prisma } = await import('shared');

      // Verify campaign exists
      const campaign = await prisma.campaign.findUnique({
        where: { id: campaignId },
        select: { id: true, userId: true },
      });

      if (!campaign) {
        console.warn(`[Webhook/Postmark/Inbound] No campaign found for ID: ${campaignId}`);
        return res.status(200).json({ received: true, matched: false });
      }

      // Store the reply as an AuditLog entry (no Reply model in schema)
      const replyDetails = {
        type: 'official_reply',
        campaignId,
        from: fromAddress,
        subject: subject || '(no subject)',
        textBody: textBody ? textBody.substring(0, 5000) : null,
        htmlBody: htmlBody ? htmlBody.substring(0, 10000) : null,
        postmarkMessageId: messageId,
        receivedAt: new Date().toISOString(),
      };

      const hmacFields = auditLogHmacFields({
        userId: campaign.userId,
        action: 'reply.received',
        resource: 'campaign',
        resourceId: campaignId,
        details: replyDetails,
      });

      const hmacChecksum = computeRowHmac(hmacFields);

      await prisma.auditLog.create({
        data: {
          userId: campaign.userId,
          action: 'reply.received',
          resource: 'campaign',
          resourceId: campaignId,
          details: replyDetails,
          hmacChecksum,
        },
      });

      // Send notification email to the user about the reply
      try {
        const user = await prisma.user.findUnique({
          where: { id: campaign.userId },
          select: { email: true },
        });

        if (user?.email) {
          const { ServerClient } = await import('postmark');
          const token = process.env.POSTMARK_SERVER_TOKEN;
          if (token) {
            const postmarkClient = new ServerClient(token);
            await postmarkClient.sendEmail({
              From: 'noreply@civicstate.com',
              To: user.email,
              Subject: `You received a reply on your CivicState campaign`,
              TextBody: [
                'Good news! An official has replied to your letter.',
                '',
                `From: ${fromAddress || 'Unknown'}`,
                `Subject: ${subject || '(no subject)'}`,
                '',
                'Log in to your dashboard to view the full reply:',
                `${process.env.CORS_ORIGIN || 'https://civicstate.com'}/dashboard/campaigns/${campaignId}`,
              ].join('\n'),
              MessageStream: 'outbound',
            });
          }
        }
      } catch (notifyErr) {
        // Non-fatal — log but don't fail the webhook
        console.warn('[Webhook/Postmark/Inbound] Failed to send notification:', notifyErr);
      }

      console.log(`[Webhook/Postmark/Inbound] Reply stored for campaign ${campaignId} from ${fromAddress}`);
      res.status(200).json({ received: true, campaignId });
    } catch (err) {
      console.error('[Webhook/Postmark/Inbound] Processing error:', err);
      // Always return 200 to prevent Postmark from retrying on processing errors
      res.status(200).json({ received: true, error: 'processing_error' });
    }
  },
);

export default router;
