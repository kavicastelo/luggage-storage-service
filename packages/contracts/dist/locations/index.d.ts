import { z } from "zod";
export declare const LOCATION_STATUSES: readonly ["DRAFT", "PENDING_REVIEW", "ACTIVE", "DISABLED", "REJECTED"];
export type LocationStatus = (typeof LOCATION_STATUSES)[number];
export declare const BOOKING_MODES: readonly ["INSTANT", "HOST_APPROVAL"];
export type BookingMode = (typeof BOOKING_MODES)[number];
export declare const LOCATION_AMENITIES: readonly ["CCTV", "WIFI", "AIR_CONDITIONING", "GROUND_FLOOR", "SECURITY_SEALS", "LOCKERS", "STAFF_ON_DUTY", "WHEELCHAIR_ACCESSIBLE"];
export type LocationAmenity = (typeof LOCATION_AMENITIES)[number];
export declare const STORAGE_ZONE_TYPES: readonly ["LOCKER", "BACKROOM", "FRONT_DESK", "BASEMENT", "RACK", "OTHER"];
export type StorageZoneType = (typeof STORAGE_ZONE_TYPES)[number];
export declare const STORAGE_SECURITY_TIERS: readonly ["STANDARD", "HIGH_SECURITY"];
export type StorageSecurityTier = (typeof STORAGE_SECURITY_TIERS)[number];
export declare const OPENING_HOURS_EXCEPTION_TYPES: readonly ["CLOSURE", "SPECIAL_HOURS"];
export type OpeningHoursExceptionType = (typeof OPENING_HOURS_EXCEPTION_TYPES)[number];
export declare const LocationMediaSchema: z.ZodObject<{
    id: z.ZodString;
    locationId: z.ZodString;
    fileKey: z.ZodString;
    url: z.ZodString;
    mediaType: z.ZodDefault<z.ZodLiteral<"IMAGE">>;
    caption: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    isPrimary: z.ZodDefault<z.ZodBoolean>;
    sortOrder: z.ZodDefault<z.ZodNumber>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, z.core.$strip>;
export type LocationMedia = z.infer<typeof LocationMediaSchema>;
export declare const StorageZoneSchema: z.ZodObject<{
    id: z.ZodString;
    locationId: z.ZodString;
    name: z.ZodString;
    zoneType: z.ZodEnum<{
        OTHER: "OTHER";
        LOCKER: "LOCKER";
        BACKROOM: "BACKROOM";
        FRONT_DESK: "FRONT_DESK";
        BASEMENT: "BASEMENT";
        RACK: "RACK";
    }>;
    securityTier: z.ZodEnum<{
        STANDARD: "STANDARD";
        HIGH_SECURITY: "HIGH_SECURITY";
    }>;
    isActive: z.ZodBoolean;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, z.core.$strip>;
export type StorageZone = z.infer<typeof StorageZoneSchema>;
export declare const OpeningHoursSchema: z.ZodObject<{
    id: z.ZodString;
    locationId: z.ZodString;
    dayOfWeek: z.ZodNumber;
    openTime: z.ZodString;
    closeTime: z.ZodString;
    allowsDropoff: z.ZodDefault<z.ZodBoolean>;
    allowsCollection: z.ZodDefault<z.ZodBoolean>;
    isClosed: z.ZodDefault<z.ZodBoolean>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, z.core.$strip>;
export type OpeningHours = z.infer<typeof OpeningHoursSchema>;
export declare const OpeningHoursExceptionSchema: z.ZodObject<{
    id: z.ZodString;
    locationId: z.ZodString;
    exceptionDate: z.ZodString;
    exceptionType: z.ZodEnum<{
        CLOSURE: "CLOSURE";
        SPECIAL_HOURS: "SPECIAL_HOURS";
    }>;
    openTime: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    closeTime: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    reason: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, z.core.$strip>;
export type OpeningHoursException = z.infer<typeof OpeningHoursExceptionSchema>;
/**
 * Full storage location entity for Host Owners and Superadmin views.
 * Contains private exact address and exact coordinates.
 */
export declare const StorageLocationSchema: z.ZodObject<{
    id: z.ZodString;
    businessId: z.ZodString;
    name: z.ZodString;
    description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    addressLine1: z.ZodString;
    addressLine2: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    city: z.ZodString;
    postalCode: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    countryCode: z.ZodDefault<z.ZodString>;
    latitude: z.ZodNumber;
    longitude: z.ZodNumber;
    timezone: z.ZodDefault<z.ZodString>;
    bookingMode: z.ZodEnum<{
        INSTANT: "INSTANT";
        HOST_APPROVAL: "HOST_APPROVAL";
    }>;
    acceptsOversized: z.ZodDefault<z.ZodBoolean>;
    amenities: z.ZodDefault<z.ZodArray<z.ZodString>>;
    status: z.ZodEnum<{
        ACTIVE: "ACTIVE";
        DRAFT: "DRAFT";
        REJECTED: "REJECTED";
        PENDING_REVIEW: "PENDING_REVIEW";
        DISABLED: "DISABLED";
    }>;
    rejectionReason: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    adminNotes: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    reviewedBy: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    reviewedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    images: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        locationId: z.ZodString;
        fileKey: z.ZodString;
        url: z.ZodString;
        mediaType: z.ZodDefault<z.ZodLiteral<"IMAGE">>;
        caption: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        isPrimary: z.ZodDefault<z.ZodBoolean>;
        sortOrder: z.ZodDefault<z.ZodNumber>;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
    }, z.core.$strip>>>;
    zones: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        locationId: z.ZodString;
        name: z.ZodString;
        zoneType: z.ZodEnum<{
            OTHER: "OTHER";
            LOCKER: "LOCKER";
            BACKROOM: "BACKROOM";
            FRONT_DESK: "FRONT_DESK";
            BASEMENT: "BASEMENT";
            RACK: "RACK";
        }>;
        securityTier: z.ZodEnum<{
            STANDARD: "STANDARD";
            HIGH_SECURITY: "HIGH_SECURITY";
        }>;
        isActive: z.ZodBoolean;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
    }, z.core.$strip>>>;
    openingHours: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        locationId: z.ZodString;
        dayOfWeek: z.ZodNumber;
        openTime: z.ZodString;
        closeTime: z.ZodString;
        allowsDropoff: z.ZodDefault<z.ZodBoolean>;
        allowsCollection: z.ZodDefault<z.ZodBoolean>;
        isClosed: z.ZodDefault<z.ZodBoolean>;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
    }, z.core.$strip>>>;
    exceptions: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        locationId: z.ZodString;
        exceptionDate: z.ZodString;
        exceptionType: z.ZodEnum<{
            CLOSURE: "CLOSURE";
            SPECIAL_HOURS: "SPECIAL_HOURS";
        }>;
        openTime: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        closeTime: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        reason: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
    }, z.core.$strip>>>;
}, z.core.$strip>;
export type StorageLocation = z.infer<typeof StorageLocationSchema>;
/**
 * Public storage location model strictly protecting address privacy per OQ-012.
 * Never exposes exact street address, building number, or exact coordinates.
 */
