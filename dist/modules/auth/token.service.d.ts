export declare class TokenService {
    /**
     * Generates a 256-bit cryptographically secure random refresh token.
     * Returns the raw token string (hex format) and its SHA-256 verifier hash.
     */
    generateRefreshToken(): {
        rawToken: string;
        tokenHash: string;
    };
    /**
     * Computes the SHA-256 hash of a raw token string.
     */
    hashToken(rawToken: string): string;
    /**
     * Compares two token hashes in constant time to prevent timing attacks.
     */
    compareTokenHashes(hashA: string, hashB: string): boolean;
    /**
     * Calculates the expiration timestamp for a new refresh session.
     */
    calculateRefreshExpiry(ttlDays?: number): Date;
}
export declare const tokenService: TokenService;
//# sourceMappingURL=token.service.d.ts.map