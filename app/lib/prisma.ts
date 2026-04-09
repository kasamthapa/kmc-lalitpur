// app/lib/prisma.ts
// Singleton Prisma client — prevents connection pool exhaustion during hot reloads in dev.
//
// Prisma 7: connection URL is passed via the pg adapter (not in schema.prisma).
//   DATABASE_URL → Neon PgBouncer pooled connection (pgbouncer=true)
//   Used for all runtime DB queries in API routes and Server Components.
//
// Usage:
//   import { prisma } from "@/app/lib/prisma";
//   const news = await prisma.news.findMany({ where: { published: true } });

import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/app/generated/prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    max: 10,
  });

  const adapter = new PrismaPg(pool);

  return new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