export declare const PublicStorageLocationSchema: z.ZodObject<{
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
}, z.core.$strip>;
export type PublicStorageLocation = z.infer<typeof PublicStorageLocationSchema>;
export declare const OPERATING_HOURS_STATUSES: readonly ["CONFIGURED", "UNCONFIGURED", "PARTIAL", "CLOSED", "OPEN_24_HOURS"];
export type OperatingHoursStatus = (typeof OPERATING_HOURS_STATUSES)[number];
export declare const OperatingHoursStatusSchema: z.ZodEnum<{
    CONFIGURED: "CONFIGURED";
    UNCONFIGURED: "UNCONFIGURED";
    PARTIAL: "PARTIAL";
    CLOSED: "CLOSED";
    OPEN_24_HOURS: "OPEN_24_HOURS";
}>;
export interface OpeningHoursSummaryInput {
    dayOfWeek?: number;
    openTime?: string | null;
    closeTime?: string | null;
    isClosed: boolean;
}
export interface OperatingHoursSummaryResult {
    is24Hours: boolean;
    operatingHoursStatus: OperatingHoursStatus;
    operatingHoursSummary: string | null;
}
/**
 * Computes an explicit, non-fabricated operating-hours summary from persisted opening_hours rows.
 */
export declare function summarizeOpeningHours(hours: ReadonlyArray<OpeningHoursSummaryInput>): OperatingHoursSummaryResult;
export declare const CreateLocationRequestSchema: z.ZodObject<{
    businessId: z.ZodString;
    name: z.ZodString;
    description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    addressLine1: z.ZodString;
    addressLine2: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    city: z.ZodString;
    postalCode: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    countryCode: z.ZodDefault<z.ZodString>;
    latitude: z.ZodNumber;
    longitude: z.ZodNumber;
    timezone: z.ZodDefault<z.ZodString>;
    bookingMode: z.ZodDefault<z.ZodEnum<{
        INSTANT: "INSTANT";
        HOST_APPROVAL: "HOST_APPROVAL";
    }>>;
    acceptsOversized: z.ZodDefault<z.ZodBoolean>;
    amenities: z.ZodDefault<z.ZodArray<z.ZodString>>;
}, z.core.$strip>;
export type CreateLocationRequest = z.infer<typeof CreateLocationRequestSchema>;
export declare const UpdateLocationRequestSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    addressLine1: z.ZodOptional<z.ZodString>;
    addressLine2: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    city: z.ZodOptional<z.ZodString>;
    postalCode: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    countryCode: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    bookingMode: z.ZodOptional<z.ZodDefault<z.ZodEnum<{
        INSTANT: "INSTANT";
        HOST_APPROVAL: "HOST_APPROVAL";
    }>>>;
    latitude: z.ZodOptional<z.ZodNumber>;
    longitude: z.ZodOptional<z.ZodNumber>;
    timezone: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    acceptsOversized: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    amenities: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodString>>>;
}, z.core.$strip>;
export type UpdateLocationRequest = z.infer<typeof UpdateLocationRequestSchema>;
export declare const OpeningHourItemInputSchema: z.ZodObject<{
    dayOfWeek: z.ZodNumber;
    openTime: z.ZodString;
    closeTime: z.ZodString;
    allowsDropoff: z.ZodDefault<z.ZodBoolean>;
    allowsCollection: z.ZodDefault<z.ZodBoolean>;
    isClosed: z.ZodDefault<z.ZodBoolean>;
}, z.core.$strip>;
export type OpeningHourItemInput = z.infer<typeof OpeningHourItemInputSchema>;
export declare const SetOpeningHoursRequestSchema: z.ZodObject<{
    schedules: z.ZodArray<z.ZodObject<{
        dayOfWeek: z.ZodNumber;
        openTime: z.ZodString;
        closeTime: z.ZodString;
        allowsDropoff: z.ZodDefault<z.ZodBoolean>;
        allowsCollection: z.ZodDefault<z.ZodBoolean>;
        isClosed: z.ZodDefault<z.ZodBoolean>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type SetOpeningHoursRequest = z.infer<typeof SetOpeningHoursRequestSchema>;
export declare const CreateOpeningHoursExceptionRequestSchema: z.ZodObject<{
    exceptionDate: z.ZodString;
    exceptionType: z.ZodDefault<z.ZodEnum<{
        CLOSURE: "CLOSURE";
        SPECIAL_HOURS: "SPECIAL_HOURS";
    }>>;
    openTime: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    closeTime: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    reason: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
export type CreateOpeningHoursExceptionRequest = z.infer<typeof CreateOpeningHoursExceptionRequestSchema>;
export declare const CreateStorageZoneRequestSchema: z.ZodObject<{
    name: z.ZodString;
    zoneType: z.ZodDefault<z.ZodEnum<{
        OTHER: "OTHER";
        LOCKER: "LOCKER";
        BACKROOM: "BACKROOM";
        FRONT_DESK: "FRONT_DESK";
        BASEMENT: "BASEMENT";
        RACK: "RACK";
    }>>;
    securityTier: z.ZodDefault<z.ZodEnum<{
        STANDARD: "STANDARD";
        HIGH_SECURITY: "HIGH_SECURITY";
    }>>;
    isActive: z.ZodDefault<z.ZodBoolean>;
}, z.core.$strip>;
export type CreateStorageZoneRequest = z.infer<typeof CreateStorageZoneRequestSchema>;
export declare const UpdateStorageZoneRequestSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    zoneType: z.ZodOptional<z.ZodDefault<z.ZodEnum<{
        OTHER: "OTHER";
        LOCKER: "LOCKER";
        BACKROOM: "BACKROOM";
        FRONT_DESK: "FRONT_DESK";
        BASEMENT: "BASEMENT";
        RACK: "RACK";
    }>>>;
    securityTier: z.ZodOptional<z.ZodDefault<z.ZodEnum<{
        STANDARD: "STANDARD";
        HIGH_SECURITY: "HIGH_SECURITY";
    }>>>;
    isActive: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
}, z.core.$strip>;
export type UpdateStorageZoneRequest = z.infer<typeof UpdateStorageZoneRequestSchema>;
export declare const AddLocationMediaRequestSchema: z.ZodObject<{
    fileKey: z.ZodString;
    url: z.ZodString;
    caption: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    isPrimary: z.ZodDefault<z.ZodBoolean>;
    sortOrder: z.ZodDefault<z.ZodNumber>;
}, z.core.$strip>;
export type AddLocationMediaRequest = z.infer<typeof AddLocationMediaRequestSchema>;
export declare const UpdateLocationMediaRequestSchema: z.ZodObject<{
    caption: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    isPrimary: z.ZodOptional<z.ZodBoolean>;
    sortOrder: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export type UpdateLocationMediaRequest = z.infer<typeof UpdateLocationMediaRequestSchema>;
export declare const ReviewLocationRequestSchema: z.ZodObject<{
    decision: z.ZodEnum<{
        APPROVE: "APPROVE";
        REJECT: "REJECT";
    }>;
    rejectionReason: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    adminNotes: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
export type ReviewLocationRequest = z.infer<typeof ReviewLocationRequestSchema>;
export declare const StorageLocationListResponseSchema: z.ZodObject<{
    locations: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        businessId: z.ZodString;
        name: z.ZodString;
        description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        addressLine1: z.ZodString;
        addressLine2: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        city: z.ZodString;
        postalCode: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        countryCode: z.ZodDefault<z.ZodString>;
        latitude: z.ZodNumber;
        longitude: z.ZodNumber;
        timezone: z.ZodDefault<z.ZodString>;
        bookingMode: z.ZodEnum<{
            INSTANT: "INSTANT";
            HOST_APPROVAL: "HOST_APPROVAL";
        }>;
        acceptsOversized: z.ZodDefault<z.ZodBoolean>;
        amenities: z.ZodDefault<z.ZodArray<z.ZodString>>;
        status: z.ZodEnum<{
            ACTIVE: "ACTIVE";
            DRAFT: "DRAFT";
            REJECTED: "REJECTED";
            PENDING_REVIEW: "PENDING_REVIEW";
            DISABLED: "DISABLED";
        }>;
        rejectionReason: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        adminNotes: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        reviewedBy: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        reviewedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
        images: z.ZodDefault<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            locationId: z.ZodString;
            fileKey: z.ZodString;
            url: z.ZodString;
            mediaType: z.ZodDefault<z.ZodLiteral<"IMAGE">>;
            caption: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            isPrimary: z.ZodDefault<z.ZodBoolean>;
            sortOrder: z.ZodDefault<z.ZodNumber>;
            createdAt: z.ZodString;
            updatedAt: z.ZodString;
        }, z.core.$strip>>>;
        zones: z.ZodDefault<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            locationId: z.ZodString;
            name: z.ZodString;
            zoneType: z.ZodEnum<{
                OTHER: "OTHER";
                LOCKER: "LOCKER";
                BACKROOM: "BACKROOM";
                FRONT_DESK: "FRONT_DESK";
                BASEMENT: "BASEMENT";
                RACK: "RACK";
            }>;
            securityTier: z.ZodEnum<{
                STANDARD: "STANDARD";
                HIGH_SECURITY: "HIGH_SECURITY";
            }>;
            isActive: z.ZodBoolean;
            createdAt: z.ZodString;
            updatedAt: z.ZodString;
        }, z.core.$strip>>>;
        openingHours: z.ZodDefault<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            locationId: z.ZodString;
            dayOfWeek: z.ZodNumber;
            openTime: z.ZodString;
            closeTime: z.ZodString;
            allowsDropoff: z.ZodDefault<z.ZodBoolean>;
            allowsCollection: z.ZodDefault<z.ZodBoolean>;
            isClosed: z.ZodDefault<z.ZodBoolean>;
            createdAt: z.ZodString;
            updatedAt: z.ZodString;
        }, z.core.$strip>>>;
        exceptions: z.ZodDefault<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            locationId: z.ZodString;
            exceptionDate: z.ZodString;
            exceptionType: z.ZodEnum<{
                CLOSURE: "CLOSURE";
                SPECIAL_HOURS: "SPECIAL_HOURS";
            }>;
            openTime: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            closeTime: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            reason: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            createdAt: z.ZodString;
            updatedAt: z.ZodString;
        }, z.core.$strip>>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type StorageLocationListResponse = z.infer<typeof StorageLocationListResponseSchema>;
export declare const LocationModerationQueueQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    status: z.ZodOptional<z.ZodEnum<{
        ACTIVE: "ACTIVE";
        DRAFT: "DRAFT";
        REJECTED: "REJECTED";
        PENDING_REVIEW: "PENDING_REVIEW";
        ALL: "ALL";
        DISABLED: "DISABLED";
    }>>;
}, z.core.$strip>;
export type LocationModerationQueueQuery = z.infer<typeof LocationModerationQueueQuerySchema>;
export declare const LocationModerationQueueItemSchema: z.ZodObject<{
    locationId: z.ZodString;
    businessId: z.ZodString;
    businessName: z.ZodString;
    legalBusinessName: z.ZodOptional<z.ZodString>;
    businessStatus: z.ZodOptional<z.ZodString>;
    ownerEmail: z.ZodOptional<z.ZodString>;
    ownerDisplayName: z.ZodOptional<z.ZodString>;
    name: z.ZodString;
    city: z.ZodString;
    addressLine1: z.ZodString;
    status: z.ZodEnum<{
        ACTIVE: "ACTIVE";
        DRAFT: "DRAFT";
        REJECTED: "REJECTED";
        PENDING_REVIEW: "PENDING_REVIEW";
        DISABLED: "DISABLED";
    }>;
    imageCount: z.ZodNumber;
    submittedAt: z.ZodString;
}, z.core.$strip>;
export type LocationModerationQueueItem = z.infer<typeof LocationModerationQueueItemSchema>;
export declare const LocationModerationQueueResponseSchema: z.ZodObject<{
    queue: z.ZodArray<z.ZodObject<{
        locationId: z.ZodString;
        businessId: z.ZodString;
        businessName: z.ZodString;
        legalBusinessName: z.ZodOptional<z.ZodString>;
        businessStatus: z.ZodOptional<z.ZodString>;
        ownerEmail: z.ZodOptional<z.ZodString>;
        ownerDisplayName: z.ZodOptional<z.ZodString>;
        name: z.ZodString;
        city: z.ZodString;
        addressLine1: z.ZodString;
        status: z.ZodEnum<{
            ACTIVE: "ACTIVE";
            DRAFT: "DRAFT";
            REJECTED: "REJECTED";
            PENDING_REVIEW: "PENDING_REVIEW";
            DISABLED: "DISABLED";
        }>;
        imageCount: z.ZodNumber;
        submittedAt: z.ZodString;
    }, z.core.$strip>>;
    total: z.ZodNumber;
}, z.core.$strip>;
export type LocationModerationQueueResponse = z.infer<typeof LocationModerationQueueResponseSchema>;
//# sourceMappingURL=index.d.ts.map