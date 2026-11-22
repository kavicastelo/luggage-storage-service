import { z } from "zod";
import { BagCategory } from "../capacity/index.js";
export declare const PRICING_UNITS: readonly ["CALENDAR_DAY", "24_HOUR_BLOCK"];
export type PricingUnit = (typeof PRICING_UNITS)[number];
export declare const PRICING_POLICY_STATUSES: readonly ["DRAFT", "ACTIVE", "ARCHIVED"];
export type PricingPolicyStatus = (typeof PRICING_POLICY_STATUSES)[number];
export declare const DEFAULT_CATEGORY_MULTIPLIERS_BPS: Record<BagCategory, number>;
export declare const PricingTierRateSchema: z.ZodObject<{
    id: z.ZodString;
    policyId: z.ZodString;
    bagCategory: z.ZodEnum<{
        BAG_SMALL: "BAG_SMALL";
        BAG_MEDIUM: "BAG_MEDIUM";
        BAG_LARGE: "BAG_LARGE";
        BAG_OVERSIZED: "BAG_OVERSIZED";
    }>;
    rateMinor: z.ZodNumber;
    categoryMultiplierBps: z.ZodDefault<z.ZodNumber>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, z.core.$strip>;
export type PricingTierRate = z.infer<typeof PricingTierRateSchema>;
export declare const PricingPolicySchema: z.ZodObject<{
    id: z.ZodString;
    locationId: z.ZodString;
    currency: z.ZodDefault<z.ZodString>;
    pricingUnit: z.ZodDefault<z.ZodEnum<{
        CALENDAR_DAY: "CALENDAR_DAY";
        "24_HOUR_BLOCK": "24_HOUR_BLOCK";
    }>>;
    baseRateMinor: z.ZodNumber;
    status: z.ZodDefault<z.ZodEnum<{
        ACTIVE: "ACTIVE";
        DRAFT: "DRAFT";
        ARCHIVED: "ARCHIVED";
    }>>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    tierRates: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        policyId: z.ZodString;
        bagCategory: z.ZodEnum<{
            BAG_SMALL: "BAG_SMALL";
            BAG_MEDIUM: "BAG_MEDIUM";
            BAG_LARGE: "BAG_LARGE";
            BAG_OVERSIZED: "BAG_OVERSIZED";
        }>;
        rateMinor: z.ZodNumber;
        categoryMultiplierBps: z.ZodDefault<z.ZodNumber>;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
    }, z.core.$strip>>>;
}, z.core.$strip>;
export type PricingPolicy = z.infer<typeof PricingPolicySchema>;
export declare const TierRateInputSchema: z.ZodObject<{
    bagCategory: z.ZodEnum<{
        BAG_SMALL: "BAG_SMALL";
        BAG_MEDIUM: "BAG_MEDIUM";
        BAG_LARGE: "BAG_LARGE";
        BAG_OVERSIZED: "BAG_OVERSIZED";
    }>;
    rateMinor: z.ZodNumber;
    categoryMultiplierBps: z.ZodNumber;
}, z.core.$strip>;
export type TierRateInput = z.infer<typeof TierRateInputSchema>;
export declare const ConfigurePricingPolicyRequestSchema: z.ZodObject<{
    currency: z.ZodDefault<z.ZodString>;
    pricingUnit: z.ZodDefault<z.ZodEnum<{
        CALENDAR_DAY: "CALENDAR_DAY";
        "24_HOUR_BLOCK": "24_HOUR_BLOCK";
    }>>;
    baseRateMinor: z.ZodNumber;
    tierRates: z.ZodOptional<z.ZodArray<z.ZodObject<{
        bagCategory: z.ZodEnum<{
            BAG_SMALL: "BAG_SMALL";
            BAG_MEDIUM: "BAG_MEDIUM";
            BAG_LARGE: "BAG_LARGE";
            BAG_OVERSIZED: "BAG_OVERSIZED";
        }>;
        rateMinor: z.ZodNumber;
        categoryMultiplierBps: z.ZodNumber;
    }, z.core.$strip>>>;
}, z.core.$strip>;
export type ConfigurePricingPolicyRequest = z.infer<typeof ConfigurePricingPolicyRequestSchema>;
//# sourceMappingURL=index.d.ts.map