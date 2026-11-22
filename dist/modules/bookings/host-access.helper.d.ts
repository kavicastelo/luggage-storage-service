export interface ResolvedHostAccess {
    locationId: string;
    businessId: string;
    actorRole: "SUPERADMIN" | "HOST_OWNER" | "HOST_STAFF";
}
/**
 * Verifies that an authenticated user is authorized to manage bookings or custody
 * at a specific storage location (SUPERADMIN, business owner, or active assigned staff).
 */
export declare function assertHostLocationAccess(txOrDb: any, userId: string, userRoles: string[], locationId: string): Promise<ResolvedHostAccess>;
/**
 * Resolves the exact list of storage location IDs accessible to a host owner or staff user.
 */
export declare function getAccessibleHostLocationIds(userId: string, userRoles: string[], businessIdFilter?: string): Promise<string[]>;
//# sourceMappingURL=host-access.helper.d.ts.map