"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IconArrow } from "@/app/components/icons";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  category: string | null;
  imageUrl: string | null;
  author: string | null;
  readTime: string | null;
  featured: boolean;
  createdAt: string;
}

interface BlogClientProps {
  posts: BlogPost[];
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Strip markdown bold markers from display text
function stripMd(text: string): string {
  return text.replace(/\*\*([^*]+)\*\*/g, "$1");
}

export function BlogClient({ posts }: BlogClientProps) {
  const allCategories = [
    "All",
    ...Array.from(
      new Set(posts.map((p) => p.category).filter(Boolean) as string[])
    ),
  ];
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  const featured = filtered.find((p) => p.featured) ?? filtered[0];
  const rest = filtered.filter((p) => p.id !== featured?.id);
  const recentPosts = posts.slice(0, 4);

  const fallbackImage = "/images/hero-main.png";

  return (
    <>
      {/* Filter — clean tab strip */}
      <section className="bg-white border-b border-[#eae6de] sticky top-[100px] z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto">
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-4 text-sm font-semibold whitespace-nowrap transition border-b-2 -mb-px ${
                  activeCategory === cat
                    ? "border-amber-500 text-[#1B3E72]"
                    : "border-transparent text-[#6b7280] hover:text-[#1B3E72]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* ── Main content ── */}
          <div className="flex-1 min-w-0">

            {/* Featured — large editorial image + content block */}
            {featured && (
              <Link href={`/blog/${featured.slug}`} className="group block mb-16">
                {/* Full-width image, no overlay text — clean */}
                <div className="relative w-full aspect-[21/9] bg-[#1B3E72] overflow-hidden">
                  <Image
                    src={featured.imageUrl ?? fallbackImage}
                    alt={featured.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 72vw"
                    className="object-cover group-hover:scale-[1.02] transition duration-700"
                    priority
                  />
                </div>

                {/* Content below — left border accent, generous whitespace */}
                <div className="mt-7 border-l-[3px] border-amber-400 pl-7">
                  {featured.category && (
                    <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-amber-600 block mb-3">
                      {featured.category}
                    </span>
                  )}
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1B3E72] leading-[1.15] mb-4 group-hover:text-[#1a3a6a] transition">
                    {featured.title}
                  </h2>
                  {featured.excerpt && (
                    <p className="text-[#4b5563] text-lg leading-relaxed mb-5 max-w-2xl">
                      {stripMd(featured.excerpt)}
                    </p>
                  )}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-[#9ca3af]">
                    <span>{formatDate(featured.createdAt)}</span>
                    {featured.readTime && (
                      <><span>·</span><span>{featured.readTime}</span></>
                    )}
                    {featured.author && (
                      <><span>·</span><span>{featured.author}</span></>
                    )}
                    <span className="ml-auto inline-flex items-center gap-2 text-[#1B3E72] font-bold text-sm group-hover:gap-3 transition-all">
                      Read Article <IconArrow size={15} />
                    </span>
                  </div>
                </div>
              </Link>
            )}

            {/* Latest Articles */}
            {rest.length > 0 && (
              <div>
                {/* Section header — thin rule */}
                <div className="flex items-center gap-4 mb-10">
                  <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#374151]">
                    Latest Articles
                  </span>
                  <div className="flex-1 h-px bg-[#eae6de]" />
                </div>

                {/* Grid — clean image + text, no card boxes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                  {rest.map((post) => (
                    <Link
                      key={post.id}
                      href={`/blog/${post.slug}`}
                      className="group flex flex-col"
                    >
                      <div className="relative w-full aspect-[16/9] bg-[#1B3E72] overflow-hidden mb-4">
                        <Image
                          src={post.imageUrl ?? fallbackImage}
                          alt={post.title}
                          fill
                          sizes="(max-width: 640px) 100vw, 40vw"
                          className="object-cover group-hover:scale-[1.04] transition duration-500"
                        />
                      </div>
                      {post.category && (
                        <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-amber-600 mb-2">
                          {post.category}
                        </span>
                      )}
                      <h3 className="font-bold text-[#1B3E72] text-xl leading-snug mb-2 group-hover:text-[#1a3a6a] transition line-clamp-2">
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p className="text-sm text-[#6b7280] line-clamp-2 mb-4 leading-relaxed">
                          {stripMd(post.excerpt)}
                        </p>
                      )}
                      <div className="flex items-center gap-2 text-xs text-[#9ca3af] mt-auto">
                        <span>{formatDate(post.createdAt)}</span>
                        {post.readTime && (
                          <><span>·</span><span>{post.readTime}</span></>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {filtered.length === 0 && (
              <div className="text-center py-24">
                <p className="text-4xl mb-4">📭</p>
                <h3 className="text-xl font-bold text-[#1B3E72] mb-2">
                  No posts found
                </h3>
                <p className="text-[#6b7280]">Try a different category.</p>
              </div>
            )}
          </div>

          {/* ── Sidebar ── */}
          <aside className="w-full lg:w-60 shrink-0">
            <div className="lg:sticky lg:top-[140px] space-y-10">

              {/* Categories */}
              <div>
                <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#374151] pb-3 border-b-2 border-[#1B3E72]">
                  Categories
                </h3>
                <ul>
                  {allCategories.slice(1).map((cat) => {
                    const count = posts.filter((p) => p.category === cat).length;
                    return (
                      <li key={cat}>
                        <button
                          onClick={() => setActiveCategory(cat)}
                          className="w-full py-3.5 border-b border-[#eae6de] flex items-center justify-between text-sm group"
                        >
                          <span
                            className={
                              activeCategory === cat
                                ? "font-bold text-[#1B3E72]"
                                : "text-[#374151] group-hover:text-[#1B3E72] transition"
                            }
                          >
                            {cat}
                          </span>
                          <span className="text-xs text-[#9ca3af]">{count}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Recent Posts */}
              <div>
                <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#374151] pb-3 border-b-2 border-[#1B3E72]">
                  Recent Posts
                </h3>
                <div>
                  {recentPosts.map((post) => (
                    <Link
                      key={post.id}
                      href={`/blog/${post.slug}`}
                      className="py-4 border-b border-[#eae6de] flex gap-3 group"
                    >
                      <div className="relative w-14 h-12 overflow-hidden shrink-0 bg-[#1B3E72]">
                        <Image
                          src={post.imageUrl ?? fallbackImage}
                          alt={post.title}
                          fill
                          sizes="56px"
                          className="object-cover group-hover:scale-105 transition duration-300"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-[#1B3E72] line-clamp-2 group-hover:text-amber-600 transition leading-snug">
                          {post.title}
                        </p>
                        <p className="text-xs text-[#9ca3af] mt-1">
                          {formatDate(post.createdAt)}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Subscribe — subtle, no dark box */}
              <div className="border-t-2 border-[#1B3E72] pt-6">
                <h3 className="text-sm font-bold text-[#1B3E72] mb-1">
                  Stay Updated
                </h3>
                <p className="text-xs text-[#6b7280] mb-4 leading-relaxed">
                  Latest articles and campus news, delivered to your inbox.
                </p>
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full py-2.5 bg-transparent border-b-2 border-[#d1d5db] text-[#1B3E72] placeholder:text-[#9ca3af] text-sm focus:outline-none focus:border-amber-500 mb-4"
                />
                <button className="w-full py-2.5 bg-[#1B3E72] text-white text-sm font-bold hover:bg-[#162f55] transition">
                  Subscribe
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
