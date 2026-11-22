export interface RenderedEmailTemplate {
    subject: string;
    html: string;
    text: string;
    actionUrl: string;
    resendUrl: string;
}
export declare function escapeHtml(input: string): string;
export declare function resolvePublicEmailUrl(targetUrlOrPath: string, publicBaseUrl: string): string;
export declare function buildVerificationEmailTemplate(params: {
    displayName: string;
    verificationUrl: string;
    publicBaseUrl: string;
    brandName?: string;
}): RenderedEmailTemplate;
export declare function buildPasswordResetEmailTemplate(params: {
    displayName: string;
    resetUrl: string;
    publicBaseUrl: string;
    brandName?: string;
}): RenderedEmailTemplate;
//# sourceMappingURL=email.templates.d.ts.map