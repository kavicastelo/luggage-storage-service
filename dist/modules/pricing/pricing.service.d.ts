import { ConfigurePricingPolicyRequest, PricingPolicy } from "@luggage-storage/contracts";
export interface PricingContext {
    userId: string;
    roles: string[];
    clientInfo?: {
        ip?: string;
        userAgent?: string;
        correlationId?: string;
    };
}
export declare class PricingService {
    /**
     * Retrieves the current active pricing policy for a storage location.
     */
    getPricingPolicy(locationId: string, context: PricingContext): Promise<PricingPolicy>;
    /**
     * Configures or updates the pricing policy and category multipliers for a location.
     * Enforces integer minor units arithmetic.
     */
    configurePricingPolicy(locationId: string, request: ConfigurePricingPolicyRequest, context: PricingContext): Promise<PricingPolicy>;
    private verifyLocationReadAccess;
    private verifyLocationWriteAccess;
}
export declare const pricingService: PricingService;
//# sourceMappingURL=pricing.service.d.ts.map