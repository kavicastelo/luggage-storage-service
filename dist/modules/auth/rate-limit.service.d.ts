export type RateLimitScope = "auth_login_email" | "auth_login_ip" | "auth_register_email" | "auth_register_ip" | "auth_recovery_email" | "auth_recovery_ip" | "auth_verify_resend_email" | "auth_verify_resend_ip" | "custody_verify_actor" | "custody_verify_booking" | "booking_create_user" | "payment_webhook_ip" | "support_ticket_ip" | "support_ticket_email";
export interface RateLimitPolicy {
    maxPoints: number;
    windowSeconds: number;
}
/**
 * Single authoritative configuration for rate-limit policies (AUD-004):
 * - Login by IP: 20 per 15 minutes (900s)
 * - Login by normalized email: 5 per 15 minutes (900s)
 * - Registration by IP: 10 per 15 minutes (900s)
 * - Registration by normalized email: 5 per 1 hour (3600s)
 * - Verification resend by IP: 10 per 15 minutes (900s)
 * - Verification resend by email: 3 per 15 minutes (900s)
 * - Password recovery by IP: 10 per 15 minutes (900s)
 * - Password recovery by email: 3 per 15 minutes (900s)
 */
export declare const RATE_LIMIT_POLICIES: Record<RateLimitScope, RateLimitPolicy>;
export interface RateLimitConsumeParams {
    scope: RateLimitScope;
    identifier: string;
    maxPoints?: number;
    windowSeconds?: number;
    message?: string;
    clientInfo?: {
        ip?: string;
        userAgent?: string;
        correlationId?: string;
    };
}
export interface RateLimitConsumeResult {
    allowed: boolean;
    points: number;
    remaining: number;
    retryAfterSeconds: number;
}
export declare class RateLimitService {
    /**
     * Computes a keyed HMAC-SHA-256 digest of (version + scope + normalized identifier)
     * using RATE_LIMIT_HASH_SECRET so raw emails and IP addresses are never stored
     * in the rate limit table and are protected against offline dictionary rainbow tables (AUD-004).
     */
    hashKey(scope: RateLimitScope, identifier: string, secretOverride?: string): string;
    getPolicy(scope: RateLimitScope): RateLimitPolicy;
    /**
     * Atomically increments the rate-limit counter in PostgreSQL and returns whether the request is allowed.
     */
    consume(params: RateLimitConsumeParams): Promise<RateLimitConsumeResult>;
    /**
     * Consumes a point and throws 429 RATE_LIMITED (with Retry-After seconds) if the threshold is exceeded.
     */
    enforce(params: RateLimitConsumeParams): Promise<RateLimitConsumeResult>;
    /**
     * Resets a specific rate-limit bucket (e.g. clearing failed login counter upon successful login).
     */
    resetKey(scope: RateLimitScope, identifier: string): Promise<void>;
    /**
     * Clears all rate limit buckets (used for deterministic test isolation).
     */
    clearAll(): Promise<void>;
}
export declare const rateLimitService: RateLimitService;
//# sourceMappingURL=rate-limit.service.d.ts.map