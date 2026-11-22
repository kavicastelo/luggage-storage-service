import pg from "pg";
export declare const REQUIRED_PUBLIC_TABLES: readonly ["__drizzle_migrations", "users", "traveller_profiles", "host_profiles", "roles", "permissions", "user_roles", "role_permissions", "auth_sessions", "password_reset_tokens", "security_audit_events", "email_verification_tokens", "auth_rate_limits", "host_businesses", "host_verifications", "host_verification_documents", "host_staff_memberships", "storage_locations", "location_media", "storage_zones", "opening_hours", "opening_hours_exceptions", "storage_capacity_pools", "pricing_policies", "pricing_tier_rates", "upload_intents", "trusted_auth_secrets", "consumed_auth_assertions", "bookings", "booking_items", "booking_status_history", "capacity_reservations", "booking_pricing_snapshots", "payment_intents", "payment_transactions", "payment_webhook_events", "refund_records", "financial_ledger_entries", "host_payables", "custody_records", "custody_tokens", "bag_custody_items", "custody_events", "payout_batches", "payout_batch_items", "support_tickets", "support_ticket_messages"];
export declare const REVOKED_IDENTITY_SECRETS: Set<string>;
export interface IdentitySecretSyncOptions {
    activeKeyId?: string;
    activeSecret?: string;
    retiringKeyId?: string;
    retiringSecret?: string;
    retiringWindowSeconds?: number;
}
export declare function syncTrustedAuthSecret(client: pg.PoolClient, options?: IdentitySecretSyncOptions): Promise<void>;
export declare function verifyMigratedSchema(client: pg.PoolClient): Promise<void>;
export declare function backfillPlaintextPayoutRecords(client: pg.PoolClient): Promise<number>;
export declare function runMigrations(customConnectionString?: string): Promise<number>;
//# sourceMappingURL=migrate.d.ts.map