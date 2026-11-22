import { z } from "zod";
export declare const GeographicCoordinateSchema: z.ZodObject<{
    latitude: z.ZodNumber;
    longitude: z.ZodNumber;
}, z.core.$strip>;
export type GeographicCoordinate = z.infer<typeof GeographicCoordinateSchema>;
export declare const MapBoundsSchema: z.ZodObject<{
    minLat: z.ZodNumber;
    maxLat: z.ZodNumber;
    minLng: z.ZodNumber;
    maxLng: z.ZodNumber;
}, z.core.$strip>;
export type MapBounds = z.infer<typeof MapBoundsSchema>;
export declare const MapViewportSchema: z.ZodObject<{
    center: z.ZodObject<{
        latitude: z.ZodNumber;
        longitude: z.ZodNumber;
    }, z.core.$strip>;
    zoom: z.ZodNumber;
    bounds: z.ZodOptional<z.ZodObject<{
        minLat: z.ZodNumber;
        maxLat: z.ZodNumber;
        minLng: z.ZodNumber;
        maxLng: z.ZodNumber;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type MapViewport = z.infer<typeof MapViewportSchema>;
export declare const MapMarkerSchema: z.ZodObject<{
    id: z.ZodString;
    coordinate: z.ZodObject<{
        latitude: z.ZodNumber;
        longitude: z.ZodNumber;
    }, z.core.$strip>;
    title: z.ZodString;
    subtitle: z.ZodOptional<z.ZodString>;
    priceLabel: z.ZodOptional<z.ZodString>;
    isSelected: z.ZodOptional<z.ZodBoolean>;
    category: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type MapMarker = z.infer<typeof MapMarkerSchema>;
export declare const TRAVEL_MODES: readonly ["walking", "driving", "cycling"];
export type TravelMode = (typeof TRAVEL_MODES)[number];
export declare const TravelModeSchema: z.ZodEnum<{
    walking: "walking";
    driving: "driving";
    cycling: "cycling";
}>;
export declare const ROUTE_MANEUVER_TYPES: readonly ["DEPART", "CONTINUE", "TURN_LEFT", "TURN_RIGHT", "SLIGHT_LEFT", "SLIGHT_RIGHT", "SHARP_LEFT", "SHARP_RIGHT", "U_TURN", "ROUNDABOUT", "ARRIVE", "UNKNOWN"];
export type RouteManeuverType = (typeof ROUTE_MANEUVER_TYPES)[number];
export declare const RouteManeuverTypeSchema: z.ZodEnum<{
    UNKNOWN: "UNKNOWN";
    DEPART: "DEPART";
    CONTINUE: "CONTINUE";
    TURN_LEFT: "TURN_LEFT";
    TURN_RIGHT: "TURN_RIGHT";
    SLIGHT_LEFT: "SLIGHT_LEFT";
    SLIGHT_RIGHT: "SLIGHT_RIGHT";
    SHARP_LEFT: "SHARP_LEFT";
    SHARP_RIGHT: "SHARP_RIGHT";
    U_TURN: "U_TURN";
    ROUNDABOUT: "ROUNDABOUT";
    ARRIVE: "ARRIVE";
}>;
export declare const RouteManeuverSchema: z.ZodObject<{
    type: z.ZodEnum<{
        UNKNOWN: "UNKNOWN";
        DEPART: "DEPART";
        CONTINUE: "CONTINUE";
        TURN_LEFT: "TURN_LEFT";
        TURN_RIGHT: "TURN_RIGHT";
        SLIGHT_LEFT: "SLIGHT_LEFT";
        SLIGHT_RIGHT: "SLIGHT_RIGHT";
        SHARP_LEFT: "SHARP_LEFT";
        SHARP_RIGHT: "SHARP_RIGHT";
        U_TURN: "U_TURN";
        ROUNDABOUT: "ROUNDABOUT";
        ARRIVE: "ARRIVE";
    }>;
    instruction: z.ZodString;
    distanceMeters: z.ZodNumber;
    durationSeconds: z.ZodNumber;
    location: z.ZodObject<{
        latitude: z.ZodNumber;
        longitude: z.ZodNumber;
    }, z.core.$strip>;
    modifier: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type RouteManeuver = z.infer<typeof RouteManeuverSchema>;
export declare const RouteStepSchema: z.ZodObject<{
    index: z.ZodNumber;
    instruction: z.ZodString;
    distanceMeters: z.ZodNumber;
    durationSeconds: z.ZodNumber;
    maneuver: z.ZodObject<{
        type: z.ZodEnum<{
            UNKNOWN: "UNKNOWN";
            DEPART: "DEPART";
            CONTINUE: "CONTINUE";
            TURN_LEFT: "TURN_LEFT";
            TURN_RIGHT: "TURN_RIGHT";
            SLIGHT_LEFT: "SLIGHT_LEFT";
            SLIGHT_RIGHT: "SLIGHT_RIGHT";
            SHARP_LEFT: "SHARP_LEFT";
            SHARP_RIGHT: "SHARP_RIGHT";
            U_TURN: "U_TURN";
            ROUNDABOUT: "ROUNDABOUT";
            ARRIVE: "ARRIVE";
        }>;
        instruction: z.ZodString;
        distanceMeters: z.ZodNumber;
        durationSeconds: z.ZodNumber;
        location: z.ZodObject<{
            latitude: z.ZodNumber;
            longitude: z.ZodNumber;
        }, z.core.$strip>;
        modifier: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
    geometry: z.ZodOptional<z.ZodArray<z.ZodObject<{
        latitude: z.ZodNumber;
        longitude: z.ZodNumber;
    }, z.core.$strip>>>;
}, z.core.$strip>;
export type RouteStep = z.infer<typeof RouteStepSchema>;
export declare const RouteLegSchema: z.ZodObject<{
    distanceMeters: z.ZodNumber;
    durationSeconds: z.ZodNumber;
    steps: z.ZodArray<z.ZodObject<{
        index: z.ZodNumber;
        instruction: z.ZodString;
        distanceMeters: z.ZodNumber;
        durationSeconds: z.ZodNumber;
        maneuver: z.ZodObject<{
            type: z.ZodEnum<{
                UNKNOWN: "UNKNOWN";
                DEPART: "DEPART";
                CONTINUE: "CONTINUE";
                TURN_LEFT: "TURN_LEFT";
                TURN_RIGHT: "TURN_RIGHT";
                SLIGHT_LEFT: "SLIGHT_LEFT";
                SLIGHT_RIGHT: "SLIGHT_RIGHT";
                SHARP_LEFT: "SHARP_LEFT";
                SHARP_RIGHT: "SHARP_RIGHT";
                U_TURN: "U_TURN";
                ROUNDABOUT: "ROUNDABOUT";
                ARRIVE: "ARRIVE";
            }>;
            instruction: z.ZodString;
            distanceMeters: z.ZodNumber;
            durationSeconds: z.ZodNumber;
            location: z.ZodObject<{
                latitude: z.ZodNumber;
                longitude: z.ZodNumber;
            }, z.core.$strip>;
            modifier: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>;
        geometry: z.ZodOptional<z.ZodArray<z.ZodObject<{
            latitude: z.ZodNumber;
            longitude: z.ZodNumber;
        }, z.core.$strip>>>;
    }, z.core.$strip>>;
    startLocation: z.ZodObject<{
        latitude: z.ZodNumber;
        longitude: z.ZodNumber;
    }, z.core.$strip>;
    endLocation: z.ZodObject<{
        latitude: z.ZodNumber;
        longitude: z.ZodNumber;
    }, z.core.$strip>;
}, z.core.$strip>;
export type RouteLeg = z.infer<typeof RouteLegSchema>;
export declare const RouteAlternativeSchema: z.ZodObject<{
    id: z.ZodString;
    summary: z.ZodOptional<z.ZodString>;
    distanceMeters: z.ZodNumber;
    durationSeconds: z.ZodNumber;
    geometry: z.ZodArray<z.ZodObject<{
        latitude: z.ZodNumber;
        longitude: z.ZodNumber;
    }, z.core.$strip>>;
    legs: z.ZodOptional<z.ZodArray<z.ZodObject<{
        distanceMeters: z.ZodNumber;
        durationSeconds: z.ZodNumber;
        steps: z.ZodArray<z.ZodObject<{
            index: z.ZodNumber;
            instruction: z.ZodString;
            distanceMeters: z.ZodNumber;
            durationSeconds: z.ZodNumber;
            maneuver: z.ZodObject<{
                type: z.ZodEnum<{
                    UNKNOWN: "UNKNOWN";
                    DEPART: "DEPART";
                    CONTINUE: "CONTINUE";
                    TURN_LEFT: "TURN_LEFT";
                    TURN_RIGHT: "TURN_RIGHT";
                    SLIGHT_LEFT: "SLIGHT_LEFT";
                    SLIGHT_RIGHT: "SLIGHT_RIGHT";
                    SHARP_LEFT: "SHARP_LEFT";
                    SHARP_RIGHT: "SHARP_RIGHT";
                    U_TURN: "U_TURN";
                    ROUNDABOUT: "ROUNDABOUT";
                    ARRIVE: "ARRIVE";
                }>;
                instruction: z.ZodString;
                distanceMeters: z.ZodNumber;
                durationSeconds: z.ZodNumber;
                location: z.ZodObject<{
                    latitude: z.ZodNumber;
                    longitude: z.ZodNumber;
                }, z.core.$strip>;
                modifier: z.ZodOptional<z.ZodString>;
            }, z.core.$strip>;
            geometry: z.ZodOptional<z.ZodArray<z.ZodObject<{
                latitude: z.ZodNumber;
                longitude: z.ZodNumber;
            }, z.core.$strip>>>;
        }, z.core.$strip>>;
        startLocation: z.ZodObject<{
            latitude: z.ZodNumber;
            longitude: z.ZodNumber;
        }, z.core.$strip>;
        endLocation: z.ZodObject<{
            latitude: z.ZodNumber;
            longitude: z.ZodNumber;
        }, z.core.$strip>;
    }, z.core.$strip>>>;
}, z.core.$strip>;
export type RouteAlternative = z.infer<typeof RouteAlternativeSchema>;
export declare const RouteRequestSchema: z.ZodObject<{
    origin: z.ZodObject<{
        latitude: z.ZodNumber;
        longitude: z.ZodNumber;
    }, z.core.$strip>;
    destination: z.ZodObject<{
        latitude: z.ZodNumber;
        longitude: z.ZodNumber;
    }, z.core.$strip>;
    travelMode: z.ZodDefault<z.ZodEnum<{
        walking: "walking";
        driving: "driving";
        cycling: "cycling";
    }>>;
    alternatives: z.ZodDefault<z.ZodBoolean>;
}, z.core.$strip>;
export type RouteRequest = z.infer<typeof RouteRequestSchema>;
export declare const RouteResultSchema: z.ZodObject<{
    routeId: z.ZodString;
    travelMode: z.ZodEnum<{
        walking: "walking";
        driving: "driving";
        cycling: "cycling";
    }>;
    distanceMeters: z.ZodNumber;
    durationSeconds: z.ZodNumber;
    geometry: z.ZodArray<z.ZodObject<{
        latitude: z.ZodNumber;
        longitude: z.ZodNumber;
    }, z.core.$strip>>;
    legs: z.ZodArray<z.ZodObject<{
        distanceMeters: z.ZodNumber;
        durationSeconds: z.ZodNumber;
        steps: z.ZodArray<z.ZodObject<{
            index: z.ZodNumber;
            instruction: z.ZodString;
            distanceMeters: z.ZodNumber;
            durationSeconds: z.ZodNumber;
            maneuver: z.ZodObject<{
                type: z.ZodEnum<{
                    UNKNOWN: "UNKNOWN";
                    DEPART: "DEPART";
                    CONTINUE: "CONTINUE";
                    TURN_LEFT: "TURN_LEFT";
                    TURN_RIGHT: "TURN_RIGHT";
                    SLIGHT_LEFT: "SLIGHT_LEFT";
                    SLIGHT_RIGHT: "SLIGHT_RIGHT";
                    SHARP_LEFT: "SHARP_LEFT";
                    SHARP_RIGHT: "SHARP_RIGHT";
                    U_TURN: "U_TURN";
                    ROUNDABOUT: "ROUNDABOUT";
                    ARRIVE: "ARRIVE";
                }>;
                instruction: z.ZodString;
                distanceMeters: z.ZodNumber;
                durationSeconds: z.ZodNumber;
                location: z.ZodObject<{
                    latitude: z.ZodNumber;
                    longitude: z.ZodNumber;
                }, z.core.$strip>;
                modifier: z.ZodOptional<z.ZodString>;
            }, z.core.$strip>;
            geometry: z.ZodOptional<z.ZodArray<z.ZodObject<{
                latitude: z.ZodNumber;
                longitude: z.ZodNumber;
            }, z.core.$strip>>>;
        }, z.core.$strip>>;
        startLocation: z.ZodObject<{
            latitude: z.ZodNumber;
            longitude: z.ZodNumber;
        }, z.core.$strip>;
        endLocation: z.ZodObject<{
            latitude: z.ZodNumber;
            longitude: z.ZodNumber;
        }, z.core.$strip>;
    }, z.core.$strip>>;
    alternatives: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        summary: z.ZodOptional<z.ZodString>;
        distanceMeters: z.ZodNumber;
        durationSeconds: z.ZodNumber;
        geometry: z.ZodArray<z.ZodObject<{
            latitude: z.ZodNumber;
            longitude: z.ZodNumber;
        }, z.core.$strip>>;
        legs: z.ZodOptional<z.ZodArray<z.ZodObject<{
            distanceMeters: z.ZodNumber;
            durationSeconds: z.ZodNumber;
            steps: z.ZodArray<z.ZodObject<{
                index: z.ZodNumber;
                instruction: z.ZodString;
                distanceMeters: z.ZodNumber;
                durationSeconds: z.ZodNumber;
                maneuver: z.ZodObject<{
                    type: z.ZodEnum<{
                        UNKNOWN: "UNKNOWN";
                        DEPART: "DEPART";
                        CONTINUE: "CONTINUE";
                        TURN_LEFT: "TURN_LEFT";
                        TURN_RIGHT: "TURN_RIGHT";
                        SLIGHT_LEFT: "SLIGHT_LEFT";
                        SLIGHT_RIGHT: "SLIGHT_RIGHT";
                        SHARP_LEFT: "SHARP_LEFT";
                        SHARP_RIGHT: "SHARP_RIGHT";
                        U_TURN: "U_TURN";
                        ROUNDABOUT: "ROUNDABOUT";
                        ARRIVE: "ARRIVE";
                    }>;
                    instruction: z.ZodString;
                    distanceMeters: z.ZodNumber;
                    durationSeconds: z.ZodNumber;
                    location: z.ZodObject<{
                        latitude: z.ZodNumber;
                        longitude: z.ZodNumber;
                    }, z.core.$strip>;
                    modifier: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>;
                geometry: z.ZodOptional<z.ZodArray<z.ZodObject<{
                    latitude: z.ZodNumber;
                    longitude: z.ZodNumber;
                }, z.core.$strip>>>;
            }, z.core.$strip>>;
            startLocation: z.ZodObject<{
                latitude: z.ZodNumber;
                longitude: z.ZodNumber;
            }, z.core.$strip>;
            endLocation: z.ZodObject<{
                latitude: z.ZodNumber;
                longitude: z.ZodNumber;
            }, z.core.$strip>;
        }, z.core.$strip>>>;
    }, z.core.$strip>>>;
    provider: z.ZodOptional<z.ZodString>;
    summary: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type RouteResult = z.infer<typeof RouteResultSchema>;
export declare const GeocodingQuerySchema: z.ZodObject<{
    query: z.ZodString;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
}, z.core.$strip>;
export type GeocodingQuery = z.infer<typeof GeocodingQuerySchema>;
export declare const ReverseGeocodingQuerySchema: z.ZodObject<{
    latitude: z.ZodCoercedNumber<unknown>;
    longitude: z.ZodCoercedNumber<unknown>;
}, z.core.$strip>;
export type ReverseGeocodingQuery = z.infer<typeof ReverseGeocodingQuerySchema>;
export declare const GeocodingResultSchema: z.ZodObject<{
    id: z.ZodString;
    placeName: z.ZodString;
    address: z.ZodString;
    city: z.ZodOptional<z.ZodString>;
    coordinate: z.ZodObject<{
        latitude: z.ZodNumber;
        longitude: z.ZodNumber;
    }, z.core.$strip>;
    relevance: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export type GeocodingResult = z.infer<typeof GeocodingResultSchema>;
export declare const GeocodingResponseSchema: z.ZodObject<{
    results: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        placeName: z.ZodString;
        address: z.ZodString;
        city: z.ZodOptional<z.ZodString>;
        coordinate: z.ZodObject<{
            latitude: z.ZodNumber;
            longitude: z.ZodNumber;
        }, z.core.$strip>;
        relevance: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type GeocodingResponse = z.infer<typeof GeocodingResponseSchema>;
export declare const NAVIGATION_STATES: readonly ["IDLE", "CALCULATING_ROUTE", "NAVIGATING", "OFF_ROUTE", "REROUTING", "ARRIVED", "ENDED"];
export type NavigationState = (typeof NAVIGATION_STATES)[number];
export declare const NavigationStateSchema: z.ZodEnum<{
    IDLE: "IDLE";
    CALCULATING_ROUTE: "CALCULATING_ROUTE";
    NAVIGATING: "NAVIGATING";
    OFF_ROUTE: "OFF_ROUTE";
    REROUTING: "REROUTING";
    ARRIVED: "ARRIVED";
    ENDED: "ENDED";
}>;
export declare const NavigationSessionSchema: z.ZodObject<{
    id: z.ZodString;
    bookingId: z.ZodOptional<z.ZodString>;
    destinationTitle: z.ZodString;
    destinationCoordinate: z.ZodObject<{
        latitude: z.ZodNumber;
        longitude: z.ZodNumber;
    }, z.core.$strip>;
    travelMode: z.ZodEnum<{
        walking: "walking";
        driving: "driving";
        cycling: "cycling";
    }>;
    state: z.ZodEnum<{
        IDLE: "IDLE";
        CALCULATING_ROUTE: "CALCULATING_ROUTE";
        NAVIGATING: "NAVIGATING";
        OFF_ROUTE: "OFF_ROUTE";
        REROUTING: "REROUTING";
        ARRIVED: "ARRIVED";
        ENDED: "ENDED";
    }>;
    currentStepIndex: z.ZodNumber;
    remainingDistanceMeters: z.ZodNumber;
    remainingDurationSeconds: z.ZodNumber;
    isVoiceMuted: z.ZodDefault<z.ZodBoolean>;
}, z.core.$strip>;
export type NavigationSession = z.infer<typeof NavigationSessionSchema>;
//# sourceMappingURL=index.d.ts.map