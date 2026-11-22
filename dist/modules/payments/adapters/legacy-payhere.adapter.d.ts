import { PaymentCheckoutChannel } from "@luggage-storage/contracts";
import { CreateGatewayCheckoutParams, NormalizedGatewayNotification, NotificationIdentifiers, PaymentGatewayPort, PaymentProviderCapabilities, RawWebhookNotificationInput } from "../payment-gateway.port.js";
export declare function parsePayHereNotificationFields(input: RawWebhookNotificationInput): Record<string, string>;
/**
 * PayHere Gateway Adapter (Historical / Legacy).
 * PayHere is permanently retired as an active checkout gateway.
 * Kept for historical verification and backward-compatibility with existing unit tests.
 */
export declare class PayHereGatewayAdapter implements PaymentGatewayPort {
    private readonly merchantId;
    private readonly merchantSecret;
    private readonly sandboxMode;
    private readonly channel;
    private readonly notifyUrl?;
    private readonly returnUrl?;
    private readonly cancelUrl?;
    private readonly androidPackageName?;
    readonly providerName: "PAYHERE";
    constructor(merchantId: string, merchantSecret: string, sandboxMode: boolean, channel?: PaymentCheckoutChannel, notifyUrl?: string | undefined, returnUrl?: string | undefined, cancelUrl?: string | undefined, androidPackageName?: string | undefined);
    getCapabilities(): PaymentProviderCapabilities;
    private payHereMd5Upper;
    static computeNotifyMd5Sig(params: {
        merchantId: string;
        orderId: string;
        payhereAmount: string;
        payhereCurrency: string;
        statusCode: string;
        merchantSecret: string;
    }): string;
    static extractUntrustedWebhookLookup(input: RawWebhookNotificationInput): NotificationIdentifiers;
    buildCheckoutPayload(params: CreateGatewayCheckoutParams): Record<string, unknown>;
    private parseNotificationFields;
    private verifyFieldsAndComputeStatus;
    verifyNotificationSignature(input: RawWebhookNotificationInput): void;
    normalizeVerifiedNotification(input: RawWebhookNotificationInput): NormalizedGatewayNotification;
    verifyAndNormalizeNotification(input: RawWebhookNotificationInput): NormalizedGatewayNotification;
    extractNotificationIdentifiers(input: RawWebhookNotificationInput): NotificationIdentifiers;
}
//# sourceMappingURL=legacy-payhere.adapter.d.ts.map