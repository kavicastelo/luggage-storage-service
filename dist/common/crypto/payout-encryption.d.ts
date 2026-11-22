/**
 * Resets the derived key cache (used during testing and key rotation verification).
 */
export declare function resetPayoutKeyCacheForTesting(): void;
/**
 * Encrypts sensitive bank account numbers at rest using AES-256-GCM.
 * Safe to call repeatedly: if value is already encrypted, returns as-is.
 */
export declare function encryptPayoutAccountNumber(rawOrEncrypted: string | null | undefined): string | null;
/**
 * Decrypts AES-256-GCM encrypted bank account numbers.
 * Backwards-compatible: if the value does not have the enc:v1: prefix, returns it as-is.
 * Supports zero-downtime key rotation: if decryption with the primary key fails,
 * attempts fallback to PAYOUT_ENCRYPTION_KEY_PREVIOUS if configured.
 */
export declare function decryptPayoutAccountNumber(encryptedOrPlain: string | null | undefined): string | null;
/**
 * Re-encrypts an existing encrypted payout account number using the current primary key.
 * Used during batch key rotation to migrate historical records.
 */
export declare function reencryptPayoutAccountNumber(encryptedValue: string | null | undefined): {
    reencrypted: string | null;
    neededRotation: boolean;
};
/**
 * Masks sensitive bank account numbers for normal API responses and UI displays.
 * e.g. "1234567890" -> "••••••••7890"
 */
export declare function maskPayoutAccountNumber(accountNumber: string | null | undefined): string | null;
//# sourceMappingURL=payout-encryption.d.ts.map