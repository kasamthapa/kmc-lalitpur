// prisma.config.ts — Prisma 7 configuration
//
// DIRECT_URL → Supabase session-mode pooler connection (port 5432).
//   Used by Prisma CLI for migrations (prisma migrate dev / db push).
//   Must NOT use pgbouncer=true — migrations require a persistent connection,
//   and Supabase's actual "Direct connection" host is IPv6-only, so the
//   session pooler is used here instead for IPv4 reachability.
//
// DATABASE_URL → Supabase transaction-mode pooler connection (port 6543).
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
