import { createHmac, timingSafeEqual } from 'node:crypto';

/**
 * Compute an HMAC-SHA256 checksum for a set of record fields.
 *
 * Used on append-only tables (LedgerEntry, AuditLog, AgentActionLog) to detect tampering.
 * Top-level fields are sorted deterministically. Nested values intentionally keep
 * JSON.stringify semantics so existing append-only rows remain verifiable.
 *
 * @param fields Record fields to checksum (exclude the hmacChecksum field itself)
 * @param secretKey HMAC secret key (defaults to HMAC_SECRET_KEY env var)
 * @returns Hex-encoded HMAC-SHA256 digest
 * @throws {Error} If no HMAC secret key is available
 */
export function computeRowHmac(
  fields: Record<string, unknown>,
  secretKey?: string,
): string {
  const key = secretKey ?? process.env.HMAC_SECRET_KEY;
  if (!key) {
    throw new Error('HMAC_SECRET_KEY environment variable is required');
  }

  const sorted = Object.keys(fields).sort();
  const payload = sorted
    .map((k) => `${k}:${JSON.stringify(fields[k])}`)
    .join('|');

  return createHmac('sha256', key).update(payload).digest('hex');
}

/**
 * Verify an HMAC checksum against a set of record fields using constant-time comparison.
 *
 * Uses crypto.timingSafeEqual to prevent timing side-channel attacks that could
 * allow an attacker to determine how many bytes of the HMAC match.
 *
 * @param fields Record fields to verify (exclude the hmacChecksum field itself)
 * @param expectedHmac The stored HMAC checksum to verify against
 * @param secretKey HMAC secret key (defaults to HMAC_SECRET_KEY env var)
 * @returns true if the HMAC matches, false otherwise
 */
export function verifyRowHmac(
  fields: Record<string, unknown>,
  expectedHmac: string,
  secretKey?: string,
): boolean {
  const computed = computeRowHmac(fields, secretKey);

  // Constant-time comparison to prevent timing attacks
  if (computed.length !== expectedHmac.length) {
    return false;
  }

  return timingSafeEqual(
    Buffer.from(computed, 'utf8'),
    Buffer.from(expectedHmac, 'utf8'),
  );
}
