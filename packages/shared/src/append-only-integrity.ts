import { verifyRowHmac } from './hmac.js';

export type AppendOnlyTableName =
  | 'ledger_entries'
  | 'audit_logs'
  | 'agent_action_logs';

export type AppendOnlyIntegrityStatus = 'verified' | 'failed' | 'empty';
export type AppendOnlyIntegrityFailureReason = 'hmac_missing' | 'hmac_mismatch';

export interface LedgerEntryIntegrityRow {
  id: string;
  type: string;
  amount: number;
  currency: string;
  reference: string;
  description: string;
  jobId: string | null;
  hmacChecksum: string | null;
  createdAt: Date | string;
}

export interface AuditLogIntegrityRow {
  id: string;
  userId: string | null;
  action: string;
  resource: string;
  resourceId: string;
  details: unknown;
  hmacChecksum: string | null;
  createdAt: Date | string;
}

export interface AgentActionLogIntegrityRow {
  id: string;
  jobId: string;
  agent: string;
  action: string;
  result: unknown;
  modelUsed: string;
  inputTokens: number;
  outputTokens: number;
  durationMs: number;
  hmacChecksum: string | null;
  createdAt: Date | string;
}

export interface AppendOnlyIntegrityFailure {
  table: AppendOnlyTableName;
  rowId: string;
  reason: AppendOnlyIntegrityFailureReason;
  createdAt: string;
}

export interface AppendOnlyIntegrityTableReport {
  table: AppendOnlyTableName;
  status: AppendOnlyIntegrityStatus;
  totalRows: number;
  checkedRows: number;
  verifiedRows: number;
  failedRows: number;
  failures: AppendOnlyIntegrityFailure[];
}

export interface AppendOnlyIntegrityScope {
  complete: boolean;
  perTableLimit: number | null;
  truncatedTables: Array<{
    table: AppendOnlyTableName;
    totalRows: number;
    checkedRows: number;
  }>;
}

export interface AppendOnlyIntegrityReport {
  ok: boolean;
  summary: {
    totalRows: number;
    checkedRows: number;
    verifiedRows: number;
    failedRows: number;
    verifiedTables: number;
    failedTables: number;
    emptyTables: number;
  };
  scope: AppendOnlyIntegrityScope;
  tables: AppendOnlyIntegrityTableReport[];
}

export interface VerifyAppendOnlyIntegrityOptions {
  secretKey?: string;
  perTableLimit?: number | null;
  totals?: Partial<Record<AppendOnlyTableName, number>>;
}

export interface VerifyPrismaAppendOnlyIntegrityOptions {
  limit?: number;
  secretKey?: string;
  batchSize?: number;
}

export interface AppendOnlyIntegrityInput {
  ledgerEntries: LedgerEntryIntegrityRow[];
  auditLogs: AuditLogIntegrityRow[];
  agentActionLogs: AgentActionLogIntegrityRow[];
}

interface AppendOnlyPrismaTable<Row> {
  count(): Promise<number>;
  findMany(args: {
    orderBy: Array<{ createdAt: 'asc' } | { id: 'asc' }>;
    skip?: number;
    take?: number;
    select: Record<string, boolean>;
  }): Promise<Row[]>;
}

export interface AppendOnlyIntegrityPrisma {
  ledgerEntry: AppendOnlyPrismaTable<LedgerEntryIntegrityRow>;
  auditLog: AppendOnlyPrismaTable<AuditLogIntegrityRow>;
  agentActionLog: AppendOnlyPrismaTable<AgentActionLogIntegrityRow>;
}

const LEDGER_SELECT = {
  id: true,
  type: true,
  amount: true,
  currency: true,
  reference: true,
  description: true,
  jobId: true,
  hmacChecksum: true,
  createdAt: true,
};

const AUDIT_SELECT = {
  id: true,
  userId: true,
  action: true,
  resource: true,
  resourceId: true,
  details: true,
  hmacChecksum: true,
  createdAt: true,
};

