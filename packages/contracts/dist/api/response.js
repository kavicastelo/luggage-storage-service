import { z } from "zod";
export const ApiResponseMetaSchema = z.object({
    timestamp: z.string(),
    correlationId: z.string().optional()
});
/**
 * Higher-order schema builder for standard successful API response envelopes.
 * Supports typed response schema validation and OpenAPI generator compatibility.
 */
export function createApiResponseSchema(dataSchema) {
    return z.object({
        success: z.literal(true),
        data: dataSchema,
        meta: ApiResponseMetaSchema.optional()
    });
}
export function createSuccessResponse(data, correlationId) {
    return {
        success: true,
        data,
        meta: {
            timestamp: new Date().toISOString(),
            ...(correlationId ? { correlationId } : {})
        }
    };
}
//# sourceMappingURL=response.js.map