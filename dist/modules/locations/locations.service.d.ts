import { CreateLocationRequest, UpdateLocationRequest, StorageLocation, OpeningHourItemInput, OpeningHours, CreateOpeningHoursExceptionRequest, OpeningHoursException, CreateStorageZoneRequest, UpdateStorageZoneRequest, StorageZone, AddLocationMediaRequest, UpdateLocationMediaRequest, LocationMedia, ReviewLocationRequest, LocationModerationQueueItem, LocationModerationQueueQuery } from "@luggage-storage/contracts";
import { schema } from "../../infrastructure/database/drizzle.js";
export interface LocationCallerContext {
    userId: string;
    roles: string[];
    clientInfo?: {
        ip?: string;
        userAgent?: string;
        correlationId?: string;
    };
}
export declare class LocationsService {
    /**
     * Creates a new storage location under an owned Host Business.
     * Auto-provisions default 7-day opening hours, default shared capacity pool, and initial pricing policy.
     */
    createLocation(request: CreateLocationRequest, context: LocationCallerContext): Promise<StorageLocation>;
    /**
     * Retrieves all storage locations owned by businesses belonging to the caller
     * or assigned to the caller as active host staff.
     */
    getOwnedLocations(context: LocationCallerContext): Promise<StorageLocation[]>;
    private assertLocationOwnerOrSuperadmin;
    /**
     * Retrieves full location details with sub-entities, enforcing ownership, staff assignment, or admin read privileges.
     */
    getLocationById(locationId: string, context: LocationCallerContext): Promise<StorageLocation>;
    /**
     * Updates basic details and coordinates of an owned storage location.
     */
    updateLocation(locationId: string, request: UpdateLocationRequest, context: LocationCallerContext): Promise<StorageLocation>;
    /**
     * Submits a storage location for Superadmin moderation.
     * Invariant: The owning Host Business must be in ACTIVE status before submitting locations!
     */
    submitLocationForReview(locationId: string, context: LocationCallerContext): Promise<StorageLocation>;
    /**
     * Disables an active or pending location.
     */
    disableLocation(locationId: string, context: LocationCallerContext): Promise<StorageLocation>;
    /**
     * Sets weekly recurring opening hours for a storage location.
     */
    setOpeningHours(locationId: string, schedules: OpeningHourItemInput[], context: LocationCallerContext): Promise<void>;
    /**
     * Creates an opening hour exception (holiday closure, special hours).
     */
    addOpeningHoursException(locationId: string, request: CreateOpeningHoursExceptionRequest, context: LocationCallerContext): Promise<OpeningHoursException>;
    /**
     * Retrieves weekly recurring opening hours for a location.
     */
    getOpeningHours(locationId: string, context: LocationCallerContext): Promise<OpeningHours[]>;
    /**
     * Retrieves date-specific opening hours exceptions for a location.
     */
    getOpeningHoursExceptions(locationId: string, context: LocationCallerContext): Promise<OpeningHoursException[]>;
    /**
     * Deletes an opening hour exception from a location.
     */
    deleteOpeningHoursException(locationId: string, exceptionId: string, context: LocationCallerContext): Promise<void>;
    /**
     * Retrieves storage zones for a location.
     */
    getStorageZones(locationId: string, context: LocationCallerContext): Promise<StorageZone[]>;
    /**
     * Adds a storage zone to a location.
     */
    createStorageZone(locationId: string, request: CreateStorageZoneRequest, context: LocationCallerContext): Promise<typeof schema.storageZones.$inferSelect>;
    /**
     * Links an uploaded media item to a storage location.
     */
    addLocationMedia(locationId: string, request: AddLocationMediaRequest, context: LocationCallerContext): Promise<typeof schema.locationMedia.$inferSelect>;
    /**
     * Updates an existing storage zone (rejects deactivation when active custody exists).
     */
    updateStorageZone(locationId: string, zoneId: string, request: UpdateStorageZoneRequest, context: LocationCallerContext): Promise<StorageZone>;
    /**
     * Deletes a storage zone (rejects when active custody holds bags in the zone).
     */
    deleteStorageZone(locationId: string, zoneId: string, context: LocationCallerContext): Promise<void>;
    /**
     * Lists media items attached to a storage location.
     */
    getLocationMedia(locationId: string, context: LocationCallerContext): Promise<LocationMedia[]>;
    /**
     * Updates media item metadata or atomically sets it as the primary location photo.
     */
    updateLocationMedia(locationId: string, mediaId: string, request: UpdateLocationMediaRequest, context: LocationCallerContext): Promise<LocationMedia>;
    /**
     * Deletes a media item from a location (promoting another image if primary was deleted).
     */
    deleteLocationMedia(locationId: string, mediaId: string, context: LocationCallerContext): Promise<void>;
    private assertLocationReadAccess;
    private assertActiveCustodyFreeForZone;
    private formatStorageZone;
    private formatLocationMedia;
    /**
     * Retrieves storage locations for Superadmin/Support moderation queue (defaults to PENDING_REVIEW).
     */
    getPendingLocationsQueue(limit?: number, offset?: number, status?: LocationModerationQueueQuery["status"]): Promise<{
        queue: LocationModerationQueueItem[];
        total: number;
    }>;
    /**
     * Superadmin reviews and approves or rejects a storage location listing.
     * Invariant: A host owner cannot approve their own location listing!
     */
    reviewLocation(locationId: string, review: ReviewLocationRequest, context: LocationCallerContext): Promise<StorageLocation>;
}
export declare const locationsService: LocationsService;
//# sourceMappingURL=locations.service.d.ts.map