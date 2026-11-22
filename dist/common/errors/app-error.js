export class AppError extends Error {
    code;
    statusCode;
    details;
    retryAfterSeconds;
    constructor(code, message, statusCode = 400, details, retryAfterSeconds) {
        super(message);
        this.name = "AppError";
        this.code = code;
        this.statusCode = statusCode;
        this.details = details;
        this.retryAfterSeconds = retryAfterSeconds;
        Error.captureStackTrace(this, this.constructor);
    }
    static badRequest(message, details) {
        return new AppError("BAD_REQUEST", message, 400, details);
    }
    static validation(message = "Validation failed", details) {
        return new AppError("VALIDATION_ERROR", message, 400, details);
    }
    static notFound(message) {
        return new AppError("NOT_FOUND", message, 404);
    }
    static conflict(message) {
        return new AppError("CONFLICT", message, 409);
    }
    static unauthorized(message = "Authentication required") {
        return new AppError("UNAUTHORIZED", message, 401);
    }
    static forbidden(message = "Access denied") {
        return new AppError("FORBIDDEN", message, 403);
    }
    static internal(message = "Internal server error") {
        return new AppError("INTERNAL_SERVER_ERROR", message, 500);
    }
    static serviceUnavailable(message = "Service unavailable") {
        return new AppError("SERVICE_UNAVAILABLE", message, 503);
    }
    static rateLimited(message = "Too many requests", retryAfterSeconds) {
        return new AppError("RATE_LIMITED", message, 429, undefined, retryAfterSeconds);
    }
}
//# sourceMappingURL=app-error.js.map