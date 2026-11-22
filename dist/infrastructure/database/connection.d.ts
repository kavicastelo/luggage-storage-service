export declare const dbPool: import("pg").Pool;
export declare function checkDatabaseConnection(): Promise<{
    ok: boolean;
    postgisVersion?: string;
    error?: string;
}>;
//# sourceMappingURL=connection.d.ts.map