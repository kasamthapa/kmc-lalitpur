// prisma.config.ts — Prisma 7 configuration
//
// DIRECT_URL → Neon direct connection, bypasses PgBouncer.
//   Used by Prisma CLI for migrations (prisma migrate dev / db push).
//   Must NOT use pgbouncer=true — migrations require a persistent connection.
//
// DATABASE_URL → Neon PgBouncer pooled connection.
//   Used at runtime via the PrismaClient pg adapter in app/lib/prisma.ts.
//   Includes pgbouncer=true for serverless connection pooling.

import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Migrations use the direct connection — PgBouncer does not support DDL
    url: process.env["DIRECT_URL"],
  },
});
