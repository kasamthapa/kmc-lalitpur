// prisma/seed.ts
import "dotenv/config";
// Run with: npm run db:seed
// Creates the first admin user and sample notices.
// Safe to re-run — uses upsert/skipDuplicates.
//
// Requires DIRECT_URL in .env (seed runs outside Next.js, uses direct connection).

import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../app/generated/prisma/client";
import bcrypt from "bcryptjs";

const pool = new Pool({
  connectionString: process.env.DIRECT_URL ?? process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  // ── Admin user ────────────────────────────────────────────────────────────
  const email = process.env.ADMIN_EMAIL ?? "admin@kmclalitpur.edu.np";
  const password = process.env.ADMIN_PASSWORD ?? "ChangeMe@123";
  const hash = await bcrypt.hash(password, 12);

  await prisma.adminUser.upsert({
    where: { email },
    update: {},
    create: {
      email,
      name: "KMC Admin",
      passwordHash: hash,
      role: "admin",
    },
  });

  console.log(`✅ Admin user ready: ${email}`);
  console.log(`⚠️  Change the password immediately after first login.`);

  // ── Sample notices ────────────────────────────────────────────────────────
  await prisma.notice.createMany({
    skipDuplicates: true,
    data: [
      {
        text: "Admissions Open for 2082 — Science, Management & Law streams. Apply now!",
        displayOrder: 1,
      },
      {
        text: "Entrance Exam scheduled for Baisakh 15, 2082. Collect your admit card from the admissions office.",
        displayOrder: 2,
      },
      {
        text: "ISO 9001:2015 Certified Institution | Best Campus 2080 — Govt. of Nepal",
        displayOrder: 3,
      },
    ],
  });

  console.log("✅ Sample notices created.");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
