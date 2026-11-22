import { z } from "zod";
export declare const SUPPORT_TICKET_CATEGORIES: readonly ["BOOKING_ISSUE", "CUSTODY_INCIDENT", "PAYMENT_REFUND", "HOST_ONBOARDING", "ACCOUNT_ACCESS", "GENERAL_INQUIRY"];
export type SupportTicketCategory = (typeof SUPPORT_TICKET_CATEGORIES)[number];
export declare const SupportTicketCategorySchema: z.ZodEnum<{
    BOOKING_ISSUE: "BOOKING_ISSUE";
    CUSTODY_INCIDENT: "CUSTODY_INCIDENT";
    PAYMENT_REFUND: "PAYMENT_REFUND";
    HOST_ONBOARDING: "HOST_ONBOARDING";
    ACCOUNT_ACCESS: "ACCOUNT_ACCESS";
    GENERAL_INQUIRY: "GENERAL_INQUIRY";
}>;
export declare const SUPPORT_TICKET_PRIORITIES: readonly ["LOW", "MEDIUM", "HIGH", "URGENT"];
export type SupportTicketPriority = (typeof SUPPORT_TICKET_PRIORITIES)[number];
export declare const SupportTicketPrioritySchema: z.ZodEnum<{
    LOW: "LOW";
    MEDIUM: "MEDIUM";
    HIGH: "HIGH";
    URGENT: "URGENT";
}>;
export declare const SUPPORT_TICKET_STATUSES: readonly ["OPEN", "IN_PROGRESS", "AWAITING_CUSTOMER", "RESOLVED", "CLOSED"];
export type SupportTicketStatus = (typeof SUPPORT_TICKET_STATUSES)[number];
export declare const SupportTicketStatusSchema: z.ZodEnum<{
    CLOSED: "CLOSED";
    OPEN: "OPEN";
    IN_PROGRESS: "IN_PROGRESS";
    AWAITING_CUSTOMER: "AWAITING_CUSTOMER";
    RESOLVED: "RESOLVED";
}>;
export declare const CreateSupportTicketRequestSchema: z.ZodObject<{
    requesterName: z.ZodString;
    requesterEmail: z.ZodString;
    category: z.ZodDefault<z.ZodEnum<{
        BOOKING_ISSUE: "BOOKING_ISSUE";
        CUSTODY_INCIDENT: "CUSTODY_INCIDENT";
        PAYMENT_REFUND: "PAYMENT_REFUND";
        HOST_ONBOARDING: "HOST_ONBOARDING";
        ACCOUNT_ACCESS: "ACCOUNT_ACCESS";
        GENERAL_INQUIRY: "GENERAL_INQUIRY";
    }>>;
    subject: z.ZodString;
    message: z.ZodString;
    bookingReference: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type CreateSupportTicketRequest = z.infer<typeof CreateSupportTicketRequestSchema>;
export declare const SupportTicketCreatedResponseSchema: z.ZodObject<{
    id: z.ZodString;
    referenceCode: z.ZodString;
    category: z.ZodEnum<{
        BOOKING_ISSUE: "BOOKING_ISSUE";
        CUSTODY_INCIDENT: "CUSTODY_INCIDENT";
        PAYMENT_REFUND: "PAYMENT_REFUND";
        HOST_ONBOARDING: "HOST_ONBOARDING";
        ACCOUNT_ACCESS: "ACCOUNT_ACCESS";
        GENERAL_INQUIRY: "GENERAL_INQUIRY";
    }>;
    priority: z.ZodEnum<{
        LOW: "LOW";
        MEDIUM: "MEDIUM";
        HIGH: "HIGH";
        URGENT: "URGENT";
    }>;
    status: z.ZodEnum<{
        CLOSED: "CLOSED";
        OPEN: "OPEN";
        IN_PROGRESS: "IN_PROGRESS";
        AWAITING_CUSTOMER: "AWAITING_CUSTOMER";
        RESOLVED: "RESOLVED";
    }>;
    subject: z.ZodString;
    bookingReference: z.ZodNullable<z.ZodString>;
    createdAt: z.ZodString;
}, z.core.$strip>;
export type SupportTicketCreatedResponse = z.infer<typeof SupportTicketCreatedResponseSchema>;
export declare const SupportTicketMessageSchema: z.ZodObject<{
    id: z.ZodString;
    ticketId: z.ZodString;
    senderUserId: z.ZodNullable<z.ZodString>;
    senderRole: z.ZodString;
    senderDisplayName: z.ZodString;
    body: z.ZodString;
    isInternalNote: z.ZodBoolean;
    createdAt: z.ZodString;
}, z.core.$strip>;
export type SupportTicketMessage = z.infer<typeof SupportTicketMessageSchema>;
export declare const SupportTicketSummarySchema: z.ZodObject<{
    id: z.ZodString;
    referenceCode: z.ZodString;
    requesterUserId: z.ZodNullable<z.ZodString>;
    requesterName: z.ZodString;
    requesterEmail: z.ZodString;
    category: z.ZodEnum<{
        BOOKING_ISSUE: "BOOKING_ISSUE";
        CUSTODY_INCIDENT: "CUSTODY_INCIDENT";
        PAYMENT_REFUND: "PAYMENT_REFUND";
        HOST_ONBOARDING: "HOST_ONBOARDING";
        ACCOUNT_ACCESS: "ACCOUNT_ACCESS";
        GENERAL_INQUIRY: "GENERAL_INQUIRY";
    }>;
    priority: z.ZodEnum<{
        LOW: "LOW";
        MEDIUM: "MEDIUM";
        HIGH: "HIGH";
        URGENT: "URGENT";
    }>;
    status: z.ZodEnum<{
        CLOSED: "CLOSED";
        OPEN: "OPEN";
        IN_PROGRESS: "IN_PROGRESS";
        AWAITING_CUSTOMER: "AWAITING_CUSTOMER";
        RESOLVED: "RESOLVED";
    }>;
    subject: z.ZodString;
    bookingReferenceInput: z.ZodNullable<z.ZodString>;
    bookingId: z.ZodNullable<z.ZodString>;
    assignedToUserId: z.ZodNullable<z.ZodString>;
    assignedToDisplayName: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    resolutionSummary: z.ZodNullable<z.ZodString>;
    resolvedAt: z.ZodNullable<z.ZodString>;
    lastMessageAt: z.ZodString;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, z.core.$strip>;
export type SupportTicketSummary = z.infer<typeof SupportTicketSummarySchema>;
export declare const SupportTicketCustomerDetailSchema: z.ZodObject<{
    id: z.ZodString;
    referenceCode: z.ZodString;
    requesterUserId: z.ZodNullable<z.ZodString>;
    requesterName: z.ZodString;
    requesterEmail: z.ZodString;
    category: z.ZodEnum<{
        BOOKING_ISSUE: "BOOKING_ISSUE";
        CUSTODY_INCIDENT: "CUSTODY_INCIDENT";
        PAYMENT_REFUND: "PAYMENT_REFUND";
        HOST_ONBOARDING: "HOST_ONBOARDING";
        ACCOUNT_ACCESS: "ACCOUNT_ACCESS";
        GENERAL_INQUIRY: "GENERAL_INQUIRY";
    }>;
    priority: z.ZodEnum<{
        LOW: "LOW";
        MEDIUM: "MEDIUM";
        HIGH: "HIGH";
        URGENT: "URGENT";
    }>;
    status: z.ZodEnum<{
        CLOSED: "CLOSED";
        OPEN: "OPEN";
        IN_PROGRESS: "IN_PROGRESS";
        AWAITING_CUSTOMER: "AWAITING_CUSTOMER";
        RESOLVED: "RESOLVED";
    }>;
    subject: z.ZodString;
    bookingReferenceInput: z.ZodNullable<z.ZodString>;
    bookingId: z.ZodNullable<z.ZodString>;
    assignedToUserId: z.ZodNullable<z.ZodString>;
    assignedToDisplayName: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    resolutionSummary: z.ZodNullable<z.ZodString>;
    resolvedAt: z.ZodNullable<z.ZodString>;
    lastMessageAt: z.ZodString;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    messages: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        ticketId: z.ZodString;
        senderUserId: z.ZodNullable<z.ZodString>;
        senderRole: z.ZodString;
        senderDisplayName: z.ZodString;
        body: z.ZodString;
        isInternalNote: z.ZodBoolean;
        createdAt: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type SupportTicketCustomerDetail = z.infer<typeof SupportTicketCustomerDetailSchema>;
export declare const SupportTicketLinkedBookingSchema: z.ZodObject<{
    id: z.ZodString;
    referenceCode: z.ZodString;
    status: z.ZodEnum<{
        REJECTED: "REJECTED";
        CONFIRMED: "CONFIRMED";
        EXPIRED: "EXPIRED";
        PENDING_HOST_APPROVAL: "PENDING_HOST_APPROVAL";
        PENDING_PAYMENT: "PENDING_PAYMENT";
        IN_STORAGE: "IN_STORAGE";
        COMPLETED: "COMPLETED";
        CANCELLED_BY_TRAVELLER: "CANCELLED_BY_TRAVELLER";
        CANCELLED_BY_HOST: "CANCELLED_BY_HOST";
        CANCELLED_BY_PLATFORM: "CANCELLED_BY_PLATFORM";
        DISPUTED: "DISPUTED";
    }>;
    totalAmountMinor: z.ZodNumber;
    currency: z.ZodString;
    locationName: z.ZodString;
    businessName: z.ZodString;
}, z.core.$strip>;
export type SupportTicketLinkedBooking = z.infer<typeof SupportTicketLinkedBookingSchema>;
export declare const SupportTicketAdminDetailSchema: z.ZodObject<{
    id: z.ZodString;
    referenceCode: z.ZodString;
    requesterUserId: z.ZodNullable<z.ZodString>;
    requesterName: z.ZodString;
    requesterEmail: z.ZodString;
    category: z.ZodEnum<{
        BOOKING_ISSUE: "BOOKING_ISSUE";
        CUSTODY_INCIDENT: "CUSTODY_INCIDENT";
        PAYMENT_REFUND: "PAYMENT_REFUND";
        HOST_ONBOARDING: "HOST_ONBOARDING";
        ACCOUNT_ACCESS: "ACCOUNT_ACCESS";
        GENERAL_INQUIRY: "GENERAL_INQUIRY";
    }>;
    priority: z.ZodEnum<{
        LOW: "LOW";
        MEDIUM: "MEDIUM";
        HIGH: "HIGH";
        URGENT: "URGENT";
    }>;
    status: z.ZodEnum<{
        CLOSED: "CLOSED";
        OPEN: "OPEN";
        IN_PROGRESS: "IN_PROGRESS";
        AWAITING_CUSTOMER: "AWAITING_CUSTOMER";
        RESOLVED: "RESOLVED";
    }>;
    subject: z.ZodString;
    bookingReferenceInput: z.ZodNullable<z.ZodString>;
    bookingId: z.ZodNullable<z.ZodString>;
    assignedToUserId: z.ZodNullable<z.ZodString>;
    assignedToDisplayName: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    resolutionSummary: z.ZodNullable<z.ZodString>;
    resolvedAt: z.ZodNullable<z.ZodString>;
    lastMessageAt: z.ZodString;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    linkedBooking: z.ZodNullable<z.ZodObject<{
        id: z.ZodString;
        referenceCode: z.ZodString;
        status: z.ZodEnum<{
            REJECTED: "REJECTED";
            CONFIRMED: "CONFIRMED";
            EXPIRED: "EXPIRED";
            PENDING_HOST_APPROVAL: "PENDING_HOST_APPROVAL";
            PENDING_PAYMENT: "PENDING_PAYMENT";
            IN_STORAGE: "IN_STORAGE";
            COMPLETED: "COMPLETED";
            CANCELLED_BY_TRAVELLER: "CANCELLED_BY_TRAVELLER";
            CANCELLED_BY_HOST: "CANCELLED_BY_HOST";
            CANCELLED_BY_PLATFORM: "CANCELLED_BY_PLATFORM";
            DISPUTED: "DISPUTED";
        }>;
        totalAmountMinor: z.ZodNumber;
        currency: z.ZodString;
        locationName: z.ZodString;
        businessName: z.ZodString;
    }, z.core.$strip>>;
    messages: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        ticketId: z.ZodString;
        senderUserId: z.ZodNullable<z.ZodString>;
        senderRole: z.ZodString;
        senderDisplayName: z.ZodString;
        body: z.ZodString;
        isInternalNote: z.ZodBoolean;
        createdAt: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type SupportTicketAdminDetail = z.infer<typeof SupportTicketAdminDetailSchema>;
export declare const SupportTicketReplyRequestSchema: z.ZodObject<{
    message: z.ZodString;
    isInternalNote: z.ZodDefault<z.ZodBoolean>;
}, z.core.$strip>;
export type SupportTicketReplyRequest = z.infer<typeof SupportTicketReplyRequestSchema>;
export declare const CustomerSupportTicketReplyRequestSchema: z.ZodObject<{
    message: z.ZodString;
}, z.core.$strip>;
export type CustomerSupportTicketReplyRequest = z.infer<typeof CustomerSupportTicketReplyRequestSchema>;
export declare const AdminUpdateSupportTicketRequestSchema: z.ZodObject<{
    status: z.ZodOptional<z.ZodEnum<{
        CLOSED: "CLOSED";
        OPEN: "OPEN";
        IN_PROGRESS: "IN_PROGRESS";
        AWAITING_CUSTOMER: "AWAITING_CUSTOMER";
        RESOLVED: "RESOLVED";
    }>>;
    priority: z.ZodOptional<z.ZodEnum<{
        LOW: "LOW";
        MEDIUM: "MEDIUM";
        HIGH: "HIGH";
        URGENT: "URGENT";
    }>>;
    assignedToUserId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    resolutionSummary: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
export type AdminUpdateSupportTicketRequest = z.infer<typeof AdminUpdateSupportTicketRequestSchema>;
export declare const AdminSupportTicketQuerySchema: z.ZodObject<{
    status: z.ZodOptional<z.ZodEnum<{
        CLOSED: "CLOSED";
        OPEN: "OPEN";
        IN_PROGRESS: "IN_PROGRESS";
        AWAITING_CUSTOMER: "AWAITING_CUSTOMER";
        RESOLVED: "RESOLVED";
    }>>;
    priority: z.ZodOptional<z.ZodEnum<{
        LOW: "LOW";
        MEDIUM: "MEDIUM";
        HIGH: "HIGH";
        URGENT: "URGENT";
    }>>;
    category: z.ZodOptional<z.ZodEnum<{
        BOOKING_ISSUE: "BOOKING_ISSUE";
        CUSTODY_INCIDENT: "CUSTODY_INCIDENT";
        PAYMENT_REFUND: "PAYMENT_REFUND";
        HOST_ONBOARDING: "HOST_ONBOARDING";
        ACCOUNT_ACCESS: "ACCOUNT_ACCESS";
        GENERAL_INQUIRY: "GENERAL_INQUIRY";
    }>>;
    search: z.ZodOptional<z.ZodString>;
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
}, z.core.$strip>;
export type AdminSupportTicketQuery = z.infer<typeof AdminSupportTicketQuerySchema>;
//# sourceMappingURL=index.d.ts.map