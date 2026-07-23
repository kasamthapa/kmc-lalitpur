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
      <section className="pt-28 pb-12 bg-[#101F46] text-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-6 text-[#8ba7c7] text-sm flex-wrap">
            <Link href="/" className="hover:text-amber-400 transition">Home</Link>
            <IconChevronRight size={14} />
            <Link href="/news" className="hover:text-amber-400 transition">News</Link>
            <IconChevronRight size={14} />
            <span className="text-amber-400 font-semibold line-clamp-1">{article.title}</span>
          </div>

          {article.category && (
            <span className="text-xs font-bold tracking-[0.15em] uppercase text-amber-400 mb-4 inline-block">
              {article.category}
            </span>
          )}

          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
            {article.title}
          </h1>

          <div className="flex items-center gap-2 text-[#8ba7c7] text-sm pb-6 border-b border-white/10">
            <IconCalendar size={14} />
            <span>{date}</span>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {article.imageUrl && (
        <div className="max-w-4xl mx-auto px-4 -mt-8">
          <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl" style={{ paddingTop: "56.25%" }}>
            <Image
              src={article.imageUrl}
              alt={article.title}
              fill
              className="object-cover object-center"
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
            <div className="prose prose-lg max-w-none text-slate-700 leading-relaxed">
              {article.content.split(/(\[youtube:[^\]]+\])/).map((part, idx) => {
                const match = part.match(/^\[youtube:([a-zA-Z0-9_-]+)\]$/);
                if (match) {
                  return (
                    <div key={idx} className="relative w-full rounded-2xl overflow-hidden shadow-lg my-8" style={{ paddingTop: "56.25%" }}>
                      <iframe
                        src={`https://www.youtube.com/embed/${match[1]}`}
                        title="KMC News Video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full"
                      />
                    </div>
                  );
                }
                return part ? <p key={idx} className="whitespace-pre-line">{part}</p> : null;
              })}
            </div>
          ) : (
            <p className="text-slate-500 italic">Full article content coming soon.</p>
          )}

          {/* Back link */}
          <div className="mt-12 pt-8 border-t-2 border-[#101F46] flex items-center justify-between">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-[#101F46] font-bold hover:text-amber-600 transition-colors"
            >
              <span className="rotate-180 inline-flex"><IconChevronRight size={16} /></span>
              Back to News & Updates
            </Link>
            <Link
              href="/news"
              className="text-sm font-bold text-amber-600 hover:text-amber-500 transition-colors"
            >
              More news →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
