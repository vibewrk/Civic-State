import { Router, type IRouter, type Request } from 'express';
import { getAuth } from '@clerk/express';
import { computeRowHmac } from 'shared/hmac';

const router: IRouter = Router();
type SharedPrismaClient = typeof import('shared')['prisma'];

type CampaignListRow = {
  id: string;
  status: string;
  pricingTier: string;
  officialCount: number;
  createdAt: Date;
  updatedAt: Date;
  submission: {
    id: string;
    issueDescription: string;
    desiredOutcome: string;
    zipCode: string;
    isAnonymous: boolean;
    status: string;
    createdAt: Date;
  };
  letters: Array<{
    id: string;
    status: string;
    official: {
      id: string;
      name: string;
      title: string;
      email: string;
      jurisdiction: string;
      level: string;
      district: string;
      state: string;
      party: string;
    };
    deliveries: Array<{
      id: string;
      status: string;
      sentAt: Date | null;
      deliveredAt: Date | null;
      bouncedAt: Date | null;
      bounceType: string | null;
    }>;
  }>;
};

/**
 * Resolve the internal userId from a Clerk session.
 * Returns null if unauthenticated or no matching user record.
 */
async function resolveUserId(
  req: Request,
  prisma: SharedPrismaClient,
): Promise<string | null> {
  try {
    const auth = getAuth(req);
    if (!auth?.userId) return null;
    const user = await prisma.user.findUnique({
      where: { clerkId: auth.userId },
      select: { id: true },
    });
    return user?.id ?? null;
  } catch {
    return null;
  }
}

// GET /api/campaigns — List all campaigns for the authenticated user
router.get('/api/campaigns', async (req, res) => {
  try {
    const { prisma } = await import('shared');
    const userId = await resolveUserId(req, prisma);

    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const campaigns: CampaignListRow[] = await prisma.campaign.findMany({
      where: { userId, deletedAt: null },
      orderBy: { createdAt: 'desc' },
      include: {
        submission: {
          select: {
            id: true,
            issueDescription: true,
            desiredOutcome: true,
            zipCode: true,
            isAnonymous: true,
            status: true,
            createdAt: true,
          },
        },
        letters: {
          where: { deletedAt: null },
          include: {
            official: {
              select: {
                id: true,
                name: true,
                title: true,
                email: true,
                jurisdiction: true,
                level: true,
                district: true,
                state: true,
                party: true,
              },
            },
            deliveries: {
              orderBy: { createdAt: 'desc' },
              take: 1,
              select: {
                id: true,
                status: true,
                sentAt: true,
                deliveredAt: true,
                bouncedAt: true,
                bounceType: true,
              },
            },
          },
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    const result = campaigns.map((campaign) => ({
      id: campaign.id,
      status: campaign.status,
      pricingTier: campaign.pricingTier,
      officialCount: campaign.officialCount,
      createdAt: campaign.createdAt,
      updatedAt: campaign.updatedAt,
      submission: campaign.submission,
      letters: campaign.letters.map((letter) => ({
        id: letter.id,
        status: letter.status,
        official: letter.official,
        delivery: letter.deliveries[0] ?? null,
      })),
    }));

    res.json({ campaigns: result });
  } catch (err) {
    console.error('Failed to fetch campaigns:', err);
    res.status(500).json({ error: 'Failed to fetch campaigns' });
  }
});

// GET /api/campaigns/:id — Single campaign with full details
router.get('/api/campaigns/:id', async (req, res) => {
  try {
    const { prisma } = await import('shared');
    const userId = await resolveUserId(req, prisma);

    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const campaign = await prisma.campaign.findFirst({
      where: {
        id: req.params.id,
        userId,
        deletedAt: null,
      },
      include: {
        submission: {
          select: {
            id: true,
            issueDescription: true,
            desiredOutcome: true,
            zipCode: true,
            isAnonymous: true,
            status: true,
            createdAt: true,
          },
        },
        letters: {
          where: { deletedAt: null },
          include: {
            official: {
              select: {
                id: true,
                name: true,
                title: true,
                email: true,
                jurisdiction: true,
                level: true,
                district: true,
                state: true,
                party: true,
                phone: true,
              },
            },
            deliveries: {
              orderBy: { createdAt: 'desc' },
              select: {
                id: true,
                status: true,
                postmarkMessageId: true,
                sentAt: true,
                deliveredAt: true,
                bouncedAt: true,
                bounceType: true,
                createdAt: true,
              },
            },
          },
          orderBy: { createdAt: 'asc' },
        },
        payments: {
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            amount: true,
            currency: true,
            status: true,
            createdAt: true,
          },
        },
      },
    });

    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }

    res.json({ campaign });
  } catch (err) {
    console.error('Failed to fetch campaign:', err);
    res.status(500).json({ error: 'Failed to fetch campaign' });
  }
});

// PATCH /api/campaigns/:id/anonymity — Toggle isAnonymous on the submission (DASH-05)
router.patch('/api/campaigns/:id/anonymity', async (req, res) => {
  try {
    const { prisma } = await import('shared');
    const userId = await resolveUserId(req, prisma);

    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const campaign = await prisma.campaign.findFirst({
      where: {
        id: req.params.id,
        userId,
        deletedAt: null,
      },
      select: {
        id: true,
        submissionId: true,
        status: true,
      },
    });

    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }

    // Only allow toggling before delivery
    if (campaign.status === 'delivering' || campaign.status === 'delivered') {
      return res.status(400).json({
        error: 'Cannot change anonymity after letters have been sent',
      });
    }

    const submission = await prisma.submission.findUnique({
      where: { id: campaign.submissionId },
      select: { isAnonymous: true },
    });

    if (!submission) {
      return res.status(404).json({ error: 'Submission not found' });
    }

    const newValue = !submission.isAnonymous;

    await prisma.submission.update({
      where: { id: campaign.submissionId },
      data: { isAnonymous: newValue },
    });

    // Audit log
    const auditDetails = {
      campaignId: campaign.id,
      submissionId: campaign.submissionId,
      previousValue: submission.isAnonymous,
      newValue,
    };

    const hmacFields = {
      userId,
      action: 'anonymity.toggled',
      resource: 'submission',
      resourceId: campaign.submissionId,
      details: JSON.stringify(auditDetails),
    };

    const hmacChecksum = computeRowHmac(hmacFields);

    await prisma.auditLog.create({
      data: {
        userId,
        action: 'anonymity.toggled',
        resource: 'submission',
        resourceId: campaign.submissionId,
        details: auditDetails,
        hmacChecksum,
      },
    });

    res.json({ isAnonymous: newValue });
  } catch (err) {
    console.error('Failed to toggle anonymity:', err);
    res.status(500).json({ error: 'Failed to toggle anonymity' });
  }
});

export default router;
