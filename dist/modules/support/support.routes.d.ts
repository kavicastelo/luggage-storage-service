import { FastifyInstance } from "fastify";
/**
 * Public / Customer support ticket routes mounted at /support (and /api/v1/support).
 */
export declare function supportRoutes(app: FastifyInstance): Promise<void>;
/**
 * Support & Superadmin ticket triage routes mounted at /admin (and /api/v1/admin).
 */
export declare function adminSupportRoutes(app: FastifyInstance): Promise<void>;
//# sourceMappingURL=support.routes.d.ts.map