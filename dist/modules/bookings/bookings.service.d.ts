import { BookingStatus, BookingDetail, BookingListQuery, CreateBookingRequest, CancelBookingRequest, HostDecisionBookingRequest, HostRejectBookingRequest, RecordBookingExceptionRequest, ResolveBookingDisputeRequest } from "@luggage-storage/contracts";
import { AuditClientInfo } from "../audit/audit.service.js";
export declare function assertValidBookingTransition(from: BookingStatus, to: BookingStatus): void;
/**
 * Evaluates OQ-009 customer cancellation refund percentage.
 */
export declare function evaluateCancellationRefundPercentage(params: {
    actorKind: "TRAVELLER" | "HOST" | "PLATFORM";
    dropOffAt: Date;
    now?: Date;
}): number;
export declare class BookingsService {
    /**
     * Creates a capacity-locked booking hold and immutable pricing snapshot.
     */
    createBooking(travellerUserId: string, rawInput: CreateBookingRequest, clientInfo?: AuditClientInfo): Promise<BookingDetail>;
    /**
     * Retrieves a single booking with OQ-012 post-confirmation address privacy enforcement.
     */
    getBookingDetail(bookingId: string, callerUserId: string, callerRoles: string[]): Promise<BookingDetail>;
    /**
     * Lists bookings owned by an authenticated traveller.
     */
    listTravellerBookings(travellerUserId: string, rawQuery: Partial<BookingListQuery>): Promise<{
        bookings: BookingDetail[];
        total: number;
        page: number;
        limit: number;
    }>;
    /**
     * Lists bookings strictly scoped to host's owned or staff-assigned storage locations.
     */
    listHostBookings(userId: string, userRoles: string[], rawQuery: Partial<BookingListQuery>): Promise<{
        bookings: BookingDetail[];
        total: number;
        page: number;
        limit: number;
    }>;
    /**
     * Lists bookings globally for Superadmin and Support operational visibility.
     */
    listAdminBookings(callerUserId: string, callerRoles: string[], rawQuery: Partial<BookingListQuery>): Promise<{
        bookings: BookingDetail[];
        total: number;
        page: number;
        limit: number;
    }>;
    /**
     * Host accepts a PENDING_HOST_APPROVAL request, transitioning it to PENDING_PAYMENT (+10m hold).
     */
    hostAcceptBooking(bookingId: string, hostUserId: string, hostRoles: string[], input: HostDecisionBookingRequest, clientInfo?: AuditClientInfo): Promise<BookingDetail>;
    /**
     * Host rejects a PENDING_HOST_APPROVAL request, releasing held capacity immediately.
     */
    hostRejectBooking(bookingId: string, hostUserId: string, hostRoles: string[], rawInput: HostRejectBookingRequest, clientInfo?: AuditClientInfo): Promise<BookingDetail>;
    /**
     * Cancels a booking (by TRAVELLER, HOST, or PLATFORM), releases capacity,
     * evaluates OQ-009 refund policy tiers, and reconciles the financial ledger.
     */
    cancelBooking(bookingId: string, actorUserId: string, actorRoles: string[], actorKind: "TRAVELLER" | "HOST" | "PLATFORM", rawInput: CancelBookingRequest, clientInfo?: AuditClientInfo): Promise<BookingDetail>;
    /**
     * Records an operational booking exception / incident, placing settlement on hold.
     */
    recordBookingException(bookingId: string, actorUserId: string, actorRoles: string[], rawInput: RecordBookingExceptionRequest, clientInfo?: AuditClientInfo): Promise<BookingDetail>;
    /**
     * Superadmin-only adjudication of a DISPUTED booking:
     * - UPHOLD_HOST: releases ON_HOLD host payable to ELIGIBLE (or posts settlement split if pre-collection),
     *   completes custody record / booking status, and logs BOOKING_DISPUTE_RESOLVED.
     * - REFUND_TRAVELLER: cancels booking under platform authority, issues full/partial DISPUTE_RESOLUTION refund,
     *   reclassifies or claws back host_payables atomically, and posts balanced ledger adjustments.
     */
    resolveDispute(bookingId: string, actorUserId: string, actorRoles: string[], rawInput: ResolveBookingDisputeRequest, clientInfo?: AuditClientInfo): Promise<BookingDetail>;
}
export declare const bookingsService: BookingsService;
//# sourceMappingURL=bookings.service.d.ts.map