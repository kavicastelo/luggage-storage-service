import { CreateCapacityPoolRequest, UpdateCapacityPoolRequest, StorageCapacityPool } from "@luggage-storage/contracts";
export interface CapacityContext {
    userId: string;
    roles: string[];
    clientInfo?: {
        ip?: string;
        userAgent?: string;
        correlationId?: string;
    };
}
export declare class CapacityService {
    /**
     * Retrieves all capacity pools configured for a location.
     */
    getCapacityPools(locationId: string, context: CapacityContext): Promise<StorageCapacityPool[]>;
    /**
     * Adds a new capacity pool to a location.
     */
    createCapacityPool(locationId: string, request: CreateCapacityPoolRequest, context: CapacityContext): Promise<StorageCapacityPool>;
    /**
     * Updates an existing capacity pool.
     */
    updateCapacityPool(poolId: string, request: UpdateCapacityPoolRequest, context: CapacityContext): Promise<StorageCapacityPool>;
    /**
     * Deletes an existing capacity pool.
     */
    deleteCapacityPool(poolId: string, context: CapacityContext): Promise<void>;
    private assertZoneBelongsToLocation;
    private verifyLocationReadAccess;
    private verifyLocationWriteAccess;
}
export declare const capacityService: CapacityService;
//# sourceMappingURL=capacity.service.d.ts.map