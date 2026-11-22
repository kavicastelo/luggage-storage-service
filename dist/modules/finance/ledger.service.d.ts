import { HostFinanceSummaryResponse, AdminLedgerQuery, AdminLedgerResponse, AdminMetricsSummary } from "@luggage-storage/contracts";
export interface JournalPostingLine {
    entryType: "DEBIT" | "CREDIT";
    accountCode: string;
    accountName: string;
    amountMinor: number;
    currency: string;
    referenceType: "BOOKING" | "PAYMENT" | "REFUND" | "HOST_PAYABLE";
    referenceId: string;
    bookingId: string;
    businessId?: string | null;
    description: string;
    metadata?: Record<string, unknown>;
}
export declare class LedgerService {
    /**
     * Posts an atomic, balanced double-entry journal group inside an active transaction.
     * Strictly enforces integer minor units and SUM(DEBIT) === SUM(CREDIT) > 0.
     */
    postJournalGroup(tx: any, lines: JournalPostingLine[]): Promise<string>;
    /**
     * Records gateway payment collection into unearned booking liability (non-escrow clearing).
     */
    recordPaymentCaptured(tx: any, params: {
        bookingId: string;
        businessId: string;
        paymentIntentId: string;
        amountMinor: number;
        currency: string;
        referenceCode: string;
    }): Promise<string>;
    /**
     * Settles unearned booking liability into Platform Commission Revenue (4010)
     * and Host Settlement Payable Liability (2020) upon luggage return completion.
     */
    recordBookingCompletedSettlement(tx: any, params: {
        bookingId: string;
        businessId: string;
        storageSubtotalMinor: number;
        commissionMinor: number;
        hostPayableMinor: number;
        currency: string;
        referenceCode: string;
        holdPayable?: boolean;
    }): Promise<{
        transactionGroupId: string;
        payableId: string;
    }>;
    /**
     * Reclassifies unearned booking liability into refund liability (and settles any retained
     * non-refundable cancellation portion per OQ-009).
     */
    recordCancellationSettlement(tx: any, params: {
        bookingId: string;
        businessId: string;
        refundId: string | null;
        paidAmountMinor: number;
        refundAmountMinor: number;
        commissionRateBps: number;
        currency: string;
        referenceCode: string;
    }): Promise<void>;
    /**
     * Reverses an already-accrued post-settlement split (4010 Commission + 2020 Host Payable Liability,
     * plus any unallocated 2010 balance) into 2030 Traveller Refund Liability (and any retained partial split)
     * when an admin resolves a post-collection dispute in favour of the traveller.
     */
    recordPostSettlementDisputeRefund(tx: any, params: {
        bookingId: string;
        businessId: string;
        existingPayable: {
            id: string;
            grossSubtotalMinor: number;
            commissionMinor: number;
            netPayableMinor: number;
        };
        refundId: string | null;
        paidAmountMinor: number;
        refundAmountMinor: number;
        commissionRateBps: number;
        currency: string;
        referenceCode: string;
    }): Promise<void>;
    /**
     * Clears Traveller Refund Payable Liability (2030) against Gateway Clearing (1010)
     * when refund execution succeeds.
     */
    recordRefundDisbursed(tx: any, params: {
        bookingId: string;
        businessId: string;
        refundId: string;
        amountMinor: number;
        currency: string;
        referenceCode: string;
    }): Promise<void>;
    /**
     * Host settlement payable summary (OQ-017: strictly restricted to HOST_OWNER and SUPERADMIN).
     */
    getHostFinanceSummary(userId: string, userRoles: string[], businessIdFilter?: string): Promise<HostFinanceSummaryResponse>;
    /**
     * Superadmin double-entry ledger inspection & mathematical balance verification.
     */
    listAdminLedger(rawQuery: AdminLedgerQuery): Promise<AdminLedgerResponse>;
    /**
     * Role-scoped platform command metrics (AD-001).
     * Operational queue & status counts are returned to SUPPORT & SUPERADMIN;
     * financial totals are populated strictly when caller holds admin.financial.manage.
     */
    getAdminMetricsSummary(callerUserId: string): Promise<AdminMetricsSummary>;
}
export declare const ledgerService: LedgerService;
//# sourceMappingURL=ledger.service.d.ts.map