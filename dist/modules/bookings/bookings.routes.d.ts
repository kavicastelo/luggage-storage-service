import { FastifyInstance } from "fastify";
/**
 * Public availability search routes mounted at /availability (and /api/v1/availability).
 */
export declare function availabilityRoutes(app: FastifyInstance): Promise<void>;
/**
 * Traveller booking & quotation routes mounted at /bookings (and /api/v1/bookings).
 */
export declare function bookingRoutes(app: FastifyInstance): Promise<void>;
/**
 * Host booking & settlement payable routes mounted under /hosts (and /api/v1/hosts).
 */
export declare function hostBookingAndFinanceRoutes(app: FastifyInstance): Promise<void>;
//# sourceMappingURL=bookings.routes.d.ts.map