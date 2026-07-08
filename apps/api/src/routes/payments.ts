import { Router, type IRouter } from 'express';
import { getAuth } from '@clerk/express';
import Stripe from 'stripe';
import {
  getOfficialCountForTier,
  getPricingPackage,
  normalizePricingTier,
  PRICING_TIERS,
} from '../lib/pricing.js';

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

// POST /api/submissions/:id/pay — Create Stripe Checkout session for a submission
router.post('/api/submissions/:id/pay', async (req, res) => {
  try {
    const auth = getAuth(req);
    if (!auth?.userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const { prisma } = await import('shared');
    const submissionId = req.params.id;
    const body = (req.body ?? {}) as { tier?: unknown; pricingTier?: unknown };
    const tier = normalizePricingTier(body.tier ?? body.pricingTier);

    if (!tier) {
      return res.status(400).json({
        error: 'Invalid pricing tier',
        validTiers: Object.keys(PRICING_TIERS),
      });
    }

    const pricing = getPricingPackage(tier);

    // Look up internal user by Clerk ID
    const user = await prisma.user.findUnique({
      where: { clerkId: auth.userId },
      select: { id: true, email: true },
    });

    if (!user) {
      return res.status(401).json({ error: 'User not found. Please complete registration.' });
    }

    // Find or create campaign for this submission
    const existingCampaign = await prisma.campaign.findFirst({
      where: { submissionId, userId: user.id },
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { letters: true },
        },
      },
    });
    const matchedOfficialCount =
      existingCampaign?._count?.letters ?? existingCampaign?.officialCount ?? 0;
    const officialCount = getOfficialCountForTier(tier, matchedOfficialCount);

    let campaign: { id: string };
    if (!existingCampaign) {
      campaign = await prisma.campaign.create({
        data: {
          submissionId,
          userId: user.id,
          pricingTier: tier,
          officialCount,
          status: 'draft',
        },
      });
    } else {
      campaign = await prisma.campaign.update({
        where: { id: existingCampaign.id },
        data: {
          pricingTier: tier,
          officialCount,
        },
      });
    }

    // Create Stripe Checkout session
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: user.email,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: pricing.amountCents,
            product_data: {
              name: `CivicState Letter Campaign — ${pricing.label}`,
              description: pricing.description,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        campaignId: campaign.id,
        submissionId,
        userId: user.id,
        tier,
      },
      success_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/submissions/${submissionId}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/submissions/${submissionId}/preview`,
    });

    // Create Payment record
    await prisma.payment.create({
      data: {
        campaignId: campaign.id,
        userId: user.id,
        stripeSessionId: session.id,
        amount: pricing.amountCents,
        currency: 'usd',
        status: 'pending',
      },
    });

    res.json({
      checkoutUrl: session.url,
      sessionId: session.id,
    });
  } catch (err) {
    console.error('Payment creation failed:', err);
    res.status(500).json({ error: 'Failed to create payment session' });
  }
});

export default router;
