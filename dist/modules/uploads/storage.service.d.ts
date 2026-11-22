export interface PresignedUploadParams {
    fileKey: string;
    mimeType: string;
    fileSize?: number;
    expiresInSeconds?: number;
}
export interface PresignedDownloadParams {
    fileKey: string;
    expiresInSeconds?: number;
}
export interface ObjectMetadata {
    exists: boolean;
    contentLength?: number;
    contentType?: string;
    etag?: string;
}
export interface StoragePort {
    readonly isLiveR2: boolean;
    generatePresignedUploadUrl(params: PresignedUploadParams): Promise<{
        uploadUrl: string;
        expiresInSeconds: number;
    }>;
    generatePresignedDownloadUrl(params: PresignedDownloadParams): Promise<string>;
    deleteObject(fileKey: string): Promise<void>;
    objectExists(fileKey: string): Promise<boolean>;
    getObjectMetadata(fileKey: string): Promise<ObjectMetadata>;
    getPublicUrl?(fileKey: string): string | undefined;
    simulateUpload?(fileKey: string, data: {
        mimeType?: string;
        size?: number;
    }): void;
    putObjectBuffer?(fileKey: string, data: {
        buffer: Buffer;
        mimeType: string;
    }): void;
    getObjectBuffer?(fileKey: string): {
        buffer: Buffer;
        mimeType: string;
        size: number;
    } | undefined;
}
export declare class CloudflareR2StorageAdapter implements StoragePort {
    readonly isLiveR2 = true;
    private readonly client;
    private readonly bucketName;
    private readonly publicUrl?;
    constructor(config: {
        accountId: string;
        accessKeyId: string;
        secretAccessKey: string;
        bucketName: string;
        publicUrl?: string;
    });
    generatePresignedUploadUrl(params: PresignedUploadParams): Promise<{
        uploadUrl: string;
        expiresInSeconds: number;
    }>;
    generatePresignedDownloadUrl(params: PresignedDownloadParams): Promise<string>;
    deleteObject(fileKey: string): Promise<void>;
    getObjectMetadata(fileKey: string): Promise<ObjectMetadata>;
    objectExists(fileKey: string): Promise<boolean>;
    getPublicUrl(fileKey: string): string | undefined;
}
export declare class InMemoryStorageAdapter implements StoragePort {
    readonly isLiveR2 = false;
    private readonly storedObjects;
    private readonly baseUrl;
    constructor(baseUrl?: string);
    generatePresignedUploadUrl(params: PresignedUploadParams): Promise<{
        uploadUrl: string;
        expiresInSeconds: number;
    }>;
    simulateUpload(fileKey: string, data: {
        mimeType?: string;
        size?: number;
    }): void;
    putObjectBuffer(fileKey: string, data: {
        buffer: Buffer;
        mimeType: string;
    }): void;
    getObjectBuffer(fileKey: string): {
        buffer: Buffer;
        mimeType: string;
        size: number;
    } | undefined;
    generatePresignedDownloadUrl(params: PresignedDownloadParams): Promise<string>;
    deleteObject(fileKey: string): Promise<void>;
    getObjectMetadata(fileKey: string): Promise<ObjectMetadata>;
    objectExists(fileKey: string): Promise<boolean>;
    getPublicUrl(fileKey: string): string | undefined;
}
export declare function createStorageService(): StoragePort;
export declare const storageService: StoragePort;
//# sourceMappingURL=storage.service.d.ts.map