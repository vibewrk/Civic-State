import { Worker, Job } from 'bullmq';
import { ServerClient } from 'postmark';
import { createRedisConnection } from '../engine/connection.js';
import { getAgentConfig } from '../engine/config.js';
import { transitionJob } from '../engine/state-machine.js';
import { logAgentAction } from '../lib/logger.js';

const config = getAgentConfig('delivery');

// Postmark client — initialized lazily to avoid startup errors when env var is missing
let postmarkClient: ServerClient | null = null;
function getPostmarkClient(): ServerClient {
  if (!postmarkClient) {
    const token = process.env.POSTMARK_SERVER_TOKEN;
    if (!token) {
      throw new Error('POSTMARK_SERVER_TOKEN environment variable is required');
    }
    postmarkClient = new ServerClient(token);
  }
  return postmarkClient;
}

const FROM_EMAIL = process.env.POSTMARK_FROM_EMAIL || 'letters@civicstate.com';
const REPLY_TO_DOMAIN = process.env.REPLY_TO_DOMAIN || 'civicstate.com';
const BOUNCE_RATE_THRESHOLD = 0.10; // 10%
const BOUNCE_WINDOW_DAYS = 30;

interface DeliveryResult {
  sent: number;
  skipped: number;
  failed: number;
  details: Array<{
    officialId: string;
    officialName: string;
    status: 'sent' | 'skipped_opted_out' | 'skipped_invalid_email' | 'skipped_high_bounce_rate' | 'failed';
    reason?: string;
  }>;
}

/**
 * Extracts the email domain from an address.
 */
function getEmailDomain(email: string): string {
  return email.split('@')[1]?.toLowerCase() || '';
}

/**
 * Check per-domain bounce rate over the last 30 days.
 * Returns the rate as a number between 0 and 1.
 */
async function getDomainBounceRate(domain: string): Promise<number> {
  const { prisma } = await import('shared');

  const windowStart = new Date();
  windowStart.setDate(windowStart.getDate() - BOUNCE_WINDOW_DAYS);

  // Find all deliveries to officials with emails at this domain in the window
  const deliveries = await prisma.delivery.findMany({
    where: {
      sentAt: { gte: windowStart },
      letter: {
        official: {
          email: { endsWith: `@${domain}` },
        },
      },
    },
    select: { status: true },
  });

  if (deliveries.length === 0) return 0;

  const bounced = deliveries.filter((d: { status: string }) => d.status === 'bounced').length;
  return bounced / deliveries.length;
}

