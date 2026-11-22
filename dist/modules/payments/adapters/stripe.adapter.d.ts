import Stripe from "stripe";
import { CreateGatewayCheckoutParams, CreateProviderRefundParams, NormalizedGatewayNotification, NotificationIdentifiers, PaymentGatewayPort, PaymentProviderCapabilities, ProviderRefundResult, RawWebhookNotificationInput } from "../payment-gateway.port.js";
export declare class StripeGatewayAdapter implements PaymentGatewayPort {
    private readonly secretKey?;
    private readonly publishableKey?;
    private readonly webhookSecret?;
    readonly providerName: "STRIPE";
    private readonly stripeInstance?;
    constructor(secretKey?: string | undefined, publishableKey?: string | undefined, webhookSecret?: string | undefined);
    get stripe(): Stripe;
    getCapabilities(): PaymentProviderCapabilities;
    buildCheckoutPayload(params: CreateGatewayCheckoutParams): Promise<Record<string, unknown>>;
    verifyNotificationSignature(input: RawWebhookNotificationInput): Stripe.Event;
    normalizeVerifiedNotification(input: RawWebhookNotificationInput): NormalizedGatewayNotification;
    verifyAndNormalizeNotification(input: RawWebhookNotificationInput): NormalizedGatewayNotification;
    normalizeEvent(event: Stripe.Event): NormalizedGatewayNotification;
    extractNotificationIdentifiers(input: RawWebhookNotificationInput): NotificationIdentifiers;
    createRefund(params: CreateProviderRefundParams): Promise<ProviderRefundResult>;
}
//# sourceMappingURL=stripe.adapter.d.ts.map