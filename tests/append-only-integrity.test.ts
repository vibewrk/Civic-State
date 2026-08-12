import { describe, expect, it, vi } from 'vitest';
import { computeRowHmac } from '../packages/shared/src/hmac.js';
import {
  agentActionLogHmacFields,
  auditLogHmacFields,
  ledgerEntryHmacFields,
  verifyAppendOnlyIntegrity,
  verifyPrismaAppendOnlyIntegrity,
  type AgentActionLogIntegrityRow,
  type AppendOnlyIntegrityPrisma,
  type AuditLogIntegrityRow,
  type LedgerEntryIntegrityRow,
} from '../packages/shared/src/append-only-integrity.js';

const SECRET = 'append-only-integrity-test-secret';
const CREATED_AT = new Date('2026-08-12T03:36:21.000Z');
const LEGACY_LEDGER_HMAC = '22c5504ad543e79f41e58d858ef3a9b865b082f33920ffa7f4c5f18f89c6e255';
const LEGACY_AGENT_HMAC = '9cc14a76c274deb56c7d47a96d474f0269095e96b3c4f8d843f3584e0cf71325';
const CANONICAL_AUDIT_DETAILS_HMAC = '3ec6d46c0d75f154d3a97ea3c2e8a0798ebd2fdc65c861775377b57e78ede5de';
const LEGACY_NESTED_AGENT_PAYLOAD_HMAC =
  '271d4e7d8f74cf1872c86ad1c39dd57c88d0ea727b032ae8042c848f0673e21b';
const LEGACY_REORDERED_NESTED_AGENT_PAYLOAD_HMAC =
  '2f20783d8db836a1a1347a05d09740bb0e25ff86dbe054d3f3f1313f7931b06e';

function ledgerRow(
  overrides: Partial<LedgerEntryIntegrityRow> = {},
): LedgerEntryIntegrityRow {
  const fields = {
    type: 'payment',
    amount: 1500,
    currency: 'usd',
    reference: 'pi_verified',
    description: 'Amplify package payment',
    jobId: null,
    createdAt: CREATED_AT,
  };

  return {
    id: 'ledger-1',
    ...fields,
    hmacChecksum: computeRowHmac(ledgerEntryHmacFields(fields), SECRET),
    ...overrides,
  };
}

function auditRow(overrides: Partial<AuditLogIntegrityRow> = {}): AuditLogIntegrityRow {
  const details = {
    tier: 'pass',
    reason: 'clean',
    confidence: 0.98,
  };
  const fields = {
    userId: 'user-1',
    action: 'submission.moderated',
    resource: 'submission',
    resourceId: 'sub-1',
    details,
  };

  return {
    id: 'audit-1',
    ...fields,
    details,
    hmacChecksum: computeRowHmac(auditLogHmacFields(fields), SECRET),
    createdAt: CREATED_AT,
    ...overrides,
  };
}

function canonicalAuditRowWithReorderedStorage(): AuditLogIntegrityRow {
  return auditRow({
    details: {
      tier: 'pass',
      reason: 'clean',
      confidence: 0.98,
    },
    hmacChecksum: CANONICAL_AUDIT_DETAILS_HMAC,
  });
}

function spamComplaintAuditRow(): AuditLogIntegrityRow {
  const details = {
    postmarkMessageId: 'msg-1',
    officialEmail: 'mayor@example.gov',
  };
  const fields = {
    action: 'spam_complaint',
    resource: 'official',
    resourceId: 'official-1',
    details,
  };

  return {
    id: 'audit-spam-1',
    userId: null,
    action: 'spam_complaint',
    resource: 'official',
    resourceId: 'official-1',
    details,
    hmacChecksum: computeRowHmac(auditLogHmacFields(fields), SECRET),
    createdAt: CREATED_AT,
  };
}

