import { z } from "zod";
export declare const BOOKING_STATUSES: readonly ["PENDING_HOST_APPROVAL", "PENDING_PAYMENT", "CONFIRMED", "IN_STORAGE", "COMPLETED", "CANCELLED_BY_TRAVELLER", "CANCELLED_BY_HOST", "CANCELLED_BY_PLATFORM", "REJECTED", "EXPIRED", "DISPUTED"];
export type BookingStatus = (typeof BOOKING_STATUSES)[number];
export declare const BookingStatusSchema: z.ZodEnum<{
    REJECTED: "REJECTED";
    CONFIRMED: "CONFIRMED";
    EXPIRED: "EXPIRED";
    PENDING_HOST_APPROVAL: "PENDING_HOST_APPROVAL";
    PENDING_PAYMENT: "PENDING_PAYMENT";
    IN_STORAGE: "IN_STORAGE";
    COMPLETED: "COMPLETED";
    CANCELLED_BY_TRAVELLER: "CANCELLED_BY_TRAVELLER";
    CANCELLED_BY_HOST: "CANCELLED_BY_HOST";
    CANCELLED_BY_PLATFORM: "CANCELLED_BY_PLATFORM";
    DISPUTED: "DISPUTED";
}>;
export declare const CAPACITY_RESERVATION_STATUSES: readonly ["HELD_FOR_HOST_APPROVAL", "HELD_FOR_PAYMENT", "CONFIRMED", "RELEASED"];
export type CapacityReservationStatus = (typeof CAPACITY_RESERVATION_STATUSES)[number];
export declare const CapacityReservationStatusSchema: z.ZodEnum<{
    CONFIRMED: "CONFIRMED";
    HELD_FOR_HOST_APPROVAL: "HELD_FOR_HOST_APPROVAL";
    HELD_FOR_PAYMENT: "HELD_FOR_PAYMENT";
    RELEASED: "RELEASED";
}>;
export declare const CANCELLATION_POLICY_CODES: readonly ["STANDARD_FLEX_2H"];
export type CancellationPolicyCode = (typeof CANCELLATION_POLICY_CODES)[number];
export declare const DEFAULT_HOST_APPROVAL_HOLD_MINUTES = 15;
export declare const DEFAULT_PAYMENT_HOLD_MINUTES = 10;
export declare const DEFAULT_COMMISSION_RATE_BPS = 1500;
export declare const DEFAULT_CUSTODY_PASS_TTL_MINUTES = 15;
export declare const DEFAULT_OVERDUE_GRACE_MINUTES = 30;
export declare const DISPUTE_RESOLUTION_OUTCOMES: readonly ["UPHOLD_HOST", "REFUND_TRAVELLER"];
export type DisputeResolutionOutcome = (typeof DISPUTE_RESOLUTION_OUTCOMES)[number];
export declare const DisputeResolutionOutcomeSchema: z.ZodEnum<{
    UPHOLD_HOST: "UPHOLD_HOST";
    REFUND_TRAVELLER: "REFUND_TRAVELLER";
}>;
export declare const BookingBagItemInputSchema: z.ZodObject<{
    bagCategory: z.ZodEnum<{
        BAG_SMALL: "BAG_SMALL";
        BAG_MEDIUM: "BAG_MEDIUM";
        BAG_LARGE: "BAG_LARGE";
        BAG_OVERSIZED: "BAG_OVERSIZED";
    }>;
    quantity: z.ZodNumber;
}, z.core.$strip>;
export type BookingBagItemInput = z.infer<typeof BookingBagItemInputSchema>;
export declare const BookingQuoteRequestSchema: z.ZodObject<{
    locationId: z.ZodString;
    dropOffAt: z.ZodString;
    collectionAt: z.ZodString;
    items: z.ZodArray<z.ZodObject<{
        bagCategory: z.ZodEnum<{
            BAG_SMALL: "BAG_SMALL";
            BAG_MEDIUM: "BAG_MEDIUM";
            BAG_LARGE: "BAG_LARGE";
            BAG_OVERSIZED: "BAG_OVERSIZED";
        }>;
        quantity: z.ZodNumber;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type BookingQuoteRequest = z.infer<typeof BookingQuoteRequestSchema>;
export declare const QuotedLineItemSchema: z.ZodObject<{
    bagCategory: z.ZodEnum<{
        BAG_SMALL: "BAG_SMALL";
        BAG_MEDIUM: "BAG_MEDIUM";
        BAG_LARGE: "BAG_LARGE";
        BAG_OVERSIZED: "BAG_OVERSIZED";
    }>;
    quantity: z.ZodNumber;
    capacityUnits: z.ZodNumber;
    unitRateMinor: z.ZodNumber;
    durationUnits: z.ZodNumber;
    lineTotalMinor: z.ZodNumber;
}, z.core.$strip>;
export type QuotedLineItem = z.infer<typeof QuotedLineItemSchema>;
export declare const BookingQuoteResponseSchema: z.ZodObject<{
    locationId: z.ZodString;
    locationName: z.ZodString;
    bookingMode: z.ZodEnum<{
        INSTANT: "INSTANT";
        HOST_APPROVAL: "HOST_APPROVAL";
    }>;
    timezone: z.ZodString;
    available: z.ZodBoolean;
    unavailabilityReason: z.ZodNullable<z.ZodString>;
    remainingCapacityUnits: z.ZodNumber;
    requestedCapacityUnits: z.ZodNumber;
    totalBags: z.ZodNumber;
    currency: z.ZodString;
    currencyExponent: z.ZodNumber;
    pricingUnit: z.ZodEnum<{
        CALENDAR_DAY: "CALENDAR_DAY";
        "24_HOUR_BLOCK": "24_HOUR_BLOCK";
    }>;
    durationUnits: z.ZodNumber;
    baseRateMinor: z.ZodNumber;
    items: z.ZodArray<z.ZodObject<{
        bagCategory: z.ZodEnum<{
            BAG_SMALL: "BAG_SMALL";
            BAG_MEDIUM: "BAG_MEDIUM";
            BAG_LARGE: "BAG_LARGE";
            BAG_OVERSIZED: "BAG_OVERSIZED";
        }>;
        quantity: z.ZodNumber;
        capacityUnits: z.ZodNumber;
        unitRateMinor: z.ZodNumber;
        durationUnits: z.ZodNumber;
        lineTotalMinor: z.ZodNumber;
    }, z.core.$strip>>;
    grossStorageMinor: z.ZodNumber;
    discountMinor: z.ZodNumber;
    storageSubtotalMinor: z.ZodNumber;
    commissionRateBps: z.ZodOptional<z.ZodNumber>;
    platformCommissionMinor: z.ZodOptional<z.ZodNumber>;
    hostPayableMinor: z.ZodOptional<z.ZodNumber>;
    taxRateBps: z.ZodNumber;
    taxAmountMinor: z.ZodNumber;
    totalAmountMinor: z.ZodNumber;
    cancellationPolicyCode: z.ZodEnum<{
        STANDARD_FLEX_2H: "STANDARD_FLEX_2H";
    }>;
    cancellationPolicySummary: z.ZodString;
}, z.core.$strip>;
export type BookingQuoteResponse = z.infer<typeof BookingQuoteResponseSchema>;
export declare const AvailabilitySearchQuerySchema: z.ZodObject<{
    locationId: z.ZodOptional<z.ZodString>;
    city: z.ZodOptional<z.ZodString>;
    dropOffAt: z.ZodString;
    collectionAt: z.ZodString;
    smallBags: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    mediumBags: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    largeBags: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    oversizedBags: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
}, z.core.$strip>;
export type AvailabilitySearchQuery = z.infer<typeof AvailabilitySearchQuerySchema>;
export declare const CreateBookingRequestSchema: z.ZodObject<{
    locationId: z.ZodString;
    dropOffAt: z.ZodString;
    collectionAt: z.ZodString;
    items: z.ZodArray<z.ZodObject<{
        bagCategory: z.ZodEnum<{
            BAG_SMALL: "BAG_SMALL";
            BAG_MEDIUM: "BAG_MEDIUM";
            BAG_LARGE: "BAG_LARGE";
            BAG_OVERSIZED: "BAG_OVERSIZED";
        }>;
        quantity: z.ZodNumber;
    }, z.core.$strip>>;
    idempotencyKey: z.ZodOptional<z.ZodString>;
    travellerNotes: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type CreateBookingRequest = z.infer<typeof CreateBookingRequestSchema>;
export declare const CancelBookingRequestSchema: z.ZodObject<{
    reason: z.ZodString;
}, z.core.$strip>;
export type CancelBookingRequest = z.infer<typeof CancelBookingRequestSchema>;
export declare const HostDecisionBookingRequestSchema: z.ZodObject<{
    reason: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type HostDecisionBookingRequest = z.infer<typeof HostDecisionBookingRequestSchema>;
export declare const HostRejectBookingRequestSchema: z.ZodObject<{
    reason: z.ZodString;
}, z.core.$strip>;
export type HostRejectBookingRequest = z.infer<typeof HostRejectBookingRequestSchema>;
export declare const RecordBookingExceptionRequestSchema: z.ZodObject<{
    reason: z.ZodString;
    category: z.ZodDefault<z.ZodEnum<{
        OTHER: "OTHER";
        DAMAGE_REPORTED: "DAMAGE_REPORTED";
        MISSING_ITEM: "MISSING_ITEM";
        OVERDUE_DISPUTE: "OVERDUE_DISPUTE";
        HOST_NO_SHOW: "HOST_NO_SHOW";
        SAFETY_CONCERN: "SAFETY_CONCERN";
    }>>;
}, z.core.$strip>;
export type RecordBookingExceptionRequest = z.infer<typeof RecordBookingExceptionRequestSchema>;
export declare const ResolveBookingDisputeRequestSchema: z.ZodObject<{
    outcome: z.ZodEnum<{
        UPHOLD_HOST: "UPHOLD_HOST";
        REFUND_TRAVELLER: "REFUND_TRAVELLER";
    }>;
    refundPercentage: z.ZodOptional<z.ZodNumber>;
    notes: z.ZodString;
}, z.core.$strip>;
export type ResolveBookingDisputeRequest = z.infer<typeof ResolveBookingDisputeRequestSchema>;
export declare const BookingPricingSnapshotSchema: z.ZodObject<{
    id: z.ZodString;
    bookingId: z.ZodString;
    policyId: z.ZodNullable<z.ZodString>;
    currency: z.ZodString;
    currencyExponent: z.ZodNumber;
    pricingUnit: z.ZodEnum<{
        CALENDAR_DAY: "CALENDAR_DAY";
        "24_HOUR_BLOCK": "24_HOUR_BLOCK";
    }>;
    baseRateMinor: z.ZodNumber;
    durationUnits: z.ZodNumber;
    itemsBreakdown: z.ZodArray<z.ZodObject<{
        bagCategory: z.ZodEnum<{
            BAG_SMALL: "BAG_SMALL";
            BAG_MEDIUM: "BAG_MEDIUM";
            BAG_LARGE: "BAG_LARGE";
            BAG_OVERSIZED: "BAG_OVERSIZED";
        }>;
        quantity: z.ZodNumber;
        capacityUnits: z.ZodNumber;
        unitRateMinor: z.ZodNumber;
        durationUnits: z.ZodNumber;
        lineTotalMinor: z.ZodNumber;
    }, z.core.$strip>>;
    grossStorageMinor: z.ZodNumber;
    discountMinor: z.ZodNumber;
    storageSubtotalMinor: z.ZodNumber;
    commissionRateBps: z.ZodOptional<z.ZodNumber>;
    platformCommissionMinor: z.ZodOptional<z.ZodNumber>;
    hostPayableMinor: z.ZodOptional<z.ZodNumber>;
    taxRateBps: z.ZodNumber;
    taxAmountMinor: z.ZodNumber;
    totalAmountMinor: z.ZodNumber;
    cancellationPolicyCode: z.ZodString;
    createdAt: z.ZodString;
}, z.core.$strip>;
export type BookingPricingSnapshot = z.infer<typeof BookingPricingSnapshotSchema>;
export declare const BookingItemSchema: z.ZodObject<{
    id: z.ZodString;
    bookingId: z.ZodString;
    bagCategory: z.ZodEnum<{
        BAG_SMALL: "BAG_SMALL";
        BAG_MEDIUM: "BAG_MEDIUM";
        BAG_LARGE: "BAG_LARGE";
        BAG_OVERSIZED: "BAG_OVERSIZED";
    }>;
    quantity: z.ZodNumber;
    capacityUnits: z.ZodNumber;
    unitRateMinor: z.ZodNumber;
    lineTotalMinor: z.ZodNumber;
}, z.core.$strip>;
export type BookingItem = z.infer<typeof BookingItemSchema>;
export declare const BookingStatusHistoryEntrySchema: z.ZodObject<{
    id: z.ZodString;
    bookingId: z.ZodString;
    previousStatus: z.ZodNullable<z.ZodEnum<{
        REJECTED: "REJECTED";
        CONFIRMED: "CONFIRMED";
        EXPIRED: "EXPIRED";
        PENDING_HOST_APPROVAL: "PENDING_HOST_APPROVAL";
        PENDING_PAYMENT: "PENDING_PAYMENT";
        IN_STORAGE: "IN_STORAGE";
        COMPLETED: "COMPLETED";
        CANCELLED_BY_TRAVELLER: "CANCELLED_BY_TRAVELLER";
        CANCELLED_BY_HOST: "CANCELLED_BY_HOST";
        CANCELLED_BY_PLATFORM: "CANCELLED_BY_PLATFORM";
        DISPUTED: "DISPUTED";
    }>>;
    newStatus: z.ZodEnum<{
        REJECTED: "REJECTED";
        CONFIRMED: "CONFIRMED";
        EXPIRED: "EXPIRED";
        PENDING_HOST_APPROVAL: "PENDING_HOST_APPROVAL";
        PENDING_PAYMENT: "PENDING_PAYMENT";
        IN_STORAGE: "IN_STORAGE";
        COMPLETED: "COMPLETED";
        CANCELLED_BY_TRAVELLER: "CANCELLED_BY_TRAVELLER";
        CANCELLED_BY_HOST: "CANCELLED_BY_HOST";
        CANCELLED_BY_PLATFORM: "CANCELLED_BY_PLATFORM";
        DISPUTED: "DISPUTED";
    }>;
    actorUserId: z.ZodNullable<z.ZodString>;
    actorRole: z.ZodString;
    reason: z.ZodNullable<z.ZodString>;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    createdAt: z.ZodString;
}, z.core.$strip>;
export type BookingStatusHistoryEntry = z.infer<typeof BookingStatusHistoryEntrySchema>;
/**
 * Location disclosure embedded in booking responses.
 * Strictly enforces OQ-012: exact address and precise coordinates are NULL unless
 * booking is CONFIRMED/IN_STORAGE/COMPLETED (or caller is authorized host/admin).
 */
export declare const BookingLocationDisclosureSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    city: z.ZodString;
    countryCode: z.ZodString;
    timezone: z.ZodString;
    approximateArea: z.ZodString;
    approximateLatitude: z.ZodNumber;
    approximateLongitude: z.ZodNumber;
    addressDisclosed: z.ZodBoolean;
    addressLine1: z.ZodNullable<z.ZodString>;
    addressLine2: z.ZodNullable<z.ZodString>;
    postalCode: z.ZodNullable<z.ZodString>;
    directionsNotes: z.ZodNullable<z.ZodString>;
    exactLatitude: z.ZodNullable<z.ZodNumber>;
    exactLongitude: z.ZodNullable<z.ZodNumber>;
}, z.core.$strip>;
export type BookingLocationDisclosure = z.infer<typeof BookingLocationDisclosureSchema>;
export declare const BookingDetailSchema: z.ZodObject<{
    id: z.ZodString;
    referenceCode: z.ZodString;
    travellerUserId: z.ZodString;
    travellerDisplayName: z.ZodOptional<z.ZodString>;
    travellerEmailMasked: z.ZodOptional<z.ZodString>;
    businessId: z.ZodString;
    businessName: z.ZodOptional<z.ZodString>;
    locationId: z.ZodString;
    bookingMode: z.ZodEnum<{
        INSTANT: "INSTANT";
        HOST_APPROVAL: "HOST_APPROVAL";
    }>;
    status: z.ZodEnum<{
        REJECTED: "REJECTED";
        CONFIRMED: "CONFIRMED";
        EXPIRED: "EXPIRED";
        PENDING_HOST_APPROVAL: "PENDING_HOST_APPROVAL";
        PENDING_PAYMENT: "PENDING_PAYMENT";
        IN_STORAGE: "IN_STORAGE";
        COMPLETED: "COMPLETED";
        CANCELLED_BY_TRAVELLER: "CANCELLED_BY_TRAVELLER";
        CANCELLED_BY_HOST: "CANCELLED_BY_HOST";
        CANCELLED_BY_PLATFORM: "CANCELLED_BY_PLATFORM";
        DISPUTED: "DISPUTED";
    }>;
    dropOffAt: z.ZodString;
    collectionAt: z.ZodString;
    totalBags: z.ZodNumber;
    totalCapacityUnits: z.ZodNumber;
    currency: z.ZodString;
    totalAmountMinor: z.ZodNumber;
    holdExpiresAt: z.ZodNullable<z.ZodString>;
    confirmedAt: z.ZodNullable<z.ZodString>;
    checkedInAt: z.ZodNullable<z.ZodString>;
    completedAt: z.ZodNullable<z.ZodString>;
    cancelledAt: z.ZodNullable<z.ZodString>;
    cancellationReason: z.ZodNullable<z.ZodString>;
    hostRejectionReason: z.ZodNullable<z.ZodString>;
    exceptionReason: z.ZodNullable<z.ZodString>;
    travellerNotes: z.ZodNullable<z.ZodString>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    location: z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        city: z.ZodString;
        countryCode: z.ZodString;
        timezone: z.ZodString;
        approximateArea: z.ZodString;
        approximateLatitude: z.ZodNumber;
        approximateLongitude: z.ZodNumber;
        addressDisclosed: z.ZodBoolean;
        addressLine1: z.ZodNullable<z.ZodString>;
        addressLine2: z.ZodNullable<z.ZodString>;
        postalCode: z.ZodNullable<z.ZodString>;
        directionsNotes: z.ZodNullable<z.ZodString>;
        exactLatitude: z.ZodNullable<z.ZodNumber>;
        exactLongitude: z.ZodNullable<z.ZodNumber>;
    }, z.core.$strip>;
    items: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        bookingId: z.ZodString;
        bagCategory: z.ZodEnum<{
            BAG_SMALL: "BAG_SMALL";
            BAG_MEDIUM: "BAG_MEDIUM";
            BAG_LARGE: "BAG_LARGE";
            BAG_OVERSIZED: "BAG_OVERSIZED";
        }>;
        quantity: z.ZodNumber;
        capacityUnits: z.ZodNumber;
        unitRateMinor: z.ZodNumber;
        lineTotalMinor: z.ZodNumber;
    }, z.core.$strip>>;
    pricingSnapshot: z.ZodNullable<z.ZodObject<{
        id: z.ZodString;
        bookingId: z.ZodString;
        policyId: z.ZodNullable<z.ZodString>;
        currency: z.ZodString;
        currencyExponent: z.ZodNumber;
        pricingUnit: z.ZodEnum<{
            CALENDAR_DAY: "CALENDAR_DAY";
            "24_HOUR_BLOCK": "24_HOUR_BLOCK";
        }>;
        baseRateMinor: z.ZodNumber;
        durationUnits: z.ZodNumber;
        itemsBreakdown: z.ZodArray<z.ZodObject<{
            bagCategory: z.ZodEnum<{
                BAG_SMALL: "BAG_SMALL";
                BAG_MEDIUM: "BAG_MEDIUM";
                BAG_LARGE: "BAG_LARGE";
                BAG_OVERSIZED: "BAG_OVERSIZED";
            }>;
            quantity: z.ZodNumber;
            capacityUnits: z.ZodNumber;
            unitRateMinor: z.ZodNumber;
            durationUnits: z.ZodNumber;
            lineTotalMinor: z.ZodNumber;
        }, z.core.$strip>>;
        grossStorageMinor: z.ZodNumber;
        discountMinor: z.ZodNumber;
        storageSubtotalMinor: z.ZodNumber;
        commissionRateBps: z.ZodOptional<z.ZodNumber>;
        platformCommissionMinor: z.ZodOptional<z.ZodNumber>;
        hostPayableMinor: z.ZodOptional<z.ZodNumber>;
        taxRateBps: z.ZodNumber;
        taxAmountMinor: z.ZodNumber;
        totalAmountMinor: z.ZodNumber;
        cancellationPolicyCode: z.ZodString;
        createdAt: z.ZodString;
    }, z.core.$strip>>;
    paymentSummary: z.ZodNullable<z.ZodObject<{
        intentId: z.ZodNullable<z.ZodString>;
        provider: z.ZodNullable<z.ZodString>;
        providerOrderId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        status: z.ZodString;
        amountMinor: z.ZodNumber;
        verifiedAt: z.ZodNullable<z.ZodString>;
        failureReason: z.ZodNullable<z.ZodString>;
    }, z.core.$strip>>;
    refundSummary: z.ZodNullable<z.ZodObject<{
        refundId: z.ZodString;
        amountMinor: z.ZodNumber;
        refundPercentage: z.ZodNumber;
        status: z.ZodString;
        reasonCategory: z.ZodString;
    }, z.core.$strip>>;
    custodySummary: z.ZodNullable<z.ZodObject<{
        custodyRecordId: z.ZodString;
        status: z.ZodString;
        expectedBagCount: z.ZodNumber;
        checkedInBagCount: z.ZodNullable<z.ZodNumber>;
        releasedBagCount: z.ZodNullable<z.ZodNumber>;
        checkInAt: z.ZodNullable<z.ZodString>;
        checkOutAt: z.ZodNullable<z.ZodString>;
        handoverCondition: z.ZodString;
        overdueMinutes: z.ZodNumber;
        overdueFeeMinor: z.ZodNumber;
    }, z.core.$strip>>;
    statusHistory: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        bookingId: z.ZodString;
        previousStatus: z.ZodNullable<z.ZodEnum<{
            REJECTED: "REJECTED";
            CONFIRMED: "CONFIRMED";
            EXPIRED: "EXPIRED";
            PENDING_HOST_APPROVAL: "PENDING_HOST_APPROVAL";
            PENDING_PAYMENT: "PENDING_PAYMENT";
            IN_STORAGE: "IN_STORAGE";
            COMPLETED: "COMPLETED";
            CANCELLED_BY_TRAVELLER: "CANCELLED_BY_TRAVELLER";
            CANCELLED_BY_HOST: "CANCELLED_BY_HOST";
            CANCELLED_BY_PLATFORM: "CANCELLED_BY_PLATFORM";
            DISPUTED: "DISPUTED";
        }>>;
        newStatus: z.ZodEnum<{
            REJECTED: "REJECTED";
            CONFIRMED: "CONFIRMED";
            EXPIRED: "EXPIRED";
            PENDING_HOST_APPROVAL: "PENDING_HOST_APPROVAL";
            PENDING_PAYMENT: "PENDING_PAYMENT";
            IN_STORAGE: "IN_STORAGE";
            COMPLETED: "COMPLETED";
            CANCELLED_BY_TRAVELLER: "CANCELLED_BY_TRAVELLER";
            CANCELLED_BY_HOST: "CANCELLED_BY_HOST";
            CANCELLED_BY_PLATFORM: "CANCELLED_BY_PLATFORM";
            DISPUTED: "DISPUTED";
        }>;
        actorUserId: z.ZodNullable<z.ZodString>;
        actorRole: z.ZodString;
        reason: z.ZodNullable<z.ZodString>;
        metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        createdAt: z.ZodString;
    }, z.core.$strip>>>;
}, z.core.$strip>;
export type BookingDetail = z.infer<typeof BookingDetailSchema>;
export declare const BookingListQuerySchema: z.ZodObject<{
    status: z.ZodOptional<z.ZodEnum<{
        REJECTED: "REJECTED";
        CONFIRMED: "CONFIRMED";
        EXPIRED: "EXPIRED";
        PENDING_HOST_APPROVAL: "PENDING_HOST_APPROVAL";
        PENDING_PAYMENT: "PENDING_PAYMENT";
        IN_STORAGE: "IN_STORAGE";
        COMPLETED: "COMPLETED";
        CANCELLED_BY_TRAVELLER: "CANCELLED_BY_TRAVELLER";
        CANCELLED_BY_HOST: "CANCELLED_BY_HOST";
        CANCELLED_BY_PLATFORM: "CANCELLED_BY_PLATFORM";
        DISPUTED: "DISPUTED";
    }>>;
    locationId: z.ZodOptional<z.ZodString>;
    businessId: z.ZodOptional<z.ZodString>;
    search: z.ZodOptional<z.ZodString>;
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
}, z.core.$strip>;
export type BookingListQuery = z.infer<typeof BookingListQuerySchema>;
//# sourceMappingURL=index.d.ts.map