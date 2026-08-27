/**
 * CCPA Compliance API endpoints (LGAL-04).
 *
 * POST /api/compliance/delete-my-data — soft-delete all user data (72-hour SLA)
 * GET  /api/compliance/data-export    — export all user data as JSON
 *
 * All routes require authentication. Every action is logged to audit_logs with HMAC.
 */

import { Router, type IRouter } from 'express';
import { requireAuth, getAuth } from '@clerk/express';
import { computeRowHmac } from 'shared/hmac';
import { auditLogHmacFields } from 'shared/append-only-integrity';

const router: IRouter = Router();

// All compliance routes require authentication
const authMiddleware = [requireAuth()];

// ── Helpers ─────────────────────────────────────────────────────────────

/**
 * Write a compliance action to audit_logs with HMAC checksum.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function logComplianceAudit(
  prisma: any,
  userId: string,
  action: string,
  resource: string,
  resourceId: string,
  details: Record<string, unknown>,
): Promise<void> {
  const hmacFields = auditLogHmacFields({
    userId,
    action,
    resource,
    resourceId,
    details,
  });

  const hmacChecksum = computeRowHmac(hmacFields);

  await prisma.auditLog.create({
    data: {
      userId,
      action,
      resource,
      resourceId,
      details,
      hmacChecksum,
    },
  });
}

// ── POST /api/compliance/delete-my-data ─────────────────────────────────
// CCPA right-to-deletion — soft-deletes all user data with 72-hour SLA.

router.post('/api/compliance/delete-my-data', ...authMiddleware, async (req, res) => {
  try {
    const auth = getAuth(req);
    const userId = auth.userId;

    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const { prisma } = await import('shared');

    // Check for existing pending deletion request
    const existingRequest = await prisma.auditLog.findFirst({
      where: {
        userId,
        action: 'ccpa_deletion_requested',
        createdAt: {
          gte: new Date(Date.now() - 72 * 60 * 60 * 1000), // within 72 hours
        },
      },
    });

    if (existingRequest) {
      return res.status(409).json({
        error: 'A deletion request is already being processed',
        requestedAt: existingRequest.createdAt,
        slaDeadline: new Date(
          new Date(existingRequest.createdAt).getTime() + 72 * 60 * 60 * 1000,
        ).toISOString(),
      });
    }

    const now = new Date();
    const slaDeadline = new Date(now.getTime() + 72 * 60 * 60 * 1000);

    // 1. Soft-delete submissions
    const deletedSubmissions = await prisma.submission.updateMany({
      where: { userId, deletedAt: null },
      data: { deletedAt: now },
    });

    // 2. Soft-delete campaigns
    const deletedCampaigns = await prisma.campaign.updateMany({
      where: { userId, deletedAt: null },
      data: { deletedAt: now },
    });

    // 3. Soft-delete letters
    const deletedLetters = await prisma.letter.updateMany({
      where: {
        campaign: { userId },
        deletedAt: null,
      },
      data: { deletedAt: now },
    });

    // 4. Log the deletion request to audit trail
    await logComplianceAudit(prisma, userId, 'ccpa_deletion_requested', 'user', userId, {
      slaDeadline: slaDeadline.toISOString(),
      submissionsDeleted: deletedSubmissions.count,
      campaignsDeleted: deletedCampaigns.count,
      lettersDeleted: deletedLetters.count,
      requestedAt: now.toISOString(),
      note: 'CCPA right-to-deletion. 72-hour SLA. Financial/audit records retained per legal requirements.',
    });

    console.log(
      `[Compliance] CCPA deletion for user ${userId}: ` +
        `${deletedSubmissions.count} submissions, ${deletedCampaigns.count} campaigns, ` +
        `${deletedLetters.count} letters soft-deleted. SLA deadline: ${slaDeadline.toISOString()}`,
    );

    return res.status(200).json({
      message: 'Deletion request received and processing',
      deletedAt: now.toISOString(),
      slaDeadline: slaDeadline.toISOString(),
      summary: {
        submissions: deletedSubmissions.count,
        campaigns: deletedCampaigns.count,
        letters: deletedLetters.count,
      },
      note: 'Financial and audit records are retained for 7 years as required by law.',
    });
  } catch (err) {
    console.error('[Compliance] Deletion failed:', err);
    return res.status(500).json({ error: 'Deletion request failed. Please try again or contact privacy@civicstate.com.' });
  }
});

// ── GET /api/compliance/data-export ─────────────────────────────────────
// CCPA right-to-know — returns all user data as JSON.

router.get('/api/compliance/data-export', ...authMiddleware, async (req, res) => {
  try {
    const auth = getAuth(req);
    const userId = auth.userId;

    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const { prisma } = await import('shared');

    // Log the data export request
    await logComplianceAudit(prisma, userId, 'ccpa_data_export', 'user', userId, {
      requestedAt: new Date().toISOString(),
    });

    // Fetch all user data
    const [submissions, campaigns, letters, auditLogs] = await Promise.all([
      prisma.submission.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          issueDescription: true,
          desiredOutcome: true,
          zipCode: true,
          isAnonymous: true,
          status: true,
          createdAt: true,
          updatedAt: true,
          deletedAt: true,
        },
      }),
      prisma.campaign.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          status: true,
          tier: true,
          createdAt: true,
          updatedAt: true,
          deletedAt: true,
        },
      }),
      prisma.letter.findMany({
        where: { campaign: { userId } },
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          body: true,
          status: true,
          deliveredAt: true,
          createdAt: true,
          updatedAt: true,
          deletedAt: true,
        },
      }),
      prisma.auditLog.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          action: true,
          resource: true,
          resourceId: true,
          createdAt: true,
        },
      }),
    ]);

    console.log(
      `[Compliance] Data export for user ${userId}: ` +
        `${submissions.length} submissions, ${campaigns.length} campaigns, ` +
        `${letters.length} letters, ${auditLogs.length} audit logs`,
    );

    return res.status(200).json({
      exportedAt: new Date().toISOString(),
      userId,
      data: {
        submissions,
        campaigns,
        letters,
        auditLogs,
      },
    });
  } catch (err) {
    console.error('[Compliance] Data export failed:', err);
    return res.status(500).json({ error: 'Data export failed. Please try again or contact privacy@civicstate.com.' });
  }
});

export default router;