const AGENT_ACTION_SELECT = {
  id: true,
  jobId: true,
  agent: true,
  action: true,
  result: true,
  modelUsed: true,
  inputTokens: true,
  outputTokens: true,
  durationMs: true,
  hmacChecksum: true,
  createdAt: true,
};

const DEFAULT_PRISMA_VERIFY_BATCH_SIZE = 1000;

type HmacFields = Record<string, unknown>;

export interface LedgerEntryHmacInput {
  type: string;
  amount: number;
  currency: string;
  reference: string;
  description: string;
  jobId?: string | null;
  createdAt: Date | string;
}

export interface AuditLogHmacInput {
  userId?: string | null;
  action: string;
  resource: string;
  resourceId: string;
  details: unknown;
  userIdFallback?: string;
  serializedDetails?: string;
}

export interface AgentActionLogHmacInput {
  jobId: string;
  agent: string;
  action: string;
  result: unknown;
  modelUsed: string;
  inputTokens: number;
  outputTokens: number;
  durationMs: number;
  createdAt: Date | string;
}

export function ledgerEntryHmacFields(row: LedgerEntryHmacInput): HmacFields {
  return {
    type: row.type,
    amount: row.amount,
    currency: row.currency,
    reference: row.reference,
    description: row.description,
    jobId: row.jobId ?? null,
    createdAt: row.createdAt,
  };
}

export function auditLogHmacFields(row: AuditLogHmacInput): HmacFields {
  const base = {
    action: row.action,
    resource: row.resource,
    resourceId: row.resourceId,
    details: row.serializedDetails ?? JSON.stringify(row.details),
  };

  if (row.userId !== undefined && row.userId !== null) {
    return { userId: row.userId, ...base };
  }

  if (row.userIdFallback) {
    return { userId: row.userIdFallback, ...base };
  }

  return base;
}

export function agentActionLogHmacFields(row: AgentActionLogHmacInput): HmacFields {
  return {
    jobId: row.jobId,
    agent: row.agent,
    action: row.action,
    result: row.result,
    modelUsed: row.modelUsed,
    inputTokens: row.inputTokens,
    outputTokens: row.outputTokens,
    durationMs: row.durationMs,
    createdAt: row.createdAt,
  };
}

export function verifyAppendOnlyIntegrity(
  input: AppendOnlyIntegrityInput,
  options: VerifyAppendOnlyIntegrityOptions = {},
): AppendOnlyIntegrityReport {
  const secretKey = resolveHmacSecret(options.secretKey);
  const tables = [
    verifyTable(
      'ledger_entries',
      input.ledgerEntries,
      options.totals?.ledger_entries ?? input.ledgerEntries.length,
      ledgerHmacCandidates,
      secretKey,
    ),
    verifyTable(
      'audit_logs',
      input.auditLogs,
      options.totals?.audit_logs ?? input.auditLogs.length,
      auditHmacCandidates,
      secretKey,
    ),
    verifyTable(
      'agent_action_logs',
      input.agentActionLogs,
      options.totals?.agent_action_logs ?? input.agentActionLogs.length,
      agentActionHmacCandidates,
      secretKey,
    ),
  ];

  return buildIntegrityReport(tables, options.perTableLimit ?? null);
}

export async function verifyPrismaAppendOnlyIntegrity(
  prisma: AppendOnlyIntegrityPrisma,
  options: VerifyPrismaAppendOnlyIntegrityOptions = {},
): Promise<AppendOnlyIntegrityReport> {
  const secretKey = resolveHmacSecret(options.secretKey);
  const batchSize = Math.max(1, options.batchSize ?? DEFAULT_PRISMA_VERIFY_BATCH_SIZE);

  const tables = await Promise.all([
    verifyPrismaTable(
      'ledger_entries',
      prisma.ledgerEntry,
      LEDGER_SELECT,
      ledgerHmacCandidates,
      { limit: options.limit, secretKey, batchSize },
    ),
    verifyPrismaTable(
      'audit_logs',
      prisma.auditLog,
      AUDIT_SELECT,
      auditHmacCandidates,
      { limit: options.limit, secretKey, batchSize },
    ),
    verifyPrismaTable(
      'agent_action_logs',
      prisma.agentActionLog,
      AGENT_ACTION_SELECT,
      agentActionHmacCandidates,
      { limit: options.limit, secretKey, batchSize },
    ),
  ]);

  return buildIntegrityReport(tables, options.limit ?? null);
}

