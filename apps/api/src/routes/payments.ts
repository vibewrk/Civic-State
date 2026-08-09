import { Router, type IRouter } from 'express';
import { getAuth } from '@clerk/express';
import Stripe from 'stripe';
import { isPricingTier, PRICING_TIERS } from '../lib/pricing.js';

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
    const { tier } = req.body as { tier?: unknown };

    if (!isPricingTier(tier)) {
      return res.status(400).json({
        error: 'Invalid pricing tier',
        validTiers: Object.keys(PRICING_TIERS),
      });
    }

    const pricing = PRICING_TIERS[tier];

    // Look up internal user by Clerk ID
    const user = await prisma.user.findUnique({
      where: { clerkId: auth.userId },
      select: { id: true, email: true },
    });

    if (!user) {
      return res.status(401).json({ error: 'User not found. Please complete registration.' });
    }

    // Find or create campaign for this submission
    let campaign = await prisma.campaign.findFirst({
      where: { submissionId, userId: user.id },
      orderBy: { createdAt: 'desc' },
    });

    if (!campaign) {
      // Create campaign with selected pricing tier
      campaign = await prisma.campaign.create({
        data: {
          submissionId,
          userId: user.id,
          pricingTier: tier,
          officialCount: pricing.officialCount === -1 ? 0 : pricing.officialCount,
          status: 'draft',
        },
      });
    } else {
      // Update existing campaign with new tier selection
      campaign = await prisma.campaign.update({
        where: { id: campaign.id },
        data: {
          pricingTier: tier,
          officialCount: pricing.officialCount === -1 ? 0 : pricing.officialCount,
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
            unit_amount: pricing.amount,
            product_data: {
              name: `CivicState Letter Campaign — ${pricing.label}`,
              description: `Send your civic concern to ${pricing.officialCount === -1 ? 'all matched' : pricing.officialCount} official(s)`,
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
        amount: pricing.amount,
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
