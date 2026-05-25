import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dtea1gktr",
  api_key: "679643636252514",
  api_secret: "tcWhIOBp47wEQIBmSaHZiB6l6EY",
});

async function run() {
  let nextCursor;
  let total = 0;
  let fixed = 0;

  do {
    const result = await cloudinary.api.resources({
      resource_type: "raw",
      type: "upload",
      prefix: "kmc/resumes",
      max_results: 500,
      next_cursor: nextCursor,
    });

    nextCursor = result.next_cursor;
    const resources = result.resources ?? [];
    total += resources.length;

    for (const r of resources) {
      try {
        await cloudinary.api.update(r.public_id, {
          resource_type: "raw",
          access_mode: "public",
        });
        fixed++;
        console.log(`✅ Fixed: ${r.public_id}`);
      } catch (err) {
        console.log(`❌ Failed: ${r.public_id} — ${err.message}`);
      }
    }
  } while (nextCursor);

  console.log(`\nDone. ${fixed} fixed out of ${total} files.`);
}

run().catch(console.error);
