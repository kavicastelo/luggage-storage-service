import { z } from "zod";
/**
 * ISO 8601 UTC Datetime String Schema:
 * Validates full datetime representations (e.g. 2026-11-08T06:30:00.000Z).
 */
export declare const IsoDateTimeStringSchema: z.ZodString;
export type IsoDateTimeString = z.infer<typeof IsoDateTimeStringSchema>;
/**
 * ISO 8601 Calendar Date Schema:
 * Validates calendar dates in YYYY-MM-DD format (e.g. 2026-11-08).
 */
export declare const IsoDateStringSchema: z.ZodString;
export type IsoDateString = z.infer<typeof IsoDateStringSchema>;
/**
 * Validated Date Range Schema:
 * Ensures the start datetime precedes or equals the end datetime.
 */
export declare const DateRangeSchema: z.ZodObject<{
    from: z.ZodString;
    to: z.ZodString;
}, z.core.$strip>;
export type DateRange = z.infer<typeof DateRangeSchema>;
export declare function isValidISODateString(value: unknown): value is string;
export declare function isValidISODateOnlyString(value: unknown): value is string;
export declare function addDurationToISO(baseIso: string, amount: number, unit: "minutes" | "hours" | "days"): string;
//# sourceMappingURL=dates.d.ts.map