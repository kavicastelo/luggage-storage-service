import { CheckoutStatusQuery, CheckoutStatusResponse, CreatePaymentIntentRequest, PaymentIntent, SandboxSimulatePaymentRequest, RefundRecord, AdminTransitionRefundRequest, AdminRefundListQuery, PaymentTransactionRecord } from "@luggage-storage/contracts";
import { AuditClientInfo } from "../audit/audit.service.js";
export declare class PaymentsService {
    /**
     * Creates or returns an idempotent payment intent for a booking in PENDING_PAYMENT state.
     * Acquires bookings FOR UPDATE first, uses PostgreSQL NOW() for hold expiry, validates pricing snapshots,
     * locks payment_intents ORDER BY id ASC FOR UPDATE, and preserves a single active intent per booking.
     */
    createPaymentIntent(travellerUserId: string, rawInput: CreatePaymentIntentRequest, clientInfo?: AuditClientInfo): Promise<PaymentIntent>;
    /**
     * Returns authoritative booking & latest payment intent state for checkout return / polling.
     */
    getCheckoutStatus(userId: string, userRoles: string[], rawQuery: CheckoutStatusQuery): Promise<CheckoutStatusResponse>;
    /**
     * Verifies and processes an HMAC-SHA256 signed sandbox payment gateway webhook.
     */
    processSandboxWebhook(rawPayload: string, signatureHeader: string | undefined, clientInfo?: AuditClientInfo, options?: {
        evidenceSource?: "PROVIDER_WEBHOOK" | "SANDBOX_SIMULATOR";
    }): Promise<{
        duplicate: boolean;
        outcome: string;
        bookingId?: string;
        bookingStatus?: string;
    }>;
    /**
     * Verifies and processes an official PayHere notify_url notification (form-urlencoded or JSON)
     * using isolated md5sig verification inside PayHereGatewayAdapter.
     */
    processPayHereWebhook(rawPayload: string, headers: Record<string, string | string[] | undefined>, contentType: string | undefined, clientInfo?: AuditClientInfo): Promise<{
        duplicate: boolean;
        outcome: string;
        bookingId?: string;
        bookingStatus?: string;
    }>;
    /**
     * Verifies and processes an official Stripe webhook notification (JSON raw body)
     * using Stripe SDK signature verification.
     */
    processStripeWebhook(rawPayload: string, headers: Record<string, string | string[] | undefined>, clientInfo?: AuditClientInfo): Promise<{
        duplicate: boolean;
        outcome: string;
        bookingId?: string;
        bookingStatus?: string;
    }>;
    /**
     * Verifies and processes an official PayPal webhook notification (JSON raw body)
     * using PayPal REST API signature verification.
     */
    processPayPalWebhook(rawPayload: string, headers: Record<string, string | string[] | undefined>, clientInfo?: AuditClientInfo): Promise<{
        duplicate: boolean;
        outcome: string;
        bookingId?: string;
        bookingStatus?: string;
    }>;
    private processGatewayWebhook;
    private processGatewayWebhookInternal;
    /**
     * Explicitly labeled development/sandbox checkout simulator.
     * Forbidden in production; dispatches a genuinely HMAC-signed webhook payload through processSandboxWebhook.
     */
    simulateSandboxPayment(intentId: string, travellerUserId: string, rawInput: SandboxSimulatePaymentRequest, clientInfo?: AuditClientInfo): Promise<{
        duplicate: boolean;
        outcome: string;
        bookingId?: string;
        bookingStatus?: string;
    }>;
    /**
     * Superadmin refund lifecycle transition (OQ-013 7-stage state machine).
     * Enforces canonical Tier 2 (bookings) -> Tier 3 (payment_intents) -> Tier 4 (refund_records) lock order,
     * idempotent targetStatus retries, and actual gateway provider attribution on payment_transactions.
     */
    adminTransitionRefund(refundId: string, adminUserId: string, rawInput: AdminTransitionRefundRequest, clientInfo?: AuditClientInfo): Promise<RefundRecord>;
    /**
     * Lists refund records for Superadmin / Support inspection.
     */
    listAdminRefunds(rawQuery: Partial<AdminRefundListQuery>): Promise<{
        refunds: RefundRecord[];
        total: number;
        page: number;
        limit: number;
    }>;
    /**
     * Lists gateway payment transactions for Superadmin / Support inspection.
     */
    listAdminPaymentTransactions(page?: number, limit?: number, bookingId?: string): Promise<{
        transactions: PaymentTransactionRecord[];
        total: number;
    }>;
}
export declare const paymentsService: PaymentsService;
//# sourceMappingURL=payments.service.d.ts.map