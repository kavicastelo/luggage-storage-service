import { eq, desc, and, sql } from "drizzle-orm";
import { SecurityEventType, BAG_CATEGORIES, DEFAULT_CATEGORY_MULTIPLIERS_BPS } from "@luggage-storage/contracts";
import { db, schema } from "../../infrastructure/database/drizzle.js";
import { AppError } from "../../common/errors/app-error.js";
import { auditService } from "../audit/audit.service.js";
import { assertHostLocationAccess } from "../bookings/host-access.helper.js";
export class PricingService {
    /**
     * Retrieves the current active pricing policy for a storage location.
     */
    async getPricingPolicy(locationId, context) {
        await this.verifyLocationReadAccess(locationId, context);
        const [policy] = await db
            .select()
            .from(schema.pricingPolicies)
            .where(and(eq(schema.pricingPolicies.locationId, locationId), eq(schema.pricingPolicies.status, "ACTIVE")))
            .orderBy(desc(schema.pricingPolicies.createdAt))
            .limit(1);
        if (!policy) {
            throw AppError.notFound("Pricing policy not found for this location");
        }
        const tiers = await db
            .select()
            .from(schema.pricingTierRates)
            .where(eq(schema.pricingTierRates.policyId, policy.id));
        return {
            id: policy.id,
            locationId: policy.locationId,
            currency: policy.currency,
            pricingUnit: policy.pricingUnit,
            baseRateMinor: policy.baseRateMinor,
            status: policy.status,
            createdAt: policy.createdAt.toISOString(),
            updatedAt: policy.updatedAt.toISOString(),
            tierRates: tiers.map((t) => ({
                id: t.id,
                policyId: t.policyId,
                bagCategory: t.bagCategory,
                rateMinor: t.rateMinor,
                categoryMultiplierBps: t.categoryMultiplierBps,
                createdAt: t.createdAt.toISOString(),
                updatedAt: t.updatedAt.toISOString()
            }))
        };
    }
    /**
     * Configures or updates the pricing policy and category multipliers for a location.
     * Enforces integer minor units arithmetic.
     */
    async configurePricingPolicy(locationId, request, context) {
        await this.verifyLocationWriteAccess(locationId, context);
        const result = await db.transaction(async (tx) => {
            // 1. Serialize concurrent configuration calls for this location via row lock
            await tx.execute(sql `SELECT id FROM storage_locations WHERE id = ${locationId}::uuid FOR UPDATE;`);
            // 2. Find existing active policy
            const [existing] = await tx
                .select()
                .from(schema.pricingPolicies)
                .where(and(eq(schema.pricingPolicies.locationId, locationId), eq(schema.pricingPolicies.status, "ACTIVE")))
                .limit(1);
            let policyId;
            let policyRecord;
            if (existing) {
                const [updated] = await tx
                    .update(schema.pricingPolicies)
                    .set({
                    currency: request.currency || "LKR",
                    pricingUnit: request.pricingUnit || "CALENDAR_DAY",
                    baseRateMinor: request.baseRateMinor,
                    status: "ACTIVE",
                    updatedAt: new Date()
                })
                    .where(eq(schema.pricingPolicies.id, existing.id))
                    .returning();
                policyId = updated.id;
                policyRecord = updated;
            }
            else {
                const [created] = await tx
                    .insert(schema.pricingPolicies)
                    .values({
                    locationId,
                    currency: request.currency || "LKR",
                    pricingUnit: request.pricingUnit || "CALENDAR_DAY",
                    baseRateMinor: request.baseRateMinor,
                    status: "ACTIVE"
                })
                    .returning();
                policyId = created.id;
                policyRecord = created;
            }
            // Re-create or upsert tier rates
            await tx
                .delete(schema.pricingTierRates)
                .where(eq(schema.pricingTierRates.policyId, policyId));
            const tiersToInsert = BAG_CATEGORIES.map((cat) => {
                const customTier = request.tierRates?.find((t) => t.bagCategory === cat);
                const bps = customTier?.categoryMultiplierBps ||
                    DEFAULT_CATEGORY_MULTIPLIERS_BPS[cat] ||
                    10000;
                const rateMinor = customTier?.rateMinor !== undefined
                    ? customTier.rateMinor
                    : Math.round((request.baseRateMinor * bps) / 10000);
                return {
                    policyId,
                    bagCategory: cat,
                    rateMinor,
                    categoryMultiplierBps: bps
                };
            });
            const insertedTiers = await tx
                .insert(schema.pricingTierRates)
                .values(tiersToInsert)
                .returning();
            await auditService.recordEvent({
                eventType: SecurityEventType.STORAGE_LOCATION_CONFIG_UPDATED,
                userId: context.userId,
                clientInfo: context.clientInfo,
                tx,
                metadata: {
                    locationId,
                    configType: "PRICING_POLICY_CONFIGURED",
                    policyId,
                    baseRateMinor: request.baseRateMinor
                }
            });
            return {
                policy: policyRecord,
                tierRates: insertedTiers
            };
        });
        return {
            id: result.policy.id,
            locationId: result.policy.locationId,
            currency: result.policy.currency,
            pricingUnit: result.policy.pricingUnit,
            baseRateMinor: result.policy.baseRateMinor,
            status: result.policy.status,
            createdAt: result.policy.createdAt.toISOString(),
            updatedAt: result.policy.updatedAt.toISOString(),
            tierRates: result.tierRates.map((t) => ({
                id: t.id,
                policyId: t.policyId,
                bagCategory: t.bagCategory,
                rateMinor: t.rateMinor,
                categoryMultiplierBps: t.categoryMultiplierBps,
                createdAt: t.createdAt.toISOString(),
                updatedAt: t.updatedAt.toISOString()
            }))
        };
    }
    async verifyLocationReadAccess(locationId, context) {
        if (context.roles.includes("SUPERADMIN") || context.roles.includes("SUPPORT")) {
            const [loc] = await db
                .select({ id: schema.storageLocations.id })
                .from(schema.storageLocations)
                .where(eq(schema.storageLocations.id, locationId))
                .limit(1);
            if (!loc) {
                throw AppError.notFound("Storage location not found");
            }
            return;
        }
        await assertHostLocationAccess(db, context.userId, context.roles, locationId);
    }
    async verifyLocationWriteAccess(locationId, context) {
        const [loc] = await db
            .select({
            id: schema.storageLocations.id,
            ownerUserId: schema.hostBusinesses.ownerUserId,
            businessStatus: schema.hostBusinesses.status
        })
            .from(schema.storageLocations)
            .innerJoin(schema.hostBusinesses, eq(schema.storageLocations.businessId, schema.hostBusinesses.id))
            .where(eq(schema.storageLocations.id, locationId))
            .limit(1);
        if (!loc) {
            throw AppError.notFound("Storage location not found");
        }
        const isSuperadmin = context.roles.includes("SUPERADMIN");
        if (loc.ownerUserId !== context.userId && !isSuperadmin) {
            await auditService.recordEvent({
                eventType: SecurityEventType.AUTH_ACCESS_DENIED,
                userId: context.userId,
                clientInfo: context.clientInfo,
                metadata: {
                    locationId,
                    action: "PRICING_WRITE_DENIED",
                    roles: context.roles
                }
            });
            throw AppError.forbidden("Access denied: You do not have permission to manage pricing for this location");
        }
        if (loc.businessStatus === "SUSPENDED" || loc.businessStatus === "REJECTED") {
            throw AppError.badRequest(`Cannot configure pricing for a location belonging to a ${loc.businessStatus.toLowerCase()} business`);
        }
    }
}
export const pricingService = new PricingService();
//# sourceMappingURL=pricing.service.js.map