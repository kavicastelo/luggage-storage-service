import { ErrorCode, ApiErrorDetail } from "@luggage-storage/contracts";
export declare class AppError extends Error {
    readonly code: ErrorCode;
    readonly statusCode: number;
    readonly details?: ApiErrorDetail[];
    readonly retryAfterSeconds?: number;
    constructor(code: ErrorCode, message: string, statusCode?: number, details?: ApiErrorDetail[], retryAfterSeconds?: number);
    static badRequest(message: string, details?: ApiErrorDetail[]): AppError;
    static validation(message?: string, details?: ApiErrorDetail[]): AppError;
    static notFound(message: string): AppError;
    static conflict(message: string): AppError;
    static unauthorized(message?: string): AppError;
    static forbidden(message?: string): AppError;
    static internal(message?: string): AppError;
    static serviceUnavailable(message?: string): AppError;
    static rateLimited(message?: string, retryAfterSeconds?: number): AppError;
}
//# sourceMappingURL=app-error.d.ts.map