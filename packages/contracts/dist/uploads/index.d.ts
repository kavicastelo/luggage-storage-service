import { z } from "zod";
export declare const UPLOAD_PURPOSES: readonly ["HOST_VERIFICATION", "LOCATION_IMAGE", "CUSTODY_EVIDENCE"];
export type UploadPurpose = (typeof UPLOAD_PURPOSES)[number];
export declare const UPLOAD_RESOURCE_TYPES: readonly ["HOST_BUSINESS", "STORAGE_LOCATION", "BOOKING"];
export type UploadResourceType = (typeof UPLOAD_RESOURCE_TYPES)[number];
export declare const UPLOAD_INTENT_STATUSES: readonly ["PENDING", "CONFIRMED", "CONSUMED", "EXPIRED", "CANCELLED"];
export type UploadIntentStatus = (typeof UPLOAD_INTENT_STATUSES)[number];
export declare const ALLOWED_MIME_TYPES: {
    readonly HOST_VERIFICATION: readonly ["image/jpeg", "image/png", "image/webp", "application/pdf"];
    readonly LOCATION_IMAGE: readonly ["image/jpeg", "image/png", "image/webp"];
    readonly CUSTODY_EVIDENCE: readonly ["image/jpeg", "image/png", "image/webp"];
};
export declare const MAX_FILE_SIZE_BYTES: {
    readonly HOST_VERIFICATION: number;
    readonly LOCATION_IMAGE: number;
    readonly CUSTODY_EVIDENCE: number;
};
export declare const InitiateUploadRequestSchema: z.ZodObject<{
    purpose: z.ZodEnum<{
        HOST_VERIFICATION: "HOST_VERIFICATION";
        LOCATION_IMAGE: "LOCATION_IMAGE";
        CUSTODY_EVIDENCE: "CUSTODY_EVIDENCE";
    }>;
    resourceType: z.ZodOptional<z.ZodEnum<{
        HOST_BUSINESS: "HOST_BUSINESS";
        STORAGE_LOCATION: "STORAGE_LOCATION";
        BOOKING: "BOOKING";
    }>>;
    resourceId: z.ZodOptional<z.ZodString>;
    referenceId: z.ZodOptional<z.ZodString>;
    fileName: z.ZodString;
    fileSize: z.ZodNumber;
    mimeType: z.ZodString;
}, z.core.$strip>;
export type InitiateUploadRequest = z.infer<typeof InitiateUploadRequestSchema>;
export declare const ConfirmUploadRequestSchema: z.ZodObject<{
    intentId: z.ZodOptional<z.ZodString>;
    fileKey: z.ZodString;
    purpose: z.ZodOptional<z.ZodEnum<{
        HOST_VERIFICATION: "HOST_VERIFICATION";
        LOCATION_IMAGE: "LOCATION_IMAGE";
        CUSTODY_EVIDENCE: "CUSTODY_EVIDENCE";
    }>>;
    referenceId: z.ZodOptional<z.ZodString>;
    resourceId: z.ZodOptional<z.ZodString>;
    documentType: z.ZodNullable<z.ZodOptional<z.ZodEnum<{
        OTHER: "OTHER";
        BUSINESS_REGISTRATION: "BUSINESS_REGISTRATION";
        NATIONAL_ID: "NATIONAL_ID";
        PASSPORT: "PASSPORT";
        UTILITY_BILL: "UTILITY_BILL";
        BANK_STATEMENT: "BANK_STATEMENT";
        PROOF_OF_ADDRESS: "PROOF_OF_ADDRESS";
    }>>>;
    caption: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    isPrimary: z.ZodDefault<z.ZodBoolean>;
}, z.core.$strip>;
export type ConfirmUploadRequest = z.infer<typeof ConfirmUploadRequestSchema>;
export declare const InitiateUploadResponseSchema: z.ZodObject<{
    intentId: z.ZodString;
    uploadUrl: z.ZodString;
    fileKey: z.ZodString;
    expiresInSeconds: z.ZodNumber;
    publicUrl: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type InitiateUploadResponse = z.infer<typeof InitiateUploadResponseSchema>;
export declare const ConfirmUploadResponseSchema: z.ZodObject<{
    success: z.ZodLiteral<true>;
    intentId: z.ZodString;
    fileKey: z.ZodString;
    id: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    message: z.ZodString;
}, z.core.$strip>;
export type ConfirmUploadResponse = z.infer<typeof ConfirmUploadResponseSchema>;
export declare const UploadIntentSchema: z.ZodObject<{
    id: z.ZodString;
    userId: z.ZodString;
    purpose: z.ZodEnum<{
        HOST_VERIFICATION: "HOST_VERIFICATION";
        LOCATION_IMAGE: "LOCATION_IMAGE";
        CUSTODY_EVIDENCE: "CUSTODY_EVIDENCE";
    }>;
    resourceType: z.ZodString;
    resourceId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    fileKey: z.ZodString;
    fileName: z.ZodString;
    mimeType: z.ZodString;
    maxFileSize: z.ZodNumber;
    status: z.ZodEnum<{
        PENDING: "PENDING";
        CONFIRMED: "CONFIRMED";
        CONSUMED: "CONSUMED";
        EXPIRED: "EXPIRED";
        CANCELLED: "CANCELLED";
    }>;
    expiresAt: z.ZodString;
    confirmedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    metadata: z.ZodOptional<z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, z.core.$strip>;
export type UploadIntent = z.infer<typeof UploadIntentSchema>;
//# sourceMappingURL=index.d.ts.map