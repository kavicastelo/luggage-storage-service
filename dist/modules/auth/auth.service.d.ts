import { RegisterRequest, RegisterResponseData, LoginRequest, AuthenticatedUser, UserStatus, VerifyEmailRequest, VerifyEmailResponseData, ResendVerificationRequest, ResendVerificationResponseData } from "@luggage-storage/contracts";
import { schema } from "../../infrastructure/database/drizzle.js";
export interface ClientConnectionInfo {
    ip?: string;
    userAgent?: string;
    correlationId?: string;
}
export interface LoginServiceResult {
    user: AuthenticatedUser;
    session: typeof schema.authSessions.$inferSelect;
    rawRefreshToken: string;
}
export declare function isValidAccountStateTransition(fromStatus: UserStatus, toStatus: UserStatus): boolean;
export declare class AuthService {
    /**
     * Registers a new user account with default TRAVELLER role assignment and issues
     * a single-use SHA-256 hashed email verification token (24h TTL).
     */
    register(input: RegisterRequest, clientInfo?: ClientConnectionInfo): Promise<RegisterResponseData>;
    /**
     * Authenticates a user with email and password.
     * Rejects PENDING_VERIFICATION / unverified accounts, SUSPENDED accounts, and DEACTIVATED accounts.
     */
    login(input: LoginRequest, clientInfo?: ClientConnectionInfo): Promise<LoginServiceResult>;
    /**
     * Verifies a user's email address using a single-use SHA-256 hashed token,
     * transitioning PENDING_VERIFICATION -> ACTIVE atomically under row-level lock.
     */
    verifyEmail(input: VerifyEmailRequest, clientInfo?: ClientConnectionInfo): Promise<VerifyEmailResponseData>;
    /**
     * Resends a verification email for an unverified account (rate-limited and enumeration-safe).
     */
    resendVerificationEmail(input: ResendVerificationRequest, clientInfo?: ClientConnectionInfo): Promise<ResendVerificationResponseData>;
    /**
     * Retrieves current authenticated user details with active roles.
     * Ensures account is still active and email-verified.
     */
    getCurrentUser(userId: string): Promise<AuthenticatedUser>;
}
export declare const authService: AuthService;
//# sourceMappingURL=auth.service.d.ts.map