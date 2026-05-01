import Link from "next/link";
import { Header } from "@/app/components/header";
import { Footer } from "@/app/components/footer";
import { IconChevronRight } from "@/app/components/icons";
import { prisma } from "@/app/lib/prisma";
import { BlogClient, type BlogPost } from "./_components/BlogClient";

export const revalidate = 60; // refresh every 60 seconds

// Hardcoded fallback — shown only when DB has no published posts yet
const FALLBACK_POSTS: BlogPost[] = [
  {
    id: "1",
    slug: "best-college-nepal-science-stream-2082",
    title: "Best College in Nepal for Science Stream in 2082 — Complete Guide",
    excerpt:
      "Choosing the right +2 Science college in Nepal is one of the most important decisions of your life. We compare top institutions on faculty quality, lab facilities, pass rates, and entrance prep success.",
    category: "School Rankings",
    imageUrl: "/images/science.png",
    author: "KMC Academic Team",
    readTime: "8 min read",
    featured: true,
    createdAt: new Date("2026-04-06").toISOString(),
  },
  {
    id: "2",
    slug: "top-plus2-colleges-lalitpur-2082",
    title: "Top +2 Colleges in Lalitpur for Science, Management & Law (2082)",
    excerpt:
      "Lalitpur has become one of Nepal's most competitive hubs for higher secondary education. A detailed breakdown of the best +2 colleges in Lalitpur.",
    category: "School Rankings",
    imageUrl: "/images/classroom.png",
    author: "KMC Admissions Team",
    readTime: "7 min read",
    featured: false,
    createdAt: new Date("2026-04-04").toISOString(),
  },
  {
    id: "3",
    slug: "ioe-entrance-preparation-kmc-science",
    title: "IOE Entrance Preparation: How KMC Science Students Crack Engineering",
    excerpt:
      "KMC Lalitpur students have one of the highest IOE entrance success rates in Lalitpur. Our dedicated entrance prep classes and mock tests are designed to get you into Pulchowk and beyond.",
    category: "Tips & Guides",
    imageUrl: "/images/computer-lab.png",
    author: "KMC Science Department",
    readTime: "6 min read",
    featured: false,
    createdAt: new Date("2026-04-01").toISOString(),
  },
  {
    id: "4",
    slug: "neb-exam-2082-preparation",
    title: "NEB Exam 2082: What to Expect and How to Prepare",
    excerpt:
      "Everything Grade 12 students need to know about the NEB board examination — marking scheme, practical weightage, model questions, and the proven study plan our faculty recommends.",
    category: "Tips & Guides",
    imageUrl: "/images/library.png",
    author: "KMC Faculty",
    readTime: "9 min read",
    featured: false,
    createdAt: new Date("2026-03-25").toISOString(),
  },
];

export default async function BlogPage() {
  let posts: BlogPost[] = [];

  try {
    const dbPosts = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
      select: {
        id: true,
        slug: true,
        title: true,
        excerpt: true,
        category: true,
        imageUrl: true,
        author: true,
        readTime: true,
        featured: true,
        createdAt: true,
      },
    });

    posts = dbPosts.map((p) => ({
      ...p,
      createdAt: p.createdAt.toISOString(),
    }));
  } catch {
    // DB unavailable — fall through to fallback
  }

  // Use fallback only if DB returned nothing
  if (posts.length === 0) {
    posts = FALLBACK_POSTS;
  }

  return (
    <main className="bg-white">
      <Header />

      {/* Hero */}
      <section className="pt-24 pb-16 bg-[#0B1F3A] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-8 text-[#8ba7c7] text-sm">
            <Link href="/" className="hover:text-amber-400 transition">
              Home
            </Link>
            <IconChevronRight size={14} />
            <span className="text-amber-400 font-semibold">Blog</span>
          </div>
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-400 mb-4">
              Stories & Insights
            </p>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
              KMC Blog
            </h1>
            <p className="text-xl text-[#8ba7c7] leading-relaxed">
              Stories from campus life, academic insights, alumni journeys, and
              tips for every KMC student and parent.
            </p>
          </div>
        </div>
      </section>

      {/* Client shell — handles filtering, rendering, sidebar */}
      <BlogClient posts={posts} />

      <Footer />
    </main>
  );
}
