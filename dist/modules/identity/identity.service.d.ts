import { UpdateProfileRequest, UpdateProfileResponseData, UserProfileData } from "@luggage-storage/contracts";
import { AuditClientInfo } from "../audit/audit.service.js";
export declare class IdentityService {
    /**
     * Returns the authenticated user's profile, roles, permissions, and traveller/host sub-profiles.
     */
    getProfile(userId: string): Promise<UserProfileData>;
    /**
     * Updates explicitly permitted profile fields for the authenticated user only.
     */
    updateProfile(userId: string, rawInput: UpdateProfileRequest, clientInfo?: AuditClientInfo): Promise<UpdateProfileResponseData>;
}
export declare const identityService: IdentityService;
//# sourceMappingURL=identity.service.d.ts.map