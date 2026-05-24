import "dotenv/config";
import { Pool } from "pg";

async function main() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

  console.log("=== Job Applications (last 3) ===");
  const apps = await pool.query(
    "SELECT full_name, email, position, category, created_at FROM job_applications ORDER BY created_at DESC LIMIT 3"
  );
  console.log(JSON.stringify(apps.rows, null, 2));

  console.log("\n=== Vacancies ===");
  const vacs = await pool.query(
    "SELECT title, category, posts FROM vacancies ORDER BY category ASC, display_order ASC"
  );
  console.log("Count:", vacs.rows.length);
  console.log("First 3:", JSON.stringify(vacs.rows.slice(0, 3), null, 2));

  await pool.end();
}

main().catch(console.error);
