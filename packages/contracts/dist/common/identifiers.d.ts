import { z } from "zod";
/**
 * Standard UUID v4 validation schema
 */
export declare const UuidSchema: z.ZodString;
export type Uuid = z.infer<typeof UuidSchema>;
/**
 * Common path parameter schemas
 */
export declare const UserIdParamSchema: z.ZodObject<{
    userId: z.ZodString;
}, z.core.$strip>;
export type UserIdParam = z.infer<typeof UserIdParamSchema>;
export declare const SessionIdParamSchema: z.ZodObject<{
    sessionId: z.ZodString;
}, z.core.$strip>;
export type SessionIdParam = z.infer<typeof SessionIdParamSchema>;
export declare const RoleIdParamSchema: z.ZodObject<{
    roleId: z.ZodString;
}, z.core.$strip>;
export type RoleIdParam = z.infer<typeof RoleIdParamSchema>;
export declare const RoleCodeParamSchema: z.ZodObject<{
    roleCode: z.ZodString;
}, z.core.$strip>;
export type RoleCodeParam = z.infer<typeof RoleCodeParamSchema>;
export declare const UserRoleParamSchema: z.ZodObject<{
    userId: z.ZodString;
    roleCode: z.ZodString;
}, z.core.$strip>;
export type UserRoleParam = z.infer<typeof UserRoleParamSchema>;
/**
 * International E.164 phone number schema:
 * Standard ITU-T format: +[country code][subscriber number], up to 15 digits total.
 * E.g. +94771234567, +14155552671, +442071838750
 */
export declare const E164PhoneNumberSchema: z.ZodString;
export type E164PhoneNumber = z.infer<typeof E164PhoneNumberSchema>;
/**
 * ISO 3166-1 alpha-2 country code schema:
 * Exactly 2 uppercase letters (e.g. LK, US, GB, JP, FR, DE, SG, TH, AE, IN).
 */
export declare const CountryCodeSchema: z.ZodString;
export type CountryCode = z.infer<typeof CountryCodeSchema>;
/**
 * Standard IANA Timezone schema:
 * E.g. "Asia/Colombo", "UTC", "America/New_York", "Europe/London".
 */
export declare const IanaTimezoneSchema: z.ZodString;
export type IanaTimezone = z.infer<typeof IanaTimezoneSchema>;
/**
 * BCP 47 language tag schema:
 * E.g. "en", "en-US", "si", "ta", "fr-FR", "de".
 */
export declare const Bcp47LanguageTagSchema: z.ZodString;
export type Bcp47LanguageTag = z.infer<typeof Bcp47LanguageTagSchema>;
/**
 * Sort order schema
 */
export declare const SortOrderSchema: z.ZodDefault<z.ZodEnum<{
    asc: "asc";
    desc: "desc";
}>>;
export type SortOrder = z.infer<typeof SortOrderSchema>;
/**
 * Reusable search query string
 */
export declare const SearchQuerySchema: z.ZodOptional<z.ZodString>;
export type SearchQuery = z.infer<typeof SearchQuerySchema>;
export declare function isValidUuid(value: unknown): value is string;
export declare function isValidE164Phone(value: unknown): value is string;
export declare function isValidCountryCode(value: unknown): value is string;
export declare function isValidIanaTimezone(value: unknown): value is string;
export declare function isValidBcp47Language(value: unknown): value is string;
//# sourceMappingURL=identifiers.d.ts.map