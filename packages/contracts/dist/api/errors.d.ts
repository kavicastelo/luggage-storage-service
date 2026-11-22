import { z } from "zod";
/**
 * Standard Platform Error Code Taxonomy
 */
export declare const ErrorCodeSchema: z.ZodEnum<{
    BAD_REQUEST: "BAD_REQUEST";
    VALIDATION_ERROR: "VALIDATION_ERROR";
    UNAUTHORIZED: "UNAUTHORIZED";
    FORBIDDEN: "FORBIDDEN";
    NOT_FOUND: "NOT_FOUND";
    CONFLICT: "CONFLICT";
    CAPACITY_EXCEEDED: "CAPACITY_EXCEEDED";
    PAYMENT_FAILED: "PAYMENT_FAILED";
    UNPROCESSABLE_ENTITY: "UNPROCESSABLE_ENTITY";
    INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR";
    SERVICE_UNAVAILABLE: "SERVICE_UNAVAILABLE";
    RATE_LIMITED: "RATE_LIMITED";
}>;
export type ErrorCode = z.infer<typeof ErrorCodeSchema>;
/**
 * Error detail schema for field-level validation and contextual error reporting.
 */
export declare const ApiErrorDetailSchema: z.ZodObject<{
    field: z.ZodOptional<z.ZodString>;
    message: z.ZodString;
    code: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type ApiErrorDetail = z.infer<typeof ApiErrorDetailSchema>;
/**
 * Standard API error response schema
 */
export declare const ApiErrorResponseSchema: z.ZodObject<{
    success: z.ZodLiteral<false>;
    error: z.ZodObject<{
        code: z.ZodEnum<{
            BAD_REQUEST: "BAD_REQUEST";
            VALIDATION_ERROR: "VALIDATION_ERROR";
            UNAUTHORIZED: "UNAUTHORIZED";
            FORBIDDEN: "FORBIDDEN";
            NOT_FOUND: "NOT_FOUND";
            CONFLICT: "CONFLICT";
            CAPACITY_EXCEEDED: "CAPACITY_EXCEEDED";
            PAYMENT_FAILED: "PAYMENT_FAILED";
            UNPROCESSABLE_ENTITY: "UNPROCESSABLE_ENTITY";
            INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR";
            SERVICE_UNAVAILABLE: "SERVICE_UNAVAILABLE";
            RATE_LIMITED: "RATE_LIMITED";
        }>;
        message: z.ZodString;
        details: z.ZodOptional<z.ZodArray<z.ZodObject<{
            field: z.ZodOptional<z.ZodString>;
            message: z.ZodString;
            code: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>>>;
    }, z.core.$strip>;
    meta: z.ZodObject<{
        timestamp: z.ZodString;
        correlationId: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
}, z.core.$strip>;
export type ApiErrorResponse = z.infer<typeof ApiErrorResponseSchema>;
/**
 * Standard error code to default HTTP status mapping
 */
export declare const ERROR_CODE_TO_HTTP_STATUS: Record<ErrorCode, number>;
/**
 * Creates a standardized error response envelope.
 * Accepts either an array of ApiErrorDetail or a key-value record which is safely normalized.
 */
export declare function createErrorResponse(code: ErrorCode, message: string, details?: ApiErrorDetail[] | Record<string, unknown>, correlationId?: string): ApiErrorResponse;
//# sourceMappingURL=errors.d.ts.map