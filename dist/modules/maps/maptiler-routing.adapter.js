import { SandboxRoutingAdapter } from "./sandbox-routing.adapter.js";
import { env } from "../../config/env.js";
import { AppError } from "../../common/errors/app-error.js";
const MAPTILER_MODE_MAP = {
    walking: "pedestrian",
    driving: "car",
    cycling: "bicycle"
};
function isProductionMode() {
    if (env.APP_ENV === "production" || process.env.APP_ENV === "production")
        return true;
    if (env.APP_ENV === "demo" || process.env.APP_ENV === "demo")
        return false;
    return env.NODE_ENV === "production" || process.env.NODE_ENV === "production";
}
function decodePolyline(str, precision = 6) {
    let index = 0;
    let lat = 0;
    let lng = 0;
    const coordinates = [];
    const factor = Math.pow(10, precision);
    while (index < str.length) {
        let byte;
        let shift = 0;
        let result = 0;
        do {
            byte = str.charCodeAt(index++) - 63;
            result |= (byte & 0x1f) << shift;
            shift += 5;
        } while (byte >= 0x20);
        const deltaLat = result & 1 ? ~(result >> 1) : result >> 1;
        lat += deltaLat;
        shift = 0;
        result = 0;
        do {
            byte = str.charCodeAt(index++) - 63;
            result |= (byte & 0x1f) << shift;
            shift += 5;
        } while (byte >= 0x20);
        const deltaLng = result & 1 ? ~(result >> 1) : result >> 1;
        lng += deltaLng;
        coordinates.push({ latitude: lat / factor, longitude: lng / factor });
    }
    return coordinates;
}
export class MapTilerRoutingAdapter {
    apiKey;
    providerName = "maptiler";
    sandbox = new SandboxRoutingAdapter();
    constructor(apiKey) {
        this.apiKey = apiKey;
    }
    async calculateRoute(request) {
        if (!this.apiKey) {
            if (isProductionMode()) {
                throw AppError.serviceUnavailable("EXTERNAL_ROUTING_UNAVAILABLE: MAPTILER_API_KEY is not configured in production");
            }
            return this.sandbox.calculateRoute(request);
        }
        try {
            const mode = MAPTILER_MODE_MAP[request.travelMode] || "pedestrian";
            const url = `https://api.maptiler.com/routing/v1/directions?key=${encodeURIComponent(this.apiKey)}`;
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify({
                    locations: [
                        { lon: request.origin.longitude, lat: request.origin.latitude },
                        { lon: request.destination.longitude, lat: request.destination.latitude }
                    ],
                    profile: mode,
                    steps: true,
                    alternatives: request.alternatives ? true : false
                })
            });
            if (!res.ok) {
                if (isProductionMode()) {
                    throw AppError.serviceUnavailable(`EXTERNAL_ROUTING_SERVICE_FAILED: MapTiler returned HTTP ${res.status}`);
                }
                return this.sandbox.calculateRoute(request);
            }
            const data = (await res.json());
            // Handle MapTiler Directions API (v1)
            if (data.route && Array.isArray(data.route.legs) && data.route.legs.length > 0) {
                const totalDistanceMeters = Math.round((data.route.summary?.totalLength || 0) * 1000);
                const totalDurationSeconds = Math.round(data.route.summary?.totalTime || 0);
                const legs = data.route.legs.map((leg) => {
                    const legGeometry = leg.geometry ? decodePolyline(leg.geometry, 6) : [];
                    const legDistanceMeters = Math.round((leg.summary?.totalLength || 0) * 1000);
                    const legDurationSeconds = Math.round(leg.summary?.totalTime || 0);
                    const steps = (leg.steps || []).map((step, idx) => {
                        const maneuverType = this.mapManeuverType(step.maneuver?.type, step.maneuver?.modifier);
                        const stepGeom = legGeometry.length > 0 && step.beginIndex !== undefined && step.endIndex !== undefined
                            ? legGeometry.slice(step.beginIndex, step.endIndex + 1)
                            : undefined;
                        const maneuverLocation = stepGeom?.[0] || request.origin;
                        const maneuver = {
                            type: maneuverType,
                            instruction: step.maneuver?.instruction || "Proceed",
                            distanceMeters: Math.round((step.length || 0) * 1000),
                            durationSeconds: Math.round(step.time || 0),
                            location: maneuverLocation,
                            modifier: step.maneuver?.modifier
                        };
                        return {
                            index: idx,
                            instruction: maneuver.instruction,
                            distanceMeters: maneuver.distanceMeters,
                            durationSeconds: maneuver.durationSeconds,
                            maneuver,
                            geometry: stepGeom
                        };
                    });
                    return {
                        distanceMeters: legDistanceMeters || totalDistanceMeters,
                        durationSeconds: legDurationSeconds || totalDurationSeconds,
                        steps,
                        startLocation: request.origin,
                        endLocation: request.destination
                    };
                });
                const allGeometry = data.route.legs.flatMap((leg) => leg.geometry ? decodePolyline(leg.geometry, 6) : []);
                const alternatives = [];
                if (request.alternatives) {
                    const sandboxRoute = await this.sandbox.calculateRoute(request);
                    if (sandboxRoute.alternatives && sandboxRoute.alternatives.length > 0) {
                        alternatives.push(...sandboxRoute.alternatives);
                    }
                }
                return {
                    routeId: `maptiler-${Date.now()}`,
                    travelMode: request.travelMode,
                    distanceMeters: totalDistanceMeters,
                    durationSeconds: totalDurationSeconds,
                    geometry: allGeometry.length > 0 ? allGeometry : [request.origin, request.destination],
                    legs,
                    alternatives,
                    provider: "maptiler",
                    summary: `MapTiler ${request.travelMode} route (${(totalDistanceMeters / 1000).toFixed(1)} km)`
                };
            }
            // Backward compatibility with OSRM/v2 response shape
            if (data.routes && data.routes.length > 0) {
                const primary = data.routes[0];
                const geometry = (primary.geometry?.coordinates || []).map(([lng, lat]) => ({ latitude: lat, longitude: lng }));
                const legs = (primary.legs || []).map((leg) => {
                    const steps = (leg.steps || []).map((step, idx) => {
                        const maneuverType = this.mapManeuverType(step.maneuver?.type, step.maneuver?.modifier);
                        const maneuverLocation = step.maneuver?.location
                            ? { latitude: step.maneuver.location[1], longitude: step.maneuver.location[0] }
                            : request.origin;
                        const maneuver = {
                            type: maneuverType,
                            instruction: step.maneuver?.instruction || step.name || "Proceed",
                            distanceMeters: Math.round(step.distance || 0),
                            durationSeconds: Math.round(step.duration || 0),
                            location: maneuverLocation,
                            modifier: step.maneuver?.modifier
                        };
                        return {
                            index: idx,
                            instruction: maneuver.instruction,
                            distanceMeters: Math.round(step.distance || 0),
                            durationSeconds: Math.round(step.duration || 0),
                            maneuver,
                            geometry: step.geometry?.coordinates?.map(([lng, lat]) => ({
                                latitude: lat,
                                longitude: lng
                            }))
                        };
                    });
                    return {
                        distanceMeters: Math.round(leg.distance || 0),
                        durationSeconds: Math.round(leg.duration || 0),
                        steps,
                        startLocation: request.origin,
                        endLocation: request.destination
                    };
                });
                const alternatives = data.routes.slice(1).map((alt, idx) => ({
                    id: `alt-${idx + 1}`,
                    summary: `Alternative route ${idx + 1}`,
                    distanceMeters: Math.round(alt.distance || 0),
                    durationSeconds: Math.round(alt.duration || 0),
                    geometry: (alt.geometry?.coordinates || []).map(([lng, lat]) => ({
                        latitude: lat,
                        longitude: lng
                    }))
                }));
                return {
                    routeId: `maptiler-${Date.now()}`,
                    travelMode: request.travelMode,
                    distanceMeters: Math.round(primary.distance || 0),
                    durationSeconds: Math.round(primary.duration || 0),
                    geometry: geometry.length > 0 ? geometry : [request.origin, request.destination],
                    legs,
                    alternatives,
                    provider: "maptiler",
                    summary: `MapTiler ${request.travelMode} route (${Math.round((primary.distance || 0) / 100) / 10} km)`
                };
            }
            if (isProductionMode()) {
                throw AppError.serviceUnavailable("EXTERNAL_ROUTING_NO_ROUTES: No route found between coordinates");
            }
            return this.sandbox.calculateRoute(request);
        }
        catch (err) {
            if (isProductionMode()) {
                if (err instanceof AppError)
                    throw err;
                throw AppError.serviceUnavailable(`EXTERNAL_ROUTING_ERROR: ${err instanceof Error ? err.message : "MapTiler request failed"}`);
            }
            return this.sandbox.calculateRoute(request);
        }
    }
    async searchPlaces(query) {
        if (!this.apiKey) {
            if (isProductionMode()) {
                throw AppError.serviceUnavailable("EXTERNAL_GEOCODING_UNAVAILABLE: MAPTILER_API_KEY is not configured in production");
            }
            return this.sandbox.searchPlaces(query);
        }
        try {
            const url = `https://api.maptiler.com/geocoding/${encodeURIComponent(query.query)}.json?key=${encodeURIComponent(this.apiKey)}&limit=${query.limit}&country=lk`;
            const res = await fetch(url, { headers: { Accept: "application/json" } });
            if (!res.ok) {
                if (isProductionMode()) {
                    throw AppError.serviceUnavailable(`EXTERNAL_GEOCODING_FAILED: MapTiler returned HTTP ${res.status}`);
                }
                return this.sandbox.searchPlaces(query);
            }
            const data = (await res.json());
            if (!data.features || data.features.length === 0) {
                if (isProductionMode()) {
                    return { results: [] };
                }
                return this.sandbox.searchPlaces(query);
            }
            const results = data.features.map((f) => {
                const cityContext = f.context?.find((c) => c.id.startsWith("municipality.")) ||
                    f.context?.find((c) => c.id.startsWith("place."));
                const cityName = cityContext?.text?.replace(/\s+\d+$/, "") || "";
                const placeName = cityName && !f.text.toLowerCase().includes(cityName.toLowerCase())
                    ? `${cityName} ${f.text}`
                    : f.text;
                return {
                    id: f.id,
                    placeName,
                    address: f.place_name,
                    city: cityName || undefined,
                    coordinate: { latitude: f.center[1], longitude: f.center[0] },
                    relevance: f.relevance
                };
            });
            return { results };
        }
        catch (err) {
            if (isProductionMode()) {
                if (err instanceof AppError)
                    throw err;
                throw AppError.serviceUnavailable(`EXTERNAL_GEOCODING_ERROR: ${err instanceof Error ? err.message : "MapTiler request failed"}`);
            }
            return this.sandbox.searchPlaces(query);
        }
    }
    async reverseGeocode(query) {
        if (!this.apiKey) {
            if (isProductionMode()) {
                throw AppError.serviceUnavailable("EXTERNAL_GEOCODING_UNAVAILABLE: MAPTILER_API_KEY is not configured in production");
            }
            return this.sandbox.reverseGeocode(query);
        }
        try {
            const url = `https://api.maptiler.com/geocoding/${query.longitude},${query.latitude}.json?key=${encodeURIComponent(this.apiKey)}&limit=1`;
            const res = await fetch(url, { headers: { Accept: "application/json" } });
            if (!res.ok) {
                if (isProductionMode()) {
                    throw AppError.serviceUnavailable(`EXTERNAL_GEOCODING_FAILED: MapTiler returned HTTP ${res.status}`);
                }
                return this.sandbox.reverseGeocode(query);
            }
            const data = (await res.json());
            if (!data.features || data.features.length === 0) {
                if (isProductionMode()) {
                    return null;
                }
                return this.sandbox.reverseGeocode(query);
            }
            const f = data.features[0];
            const cityContext = f.context?.find((c) => c.id.startsWith("municipality.")) ||
                f.context?.find((c) => c.id.startsWith("place."));
            const cityName = cityContext?.text?.replace(/\s+\d+$/, "") || "";
            const placeName = cityName && !f.text.toLowerCase().includes(cityName.toLowerCase())
                ? `${cityName} ${f.text}`
                : f.text;
            return {
                id: f.id,
                placeName,
                address: f.place_name,
                city: cityName || undefined,
                coordinate: { latitude: f.center[1], longitude: f.center[0] },
                relevance: f.relevance
            };
        }
        catch (err) {
            if (isProductionMode()) {
                if (err instanceof AppError)
                    throw err;
                throw AppError.serviceUnavailable(`EXTERNAL_GEOCODING_ERROR: ${err instanceof Error ? err.message : "MapTiler request failed"}`);
            }
            return this.sandbox.reverseGeocode(query);
        }
    }
    mapManeuverType(type, modifier) {
        if (!type)
            return "CONTINUE";
        const t = type.toLowerCase();
        const m = (modifier || "").toLowerCase();
        if (t === "depart" || t === "start")
            return "DEPART";
        if (t === "arrive" || t === "destination")
            return "ARRIVE";
        if (t === "turn" || t === "end of road") {
            if (m.includes("left"))
                return "TURN_LEFT";
            if (m.includes("right"))
                return "TURN_RIGHT";
            if (m.includes("uturn"))
                return "U_TURN";
        }
        if (t === "fork" || t === "new name") {
            if (m.includes("left"))
                return "SLIGHT_LEFT";
            if (m.includes("right"))
                return "SLIGHT_RIGHT";
        }
        if (t === "roundabout" || t === "rotary")
            return "ROUNDABOUT";
        return "CONTINUE";
    }
}
//# sourceMappingURL=maptiler-routing.adapter.js.map