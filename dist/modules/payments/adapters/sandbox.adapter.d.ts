import { SandboxWebhookPayload } from "@luggage-storage/contracts";
import { CreateGatewayCheckoutParams, CreateProviderRefundParams, NormalizedGatewayNotification, NotificationIdentifiers, PaymentGatewayPort, PaymentProviderCapabilities, ProviderRefundResult, RawWebhookNotificationInput } from "../payment-gateway.port.js";
export declare class SandboxSignedGatewayAdapter implements PaymentGatewayPort {
    private readonly webhookSecret;
    private readonly nodeEnv;
    readonly providerName: "SANDBOX_GATEWAY";
    constructor(webhookSecret: string, nodeEnv: string);
    getCapabilities(): PaymentProviderCapabilities;
    buildCheckoutPayload(params: CreateGatewayCheckoutParams): Record<string, unknown>;
    signWebhookPayload(rawPayload: string): string;
    verifyAndParseWebhook(rawPayload: string, providedSignature?: string): SandboxWebhookPayload;
    verifyNotificationSignature(input: RawWebhookNotificationInput): void;
    normalizeVerifiedNotification(input: RawWebhookNotificationInput): NormalizedGatewayNotification;
    verifyAndNormalizeNotification(input: RawWebhookNotificationInput): NormalizedGatewayNotification;
    extractNotificationIdentifiers(input: RawWebhookNotificationInput): NotificationIdentifiers;
    createRefund(params: CreateProviderRefundParams): Promise<ProviderRefundResult>;
}
//# sourceMappingURL=sandbox.adapter.d.ts.map