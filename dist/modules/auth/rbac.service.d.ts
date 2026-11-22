import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { Permission, RoleDetail } from "@luggage-storage/contracts";
import { schema } from "../../infrastructure/database/drizzle.js";
export interface RoleManagementContext {
    adminId: string;
    adminRoles: string[];
    targetUserId: string;
    roleCode: string;
    clientInfo?: {
        ip?: string;
        userAgent?: string;
        correlationId?: string;
    };
}
/**
 * Concurrency-safe database check ensuring removing or disabling `excludedUserId`
 * will not leave zero ACTIVE SUPERADMIN accounts on the platform.
 */
export declare function assertAnotherActiveSuperadminRemains(tx: any, excludedUserId: string): Promise<string[]>;
export declare class RbacService {
    private migratorDbInstance;
    private migratorPoolInstance;
    getMigratorDb(): NodePgDatabase<typeof schema>;
    /**
     * Resolves all effective permissions for a user across all assigned roles.
     * Inactive, suspended, or deactivated accounts return an empty permission set.
     * Real-time PostgreSQL evaluation ensures zero stale cache window.
     */
    getEffectivePermissions(userId: string): Promise<string[]>;
    /**
     * Evaluates whether a user possesses a specific permission.
     */
    hasPermission(userId: string, permission: string): Promise<boolean>;
    /**
     * Evaluates whether a user possesses at least one of the specified permissions.
     */
    hasAnyPermission(userId: string, permissions: string[]): Promise<boolean>;
    /**
     * Evaluates whether a user possesses all of the specified permissions.
     */
    hasAllPermissions(userId: string, permissions: string[]): Promise<boolean>;
    /**
     * Retrieves all assigned role codes for a user.
     */
    getUserRoles(userId: string): Promise<string[]>;
    /**
     * Lists all available permissions in the permission catalogue.
     */
    listPermissions(): Promise<Permission[]>;
    /**
     * Lists all system roles and their assigned permissions.
     */
    listRoles(): Promise<RoleDetail[]>;
    /**
     * Assigns a role to a user account.
     *
     * Security & Integrity guarantees:
     * 1. Self-action defense: Administrators cannot modify their own roles.
     * 2. Privilege boundary: Only Superadmins can assign SUPERADMIN or SUPPORT roles.
     * 3. Target verification: User must exist and cannot be deactivated.
     * 4. Controlled execution: Employs SECURITY DEFINER function assign_user_role().
     * 5. Immutable audit: Emits AUTH_ROLE_ASSIGNED event.
     */
    assignRole(context: RoleManagementContext): Promise<string[]>;
    /**
     * Revokes an assigned role from a user account.
     *
     * Security & Integrity guarantees:
     * 1. Self-action defense: Administrators cannot revoke roles from their own account.
     * 2. Privilege boundary: Only Superadmins can revoke the SUPERADMIN role.
     * 3. Invariant check: User must retain at least one role.
     * 4. Controlled execution: Employs SECURITY DEFINER function revoke_user_role().
     * 5. Immutable audit: Emits AUTH_ROLE_REVOKED event.
     */
    revokeRole(context: RoleManagementContext): Promise<string[]>;
    /**
     * Idempotently seeds and self-heals all catalogue permissions and default role-permission mappings.
     * Can be safely executed on server boot, seeding, or migration recovery.
     */
    ensureDefaultRolePermissions(targetDb?: any): Promise<{
        permissionsCount: number;
        mappingsCount: number;
    }>;
    /**
     * Assigns a specific permission code to a system role.
     */
    assignPermissionToRole(adminId: string, roleCode: string, permissionCode: string, clientInfo?: {
        ip?: string;
        userAgent?: string;
        correlationId?: string;
    }): Promise<string[]>;
    /**
     * Revokes a specific permission code from a system role.
     */
    revokePermissionFromRole(adminId: string, roleCode: string, permissionCode: string, clientInfo?: {
        ip?: string;
        userAgent?: string;
        correlationId?: string;
    }): Promise<string[]>;
    /**
     * Resets all system roles to the standard recommended permission matrix.
     */
    resetRolePermissionsToDefault(adminId: string, clientInfo?: {
        ip?: string;
        userAgent?: string;
        correlationId?: string;
    }): Promise<RoleDetail[]>;
}
export declare const rbacService: RbacService;
//# sourceMappingURL=rbac.service.d.ts.map