function agentActionRow(
  overrides: Partial<AgentActionLogIntegrityRow> = {},
): AgentActionLogIntegrityRow {
  const result = {
    from: 'payment_pending',
    to: 'paid',
  };
  const fields = {
    jobId: 'job-1',
    agent: 'delivery',
    action: 'state_transition',
    result,
    modelUsed: '',
    inputTokens: 0,
    outputTokens: 0,
    durationMs: 0,
    createdAt: CREATED_AT,
  };

  return {
    id: 'agent-log-1',
    ...fields,
    hmacChecksum: computeRowHmac(agentActionLogHmacFields(fields), SECRET),
    ...overrides,
  };
}

function prismaTable<Row>(rows: Row[]) {
  return {
    count: vi.fn(async () => rows.length),
    findMany: vi.fn(async ({ skip = 0, take = rows.length }: { skip?: number; take?: number }) =>
      rows.slice(skip, skip + take),
    ),
  };
}

describe('append-only integrity verifier', () => {
  it('verifies ledger, audit, and agent action rows against their write-time HMAC contracts', () => {
    const report = verifyAppendOnlyIntegrity(
      {
        ledgerEntries: [ledgerRow()],
        auditLogs: [auditRow(), spamComplaintAuditRow()],
        agentActionLogs: [agentActionRow()],
      },
      { secretKey: SECRET },
    );

    expect(report.ok).toBe(true);
    expect(report.summary).toMatchObject({
      checkedRows: 4,
      verifiedRows: 4,
      failedRows: 0,
      failedTables: 0,
    });
    expect(report.tables.every((table) => table.failures.length === table.failedRows)).toBe(true);
  });

  it('accepts canonical audit detail serialization when JSON storage reorders keys', () => {
    const report = verifyAppendOnlyIntegrity(
      {
        ledgerEntries: [],
        auditLogs: [canonicalAuditRowWithReorderedStorage()],
        agentActionLogs: [],
      },
      { secretKey: SECRET },
    );

    expect(report.ok).toBe(true);
    expect(report.summary).toMatchObject({
      checkedRows: 1,
      verifiedRows: 1,
      failedRows: 0,
    });
  });

  it('does not accept the legacy spam complaint HMAC after userId is changed', () => {
    const report = verifyAppendOnlyIntegrity(
      {
        ledgerEntries: [],
        auditLogs: [spamComplaintAuditRow(), { ...spamComplaintAuditRow(), id: 'audit-spam-2', userId: 'user-1' }],
        agentActionLogs: [],
      },
      { secretKey: SECRET },
    );

    expect(report.ok).toBe(false);
    expect(report.summary).toMatchObject({
      checkedRows: 2,
      verifiedRows: 1,
      failedRows: 1,
    });
    expect(report.tables[1]?.failures).toEqual([
      expect.objectContaining({
        rowId: 'audit-spam-2',
        reason: 'hmac_mismatch',
      }),
    ]);
  });

  it('fails closed when a stored ledger value changes after the checksum was written', () => {
    const tampered = ledgerRow({ amount: 2500 });

    const report = verifyAppendOnlyIntegrity(
      {
        ledgerEntries: [tampered],
        auditLogs: [],
        agentActionLogs: [],
      },
      { secretKey: SECRET },
    );

    expect(report.ok).toBe(false);
    expect(report.summary.failedRows).toBe(1);
    expect(report.tables[0]).toMatchObject({
      table: 'ledger_entries',
      status: 'failed',
      failedRows: 1,
      failures: [
        expect.objectContaining({
          rowId: 'ledger-1',
          reason: 'hmac_mismatch',
        }),
      ],
    });
  });

  it('fails closed for an empty checksum instead of treating it as unverified-but-acceptable', () => {
    const report = verifyAppendOnlyIntegrity(
      {
        ledgerEntries: [ledgerRow({ hmacChecksum: '' })],
        auditLogs: [],
        agentActionLogs: [],
      },
      { secretKey: SECRET },
    );

    expect(report.ok).toBe(false);
    expect(report.tables[0]?.failures[0]).toMatchObject({
      rowId: 'ledger-1',
      reason: 'hmac_missing',
    });
  });

  it('does not report ok for a partial scan with unchecked rows', () => {
    const report = verifyAppendOnlyIntegrity(
      {
        ledgerEntries: [ledgerRow()],
        auditLogs: [],
        agentActionLogs: [],
      },
      {
        secretKey: SECRET,
        perTableLimit: 1,
        totals: { ledger_entries: 2 },
      },
    );

    expect(report.ok).toBe(false);
    expect(report.scope).toEqual({
      complete: false,
      perTableLimit: 1,
      truncatedTables: [
        {
          table: 'ledger_entries',
          totalRows: 2,
          checkedRows: 1,
        },
      ],
    });
  });

  it('requires an HMAC secret even when every append-only table is empty', () => {
    const previous = process.env.HMAC_SECRET_KEY;
    delete process.env.HMAC_SECRET_KEY;

    try {
      expect(() =>
        verifyAppendOnlyIntegrity({
          ledgerEntries: [],
          auditLogs: [],
          agentActionLogs: [],
        }),
      ).toThrow('HMAC_SECRET_KEY environment variable is required');
    } finally {
      if (previous === undefined) {
        delete process.env.HMAC_SECRET_KEY;
      } else {
        process.env.HMAC_SECRET_KEY = previous;
      }
    }
  });

  it('checks Prisma append-only rows in bounded batches', async () => {
    const ledgerEntry = ledgerRow();
    const secondLedgerEntry = ledgerRow({ id: 'ledger-2', reference: 'pi_verified_2' });
    secondLedgerEntry.hmacChecksum = computeRowHmac(
      ledgerEntryHmacFields(secondLedgerEntry),
      SECRET,
    );
    const thirdLedgerEntry = ledgerRow({ id: 'ledger-3', reference: 'pi_verified_3' });
    thirdLedgerEntry.hmacChecksum = computeRowHmac(
      ledgerEntryHmacFields(thirdLedgerEntry),
      SECRET,
    );

    const ledgerEntryTable = prismaTable([ledgerEntry, secondLedgerEntry, thirdLedgerEntry]);
    const prisma = {
      ledgerEntry: ledgerEntryTable,
      auditLog: prismaTable<AuditLogIntegrityRow>([]),
      agentActionLog: prismaTable<AgentActionLogIntegrityRow>([]),
    } satisfies AppendOnlyIntegrityPrisma;

    const report = await verifyPrismaAppendOnlyIntegrity(prisma, {
      secretKey: SECRET,
      batchSize: 2,
    });

    expect(report.ok).toBe(true);
    expect(report.summary).toMatchObject({
      checkedRows: 3,
      verifiedRows: 3,
      failedRows: 0,
    });
    expect(ledgerEntryTable.findMany).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({ skip: 0, take: 2 }),
    );
    expect(ledgerEntryTable.findMany).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({ skip: 2, take: 1 }),
    );
  });
});

describe('append-only HMAC payload compatibility', () => {
  it('keeps the historical top-level serializer stable for existing rows', () => {
    expect(computeRowHmac(ledgerEntryHmacFields(ledgerRow()), SECRET)).toBe(LEGACY_LEDGER_HMAC);
    expect(computeRowHmac(agentActionLogHmacFields(agentActionRow()), SECRET)).toBe(
      LEGACY_AGENT_HMAC,
    );
  });

  it('does not rewrite nested object semantics without a versioned migration path', () => {
    const first = computeRowHmac(
      {
        action: 'state_transition',
        result: {
          to: 'paid',
          from: 'payment_pending',
          nested: { b: 2, a: 1 },
        },
      },
      SECRET,
    );

    const second = computeRowHmac(
      {
        result: {
          nested: { a: 1, b: 2 },
          from: 'payment_pending',
          to: 'paid',
        },
        action: 'state_transition',
      },
      SECRET,
    );

    expect(first).toBe(LEGACY_NESTED_AGENT_PAYLOAD_HMAC);
    expect(second).toBe(LEGACY_REORDERED_NESTED_AGENT_PAYLOAD_HMAC);
    expect(second).not.toBe(first);
  });
});
