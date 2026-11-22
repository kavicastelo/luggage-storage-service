import { env } from "../../config/env.js";
import { MapTilerRoutingAdapter } from "./maptiler-routing.adapter.js";
import { SandboxRoutingAdapter } from "./sandbox-routing.adapter.js";
export class MapsService {
    routingAdapter;
    geocodingAdapter;
    constructor(configOverride) {
        const activeEnv = configOverride ?? env;
        const isProduction = activeEnv.APP_ENV === "production" || (!activeEnv.APP_ENV && activeEnv.NODE_ENV === "production");
        if (activeEnv.MAPS_PROVIDER === "maptiler" && activeEnv.MAPTILER_API_KEY) {
            const maptiler = new MapTilerRoutingAdapter(activeEnv.MAPTILER_API_KEY);
            this.routingAdapter = maptiler;
            this.geocodingAdapter = maptiler;
        }
        else {
            if (isProduction) {
                throw new Error("MAPS_PROVIDER_INVALID: In production, MAPS_PROVIDER must be 'maptiler' with a valid MAPTILER_API_KEY. Synthetic sandbox routing is strictly prohibited.");
            }
            const sandbox = new SandboxRoutingAdapter();
            this.routingAdapter = sandbox;
            this.geocodingAdapter = sandbox;
        }
    }
    async calculateRoute(request) {
        return this.routingAdapter.calculateRoute(request);
    }
    async searchPlaces(query) {
        return this.geocodingAdapter.searchPlaces(query);
    }
    async reverseGeocode(query) {
        return this.geocodingAdapter.reverseGeocode(query);
    }
}
export const mapsService = new MapsService();
//# sourceMappingURL=maps.service.js.map