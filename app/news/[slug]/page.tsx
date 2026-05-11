import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/app/components/header";
import { Footer } from "@/app/components/footer";
import { IconChevronRight, IconCalendar } from "@/app/components/icons";
import { prisma } from "@/app/lib/prisma";

export const revalidate = 10;

// ── Metadata ──────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return { title: "Article Not Found" };
  return {
    title: article.metaTitle || article.title,
    description: article.metaDescription || article.description || "",
  };
}

async function getArticle(slug: string) {
  try {
    return await prisma.news.findFirst({
      where: { slug, published: true },
    });
  } catch {
    return null;
  }
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Fallback slugs (not real DB articles) — redirect back to news list
  const fallbackSlugs = [
    "kmc-talent-innovation-expo",
    "kmc-mbbs-achievers-panel",
    "theme-drama-competition",
    "kmc-community-outreach",
    "kmc-debate-speech-event",
  ];
  if (fallbackSlugs.includes(slug)) redirect("/news");

  const article = await getArticle(slug);
  if (!article) notFound();

  const date = article.createdAt.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="bg-white">
      <Header />

      {/* Hero */}
      <section className="pt-28 pb-12 bg-[#0B1F3A] text-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-6 text-[#8ba7c7] text-sm flex-wrap">
            <Link href="/" className="hover:text-amber-400 transition">Home</Link>
            <IconChevronRight size={14} />
            <Link href="/news" className="hover:text-amber-400 transition">News</Link>
            <IconChevronRight size={14} />
            <span className="text-amber-400 font-semibold line-clamp-1">{article.title}</span>
          </div>

          {article.category && (
            <span className="inline-block bg-amber-400 text-[#0B1F3A] text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
              {article.category}
            </span>
          )}

          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
            {article.title}
          </h1>

          <div className="flex items-center gap-2 text-[#8ba7c7] text-sm">
            <IconCalendar size={14} />
            <span>{date}</span>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {article.imageUrl && (
        <div className="max-w-4xl mx-auto px-4 -mt-8">
          <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={article.imageUrl}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      {/* Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          {article.description && (
            <p className="text-lg text-slate-600 leading-relaxed mb-8 font-medium border-l-4 border-amber-400 pl-5">
              {article.description}
            </p>
          )}

          {article.content ? (
            <div className="prose prose-lg max-w-none text-slate-700 leading-relaxed whitespace-pre-line">
              {article.content}
            </div>
          ) : (
            <p className="text-slate-500 italic">Full article content coming soon.</p>
          )}

          {/* Back link */}
          <div className="mt-12 pt-8 border-t border-[#eae6de]">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-[#0B1F3A] font-bold hover:text-amber-600 transition-colors"
            >
              <span className="rotate-180 inline-flex"><IconChevronRight size={16} /></span>
              Back to News & Updates
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
