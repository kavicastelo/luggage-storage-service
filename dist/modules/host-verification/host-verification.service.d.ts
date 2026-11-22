import { ReviewHostVerificationRequest, HostVerification, HostVerificationQueueItem, HostVerificationQueueQuery } from "@luggage-storage/contracts";
export interface AdminVerificationContext {
    adminId: string;
    adminRoles: string[];
    clientInfo?: {
        ip?: string;
        userAgent?: string;
        correlationId?: string;
    };
}
export declare class HostVerificationService {
    /**
     * Retrieves host verifications queue filtered by verification status (defaults to PENDING_REVIEW).
     */
    getPendingVerifications(limit?: number, offset?: number, status?: HostVerificationQueueQuery["status"]): Promise<{
        queue: HostVerificationQueueItem[];
        total: number;
    }>;
    /**
     * Retrieves complete verification details with attached documents.
     */
    getVerificationDetails(verificationId: string, _context: AdminVerificationContext): Promise<HostVerification>;
    /**
     * Performs Superadmin moderation of a Host verification application.
     * Invariant: A host owner CANNOT review or approve their own verification application.
     */
    reviewVerification(verificationId: string, review: ReviewHostVerificationRequest, context: AdminVerificationContext): Promise<HostVerification>;
}
export declare const hostVerificationService: HostVerificationService;
//# sourceMappingURL=host-verification.service.d.ts.map