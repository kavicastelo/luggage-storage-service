export type DatabaseIdentityAction = "ASSIGN_ROLE" | "REVOKE_ROLE" | "SELF_ASSIGN_HOST_OWNER" | "ASSIGN_HOST_STAFF_ROLE" | "REVOKE_HOST_STAFF_ROLE";
export declare const DB_IDENTITY_KEY_ID_PATTERN: RegExp;
export declare const DB_IDENTITY_SIGNATURE_HEX_PATTERN: RegExp;
export interface DatabaseIdentityAssertionInput {
    actorId: string;
    action: DatabaseIdentityAction;
    targetId: string;
    roleCode?: string | null;
    ttlSeconds?: number;
    keyId?: string;
    secretOverride?: string;
}
export interface DatabaseIdentityAssertion {
    keyId: string;
    actorId: string;
    action: DatabaseIdentityAction;
    targetId: string;
    roleCode: string | null;
    expiresAt: number;
    nonce: string;
    signature: string;
}
/**
 * Builds the canonical payload string to sign and verify.
 * Format: keyId:actorId:action:targetId:roleCode:expiresAt:nonce
 */
export declare function buildIdentityAssertionPayload(keyId: string, actorId: string, action: string, targetId: string, roleCode: string | null | undefined, expiresAt: number, nonce: string): string;
/**
 * Creates a cryptographically signed database identity assertion.
 * The assertion binds the active signing key ID, authenticated actor identity,
 * authorized action, target resource, role code, expiration timestamp, and a
 * single-use cryptographic nonce.
 *
 * PostgreSQL verifies this assertion via HMAC-SHA256 (pgcrypto) against the declared
 * key_id in public.trusted_auth_secrets (inaccessible to runtime role luggage_user).
 * Note: In PostgreSQL PL/pgSQL, verify_identity_assertion performs a fixed-length
 * (32-byte), fixed-iteration byte comparison without early exit, avoiding SQL bytea
 * `<>` short-circuiting, though PL/pgSQL does not provide formal hardware/compiler
 * constant-time execution guarantees.
 */
export declare function createDatabaseIdentityAssertion(input: DatabaseIdentityAssertionInput): DatabaseIdentityAssertion;
/**
 * Verifies a database identity assertion in Node.js (for server-side sanity/testing).
 * Uses Node.js crypto.timingSafeEqual after validating strict 64-character hex encoding.
 */
export declare function verifyDatabaseIdentityAssertion(assertion: DatabaseIdentityAssertion, expectedAction: DatabaseIdentityAction, expectedTargetId: string, expectedRoleCode?: string | null, secretOverride?: string, expectedKeyId?: string): {
    valid: boolean;
    reason?: string;
};
//# sourceMappingURL=database-identity.d.ts.map