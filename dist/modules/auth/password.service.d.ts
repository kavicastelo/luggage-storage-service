import { ChangePasswordRequest, ChangePasswordResponseData, ForgotPasswordRequest, ForgotPasswordResponseData, ResetPasswordRequest, ResetPasswordResponseData } from "@luggage-storage/contracts";
export interface ClientConnectionInfo {
    ip?: string;
    userAgent?: string;
    correlationId?: string;
}
export declare class PasswordService {
    /**
     * Clears PostgreSQL-backed rate limits (useful for test isolation).
     */
    clearRateLimits(): Promise<void>;
    /**
     * Rate limits password reset requests using PostgreSQL-backed rate limiting (REM-B03/REM-B04).
     * Window: 15 minutes, Max: 5 requests per normalized email.
     */
    private checkRateLimit;
    /**
     * Authenticated password change.
     *
     * Security guarantees:
     * 1. Requires authenticated active user.
     * 2. Verifies current password against stored Argon2id hash.
     * 3. Enforces new password policy and rejects if equal to current password.
     * 4. Hashes new password with Argon2id (OWASP configuration).
     * 5. Atomically updates password and revokes all OTHER active sessions for this user.
     * 6. Preserves the caller's current session.
     * 7. Records immutable security audit events (never logging passwords).
     */
    changePassword(params: {
        userId: string;
        currentSessionId: string;
        input: ChangePasswordRequest;
        clientInfo?: ClientConnectionInfo;
    }): Promise<ChangePasswordResponseData>;
    /**
     * Password recovery request (forgot password).
     *
     * Security guarantees:
     * 1. Strictly enumeration-resistant: returns identical public message whether account exists or not.
     * 2. Runs dummy Argon2id verification for non-existent accounts to equalize response latency.
     * 3. Suspended/deactivated accounts do not receive tokens, but return identical public response.
     * 4. Generates 256-bit cryptographically random token (`crypto.randomBytes(32)`).
     * 5. Stores only SHA-256 verifier hash in `password_reset_tokens`. Never logs raw token.
     * 6. Invalidates all previous unused tokens for the user.
     * 7. Enforces strict 1-hour expiration.
     * 8. Dispatches via provider-independent email boundary respecting OQ-019.
     */
    requestPasswordReset(params: {
        input: ForgotPasswordRequest;
        clientInfo?: ClientConnectionInfo;
    }): Promise<ForgotPasswordResponseData>;
    /**
     * Password reset execution.
     *
     * Security guarantees:
     * 1. Looks up token by SHA-256 hash under row-level lock (FOR UPDATE).
     * 2. Prevents concurrent reuse / race condition double-spends.
     * 3. Strictly verifies token is unconsumed (`used_at IS NULL`) and not expired.
     * 4. Updates password hash with Argon2id.
     * 5. Atomically consumes token (`used_at = NOW()`).
     * 6. Supersedes any other outstanding recovery tokens for this user.
     * 7. Revokes ALL active sessions for this user across all devices.
     * 8. Records immutable audit event.
     */
    resetPassword(params: {
        input: ResetPasswordRequest;
        clientInfo?: ClientConnectionInfo;
    }): Promise<ResetPasswordResponseData>;
}
export declare const passwordService: PasswordService;
//# sourceMappingURL=password.service.d.ts.map