import { z } from "zod";
export declare const SYSTEM_ROLES: readonly ["TRAVELLER", "HOST_OWNER", "HOST_STAFF", "SUPPORT", "SUPERADMIN"];
export type SystemRole = (typeof SYSTEM_ROLES)[number];
export declare const SYSTEM_PERMISSIONS: {
    readonly IDENTITY_PROFILE_READ: "identity.profile.read";
    readonly IDENTITY_PROFILE_UPDATE: "identity.profile.update";
    readonly IDENTITY_SESSION_READ_OWN: "identity.session.read_own";
    readonly IDENTITY_SESSION_REVOKE_OWN: "identity.session.revoke_own";
    readonly IDENTITY_PASSWORD_CHANGE: "identity.password.change";
    readonly ADMIN_USER_READ: "admin.user.read";
    readonly ADMIN_USER_SUSPEND: "admin.user.suspend";
    readonly ADMIN_USER_REINSTATE: "admin.user.reinstate";
    readonly ADMIN_USER_DEACTIVATE: "admin.user.deactivate";
    readonly ADMIN_USER_REACTIVATE: "admin.user.reactivate";
    readonly ADMIN_USER_VERIFY_EMAIL: "admin.user.verify_email";
    readonly ADMIN_SESSION_READ_ANY: "admin.session.read_any";
    readonly ADMIN_SESSION_REVOKE_ANY: "admin.session.revoke_any";
    readonly ADMIN_ROLE_READ: "admin.role.read";
    readonly ADMIN_ROLE_ASSIGN: "admin.role.assign";
    readonly ADMIN_ROLE_REVOKE: "admin.role.revoke";
    readonly ADMIN_PERMISSION_READ: "admin.permission.read";
    readonly ADMIN_AUDIT_READ: "admin.audit.read";
    readonly ADMIN_PLATFORM_MANAGE: "admin.platform.manage";
    readonly ADMIN_KYC_MANAGE: "admin.kyc.manage";
    readonly ADMIN_FINANCIAL_MANAGE: "admin.financial.manage";
    readonly SUPPORT_TICKET_READ: "support.ticket.read";
    readonly SUPPORT_TICKET_UPDATE: "support.ticket.update";
    readonly HOSTS_BUSINESS_CREATE: "hosts.business.create";
    readonly HOSTS_BUSINESS_READ_OWN: "hosts.business.read_own";
    readonly HOSTS_BUSINESS_UPDATE_OWN: "hosts.business.update_own";
    readonly HOSTS_STAFF_READ_OWN: "hosts.staff.read_own";
    readonly HOSTS_STAFF_MANAGE_OWN: "hosts.staff.manage_own";
    readonly HOSTS_VERIFICATION_SUBMIT: "hosts.verification.submit";
    readonly HOSTS_VERIFICATION_READ_OWN: "hosts.verification.read_own";
    readonly HOSTS_LOCATION_CREATE: "hosts.location.create";
    readonly HOSTS_LOCATION_READ_OWN: "hosts.location.read_own";
    readonly HOSTS_LOCATION_UPDATE_OWN: "hosts.location.update_own";
    readonly HOSTS_LOCATION_SUBMIT: "hosts.location.submit";
    readonly HOSTS_LOCATION_DISABLE: "hosts.location.disable";
    readonly HOSTS_LOCATION_CONFIGURE: "hosts.location.configure";
    readonly ADMIN_HOST_READ: "admin.host.read";
    readonly ADMIN_HOST_VERIFY: "admin.host.verify";
    readonly ADMIN_LOCATION_READ: "admin.location.read";
    readonly ADMIN_LOCATION_MODERATE: "admin.location.moderate";
    readonly UPLOAD_INITIATE: "upload.initiate";
    readonly BOOKINGS_CREATE: "bookings.create";
    readonly BOOKINGS_READ_OWN: "bookings.read_own";
    readonly BOOKINGS_CANCEL_OWN: "bookings.cancel_own";
    readonly HOSTS_BOOKINGS_READ_OWN: "hosts.bookings.read_own";
    readonly HOSTS_BOOKINGS_MANAGE_OWN: "hosts.bookings.manage_own";
    readonly HOSTS_CUSTODY_OPERATE: "hosts.custody.operate";
    readonly HOSTS_FINANCE_READ_OWN: "hosts.finance.read_own";
    readonly ADMIN_BOOKING_READ: "admin.booking.read";
    readonly ADMIN_BOOKING_MANAGE: "admin.booking.manage";
    readonly ADMIN_PAYMENT_READ: "admin.payment.read";
    readonly ADMIN_REFUND_READ: "admin.refund.read";
    readonly ADMIN_REFUND_MANAGE: "admin.refund.manage";
};
export type PermissionCode = (typeof SYSTEM_PERMISSIONS)[keyof typeof SYSTEM_PERMISSIONS];
export declare const PermissionCodeSchema: z.ZodString;
export declare const DEFAULT_ROLE_PERMISSIONS: Record<string, string[]>;
export declare const PermissionSchema: z.ZodObject<{
    id: z.ZodString;
    code: z.ZodString;
    name: z.ZodString;
    description: z.ZodNullable<z.ZodString>;
    module: z.ZodString;
    createdAt: z.ZodString;
}, z.core.$strip>;
export type Permission = z.infer<typeof PermissionSchema>;
export declare const RoleDetailSchema: z.ZodObject<{
    id: z.ZodString;
    code: z.ZodString;
    name: z.ZodString;
    description: z.ZodNullable<z.ZodString>;
    isSystem: z.ZodBoolean;
    permissions: z.ZodArray<z.ZodString>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, z.core.$strip>;
export type RoleDetail = z.infer<typeof RoleDetailSchema>;
export declare const AssignUserRoleRequestSchema: z.ZodObject<{
    roleCode: z.ZodString;
}, z.core.$strip>;
export type AssignUserRoleRequest = z.infer<typeof AssignUserRoleRequestSchema>;
export declare const AssignRolePermissionRequestSchema: z.ZodObject<{
    permissionCode: z.ZodString;
}, z.core.$strip>;
export type AssignRolePermissionRequest = z.infer<typeof AssignRolePermissionRequestSchema>;
export declare const PermissionListResponseDataSchema: z.ZodObject<{
    permissions: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        code: z.ZodString;
        name: z.ZodString;
        description: z.ZodNullable<z.ZodString>;
        module: z.ZodString;
        createdAt: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type PermissionListResponseData = z.infer<typeof PermissionListResponseDataSchema>;
export declare const RoleListResponseDataSchema: z.ZodObject<{
    roles: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        code: z.ZodString;
        name: z.ZodString;
        description: z.ZodNullable<z.ZodString>;
        isSystem: z.ZodBoolean;
        permissions: z.ZodArray<z.ZodString>;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type RoleListResponseData = z.infer<typeof RoleListResponseDataSchema>;
export declare const AssignUserRoleResponseDataSchema: z.ZodObject<{
    userId: z.ZodString;
    roles: z.ZodArray<z.ZodString>;
    message: z.ZodString;
}, z.core.$strip>;
export type AssignUserRoleResponseData = z.infer<typeof AssignUserRoleResponseDataSchema>;
export declare const RevokeUserRoleResponseDataSchema: z.ZodObject<{
    userId: z.ZodString;
    roles: z.ZodArray<z.ZodString>;
    message: z.ZodString;
}, z.core.$strip>;
export type RevokeUserRoleResponseData = z.infer<typeof RevokeUserRoleResponseDataSchema>;
export declare const UserEffectivePermissionsResponseDataSchema: z.ZodObject<{
    userId: z.ZodString;
    roles: z.ZodArray<z.ZodString>;
    permissions: z.ZodArray<z.ZodString>;
}, z.core.$strip>;
export type UserEffectivePermissionsResponseData = z.infer<typeof UserEffectivePermissionsResponseDataSchema>;
export declare const RolePermissionMutationResponseDataSchema: z.ZodObject<{
    roleCode: z.ZodString;
    permissions: z.ZodArray<z.ZodString>;
    message: z.ZodString;
}, z.core.$strip>;
export type RolePermissionMutationResponseData = z.infer<typeof RolePermissionMutationResponseDataSchema>;
//# sourceMappingURL=index.d.ts.map