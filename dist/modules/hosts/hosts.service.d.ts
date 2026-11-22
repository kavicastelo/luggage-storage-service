import { CreateHostBusinessRequest, UpdateHostBusinessRequest, SubmitHostVerificationRequest, AddHostStaffRequest, UpdateHostStaffRequest, HostBusiness, HostVerification, HostStaffMemberDetail, AdminHostListQuery, AdminHostDirectoryItem, AdminHostDirectoryDetail } from "@luggage-storage/contracts";
export interface HostContext {
    userId: string;
    roles: string[];
    clientInfo?: {
        ip?: string;
        userAgent?: string;
        correlationId?: string;
    };
}
export declare class HostsService {
    /**
     * Registers a new Host Business owned by the authenticated user.
     * Auto-assigns the HOST_OWNER role to the user via database-verified self-assignment.
     * Encrypts sensitive payout banking details at rest.
     */
    createBusiness(request: CreateHostBusinessRequest, context: HostContext): Promise<HostBusiness>;
    /**
     * Retrieves all businesses owned by the current authenticated user,
     * or assigned via active host staff membership (with financial/KYC fields redacted).
     */
    getOwnedBusinesses(context: HostContext): Promise<HostBusiness[]>;
    /**
     * Retrieves a single Host Business by ID, enforcing ownership, active staff assignment,
     * or administrative read privileges with field-level redaction.
     */
    getBusinessById(businessId: string, context: HostContext): Promise<HostBusiness>;
    /**
     * Updates host business information.
     * If sensitive business identity fields are changed on an already-ACTIVE business,
     * transitions the business back to PENDING_VERIFICATION to require re-approval.
     */
    updateBusiness(businessId: string, request: UpdateHostBusinessRequest, context: HostContext): Promise<HostBusiness>;
    /**
     * Submits business verification information and attached documents.
     * Strictly verifies that each document references an authentic, confirmed upload intent
     * created by the caller for this business.
     */
    submitVerification(businessId: string, request: SubmitHostVerificationRequest, context: HostContext): Promise<HostVerification>;
    /**
     * Retrieves full decrypted banking details for authorized business owner or financial administrator.
     */
    getPayoutDetails(businessId: string, context: HostContext): Promise<{
        payoutBankName: string | null;
        payoutAccountNumber: string | null;
        payoutAccountNumberMasked: string | null;
        payoutAccountName: string | null;
        payoutBranchCode: string | null;
    }>;
    /**
     * Retrieves verification progress for authorized business owner, Superadmin, or Support (read-only).
     * Host Staff are strictly denied access to KYC verification records.
     */
    getVerificationByBusinessId(businessId: string, context: HostContext): Promise<HostVerification | null>;
    /**
     * Retrieves the current verification submission for a business.
     */
    getLatestVerification(businessId: string): Promise<HostVerification | null>;
    /**
     * Maps database entity to contract model.
     * Strictly masks bank account numbers and redacts financial/KYC fields for non-owner callers.
     */
    private mapBusinessEntity;
    private mapVerificationEntity;
    private assertHostOwnerOrSuperadminForBusiness;
    private formatStaffMemberDetail;
    listBusinessStaff(businessId: string, context: HostContext): Promise<HostStaffMemberDetail[]>;
    addBusinessStaff(businessId: string, request: AddHostStaffRequest, context: HostContext): Promise<HostStaffMemberDetail>;
    updateBusinessStaff(businessId: string, membershipId: string, request: UpdateHostStaffRequest, context: HostContext): Promise<HostStaffMemberDetail>;
    removeBusinessStaff(businessId: string, membershipId: string, context: HostContext): Promise<void>;
    listAdminHostBusinesses(rawQuery: Partial<AdminHostListQuery>): Promise<{
        items: AdminHostDirectoryItem[];
        total: number;
        page: number;
        limit: number;
    }>;
    getAdminHostBusinessDetail(businessId: string): Promise<AdminHostDirectoryDetail>;
    adminSuspendBusiness(businessId: string, reason: string, context: HostContext): Promise<AdminHostDirectoryDetail>;
    adminReinstateBusiness(businessId: string, reason: string | undefined, context: HostContext): Promise<AdminHostDirectoryDetail>;
}
export declare const hostsService: HostsService;
//# sourceMappingURL=hosts.service.d.ts.map