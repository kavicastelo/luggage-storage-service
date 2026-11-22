import { z } from "zod";
export declare const HOST_BUSINESS_STATUSES: readonly ["DRAFT", "PENDING_VERIFICATION", "ACTIVE", "SUSPENDED", "REJECTED"];
export type HostBusinessStatus = (typeof HOST_BUSINESS_STATUSES)[number];
export declare const HOST_ENTITY_TYPES: readonly ["SOLE_PROPRIETORSHIP", "PRIVATE_LIMITED", "HOTEL", "RETAIL_SHOP", "PARTNERSHIP", "OTHER"];
export type HostEntityType = (typeof HOST_ENTITY_TYPES)[number];
export declare const HOST_VERIFICATION_STATUSES: readonly ["PENDING_REVIEW", "APPROVED", "REJECTED", "INFORMATION_REQUESTED"];
export type HostVerificationStatus = (typeof HOST_VERIFICATION_STATUSES)[number];
export declare const HOST_DOCUMENT_TYPES: readonly ["BUSINESS_REGISTRATION", "NATIONAL_ID", "PASSPORT", "UTILITY_BILL", "BANK_STATEMENT", "PROOF_OF_ADDRESS", "OTHER"];
export type HostDocumentType = (typeof HOST_DOCUMENT_TYPES)[number];
export declare const HOST_STAFF_ROLES: readonly ["MANAGER", "ATTENDANT"];
export type HostStaffRole = (typeof HOST_STAFF_ROLES)[number];
export declare const HostVerificationDocumentSchema: z.ZodObject<{
    id: z.ZodString;
    verificationId: z.ZodString;
    documentType: z.ZodEnum<{
        OTHER: "OTHER";
        BUSINESS_REGISTRATION: "BUSINESS_REGISTRATION";
        NATIONAL_ID: "NATIONAL_ID";
        PASSPORT: "PASSPORT";
        UTILITY_BILL: "UTILITY_BILL";
        BANK_STATEMENT: "BANK_STATEMENT";
        PROOF_OF_ADDRESS: "PROOF_OF_ADDRESS";
    }>;
    fileKey: z.ZodString;
    fileName: z.ZodString;
    fileSize: z.ZodNumber;
    mimeType: z.ZodString;
    status: z.ZodEnum<{
        REJECTED: "REJECTED";
        PENDING: "PENDING";
        VERIFIED: "VERIFIED";
    }>;
    rejectionReason: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    downloadUrl: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, z.core.$strip>;
export type HostVerificationDocument = z.infer<typeof HostVerificationDocumentSchema>;
export declare const HostVerificationSchema: z.ZodObject<{
    id: z.ZodString;
    businessId: z.ZodString;
    submittedBy: z.ZodString;
    status: z.ZodEnum<{
        REJECTED: "REJECTED";
        PENDING_REVIEW: "PENDING_REVIEW";
        APPROVED: "APPROVED";
        INFORMATION_REQUESTED: "INFORMATION_REQUESTED";
    }>;
    reviewerUserId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    reviewedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    rejectionReason: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    adminNotes: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    submittedAt: z.ZodString;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    documents: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        verificationId: z.ZodString;
        documentType: z.ZodEnum<{
            OTHER: "OTHER";
            BUSINESS_REGISTRATION: "BUSINESS_REGISTRATION";
            NATIONAL_ID: "NATIONAL_ID";
            PASSPORT: "PASSPORT";
            UTILITY_BILL: "UTILITY_BILL";
            BANK_STATEMENT: "BANK_STATEMENT";
            PROOF_OF_ADDRESS: "PROOF_OF_ADDRESS";
        }>;
        fileKey: z.ZodString;
        fileName: z.ZodString;
        fileSize: z.ZodNumber;
        mimeType: z.ZodString;
        status: z.ZodEnum<{
            REJECTED: "REJECTED";
            PENDING: "PENDING";
            VERIFIED: "VERIFIED";
        }>;
        rejectionReason: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        downloadUrl: z.ZodOptional<z.ZodString>;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
    }, z.core.$strip>>>;
}, z.core.$strip>;
export type HostVerification = z.infer<typeof HostVerificationSchema>;
export declare const HostBusinessSchema: z.ZodObject<{
    id: z.ZodString;
    ownerUserId: z.ZodString;
    legalBusinessName: z.ZodString;
    tradeName: z.ZodString;
    businessRegistrationNumber: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    entityType: z.ZodEnum<{
        SOLE_PROPRIETORSHIP: "SOLE_PROPRIETORSHIP";
        PRIVATE_LIMITED: "PRIVATE_LIMITED";
        HOTEL: "HOTEL";
        RETAIL_SHOP: "RETAIL_SHOP";
        PARTNERSHIP: "PARTNERSHIP";
        OTHER: "OTHER";
    }>;
    taxIdentifier: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    contactEmail: z.ZodString;
    contactPhone: z.ZodString;
    addressLine1: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    addressLine2: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    city: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    postalCode: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    countryCode: z.ZodDefault<z.ZodString>;
    payoutBankName: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    payoutAccountNumber: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    payoutAccountNumberMasked: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    payoutAccountName: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    payoutBranchCode: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    status: z.ZodEnum<{
        PENDING_VERIFICATION: "PENDING_VERIFICATION";
        ACTIVE: "ACTIVE";
        SUSPENDED: "SUSPENDED";
        DRAFT: "DRAFT";
        REJECTED: "REJECTED";
    }>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    verification: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        id: z.ZodString;
        businessId: z.ZodString;
        submittedBy: z.ZodString;
        status: z.ZodEnum<{
            REJECTED: "REJECTED";
            PENDING_REVIEW: "PENDING_REVIEW";
            APPROVED: "APPROVED";
            INFORMATION_REQUESTED: "INFORMATION_REQUESTED";
        }>;
        reviewerUserId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        reviewedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        rejectionReason: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        adminNotes: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        submittedAt: z.ZodString;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
        documents: z.ZodDefault<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            verificationId: z.ZodString;
            documentType: z.ZodEnum<{
                OTHER: "OTHER";
                BUSINESS_REGISTRATION: "BUSINESS_REGISTRATION";
                NATIONAL_ID: "NATIONAL_ID";
                PASSPORT: "PASSPORT";
                UTILITY_BILL: "UTILITY_BILL";
                BANK_STATEMENT: "BANK_STATEMENT";
                PROOF_OF_ADDRESS: "PROOF_OF_ADDRESS";
            }>;
            fileKey: z.ZodString;
            fileName: z.ZodString;
            fileSize: z.ZodNumber;
            mimeType: z.ZodString;
            status: z.ZodEnum<{
                REJECTED: "REJECTED";
                PENDING: "PENDING";
                VERIFIED: "VERIFIED";
            }>;
            rejectionReason: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            downloadUrl: z.ZodOptional<z.ZodString>;
            createdAt: z.ZodString;
            updatedAt: z.ZodString;
        }, z.core.$strip>>>;
    }, z.core.$strip>>>;
}, z.core.$strip>;
export type HostBusiness = z.infer<typeof HostBusinessSchema>;
export declare const HostStaffMembershipSchema: z.ZodObject<{
    id: z.ZodString;
    businessId: z.ZodString;
    userId: z.ZodString;
    staffRole: z.ZodEnum<{
        MANAGER: "MANAGER";
        ATTENDANT: "ATTENDANT";
    }>;
    assignedLocationIds: z.ZodDefault<z.ZodArray<z.ZodString>>;
    isActive: z.ZodBoolean;
    invitedAt: z.ZodString;
    acceptedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, z.core.$strip>;
export type HostStaffMembership = z.infer<typeof HostStaffMembershipSchema>;
export declare const HostStaffMemberDetailSchema: z.ZodObject<{
    id: z.ZodString;
    businessId: z.ZodString;
    userId: z.ZodString;
    staffRole: z.ZodEnum<{
        MANAGER: "MANAGER";
        ATTENDANT: "ATTENDANT";
    }>;
    assignedLocationIds: z.ZodDefault<z.ZodArray<z.ZodString>>;
    isActive: z.ZodBoolean;
    invitedAt: z.ZodString;
    acceptedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    email: z.ZodString;
    displayName: z.ZodString;
    userStatus: z.ZodString;
}, z.core.$strip>;
export type HostStaffMemberDetail = z.infer<typeof HostStaffMemberDetailSchema>;
export declare const CreateHostBusinessRequestSchema: z.ZodObject<{
    legalBusinessName: z.ZodString;
    tradeName: z.ZodString;
    businessRegistrationNumber: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    entityType: z.ZodDefault<z.ZodEnum<{
        SOLE_PROPRIETORSHIP: "SOLE_PROPRIETORSHIP";
        PRIVATE_LIMITED: "PRIVATE_LIMITED";
        HOTEL: "HOTEL";
        RETAIL_SHOP: "RETAIL_SHOP";
        PARTNERSHIP: "PARTNERSHIP";
        OTHER: "OTHER";
    }>>;
    taxIdentifier: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    contactEmail: z.ZodString;
    contactPhone: z.ZodString;
    addressLine1: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    addressLine2: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    city: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    postalCode: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    countryCode: z.ZodDefault<z.ZodString>;
    payoutBankName: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    payoutAccountNumber: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    payoutAccountName: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    payoutBranchCode: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
export type CreateHostBusinessRequest = z.infer<typeof CreateHostBusinessRequestSchema>;
export declare const UpdateHostBusinessRequestSchema: z.ZodObject<{
    legalBusinessName: z.ZodOptional<z.ZodString>;
    tradeName: z.ZodOptional<z.ZodString>;
    businessRegistrationNumber: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    entityType: z.ZodOptional<z.ZodDefault<z.ZodEnum<{
        SOLE_PROPRIETORSHIP: "SOLE_PROPRIETORSHIP";
        PRIVATE_LIMITED: "PRIVATE_LIMITED";
        HOTEL: "HOTEL";
        RETAIL_SHOP: "RETAIL_SHOP";
        PARTNERSHIP: "PARTNERSHIP";
        OTHER: "OTHER";
    }>>>;
    taxIdentifier: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    contactEmail: z.ZodOptional<z.ZodString>;
    contactPhone: z.ZodOptional<z.ZodString>;
    addressLine1: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    addressLine2: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    city: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    postalCode: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    countryCode: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    payoutBankName: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    payoutAccountNumber: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    payoutAccountName: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    payoutBranchCode: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
}, z.core.$strip>;
export type UpdateHostBusinessRequest = z.infer<typeof UpdateHostBusinessRequestSchema>;
export declare const AddHostStaffRequestSchema: z.ZodObject<{
    email: z.ZodString;
    staffRole: z.ZodDefault<z.ZodEnum<{
        MANAGER: "MANAGER";
        ATTENDANT: "ATTENDANT";
    }>>;
    assignedLocationIds: z.ZodDefault<z.ZodArray<z.ZodString>>;
}, z.core.$strip>;
export type AddHostStaffRequest = z.infer<typeof AddHostStaffRequestSchema>;
export declare const UpdateHostStaffRequestSchema: z.ZodObject<{
    staffRole: z.ZodOptional<z.ZodEnum<{
        MANAGER: "MANAGER";
        ATTENDANT: "ATTENDANT";
    }>>;
    assignedLocationIds: z.ZodOptional<z.ZodArray<z.ZodString>>;
    isActive: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
export type UpdateHostStaffRequest = z.infer<typeof UpdateHostStaffRequestSchema>;
export declare const SubmitVerificationDocumentItemSchema: z.ZodObject<{
    documentType: z.ZodEnum<{
        OTHER: "OTHER";
        BUSINESS_REGISTRATION: "BUSINESS_REGISTRATION";
        NATIONAL_ID: "NATIONAL_ID";
        PASSPORT: "PASSPORT";
        UTILITY_BILL: "UTILITY_BILL";
        BANK_STATEMENT: "BANK_STATEMENT";
        PROOF_OF_ADDRESS: "PROOF_OF_ADDRESS";
    }>;
    intentId: z.ZodOptional<z.ZodString>;
    fileKey: z.ZodOptional<z.ZodString>;
    fileName: z.ZodOptional<z.ZodString>;
    fileSize: z.ZodOptional<z.ZodNumber>;
    mimeType: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type SubmitVerificationDocumentItem = z.infer<typeof SubmitVerificationDocumentItemSchema>;
export declare const SubmitHostVerificationRequestSchema: z.ZodObject<{
    documents: z.ZodArray<z.ZodObject<{
        documentType: z.ZodEnum<{
            OTHER: "OTHER";
            BUSINESS_REGISTRATION: "BUSINESS_REGISTRATION";
            NATIONAL_ID: "NATIONAL_ID";
            PASSPORT: "PASSPORT";
            UTILITY_BILL: "UTILITY_BILL";
            BANK_STATEMENT: "BANK_STATEMENT";
            PROOF_OF_ADDRESS: "PROOF_OF_ADDRESS";
        }>;
        intentId: z.ZodOptional<z.ZodString>;
        fileKey: z.ZodOptional<z.ZodString>;
        fileName: z.ZodOptional<z.ZodString>;
        fileSize: z.ZodOptional<z.ZodNumber>;
        mimeType: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type SubmitHostVerificationRequest = z.infer<typeof SubmitHostVerificationRequestSchema>;
export declare const ReviewHostVerificationRequestSchema: z.ZodObject<{
    decision: z.ZodEnum<{
        APPROVE: "APPROVE";
        REJECT: "REJECT";
        REQUEST_INFO: "REQUEST_INFO";
    }>;
    rejectionReason: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    adminNotes: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
export type ReviewHostVerificationRequest = z.infer<typeof ReviewHostVerificationRequestSchema>;
export declare const HostBusinessListResponseSchema: z.ZodObject<{
    businesses: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        ownerUserId: z.ZodString;
        legalBusinessName: z.ZodString;
        tradeName: z.ZodString;
        businessRegistrationNumber: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        entityType: z.ZodEnum<{
            SOLE_PROPRIETORSHIP: "SOLE_PROPRIETORSHIP";
            PRIVATE_LIMITED: "PRIVATE_LIMITED";
            HOTEL: "HOTEL";
            RETAIL_SHOP: "RETAIL_SHOP";
            PARTNERSHIP: "PARTNERSHIP";
            OTHER: "OTHER";
        }>;
        taxIdentifier: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        contactEmail: z.ZodString;
        contactPhone: z.ZodString;
        addressLine1: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        addressLine2: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        city: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        postalCode: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        countryCode: z.ZodDefault<z.ZodString>;
        payoutBankName: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        payoutAccountNumber: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        payoutAccountNumberMasked: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        payoutAccountName: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        payoutBranchCode: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        status: z.ZodEnum<{
            PENDING_VERIFICATION: "PENDING_VERIFICATION";
            ACTIVE: "ACTIVE";
            SUSPENDED: "SUSPENDED";
            DRAFT: "DRAFT";
            REJECTED: "REJECTED";
        }>;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
        verification: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            id: z.ZodString;
            businessId: z.ZodString;
            submittedBy: z.ZodString;
            status: z.ZodEnum<{
                REJECTED: "REJECTED";
                PENDING_REVIEW: "PENDING_REVIEW";
                APPROVED: "APPROVED";
                INFORMATION_REQUESTED: "INFORMATION_REQUESTED";
            }>;
            reviewerUserId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            reviewedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            rejectionReason: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            adminNotes: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            submittedAt: z.ZodString;
            createdAt: z.ZodString;
            updatedAt: z.ZodString;
            documents: z.ZodDefault<z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                verificationId: z.ZodString;
                documentType: z.ZodEnum<{
                    OTHER: "OTHER";
                    BUSINESS_REGISTRATION: "BUSINESS_REGISTRATION";
                    NATIONAL_ID: "NATIONAL_ID";
                    PASSPORT: "PASSPORT";
                    UTILITY_BILL: "UTILITY_BILL";
                    BANK_STATEMENT: "BANK_STATEMENT";
                    PROOF_OF_ADDRESS: "PROOF_OF_ADDRESS";
                }>;
                fileKey: z.ZodString;
                fileName: z.ZodString;
                fileSize: z.ZodNumber;
                mimeType: z.ZodString;
                status: z.ZodEnum<{
                    REJECTED: "REJECTED";
                    PENDING: "PENDING";
                    VERIFIED: "VERIFIED";
                }>;
                rejectionReason: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                downloadUrl: z.ZodOptional<z.ZodString>;
                createdAt: z.ZodString;
                updatedAt: z.ZodString;
            }, z.core.$strip>>>;
        }, z.core.$strip>>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type HostBusinessListResponse = z.infer<typeof HostBusinessListResponseSchema>;
export declare const HostVerificationQueueQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    status: z.ZodOptional<z.ZodEnum<{
        REJECTED: "REJECTED";
        PENDING_REVIEW: "PENDING_REVIEW";
        APPROVED: "APPROVED";
        INFORMATION_REQUESTED: "INFORMATION_REQUESTED";
        ALL: "ALL";
    }>>;
}, z.core.$strip>;
export type HostVerificationQueueQuery = z.infer<typeof HostVerificationQueueQuerySchema>;
export declare const HostVerificationQueueItemSchema: z.ZodObject<{
    verificationId: z.ZodString;
    businessId: z.ZodString;
    legalBusinessName: z.ZodString;
    tradeName: z.ZodString;
    businessRegistrationNumber: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    businessStatus: z.ZodOptional<z.ZodEnum<{
        PENDING_VERIFICATION: "PENDING_VERIFICATION";
        ACTIVE: "ACTIVE";
        SUSPENDED: "SUSPENDED";
        DRAFT: "DRAFT";
        REJECTED: "REJECTED";
    }>>;
    entityType: z.ZodEnum<{
        SOLE_PROPRIETORSHIP: "SOLE_PROPRIETORSHIP";
        PRIVATE_LIMITED: "PRIVATE_LIMITED";
        HOTEL: "HOTEL";
        RETAIL_SHOP: "RETAIL_SHOP";
        PARTNERSHIP: "PARTNERSHIP";
        OTHER: "OTHER";
    }>;
    ownerEmail: z.ZodString;
    ownerDisplayName: z.ZodString;
    status: z.ZodEnum<{
        REJECTED: "REJECTED";
        PENDING_REVIEW: "PENDING_REVIEW";
        APPROVED: "APPROVED";
        INFORMATION_REQUESTED: "INFORMATION_REQUESTED";
    }>;
    documentCount: z.ZodNumber;
    submittedAt: z.ZodString;
}, z.core.$strip>;
export type HostVerificationQueueItem = z.infer<typeof HostVerificationQueueItemSchema>;
export declare const HostVerificationQueueResponseSchema: z.ZodObject<{
    queue: z.ZodArray<z.ZodObject<{
        verificationId: z.ZodString;
        businessId: z.ZodString;
        legalBusinessName: z.ZodString;
        tradeName: z.ZodString;
        businessRegistrationNumber: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        businessStatus: z.ZodOptional<z.ZodEnum<{
            PENDING_VERIFICATION: "PENDING_VERIFICATION";
            ACTIVE: "ACTIVE";
            SUSPENDED: "SUSPENDED";
            DRAFT: "DRAFT";
            REJECTED: "REJECTED";
        }>>;
        entityType: z.ZodEnum<{
            SOLE_PROPRIETORSHIP: "SOLE_PROPRIETORSHIP";
            PRIVATE_LIMITED: "PRIVATE_LIMITED";
            HOTEL: "HOTEL";
            RETAIL_SHOP: "RETAIL_SHOP";
            PARTNERSHIP: "PARTNERSHIP";
            OTHER: "OTHER";
        }>;
        ownerEmail: z.ZodString;
        ownerDisplayName: z.ZodString;
        status: z.ZodEnum<{
            REJECTED: "REJECTED";
            PENDING_REVIEW: "PENDING_REVIEW";
            APPROVED: "APPROVED";
            INFORMATION_REQUESTED: "INFORMATION_REQUESTED";
        }>;
        documentCount: z.ZodNumber;
        submittedAt: z.ZodString;
    }, z.core.$strip>>;
    total: z.ZodNumber;
}, z.core.$strip>;
export type HostVerificationQueueResponse = z.infer<typeof HostVerificationQueueResponseSchema>;
export declare const HostStaffListResponseSchema: z.ZodObject<{
    staff: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        businessId: z.ZodString;
        userId: z.ZodString;
        staffRole: z.ZodEnum<{
            MANAGER: "MANAGER";
            ATTENDANT: "ATTENDANT";
        }>;
        assignedLocationIds: z.ZodDefault<z.ZodArray<z.ZodString>>;
        isActive: z.ZodBoolean;
        invitedAt: z.ZodString;
        acceptedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
        email: z.ZodString;
        displayName: z.ZodString;
        userStatus: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type HostStaffListResponse = z.infer<typeof HostStaffListResponseSchema>;
export declare const AdminHostListQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    status: z.ZodOptional<z.ZodEnum<{
        PENDING_VERIFICATION: "PENDING_VERIFICATION";
        ACTIVE: "ACTIVE";
        SUSPENDED: "SUSPENDED";
        DRAFT: "DRAFT";
        REJECTED: "REJECTED";
    }>>;
    search: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type AdminHostListQuery = z.infer<typeof AdminHostListQuerySchema>;
export declare const AdminHostLocationBriefSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    city: z.ZodString;
    status: z.ZodString;
    bookingMode: z.ZodString;
    updatedAt: z.ZodString;
}, z.core.$strip>;
export type AdminHostLocationBrief = z.infer<typeof AdminHostLocationBriefSchema>;
export declare const AdminHostDirectoryItemSchema: z.ZodObject<{
    id: z.ZodString;
    ownerUserId: z.ZodString;
    ownerEmail: z.ZodString;
    ownerDisplayName: z.ZodString;
    legalBusinessName: z.ZodString;
    tradeName: z.ZodString;
    businessRegistrationNumber: z.ZodNullable<z.ZodString>;
    entityType: z.ZodEnum<{
        SOLE_PROPRIETORSHIP: "SOLE_PROPRIETORSHIP";
        PRIVATE_LIMITED: "PRIVATE_LIMITED";
        HOTEL: "HOTEL";
        RETAIL_SHOP: "RETAIL_SHOP";
        PARTNERSHIP: "PARTNERSHIP";
        OTHER: "OTHER";
    }>;
    city: z.ZodNullable<z.ZodString>;
    contactEmail: z.ZodString;
    contactPhone: z.ZodString;
    status: z.ZodEnum<{
        PENDING_VERIFICATION: "PENDING_VERIFICATION";
        ACTIVE: "ACTIVE";
        SUSPENDED: "SUSPENDED";
        DRAFT: "DRAFT";
        REJECTED: "REJECTED";
    }>;
    verificationStatus: z.ZodNullable<z.ZodEnum<{
        REJECTED: "REJECTED";
        PENDING_REVIEW: "PENDING_REVIEW";
        APPROVED: "APPROVED";
        INFORMATION_REQUESTED: "INFORMATION_REQUESTED";
    }>>;
    locationCount: z.ZodNumber;
    activeLocationCount: z.ZodNumber;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, z.core.$strip>;
export type AdminHostDirectoryItem = z.infer<typeof AdminHostDirectoryItemSchema>;
export declare const AdminHostDirectoryDetailSchema: z.ZodObject<{
    id: z.ZodString;
    ownerUserId: z.ZodString;
    ownerEmail: z.ZodString;
    ownerDisplayName: z.ZodString;
    legalBusinessName: z.ZodString;
    tradeName: z.ZodString;
    businessRegistrationNumber: z.ZodNullable<z.ZodString>;
    entityType: z.ZodEnum<{
        SOLE_PROPRIETORSHIP: "SOLE_PROPRIETORSHIP";
        PRIVATE_LIMITED: "PRIVATE_LIMITED";
        HOTEL: "HOTEL";
        RETAIL_SHOP: "RETAIL_SHOP";
        PARTNERSHIP: "PARTNERSHIP";
        OTHER: "OTHER";
    }>;
    city: z.ZodNullable<z.ZodString>;
    contactEmail: z.ZodString;
    contactPhone: z.ZodString;
    status: z.ZodEnum<{
        PENDING_VERIFICATION: "PENDING_VERIFICATION";
        ACTIVE: "ACTIVE";
        SUSPENDED: "SUSPENDED";
        DRAFT: "DRAFT";
        REJECTED: "REJECTED";
    }>;
    verificationStatus: z.ZodNullable<z.ZodEnum<{
        REJECTED: "REJECTED";
        PENDING_REVIEW: "PENDING_REVIEW";
        APPROVED: "APPROVED";
        INFORMATION_REQUESTED: "INFORMATION_REQUESTED";
    }>>;
    locationCount: z.ZodNumber;
    activeLocationCount: z.ZodNumber;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    taxIdentifier: z.ZodNullable<z.ZodString>;
    addressLine1: z.ZodNullable<z.ZodString>;
    addressLine2: z.ZodNullable<z.ZodString>;
    postalCode: z.ZodNullable<z.ZodString>;
    countryCode: z.ZodString;
    latestVerification: z.ZodNullable<z.ZodObject<{
        id: z.ZodString;
        businessId: z.ZodString;
        submittedBy: z.ZodString;
        status: z.ZodEnum<{
            REJECTED: "REJECTED";
            PENDING_REVIEW: "PENDING_REVIEW";
            APPROVED: "APPROVED";
            INFORMATION_REQUESTED: "INFORMATION_REQUESTED";
        }>;
        reviewerUserId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        reviewedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        rejectionReason: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        adminNotes: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        submittedAt: z.ZodString;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
        documents: z.ZodDefault<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            verificationId: z.ZodString;
            documentType: z.ZodEnum<{
                OTHER: "OTHER";
                BUSINESS_REGISTRATION: "BUSINESS_REGISTRATION";
                NATIONAL_ID: "NATIONAL_ID";
                PASSPORT: "PASSPORT";
                UTILITY_BILL: "UTILITY_BILL";
                BANK_STATEMENT: "BANK_STATEMENT";
                PROOF_OF_ADDRESS: "PROOF_OF_ADDRESS";
            }>;
            fileKey: z.ZodString;
            fileName: z.ZodString;
            fileSize: z.ZodNumber;
            mimeType: z.ZodString;
            status: z.ZodEnum<{
                REJECTED: "REJECTED";
                PENDING: "PENDING";
                VERIFIED: "VERIFIED";
            }>;
            rejectionReason: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            downloadUrl: z.ZodOptional<z.ZodString>;
            createdAt: z.ZodString;
            updatedAt: z.ZodString;
        }, z.core.$strip>>>;
    }, z.core.$strip>>;
    locations: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        city: z.ZodString;
        status: z.ZodString;
        bookingMode: z.ZodString;
        updatedAt: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type AdminHostDirectoryDetail = z.infer<typeof AdminHostDirectoryDetailSchema>;
export declare const AdminSuspendHostBusinessRequestSchema: z.ZodObject<{
    reason: z.ZodString;
}, z.core.$strip>;
export type AdminSuspendHostBusinessRequest = z.infer<typeof AdminSuspendHostBusinessRequestSchema>;
export declare const AdminReinstateHostBusinessRequestSchema: z.ZodObject<{
    reason: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type AdminReinstateHostBusinessRequest = z.infer<typeof AdminReinstateHostBusinessRequestSchema>;
//# sourceMappingURL=index.d.ts.map