import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../app/generated/prisma/client";
import * as dotenv from "dotenv";
import { resolve } from "path";

dotenv.config({ path: resolve(__dirname, "../.env.local") });
dotenv.config({ path: resolve(__dirname, "../.env") });

async function main() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  const article = await prisma.news.upsert({
    where: { slug: "news24-kmc-lalitpur-educational-hub" },
    update: {},
    create: {
      title: "KMC Lalitpur Featured on NEWS24 TV — Educational Hub for Thousands",
      slug: "news24-kmc-lalitpur-educational-hub",
      description:
        "NEWS24 TV featured Kathmandu Model College Lalitpur in a special news segment, highlighting its role as a premier educational hub serving thousands of students across Science, Management, and Law streams.",
      content:
        "[youtube:3W8WGqx7T74]\n\nKathmandu Model College Lalitpur (KMC) was recently featured in a special news segment on NEWS24 TV, one of Nepal's leading news channels. The segment — titled \"हजारौं विद्यार्थीको शैक्षिक हब बनेको काठमाडौँ मोडल कलेज ललितपुर\" — showcased how KMC has grown into a renowned educational institution serving thousands of students.\n\nThe coverage highlighted KMC's commitment to academic excellence, its NEB-affiliated programs in Science, Management, and Law, and the world-class facilities available to students including modern laboratories, a vast library, sports complex, and more.\n\nWith a consistent 97% NEB pass rate and over 10,000 alumni, KMC Lalitpur continues to be a top choice for students across Nepal.",
      category: "Media Coverage",
      imageUrl: "https://img.youtube.com/vi/3W8WGqx7T74/maxresdefault.jpg",
      published: true,
      featured: true,
      metaTitle: "KMC Lalitpur on NEWS24 TV — Educational Hub Feature",
      metaDescription:
        "NEWS24 TV featured KMC Lalitpur as an educational hub for thousands of students in Nepal.",
    },
  });

  console.log("✅ Seeded article:", article.id, "-", article.title);
  await prisma.$disconnect();
  await pool.end();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
