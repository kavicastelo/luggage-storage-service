import * as schema from "./schema/index.js";
export declare const db: import("drizzle-orm/node-postgres").NodePgDatabase<typeof schema> & {
    $client: import("pg").Pool;
};
export { schema };
//# sourceMappingURL=drizzle.d.ts.map