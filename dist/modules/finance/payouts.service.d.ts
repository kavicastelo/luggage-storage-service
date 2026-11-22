import { AdminPayoutBatchQuery, CreatePayoutBatchRequest, DisbursePayoutBatchRequest, EligibleHostPayablesGroup, PaginationMeta, PayoutBatchDetail, PayoutBatchSummary } from "@luggage-storage/contracts";
import { AuditClientInfo } from "../audit/audit.service.js";
export declare class PayoutsService {
    /**
     * Groups unbatched ELIGIBLE host_payables by host business for AD-008 batch generation.
     */
    getEligiblePayablesGrouped(businessIdFilter?: string): Promise<EligibleHostPayablesGroup[]>;
    /**
     * Atomically creates a GENERATED payout batch for one host business, locking eligible payables
     * to guarantee each payable can belong to at most one batch.
     */
    createPayoutBatch(actorUserId: string, rawInput: CreatePayoutBatchRequest, clientInfo?: AuditClientInfo): Promise<PayoutBatchDetail>;
    /**
     * Lists payout batches globally for Admin / Finance Governance.
     */
    listAdminPayoutBatches(rawQuery?: Partial<AdminPayoutBatchQuery>): Promise<{
        batches: PayoutBatchSummary[];
        total: number;
        pagination: PaginationMeta;
    }>;
    /**
     * Retrieves a single payout batch with all included booking payables.
     */
    getAdminPayoutBatchDetail(batchId: string): Promise<PayoutBatchDetail>;
    /**
     * Attests bank wire/CEFT disbursement reference, marks payables PAID, and posts balanced
     * DEBIT 2020 Host Payable Liability / CREDIT 1010 Gateway Clearing Receivable ledger entries.
     */
    disbursePayoutBatch(batchId: string, actorUserId: string, rawInput: DisbursePayoutBatchRequest, clientInfo?: AuditClientInfo): Promise<PayoutBatchDetail>;
    /**
     * Lists settlement payout batches for HOST_OWNER (or SUPERADMIN), strictly excluding HOST_STAFF (OQ-017).
     */
    listHostPayoutBatches(userId: string, userRoles: string[], businessIdFilter?: string): Promise<PayoutBatchSummary[]>;
    private mapBatchSummary;
}
export declare const payoutsService: PayoutsService;
//# sourceMappingURL=payouts.service.d.ts.map