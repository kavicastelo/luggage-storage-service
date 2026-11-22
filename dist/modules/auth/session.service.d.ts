import { ClientType, SessionInfo } from "@luggage-storage/contracts";
import { schema } from "../../infrastructure/database/drizzle.js";
export interface SessionClientInfo {
    ipAddress?: string;
    userAgent?: string;
    correlationId?: string;
}
export declare class SessionService {
    /**
     * Creates a new persistent authentication session in auth_sessions.
     * Generates a 256-bit cryptographically random refresh token, stores its SHA-256
     * verifier hash, and returns the raw refresh token to be delivered to the client.
     */
    createSession(params: {
        userId: string;
        clientType?: ClientType;
        ipAddress?: string;
        userAgent?: string;
    }): Promise<{
        session: typeof schema.authSessions.$inferSelect;
        rawRefreshToken: string;
    }>;
    /**
     * Rotates a refresh token in a serialized database transaction with row-level locking.
     *
     * Security guarantees:
     * 1. Atomically locks the target session row (SELECT ... FOR UPDATE).
     * 2. If the current refresh_token_hash matches:
     *    - Verifies session is not revoked and not expired.
     *    - Verifies the user is active (not suspended/deactivated).
     *    - Rotates the token: generates new raw token, stores new hash in refresh_token_hash,
     *      and retains the consumed hash in previous_token_hash.
     *    - Updates last_active_at.
     * 3. If previous_token_hash matches:
     *    - REUSE ATTACK DETECTED!
     *    - Immediately revokes all active sessions for this user family.
     *    - Records an AUTH_TOKEN_REUSE_DETECTED audit event.
     *    - Rejects with generic 401 Unauthorized.
     * 4. Concurrent requests: Only the first request rotates the token; losing concurrent
     *    requests see the token in previous_token_hash and trigger reuse protection.
     */
    rotateRefreshToken(params: {
        rawRefreshToken: string;
        clientInfo?: SessionClientInfo;
    }): Promise<{
        session: typeof schema.authSessions.$inferSelect;
        newRawRefreshToken: string;
        user: {
            id: string;
            email: string;
            displayName: string;
            status: string;
            isEmailVerified: boolean;
            isPhoneVerified: boolean;
            roles: string[];
        };
    }>;
    /**
     * Logs out the current session by setting revoked_at and revocation_reason = 'USER_LOGOUT'.
     * Handles logout idempotently.
     */
    logout(params: {
        rawRefreshToken?: string;
        sessionId?: string;
        clientInfo?: SessionClientInfo;
    }): Promise<void>;
    /**
     * Logs out all sessions for the given user (e.g. "Logout from all devices").
     */
    logoutAll(userId: string, clientInfo?: SessionClientInfo): Promise<number>;
    /**
     * Returns all active, unrevoked, unexpired sessions for a user.
     */
    getUserSessions(userId: string, currentSessionId?: string): Promise<SessionInfo[]>;
    /**
     * Revokes a specific session belonging to the user.
     */
    revokeUserSession(userId: string, sessionId: string, clientInfo?: SessionClientInfo): Promise<void>;
    /**
     * Verifies that a session ID is currently active (unrevoked and unexpired).
     */
    isSessionActive(sessionId: string): Promise<boolean>;
}
export declare const sessionService: SessionService;
//# sourceMappingURL=session.service.d.ts.map