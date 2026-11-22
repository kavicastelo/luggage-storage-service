import { z } from "zod";
export declare const TravellerProfileSchema: z.ZodObject<{
    id: z.ZodString;
    userId: z.ZodString;
    firstName: z.ZodNullable<z.ZodString>;
    lastName: z.ZodNullable<z.ZodString>;
    preferredLanguage: z.ZodDefault<z.ZodString>;
    preferredCurrency: z.ZodDefault<z.ZodEnum<{
        LKR: "LKR";
        USD: "USD";
        EUR: "EUR";
        GBP: "GBP";
        JPY: "JPY";
    }>>;
    emergencyContactName: z.ZodNullable<z.ZodString>;
    emergencyContactPhone: z.ZodNullable<z.ZodString>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, z.core.$strip>;
export type TravellerProfile = z.infer<typeof TravellerProfileSchema>;
export declare const HostProfileTypeSchema: z.ZodEnum<{
    INDIVIDUAL: "INDIVIDUAL";
    BUSINESS: "BUSINESS";
}>;
export type HostProfileType = z.infer<typeof HostProfileTypeSchema>;
export declare const HostProfileStatusSchema: z.ZodEnum<{
    ACTIVE: "ACTIVE";
    SUSPENDED: "SUSPENDED";
    DEACTIVATED: "DEACTIVATED";
    PENDING_ONBOARDING: "PENDING_ONBOARDING";
}>;
export type HostProfileStatus = z.infer<typeof HostProfileStatusSchema>;
export declare const HostProfileSummarySchema: z.ZodObject<{
    id: z.ZodString;
    userId: z.ZodString;
    displayName: z.ZodString;
    contactEmail: z.ZodNullable<z.ZodString>;
    contactPhone: z.ZodNullable<z.ZodString>;
    hostType: z.ZodEnum<{
        INDIVIDUAL: "INDIVIDUAL";
        BUSINESS: "BUSINESS";
    }>;
    status: z.ZodEnum<{
        ACTIVE: "ACTIVE";
        SUSPENDED: "SUSPENDED";
        DEACTIVATED: "DEACTIVATED";
        PENDING_ONBOARDING: "PENDING_ONBOARDING";
    }>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, z.core.$strip>;
export type HostProfileSummary = z.infer<typeof HostProfileSummarySchema>;
/**
 * Full User Profile Response (GET /api/v1/identity/profile)
 */
export declare const UserProfileDataSchema: z.ZodObject<{
    id: z.ZodString;
    email: z.ZodString;
    displayName: z.ZodString;
    phoneNumber: z.ZodNullable<z.ZodString>;
    status: z.ZodEnum<{
        PENDING_VERIFICATION: "PENDING_VERIFICATION";
        ACTIVE: "ACTIVE";
        SUSPENDED: "SUSPENDED";
        DEACTIVATED: "DEACTIVATED";
    }>;
    isEmailVerified: z.ZodBoolean;
    isPhoneVerified: z.ZodBoolean;
    roles: z.ZodArray<z.ZodString>;
    permissions: z.ZodOptional<z.ZodArray<z.ZodString>>;
    lastLoginAt: z.ZodNullable<z.ZodString>;
    passwordChangedAt: z.ZodNullable<z.ZodString>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    travellerProfile: z.ZodNullable<z.ZodObject<{
        id: z.ZodString;
        userId: z.ZodString;
        firstName: z.ZodNullable<z.ZodString>;
        lastName: z.ZodNullable<z.ZodString>;
        preferredLanguage: z.ZodDefault<z.ZodString>;
        preferredCurrency: z.ZodDefault<z.ZodEnum<{
            LKR: "LKR";
            USD: "USD";
            EUR: "EUR";
            GBP: "GBP";
            JPY: "JPY";
        }>>;
        emergencyContactName: z.ZodNullable<z.ZodString>;
        emergencyContactPhone: z.ZodNullable<z.ZodString>;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
    }, z.core.$strip>>;
    hostProfile: z.ZodNullable<z.ZodObject<{
        id: z.ZodString;
        userId: z.ZodString;
        displayName: z.ZodString;
        contactEmail: z.ZodNullable<z.ZodString>;
        contactPhone: z.ZodNullable<z.ZodString>;
        hostType: z.ZodEnum<{
            INDIVIDUAL: "INDIVIDUAL";
            BUSINESS: "BUSINESS";
        }>;
        status: z.ZodEnum<{
            ACTIVE: "ACTIVE";
            SUSPENDED: "SUSPENDED";
            DEACTIVATED: "DEACTIVATED";
            PENDING_ONBOARDING: "PENDING_ONBOARDING";
        }>;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type UserProfileData = z.infer<typeof UserProfileDataSchema>;
export declare const UserProfileResponseDataSchema: z.ZodObject<{
    profile: z.ZodObject<{
        id: z.ZodString;
        email: z.ZodString;
        displayName: z.ZodString;
        phoneNumber: z.ZodNullable<z.ZodString>;
        status: z.ZodEnum<{
            PENDING_VERIFICATION: "PENDING_VERIFICATION";
            ACTIVE: "ACTIVE";
            SUSPENDED: "SUSPENDED";
            DEACTIVATED: "DEACTIVATED";
        }>;
        isEmailVerified: z.ZodBoolean;
        isPhoneVerified: z.ZodBoolean;
        roles: z.ZodArray<z.ZodString>;
        permissions: z.ZodOptional<z.ZodArray<z.ZodString>>;
        lastLoginAt: z.ZodNullable<z.ZodString>;
        passwordChangedAt: z.ZodNullable<z.ZodString>;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
        travellerProfile: z.ZodNullable<z.ZodObject<{
            id: z.ZodString;
            userId: z.ZodString;
            firstName: z.ZodNullable<z.ZodString>;
            lastName: z.ZodNullable<z.ZodString>;
            preferredLanguage: z.ZodDefault<z.ZodString>;
            preferredCurrency: z.ZodDefault<z.ZodEnum<{
                LKR: "LKR";
                USD: "USD";
                EUR: "EUR";
                GBP: "GBP";
                JPY: "JPY";
            }>>;
            emergencyContactName: z.ZodNullable<z.ZodString>;
            emergencyContactPhone: z.ZodNullable<z.ZodString>;
            createdAt: z.ZodString;
            updatedAt: z.ZodString;
        }, z.core.$strip>>;
        hostProfile: z.ZodNullable<z.ZodObject<{
            id: z.ZodString;
            userId: z.ZodString;
            displayName: z.ZodString;
            contactEmail: z.ZodNullable<z.ZodString>;
            contactPhone: z.ZodNullable<z.ZodString>;
            hostType: z.ZodEnum<{
                INDIVIDUAL: "INDIVIDUAL";
                BUSINESS: "BUSINESS";
            }>;
            status: z.ZodEnum<{
                ACTIVE: "ACTIVE";
                SUSPENDED: "SUSPENDED";
                DEACTIVATED: "DEACTIVATED";
                PENDING_ONBOARDING: "PENDING_ONBOARDING";
            }>;
            createdAt: z.ZodString;
            updatedAt: z.ZodString;
        }, z.core.$strip>>;
    }, z.core.$strip>;
}, z.core.$strip>;
export type UserProfileResponseData = z.infer<typeof UserProfileResponseDataSchema>;
/**
 * Traveller Profile Partial Update payload
 */
export declare const UpdateTravellerProfileSchema: z.ZodObject<{
    firstName: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    lastName: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    preferredLanguage: z.ZodOptional<z.ZodString>;
    preferredCurrency: z.ZodOptional<z.ZodEnum<{
        LKR: "LKR";
        USD: "USD";
        EUR: "EUR";
        GBP: "GBP";
        JPY: "JPY";
    }>>;
    emergencyContactName: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    emergencyContactPhone: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strict>;
export type UpdateTravellerProfile = z.infer<typeof UpdateTravellerProfileSchema>;
/**
 * Profile Update Request (PATCH /api/v1/identity/profile)
 */
export declare const UpdateProfileRequestSchema: z.ZodObject<{
    displayName: z.ZodOptional<z.ZodString>;
    phoneNumber: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    traveller: z.ZodOptional<z.ZodObject<{
        firstName: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        lastName: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        preferredLanguage: z.ZodOptional<z.ZodString>;
        preferredCurrency: z.ZodOptional<z.ZodEnum<{
            LKR: "LKR";
            USD: "USD";
            EUR: "EUR";
            GBP: "GBP";
            JPY: "JPY";
        }>>;
        emergencyContactName: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        emergencyContactPhone: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$strict>>;
}, z.core.$strict>;
export type UpdateProfileRequest = z.infer<typeof UpdateProfileRequestSchema>;
export declare const UpdateProfileResponseDataSchema: z.ZodObject<{
    profile: z.ZodObject<{
        id: z.ZodString;
        email: z.ZodString;
        displayName: z.ZodString;
        phoneNumber: z.ZodNullable<z.ZodString>;
        status: z.ZodEnum<{
            PENDING_VERIFICATION: "PENDING_VERIFICATION";
            ACTIVE: "ACTIVE";
            SUSPENDED: "SUSPENDED";
            DEACTIVATED: "DEACTIVATED";
        }>;
        isEmailVerified: z.ZodBoolean;
        isPhoneVerified: z.ZodBoolean;
        roles: z.ZodArray<z.ZodString>;
        permissions: z.ZodOptional<z.ZodArray<z.ZodString>>;
        lastLoginAt: z.ZodNullable<z.ZodString>;
        passwordChangedAt: z.ZodNullable<z.ZodString>;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
        travellerProfile: z.ZodNullable<z.ZodObject<{
            id: z.ZodString;
            userId: z.ZodString;
            firstName: z.ZodNullable<z.ZodString>;
            lastName: z.ZodNullable<z.ZodString>;
            preferredLanguage: z.ZodDefault<z.ZodString>;
            preferredCurrency: z.ZodDefault<z.ZodEnum<{
                LKR: "LKR";
                USD: "USD";
                EUR: "EUR";
                GBP: "GBP";
                JPY: "JPY";
            }>>;
            emergencyContactName: z.ZodNullable<z.ZodString>;
            emergencyContactPhone: z.ZodNullable<z.ZodString>;
            createdAt: z.ZodString;
            updatedAt: z.ZodString;
        }, z.core.$strip>>;
        hostProfile: z.ZodNullable<z.ZodObject<{
            id: z.ZodString;
            userId: z.ZodString;
            displayName: z.ZodString;
            contactEmail: z.ZodNullable<z.ZodString>;
            contactPhone: z.ZodNullable<z.ZodString>;
            hostType: z.ZodEnum<{
                INDIVIDUAL: "INDIVIDUAL";
                BUSINESS: "BUSINESS";
            }>;
            status: z.ZodEnum<{
                ACTIVE: "ACTIVE";
                SUSPENDED: "SUSPENDED";
                DEACTIVATED: "DEACTIVATED";
                PENDING_ONBOARDING: "PENDING_ONBOARDING";
            }>;
            createdAt: z.ZodString;
            updatedAt: z.ZodString;
        }, z.core.$strip>>;
    }, z.core.$strip>;
    message: z.ZodString;
}, z.core.$strip>;
export type UpdateProfileResponseData = z.infer<typeof UpdateProfileResponseDataSchema>;
//# sourceMappingURL=index.d.ts.map