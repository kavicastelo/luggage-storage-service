import { PublicStorageLocationDetail, SearchLocationsQueryInput, SearchLocationsResponse } from "@luggage-storage/contracts";
export declare class DiscoveryService {
    private resolvePublicImageUrl;
    /**
     * Performs public location discovery with PostGIS spatial indexing.
     * Strictly enforces OQ-012 location privacy: exact address, building number, and exact
     * coordinates are NEVER exposed in public discovery responses.
     */
    searchLocations(rawQuery: SearchLocationsQueryInput): Promise<SearchLocationsResponse>;
    /**
     * Retrieves single public storage location details including weekly hours,
     * upcoming schedule exceptions, active bag pricing tiers, and coarse capacity.
     * Strictly enforces OQ-012 privacy: exact address and entrance coordinates are omitted.
     */
    getPublicLocationDetails(locationId: string): Promise<PublicStorageLocationDetail>;
}
export declare const discoveryService: DiscoveryService;
//# sourceMappingURL=discovery.service.d.ts.map