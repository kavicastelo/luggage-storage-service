import { AdminUserQuery, AdminUserSummary, AdminUserDetail, AdminSuspendUserRequest, AdminReinstateUserRequest, AdminDeactivateUserRequest, AdminReactivateUserRequest, AdminVerifyEmailRequest, AdminLifecycleActionResponseData } from "@luggage-storage/contracts";
export interface AdminActionContext {
    adminId: string;
    adminRoles: string[];
    targetUserId: string;
    clientInfo?: {
        ip?: string;
        userAgent?: string;
        correlationId?: string;
    };
}
export declare class AdminService {
    /**
     * Retrieves a paginated list of users with optional filtering by status, role, or search text.
     */
    listUsers(query: AdminUserQuery): Promise<{
        users: AdminUserSummary[];
        total: number;
    }>;
    /**
     * Retrieves comprehensive inspection details for a specific user,
     * including profiles and active session counts. Never discloses password hashes.
     */
    getUserById(userId: string): Promise<AdminUserDetail>;
    /**
     * Suspends a user account.
     *
     * Security & Integrity guarantees:
     * 1. Self-action defense: Administrators cannot suspend their own account.
     * 2. Privilege boundary: Support staff cannot suspend Superadmin accounts.
     * 3. State transition: Only ACTIVE or PENDING_VERIFICATION accounts can be suspended.
     * 4. Session invalidation: Atomically revokes all active authentication sessions.
     * 5. Immutability: Emits append-only AUTH_ACCOUNT_SUSPENDED audit event.
     */
    suspendUser(context: AdminActionContext, input: AdminSuspendUserRequest): Promise<AdminLifecycleActionResponseData>;
    /**
     * Reinstates a suspended user account back to ACTIVE.
     *
     * Security & Integrity guarantees:
     * 1. Self-action defense: Administrators cannot perform lifecycle operations on their own account.
     * 2. State transition: Only accounts in SUSPENDED state can be reinstated.
     * 3. Session security: Previously revoked sessions remain revoked; user must re-authenticate.
     * 4. Immutability: Emits append-only AUTH_ACCOUNT_REINSTATED audit event.
     */
    reinstateUser(context: AdminActionContext, input: AdminReinstateUserRequest): Promise<AdminLifecycleActionResponseData>;
    /**
     * Deactivates a user account.
     *
     * Security & Integrity guarantees:
     * 1. Self-action defense: Administrators cannot deactivate their own account.
     * 2. Privilege boundary: Support staff cannot deactivate Superadmin accounts.
     * 3. State transition: Only accounts that are not already DEACTIVATED can be deactivated.
     * 4. Session invalidation: Atomically revokes all active sessions.
     * 5. Immutability: Emits append-only AUTH_ACCOUNT_DEACTIVATED audit event.
     */
    deactivateUser(context: AdminActionContext, input: AdminDeactivateUserRequest): Promise<AdminLifecycleActionResponseData>;
    /**
     * Reactivates a deactivated user account back to ACTIVE.
     *
     * Security & Integrity guarantees:
     * 1. Self-action defense: Administrators cannot perform lifecycle operations on their own account.
     * 2. State transition: Only accounts in DEACTIVATED state can be reactivated.
     * 3. Session security: Previously revoked sessions remain revoked; user must re-authenticate.
     * 4. Immutability: Emits append-only AUTH_ACCOUNT_REACTIVATED audit event.
     */
    reactivateUser(context: AdminActionContext, input: AdminReactivateUserRequest): Promise<AdminLifecycleActionResponseData>;
    /**
     * Overrides and verifies a user's email address by administrative action.
     * Automatically transitions PENDING_VERIFICATION accounts to ACTIVE.
     */
    verifyUserEmail(context: AdminActionContext, input: AdminVerifyEmailRequest): Promise<AdminLifecycleActionResponseData>;
    /**
     * Helper to retrieve target user record and active roles.
     */
    private getTargetUserWithRoles;
}
export declare const adminService: AdminService;
//# sourceMappingURL=admin.service.d.ts.map