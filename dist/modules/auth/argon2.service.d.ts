/**
 * OWASP-compliant password hashing engine using Argon2id.
 *
 * Algorithm parameters:
 * - Variant: Argon2id (hybrid data-dependent / data-independent memory access)
 * - Memory Cost: 65,536 KiB (64 MiB)
 * - Time Cost: 3 iterations
 * - Parallelism: 4 threads
 */
export declare class Argon2Service {
    private readonly memoryCost;
    private readonly timeCost;
    private readonly parallelism;
    /**
     * Precomputed valid Argon2id hash for unknown account timing-attack mitigation.
     * Parameterized identically (m=65536, t=3, p=4) so that verify takes identical CPU time.
     */
    private readonly dummyHash;
    constructor(memoryCost?: number, timeCost?: number, parallelism?: number);
    /**
     * Hashes a plaintext password using Argon2id.
     * Plaintext passwords are never logged or persisted.
     */
    hashPassword(password: string): Promise<string>;
    /**
     * Verifies a plaintext password against an Argon2 hash.
     * Returns true if valid, false otherwise. Never throws on mismatch.
     */
    verifyPassword(hash: string, plain: string): Promise<boolean>;
    /**
     * Performs a dummy verification against an unknown account to equalize response
     * latency and eliminate user enumeration timing attacks.
     */
    verifyDummy(plain: string): Promise<boolean>;
    getParameters(): {
        algorithm: string;
        version: number;
        memoryCost: number;
        timeCost: number;
        parallelism: number;
    };
}
export declare const argon2Service: Argon2Service;
//# sourceMappingURL=argon2.service.d.ts.map