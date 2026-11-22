import { BagCategory, BookingBagItemInput, BookingQuoteRequest, BookingQuoteResponse, AvailabilitySearchQuery } from "@luggage-storage/contracts";
interface LocalDateTimeParts {
    dateStr: string;
    timeStr: string;
    isoDayOfWeek: number;
}
/**
 * Converts a UTC Date into location-local calendar date, 24h time string, and ISO day of week (1=Mon..7=Sun).
 */
export declare function getLocalDateTimeParts(date: Date, timeZone: string): LocalDateTimeParts;
/**
 * Normalizes duplicate bag category entries in a request by summing quantities.
 */
export declare function consolidateBagItems(items: BookingBagItemInput[]): BookingBagItemInput[];
export interface PoolAllocationPlan {
    poolId: string;
    bagCategory: BagCategory;
    unitsReserved: number;
}
export declare class QuotationAndAvailabilityService {
    private expireLockedBookingsInTx;
    /**
     * Expires a single booking whose bookings row is ALREADY locked FOR UPDATE in the current transaction.
     * Respects canonical Tier 2 (bookings) -> Tier 3 (payment_intents ORDER BY id ASC) lock hierarchy.
     */
    expireSingleBookingHoldInTx(tx: any, bookingId: string, previousStatus: string): Promise<void>;
    /**
     * Sweeps expired booking holds atomically using ORDER BY id ASC FOR UPDATE SKIP LOCKED
     * so concurrent workers/checkouts never deadlock and capacity + open intents expire together.
     */
    sweepExpiredHolds(txOrDb?: any): Promise<number>;
    /**
     * Validates drop-off and collection timestamps against location weekly hours & holiday/special exceptions.
     */
    validateOperatingWindow(txOrDb: any, locationId: string, timezone: string, dropOffAt: Date, collectionAt: Date): Promise<{
        valid: boolean;
        reason: string | null;
    }>;
    /**
     * Computes pool capacity availability (optionally acquiring FOR UPDATE row locks inside a booking transaction).
     */
    evaluateAndPlanCapacity(txOrDb: any, params: {
        locationId: string;
        dropOffAt: Date;
        collectionAt: Date;
        items: BookingBagItemInput[];
        lockPoolsForUpdate: boolean;
    }): Promise<{
        canFulfill: boolean;
        remainingUnitsAfter: number;
        totalRemainingBefore: number;
        allocations: PoolAllocationPlan[];
        reason: string | null;
    }>;
    /**
     * Computes duration units in integer calendar days or 24-hour blocks.
     */
    computeDurationUnits(pricingUnit: "CALENDAR_DAY" | "24_HOUR_BLOCK", dropOffAt: Date, collectionAt: Date, timezone: string): number;
    /**
     * Generates a complete server-side availability & integer minor-unit pricing quotation.
     */
    calculateQuote(rawInput: BookingQuoteRequest, options?: {
        tx?: any;
        lockPoolsForUpdate?: boolean;
    }): Promise<BookingQuoteResponse & {
        businessId: string;
        policyId: string;
        allocations: PoolAllocationPlan[];
        commissionRateBps: number;
        platformCommissionMinor: number;
        hostPayableMinor: number;
    }>;
    /**
     * Availability search across active locations for a specific schedule and bag selection.
     */
    searchAvailability(rawQuery: AvailabilitySearchQuery): Promise<{
        quotes: {
            locationId: string;
            locationName: string;
            bookingMode: "INSTANT" | "HOST_APPROVAL";
            timezone: string;
            available: boolean;
            unavailabilityReason: string | null;
            remainingCapacityUnits: number;
            requestedCapacityUnits: number;
            totalBags: number;
            currency: string;
            currencyExponent: number;
            pricingUnit: "CALENDAR_DAY" | "24_HOUR_BLOCK";
            durationUnits: number;
            baseRateMinor: number;
            items: {
                bagCategory: "BAG_SMALL" | "BAG_MEDIUM" | "BAG_LARGE" | "BAG_OVERSIZED";
                quantity: number;
                capacityUnits: number;
                unitRateMinor: number;
                durationUnits: number;
                lineTotalMinor: number;
            }[];
            grossStorageMinor: number;
            discountMinor: number;
            storageSubtotalMinor: number;
            taxRateBps: number;
            taxAmountMinor: number;
            totalAmountMinor: number;
            cancellationPolicyCode: "STANDARD_FLEX_2H";
            cancellationPolicySummary: string;
            commissionRateBps?: number | undefined;
            platformCommissionMinor?: number | undefined;
            hostPayableMinor?: number | undefined;
        }[];
    }>;
}
export declare const quotationService: QuotationAndAvailabilityService;
export {};
//# sourceMappingURL=quotation-availability.service.d.ts.map