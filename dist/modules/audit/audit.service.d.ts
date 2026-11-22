import { SecurityEventType, type AdminAuditEventQuery, type SecurityAuditEvent, type SecurityEventType as SecurityEventTypeString } from "@luggage-storage/contracts";
export { SecurityEventType };
export interface AuditClientInfo {
    ip?: string | null;
    ipAddress?: string | null;
    userAgent?: string | null;
    correlationId?: string | null;
}
export interface RecordSecurityEventParams {
    eventType: SecurityEventTypeString | string;
    userId?: string | null;
    ipAddress?: string | null;
    userAgent?: string | null;
    clientInfo?: AuditClientInfo | null;
    metadata?: Record<string, unknown> | null;
    tx?: any;
    throwOnError?: boolean;
}
/**
 * Deep recursive metadata sanitizer ensuring zero credential or secret disclosure.
 */
export declare function sanitizeAuditMetadata(metadata?: Record<string, unknown> | null): Record<string, unknown>;
export declare class AuditService {
    /**
     * Appends an immutable security audit record to the security_audit_events table.
     *
     * Architectural & Security Guarantees:
     * 1. Immutability: Protected by database trigger `trg_prevent_audit_tampering` blocking UPDATE/DELETE.
     * 2. Zero Credential Disclosure: Deep sanitization removes passwords, hashes, tokens, and secrets.
     * 3. Correlation Tracking: Automatically associates client IP, User-Agent, and correlationId.
     * 4. Transactional Consistency: Can execute within caller's Drizzle transaction (`tx`) or standalone (`db`).
     * 5. Failure Resilience: Standalone logging does not disrupt caller flow unless `throwOnError: true`.
     */
    recordEvent(params: RecordSecurityEventParams): Promise<any>;
    /**
     * Retrieves security audit events for a specific user, ordered chronologically descending.
     */
    getEventsForUser(userId: string, limit?: number): Promise<{
        id: string;
        userId: string | null;
        eventType: string;
        ipAddress: string | null;
        userAgent: string | null;
        metadata: unknown;
        createdAt: Date;
    }[]>;
    /**
     * Retrieves recent security audit events across the platform with optional event filtering.
     */
    getRecentEvents(options?: {
        eventType?: string;
        limit?: number;
        offset?: number;
    }): Promise<{
        id: string;
        userId: string | null;
        eventType: string;
        ipAddress: string | null;
        userAgent: string | null;
        metadata: unknown;
        createdAt: Date;
    }[]>;
    /**
     * Retrieves a single security audit event by ID.
     */
    getEventById(id: string): Promise<{
        id: string;
        userId: string | null;
        eventType: string;
        ipAddress: string | null;
        userAgent: string | null;
        metadata: unknown;
        createdAt: Date;
    }>;
    /**
     * Paginated, filterable retrieval of security audit events for administrative inspection.
     */
    listAuditEvents(query: AdminAuditEventQuery): Promise<{
        items: SecurityAuditEvent[];
        total: number;
    }>;
}
export declare const auditService: AuditService;
//# sourceMappingURL=audit.service.d.ts.map