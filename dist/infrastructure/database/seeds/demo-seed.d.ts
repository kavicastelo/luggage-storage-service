export interface SeedResult {
    usersCount: number;
    businessesCount: number;
    locationsCount: number;
    bookingsCount: number;
}
export declare function seedDemoData(): Promise<SeedResult>;
export declare function resetDatabase(): Promise<void>;
//# sourceMappingURL=demo-seed.d.ts.map