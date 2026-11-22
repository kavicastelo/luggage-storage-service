export declare const CUSTODY_HASH_VERSION: "hmac-sha256-v2";
export declare const LEGACY_CUSTODY_HASH_VERSION: "sha256-legacy-v1";
export type CustodyCredentialPurpose = "CUSTODY_QR" | "CUSTODY_PIN";
export type CustodyOperationKind = "CHECK_IN" | "COLLECTION";
/**
 * Computes a domain-separated keyed HMAC-SHA256 hex digest for custody QR tokens or 6-digit PINs.
 * Never embeds or falls back to any default secret.
 */
export declare function computeCustodyCredentialHmac(params: {
    purpose: CustodyCredentialPurpose;
    bookingId: string;
    operation: CustodyOperationKind;
    credential: string;
    secretOverride?: string;
}): string;
/**
 * Verifies a candidate custody QR token or 6-digit PIN against a stored HMAC-SHA256 hex digest
 * using strict fixed-length 32-byte buffer decoding and crypto.timingSafeEqual.
 */
export declare function verifyCustodyCredentialHmac(params: {
    purpose: CustodyCredentialPurpose;
    bookingId: string;
    operation: CustodyOperationKind;
    candidateCredential: string;
    storedDigestHex: string;
    secretOverride?: string;
}): boolean;
//# sourceMappingURL=custody-hmac.d.ts.map