async function processJob(job: Job): Promise<void> {
  const { submissionId } = job.data;
  const startTime = Date.now();
  const { prisma } = await import('shared');

  // Transition to delivering
  await transitionJob(submissionId, 'paid', 'delivering', config.name);

  // Find the campaign with its letters and officials
  const campaign = await prisma.campaign.findFirst({
    where: {
      submissionId,
      status: { in: ['paid', 'delivering'] },
    },
    include: {
      letters: {
        where: { status: { in: ['draft', 'approved'] } },
        include: {
          official: true,
        },
      },
      submission: {
        select: { zipCode: true },
      },
    },
  });

  if (!campaign) {
    throw new Error(`No campaign found for submission ${submissionId}`);
  }

  if (campaign.letters.length === 0) {
    throw new Error(`No letters to deliver for campaign ${campaign.id}`);
  }

  const result: DeliveryResult = {
    sent: 0,
    skipped: 0,
    failed: 0,
    details: [],
  };

  const client = getPostmarkClient();

  for (const letter of campaign.letters) {
    const official = letter.official;

    // Skip opted-out officials
    if (official.optedOut) {
      result.skipped++;
      result.details.push({
        officialId: official.id,
        officialName: official.name,
        status: 'skipped_opted_out',
        reason: 'Official has opted out of communications',
      });
      continue;
    }

    // Skip officials without valid email (placeholder emails)
    if (!official.email || official.email.includes('@placeholder')) {
      result.skipped++;
      result.details.push({
        officialId: official.id,
        officialName: official.name,
        status: 'skipped_invalid_email',
        reason: `Invalid email: ${official.email}`,
      });

      // Create a failed delivery record for tracking
      await prisma.delivery.create({
        data: {
          letterId: letter.id,
          status: 'failed',
          postmarkMessageId: null,
        },
      });
      continue;
    }

    // Check per-domain bounce rate
    const domain = getEmailDomain(official.email);
    const bounceRate = await getDomainBounceRate(domain);

    if (bounceRate > BOUNCE_RATE_THRESHOLD) {
      console.warn(
        `[Delivery] High bounce rate for domain ${domain}: ${(bounceRate * 100).toFixed(1)}% — skipping ${official.name}`,
      );
      result.skipped++;
      result.details.push({
        officialId: official.id,
        officialName: official.name,
        status: 'skipped_high_bounce_rate',
        reason: `Domain ${domain} bounce rate ${(bounceRate * 100).toFixed(1)}% exceeds ${BOUNCE_RATE_THRESHOLD * 100}% threshold`,
      });

      // Create a failed delivery record
      await prisma.delivery.create({
        data: {
          letterId: letter.id,
          status: 'failed',
          postmarkMessageId: null,
        },
      });
      continue;
    }

    // Send via Postmark
    try {
      const district = official.district || campaign.submission.zipCode;
      const subject = `Constituent Communication Regarding ${district}`;

      const response = await client.sendEmail({
        From: FROM_EMAIL,
        To: official.email,
        ReplyTo: `reply+${campaign.id}@${REPLY_TO_DOMAIN}`,
        Subject: subject,
        TextBody: letter.content,
        Tag: 'civic-letter',
        Metadata: {
          campaignId: campaign.id,
          letterId: letter.id,
          officialId: official.id,
        },
        TrackOpens: true,
      });

      // Create Delivery record
      await prisma.delivery.create({
        data: {
          letterId: letter.id,
          postmarkMessageId: response.MessageID,
          status: 'sent',
          sentAt: new Date(),
        },
      });

      // Update letter status to sent
      await prisma.letter.update({
        where: { id: letter.id },
        data: { status: 'sent' },
      });

      result.sent++;
      result.details.push({
        officialId: official.id,
        officialName: official.name,
        status: 'sent',
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      console.error(
        `[Delivery] Failed to send to ${official.name} (${official.email}):`,
        errorMessage,
      );

      // Create a failed delivery record
      await prisma.delivery.create({
        data: {
          letterId: letter.id,
          status: 'failed',
          postmarkMessageId: null,
        },
      });

      result.failed++;
      result.details.push({
        officialId: official.id,
        officialName: official.name,
        status: 'failed',
        reason: errorMessage,
      });
    }
  }

  // Log agent action with delivery stats (per AGNT-05, AGNT-06)
  await logAgentAction({
    jobId: submissionId,
    agent: config.name,
    action: 'deliver',
    result: {
      campaignId: campaign.id,
      sent: result.sent,
      skipped: result.skipped,
      failed: result.failed,
      total: campaign.letters.length,
      details: result.details,
    },
    modelUsed: config.model,
    inputTokens: 0, // Delivery agent does not use LLM
    outputTokens: 0,
    durationMs: Date.now() - startTime,
  });

  // Transition to delivered only if at least one letter was sent
  if (result.sent > 0) {
    await transitionJob(submissionId, 'delivering', 'delivered', config.name);
  } else {
    // All letters failed or were skipped — transition to failed
    await transitionJob(submissionId, 'delivering', 'failed', config.name);
    throw new Error(
      `Delivery failed: 0 of ${campaign.letters.length} letters sent (${result.skipped} skipped, ${result.failed} failed)`,
    );
  }

  console.log(
    `[Delivery] Campaign ${campaign.id}: ${result.sent} sent, ${result.skipped} skipped, ${result.failed} failed`,
  );
}

// Each Worker gets its own Redis connection (CRITICAL — per BullMQ docs)
export const deliveryWorker = new Worker(config.queue, processJob, {
  connection: createRedisConnection(),
  concurrency: 5,
});

deliveryWorker.on('failed', (job, err) => {
  console.error(`Delivery failed for job ${job?.id}:`, err.message);
});
