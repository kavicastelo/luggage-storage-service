import type { GeocodingQuery, GeocodingResponse, GeocodingResult, ReverseGeocodingQuery, RouteRequest, RouteResult } from "@luggage-storage/contracts";
import type { GeocodingPort, RoutingPort } from "./routing.port.js";
export declare class MapTilerRoutingAdapter implements RoutingPort, GeocodingPort {
    private readonly apiKey?;
    readonly providerName = "maptiler";
    private readonly sandbox;
    constructor(apiKey?: string | undefined);
    calculateRoute(request: RouteRequest): Promise<RouteResult>;
    searchPlaces(query: GeocodingQuery): Promise<GeocodingResponse>;
    reverseGeocode(query: ReverseGeocodingQuery): Promise<GeocodingResult | null>;
    private mapManeuverType;
}
//# sourceMappingURL=maptiler-routing.adapter.d.ts.map