function buildIntegrityReport(
  tables: AppendOnlyIntegrityTableReport[],
  perTableLimit: number | null,
): AppendOnlyIntegrityReport {
  const summary = tables.reduce(
    (acc, table) => {
      acc.totalRows += table.totalRows;
      acc.checkedRows += table.checkedRows;
      acc.verifiedRows += table.verifiedRows;
      acc.failedRows += table.failedRows;
      if (table.status === 'verified') acc.verifiedTables += 1;
      if (table.status === 'failed') acc.failedTables += 1;
      if (table.status === 'empty') acc.emptyTables += 1;
      return acc;
    },
    {
      totalRows: 0,
      checkedRows: 0,
      verifiedRows: 0,
      failedRows: 0,
      verifiedTables: 0,
      failedTables: 0,
      emptyTables: 0,
    },
  );

  const truncatedTables = tables
    .filter((table) => table.checkedRows < table.totalRows)
    .map((table) => ({
      table: table.table,
      totalRows: table.totalRows,
      checkedRows: table.checkedRows,
    }));

  return {
    ok: summary.failedRows === 0 && truncatedTables.length === 0,
    summary,
    scope: {
      complete: truncatedTables.length === 0,
      perTableLimit,
      truncatedTables,
    },
    tables,
  };
}

async function verifyPrismaTable<
  Row extends { id: string; hmacChecksum: string | null; createdAt: Date | string },
>(
  table: AppendOnlyTableName,
  model: AppendOnlyPrismaTable<Row>,
  select: Record<string, boolean>,
  candidatesFor: (row: Row) => HmacFields[],
  options: { limit?: number; secretKey: string; batchSize: number },
): Promise<AppendOnlyIntegrityTableReport> {
  const totalRows = await model.count();
  const maxRows =
    options.limit === undefined ? totalRows : Math.min(totalRows, Math.max(0, options.limit));
  const failures: AppendOnlyIntegrityFailure[] = [];
  let checkedRows = 0;

  while (checkedRows < maxRows) {
    const take = Math.min(options.batchSize, maxRows - checkedRows);
    const rows = await model.findMany({
      orderBy: [{ createdAt: 'asc' }, { id: 'asc' }],
      skip: checkedRows,
      take,
      select,
    });

    if (rows.length === 0) {
      break;
    }

    failures.push(...collectTableFailures(table, rows, candidatesFor, options.secretKey));
    checkedRows += rows.length;

    if (rows.length < take) {
      break;
    }
  }

  return tableReport(table, totalRows, checkedRows, failures);
}

function verifyTable<Row extends { id: string; hmacChecksum: string | null; createdAt: Date | string }>(
  table: AppendOnlyTableName,
  rows: Row[],
  totalRows: number,
  candidatesFor: (row: Row) => HmacFields[],
  secretKey: string,
): AppendOnlyIntegrityTableReport {
  const failures = collectTableFailures(table, rows, candidatesFor, secretKey);

  return tableReport(table, totalRows, rows.length, failures);
}

function collectTableFailures<
  Row extends { id: string; hmacChecksum: string | null; createdAt: Date | string },
