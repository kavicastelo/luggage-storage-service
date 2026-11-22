import { UpdateProfileRequestSchema, createSuccessResponse } from "@luggage-storage/contracts";
import { identityService } from "./identity.service.js";
function getClientInfo(request) {
    return {
        ip: request.ip,
        userAgent: request.headers["user-agent"],
        correlationId: request.headers["x-correlation-id"] || request.id
    };
}
/**
 * Self-service authenticated user profile routes mounted at /identity (and /api/v1/identity).
 */
export async function identityRoutes(app) {
    app.get("/profile", {
        preHandler: [app.authenticate],
        schema: {
            tags: ["Identity"],
            summary: "Retrieve the authenticated user's profile",
            security: [{ bearerAuth: [] }]
        }
    }, async (request, reply) => {
        const profile = await identityService.getProfile(request.user.sub);
        return reply.status(200).send(createSuccessResponse({ profile }, request.id));
    });
    app.patch("/profile", {
        preHandler: [app.authenticate],
        schema: {
            tags: ["Identity"],
            summary: "Update permitted profile fields for the authenticated user",
            security: [{ bearerAuth: [] }]
        }
    }, async (request, reply) => {
        const body = UpdateProfileRequestSchema.parse(request.body ?? {});
        const result = await identityService.updateProfile(request.user.sub, body, getClientInfo(request));
        return reply.status(200).send(createSuccessResponse(result, request.id));
    });
}
//# sourceMappingURL=identity.routes.js.map