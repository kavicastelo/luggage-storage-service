import { z } from "zod";
export declare const CUSTODY_STATUSES: readonly ["EXPECTED", "CHECKED_IN", "IN_STORAGE", "OVERDUE", "RELEASED_TO_TRAVELLER", "DISPUTED_RELEASE", "ABANDONED"];
export type CustodyStatus = (typeof CUSTODY_STATUSES)[number];
export declare const CustodyStatusSchema: z.ZodEnum<{
    IN_STORAGE: "IN_STORAGE";
    EXPECTED: "EXPECTED";
    CHECKED_IN: "CHECKED_IN";
    OVERDUE: "OVERDUE";
    RELEASED_TO_TRAVELLER: "RELEASED_TO_TRAVELLER";
    DISPUTED_RELEASE: "DISPUTED_RELEASE";
    ABANDONED: "ABANDONED";
}>;
export declare const CUSTODY_OPERATIONS: readonly ["CHECK_IN", "COLLECTION"];
export type CustodyOperation = (typeof CUSTODY_OPERATIONS)[number];
export declare const CustodyOperationSchema: z.ZodEnum<{
    CHECK_IN: "CHECK_IN";
    COLLECTION: "COLLECTION";
}>;
export declare const HANDOVER_CONDITIONS: readonly ["NORMAL", "UNPAID_FEES_PENDING", "EXCEPTION_RECORDED"];
export type HandoverCondition = (typeof HANDOVER_CONDITIONS)[number];
export declare const HandoverConditionSchema: z.ZodEnum<{
    NORMAL: "NORMAL";
    UNPAID_FEES_PENDING: "UNPAID_FEES_PENDING";
    EXCEPTION_RECORDED: "EXCEPTION_RECORDED";
}>;
export declare const IssueCustodyPassRequestSchema: z.ZodObject<{
    operation: z.ZodEnum<{
        CHECK_IN: "CHECK_IN";
        COLLECTION: "COLLECTION";
    }>;
}, z.core.$strip>;
export type IssueCustodyPassRequest = z.infer<typeof IssueCustodyPassRequestSchema>;
export declare const CustodyPassResponseSchema: z.ZodObject<{
    bookingId: z.ZodString;
    referenceCode: z.ZodString;
    operation: z.ZodEnum<{
        CHECK_IN: "CHECK_IN";
        COLLECTION: "COLLECTION";
    }>;
    qrToken: z.ZodString;
    verificationPin: z.ZodString;
    expiresAt: z.ZodString;
}, z.core.$strip>;
export type CustodyPassResponse = z.infer<typeof CustodyPassResponseSchema>;
export declare const VerifyCustodyPassRequestSchema: z.ZodObject<{
    bookingId: z.ZodString;
    operation: z.ZodEnum<{
        CHECK_IN: "CHECK_IN";
        COLLECTION: "COLLECTION";
    }>;
    qrToken: z.ZodOptional<z.ZodString>;
    verificationPin: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type VerifyCustodyPassRequest = z.infer<typeof VerifyCustodyPassRequestSchema>;
export declare const VerifyCustodyPassResponseSchema: z.ZodObject<{
    verified: z.ZodBoolean;
    bookingId: z.ZodString;
    referenceCode: z.ZodString;
    operation: z.ZodEnum<{
        CHECK_IN: "CHECK_IN";
        COLLECTION: "COLLECTION";
    }>;
    expectedBagCount: z.ZodNumber;
    checkedInBagCount: z.ZodNullable<z.ZodNumber>;
    custodyStatus: z.ZodEnum<{
        IN_STORAGE: "IN_STORAGE";
        EXPECTED: "EXPECTED";
        CHECKED_IN: "CHECKED_IN";
        OVERDUE: "OVERDUE";
        RELEASED_TO_TRAVELLER: "RELEASED_TO_TRAVELLER";
        DISPUTED_RELEASE: "DISPUTED_RELEASE";
        ABANDONED: "ABANDONED";
    }>;
}, z.core.$strip>;
export type VerifyCustodyPassResponse = z.infer<typeof VerifyCustodyPassResponseSchema>;
export declare const BagCustodyItemInputSchema: z.ZodObject<{
    bagTagCode: z.ZodString;
    bagCategory: z.ZodEnum<{
        BAG_SMALL: "BAG_SMALL";
        BAG_MEDIUM: "BAG_MEDIUM";
        BAG_LARGE: "BAG_LARGE";
        BAG_OVERSIZED: "BAG_OVERSIZED";
    }>;
    securitySealNumber: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    zoneId: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    photoFileKey: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    conditionNotes: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
export type BagCustodyItemInput = z.infer<typeof BagCustodyItemInputSchema>;
export declare const CompleteCheckInRequestSchema: z.ZodObject<{
    qrToken: z.ZodOptional<z.ZodString>;
    verificationPin: z.ZodOptional<z.ZodString>;
    zoneId: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    bags: z.ZodArray<z.ZodObject<{
        bagTagCode: z.ZodString;
        bagCategory: z.ZodEnum<{
            BAG_SMALL: "BAG_SMALL";
            BAG_MEDIUM: "BAG_MEDIUM";
            BAG_LARGE: "BAG_LARGE";
            BAG_OVERSIZED: "BAG_OVERSIZED";
        }>;
        securitySealNumber: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        zoneId: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        photoFileKey: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        conditionNotes: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    }, z.core.$strip>>;
    bagCountExceptionReason: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type CompleteCheckInRequest = z.infer<typeof CompleteCheckInRequestSchema>;
/**
 * OQ-015 Zero Possessory Lien:
 * Overdue bookings MUST still release physical luggage upon valid COLLECTION token/PIN.
 */
export declare const CompleteCollectionRequestSchema: z.ZodObject<{
    qrToken: z.ZodOptional<z.ZodString>;
    verificationPin: z.ZodOptional<z.ZodString>;
    releasedBagCount: z.ZodNumber;
    collectionNotes: z.ZodOptional<z.ZodString>;
    exceptionNotes: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type CompleteCollectionRequest = z.infer<typeof CompleteCollectionRequestSchema>;
export declare const BagCustodyItemSchema: z.ZodObject<{
    id: z.ZodString;
    custodyRecordId: z.ZodString;
    bagTagCode: z.ZodString;
    bagCategory: z.ZodEnum<{
        BAG_SMALL: "BAG_SMALL";
        BAG_MEDIUM: "BAG_MEDIUM";
        BAG_LARGE: "BAG_LARGE";
        BAG_OVERSIZED: "BAG_OVERSIZED";
    }>;
    securitySealNumber: z.ZodNullable<z.ZodString>;
    zoneId: z.ZodNullable<z.ZodString>;
    photoFileKey: z.ZodNullable<z.ZodString>;
    photoDownloadUrl: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    conditionNotes: z.ZodNullable<z.ZodString>;
    checkedInAt: z.ZodString;
    releasedAt: z.ZodNullable<z.ZodString>;
}, z.core.$strip>;
export type BagCustodyItem = z.infer<typeof BagCustodyItemSchema>;
export declare const CustodyEventSchema: z.ZodObject<{
    id: z.ZodString;
    custodyRecordId: z.ZodString;
    bookingId: z.ZodString;
    eventType: z.ZodString;
    previousStatus: z.ZodNullable<z.ZodString>;
    newStatus: z.ZodString;
    actorUserId: z.ZodNullable<z.ZodString>;
    actorRole: z.ZodString;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    createdAt: z.ZodString;
}, z.core.$strip>;
export type CustodyEvent = z.infer<typeof CustodyEventSchema>;
export declare const CustodyRecordDetailSchema: z.ZodObject<{
    id: z.ZodString;
    bookingId: z.ZodString;
    referenceCode: z.ZodOptional<z.ZodString>;
    locationId: z.ZodString;
    businessId: z.ZodString;
    status: z.ZodEnum<{
        IN_STORAGE: "IN_STORAGE";
        EXPECTED: "EXPECTED";
        CHECKED_IN: "CHECKED_IN";
        OVERDUE: "OVERDUE";
        RELEASED_TO_TRAVELLER: "RELEASED_TO_TRAVELLER";
        DISPUTED_RELEASE: "DISPUTED_RELEASE";
        ABANDONED: "ABANDONED";
    }>;
    expectedBagCount: z.ZodNumber;
    checkedInBagCount: z.ZodNullable<z.ZodNumber>;
    releasedBagCount: z.ZodNullable<z.ZodNumber>;
    zoneId: z.ZodNullable<z.ZodString>;
    checkInAt: z.ZodNullable<z.ZodString>;
    checkInStaffUserId: z.ZodNullable<z.ZodString>;
    checkOutAt: z.ZodNullable<z.ZodString>;
    checkOutStaffUserId: z.ZodNullable<z.ZodString>;
    handoverCondition: z.ZodEnum<{
        NORMAL: "NORMAL";
        UNPAID_FEES_PENDING: "UNPAID_FEES_PENDING";
        EXCEPTION_RECORDED: "EXCEPTION_RECORDED";
    }>;
    overdueMinutes: z.ZodNumber;
    overdueFeeMinor: z.ZodNumber;
    exceptionNotes: z.ZodNullable<z.ZodString>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    bags: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        custodyRecordId: z.ZodString;
        bagTagCode: z.ZodString;
        bagCategory: z.ZodEnum<{
            BAG_SMALL: "BAG_SMALL";
            BAG_MEDIUM: "BAG_MEDIUM";
            BAG_LARGE: "BAG_LARGE";
            BAG_OVERSIZED: "BAG_OVERSIZED";
        }>;
        securitySealNumber: z.ZodNullable<z.ZodString>;
        zoneId: z.ZodNullable<z.ZodString>;
        photoFileKey: z.ZodNullable<z.ZodString>;
        photoDownloadUrl: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        conditionNotes: z.ZodNullable<z.ZodString>;
        checkedInAt: z.ZodString;
        releasedAt: z.ZodNullable<z.ZodString>;
    }, z.core.$strip>>>;
    events: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        custodyRecordId: z.ZodString;
        bookingId: z.ZodString;
        eventType: z.ZodString;
        previousStatus: z.ZodNullable<z.ZodString>;
        newStatus: z.ZodString;
        actorUserId: z.ZodNullable<z.ZodString>;
        actorRole: z.ZodString;
        metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        createdAt: z.ZodString;
    }, z.core.$strip>>>;
}, z.core.$strip>;
export type CustodyRecordDetail = z.infer<typeof CustodyRecordDetailSchema>;
//# sourceMappingURL=index.d.ts.map