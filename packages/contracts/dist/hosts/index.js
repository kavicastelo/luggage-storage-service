import { z } from "zod";
// ============================================================================
// Enums & Constants
// ============================================================================
export const HOST_BUSINESS_STATUSES = [
    "DRAFT",
    "PENDING_VERIFICATION",
    "ACTIVE",
    "SUSPENDED",
    "REJECTED"
];
export const HOST_ENTITY_TYPES = [
    "SOLE_PROPRIETORSHIP",
    "PRIVATE_LIMITED",
    "HOTEL",
    "RETAIL_SHOP",
    "PARTNERSHIP",
    "OTHER"
];
export const HOST_VERIFICATION_STATUSES = [
    "PENDING_REVIEW",
    "APPROVED",
    "REJECTED",
    "INFORMATION_REQUESTED"
];
export const HOST_DOCUMENT_TYPES = [
    "BUSINESS_REGISTRATION",
    "NATIONAL_ID",
    "PASSPORT",
    "UTILITY_BILL",
    "BANK_STATEMENT",
    "PROOF_OF_ADDRESS",
    "OTHER"
];
export const HOST_STAFF_ROLES = ["MANAGER", "ATTENDANT"];
// ============================================================================
// Entities & Models
// ============================================================================
export const HostVerificationDocumentSchema = z.object({
    id: z.string().uuid(),
    verificationId: z.string().uuid(),
    documentType: z.enum(HOST_DOCUMENT_TYPES),
    fileKey: z.string(),
    fileName: z.string(),
    fileSize: z.number().int().nonnegative(),
    mimeType: z.string(),
    status: z.enum(["PENDING", "VERIFIED", "REJECTED"]),
    rejectionReason: z.string().nullable().optional(),
    downloadUrl: z.string().optional(),
    createdAt: z.string(),
    updatedAt: z.string()
});
export const HostVerificationSchema = z.object({
    id: z.string().uuid(),
    businessId: z.string().uuid(),
    submittedBy: z.string().uuid(),
    status: z.enum(HOST_VERIFICATION_STATUSES),
    reviewerUserId: z.string().uuid().nullable().optional(),
    reviewedAt: z.string().nullable().optional(),
    rejectionReason: z.string().nullable().optional(),
    adminNotes: z.string().nullable().optional(),
    submittedAt: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    documents: z.array(HostVerificationDocumentSchema).default([])
});
export const HostBusinessSchema = z.object({
    id: z.string().uuid(),
    ownerUserId: z.string().uuid(),
    legalBusinessName: z.string(),
    tradeName: z.string(),
    businessRegistrationNumber: z.string().nullable().optional(),
    entityType: z.enum(HOST_ENTITY_TYPES),
    taxIdentifier: z.string().nullable().optional(),
    contactEmail: z.string().email(),
    contactPhone: z.string(),
    addressLine1: z.string().nullable().optional(),
    addressLine2: z.string().nullable().optional(),
    city: z.string().nullable().optional(),
    postalCode: z.string().nullable().optional(),
    countryCode: z.string().length(2).default("LK"),
    payoutBankName: z.string().nullable().optional(),
    payoutAccountNumber: z.string().nullable().optional(),
    payoutAccountNumberMasked: z.string().nullable().optional(),
    payoutAccountName: z.string().nullable().optional(),
    payoutBranchCode: z.string().nullable().optional(),
    status: z.enum(HOST_BUSINESS_STATUSES),
    createdAt: z.string(),
    updatedAt: z.string(),
    verification: HostVerificationSchema.nullable().optional()
});
export const HostStaffMembershipSchema = z.object({
    id: z.string().uuid(),
    businessId: z.string().uuid(),
    userId: z.string().uuid(),
    staffRole: z.enum(HOST_STAFF_ROLES),
    assignedLocationIds: z.array(z.string().uuid()).default([]),
    isActive: z.boolean(),
    invitedAt: z.string(),
    acceptedAt: z.string().nullable().optional(),
    createdAt: z.string(),
    updatedAt: z.string()
});
export const HostStaffMemberDetailSchema = HostStaffMembershipSchema.extend({
    email: z.string().email(),
    displayName: z.string(),
    userStatus: z.string()
});
// ============================================================================
// Request Schemas
// ============================================================================
export const CreateHostBusinessRequestSchema = z.object({
    legalBusinessName: z.string().trim().min(2, "Legal business name must be at least 2 characters").max(255),
    tradeName: z.string().trim().min(2, "Trade name must be at least 2 characters").max(255),
    businessRegistrationNumber: z.string().trim().max(100).optional().nullable(),
    entityType: z.enum(HOST_ENTITY_TYPES).default("SOLE_PROPRIETORSHIP"),
    taxIdentifier: z.string().trim().max(100).optional().nullable(),
    contactEmail: z.string().trim().email("Valid email required"),
    contactPhone: z.string().trim().min(7, "Valid phone number required").max(32),
    addressLine1: z.string().trim().max(255).optional().nullable(),
    addressLine2: z.string().trim().max(255).optional().nullable(),
    city: z.string().trim().max(100).optional().nullable(),
    postalCode: z.string().trim().max(20).optional().nullable(),
    countryCode: z.string().trim().length(2).default("LK"),
    payoutBankName: z.string().trim().max(128).optional().nullable(),
    payoutAccountNumber: z.string().trim().max(64).optional().nullable(),
    payoutAccountName: z.string().trim().max(128).optional().nullable(),
    payoutBranchCode: z.string().trim().max(32).optional().nullable()
});
export const UpdateHostBusinessRequestSchema = CreateHostBusinessRequestSchema.partial();
export const AddHostStaffRequestSchema = z.object({
    email: z.string().trim().email("Valid user email is required"),
    staffRole: z.enum(HOST_STAFF_ROLES).default("ATTENDANT"),
    assignedLocationIds: z.array(z.string().uuid("Each assigned location ID must be a valid UUID")).default([])
});
export const UpdateHostStaffRequestSchema = z
    .object({
    staffRole: z.enum(HOST_STAFF_ROLES).optional(),
    assignedLocationIds: z.array(z.string().uuid("Each assigned location ID must be a valid UUID")).optional(),
    isActive: z.boolean().optional()
})
    .refine((data) => data.staffRole !== undefined ||
    data.assignedLocationIds !== undefined ||
    data.isActive !== undefined, {
    message: "At least one field (staffRole, assignedLocationIds, or isActive) must be provided",
    path: ["staffRole"]
});
export const SubmitVerificationDocumentItemSchema = z
    .object({
    documentType: z.enum(HOST_DOCUMENT_TYPES),
    intentId: z.string().uuid().optional(),
    fileKey: z.string().min(1, "File key is required").optional(),
    fileName: z.string().min(1).optional(),
    fileSize: z.number().int().positive().optional(),
    mimeType: z.string().min(1).optional()
})
    .refine((data) => Boolean(data.intentId || data.fileKey), {
    message: "Either intentId or fileKey must be provided for verification document",
    path: ["intentId"]
});
export const SubmitHostVerificationRequestSchema = z.object({
    documents: z.array(SubmitVerificationDocumentItemSchema).min(1, "At least one verification document is required")
});
export const ReviewHostVerificationRequestSchema = z.object({
    decision: z.enum(["APPROVE", "REJECT", "REQUEST_INFO"]),
    rejectionReason: z.string().trim().max(1000).optional().nullable(),
    adminNotes: z.string().trim().max(1000).optional().nullable()
}).refine((data) => {
    if (data.decision === "REJECT" || data.decision === "REQUEST_INFO") {
        return Boolean(data.rejectionReason && data.rejectionReason.length > 0);
    }
    return true;
}, {
    message: "A rejection or request reason must be provided when not approving",
    path: ["rejectionReason"]
});
// ============================================================================
// Response Schemas
// ============================================================================
export const HostBusinessListResponseSchema = z.object({
    businesses: z.array(HostBusinessSchema)
});
export const HostVerificationQueueQuerySchema = z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(20),
    status: z.enum([...HOST_VERIFICATION_STATUSES, "ALL"]).optional()
});
export const HostVerificationQueueItemSchema = z.object({
    verificationId: z.string().uuid(),
    businessId: z.string().uuid(),
    legalBusinessName: z.string(),
    tradeName: z.string(),
    businessRegistrationNumber: z.string().nullable().optional(),
    businessStatus: z.enum(HOST_BUSINESS_STATUSES).optional(),
    entityType: z.enum(HOST_ENTITY_TYPES),
    ownerEmail: z.string(),
    ownerDisplayName: z.string(),
    status: z.enum(HOST_VERIFICATION_STATUSES),
    documentCount: z.number().int(),
    submittedAt: z.string()
});
export const HostVerificationQueueResponseSchema = z.object({
    queue: z.array(HostVerificationQueueItemSchema),
    total: z.number().int()
});
export const HostStaffListResponseSchema = z.object({
    staff: z.array(HostStaffMemberDetailSchema)
});
// ============================================================================
// Admin Host Directory & Lifecycle Contracts
// ============================================================================
export const AdminHostListQuerySchema = z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(20),
    status: z.enum(HOST_BUSINESS_STATUSES).optional(),
    search: z.string().trim().max(100).optional()
});
export const AdminHostLocationBriefSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    city: z.string(),
    status: z.string(),
    bookingMode: z.string(),
    updatedAt: z.string()
});
export const AdminHostDirectoryItemSchema = z.object({
    id: z.string().uuid(),
    ownerUserId: z.string().uuid(),
    ownerEmail: z.string(),
    ownerDisplayName: z.string(),
    legalBusinessName: z.string(),
    tradeName: z.string(),
    businessRegistrationNumber: z.string().nullable(),
    entityType: z.enum(HOST_ENTITY_TYPES),
    city: z.string().nullable(),
    contactEmail: z.string(),
    contactPhone: z.string(),
    status: z.enum(HOST_BUSINESS_STATUSES),
    verificationStatus: z.enum(HOST_VERIFICATION_STATUSES).nullable(),
    locationCount: z.number().int().min(0),
    activeLocationCount: z.number().int().min(0),
    createdAt: z.string(),
    updatedAt: z.string()
});
export const AdminHostDirectoryDetailSchema = AdminHostDirectoryItemSchema.extend({
    taxIdentifier: z.string().nullable(),
    addressLine1: z.string().nullable(),
    addressLine2: z.string().nullable(),
    postalCode: z.string().nullable(),
    countryCode: z.string(),
    latestVerification: HostVerificationSchema.nullable(),
    locations: z.array(AdminHostLocationBriefSchema)
});
export const AdminSuspendHostBusinessRequestSchema = z.object({
    reason: z.string().trim().min(3, "Suspension reason must be at least 3 characters").max(500)
});
export const AdminReinstateHostBusinessRequestSchema = z.object({
    reason: z.string().trim().min(3, "Reinstatement reason must be at least 3 characters").max(500).optional()
});
//# sourceMappingURL=index.js.map