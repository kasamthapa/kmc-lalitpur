// prisma/seed-vacancies.ts — seed initial vacancies
// Run: cd my-app && npx tsx prisma/seed-vacancies.ts

import "dotenv/config";
import { Pool } from "pg";

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error("DATABASE_URL is not set");
  process.exit(1);
}

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const vacancies = [
  // Teaching
  { title: "English Teacher", category: "Teaching", posts: 2, display_order: 1 },
  { title: "Mathematics Teacher", category: "Teaching", posts: 3, display_order: 2 },
  { title: "Physics Teacher", category: "Teaching", posts: 2, display_order: 3 },
  { title: "Chemistry Teacher", category: "Teaching", posts: 1, display_order: 4 },
  { title: "Biology Teacher", category: "Teaching", posts: 2, display_order: 5 },
  { title: "Accountancy Teacher", category: "Teaching", posts: 1, display_order: 6 },
  { title: "Social Studies Teacher", category: "Teaching", posts: 1, display_order: 7 },
  { title: "Law Teacher", category: "Teaching", posts: 1, display_order: 8 },

  // Non-Teaching
  { title: "Nurse", category: "Non-Teaching", posts: 1, display_order: 1 },
  { title: "Lab Assistant (Biology/Chemistry)", category: "Non-Teaching", posts: 1, display_order: 2 },
  { title: "Hostel Warden (Female)", category: "Non-Teaching", posts: 2, display_order: 3 },
  { title: "Counselor (Female)", category: "Non-Teaching", posts: 1, display_order: 4 },
];

async function main() {
  const client = await pool.connect();
  try {
    console.log("Seeding vacancies…");

    // Clear existing vacancies
    await client.query("DELETE FROM vacancies");
    console.log("Cleared existing vacancies.");

    for (const v of vacancies) {
      await client.query(
        `INSERT INTO vacancies (id, title, category, posts, active, display_order, created_at, updated_at)
         VALUES (gen_random_uuid(), $1, $2, $3, true, $4, now(), now())`,
        [v.title, v.category, v.posts, v.display_order]
      );
      console.log(`  Created: ${v.category} / ${v.title} (${v.posts} posts)`);
    }

    console.log(`\nDone — ${vacancies.length} vacancies seeded.`);
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
