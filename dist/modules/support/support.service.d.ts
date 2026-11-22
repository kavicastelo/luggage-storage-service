import { AdminSupportTicketQuery, AdminUpdateSupportTicketRequest, CreateSupportTicketRequest, CustomerSupportTicketReplyRequest, PaginationMeta, SupportTicketAdminDetail, SupportTicketCreatedResponse, SupportTicketCustomerDetail, SupportTicketReplyRequest, SupportTicketSummary } from "@luggage-storage/contracts";
import { AuditClientInfo } from "../audit/audit.service.js";
export declare class SupportService {
    /**
     * Public / optionally authenticated ticket intake endpoint (PW-009 /contact).
     * Enforces rate limiting and never discloses booking existence to callers.
     */
    createTicket(rawInput: CreateSupportTicketRequest, caller: {
        userId?: string;
        roles?: string[];
    } | null, clientInfo?: AuditClientInfo): Promise<SupportTicketCreatedResponse>;
    /**
     * Lists tickets created while authenticated as the current traveller or host user.
     */
    listMyTickets(userId: string): Promise<SupportTicketSummary[]>;
    /**
     * Retrieves a single ticket owned by the authenticated user, strictly stripping internal notes.
     */
    getMyTicketDetail(ticketIdOrRef: string, userId: string): Promise<SupportTicketCustomerDetail>;
    /**
     * Allows the authenticated requester to reply on their own open/resolved ticket.
     */
    replyMyTicket(ticketIdOrRef: string, userId: string, userRoles: string[], rawInput: CustomerSupportTicketReplyRequest, clientInfo?: AuditClientInfo): Promise<SupportTicketCustomerDetail>;
    /**
     * Admin / Support queue listing with search and filters.
     */
    listAdminTickets(rawQuery?: Partial<AdminSupportTicketQuery>): Promise<{
        tickets: SupportTicketSummary[];
        total: number;
        pagination: PaginationMeta;
    }>;
    /**
     * Full Support / Superadmin investigation view including internal notes & linked booking metadata.
     */
    getAdminTicketDetail(ticketIdOrRef: string): Promise<SupportTicketAdminDetail>;
    /**
     * Support / Superadmin replies publicly to requester OR appends an internal staff note.
     */
    replyAdminTicket(ticketIdOrRef: string, actorUserId: string, actorRoles: string[], rawInput: SupportTicketReplyRequest, clientInfo?: AuditClientInfo): Promise<SupportTicketAdminDetail>;
    /**
     * Updates status, priority, assignee, or resolution summary for a support ticket.
     */
    updateAdminTicket(ticketIdOrRef: string, actorUserId: string, rawInput: AdminUpdateSupportTicketRequest, clientInfo?: AuditClientInfo): Promise<SupportTicketAdminDetail>;
    private findTicketByIdOrRef;
    private mapTicketSummary;
    private mapMessage;
}
export declare const supportService: SupportService;
//# sourceMappingURL=support.service.d.ts.map