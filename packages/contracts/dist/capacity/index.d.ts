import { z } from "zod";
export declare const BAG_CATEGORIES: readonly ["BAG_SMALL", "BAG_MEDIUM", "BAG_LARGE", "BAG_OVERSIZED"];
export type BagCategory = (typeof BAG_CATEGORIES)[number];
export declare const CAPACITY_POOL_TYPES: readonly ["SHARED", "DEDICATED"];
export type CapacityPoolType = (typeof CAPACITY_POOL_TYPES)[number];
export declare const STANDARD_BAG_UNIT_CONSUMPTION: Record<BagCategory, number>;
export declare const StorageCapacityPoolSchema: z.ZodObject<{
    id: z.ZodString;
    locationId: z.ZodString;
    zoneId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    poolType: z.ZodEnum<{
        SHARED: "SHARED";
        DEDICATED: "DEDICATED";
    }>;
    dedicatedBagCategory: z.ZodOptional<z.ZodNullable<z.ZodEnum<{
        BAG_SMALL: "BAG_SMALL";
        BAG_MEDIUM: "BAG_MEDIUM";
        BAG_LARGE: "BAG_LARGE";
        BAG_OVERSIZED: "BAG_OVERSIZED";
    }>>>;
    totalUnits: z.ZodNumber;
    isActive: z.ZodDefault<z.ZodBoolean>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, z.core.$strip>;
export type StorageCapacityPool = z.infer<typeof StorageCapacityPoolSchema>;
export declare const BaseCapacityPoolInputSchema: z.ZodObject<{
    zoneId: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    poolType: z.ZodDefault<z.ZodEnum<{
        SHARED: "SHARED";
        DEDICATED: "DEDICATED";
    }>>;
    dedicatedBagCategory: z.ZodNullable<z.ZodOptional<z.ZodEnum<{
        BAG_SMALL: "BAG_SMALL";
        BAG_MEDIUM: "BAG_MEDIUM";
        BAG_LARGE: "BAG_LARGE";
        BAG_OVERSIZED: "BAG_OVERSIZED";
    }>>>;
    totalUnits: z.ZodNumber;
    isActive: z.ZodDefault<z.ZodBoolean>;
}, z.core.$strip>;
export declare const CreateCapacityPoolRequestSchema: z.ZodObject<{
    zoneId: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    poolType: z.ZodDefault<z.ZodEnum<{
        SHARED: "SHARED";
        DEDICATED: "DEDICATED";
    }>>;
    dedicatedBagCategory: z.ZodNullable<z.ZodOptional<z.ZodEnum<{
        BAG_SMALL: "BAG_SMALL";
        BAG_MEDIUM: "BAG_MEDIUM";
        BAG_LARGE: "BAG_LARGE";
        BAG_OVERSIZED: "BAG_OVERSIZED";
    }>>>;
    totalUnits: z.ZodNumber;
    isActive: z.ZodDefault<z.ZodBoolean>;
}, z.core.$strip>;
export type CreateCapacityPoolRequest = z.infer<typeof CreateCapacityPoolRequestSchema>;
export declare const UpdateCapacityPoolRequestSchema: z.ZodObject<{
    zoneId: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    poolType: z.ZodOptional<z.ZodDefault<z.ZodEnum<{
        SHARED: "SHARED";
        DEDICATED: "DEDICATED";
    }>>>;
    dedicatedBagCategory: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodEnum<{
        BAG_SMALL: "BAG_SMALL";
        BAG_MEDIUM: "BAG_MEDIUM";
        BAG_LARGE: "BAG_LARGE";
        BAG_OVERSIZED: "BAG_OVERSIZED";
    }>>>>;
    totalUnits: z.ZodOptional<z.ZodNumber>;
    isActive: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
}, z.core.$strip>;
export type UpdateCapacityPoolRequest = z.infer<typeof UpdateCapacityPoolRequestSchema>;
export declare const CapacityPoolListResponseSchema: z.ZodObject<{
    pools: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        locationId: z.ZodString;
        zoneId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        poolType: z.ZodEnum<{
            SHARED: "SHARED";
            DEDICATED: "DEDICATED";
        }>;
        dedicatedBagCategory: z.ZodOptional<z.ZodNullable<z.ZodEnum<{
            BAG_SMALL: "BAG_SMALL";
            BAG_MEDIUM: "BAG_MEDIUM";
            BAG_LARGE: "BAG_LARGE";
            BAG_OVERSIZED: "BAG_OVERSIZED";
        }>>>;
        totalUnits: z.ZodNumber;
        isActive: z.ZodDefault<z.ZodBoolean>;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type CapacityPoolListResponse = z.infer<typeof CapacityPoolListResponseSchema>;
//# sourceMappingURL=index.d.ts.map