import Stripe from "stripe";
import { AppError } from "../../../common/errors/app-error.js";
import { readSingleHeader } from "../payment-gateway.port.js";
export class StripeGatewayAdapter {
    secretKey;
    publishableKey;
    webhookSecret;
    providerName = "STRIPE";
    stripeInstance;
    constructor(secretKey, publishableKey, webhookSecret) {
        this.secretKey = secretKey;
        this.publishableKey = publishableKey;
        this.webhookSecret = webhookSecret;
        if (this.secretKey) {
            this.stripeInstance = new Stripe(this.secretKey, {
                apiVersion: "2025-02-24.acacia"
            });
        }
    }
    get stripe() {
        if (!this.stripeInstance) {
            throw AppError.internal("Stripe secret key (STRIPE_SECRET_KEY) is not configured");
        }
        return this.stripeInstance;
    }
    getCapabilities() {
        return {
            supportsAutomaticCapture: true,
            supportsPartialRefunds: true,
            supportsDisputes: true,
            supportsWebhooks: true,
            supportedCurrencies: ["USD", "EUR", "GBP", "LKR", "AUD", "CAD", "SGD", "JPY"],
            supportedPaymentMethods: ["card", "link", "apple_pay", "google_pay"]
        };
    }
    async buildCheckoutPayload(params) {
        if (!this.publishableKey) {
            throw AppError.internal("Stripe publishable key (STRIPE_PUBLISHABLE_KEY) is not configured");
        }
        const paymentIntent = await this.stripe.paymentIntents.create({
            amount: params.amountMinor,
            currency: params.currency.toLowerCase(),
            description: `Luggage Storage - ${params.referenceCode}`,
            metadata: {
                intentId: params.intentId,
                bookingId: params.bookingId,
                referenceCode: params.referenceCode,
                providerOrderId: params.providerOrderId,
                customerEmail: params.customerEmail
            },
            automatic_payment_methods: {
                enabled: true
            }
        }, {
            idempotencyKey: `pi_${params.intentId}`
        });
        return {
            mode: "STRIPE_ELEMENTS",
            provider: "STRIPE",
            clientSecret: paymentIntent.client_secret,
            publishableKey: this.publishableKey,
            paymentIntentId: paymentIntent.id
        };
    }
    verifyNotificationSignature(input) {
        if (!this.webhookSecret) {
            throw AppError.internal("Stripe webhook signing secret (STRIPE_WEBHOOK_SECRET) is not configured");
        }
        const signature = readSingleHeader(input.headers, "stripe-signature");
        if (!signature) {
            throw AppError.unauthorized("Missing stripe-signature header");
        }
        try {
            return this.stripe.webhooks.constructEvent(input.rawBody, signature, this.webhookSecret);
        }
        catch (err) {
            throw AppError.unauthorized(`Invalid Stripe webhook cryptographic signature: ${err.message}`);
        }
    }
    normalizeVerifiedNotification(input) {
        const event = this.verifyNotificationSignature(input);
        return this.normalizeEvent(event);
    }
    verifyAndNormalizeNotification(input) {
        return this.normalizeVerifiedNotification(input);
    }
    normalizeEvent(event) {
        const eventObj = event.data.object;
        const metadata = (eventObj.metadata ?? {});
        const paymentIntentId = metadata.intentId;
        const providerOrderId = metadata.providerOrderId || eventObj.id;
        let status = "PENDING";
        let failureReason;
        let providerTransactionId;
        switch (event.type) {
            case "payment_intent.succeeded": {
                status = "SUCCEEDED";
                const pi = eventObj;
                providerTransactionId =
                    typeof pi.latest_charge === "string"
                        ? pi.latest_charge
                        : (pi.latest_charge?.id ?? pi.id);
                break;
            }
            case "payment_intent.payment_failed": {
                status = "FAILED";
                const pi = eventObj;
                failureReason = pi.last_payment_error?.message ?? "Payment failed";
                break;
            }
            case "payment_intent.canceled": {
                status = "CANCELLED";
                failureReason = "Payment was cancelled";
                break;
            }
            case "charge.dispute.created": {
                status = "CHARGEDBACK";
                failureReason = "Charge disputed by cardholder";
                break;
            }
            default:
                break;
        }
        const amountMinor = typeof eventObj.amount === "number" ? eventObj.amount : 0;
        const currency = typeof eventObj.currency === "string" ? eventObj.currency.toUpperCase() : "USD";
        return {
            provider: "STRIPE",
            providerEventId: event.id,
            eventIdDerived: false,
            providerOrderId,
            paymentIntentId,
            status,
            rawStatusCode: event.type,
            amountMinor,
            currency,
            providerTransactionId,
            providerTimestamp: new Date(event.created * 1000).toISOString(),
            failureReason,
            metadata: {
                stripeEventType: event.type,
                stripeLivemode: event.livemode
            }
        };
    }
    extractNotificationIdentifiers(input) {
        try {
            const obj = JSON.parse(input.rawBody);
            const dataObj = obj?.data?.object;
            const metadata = dataObj?.metadata;
            return {
                providerEventId: typeof obj?.id === "string" ? obj.id.slice(0, 128) : undefined,
                providerOrderId: typeof metadata?.providerOrderId === "string"
                    ? metadata.providerOrderId.slice(0, 128)
                    : typeof dataObj?.id === "string"
                        ? dataObj.id.slice(0, 128)
                        : undefined,
                paymentIntentId: typeof metadata?.intentId === "string" ? metadata.intentId : undefined
            };
        }
        catch {
            return {};
        }
    }
    async createRefund(params) {
        const isCharge = params.providerTransactionId.startsWith("ch_") ||
            params.providerTransactionId.startsWith("py_");
        const refund = await this.stripe.refunds.create({
            charge: isCharge ? params.providerTransactionId : undefined,
            payment_intent: !isCharge && params.providerTransactionId.startsWith("pi_")
                ? params.providerTransactionId
                : undefined,
            amount: params.amountMinor,
            reason: "requested_by_customer"
        }, {
            idempotencyKey: `ref_${params.refundId}`
        });
        return {
            providerRefundId: refund.id,
            status: refund.status === "succeeded"
                ? "SUCCEEDED"
                : refund.status === "pending"
                    ? "PENDING"
                    : "FAILED",
            amountMinor: refund.amount,
            currency: refund.currency.toUpperCase(),
            rawResponse: refund
        };
    }
}
//# sourceMappingURL=stripe.adapter.js.map