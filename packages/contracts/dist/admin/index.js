import { z } from "zod";
import { UserStatusSchema } from "../auth/index.js";
import { PaginationQuerySchema } from "../api/pagination.js";
import { SecurityAuditEventSchema, SecurityEventTypeSchema } from "../audit/index.js";
// ============================================================================
// Query Parameters
// ============================================================================
export const AdminUserQuerySchema = PaginationQuerySchema.extend({
    status: UserStatusSchema.optional(),
    search: z.string().trim().max(100).optional(),
    role: z.string().trim().max(32).optional()
});
export const AdminAuditEventQuerySchema = PaginationQuerySchema.extend({
    eventType: SecurityEventTypeSchema.optional(),
    userId: z.string().uuid().optional(),
    from: z.string().datetime({ offset: true }).optional(),
    to: z.string().datetime({ offset: true }).optional()
});
export const AdminAuditEventDetailResponseDataSchema = z.object({
    event: SecurityAuditEventSchema
});
// ============================================================================
// Request Payloads
// ============================================================================
export const AdminSuspendUserRequestSchema = z.object({
    reason: z
        .string()
        .trim()
        .min(3, "Reason must be at least 3 characters")
        .max(255, "Reason must not exceed 255 characters")
});
export const AdminReinstateUserRequestSchema = z.object({
    reason: z
        .string()
        .trim()
        .min(3, "Reason must be at least 3 characters")
        .max(255, "Reason must not exceed 255 characters")
        .optional()
});
export const AdminDeactivateUserRequestSchema = z.object({
    reason: z
        .string()
        .trim()
        .min(3, "Reason must be at least 3 characters")
        .max(255, "Reason must not exceed 255 characters")
});
export const AdminReactivateUserRequestSchema = z.object({
    reason: z
        .string()
        .trim()
        .min(3, "Reason must be at least 3 characters")
        .max(255, "Reason must not exceed 255 characters")
        .optional()
});
export const AdminVerifyEmailRequestSchema = z.object({
    reason: z
        .string()
        .trim()
        .min(3, "Reason must be at least 3 characters")
        .max(255, "Reason must not exceed 255 characters")
        .optional()
});
// ============================================================================
// Response Models
// ============================================================================
export const AdminUserSummarySchema = z.object({
    id: z.string().uuid(),
    email: z.string(),
    displayName: z.string(),
    phoneNumber: z.string().nullable(),
    status: UserStatusSchema,
    isEmailVerified: z.boolean(),
    isPhoneVerified: z.boolean(),
    roles: z.array(z.string()),
    lastLoginAt: z.string().nullable(),
    createdAt: z.string(),
    updatedAt: z.string()
});
export const AdminTravellerProfileSchema = z.object({
    id: z.string().uuid(),
    firstName: z.string().nullable(),
    lastName: z.string().nullable(),
    preferredLanguage: z.string(),
    preferredCurrency: z.string(),
    emergencyContactName: z.string().nullable(),
    emergencyContactPhone: z.string().nullable()
});
export const AdminHostProfileSchema = z.object({
    id: z.string().uuid(),
    displayName: z.string(),
    contactEmail: z.string().nullable(),
    contactPhone: z.string().nullable(),
    hostType: z.string(),
    status: z.string()
});
export const AdminUserDetailSchema = AdminUserSummarySchema.extend({
    normalizedEmail: z.string(),
    passwordChangedAt: z.string().nullable(),
    activeSessionCount: z.number().int().min(0),
    travellerProfile: AdminTravellerProfileSchema.nullable(),
    hostProfile: AdminHostProfileSchema.nullable()
});
export const AdminLifecycleActionResponseDataSchema = z.object({
    user: AdminUserSummarySchema,
    message: z.string(),
    sessionsRevoked: z.number().int().optional()
});
export const AdminMetricsSummarySchema = z.object({
    currency: z.string().length(3).default("LKR"),
    activeUsersCount: z.number().int().min(0),
    activeBusinessesCount: z.number().int().min(0),
    suspendedBusinessesCount: z.number().int().min(0),
    activeLocationsCount: z.number().int().min(0),
    pendingVerificationsCount: z.number().int().min(0),
    pendingLocationsCount: z.number().int().min(0),
    activeBookingsCount: z.number().int().min(0),
    disputedBookingsCount: z.number().int().min(0),
    openRefundsCount: z.number().int().min(0),
    grossCapturedVolumeMinor: z.number().int().min(0).nullable(),
    platformCommissionMinor: z.number().int().min(0).nullable(),
    unearnedBookingLiabilityMinor: z.number().int().min(0).nullable(),
    eligibleHostPayablesMinor: z.number().int().min(0).nullable()
});
//# sourceMappingURL=index.js.map