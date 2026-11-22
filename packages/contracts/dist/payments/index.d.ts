import { z } from "zod";
export declare const PAYMENT_PROVIDERS: readonly ["STRIPE", "PAYPAL", "SANDBOX_GATEWAY", "PAYHERE"];
export type PaymentProvider = (typeof PAYMENT_PROVIDERS)[number];
export declare const PaymentProviderSchema: z.ZodEnum<{
    STRIPE: "STRIPE";
    PAYPAL: "PAYPAL";
    SANDBOX_GATEWAY: "SANDBOX_GATEWAY";
    PAYHERE: "PAYHERE";
}>;
export declare const PAYMENT_INTENT_STATUSES: readonly ["INITIATED", "PENDING_GATEWAY", "SUCCEEDED", "FAILED", "EXPIRED", "ORPHANED_SUCCEEDED"];
export type PaymentIntentStatus = (typeof PAYMENT_INTENT_STATUSES)[number];
export declare const PaymentIntentStatusSchema: z.ZodEnum<{
    EXPIRED: "EXPIRED";
    INITIATED: "INITIATED";
    PENDING_GATEWAY: "PENDING_GATEWAY";
    SUCCEEDED: "SUCCEEDED";
    FAILED: "FAILED";
    ORPHANED_SUCCEEDED: "ORPHANED_SUCCEEDED";
}>;
export declare const REFUND_STATUSES: readonly ["REQUESTED", "AUTHORIZED", "INITIATED", "PROCESSING", "SUCCEEDED", "FAILED", "MANUAL_REVIEW_REQUIRED"];
export type RefundStatus = (typeof REFUND_STATUSES)[number];
export declare const RefundStatusSchema: z.ZodEnum<{
    INITIATED: "INITIATED";
    SUCCEEDED: "SUCCEEDED";
    FAILED: "FAILED";
    REQUESTED: "REQUESTED";
    AUTHORIZED: "AUTHORIZED";
    PROCESSING: "PROCESSING";
    MANUAL_REVIEW_REQUIRED: "MANUAL_REVIEW_REQUIRED";
}>;
export declare const REFUND_REASON_CATEGORIES: readonly ["TRAVELLER_CANCELLATION", "HOST_CANCELLATION", "PLATFORM_CANCELLATION", "LATE_WEBHOOK_EXPIRED_HOLD", "DISPUTE_RESOLUTION"];
export type RefundReasonCategory = (typeof REFUND_REASON_CATEGORIES)[number];
export declare const RefundReasonCategorySchema: z.ZodEnum<{
    TRAVELLER_CANCELLATION: "TRAVELLER_CANCELLATION";
    HOST_CANCELLATION: "HOST_CANCELLATION";
    PLATFORM_CANCELLATION: "PLATFORM_CANCELLATION";
    LATE_WEBHOOK_EXPIRED_HOLD: "LATE_WEBHOOK_EXPIRED_HOLD";
    DISPUTE_RESOLUTION: "DISPUTE_RESOLUTION";
}>;
export declare const PAYMENT_CHECKOUT_CHANNELS: readonly ["WEB", "MOBILE_APP"];
export type PaymentCheckoutChannel = (typeof PAYMENT_CHECKOUT_CHANNELS)[number];
export declare const PaymentCheckoutChannelSchema: z.ZodEnum<{
    WEB: "WEB";
    MOBILE_APP: "MOBILE_APP";
}>;
export declare const PAYMENT_NEXT_ACTIONS: readonly ["SANDBOX_SIMULATION", "REDIRECT_TO_PROVIDER", "LAUNCH_NATIVE_SDK", "STRIPE_ELEMENTS_CONFIRM", "STRIPE_CHECKOUT_REDIRECT", "PAYPAL_CHECKOUT_APPROVE"];
export type PaymentNextAction = (typeof PAYMENT_NEXT_ACTIONS)[number];
export declare const PaymentNextActionSchema: z.ZodEnum<{
    SANDBOX_SIMULATION: "SANDBOX_SIMULATION";
    REDIRECT_TO_PROVIDER: "REDIRECT_TO_PROVIDER";
    LAUNCH_NATIVE_SDK: "LAUNCH_NATIVE_SDK";
    STRIPE_ELEMENTS_CONFIRM: "STRIPE_ELEMENTS_CONFIRM";
    STRIPE_CHECKOUT_REDIRECT: "STRIPE_CHECKOUT_REDIRECT";
    PAYPAL_CHECKOUT_APPROVE: "PAYPAL_CHECKOUT_APPROVE";
}>;
export declare const REFUND_SETTLEMENT_MODES: readonly ["PROVIDER_CONFIRMED", "MANUAL_OFFLINE"];
export type RefundSettlementMode = (typeof REFUND_SETTLEMENT_MODES)[number];
export declare const RefundSettlementModeSchema: z.ZodEnum<{
    PROVIDER_CONFIRMED: "PROVIDER_CONFIRMED";
    MANUAL_OFFLINE: "MANUAL_OFFLINE";
}>;
export declare const PAYMENT_TRANSACTION_EVIDENCE_SOURCES: readonly ["PROVIDER_WEBHOOK", "SANDBOX_SIMULATOR", "ADMIN_PROVIDER_ATTESTED", "ADMIN_MANUAL_OFFLINE"];
export type PaymentTransactionEvidenceSource = (typeof PAYMENT_TRANSACTION_EVIDENCE_SOURCES)[number];
export declare const PaymentTransactionEvidenceSourceSchema: z.ZodEnum<{
    PROVIDER_WEBHOOK: "PROVIDER_WEBHOOK";
    SANDBOX_SIMULATOR: "SANDBOX_SIMULATOR";
    ADMIN_PROVIDER_ATTESTED: "ADMIN_PROVIDER_ATTESTED";
    ADMIN_MANUAL_OFFLINE: "ADMIN_MANUAL_OFFLINE";
}>;
export declare const CheckoutCustomerDetailsSchema: z.ZodObject<{
    firstName: z.ZodOptional<z.ZodString>;
    lastName: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
    address: z.ZodOptional<z.ZodString>;
    city: z.ZodOptional<z.ZodString>;
    country: z.ZodOptional<z.ZodString>;
}, z.core.$strict>;
export type CheckoutCustomerDetails = z.infer<typeof CheckoutCustomerDetailsSchema>;
export declare const PayHereCheckoutCustomerResolvedSchema: z.ZodObject<{
    firstName: z.ZodString;
    lastName: z.ZodString;
    email: z.ZodString;
    phone: z.ZodString;
    address: z.ZodString;
    city: z.ZodString;
    country: z.ZodString;
}, z.core.$strip>;
export type PayHereCheckoutCustomerResolved = z.infer<typeof PayHereCheckoutCustomerResolvedSchema>;
export declare const CreatePaymentIntentRequestSchema: z.ZodObject<{
    bookingId: z.ZodString;
    channel: z.ZodOptional<z.ZodEnum<{
        WEB: "WEB";
        MOBILE_APP: "MOBILE_APP";
    }>>;
    provider: z.ZodOptional<z.ZodEnum<{
        STRIPE: "STRIPE";
        PAYPAL: "PAYPAL";
        SANDBOX_GATEWAY: "SANDBOX_GATEWAY";
        PAYHERE: "PAYHERE";
    }>>;
    idempotencyKey: z.ZodOptional<z.ZodString>;
    customerDetails: z.ZodOptional<z.ZodObject<{
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
        email: z.ZodOptional<z.ZodString>;
        phone: z.ZodOptional<z.ZodString>;
        address: z.ZodOptional<z.ZodString>;
        city: z.ZodOptional<z.ZodString>;
        country: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>>;
}, z.core.$strict>;
export type CreatePaymentIntentRequest = z.infer<typeof CreatePaymentIntentRequestSchema>;
export declare const PayHereCheckoutFormFieldsSchema: z.ZodObject<{
    merchant_id: z.ZodString;
    return_url: z.ZodString;
    cancel_url: z.ZodString;
    notify_url: z.ZodString;
    order_id: z.ZodString;
    items: z.ZodString;
    currency: z.ZodString;
    amount: z.ZodString;
    first_name: z.ZodString;
    last_name: z.ZodString;
    email: z.ZodString;
    phone: z.ZodString;
    address: z.ZodString;
    city: z.ZodString;
    country: z.ZodString;
    hash: z.ZodString;
    custom_1: z.ZodOptional<z.ZodString>;
    custom_2: z.ZodOptional<z.ZodString>;
}, z.core.$strict>;
export type PayHereCheckoutFormFields = z.infer<typeof PayHereCheckoutFormFieldsSchema>;
export declare const SandboxCheckoutHandoffSchema: z.ZodObject<{
    mode: z.ZodLiteral<"SANDBOX_SIMULATION">;
    provider: z.ZodLiteral<"SANDBOX_GATEWAY">;
    method: z.ZodLiteral<"SIMULATED_API">;
    intentId: z.ZodString;
    orderId: z.ZodString;
    amountMinor: z.ZodNumber;
    currency: z.ZodString;
}, z.core.$strip>;
export type SandboxCheckoutHandoff = z.infer<typeof SandboxCheckoutHandoffSchema>;
export declare const PayHereWebCheckoutHandoffSchema: z.ZodObject<{
    mode: z.ZodEnum<{
        PAYHERE_SANDBOX_REDIRECT: "PAYHERE_SANDBOX_REDIRECT";
        PAYHERE_LIVE_REDIRECT: "PAYHERE_LIVE_REDIRECT";
    }>;
    provider: z.ZodLiteral<"PAYHERE">;
    method: z.ZodLiteral<"POST_FORM">;
    actionUrl: z.ZodEnum<{
        "https://sandbox.payhere.lk/pay/checkout": "https://sandbox.payhere.lk/pay/checkout";
        "https://www.payhere.lk/pay/checkout": "https://www.payhere.lk/pay/checkout";
    }>;
    fields: z.ZodObject<{
        merchant_id: z.ZodString;
        return_url: z.ZodString;
        cancel_url: z.ZodString;
        notify_url: z.ZodString;
        order_id: z.ZodString;
        items: z.ZodString;
        currency: z.ZodString;
        amount: z.ZodString;
        first_name: z.ZodString;
        last_name: z.ZodString;
        email: z.ZodString;
        phone: z.ZodString;
        address: z.ZodString;
        city: z.ZodString;
        country: z.ZodString;
        hash: z.ZodString;
        custom_1: z.ZodOptional<z.ZodString>;
        custom_2: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>;
}, z.core.$strip>;
export type PayHereWebCheckoutHandoff = z.infer<typeof PayHereWebCheckoutHandoffSchema>;
export declare const PayHereCheckoutHandoffSchema: z.ZodObject<{
    mode: z.ZodEnum<{
        PAYHERE_SANDBOX_REDIRECT: "PAYHERE_SANDBOX_REDIRECT";
        PAYHERE_LIVE_REDIRECT: "PAYHERE_LIVE_REDIRECT";
    }>;
    provider: z.ZodLiteral<"PAYHERE">;
    method: z.ZodLiteral<"POST_FORM">;
    actionUrl: z.ZodEnum<{
        "https://sandbox.payhere.lk/pay/checkout": "https://sandbox.payhere.lk/pay/checkout";
        "https://www.payhere.lk/pay/checkout": "https://www.payhere.lk/pay/checkout";
    }>;
    fields: z.ZodObject<{
        merchant_id: z.ZodString;
        return_url: z.ZodString;
        cancel_url: z.ZodString;
        notify_url: z.ZodString;
        order_id: z.ZodString;
        items: z.ZodString;
        currency: z.ZodString;
        amount: z.ZodString;
        first_name: z.ZodString;
        last_name: z.ZodString;
        email: z.ZodString;
        phone: z.ZodString;
        address: z.ZodString;
        city: z.ZodString;
        country: z.ZodString;
        hash: z.ZodString;
        custom_1: z.ZodOptional<z.ZodString>;
        custom_2: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>;
}, z.core.$strip>;
export declare const PayHereNativeSdkPayloadSchema: z.ZodObject<{
    sandbox: z.ZodBoolean;
    merchant_id: z.ZodString;
    notify_url: z.ZodString;
    order_id: z.ZodString;
    items: z.ZodString;
    amount: z.ZodString;
    currency: z.ZodString;
    first_name: z.ZodString;
    last_name: z.ZodString;
    email: z.ZodString;
    phone: z.ZodString;
    address: z.ZodString;
    city: z.ZodString;
    country: z.ZodString;
    custom_1: z.ZodOptional<z.ZodString>;
    custom_2: z.ZodOptional<z.ZodString>;
}, z.core.$strict>;
export type PayHereNativeSdkPayload = z.infer<typeof PayHereNativeSdkPayloadSchema>;
export declare const PayHereNativeCheckoutHandoffSchema: z.ZodObject<{
    mode: z.ZodEnum<{
        PAYHERE_NATIVE_SANDBOX: "PAYHERE_NATIVE_SANDBOX";
        PAYHERE_NATIVE_LIVE: "PAYHERE_NATIVE_LIVE";
    }>;
    provider: z.ZodLiteral<"PAYHERE">;
    method: z.ZodLiteral<"NATIVE_SDK">;
    sdkPayload: z.ZodObject<{
        sandbox: z.ZodBoolean;
        merchant_id: z.ZodString;
        notify_url: z.ZodString;
        order_id: z.ZodString;
        items: z.ZodString;
        amount: z.ZodString;
        currency: z.ZodString;
        first_name: z.ZodString;
        last_name: z.ZodString;
        email: z.ZodString;
        phone: z.ZodString;
        address: z.ZodString;
        city: z.ZodString;
        country: z.ZodString;
        custom_1: z.ZodOptional<z.ZodString>;
        custom_2: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>;
}, z.core.$strip>;
export type PayHereNativeCheckoutHandoff = z.infer<typeof PayHereNativeCheckoutHandoffSchema>;
export declare const LegacyExpiredCheckoutHandoffSchema: z.ZodObject<{
    mode: z.ZodLiteral<"LEGACY_EXPIRED">;
    provider: z.ZodEnum<{
        STRIPE: "STRIPE";
        PAYPAL: "PAYPAL";
        SANDBOX_GATEWAY: "SANDBOX_GATEWAY";
        PAYHERE: "PAYHERE";
    }>;
    method: z.ZodLiteral<"EXPIRED">;
    reason: z.ZodString;
}, z.core.$strip>;
export type LegacyExpiredCheckoutHandoff = z.infer<typeof LegacyExpiredCheckoutHandoffSchema>;
export type PayHereCheckoutHandoff = z.infer<typeof PayHereCheckoutHandoffSchema>;
export declare const StripePaymentIntentHandoffSchema: z.ZodObject<{
    mode: z.ZodLiteral<"STRIPE_ELEMENTS">;
    provider: z.ZodLiteral<"STRIPE">;
    method: z.ZodLiteral<"STRIPE_ELEMENTS">;
    clientSecret: z.ZodString;
    publishableKey: z.ZodString;
    paymentIntentId: z.ZodString;
}, z.core.$strip>;
export type StripePaymentIntentHandoff = z.infer<typeof StripePaymentIntentHandoffSchema>;
export declare const StripeCheckoutSessionHandoffSchema: z.ZodObject<{
    mode: z.ZodLiteral<"STRIPE_CHECKOUT">;
    provider: z.ZodLiteral<"STRIPE">;
    method: z.ZodLiteral<"STRIPE_CHECKOUT">;
    checkoutSessionUrl: z.ZodString;
    checkoutSessionId: z.ZodString;
}, z.core.$strip>;
export type StripeCheckoutSessionHandoff = z.infer<typeof StripeCheckoutSessionHandoffSchema>;
export declare const PayPalCheckoutHandoffSchema: z.ZodObject<{
    mode: z.ZodLiteral<"PAYPAL_CHECKOUT">;
    provider: z.ZodLiteral<"PAYPAL">;
    method: z.ZodLiteral<"PAYPAL_CHECKOUT">;
    orderId: z.ZodString;
    approveUrl: z.ZodString;
}, z.core.$strip>;
export type PayPalCheckoutHandoff = z.infer<typeof PayPalCheckoutHandoffSchema>;
export declare const PaymentCheckoutHandoffSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    mode: z.ZodLiteral<"SANDBOX_SIMULATION">;
    provider: z.ZodLiteral<"SANDBOX_GATEWAY">;
    method: z.ZodLiteral<"SIMULATED_API">;
    intentId: z.ZodString;
    orderId: z.ZodString;
    amountMinor: z.ZodNumber;
    currency: z.ZodString;
}, z.core.$strip>, z.ZodObject<{
    mode: z.ZodLiteral<"STRIPE_ELEMENTS">;
    provider: z.ZodLiteral<"STRIPE">;
    method: z.ZodLiteral<"STRIPE_ELEMENTS">;
    clientSecret: z.ZodString;
    publishableKey: z.ZodString;
    paymentIntentId: z.ZodString;
}, z.core.$strip>, z.ZodObject<{
    mode: z.ZodLiteral<"STRIPE_CHECKOUT">;
    provider: z.ZodLiteral<"STRIPE">;
    method: z.ZodLiteral<"STRIPE_CHECKOUT">;
    checkoutSessionUrl: z.ZodString;
    checkoutSessionId: z.ZodString;
}, z.core.$strip>, z.ZodObject<{
    mode: z.ZodLiteral<"PAYPAL_CHECKOUT">;
    provider: z.ZodLiteral<"PAYPAL">;
    method: z.ZodLiteral<"PAYPAL_CHECKOUT">;
    orderId: z.ZodString;
    approveUrl: z.ZodString;
}, z.core.$strip>, z.ZodObject<{
    mode: z.ZodEnum<{
        PAYHERE_SANDBOX_REDIRECT: "PAYHERE_SANDBOX_REDIRECT";
        PAYHERE_LIVE_REDIRECT: "PAYHERE_LIVE_REDIRECT";
    }>;
    provider: z.ZodLiteral<"PAYHERE">;
    method: z.ZodLiteral<"POST_FORM">;
    actionUrl: z.ZodEnum<{
        "https://sandbox.payhere.lk/pay/checkout": "https://sandbox.payhere.lk/pay/checkout";
        "https://www.payhere.lk/pay/checkout": "https://www.payhere.lk/pay/checkout";
    }>;
    fields: z.ZodObject<{
        merchant_id: z.ZodString;
        return_url: z.ZodString;
        cancel_url: z.ZodString;
        notify_url: z.ZodString;
        order_id: z.ZodString;
        items: z.ZodString;
        currency: z.ZodString;
        amount: z.ZodString;
        first_name: z.ZodString;
        last_name: z.ZodString;
        email: z.ZodString;
        phone: z.ZodString;
        address: z.ZodString;
        city: z.ZodString;
        country: z.ZodString;
        hash: z.ZodString;
        custom_1: z.ZodOptional<z.ZodString>;
        custom_2: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>;
}, z.core.$strip>, z.ZodObject<{
    mode: z.ZodEnum<{
        PAYHERE_NATIVE_SANDBOX: "PAYHERE_NATIVE_SANDBOX";
        PAYHERE_NATIVE_LIVE: "PAYHERE_NATIVE_LIVE";
    }>;
    provider: z.ZodLiteral<"PAYHERE">;
    method: z.ZodLiteral<"NATIVE_SDK">;
    sdkPayload: z.ZodObject<{
        sandbox: z.ZodBoolean;
        merchant_id: z.ZodString;
        notify_url: z.ZodString;
        order_id: z.ZodString;
        items: z.ZodString;
        amount: z.ZodString;
        currency: z.ZodString;
        first_name: z.ZodString;
        last_name: z.ZodString;
        email: z.ZodString;
        phone: z.ZodString;
        address: z.ZodString;
        city: z.ZodString;
        country: z.ZodString;
        custom_1: z.ZodOptional<z.ZodString>;
        custom_2: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>;
}, z.core.$strip>, z.ZodObject<{
    mode: z.ZodLiteral<"LEGACY_EXPIRED">;
    provider: z.ZodEnum<{
        STRIPE: "STRIPE";
        PAYPAL: "PAYPAL";
        SANDBOX_GATEWAY: "SANDBOX_GATEWAY";
        PAYHERE: "PAYHERE";
    }>;
    method: z.ZodLiteral<"EXPIRED">;
    reason: z.ZodString;
}, z.core.$strip>], "method">;
export type PaymentCheckoutHandoff = z.infer<typeof PaymentCheckoutHandoffSchema>;
export declare const PaymentIntentSchema: z.ZodObject<{
    id: z.ZodString;
    bookingId: z.ZodString;
    travellerUserId: z.ZodString;
    provider: z.ZodEnum<{
        STRIPE: "STRIPE";
        PAYPAL: "PAYPAL";
        SANDBOX_GATEWAY: "SANDBOX_GATEWAY";
        PAYHERE: "PAYHERE";
    }>;
    checkoutChannel: z.ZodEnum<{
        WEB: "WEB";
        MOBILE_APP: "MOBILE_APP";
    }>;
    providerOrderId: z.ZodString;
    amountMinor: z.ZodNumber;
    currency: z.ZodString;
    status: z.ZodEnum<{
        EXPIRED: "EXPIRED";
        INITIATED: "INITIATED";
        PENDING_GATEWAY: "PENDING_GATEWAY";
        SUCCEEDED: "SUCCEEDED";
        FAILED: "FAILED";
        ORPHANED_SUCCEEDED: "ORPHANED_SUCCEEDED";
    }>;
    nextAction: z.ZodEnum<{
        SANDBOX_SIMULATION: "SANDBOX_SIMULATION";
        REDIRECT_TO_PROVIDER: "REDIRECT_TO_PROVIDER";
        LAUNCH_NATIVE_SDK: "LAUNCH_NATIVE_SDK";
        STRIPE_ELEMENTS_CONFIRM: "STRIPE_ELEMENTS_CONFIRM";
        STRIPE_CHECKOUT_REDIRECT: "STRIPE_CHECKOUT_REDIRECT";
        PAYPAL_CHECKOUT_APPROVE: "PAYPAL_CHECKOUT_APPROVE";
    }>;
    checkoutHandoff: z.ZodDiscriminatedUnion<[z.ZodObject<{
        mode: z.ZodLiteral<"SANDBOX_SIMULATION">;
        provider: z.ZodLiteral<"SANDBOX_GATEWAY">;
        method: z.ZodLiteral<"SIMULATED_API">;
        intentId: z.ZodString;
        orderId: z.ZodString;
        amountMinor: z.ZodNumber;
        currency: z.ZodString;
    }, z.core.$strip>, z.ZodObject<{
        mode: z.ZodLiteral<"STRIPE_ELEMENTS">;
        provider: z.ZodLiteral<"STRIPE">;
        method: z.ZodLiteral<"STRIPE_ELEMENTS">;
        clientSecret: z.ZodString;
        publishableKey: z.ZodString;
        paymentIntentId: z.ZodString;
    }, z.core.$strip>, z.ZodObject<{
        mode: z.ZodLiteral<"STRIPE_CHECKOUT">;
        provider: z.ZodLiteral<"STRIPE">;
        method: z.ZodLiteral<"STRIPE_CHECKOUT">;
        checkoutSessionUrl: z.ZodString;
        checkoutSessionId: z.ZodString;
    }, z.core.$strip>, z.ZodObject<{
        mode: z.ZodLiteral<"PAYPAL_CHECKOUT">;
        provider: z.ZodLiteral<"PAYPAL">;
        method: z.ZodLiteral<"PAYPAL_CHECKOUT">;
        orderId: z.ZodString;
        approveUrl: z.ZodString;
    }, z.core.$strip>, z.ZodObject<{
        mode: z.ZodEnum<{
            PAYHERE_SANDBOX_REDIRECT: "PAYHERE_SANDBOX_REDIRECT";
            PAYHERE_LIVE_REDIRECT: "PAYHERE_LIVE_REDIRECT";
        }>;
        provider: z.ZodLiteral<"PAYHERE">;
        method: z.ZodLiteral<"POST_FORM">;
        actionUrl: z.ZodEnum<{
            "https://sandbox.payhere.lk/pay/checkout": "https://sandbox.payhere.lk/pay/checkout";
            "https://www.payhere.lk/pay/checkout": "https://www.payhere.lk/pay/checkout";
        }>;
        fields: z.ZodObject<{
            merchant_id: z.ZodString;
            return_url: z.ZodString;
            cancel_url: z.ZodString;
            notify_url: z.ZodString;
            order_id: z.ZodString;
            items: z.ZodString;
            currency: z.ZodString;
            amount: z.ZodString;
            first_name: z.ZodString;
            last_name: z.ZodString;
            email: z.ZodString;
            phone: z.ZodString;
            address: z.ZodString;
            city: z.ZodString;
            country: z.ZodString;
            hash: z.ZodString;
            custom_1: z.ZodOptional<z.ZodString>;
            custom_2: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>;
    }, z.core.$strip>, z.ZodObject<{
        mode: z.ZodEnum<{
            PAYHERE_NATIVE_SANDBOX: "PAYHERE_NATIVE_SANDBOX";
            PAYHERE_NATIVE_LIVE: "PAYHERE_NATIVE_LIVE";
        }>;
        provider: z.ZodLiteral<"PAYHERE">;
        method: z.ZodLiteral<"NATIVE_SDK">;
        sdkPayload: z.ZodObject<{
            sandbox: z.ZodBoolean;
            merchant_id: z.ZodString;
            notify_url: z.ZodString;
            order_id: z.ZodString;
            items: z.ZodString;
            amount: z.ZodString;
            currency: z.ZodString;
            first_name: z.ZodString;
            last_name: z.ZodString;
            email: z.ZodString;
            phone: z.ZodString;
            address: z.ZodString;
            city: z.ZodString;
            country: z.ZodString;
            custom_1: z.ZodOptional<z.ZodString>;
            custom_2: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>;
    }, z.core.$strip>, z.ZodObject<{
        mode: z.ZodLiteral<"LEGACY_EXPIRED">;
        provider: z.ZodEnum<{
            STRIPE: "STRIPE";
            PAYPAL: "PAYPAL";
            SANDBOX_GATEWAY: "SANDBOX_GATEWAY";
            PAYHERE: "PAYHERE";
        }>;
        method: z.ZodLiteral<"EXPIRED">;
        reason: z.ZodString;
    }, z.core.$strip>], "method">;
    checkoutPayload: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    expiresAt: z.ZodString;
    verifiedAt: z.ZodNullable<z.ZodString>;
    failureReason: z.ZodNullable<z.ZodString>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, z.core.$strip>;
export type PaymentIntent = z.infer<typeof PaymentIntentSchema>;
export declare const CheckoutStatusQuerySchema: z.ZodObject<{
    bookingId: z.ZodOptional<z.ZodString>;
    orderId: z.ZodOptional<z.ZodString>;
}, z.core.$strict>;
export type CheckoutStatusQuery = z.infer<typeof CheckoutStatusQuerySchema>;
export declare const CheckoutStatusResponseSchema: z.ZodObject<{
    bookingId: z.ZodString;
    referenceCode: z.ZodString;
    bookingStatus: z.ZodString;
    holdExpiresAt: z.ZodNullable<z.ZodString>;
    confirmedAt: z.ZodNullable<z.ZodString>;
    canRetryPayment: z.ZodBoolean;
    custodyReady: z.ZodBoolean;
    pollRecommended: z.ZodBoolean;
    paymentIntent: z.ZodNullable<z.ZodObject<{
        id: z.ZodString;
        bookingId: z.ZodString;
        travellerUserId: z.ZodString;
        provider: z.ZodEnum<{
            STRIPE: "STRIPE";
            PAYPAL: "PAYPAL";
            SANDBOX_GATEWAY: "SANDBOX_GATEWAY";
            PAYHERE: "PAYHERE";
        }>;
        checkoutChannel: z.ZodEnum<{
            WEB: "WEB";
            MOBILE_APP: "MOBILE_APP";
        }>;
        providerOrderId: z.ZodString;
        amountMinor: z.ZodNumber;
        currency: z.ZodString;
        status: z.ZodEnum<{
            EXPIRED: "EXPIRED";
            INITIATED: "INITIATED";
            PENDING_GATEWAY: "PENDING_GATEWAY";
            SUCCEEDED: "SUCCEEDED";
            FAILED: "FAILED";
            ORPHANED_SUCCEEDED: "ORPHANED_SUCCEEDED";
        }>;
        nextAction: z.ZodEnum<{
            SANDBOX_SIMULATION: "SANDBOX_SIMULATION";
            REDIRECT_TO_PROVIDER: "REDIRECT_TO_PROVIDER";
            LAUNCH_NATIVE_SDK: "LAUNCH_NATIVE_SDK";
            STRIPE_ELEMENTS_CONFIRM: "STRIPE_ELEMENTS_CONFIRM";
            STRIPE_CHECKOUT_REDIRECT: "STRIPE_CHECKOUT_REDIRECT";
            PAYPAL_CHECKOUT_APPROVE: "PAYPAL_CHECKOUT_APPROVE";
        }>;
        checkoutHandoff: z.ZodDiscriminatedUnion<[z.ZodObject<{
            mode: z.ZodLiteral<"SANDBOX_SIMULATION">;
            provider: z.ZodLiteral<"SANDBOX_GATEWAY">;
            method: z.ZodLiteral<"SIMULATED_API">;
            intentId: z.ZodString;
            orderId: z.ZodString;
            amountMinor: z.ZodNumber;
            currency: z.ZodString;
        }, z.core.$strip>, z.ZodObject<{
            mode: z.ZodLiteral<"STRIPE_ELEMENTS">;
            provider: z.ZodLiteral<"STRIPE">;
            method: z.ZodLiteral<"STRIPE_ELEMENTS">;
            clientSecret: z.ZodString;
            publishableKey: z.ZodString;
            paymentIntentId: z.ZodString;
        }, z.core.$strip>, z.ZodObject<{
            mode: z.ZodLiteral<"STRIPE_CHECKOUT">;
            provider: z.ZodLiteral<"STRIPE">;
            method: z.ZodLiteral<"STRIPE_CHECKOUT">;
            checkoutSessionUrl: z.ZodString;
            checkoutSessionId: z.ZodString;
        }, z.core.$strip>, z.ZodObject<{
            mode: z.ZodLiteral<"PAYPAL_CHECKOUT">;
            provider: z.ZodLiteral<"PAYPAL">;
            method: z.ZodLiteral<"PAYPAL_CHECKOUT">;
            orderId: z.ZodString;
            approveUrl: z.ZodString;
        }, z.core.$strip>, z.ZodObject<{
            mode: z.ZodEnum<{
                PAYHERE_SANDBOX_REDIRECT: "PAYHERE_SANDBOX_REDIRECT";
                PAYHERE_LIVE_REDIRECT: "PAYHERE_LIVE_REDIRECT";
            }>;
            provider: z.ZodLiteral<"PAYHERE">;
            method: z.ZodLiteral<"POST_FORM">;
            actionUrl: z.ZodEnum<{
                "https://sandbox.payhere.lk/pay/checkout": "https://sandbox.payhere.lk/pay/checkout";
                "https://www.payhere.lk/pay/checkout": "https://www.payhere.lk/pay/checkout";
            }>;
            fields: z.ZodObject<{
                merchant_id: z.ZodString;
                return_url: z.ZodString;
                cancel_url: z.ZodString;
                notify_url: z.ZodString;
                order_id: z.ZodString;
                items: z.ZodString;
                currency: z.ZodString;
                amount: z.ZodString;
                first_name: z.ZodString;
                last_name: z.ZodString;
                email: z.ZodString;
                phone: z.ZodString;
                address: z.ZodString;
                city: z.ZodString;
                country: z.ZodString;
                hash: z.ZodString;
                custom_1: z.ZodOptional<z.ZodString>;
                custom_2: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>;
        }, z.core.$strip>, z.ZodObject<{
            mode: z.ZodEnum<{
                PAYHERE_NATIVE_SANDBOX: "PAYHERE_NATIVE_SANDBOX";
                PAYHERE_NATIVE_LIVE: "PAYHERE_NATIVE_LIVE";
            }>;
            provider: z.ZodLiteral<"PAYHERE">;
            method: z.ZodLiteral<"NATIVE_SDK">;
            sdkPayload: z.ZodObject<{
                sandbox: z.ZodBoolean;
                merchant_id: z.ZodString;
                notify_url: z.ZodString;
                order_id: z.ZodString;
                items: z.ZodString;
                amount: z.ZodString;
                currency: z.ZodString;
                first_name: z.ZodString;
                last_name: z.ZodString;
                email: z.ZodString;
                phone: z.ZodString;
                address: z.ZodString;
                city: z.ZodString;
                country: z.ZodString;
                custom_1: z.ZodOptional<z.ZodString>;
                custom_2: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>;
        }, z.core.$strip>, z.ZodObject<{
            mode: z.ZodLiteral<"LEGACY_EXPIRED">;
            provider: z.ZodEnum<{
                STRIPE: "STRIPE";
                PAYPAL: "PAYPAL";
                SANDBOX_GATEWAY: "SANDBOX_GATEWAY";
                PAYHERE: "PAYHERE";
            }>;
            method: z.ZodLiteral<"EXPIRED">;
            reason: z.ZodString;
        }, z.core.$strip>], "method">;
        checkoutPayload: z.ZodRecord<z.ZodString, z.ZodUnknown>;
        expiresAt: z.ZodString;
        verifiedAt: z.ZodNullable<z.ZodString>;
        failureReason: z.ZodNullable<z.ZodString>;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type CheckoutStatusResponse = z.infer<typeof CheckoutStatusResponseSchema>;
export declare const SandboxSimulatePaymentRequestSchema: z.ZodObject<{
    outcome: z.ZodDefault<z.ZodEnum<{
        SUCCEEDED: "SUCCEEDED";
        FAILED: "FAILED";
    }>>;
    failureReason: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type SandboxSimulatePaymentRequest = z.infer<typeof SandboxSimulatePaymentRequestSchema>;
export declare const SandboxWebhookPayloadSchema: z.ZodObject<{
    eventId: z.ZodString;
    providerOrderId: z.ZodString;
    providerTransactionId: z.ZodString;
    status: z.ZodEnum<{
        SUCCEEDED: "SUCCEEDED";
        FAILED: "FAILED";
    }>;
    amountMinor: z.ZodNumber;
    currency: z.ZodString;
    timestamp: z.ZodNumber;
    failureReason: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type SandboxWebhookPayload = z.infer<typeof SandboxWebhookPayloadSchema>;
export declare const RefundRecordSchema: z.ZodObject<{
    id: z.ZodString;
    bookingId: z.ZodString;
    referenceCode: z.ZodOptional<z.ZodString>;
    paymentIntentId: z.ZodNullable<z.ZodString>;
    amountMinor: z.ZodNumber;
    currency: z.ZodString;
    refundPercentage: z.ZodNumber;
    reasonCategory: z.ZodEnum<{
        TRAVELLER_CANCELLATION: "TRAVELLER_CANCELLATION";
        HOST_CANCELLATION: "HOST_CANCELLATION";
        PLATFORM_CANCELLATION: "PLATFORM_CANCELLATION";
        LATE_WEBHOOK_EXPIRED_HOLD: "LATE_WEBHOOK_EXPIRED_HOLD";
        DISPUTE_RESOLUTION: "DISPUTE_RESOLUTION";
    }>;
    status: z.ZodEnum<{
        INITIATED: "INITIATED";
        SUCCEEDED: "SUCCEEDED";
        FAILED: "FAILED";
        REQUESTED: "REQUESTED";
        AUTHORIZED: "AUTHORIZED";
        PROCESSING: "PROCESSING";
        MANUAL_REVIEW_REQUIRED: "MANUAL_REVIEW_REQUIRED";
    }>;
    settlementMode: z.ZodNullable<z.ZodEnum<{
        PROVIDER_CONFIRMED: "PROVIDER_CONFIRMED";
        MANUAL_OFFLINE: "MANUAL_OFFLINE";
    }>>;
    providerRefundId: z.ZodNullable<z.ZodString>;
    manualReference: z.ZodNullable<z.ZodString>;
    requestedByUserId: z.ZodNullable<z.ZodString>;
    authorizedByUserId: z.ZodNullable<z.ZodString>;
    settledByUserId: z.ZodNullable<z.ZodString>;
    notes: z.ZodNullable<z.ZodString>;
    completedAt: z.ZodNullable<z.ZodString>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, z.core.$strip>;
export type RefundRecord = z.infer<typeof RefundRecordSchema>;
export declare const AdminTransitionRefundRequestSchema: z.ZodObject<{
    targetStatus: z.ZodEnum<{
        INITIATED: "INITIATED";
        SUCCEEDED: "SUCCEEDED";
        FAILED: "FAILED";
        AUTHORIZED: "AUTHORIZED";
        PROCESSING: "PROCESSING";
        MANUAL_REVIEW_REQUIRED: "MANUAL_REVIEW_REQUIRED";
    }>;
    notes: z.ZodString;
    settlementMode: z.ZodOptional<z.ZodEnum<{
        PROVIDER_CONFIRMED: "PROVIDER_CONFIRMED";
        MANUAL_OFFLINE: "MANUAL_OFFLINE";
    }>>;
    providerRefundId: z.ZodOptional<z.ZodString>;
    manualReference: z.ZodOptional<z.ZodString>;
}, z.core.$strict>;
export type AdminTransitionRefundRequest = z.infer<typeof AdminTransitionRefundRequestSchema>;
export declare const AdminRefundListQuerySchema: z.ZodObject<{
    status: z.ZodOptional<z.ZodEnum<{
        INITIATED: "INITIATED";
        SUCCEEDED: "SUCCEEDED";
        FAILED: "FAILED";
        REQUESTED: "REQUESTED";
        AUTHORIZED: "AUTHORIZED";
        PROCESSING: "PROCESSING";
        MANUAL_REVIEW_REQUIRED: "MANUAL_REVIEW_REQUIRED";
    }>>;
    bookingId: z.ZodOptional<z.ZodString>;
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
}, z.core.$strip>;
export type AdminRefundListQuery = z.infer<typeof AdminRefundListQuerySchema>;
export declare const PaymentTransactionRecordSchema: z.ZodObject<{
    id: z.ZodString;
    paymentIntentId: z.ZodString;
    bookingId: z.ZodString;
    referenceCode: z.ZodOptional<z.ZodString>;
    refundId: z.ZodNullable<z.ZodString>;
    provider: z.ZodEnum<{
        STRIPE: "STRIPE";
        PAYPAL: "PAYPAL";
        SANDBOX_GATEWAY: "SANDBOX_GATEWAY";
        PAYHERE: "PAYHERE";
    }>;
    providerTransactionId: z.ZodNullable<z.ZodString>;
    transactionType: z.ZodEnum<{
        CHARGE: "CHARGE";
        REFUND: "REFUND";
    }>;
    status: z.ZodEnum<{
        PENDING: "PENDING";
        SUCCEEDED: "SUCCEEDED";
        FAILED: "FAILED";
    }>;
    amountMinor: z.ZodNumber;
    currency: z.ZodString;
    evidenceSource: z.ZodEnum<{
        PROVIDER_WEBHOOK: "PROVIDER_WEBHOOK";
        SANDBOX_SIMULATOR: "SANDBOX_SIMULATOR";
        ADMIN_PROVIDER_ATTESTED: "ADMIN_PROVIDER_ATTESTED";
        ADMIN_MANUAL_OFFLINE: "ADMIN_MANUAL_OFFLINE";
    }>;
    manualReference: z.ZodNullable<z.ZodString>;
    settledByUserId: z.ZodNullable<z.ZodString>;
    signatureVerified: z.ZodBoolean;
    createdAt: z.ZodString;
}, z.core.$strip>;
export type PaymentTransactionRecord = z.infer<typeof PaymentTransactionRecordSchema>;
//# sourceMappingURL=index.d.ts.map