import { env } from "../../config/env.js";
import { EmailDeliveryAdapter, EmailSendResult, SendEmailVerificationParams, SendPasswordResetEmailParams } from "./email.types.js";
export interface SmtpSendMailOptions {
    from: string;
    to: string;
    subject: string;
    html: string;
    text: string;
}
export interface SmtpSendMailResult {
    messageId?: string;
    accepted?: Array<string | unknown>;
    rejected?: Array<string | unknown>;
}
export interface SmtpTransportLike {
    sendMail(mailOptions: SmtpSendMailOptions): Promise<SmtpSendMailResult>;
}
export interface ZohoSmtpAdapterOptions {
    host?: string;
    port?: number;
    secure?: boolean;
    requireTls?: boolean;
    user?: string;
    password?: string;
    fromAddress?: string;
    fromName?: string;
    timeoutMs?: number;
    publicBaseUrl?: string;
    transporter?: SmtpTransportLike;
}
/**
 * ZohoSmtpEmailAdapter:
 * Production Zoho Mail SMTP delivery adapter with strict TLS/STARTTLS validation,
 * timeout protection, and structured token-safe logging (AUD-002 / OQ-019).
 */
export declare class ZohoSmtpEmailAdapter implements EmailDeliveryAdapter {
    readonly name = "zoho";
    private readonly host;
    private readonly port;
    private readonly secure;
    private readonly requireTls;
    private readonly user;
    private readonly password;
    private readonly fromAddress;
    private readonly fromName;
    private readonly timeoutMs;
    private readonly publicBaseUrl;
    private transporter;
    constructor(options?: ZohoSmtpAdapterOptions);
    getConfigurationSummary(): {
        host: string;
        port: number;
        secure: boolean;
        requireTls: boolean;
        fromAddress: string;
        fromName: string;
        timeoutMs: number;
        hasCredentials: boolean;
    };
    private validateConfiguration;
    private getOrCreateTransporter;
    private dispatchEmail;
    sendEmailVerificationEmail(params: SendEmailVerificationParams): Promise<EmailSendResult>;
    sendPasswordResetEmail(params: SendPasswordResetEmailParams): Promise<EmailSendResult>;
}
/**
 * NoopEmailDeliveryAdapter:
 * Non-production fallback when no external email provider is configured.
 * Explicitly returns delivered: false and is forbidden in production.
 */
export declare class NoopEmailDeliveryAdapter implements EmailDeliveryAdapter {
    readonly name = "noop";
    sendPasswordResetEmail(_params: SendPasswordResetEmailParams): Promise<EmailSendResult>;
    sendEmailVerificationEmail(_params: SendEmailVerificationParams): Promise<EmailSendResult>;
}
/**
 * ConsoleDevEmailAdapter:
 * Local development adapter that logs transactional email metadata without exposing raw tokens.
 */
export declare class ConsoleDevEmailAdapter implements EmailDeliveryAdapter {
    readonly name = "console-dev";
    sendPasswordResetEmail(params: SendPasswordResetEmailParams): Promise<EmailSendResult>;
    sendEmailVerificationEmail(params: SendEmailVerificationParams): Promise<EmailSendResult>;
}
/**
 * ResendHttpEmailAdapter:
 * Optional HTTPS transactional email adapter retained for compatibility.
 */
export declare class ResendHttpEmailAdapter implements EmailDeliveryAdapter {
    readonly name = "resend";
    private readonly apiKey;
    private readonly fromAddress;
    private readonly publicBaseUrl;
    constructor(options?: {
        apiKey?: string;
        fromAddress?: string;
        publicBaseUrl?: string;
    });
    private dispatchHtmlEmail;
    sendPasswordResetEmail(params: SendPasswordResetEmailParams): Promise<EmailSendResult>;
    sendEmailVerificationEmail(params: SendEmailVerificationParams): Promise<EmailSendResult>;
}
/**
 * DeterministicTestEmailAdapter:
 * In-memory adapter for automated test suites.
 */
export declare class DeterministicTestEmailAdapter implements EmailDeliveryAdapter {
    readonly name = "deterministic-test";
    private sentEmails;
    private sentVerificationEmails;
    private simulateFailureError;
    setSimulatedFailure(errorCode: string | null): void;
    sendPasswordResetEmail(params: SendPasswordResetEmailParams): Promise<EmailSendResult>;
    sendEmailVerificationEmail(params: SendEmailVerificationParams): Promise<EmailSendResult>;
    getSentEmails(): SendPasswordResetEmailParams[];
    getLastEmail(): SendPasswordResetEmailParams | undefined;
    getSentVerificationEmails(): SendEmailVerificationParams[];
    getLastVerificationEmail(): SendEmailVerificationParams | undefined;
    getLastVerificationEmailFor(email: string): SendEmailVerificationParams | undefined;
    clear(): void;
}
export declare function createAdapterForEnvironment(provider: typeof env.EMAIL_PROVIDER, nodeEnv: typeof env.NODE_ENV): EmailDeliveryAdapter;
/**
 * EmailService:
 * Provider-agnostic boundary for transactional email delivery.
 */
export declare class EmailService {
    private adapter;
    constructor(initialAdapter?: EmailDeliveryAdapter);
    setAdapter(adapter: EmailDeliveryAdapter): void;
    getAdapter(): EmailDeliveryAdapter;
    sendPasswordResetEmail(params: SendPasswordResetEmailParams): Promise<EmailSendResult>;
    sendEmailVerificationEmail(params: SendEmailVerificationParams): Promise<EmailSendResult>;
}
export declare const emailService: EmailService;
//# sourceMappingURL=email.service.d.ts.map