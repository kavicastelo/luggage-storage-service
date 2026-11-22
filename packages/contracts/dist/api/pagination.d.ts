import { z } from "zod";
/**
 * Standard pagination query parameters with coercion and sensible defaults.
 */
export declare const PaginationQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
}, z.core.$strip>;
export type PaginationQuery = z.infer<typeof PaginationQuerySchema>;
/**
 * Extended query parameters supporting sorting alongside pagination.
 */
export declare const SortablePaginationQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    sortBy: z.ZodOptional<z.ZodString>;
    sortOrder: z.ZodOptional<z.ZodDefault<z.ZodEnum<{
        asc: "asc";
        desc: "desc";
    }>>>;
}, z.core.$strip>;
export type SortablePaginationQuery = z.infer<typeof SortablePaginationQuerySchema>;
/**
 * Standard pagination metadata schema
 */
export declare const PaginationMetaSchema: z.ZodObject<{
    page: z.ZodNumber;
    limit: z.ZodNumber;
    total: z.ZodNumber;
    totalPages: z.ZodNumber;
    hasNext: z.ZodBoolean;
    hasPrev: z.ZodBoolean;
}, z.core.$strip>;
export type PaginationMeta = z.infer<typeof PaginationMetaSchema>;
export interface PaginatedApiResponse<T> {
    success: true;
    data: T[];
    pagination: PaginationMeta;
    meta: {
        timestamp: string;
        correlationId?: string;
    };
}
/**
 * Higher-order schema builder for paginated API responses.
 */
export declare function createPaginatedApiResponseSchema<T extends z.ZodTypeAny>(itemSchema: T): z.ZodObject<{
    success: z.ZodLiteral<true>;
    data: z.ZodArray<T>;
    pagination: z.ZodObject<{
        page: z.ZodNumber;
        limit: z.ZodNumber;
        total: z.ZodNumber;
        totalPages: z.ZodNumber;
        hasNext: z.ZodBoolean;
        hasPrev: z.ZodBoolean;
    }, z.core.$strip>;
    meta: z.ZodObject<{
        timestamp: z.ZodString;
        correlationId: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare function createPaginatedResponse<T>(data: T[], page: number, limit: number, total: number, correlationId?: string): PaginatedApiResponse<T>;
//# sourceMappingURL=pagination.d.ts.map