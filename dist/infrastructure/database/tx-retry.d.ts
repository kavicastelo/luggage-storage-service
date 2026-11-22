/**
 * Global Database Lock Acquisition Order & Safe Deadlock/Serialization Retry Helper (Remediations B3/B4)
 *
 * Canonical lock acquisition hierarchy across all multi-table transactions touching Phase B entities:
 *   1. `storage_capacity_pools` (ORDER BY id ASC FOR UPDATE) — only when creating capacity allocations
 *   2. `bookings` (FOR UPDATE)
 *   3. `payment_intents` (ORDER BY id ASC FOR UPDATE)
 *   4. `refund_records` / `custody_records` / `custody_tokens` (ORDER BY id ASC FOR UPDATE)
 *   5. `host_payables` / append-only inserts (`financial_ledger_entries`, `payment_transactions`,
 *      `payment_webhook_events`, `booking_status_history`, `custody_events`, `security_audit_events`)
 */
export declare function isRetryablePgError(err: unknown): boolean;
/**
 * Executes a pure PostgreSQL transaction callback with bounded retry ONLY for
 * transient PostgreSQL deadlock (`40P01`) or serialization failure (`40001`).
 * Never retries application/validation errors or external network I/O.
 */
export declare function withSerializableOrDeadlockRetry<T>(operation: () => Promise<T>, maxRetries?: number): Promise<T>;
//# sourceMappingURL=tx-retry.d.ts.map