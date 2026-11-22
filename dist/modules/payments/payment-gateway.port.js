import { env } from "../../config/env.js";
import { AppError } from "../../common/errors/app-error.js";
import { SandboxSignedGatewayAdapter } from "./adapters/sandbox.adapter.js";
import { StripeGatewayAdapter } from "./adapters/stripe.adapter.js";
import { PayPalGatewayAdapter } from "./adapters/paypal.adapter.js";
import { PayHereGatewayAdapter, parsePayHereNotificationFields } from "./adapters/legacy-payhere.adapter.js";
const MAX_WEBHOOK_BODY_BYTES = 65_536;
const PG_INT_MAX = 2_147_483_647;
/**
 * Formats an integer minor-unit amount as a two-decimal string using pure integer arithmetic
 * (avoids IEEE-754 floating-point rounding bugs).
 */
export function formatMinorAmountTwoDecimals(amountMinor) {
    if (!Number.isSafeInteger(amountMinor) || amountMinor <= 0 || amountMinor > PG_INT_MAX) {
        throw AppError.badRequest("Payment minor-unit amount must be a positive 32-bit integer");
    }
    const whole = Math.floor(amountMinor / 100);
    const cents = amountMinor % 100;
    return `${whole}.${String(cents).padStart(2, "0")}`;
}
/**
 * Parses PayHere `^\d+\.\d{2}$` decimal strings into bounded integer minor units without parseFloat.
 */
export function parsePayHereDecimalAmountToMinor(rawAmount) {
    const trimmed = rawAmount.trim();
    const match = /^(\d+)\.(\d{2})$/.exec(trimmed);
    if (!match) {
        throw AppError.badRequest("Invalid PayHere amount format: expected exact decimal string with two fractional digits");
    }
    const wholeBig = BigInt(match[1]);
    const fracBig = BigInt(match[2]);
    const minorBig = wholeBig * 100n + fracBig;
    if (minorBig <= 0n || minorBig > BigInt(PG_INT_MAX)) {
        throw AppError.badRequest("PayHere payment amount is outside supported integer minor-unit bounds");
    }
    return Number(minorBig);
}
export function normalizeIsoCurrency(rawCurrency) {
    const currency = rawCurrency.trim().toUpperCase();
    if (!/^[A-Z]{3}$/.test(currency)) {
        throw AppError.badRequest("Invalid 3-letter ISO currency code in payment notification");
    }
    return currency;
}
export function readSingleHeader(headers, targetName) {
    const lowerTarget = targetName.toLowerCase();
    for (const [key, value] of Object.entries(headers)) {
        if (key.toLowerCase() === lowerTarget) {
            if (Array.isArray(value)) {
                return value[0];
            }
            return value;
        }
    }
    return undefined;
}
export function assertWebhookBodySize(rawBody) {
    const byteLen = Buffer.byteLength(rawBody, "utf8");
    if (byteLen === 0) {
        throw AppError.badRequest("Empty payment webhook payload");
    }
    if (byteLen > MAX_WEBHOOK_BODY_BYTES) {
        throw AppError.badRequest("Payment webhook payload exceeds 64KB limit");
    }
}
// Re-export adapters
export { SandboxSignedGatewayAdapter, StripeGatewayAdapter, PayPalGatewayAdapter, PayHereGatewayAdapter, parsePayHereNotificationFields };
export class PaymentProviderRegistry {
    providers = new Map();
    register(adapter) {
        this.providers.set(adapter.providerName, adapter);
    }
    get(name) {
        const provider = this.providers.get(name);
        if (!provider) {
            throw AppError.badRequest(`Payment provider "${name}" is not registered or supported.`);
        }
        return provider;
    }
    has(name) {
        return this.providers.has(name);
    }
}
export function resolveSandboxGatewayAdapter() {
    return new SandboxSignedGatewayAdapter(env.PAYMENT_WEBHOOK_SECRET, env.NODE_ENV);
}
export function resolveStripeGatewayAdapter() {
    return new StripeGatewayAdapter(env.STRIPE_SECRET_KEY, env.STRIPE_PUBLISHABLE_KEY, env.STRIPE_WEBHOOK_SECRET);
}
export function resolvePayPalGatewayAdapter() {
    return new PayPalGatewayAdapter(env.PAYPAL_CLIENT_ID, env.PAYPAL_CLIENT_SECRET, env.PAYPAL_WEBHOOK_ID, env.PAYPAL_SANDBOX_MODE);
}
export function resolvePayHereGatewayAdapter(channel = "WEB") {
    if (env.PAYHERE_MERCHANT_SECRET) {
        throw AppError.internal("Legacy shared PAYHERE_MERCHANT_SECRET is prohibited; configure distinct PAYHERE_WEB_MERCHANT_SECRET and PAYHERE_MOBILE_MERCHANT_SECRET");
    }
    if (!env.PAYHERE_MERCHANT_ID ||
        !env.PAYHERE_WEB_MERCHANT_SECRET ||
        !env.PAYHERE_MOBILE_MERCHANT_SECRET ||
        !env.PAYHERE_NOTIFY_URL) {
        throw AppError.internal("PayHere merchant credentials or PAYHERE_NOTIFY_URL are not configured");
    }
    if (env.PAYHERE_WEB_MERCHANT_SECRET === env.PAYHERE_MOBILE_MERCHANT_SECRET) {
        throw AppError.internal("PAYHERE_WEB_MERCHANT_SECRET and PAYHERE_MOBILE_MERCHANT_SECRET must be distinct");
    }
    if (channel === "MOBILE_APP") {
        if (!env.PAYHERE_ANDROID_PACKAGE_NAME) {
            throw AppError.internal("PAYHERE_ANDROID_PACKAGE_NAME is required for PayHere mobile app checkout");
        }
        return new PayHereGatewayAdapter(env.PAYHERE_MERCHANT_ID, env.PAYHERE_MOBILE_MERCHANT_SECRET, env.PAYHERE_SANDBOX_MODE, "MOBILE_APP", env.PAYHERE_NOTIFY_URL, env.PAYHERE_RETURN_URL, env.PAYHERE_CANCEL_URL, env.PAYHERE_ANDROID_PACKAGE_NAME);
    }
    if (!env.PAYHERE_RETURN_URL || !env.PAYHERE_CANCEL_URL) {
        throw AppError.internal("PayHere web callback URLs (PAYHERE_RETURN_URL, PAYHERE_CANCEL_URL) are not configured");
    }
    return new PayHereGatewayAdapter(env.PAYHERE_MERCHANT_ID, env.PAYHERE_WEB_MERCHANT_SECRET, env.PAYHERE_SANDBOX_MODE, "WEB", env.PAYHERE_NOTIFY_URL, env.PAYHERE_RETURN_URL, env.PAYHERE_CANCEL_URL, env.PAYHERE_ANDROID_PACKAGE_NAME);
}
export function resolvePaymentGatewayAdapter(requestedProvider, channel = "WEB") {
    const provider = (requestedProvider || env.PAYMENT_PROVIDER).toUpperCase();
    if (provider === "PAYHERE") {
        return resolvePayHereGatewayAdapter(channel);
    }
    if (provider === "STRIPE") {
        return resolveStripeGatewayAdapter();
    }
    if (provider === "PAYPAL") {
        return resolvePayPalGatewayAdapter();
    }
    return resolveSandboxGatewayAdapter();
}
//# sourceMappingURL=payment-gateway.port.js.map