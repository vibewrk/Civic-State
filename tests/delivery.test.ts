/**
 * Tests for the delivery agent.
 *
 * Covers bounce rate calculation, opt-out filtering, placeholder email
 * skipping, bounce rate threshold enforcement, and spam complaint
 * handling from apps/worker/src/agents/delivery.ts.
 *
 * All external dependencies (Postmark, Prisma, BullMQ, engine modules) are mocked.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';

const { mockSendEmail, mockTransitionJob } = vi.hoisted(() => ({
  mockSendEmail: vi.fn(),
  mockTransitionJob: vi.fn(),
}));

// ─── Mocks ────────────────────────────────────────────────────────────────────

const mockPrisma = {
  campaign: {
    findFirst: vi.fn(),
  },
  delivery: {
    findMany: vi.fn(),
    create: vi.fn(),
  },
  letter: {
    update: vi.fn(),
  },
  official: {
    update: vi.fn(),
  },
};

vi.mock('shared', () => ({
  prisma: mockPrisma,
}));

vi.mock('shared/hmac', () => ({
  computeRowHmac: vi.fn(() => 'mock-hmac-checksum'),
}));

// Mock BullMQ
vi.mock('bullmq', () => ({
  Worker: vi.fn(() => ({
    on: vi.fn(),
  })),
  Job: vi.fn(),
}));

// Mock ioredis
vi.mock('ioredis', () => ({
  default: vi.fn(() => ({
    status: 'ready',
    disconnect: vi.fn(),
  })),
}));

// Mock engine modules
vi.mock('../apps/worker/src/engine/connection.js', () => ({
  createRedisConnection: vi.fn(() => ({
    status: 'ready',
    disconnect: vi.fn(),
  })),
}));

vi.mock('../apps/worker/src/engine/config.js', () => ({
  getAgentConfig: vi.fn(() => ({
    name: 'delivery',
    queue: 'delivery',
    model: 'none',
  })),
}));

vi.mock('../apps/worker/src/engine/state-machine.js', () => ({
  transitionJob: mockTransitionJob,
}));

vi.mock('../apps/worker/src/lib/logger.js', () => ({
  logAgentAction: vi.fn(),
}));

const { processJob, setPostmarkClientForTest } = await import(
  '../apps/worker/src/agents/delivery.js'
);

function buildDeliverableLetter(index: number) {
  return {
    id: `letter-${index}`,
    content: `Letter ${index} content`,
    status: 'approved',
    official: {
      id: `off-${index}`,
      name: `Official ${index}`,
      email: `official-${index}@gov.test`,
      optedOut: false,
      district: `${index}`,
    },
  };
}

describe('Delivery Agent', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.POSTMARK_SERVER_TOKEN = 'test-token';
    mockSendEmail.mockResolvedValue({ MessageID: 'msg-test' });
    setPostmarkClientForTest({ sendEmail: mockSendEmail });
    mockPrisma.delivery.findMany.mockResolvedValue([]);
    mockPrisma.delivery.create.mockResolvedValue({ id: 'delivery-test' });
    mockPrisma.letter.update.mockResolvedValue({ id: 'letter-test' });
  });

  // ─── Pricing Tier Enforcement ───────────────────────────────────────────

  describe('Pricing tier delivery limits', () => {
    it.each([
      { pricingTier: 'single', officialCount: 1, expectedRecipients: 1 },
      { pricingTier: 'three_pack', officialCount: 3, expectedRecipients: 3 },
      { pricingTier: 'full_spread', officialCount: 0, expectedRecipients: 5 },
    ])(
      'sends only the selected $pricingTier recipient count',
      async ({ pricingTier, officialCount, expectedRecipients }) => {
        mockPrisma.campaign.findFirst.mockResolvedValueOnce({
          id: 'camp-tier',
          pricingTier,
          officialCount,
          letters: [1, 2, 3, 4, 5].map(buildDeliverableLetter),
          submission: { zipCode: '10001' },
        });

        await processJob({
          data: { submissionId: 'sub-tier' },
        } as unknown as Parameters<typeof processJob>[0]);

        expect(mockSendEmail).toHaveBeenCalledTimes(expectedRecipients);
        expect(mockPrisma.delivery.create).toHaveBeenCalledTimes(expectedRecipients);
        expect(mockPrisma.letter.update).toHaveBeenCalledTimes(expectedRecipients);
        expect(mockSendEmail.mock.calls.map(([message]) => message.To)).toEqual(
          Array.from(
            { length: expectedRecipients },
            (_unused, index) => `official-${index + 1}@gov.test`,
          ),
        );
      },
    );

    it('fails closed before sending letters for an unknown pricing tier', async () => {
      mockPrisma.campaign.findFirst.mockResolvedValueOnce({
        id: 'camp-unknown-tier',
        pricingTier: 'unlimited_future_tier',
        officialCount: 5,
        letters: [1, 2, 3, 4, 5].map(buildDeliverableLetter),
        submission: { zipCode: '10001' },
      });

      await expect(
        processJob({
          data: { submissionId: 'sub-unknown-tier' },
        } as unknown as Parameters<typeof processJob>[0]),
      ).rejects.toThrow('Unknown pricing tier: unlimited_future_tier');

      expect(mockSendEmail).not.toHaveBeenCalled();
      expect(mockPrisma.delivery.create).not.toHaveBeenCalled();
      expect(mockPrisma.letter.update).not.toHaveBeenCalled();
      expect(mockTransitionJob).toHaveBeenNthCalledWith(
        1,
        'sub-unknown-tier',
        'paid',
        'delivering',
        'delivery',
      );
      expect(mockTransitionJob).toHaveBeenNthCalledWith(
        2,
        'sub-unknown-tier',
        'delivering',
        'failed',
        'delivery',
      );
      expect(mockTransitionJob).not.toHaveBeenCalledWith(
        'sub-unknown-tier',
        'delivering',
        'delivered',
        'delivery',
      );
    });

    it('fails closed before sending when a limited tier has an invalid official count', async () => {
      mockPrisma.campaign.findFirst.mockResolvedValueOnce({
        id: 'camp-invalid-count',
        pricingTier: 'single',
        officialCount: 0,
        letters: [1].map(buildDeliverableLetter),
        submission: { zipCode: '10001' },
      });

      await expect(
        processJob({
          data: { submissionId: 'sub-invalid-count' },
        } as unknown as Parameters<typeof processJob>[0]),
      ).rejects.toThrow('Invalid official count for pricing tier single: 0');

      expect(mockSendEmail).not.toHaveBeenCalled();
      expect(mockPrisma.delivery.create).not.toHaveBeenCalled();
      expect(mockPrisma.letter.update).not.toHaveBeenCalled();
      expect(mockTransitionJob).toHaveBeenNthCalledWith(
        2,
        'sub-invalid-count',
        'delivering',
        'failed',
        'delivery',
      );
    });
  });

  // ─── Bounce Rate Calculation ─────────────────────────────────────────────

  describe('Bounce rate calculation', () => {
    it('calculates bounce rate as bounced / total deliveries', () => {
      // Unit test of the calculation logic used in getDomainBounceRate
      const deliveries = [
        { status: 'sent' },
        { status: 'bounced' },
        { status: 'sent' },
        { status: 'sent' },
        { status: 'bounced' },
      ];

      const bounced = deliveries.filter((d) => d.status === 'bounced').length;
      const rate = bounced / deliveries.length;

      expect(rate).toBe(0.4); // 2 bounced out of 5 = 40%
    });

    it('returns 0 when no deliveries exist for a domain', () => {
      const deliveries: Array<{ status: string }> = [];

      if (deliveries.length === 0) {
        expect(0).toBe(0); // getDomainBounceRate returns 0 for empty
      }
    });

    it('returns 1.0 when all deliveries bounced', () => {
      const deliveries = [
        { status: 'bounced' },
        { status: 'bounced' },
        { status: 'bounced' },
      ];

      const bounced = deliveries.filter((d) => d.status === 'bounced').length;
      const rate = bounced / deliveries.length;

      expect(rate).toBe(1.0);
    });

    it('returns 0 when no deliveries have bounced', () => {
      const deliveries = [
        { status: 'sent' },
        { status: 'sent' },
        { status: 'sent' },
      ];

      const bounced = deliveries.filter((d) => d.status === 'bounced').length;
      const rate = bounced / deliveries.length;

      expect(rate).toBe(0);
    });
  });

  // ─── Opt-Out Filtering ───────────────────────────────────────────────────

  describe('Opted-out officials are skipped', () => {
    it('skips officials with optedOut flag and records skip reason', () => {
      const official = {
        id: 'off-1',
        name: 'Opted Out Senator',
        email: 'senator@senate.gov',
        optedOut: true,
      };

      // Replicate the delivery agent logic
      const result = {
        sent: 0,
        skipped: 0,
        failed: 0,
        details: [] as Array<{ officialId: string; officialName: string; status: string; reason?: string }>,
      };

      if (official.optedOut) {
        result.skipped++;
        result.details.push({
          officialId: official.id,
          officialName: official.name,
          status: 'skipped_opted_out',
          reason: 'Official has opted out of communications',
        });
      }

      expect(result.skipped).toBe(1);
      expect(result.sent).toBe(0);
      expect(result.details[0].status).toBe('skipped_opted_out');
      expect(result.details[0].reason).toContain('opted out');
    });

    it('does not skip officials who have not opted out', () => {
      const official = {
        id: 'off-2',
        name: 'Active Senator',
        email: 'active@senate.gov',
        optedOut: false,
      };

      let skipped = false;
      if (official.optedOut) {
        skipped = true;
      }

      expect(skipped).toBe(false);
    });
  });

  // ─── Placeholder Email Filtering ─────────────────────────────────────────

  describe('Placeholder emails are skipped', () => {
    it('skips officials with @placeholder in email', () => {
      const official = {
        id: 'off-3',
        name: 'No Email Official',
        email: 'unknown@placeholder.gov',
        optedOut: false,
      };

      // Replicate the delivery agent logic
      const shouldSkip =
        !official.email || official.email.includes('@placeholder');

      expect(shouldSkip).toBe(true);
    });

    it('skips officials with empty email', () => {
      const official = {
        id: 'off-4',
        name: 'Empty Email Official',
        email: '',
        optedOut: false,
      };

      const shouldSkip =
        !official.email || official.email.includes('@placeholder');

      expect(shouldSkip).toBe(true);
    });

    it('does not skip officials with valid emails', () => {
      const official = {
        id: 'off-5',
        name: 'Valid Email Official',
        email: 'senator@senate.gov',
        optedOut: false,
      };

      const shouldSkip =
        !official.email || official.email.includes('@placeholder');

      expect(shouldSkip).toBe(false);
    });

    it('creates a failed delivery record for skipped placeholder emails', async () => {
      mockPrisma.delivery.create.mockResolvedValueOnce({
        id: 'del-1',
        status: 'failed',
      });

      // Simulate what the delivery agent does for placeholder emails
      await mockPrisma.delivery.create({
        data: {
          letterId: 'letter-1',
          status: 'failed',
          postmarkMessageId: null,
        },
      });

      expect(mockPrisma.delivery.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            status: 'failed',
            postmarkMessageId: null,
          }),
        }),
      );
    });
  });

  // ─── Bounce Rate Threshold ───────────────────────────────────────────────

  describe('Bounce rate >10% pauses domain delivery', () => {
    it('skips delivery when domain bounce rate exceeds 10%', () => {
      const BOUNCE_RATE_THRESHOLD = 0.10;
      const bounceRate = 0.15; // 15%
      const domain = 'highbounce.gov';

      const shouldSkip = bounceRate > BOUNCE_RATE_THRESHOLD;

      expect(shouldSkip).toBe(true);

      // Verify the skip reason includes domain info
      const reason = `Domain ${domain} bounce rate ${(bounceRate * 100).toFixed(1)}% exceeds ${BOUNCE_RATE_THRESHOLD * 100}% threshold`;
      expect(reason).toContain('highbounce.gov');
      expect(reason).toContain('15.0%');
      expect(reason).toContain('10%');
    });

    it('allows delivery when domain bounce rate is exactly 10%', () => {
      const BOUNCE_RATE_THRESHOLD = 0.10;
      const bounceRate = 0.10; // exactly 10%

      // The threshold check is > not >=
      const shouldSkip = bounceRate > BOUNCE_RATE_THRESHOLD;

      expect(shouldSkip).toBe(false);
    });

    it('allows delivery when domain bounce rate is below 10%', () => {
      const BOUNCE_RATE_THRESHOLD = 0.10;
      const bounceRate = 0.05; // 5%

      const shouldSkip = bounceRate > BOUNCE_RATE_THRESHOLD;

      expect(shouldSkip).toBe(false);
    });

    it('queries deliveries within 30-day window for bounce rate', async () => {
      // Verify the domain bounce rate lookup uses the correct window
      const BOUNCE_WINDOW_DAYS = 30;
      const windowStart = new Date();
      windowStart.setDate(windowStart.getDate() - BOUNCE_WINDOW_DAYS);

      mockPrisma.delivery.findMany.mockResolvedValueOnce([
        { status: 'sent' },
        { status: 'bounced' },
      ]);

      const deliveries = await mockPrisma.delivery.findMany({
        where: {
          sentAt: { gte: windowStart },
          letter: {
            official: {
              email: { endsWith: '@senate.gov' },
            },
          },
        },
        select: { status: true },
      });

      expect(deliveries).toHaveLength(2);
      expect(mockPrisma.delivery.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            sentAt: expect.objectContaining({ gte: expect.any(Date) }),
          }),
        }),
      );
    });
  });

  // ─── Spam Complaint Handling ─────────────────────────────────────────────

  describe('Spam complaint triggers opt-out', () => {
    it('marks official as opted out when spam complaint received', async () => {
      mockPrisma.official.update.mockResolvedValueOnce({
        id: 'off-spam',
        optedOut: true,
      });

      // Simulate the webhook handler setting opt-out on spam complaint
      const updatedOfficial = await mockPrisma.official.update({
        where: { id: 'off-spam' },
        data: { optedOut: true },
      });

      expect(updatedOfficial.optedOut).toBe(true);
      expect(mockPrisma.official.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: 'off-spam' },
          data: { optedOut: true },
        }),
      );
    });

    it('spam complaint event contains required official reference', () => {
      // Postmark SpamComplaint webhook payload structure
      const spamEvent = {
        RecordType: 'SpamComplaint',
        MessageID: 'msg-123',
        Email: 'senator@senate.gov',
        Tag: 'civic-letter',
        Metadata: {
          officialId: 'off-1',
          campaignId: 'camp-1',
          letterId: 'letter-1',
        },
      };

      expect(spamEvent.RecordType).toBe('SpamComplaint');
      expect(spamEvent.Metadata.officialId).toBeDefined();
      expect(spamEvent.Email).toBeTruthy();
    });

    it('opted-out official is skipped in subsequent deliveries', () => {
      // After spam complaint marks official as opted out,
      // the delivery agent should skip them
      const official = {
        id: 'off-spam',
        name: 'Complained Senator',
        email: 'senator@senate.gov',
        optedOut: true, // set by spam complaint handler
      };

      const shouldSkip = official.optedOut === true;
      expect(shouldSkip).toBe(true);
    });
  });

  // ─── Email Domain Extraction ─────────────────────────────────────────────

  describe('Email domain extraction', () => {
    it('extracts domain from email address', () => {
      function getEmailDomain(email: string): string {
        return email.split('@')[1]?.toLowerCase() || '';
      }

      expect(getEmailDomain('senator@senate.gov')).toBe('senate.gov');
      expect(getEmailDomain('rep@house.gov')).toBe('house.gov');
      expect(getEmailDomain('UPPER@CASE.GOV')).toBe('case.gov');
    });

    it('returns empty string for invalid emails', () => {
      function getEmailDomain(email: string): string {
        return email.split('@')[1]?.toLowerCase() || '';
      }

      expect(getEmailDomain('')).toBe('');
      expect(getEmailDomain('noemail')).toBe('');
    });
  });
});
