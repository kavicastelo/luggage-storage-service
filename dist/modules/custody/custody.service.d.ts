import { CustodyOperation, CustodyPassResponse, CustodyRecordDetail, IssueCustodyPassRequest, VerifyCustodyPassRequest, CompleteCheckInRequest, CompleteCollectionRequest } from "@luggage-storage/contracts";
import { AuditClientInfo } from "../audit/audit.service.js";
export declare class CustodyService {
    /**
     * Issues a short-lived CSPRNG QR token and 6-digit numeric fallback PIN bound to
     * (bookingId, operation). Stores ONLY keyed domain-separated HMAC-SHA256 digests (`hmac-sha256-v2`);
     * revokes unconsumed prior tokens inside the booking -> custody lock order.
     */
    issueCustodyPass(bookingId: string, callerUserId: string, rawInput: IssueCustodyPassRequest, clientInfo?: AuditClientInfo): Promise<CustodyPassResponse>;
    /**
     * Constant-time keyed HMAC-SHA256 verifier for QR token or 6-digit PIN
     * strictly bound to (purpose, bookingId, operation) and hash_version = 'hmac-sha256-v2'.
     */
    private verifyCredentialInternal;
    private enforceVerificationRateLimits;
    /**
     * Counter pre-verification of a traveller's QR token or 6-digit PIN without consuming it yet.
     */
    verifyCustodyPassForHost(actorUserId: string, actorRoles: string[], rawInput: VerifyCustodyPassRequest, clientInfo?: AuditClientInfo): Promise<{
        verified: boolean;
        bookingId: string;
        referenceCode: string;
        operation: CustodyOperation;
        expectedBagCount: number;
        checkedInBagCount: number | null;
        custodyStatus: string;
    }>;
    /**
     * Executes physical luggage check-in, consumes CHECK_IN token/PIN, records bag tags/seals/zones,
     * and transitions booking + custody to IN_STORAGE.
     */
    completeCheckIn(bookingId: string, actorUserId: string, actorRoles: string[], rawInput: CompleteCheckInRequest, clientInfo?: AuditClientInfo): Promise<CustodyRecordDetail>;
    /**
     * Executes physical luggage collection release, enforces OQ-015 Zero Possessory Lien
     * (never blocking overdue return upon valid COLLECTION credential), releases capacity,
     * and accrues host payable + balanced ledger settlement.
     */
    completeCollection(bookingId: string, actorUserId: string, actorRoles: string[], rawInput: CompleteCollectionRequest, clientInfo?: AuditClientInfo): Promise<CustodyRecordDetail>;
    /**
     * Retrieves complete custody record, bag tags, and immutable chain-of-custody event history.
     */
    getCustodyDetail(bookingId: string, callerUserId: string, callerRoles: string[]): Promise<CustodyRecordDetail>;
}
export declare const custodyService: CustodyService;
//# sourceMappingURL=custody.service.d.ts.map