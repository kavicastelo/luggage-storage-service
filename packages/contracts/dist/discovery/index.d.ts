import { z } from "zod";
export declare const DISCOVERY_SORT_OPTIONS: readonly ["distance", "price_asc", "price_desc", "newest"];
export type DiscoverySortOption = (typeof DISCOVERY_SORT_OPTIONS)[number];
export declare const SearchLocationsQuerySchema: z.ZodObject<{
    latitude: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    longitude: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    radiusMeters: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    city: z.ZodOptional<z.ZodString>;
    searchTerm: z.ZodOptional<z.ZodString>;
    amenities: z.ZodPipe<z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>, z.ZodTransform<string[], string | string[] | undefined>>;
    acceptsOversized: z.ZodPipe<z.ZodOptional<z.ZodUnion<readonly [z.ZodBoolean, z.ZodString]>>, z.ZodTransform<boolean | undefined, string | boolean | undefined>>;
    sortBy: z.ZodOptional<z.ZodEnum<{
        distance: "distance";
        price_asc: "price_asc";
        price_desc: "price_desc";
        newest: "newest";
    }>>;
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
}, z.core.$strip>;
export type SearchLocationsQueryInput = z.input<typeof SearchLocationsQuerySchema>;
export type SearchLocationsQuery = z.infer<typeof SearchLocationsQuerySchema>;
export type SearchLocationsQueryParsed = z.infer<typeof SearchLocationsQuerySchema>;
export declare const SearchLocationsResponseSchema: z.ZodObject<{
    locations: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        city: z.ZodString;
        countryCode: z.ZodString;
        approximateArea: z.ZodString;
        approximateLatitude: z.ZodNumber;
        approximateLongitude: z.ZodNumber;
        distanceMeters: z.ZodOptional<z.ZodNumber>;
        timezone: z.ZodString;
        bookingMode: z.ZodEnum<{
            INSTANT: "INSTANT";
            HOST_APPROVAL: "HOST_APPROVAL";
        }>;
        acceptsOversized: z.ZodBoolean;
        amenities: z.ZodArray<z.ZodString>;
        status: z.ZodLiteral<"ACTIVE">;
        primaryImageUrl: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        images: z.ZodDefault<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            url: z.ZodString;
            caption: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            isPrimary: z.ZodBoolean;
            sortOrder: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strip>>>;
        baseRateMinor: z.ZodOptional<z.ZodNumber>;
        currency: z.ZodDefault<z.ZodString>;
        averageRating: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
        reviewCount: z.ZodDefault<z.ZodNumber>;
        is24Hours: z.ZodDefault<z.ZodBoolean>;
        operatingHoursStatus: z.ZodDefault<z.ZodEnum<{
            CONFIGURED: "CONFIGURED";
            UNCONFIGURED: "UNCONFIGURED";
            PARTIAL: "PARTIAL";
            CLOSED: "CLOSED";
            OPEN_24_HOURS: "OPEN_24_HOURS";
        }>>;
        operatingHoursSummary: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    }, z.core.$strip>>;
    pagination: z.ZodObject<{
        page: z.ZodNumber;
        limit: z.ZodNumber;
        total: z.ZodNumber;
        totalPages: z.ZodNumber;
    }, z.core.$strip>;
}, z.core.$strip>;
export type SearchLocationsResponse = z.infer<typeof SearchLocationsResponseSchema>;
export declare const PublicLocationOpeningHourSchema: z.ZodObject<{
    dayOfWeek: z.ZodNumber;
    openTime: z.ZodString;
    closeTime: z.ZodString;
    allowsDropoff: z.ZodBoolean;
    allowsCollection: z.ZodBoolean;
    isClosed: z.ZodBoolean;
}, z.core.$strip>;
export type PublicLocationOpeningHour = z.infer<typeof PublicLocationOpeningHourSchema>;
export declare const PublicLocationExceptionSchema: z.ZodObject<{
    exceptionDate: z.ZodString;
    exceptionType: z.ZodEnum<{
        CLOSURE: "CLOSURE";
        SPECIAL_HOURS: "SPECIAL_HOURS";
    }>;
    openTime: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    closeTime: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    reason: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
export type PublicLocationException = z.infer<typeof PublicLocationExceptionSchema>;
export declare const PublicLocationPricingTierSchema: z.ZodObject<{
    bagCategory: z.ZodEnum<{
        BAG_SMALL: "BAG_SMALL";
        BAG_MEDIUM: "BAG_MEDIUM";
        BAG_LARGE: "BAG_LARGE";
        BAG_OVERSIZED: "BAG_OVERSIZED";
    }>;
    rateMinor: z.ZodNumber;
    categoryMultiplierBps: z.ZodNumber;
}, z.core.$strip>;
export type PublicLocationPricingTier = z.infer<typeof PublicLocationPricingTierSchema>;
export declare const PublicLocationPricingPolicySchema: z.ZodObject<{
    currency: z.ZodString;
    pricingUnit: z.ZodEnum<{
        CALENDAR_DAY: "CALENDAR_DAY";
        "24_HOUR_BLOCK": "24_HOUR_BLOCK";
    }>;
    baseRateMinor: z.ZodNumber;
    tierRates: z.ZodArray<z.ZodObject<{
        bagCategory: z.ZodEnum<{
            BAG_SMALL: "BAG_SMALL";
            BAG_MEDIUM: "BAG_MEDIUM";
            BAG_LARGE: "BAG_LARGE";
            BAG_OVERSIZED: "BAG_OVERSIZED";
        }>;
        rateMinor: z.ZodNumber;
        categoryMultiplierBps: z.ZodNumber;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type PublicLocationPricingPolicy = z.infer<typeof PublicLocationPricingPolicySchema>;
export declare const PublicLocationCapacitySummarySchema: z.ZodObject<{
    activePoolCount: z.ZodNumber;
    totalMaxCapacityUnits: z.ZodNumber;
    supportedBagCategories: z.ZodArray<z.ZodEnum<{
        BAG_SMALL: "BAG_SMALL";
        BAG_MEDIUM: "BAG_MEDIUM";
        BAG_LARGE: "BAG_LARGE";
        BAG_OVERSIZED: "BAG_OVERSIZED";
    }>>;
}, z.core.$strip>;
export type PublicLocationCapacitySummary = z.infer<typeof PublicLocationCapacitySummarySchema>;
export declare const PublicStorageLocationDetailSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    city: z.ZodString;
    countryCode: z.ZodString;
    approximateArea: z.ZodString;
    approximateLatitude: z.ZodNumber;
    approximateLongitude: z.ZodNumber;
    distanceMeters: z.ZodOptional<z.ZodNumber>;
    timezone: z.ZodString;
    bookingMode: z.ZodEnum<{
        INSTANT: "INSTANT";
        HOST_APPROVAL: "HOST_APPROVAL";
    }>;
    acceptsOversized: z.ZodBoolean;
    amenities: z.ZodArray<z.ZodString>;
    status: z.ZodLiteral<"ACTIVE">;
    primaryImageUrl: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    images: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        url: z.ZodString;
        caption: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        isPrimary: z.ZodBoolean;
        sortOrder: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>>>;
    baseRateMinor: z.ZodOptional<z.ZodNumber>;
    currency: z.ZodDefault<z.ZodString>;
    averageRating: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
    reviewCount: z.ZodDefault<z.ZodNumber>;
    is24Hours: z.ZodDefault<z.ZodBoolean>;
    operatingHoursStatus: z.ZodDefault<z.ZodEnum<{
        CONFIGURED: "CONFIGURED";
        UNCONFIGURED: "UNCONFIGURED";
        PARTIAL: "PARTIAL";
        CLOSED: "CLOSED";
        OPEN_24_HOURS: "OPEN_24_HOURS";
    }>>;
    operatingHoursSummary: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    openingHours: z.ZodArray<z.ZodObject<{
        dayOfWeek: z.ZodNumber;
        openTime: z.ZodString;
        closeTime: z.ZodString;
        allowsDropoff: z.ZodBoolean;
        allowsCollection: z.ZodBoolean;
        isClosed: z.ZodBoolean;
    }, z.core.$strip>>;
    upcomingExceptions: z.ZodArray<z.ZodObject<{
        exceptionDate: z.ZodString;
        exceptionType: z.ZodEnum<{
            CLOSURE: "CLOSURE";
            SPECIAL_HOURS: "SPECIAL_HOURS";
        }>;
        openTime: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        closeTime: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        reason: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$strip>>;
    pricingPolicy: z.ZodNullable<z.ZodObject<{
        currency: z.ZodString;
        pricingUnit: z.ZodEnum<{
            CALENDAR_DAY: "CALENDAR_DAY";
            "24_HOUR_BLOCK": "24_HOUR_BLOCK";
        }>;
        baseRateMinor: z.ZodNumber;
        tierRates: z.ZodArray<z.ZodObject<{
            bagCategory: z.ZodEnum<{
                BAG_SMALL: "BAG_SMALL";
                BAG_MEDIUM: "BAG_MEDIUM";
                BAG_LARGE: "BAG_LARGE";
                BAG_OVERSIZED: "BAG_OVERSIZED";
            }>;
            rateMinor: z.ZodNumber;
            categoryMultiplierBps: z.ZodNumber;
        }, z.core.$strip>>;
    }, z.core.$strip>>;
    capacitySummary: z.ZodObject<{
        activePoolCount: z.ZodNumber;
        totalMaxCapacityUnits: z.ZodNumber;
        supportedBagCategories: z.ZodArray<z.ZodEnum<{
            BAG_SMALL: "BAG_SMALL";
            BAG_MEDIUM: "BAG_MEDIUM";
            BAG_LARGE: "BAG_LARGE";
            BAG_OVERSIZED: "BAG_OVERSIZED";
        }>>;
    }, z.core.$strip>;
}, z.core.$strip>;
export type PublicStorageLocationDetail = z.infer<typeof PublicStorageLocationDetailSchema>;
//# sourceMappingURL=index.d.ts.map