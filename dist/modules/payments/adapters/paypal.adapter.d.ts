import { CreateGatewayCheckoutParams, CreateProviderRefundParams, NormalizedGatewayNotification, NotificationIdentifiers, PaymentGatewayPort, PaymentProviderCapabilities, ProviderRefundResult, RawWebhookNotificationInput } from "../payment-gateway.port.js";
export declare class PayPalGatewayAdapter implements PaymentGatewayPort {
    private readonly clientId?;
    private readonly clientSecret?;
    private readonly webhookId?;
    private readonly sandboxMode;
    readonly providerName: "PAYPAL";
    private cachedToken;
    constructor(clientId?: string | undefined, clientSecret?: string | undefined, webhookId?: string | undefined, sandboxMode?: boolean);
    private get baseUrl();
    getCapabilities(): PaymentProviderCapabilities;
    getAccessToken(): Promise<string>;
    buildCheckoutPayload(params: CreateGatewayCheckoutParams): Promise<Record<string, unknown>>;
    verifyNotificationSignature(input: RawWebhookNotificationInput): Promise<void>;
    normalizeVerifiedNotification(input: RawWebhookNotificationInput): Promise<NormalizedGatewayNotification>;
    verifyAndNormalizeNotification(input: RawWebhookNotificationInput): Promise<NormalizedGatewayNotification>;
    extractNotificationIdentifiers(input: RawWebhookNotificationInput): NotificationIdentifiers;
    createRefund(params: CreateProviderRefundParams): Promise<ProviderRefundResult>;
}
//# sourceMappingURL=paypal.adapter.d.ts.map