>(
  table: AppendOnlyTableName,
  rows: Row[],
  candidatesFor: (row: Row) => HmacFields[],
  secretKey: string,
): AppendOnlyIntegrityFailure[] {
  const failures: AppendOnlyIntegrityFailure[] = [];

  for (const row of rows) {
    if (!row.hmacChecksum) {
      failures.push({
        table,
        rowId: row.id,
        reason: 'hmac_missing',
        createdAt: formatCreatedAt(row.createdAt),
      });
      continue;
    }

    const verified = candidatesFor(row).some((fields) =>
      verifyRowHmac(fields, row.hmacChecksum!, secretKey),
    );

    if (!verified) {
      failures.push({
        table,
        rowId: row.id,
        reason: 'hmac_mismatch',
        createdAt: formatCreatedAt(row.createdAt),
      });
    }
  }

  return failures;
}

function tableReport(
  table: AppendOnlyTableName,
  totalRows: number,
  checkedRows: number,
  failures: AppendOnlyIntegrityFailure[],
): AppendOnlyIntegrityTableReport {
  const failedRows = failures.length;
  const verifiedRows = checkedRows - failedRows;

  return {
    table,
    status: failedRows > 0 ? 'failed' : checkedRows === 0 ? 'empty' : 'verified',
    totalRows,
    checkedRows,
    verifiedRows,
    failedRows,
    failures,
  };
}

function ledgerHmacCandidates(row: LedgerEntryIntegrityRow): HmacFields[] {
  return [ledgerEntryHmacFields(row)];
}

function auditHmacCandidates(row: AuditLogIntegrityRow): HmacFields[] {
  const serializedDetails = jsonStringCandidates(row.details);

  if (row.action === 'spam_complaint' && row.userId === null) {
    return serializedDetails.map((details) =>
      auditLogHmacFields({
        action: row.action,
        resource: row.resource,
        resourceId: row.resourceId,
        details: row.details,
        serializedDetails: details,
      }),
    );
  }

  if (row.userId) {
    return serializedDetails.map((details) =>
      auditLogHmacFields({
        userId: row.userId,
        action: row.action,
        resource: row.resource,
        resourceId: row.resourceId,
        details: row.details,
        serializedDetails: details,
      }),
    );
  }

  return ['system', 'anonymous'].flatMap((userIdFallback) =>
    serializedDetails.map((details) =>
      auditLogHmacFields({
        action: row.action,
        resource: row.resource,
        resourceId: row.resourceId,
        details: row.details,
        userIdFallback,
        serializedDetails: details,
      }),
    ),
  );
}

function agentActionHmacCandidates(
  row: AgentActionLogIntegrityRow,
): HmacFields[] {
  return [agentActionLogHmacFields(row)];
}

function resolveHmacSecret(secretKey?: string): string {
  const key = secretKey ?? process.env.HMAC_SECRET_KEY;
  if (!key) {
    throw new Error('HMAC_SECRET_KEY environment variable is required');
  }

  return key;
}

function jsonStringCandidates(value: unknown): string[] {
  const candidates = [
    JSON.stringify(value),
    stableJsonStringify(value),
  ].filter((candidate): candidate is string => typeof candidate === 'string');

  return [...new Set(candidates)];
}

function stableJsonStringify(value: unknown): string | undefined {
  return JSON.stringify(stableJsonValue(value));
}

function stableJsonValue(value: unknown): unknown {
  if (value === null || typeof value !== 'object') {
    return value;
  }

  if (value instanceof Date) {
    return value.toJSON();
  }

  if (Array.isArray(value)) {
    return value.map((item) => stableJsonValue(item));
  }

  const maybeJson = value as { toJSON?: () => unknown };
  if (typeof maybeJson.toJSON === 'function') {
    const jsonValue = maybeJson.toJSON();
    if (jsonValue !== value) {
      return stableJsonValue(jsonValue);
    }
  }

  const record = value as Record<string, unknown>;
  return Object.keys(record)
    .sort()
    .reduce<Record<string, unknown>>((acc, key) => {
      acc[key] = stableJsonValue(record[key]);
      return acc;
    }, {});
}

function formatCreatedAt(value: Date | string): string {
  return value instanceof Date ? value.toISOString() : value;
}
