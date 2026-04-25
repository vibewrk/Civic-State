import { createCipheriv, createDecipheriv, randomBytes } from 'node:crypto';

/**
 * Encrypted payload structure for Tier 1 field encryption.
 * Stored as JSON in the database alongside the encrypted field.
 */
export interface EncryptedPayload {
  /** Base64-encoded ciphertext */
  ciphertext: string;
  /** Base64-encoded 96-bit IV (unique per encryption) */
  iv: string;
  /** Base64-encoded 128-bit GCM authentication tag */
  tag: string;
  /** Key version used for encryption (enables key rotation) */
  keyVersion: number;
}

/**
 * AES-256-GCM encryption service with key versioning and rotation capability.
 *
 * SECURITY NOTES:
 * - Every encrypt() call generates a fresh 96-bit IV via randomBytes(12) per NIST SP 800-38D
 * - IV is NEVER accepted as input to prevent reuse
 * - Key versioning allows seamless rotation: new encryptions use latest key,
 *   old ciphertexts decrypt with their original key version
 * - GCM authentication tag provides integrity verification (AEAD)
 */
export class CryptoService {
  private keys: Map<number, Buffer>;
  private currentVersion: number;

  /**
   * @param keyConfig Array of versioned keys. Each key must be a hex-encoded 32-byte (256-bit) AES key.
   * @throws {Error} If no keys are provided or any key is not 32 bytes when decoded.
   */
  constructor(keyConfig: { version: number; key: string }[]) {
    if (keyConfig.length === 0) {
      throw new Error('CryptoService requires at least one key');
    }

    this.keys = new Map();
    for (const { version, key } of keyConfig) {
      const keyBuffer = Buffer.from(key, 'hex');
      if (keyBuffer.length !== 32) {
        throw new Error(
          `Key version ${version} must be exactly 32 bytes (256 bits), got ${keyBuffer.length} bytes`,
        );
      }
      this.keys.set(version, keyBuffer);
    }
    this.currentVersion = Math.max(...this.keys.keys());
  }

  /**
   * Encrypt a plaintext string using AES-256-GCM.
   * Generates a fresh random 96-bit IV for every call.
   */
  encrypt(plaintext: string): EncryptedPayload {
    const key = this.keys.get(this.currentVersion)!;
    const iv = randomBytes(12); // 96-bit nonce for GCM -- NEVER reuse
    const cipher = createCipheriv('aes-256-gcm', key, iv);
    const encrypted = Buffer.concat([
      cipher.update(plaintext, 'utf8'),
      cipher.final(),
    ]);
    return {
      ciphertext: encrypted.toString('base64'),
      iv: iv.toString('base64'),
      tag: cipher.getAuthTag().toString('base64'),
      keyVersion: this.currentVersion,
    };
  }

  /**
   * Decrypt an encrypted payload back to plaintext.
   * Looks up the key by the payload's keyVersion to support rotation.
   *
   * @throws {Error} If key version is unknown or authentication tag verification fails
   */
  decrypt(payload: EncryptedPayload): string {
    const key = this.keys.get(payload.keyVersion);
    if (!key) {
      throw new Error(`Unknown key version: ${payload.keyVersion}`);
    }
    const decipher = createDecipheriv(
      'aes-256-gcm',
      key,
      Buffer.from(payload.iv, 'base64'),
    );
    decipher.setAuthTag(Buffer.from(payload.tag, 'base64'));
    return Buffer.concat([
      decipher.update(Buffer.from(payload.ciphertext, 'base64')),
      decipher.final(),
    ]).toString('utf8');
  }
}

/**
 * Factory function to create a CryptoService from environment variables.
 *
 * Required env vars:
 * - ENCRYPTION_KEY: hex-encoded 32-byte AES-256 key
 * - ENCRYPTION_KEY_VERSION: integer key version (default: 1)
 *
 * For key rotation, add ENCRYPTION_KEY_V{N} and ENCRYPTION_KEY_V{N}_VERSION env vars.
 * The highest version becomes the current encryption key.
 */
export function createCryptoService(): CryptoService {
  const primaryKey = process.env.ENCRYPTION_KEY;
  if (!primaryKey) {
    throw new Error('ENCRYPTION_KEY environment variable is required');
  }

  const primaryVersion = parseInt(process.env.ENCRYPTION_KEY_VERSION ?? '1', 10);
  const keyConfig: { version: number; key: string }[] = [
    { version: primaryVersion, key: primaryKey },
  ];

  // Support additional rotated keys: ENCRYPTION_KEY_V2, ENCRYPTION_KEY_V3, etc.
  for (let v = 1; v <= 100; v++) {
    const rotatedKey = process.env[`ENCRYPTION_KEY_V${v}`];
    if (rotatedKey && v !== primaryVersion) {
      keyConfig.push({ version: v, key: rotatedKey });
    }
  }

  return new CryptoService(keyConfig);
}
