import { InitiateUploadRequest, InitiateUploadResponse, ConfirmUploadRequest, ConfirmUploadResponse } from "@luggage-storage/contracts";
import { StoragePort } from "./storage.service.js";
export interface UploadContext {
    userId: string;
    roles: string[];
    clientInfo?: {
        ip?: string;
        userAgent?: string;
        correlationId?: string;
    };
}
export declare class UploadsService {
    private readonly storage;
    constructor(storage?: StoragePort);
    /**
     * Generates a pre-signed upload URL bound to a durable database-backed upload intent.
     * Strictly enforces user role, resource ownership, resource lifecycle state,
     * allowed MIME types, and maximum file sizes.
     */
    initiateUpload(request: InitiateUploadRequest, context: UploadContext): Promise<InitiateUploadResponse>;
    /**
     * Confirms an upload against a durable database-backed intent.
     * Verifies intent validity, uploader identity, key match, and actual storage object existence.
     */
    confirmUpload(request: ConfirmUploadRequest, context: UploadContext): Promise<ConfirmUploadResponse>;
    /**
     * Generates a secure, temporary pre-signed URL to view a verification document.
     * Access is strictly restricted to the document's host owner or authorized Superadmin/Support.
     */
    getAuthorizedDocumentDownloadUrl(documentId: string, context: UploadContext): Promise<{
        downloadUrl: string;
        fileName: string;
        mimeType: string;
    }>;
}
export declare const uploadsService: UploadsService;
//# sourceMappingURL=uploads.service.d.ts.map