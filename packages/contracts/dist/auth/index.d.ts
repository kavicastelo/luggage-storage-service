import { z } from "zod";
export declare const UserStatusSchema: z.ZodEnum<{
    PENDING_VERIFICATION: "PENDING_VERIFICATION";
    ACTIVE: "ACTIVE";
    SUSPENDED: "SUSPENDED";
    DEACTIVATED: "DEACTIVATED";
}>;
export type UserStatus = z.infer<typeof UserStatusSchema>;
export declare const ClientTypeSchema: z.ZodEnum<{
    WEB: "WEB";
    MOBILE: "MOBILE";
    UNKNOWN: "UNKNOWN";
}>;
export type ClientType = z.infer<typeof ClientTypeSchema>;
export declare const EmailSchema: z.ZodString;
export declare const PasswordSchema: z.ZodString;
export declare const DisplayNameSchema: z.ZodString;
export declare const PhoneNumberSchema: z.ZodOptional<z.ZodString>;
export declare const RegisterRequestSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    displayName: z.ZodString;
    phoneNumber: z.ZodOptional<z.ZodString>;
    role: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type RegisterRequest = z.infer<typeof RegisterRequestSchema>;
export declare const RegisterResponseDataSchema: z.ZodObject<{
    id: z.ZodString;
    email: z.ZodString;
    displayName: z.ZodString;
    status: z.ZodEnum<{
        PENDING_VERIFICATION: "PENDING_VERIFICATION";
        ACTIVE: "ACTIVE";
        SUSPENDED: "SUSPENDED";
        DEACTIVATED: "DEACTIVATED";
    }>;
    isEmailVerified: z.ZodBoolean;
    isPhoneVerified: z.ZodBoolean;
    roles: z.ZodArray<z.ZodString>;
    createdAt: z.ZodString;
}, z.core.$strip>;
export type RegisterResponseData = z.infer<typeof RegisterResponseDataSchema>;
export declare const LoginRequestSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    clientType: z.ZodOptional<z.ZodEnum<{
        WEB: "WEB";
        MOBILE: "MOBILE";
        UNKNOWN: "UNKNOWN";
    }>>;
}, z.core.$strip>;
export type LoginRequest = z.infer<typeof LoginRequestSchema>;
export declare const AuthenticatedUserSchema: z.ZodObject<{
    id: z.ZodString;
    email: z.ZodString;
    displayName: z.ZodString;
    status: z.ZodEnum<{
        PENDING_VERIFICATION: "PENDING_VERIFICATION";
        ACTIVE: "ACTIVE";
        SUSPENDED: "SUSPENDED";
        DEACTIVATED: "DEACTIVATED";
    }>;
    isEmailVerified: z.ZodBoolean;
    isPhoneVerified: z.ZodBoolean;
    roles: z.ZodArray<z.ZodString>;
    permissions: z.ZodOptional<z.ZodArray<z.ZodString>>;
    lastLoginAt: z.ZodNullable<z.ZodString>;
}, z.core.$strip>;
export type AuthenticatedUser = z.infer<typeof AuthenticatedUserSchema>;
export declare const LoginResponseDataSchema: z.ZodObject<{
    user: z.ZodObject<{
        id: z.ZodString;
        email: z.ZodString;
        displayName: z.ZodString;
        status: z.ZodEnum<{
            PENDING_VERIFICATION: "PENDING_VERIFICATION";
            ACTIVE: "ACTIVE";
            SUSPENDED: "SUSPENDED";
            DEACTIVATED: "DEACTIVATED";
        }>;
        isEmailVerified: z.ZodBoolean;
        isPhoneVerified: z.ZodBoolean;
        roles: z.ZodArray<z.ZodString>;
        permissions: z.ZodOptional<z.ZodArray<z.ZodString>>;
        lastLoginAt: z.ZodNullable<z.ZodString>;
    }, z.core.$strip>;
    accessToken: z.ZodString;
    refreshToken: z.ZodOptional<z.ZodString>;
    expiresIn: z.ZodDefault<z.ZodNumber>;
    tokenType: z.ZodDefault<z.ZodLiteral<"Bearer">>;
}, z.core.$strip>;
export type LoginResponseData = z.infer<typeof LoginResponseDataSchema>;
export declare const RefreshRequestSchema: z.ZodObject<{
    refreshToken: z.ZodOptional<z.ZodString>;
    clientType: z.ZodOptional<z.ZodEnum<{
        WEB: "WEB";
        MOBILE: "MOBILE";
        UNKNOWN: "UNKNOWN";
    }>>;
}, z.core.$strip>;
export type RefreshRequest = z.infer<typeof RefreshRequestSchema>;
export declare const RefreshResponseDataSchema: z.ZodObject<{
    accessToken: z.ZodString;
    refreshToken: z.ZodOptional<z.ZodString>;
    expiresIn: z.ZodDefault<z.ZodNumber>;
    tokenType: z.ZodDefault<z.ZodLiteral<"Bearer">>;
}, z.core.$strip>;
export type RefreshResponseData = z.infer<typeof RefreshResponseDataSchema>;
export declare const LogoutResponseDataSchema: z.ZodObject<{
    message: z.ZodString;
}, z.core.$strip>;
export type LogoutResponseData = z.infer<typeof LogoutResponseDataSchema>;
export declare const UserMeResponseDataSchema: z.ZodObject<{
    user: z.ZodObject<{
        id: z.ZodString;
        email: z.ZodString;
        displayName: z.ZodString;
        status: z.ZodEnum<{
            PENDING_VERIFICATION: "PENDING_VERIFICATION";
            ACTIVE: "ACTIVE";
            SUSPENDED: "SUSPENDED";
            DEACTIVATED: "DEACTIVATED";
        }>;
        isEmailVerified: z.ZodBoolean;
        isPhoneVerified: z.ZodBoolean;
        roles: z.ZodArray<z.ZodString>;
        permissions: z.ZodOptional<z.ZodArray<z.ZodString>>;
        lastLoginAt: z.ZodNullable<z.ZodString>;
    }, z.core.$strip>;
    sessionId: z.ZodString;
    permissions: z.ZodOptional<z.ZodArray<z.ZodString>>;
}, z.core.$strip>;
export type UserMeResponseData = z.infer<typeof UserMeResponseDataSchema>;
export declare const SessionInfoSchema: z.ZodObject<{
    id: z.ZodString;
    clientType: z.ZodEnum<{
        WEB: "WEB";
        MOBILE: "MOBILE";
        UNKNOWN: "UNKNOWN";
    }>;
    ipAddress: z.ZodNullable<z.ZodString>;
    userAgent: z.ZodNullable<z.ZodString>;
    lastActiveAt: z.ZodString;
    createdAt: z.ZodString;
    isCurrentSession: z.ZodDefault<z.ZodBoolean>;
}, z.core.$strip>;
export type SessionInfo = z.infer<typeof SessionInfoSchema>;
export declare const SessionListResponseDataSchema: z.ZodObject<{
    sessions: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        clientType: z.ZodEnum<{
            WEB: "WEB";
            MOBILE: "MOBILE";
            UNKNOWN: "UNKNOWN";
        }>;
        ipAddress: z.ZodNullable<z.ZodString>;
        userAgent: z.ZodNullable<z.ZodString>;
        lastActiveAt: z.ZodString;
        createdAt: z.ZodString;
        isCurrentSession: z.ZodDefault<z.ZodBoolean>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type SessionListResponseData = z.infer<typeof SessionListResponseDataSchema>;
export declare const JwtPayloadSchema: z.ZodObject<{
    sub: z.ZodString;
    sessionId: z.ZodString;
    email: z.ZodString;
    roles: z.ZodArray<z.ZodString>;
    jti: z.ZodString;
    iat: z.ZodOptional<z.ZodNumber>;
    exp: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export type JwtPayload = z.infer<typeof JwtPayloadSchema>;
export declare const ChangePasswordRequestSchema: z.ZodObject<{
    currentPassword: z.ZodString;
    newPassword: z.ZodString;
    confirmPassword: z.ZodString;
}, z.core.$strip>;
export type ChangePasswordRequest = z.infer<typeof ChangePasswordRequestSchema>;
export declare const ChangePasswordResponseDataSchema: z.ZodObject<{
    message: z.ZodString;
}, z.core.$strip>;
export type ChangePasswordResponseData = z.infer<typeof ChangePasswordResponseDataSchema>;
export declare const ForgotPasswordRequestSchema: z.ZodObject<{
    email: z.ZodString;
}, z.core.$strip>;
export type ForgotPasswordRequest = z.infer<typeof ForgotPasswordRequestSchema>;
export declare const ForgotPasswordResponseDataSchema: z.ZodObject<{
    message: z.ZodString;
}, z.core.$strip>;
export type ForgotPasswordResponseData = z.infer<typeof ForgotPasswordResponseDataSchema>;
export declare const ResetPasswordRequestSchema: z.ZodObject<{
    token: z.ZodString;
    newPassword: z.ZodString;
    confirmPassword: z.ZodString;
}, z.core.$strip>;
export type ResetPasswordRequest = z.infer<typeof ResetPasswordRequestSchema>;
export declare const ResetPasswordResponseDataSchema: z.ZodObject<{
    message: z.ZodString;
}, z.core.$strip>;
export type ResetPasswordResponseData = z.infer<typeof ResetPasswordResponseDataSchema>;
export declare const VerifyEmailRequestSchema: z.ZodObject<{
    token: z.ZodString;
}, z.core.$strip>;
export type VerifyEmailRequest = z.infer<typeof VerifyEmailRequestSchema>;
export declare const VerifyEmailResponseDataSchema: z.ZodObject<{
    message: z.ZodString;
    user: z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        email: z.ZodString;
        status: z.ZodEnum<{
            PENDING_VERIFICATION: "PENDING_VERIFICATION";
            ACTIVE: "ACTIVE";
            SUSPENDED: "SUSPENDED";
            DEACTIVATED: "DEACTIVATED";
        }>;
        isEmailVerified: z.ZodBoolean;
        emailVerifiedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type VerifyEmailResponseData = z.infer<typeof VerifyEmailResponseDataSchema>;
export declare const ResendVerificationRequestSchema: z.ZodObject<{
    email: z.ZodString;
}, z.core.$strip>;
export type ResendVerificationRequest = z.infer<typeof ResendVerificationRequestSchema>;
export declare const ResendVerificationResponseDataSchema: z.ZodObject<{
    message: z.ZodString;
}, z.core.$strip>;
export type ResendVerificationResponseData = z.infer<typeof ResendVerificationResponseDataSchema>;
export declare const PasswordChangeRequestSchema: z.ZodObject<{
    currentPassword: z.ZodString;
    newPassword: z.ZodString;
    confirmPassword: z.ZodString;
}, z.core.$strip>;
export type PasswordChangeRequest = ChangePasswordRequest;
export declare const PasswordChangeResponseDataSchema: z.ZodObject<{
    message: z.ZodString;
}, z.core.$strip>;
export type PasswordChangeResponseData = ChangePasswordResponseData;
export declare const PasswordRecoveryRequestSchema: z.ZodObject<{
    email: z.ZodString;
}, z.core.$strip>;
export type PasswordRecoveryRequest = ForgotPasswordRequest;
export declare const PasswordRecoveryResponseDataSchema: z.ZodObject<{
    message: z.ZodString;
}, z.core.$strip>;
export type PasswordRecoveryResponseData = ForgotPasswordResponseData;
export declare const PasswordResetRequestSchema: z.ZodObject<{
    token: z.ZodString;
    newPassword: z.ZodString;
    confirmPassword: z.ZodString;
}, z.core.$strip>;
export type PasswordResetRequest = ResetPasswordRequest;
export declare const PasswordResetResponseDataSchema: z.ZodObject<{
    message: z.ZodString;
}, z.core.$strip>;
export type PasswordResetResponseData = ResetPasswordResponseData;
/**
 * Normalizes an email address according to the database constraint:
 * lower(trim(email))
 */
export declare function normalizeEmail(email: string): string;
//# sourceMappingURL=index.d.ts.map