import { z } from "zod";
export declare const ApiResponseMetaSchema: z.ZodObject<{
    timestamp: z.ZodString;
    correlationId: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type ApiResponseMeta = z.infer<typeof ApiResponseMetaSchema>;
export interface ApiResponse<T> {
    success: true;
    data: T;
    meta?: {
        timestamp: string;
        correlationId?: string;
    };
}
/**
 * Higher-order schema builder for standard successful API response envelopes.
 * Supports typed response schema validation and OpenAPI generator compatibility.
 */
export declare function createApiResponseSchema<T extends z.ZodTypeAny>(dataSchema: T): z.ZodObject<{
    success: z.ZodLiteral<true>;
    data: T;
    meta: z.ZodOptional<z.ZodObject<{
        timestamp: z.ZodString;
        correlationId: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export declare function createSuccessResponse<T>(data: T, correlationId?: string): ApiResponse<T>;
//# sourceMappingURL=response.d.ts.map