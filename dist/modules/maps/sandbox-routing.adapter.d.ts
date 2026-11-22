import type { GeocodingQuery, GeocodingResponse, GeocodingResult, GeographicCoordinate, ReverseGeocodingQuery, RouteRequest, RouteResult } from "@luggage-storage/contracts";
import type { GeocodingPort, RoutingPort } from "./routing.port.js";
export declare function calculateHaversineDistanceMeters(start: GeographicCoordinate, end: GeographicCoordinate): number;
export declare class SandboxRoutingAdapter implements RoutingPort, GeocodingPort {
    readonly providerName = "sandbox";
    calculateRoute(request: RouteRequest): Promise<RouteResult>;
    searchPlaces(query: GeocodingQuery): Promise<GeocodingResponse>;
    reverseGeocode(query: ReverseGeocodingQuery): Promise<GeocodingResult | null>;
    private getBearingDirection;
}
//# sourceMappingURL=sandbox-routing.adapter.d.ts.map