import { z } from "zod";
/**
 * ISO 4217 Currency Code Schema
 */
export declare const CurrencyCodeSchema: z.ZodEnum<{
    LKR: "LKR";
    USD: "USD";
    EUR: "EUR";
    GBP: "GBP";
    JPY: "JPY";
}>;
export type CurrencyCode = z.infer<typeof CurrencyCodeSchema>;
export interface CurrencyMetadata {
    code: CurrencyCode;
    exponent: number;
    symbol: string;
}
/**
 * Authoritative currency registry defining minor-unit exponents and display symbols.
 * Conforms to ISO 4217 specifications.
 */
export declare const CURRENCY_REGISTRY: Record<CurrencyCode, CurrencyMetadata>;
/**
 * Integer minor units schema:
 * Monetary values MUST be non-negative integers representing the smallest unit of currency
 * (e.g. cents for USD/EUR, minor units for LKR, whole yen for JPY).
 * Floating-point numbers are strictly forbidden.
 */
export declare const MinorUnitsSchema: z.ZodNumber;
export type MinorUnits = z.infer<typeof MinorUnitsSchema>;
/**
 * Explicit monetary amount schema pairing integer minor units with ISO 4217 currency code.
 */
export declare const MonetaryAmountSchema: z.ZodObject<{
    amount: z.ZodNumber;
    currency: z.ZodEnum<{
        LKR: "LKR";
        USD: "USD";
        EUR: "EUR";
        GBP: "GBP";
        JPY: "JPY";
    }>;
}, z.core.$strip>;
export type MonetaryAmount = z.infer<typeof MonetaryAmountSchema>;
/**
 * Formats minor units into an international display string with symbol and correct fractional digits.
 */
export declare function formatCurrencyMinorUnits(amountMinor: number, currency: CurrencyCode): string;
export declare const formatMinorUnits: typeof formatCurrencyMinorUnits;
/**
 * Retrieves the exponent for a given currency code.
 */
export declare function getCurrencyExponent(currency: CurrencyCode): number;
/**
 * Retrieves the currency symbol for a given currency code.
 */
export declare function getCurrencySymbol(currency: CurrencyCode): string;
/**
 * Safely converts a major-unit decimal amount (e.g., 10.50 USD) to exact integer minor units (e.g., 1050).
 * Prevents JavaScript floating-point rounding errors using Math.round.
 */
export declare function toMinorUnits(majorAmount: number, currency: CurrencyCode): number;
/**
 * Converts integer minor units to major units as a number.
 */
export declare function toMajorUnits(minorAmount: number, currency: CurrencyCode): number;
/**
 * Validation helper for minor units.
 */
export declare function isValidMinorUnits(value: unknown): value is number;
//# sourceMappingURL=currency.d.ts.map