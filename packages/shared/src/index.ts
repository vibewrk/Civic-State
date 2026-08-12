// Database
export { prisma } from './db.js';

// Encryption
export { CryptoService, createCryptoService } from './crypto.js';
export type { EncryptedPayload } from './crypto.js';

// HMAC tamper detection
export { computeRowHmac, verifyRowHmac } from './hmac.js';
export {
  agentActionLogHmacFields,
  auditLogHmacFields,
  ledgerEntryHmacFields,
  verifyAppendOnlyIntegrity,
  verifyPrismaAppendOnlyIntegrity,
} from './append-only-integrity.js';
export type {
  AgentActionLogIntegrityRow,
  AgentActionLogHmacInput,
  AppendOnlyIntegrityFailure,
  AppendOnlyIntegrityReport,
  AppendOnlyIntegrityTableReport,
  AppendOnlyTableName,
  AuditLogIntegrityRow,
  AuditLogHmacInput,
  LedgerEntryIntegrityRow,
  LedgerEntryHmacInput,
} from './append-only-integrity.js';

// Types
export * from './types/index.js';

// Validators
export * from './validators/index.js';
