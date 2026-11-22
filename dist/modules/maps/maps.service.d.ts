import type { GeocodingQuery, GeocodingResponse, GeocodingResult, ReverseGeocodingQuery, RouteRequest, RouteResult } from "@luggage-storage/contracts";
export declare class MapsService {
    private readonly routingAdapter;
    private readonly geocodingAdapter;
    constructor(configOverride?: {
        NODE_ENV?: string;
        APP_ENV?: string;
        MAPS_PROVIDER?: string;
        MAPTILER_API_KEY?: string;
    });
    calculateRoute(request: RouteRequest): Promise<RouteResult>;
    searchPlaces(query: GeocodingQuery): Promise<GeocodingResponse>;
    reverseGeocode(query: ReverseGeocodingQuery): Promise<GeocodingResult | null>;
}
export declare const mapsService: MapsService;
//# sourceMappingURL=maps.service.d.ts.map