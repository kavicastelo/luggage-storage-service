import { PaymentCheckoutChannel, PayHereCheckoutCustomerResolved } from "@luggage-storage/contracts";
import { SandboxSignedGatewayAdapter } from "./adapters/sandbox.adapter.js";
import { StripeGatewayAdapter } from "./adapters/stripe.adapter.js";
import { PayPalGatewayAdapter } from "./adapters/paypal.adapter.js";
import { PayHereGatewayAdapter, parsePayHereNotificationFields } from "./adapters/legacy-payhere.adapter.js";
export type PaymentProviderName = "STRIPE" | "PAYPAL" | "SANDBOX_GATEWAY" | "PAYHERE";
export interface PaymentProviderCapabilities {
    supportsAutomaticCapture: boolean;
    supportsPartialRefunds: boolean;
    supportsDisputes: boolean;
    supportsWebhooks: boolean;
    supportedCurrencies: readonly string[];
    supportedPaymentMethods: readonly string[];
}
export interface CreateGatewayCheckoutParams {
    intentId: string;
    bookingId: string;
    referenceCode: string;
    providerOrderId: string;
    amountMinor: number;
    currency: string;
    channel?: PaymentCheckoutChannel;
    customerEmail: string;
    customerName: string;
    customerDetails?: Partial<PayHereCheckoutCustomerResolved>;
    returnUrl?: string;
    cancelUrl?: string;
}
export interface RawWebhookNotificationInput {
    rawBody: string;
    headers: Record<string, string | string[] | undefined>;
    contentType?: string;
}
export type NormalizedNotificationStatus = "SUCCEEDED" | "FAILED" | "PENDING" | "CANCELLED" | "CHARGEDBACK";
export interface NormalizedGatewayNotification {
    provider: PaymentProviderName;
    providerEventId: string;
    eventIdDerived: boolean;
    providerOrderId: string;
    merchantId?: string;
    paymentIntentId?: string;
    status: NormalizedNotificationStatus;
    rawStatusCode: string;
    amountMinor: number;
    currency: string;
    providerTransactionId?: string;
    providerTimestamp?: string;
    failureReason?: string;
    metadata?: Record<string, unknown>;
}
export interface NotificationIdentifiers {
    providerEventId?: string;
    providerOrderId?: string;
    paymentIntentId?: string;
}
export interface CreateProviderRefundParams {
    refundId: string;
    bookingId: string;
    paymentIntentId: string;
    providerTransactionId: string;
    amountMinor: number;
    currency: string;
    reason?: string;
}
export interface ProviderRefundResult {
    providerRefundId: string;
    status: "SUCCEEDED" | "PENDING" | "FAILED";
    amountMinor: number;
    currency: string;
    rawResponse?: Record<string, unknown>;
}
export interface PaymentGatewayPort {
    readonly providerName: PaymentProviderName;
    getCapabilities?(): PaymentProviderCapabilities;
    buildCheckoutPayload(params: CreateGatewayCheckoutParams): Promise<Record<string, unknown>> | Record<string, unknown>;
    verifyNotificationSignature(input: RawWebhookNotificationInput): Promise<any> | any;
    normalizeVerifiedNotification(input: RawWebhookNotificationInput): Promise<NormalizedGatewayNotification> | NormalizedGatewayNotification;
    verifyAndNormalizeNotification(input: RawWebhookNotificationInput): Promise<NormalizedGatewayNotification> | NormalizedGatewayNotification;
    extractNotificationIdentifiers(input: RawWebhookNotificationInput): NotificationIdentifiers;
    createRefund?(params: CreateProviderRefundParams): Promise<ProviderRefundResult>;
}
/**
 * Formats an integer minor-unit amount as a two-decimal string using pure integer arithmetic
 * (avoids IEEE-754 floating-point rounding bugs).
 */
export declare function formatMinorAmountTwoDecimals(amountMinor: number): string;
/**
 * Parses PayHere `^\d+\.\d{2}$` decimal strings into bounded integer minor units without parseFloat.
 */
export declare function parsePayHereDecimalAmountToMinor(rawAmount: string): number;
export declare function normalizeIsoCurrency(rawCurrency: string): string;
export declare function readSingleHeader(headers: Record<string, string | string[] | undefined>, targetName: string): string | undefined;
export declare function assertWebhookBodySize(rawBody: string): void;
export { SandboxSignedGatewayAdapter, StripeGatewayAdapter, PayPalGatewayAdapter, PayHereGatewayAdapter, parsePayHereNotificationFields };
export declare class PaymentProviderRegistry {
    private readonly providers;
    register(adapter: PaymentGatewayPort): void;
    get(name: PaymentProviderName): PaymentGatewayPort;
    has(name: PaymentProviderName): boolean;
}
export declare function resolveSandboxGatewayAdapter(): SandboxSignedGatewayAdapter;
export declare function resolveStripeGatewayAdapter(): StripeGatewayAdapter;
export declare function resolvePayPalGatewayAdapter(): PayPalGatewayAdapter;
export declare function resolvePayHereGatewayAdapter(channel?: PaymentCheckoutChannel): PayHereGatewayAdapter;
export declare function resolvePaymentGatewayAdapter(requestedProvider?: string, channel?: PaymentCheckoutChannel): PaymentGatewayPort;
//# sourceMappingURL=payment-gateway.port.d.ts.map