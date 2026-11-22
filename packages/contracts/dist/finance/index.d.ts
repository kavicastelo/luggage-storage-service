import { z } from "zod";
export declare const LEDGER_ENTRY_TYPES: readonly ["DEBIT", "CREDIT"];
export type LedgerEntryType = (typeof LEDGER_ENTRY_TYPES)[number];
export declare const LEDGER_ACCOUNTS: {
    readonly GATEWAY_CLEARING_RECEIVABLE: {
        readonly code: "1010";
        readonly name: "Gateway Clearing Receivable";
    };
    readonly TRAVELLER_OVERDUE_RECEIVABLE: {
        readonly code: "1020";
        readonly name: "Traveller Overdue Fee Receivable";
    };
    readonly TRAVELLER_BOOKING_LIABILITY: {
        readonly code: "2010";
        readonly name: "Traveller Unearned Booking Liability";
    };
    readonly HOST_PAYABLE_LIABILITY: {
        readonly code: "2020";
        readonly name: "Host Settlement Payable Liability";
    };
    readonly TRAVELLER_REFUND_LIABILITY: {
        readonly code: "2030";
        readonly name: "Traveller Refund Payable Liability";
    };
    readonly PLATFORM_COMMISSION_REVENUE: {
        readonly code: "4010";
        readonly name: "Platform Marketplace Commission Revenue";
    };
};
export declare const HOST_PAYABLE_STATUSES: readonly ["ACCRUED", "ON_HOLD", "ELIGIBLE", "PAID", "CANCELLED_CLAWBACK"];
export type HostPayableStatus = (typeof HOST_PAYABLE_STATUSES)[number];
export declare const HostPayableStatusSchema: z.ZodEnum<{
    ACCRUED: "ACCRUED";
    ON_HOLD: "ON_HOLD";
    ELIGIBLE: "ELIGIBLE";
    PAID: "PAID";
    CANCELLED_CLAWBACK: "CANCELLED_CLAWBACK";
}>;
export declare const FinancialLedgerEntrySchema: z.ZodObject<{
    id: z.ZodString;
    transactionGroupId: z.ZodString;
    entryType: z.ZodEnum<{
        DEBIT: "DEBIT";
        CREDIT: "CREDIT";
    }>;
    accountCode: z.ZodString;
    accountName: z.ZodString;
    amountMinor: z.ZodNumber;
    currency: z.ZodString;
    referenceType: z.ZodEnum<{
        BOOKING: "BOOKING";
        REFUND: "REFUND";
        PAYMENT: "PAYMENT";
        HOST_PAYABLE: "HOST_PAYABLE";
    }>;
    referenceId: z.ZodString;
    bookingId: z.ZodString;
    referenceCode: z.ZodOptional<z.ZodString>;
    businessId: z.ZodNullable<z.ZodString>;
    description: z.ZodString;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    postedAt: z.ZodString;
}, z.core.$strip>;
export type FinancialLedgerEntry = z.infer<typeof FinancialLedgerEntrySchema>;
export declare const HostPayableRecordSchema: z.ZodObject<{
    id: z.ZodString;
    businessId: z.ZodString;
    businessName: z.ZodOptional<z.ZodString>;
    bookingId: z.ZodString;
    referenceCode: z.ZodOptional<z.ZodString>;
    grossSubtotalMinor: z.ZodNumber;
    commissionMinor: z.ZodNumber;
    netPayableMinor: z.ZodNumber;
    currency: z.ZodString;
    status: z.ZodEnum<{
        ACCRUED: "ACCRUED";
        ON_HOLD: "ON_HOLD";
        ELIGIBLE: "ELIGIBLE";
        PAID: "PAID";
        CANCELLED_CLAWBACK: "CANCELLED_CLAWBACK";
    }>;
    accruedAt: z.ZodString;
    eligibleAt: z.ZodNullable<z.ZodString>;
    updatedAt: z.ZodString;
}, z.core.$strip>;
export type HostPayableRecord = z.infer<typeof HostPayableRecordSchema>;
export declare const HostFinanceSummaryResponseSchema: z.ZodObject<{
    currency: z.ZodString;
    totalAccruedMinor: z.ZodNumber;
    totalEligibleMinor: z.ZodNumber;
    totalOnHoldMinor: z.ZodNumber;
    totalPaidMinor: z.ZodNumber;
    payables: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        businessId: z.ZodString;
        businessName: z.ZodOptional<z.ZodString>;
        bookingId: z.ZodString;
        referenceCode: z.ZodOptional<z.ZodString>;
        grossSubtotalMinor: z.ZodNumber;
        commissionMinor: z.ZodNumber;
        netPayableMinor: z.ZodNumber;
        currency: z.ZodString;
        status: z.ZodEnum<{
            ACCRUED: "ACCRUED";
            ON_HOLD: "ON_HOLD";
            ELIGIBLE: "ELIGIBLE";
            PAID: "PAID";
            CANCELLED_CLAWBACK: "CANCELLED_CLAWBACK";
        }>;
        accruedAt: z.ZodString;
        eligibleAt: z.ZodNullable<z.ZodString>;
        updatedAt: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type HostFinanceSummaryResponse = z.infer<typeof HostFinanceSummaryResponseSchema>;
export declare const AdminLedgerQuerySchema: z.ZodObject<{
    bookingId: z.ZodOptional<z.ZodString>;
    businessId: z.ZodOptional<z.ZodString>;
    accountCode: z.ZodOptional<z.ZodString>;
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
}, z.core.$strip>;
export type AdminLedgerQuery = z.infer<typeof AdminLedgerQuerySchema>;
export declare const AdminLedgerResponseSchema: z.ZodObject<{
    entries: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        transactionGroupId: z.ZodString;
        entryType: z.ZodEnum<{
            DEBIT: "DEBIT";
            CREDIT: "CREDIT";
        }>;
        accountCode: z.ZodString;
        accountName: z.ZodString;
        amountMinor: z.ZodNumber;
        currency: z.ZodString;
        referenceType: z.ZodEnum<{
            BOOKING: "BOOKING";
            REFUND: "REFUND";
            PAYMENT: "PAYMENT";
            HOST_PAYABLE: "HOST_PAYABLE";
        }>;
        referenceId: z.ZodString;
        bookingId: z.ZodString;
        referenceCode: z.ZodOptional<z.ZodString>;
        businessId: z.ZodNullable<z.ZodString>;
        description: z.ZodString;
        metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        postedAt: z.ZodString;
    }, z.core.$strip>>;
    totals: z.ZodObject<{
        currency: z.ZodString;
        totalDebitsMinor: z.ZodNumber;
        totalCreditsMinor: z.ZodNumber;
        isBalanced: z.ZodBoolean;
    }, z.core.$strip>;
    pagination: z.ZodObject<{
        page: z.ZodNumber;
        limit: z.ZodNumber;
        total: z.ZodNumber;
        totalPages: z.ZodNumber;
    }, z.core.$strip>;
}, z.core.$strip>;
export type AdminLedgerResponse = z.infer<typeof AdminLedgerResponseSchema>;
export declare const PAYOUT_BATCH_STATUSES: readonly ["GENERATED", "DISBURSED"];
export type PayoutBatchStatus = (typeof PAYOUT_BATCH_STATUSES)[number];
export declare const PayoutBatchStatusSchema: z.ZodEnum<{
    GENERATED: "GENERATED";
    DISBURSED: "DISBURSED";
}>;
export declare const PAYOUT_METHODS: readonly ["CEFT_SLIPS", "BANK_WIRE", "MANUAL_OFFLINE"];
export type PayoutMethod = (typeof PAYOUT_METHODS)[number];
export declare const PayoutMethodSchema: z.ZodEnum<{
    MANUAL_OFFLINE: "MANUAL_OFFLINE";
    CEFT_SLIPS: "CEFT_SLIPS";
    BANK_WIRE: "BANK_WIRE";
}>;
export declare const EligibleHostPayablesGroupSchema: z.ZodObject<{
    businessId: z.ZodString;
    legalBusinessName: z.ZodString;
    tradeName: z.ZodString;
    payoutBankName: z.ZodNullable<z.ZodString>;
    payoutBranchCode: z.ZodNullable<z.ZodString>;
    payoutAccountName: z.ZodNullable<z.ZodString>;
    payoutAccountMasked: z.ZodNullable<z.ZodString>;
    currency: z.ZodString;
    eligibleCount: z.ZodNumber;
    totalGrossMinor: z.ZodNumber;
    totalCommissionMinor: z.ZodNumber;
    totalNetPayableMinor: z.ZodNumber;
    payables: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        businessId: z.ZodString;
        businessName: z.ZodOptional<z.ZodString>;
        bookingId: z.ZodString;
        referenceCode: z.ZodOptional<z.ZodString>;
        grossSubtotalMinor: z.ZodNumber;
        commissionMinor: z.ZodNumber;
        netPayableMinor: z.ZodNumber;
        currency: z.ZodString;
        status: z.ZodEnum<{
            ACCRUED: "ACCRUED";
            ON_HOLD: "ON_HOLD";
            ELIGIBLE: "ELIGIBLE";
            PAID: "PAID";
            CANCELLED_CLAWBACK: "CANCELLED_CLAWBACK";
        }>;
        accruedAt: z.ZodString;
        eligibleAt: z.ZodNullable<z.ZodString>;
        updatedAt: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type EligibleHostPayablesGroup = z.infer<typeof EligibleHostPayablesGroupSchema>;
export declare const CreatePayoutBatchRequestSchema: z.ZodObject<{
    businessId: z.ZodString;
    payableIds: z.ZodOptional<z.ZodArray<z.ZodString>>;
    payoutMethod: z.ZodDefault<z.ZodEnum<{
        MANUAL_OFFLINE: "MANUAL_OFFLINE";
        CEFT_SLIPS: "CEFT_SLIPS";
        BANK_WIRE: "BANK_WIRE";
    }>>;
    notes: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type CreatePayoutBatchRequest = z.infer<typeof CreatePayoutBatchRequestSchema>;
export declare const DisbursePayoutBatchRequestSchema: z.ZodObject<{
    payoutReference: z.ZodString;
    payoutMethod: z.ZodOptional<z.ZodEnum<{
        MANUAL_OFFLINE: "MANUAL_OFFLINE";
        CEFT_SLIPS: "CEFT_SLIPS";
        BANK_WIRE: "BANK_WIRE";
    }>>;
    notes: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type DisbursePayoutBatchRequest = z.infer<typeof DisbursePayoutBatchRequestSchema>;
export declare const PayoutBatchItemRecordSchema: z.ZodObject<{
    id: z.ZodString;
    batchId: z.ZodString;
    payableId: z.ZodString;
    bookingId: z.ZodString;
    referenceCode: z.ZodOptional<z.ZodString>;
    grossSubtotalMinor: z.ZodNumber;
    commissionMinor: z.ZodNumber;
    netPayableMinor: z.ZodNumber;
    currency: z.ZodString;
    payableStatus: z.ZodEnum<{
        ACCRUED: "ACCRUED";
        ON_HOLD: "ON_HOLD";
        ELIGIBLE: "ELIGIBLE";
        PAID: "PAID";
        CANCELLED_CLAWBACK: "CANCELLED_CLAWBACK";
    }>;
    createdAt: z.ZodString;
}, z.core.$strip>;
export type PayoutBatchItemRecord = z.infer<typeof PayoutBatchItemRecordSchema>;
export declare const PayoutBatchSummarySchema: z.ZodObject<{
    id: z.ZodString;
    batchCode: z.ZodString;
    businessId: z.ZodString;
    businessName: z.ZodString;
    legalBusinessName: z.ZodString;
    currency: z.ZodString;
    itemCount: z.ZodNumber;
    totalGrossMinor: z.ZodNumber;
    totalCommissionMinor: z.ZodNumber;
    totalNetPayableMinor: z.ZodNumber;
    status: z.ZodEnum<{
        GENERATED: "GENERATED";
        DISBURSED: "DISBURSED";
    }>;
    payoutBankName: z.ZodNullable<z.ZodString>;
    payoutBranchCode: z.ZodNullable<z.ZodString>;
    payoutAccountName: z.ZodNullable<z.ZodString>;
    payoutAccountMasked: z.ZodNullable<z.ZodString>;
    payoutMethod: z.ZodEnum<{
        MANUAL_OFFLINE: "MANUAL_OFFLINE";
        CEFT_SLIPS: "CEFT_SLIPS";
        BANK_WIRE: "BANK_WIRE";
    }>;
    payoutReference: z.ZodNullable<z.ZodString>;
    notes: z.ZodNullable<z.ZodString>;
    ledgerTransactionGroupId: z.ZodNullable<z.ZodString>;
    generatedByUserId: z.ZodNullable<z.ZodString>;
    disbursedByUserId: z.ZodNullable<z.ZodString>;
    disbursedAt: z.ZodNullable<z.ZodString>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, z.core.$strip>;
export type PayoutBatchSummary = z.infer<typeof PayoutBatchSummarySchema>;
export declare const PayoutBatchDetailSchema: z.ZodObject<{
    id: z.ZodString;
    batchCode: z.ZodString;
    businessId: z.ZodString;
    businessName: z.ZodString;
    legalBusinessName: z.ZodString;
    currency: z.ZodString;
    itemCount: z.ZodNumber;
    totalGrossMinor: z.ZodNumber;
    totalCommissionMinor: z.ZodNumber;
    totalNetPayableMinor: z.ZodNumber;
    status: z.ZodEnum<{
        GENERATED: "GENERATED";
        DISBURSED: "DISBURSED";
    }>;
    payoutBankName: z.ZodNullable<z.ZodString>;
    payoutBranchCode: z.ZodNullable<z.ZodString>;
    payoutAccountName: z.ZodNullable<z.ZodString>;
    payoutAccountMasked: z.ZodNullable<z.ZodString>;
    payoutMethod: z.ZodEnum<{
        MANUAL_OFFLINE: "MANUAL_OFFLINE";
        CEFT_SLIPS: "CEFT_SLIPS";
        BANK_WIRE: "BANK_WIRE";
    }>;
    payoutReference: z.ZodNullable<z.ZodString>;
    notes: z.ZodNullable<z.ZodString>;
    ledgerTransactionGroupId: z.ZodNullable<z.ZodString>;
    generatedByUserId: z.ZodNullable<z.ZodString>;
    disbursedByUserId: z.ZodNullable<z.ZodString>;
    disbursedAt: z.ZodNullable<z.ZodString>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    items: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        batchId: z.ZodString;
        payableId: z.ZodString;
        bookingId: z.ZodString;
        referenceCode: z.ZodOptional<z.ZodString>;
        grossSubtotalMinor: z.ZodNumber;
        commissionMinor: z.ZodNumber;
        netPayableMinor: z.ZodNumber;
        currency: z.ZodString;
        payableStatus: z.ZodEnum<{
            ACCRUED: "ACCRUED";
            ON_HOLD: "ON_HOLD";
            ELIGIBLE: "ELIGIBLE";
            PAID: "PAID";
            CANCELLED_CLAWBACK: "CANCELLED_CLAWBACK";
        }>;
        createdAt: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type PayoutBatchDetail = z.infer<typeof PayoutBatchDetailSchema>;
export declare const AdminPayoutBatchQuerySchema: z.ZodObject<{
    status: z.ZodOptional<z.ZodEnum<{
        GENERATED: "GENERATED";
        DISBURSED: "DISBURSED";
    }>>;
    businessId: z.ZodOptional<z.ZodString>;
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
}, z.core.$strip>;
export type AdminPayoutBatchQuery = z.infer<typeof AdminPayoutBatchQuerySchema>;
//# sourceMappingURL=index.d.ts.map