"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IconChevronRight, IconCalendar, IconArrow } from "@/app/components/icons";

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

export function BlogClient({ posts }: BlogClientProps) {
  // Build category list from actual posts
  const allCategories = ["All", ...Array.from(new Set(posts.map((p) => p.category).filter(Boolean) as string[]))];
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
      {/* Category Filter */}
      <section className="py-6 bg-white border-b border-[#eae6de] sticky top-[100px] z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap gap-3">
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
                  activeCategory === cat
                    ? "bg-[#0B1F3A] text-white shadow"
                    : "bg-[#f7f5f0] text-[#374151] hover:bg-[#eae6de]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Featured Post */}
            {featured && (
              <div className="mb-14">
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-500 mb-5">
                  Featured
                </p>
                <Link
                  href={`/blog/${featured.slug}`}
                  className="block rounded-2xl overflow-hidden border border-[#eae6de] shadow-sm hover:shadow-xl transition group"
                >
                  <div className="relative h-64 md:h-80 bg-[#0B1F3A] overflow-hidden">
                    <Image
                      src={featured.imageUrl ?? fallbackImage}
                      alt={featured.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#0B1F3A]/60 to-transparent" />
                    {featured.category && (
                      <span className="absolute top-4 left-4 px-3 py-1 bg-amber-400 text-[#0B1F3A] text-xs font-bold rounded-full">
                        {featured.category}
                      </span>
                    )}
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-4 text-sm text-[#6b7280] mb-4 flex-wrap">
                      <span className="flex items-center gap-1.5">
                        <IconCalendar size={14} />
                        {formatDate(featured.createdAt)}
                      </span>
                      {featured.readTime && <><span>·</span><span>{featured.readTime}</span></>}
                      {featured.author && <><span>·</span><span>{featured.author}</span></>}
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-[#0B1F3A] mb-4 leading-tight group-hover:text-amber-600 transition">
                      {featured.title}
                    </h2>
                    {featured.excerpt && (
                      <p className="text-[#374151] leading-relaxed mb-6">{featured.excerpt}</p>
                    )}
                    <span className="inline-flex items-center gap-2 text-amber-600 font-bold hover:gap-3 transition-all">
                      Read Full Article <IconArrow size={16} />
                    </span>
                  </div>
                </Link>
              </div>
            )}

            {/* Post Grid */}
            {rest.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-[#0B1F3A] mb-8 border-b border-[#eae6de] pb-4">
                  Latest Articles
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {rest.map((post) => (
                    <Link
                      key={post.id}
                      href={`/blog/${post.slug}`}
                      className="group rounded-xl overflow-hidden border border-[#eae6de] hover:border-amber-300 hover:shadow-lg transition"
                    >
                      <div className="relative h-48 bg-[#0B1F3A] overflow-hidden">
                        <Image
                          src={post.imageUrl ?? fallbackImage}
                          alt={post.title}
                          fill
                          sizes="(max-width: 640px) 100vw, 50vw"
                          className="object-cover group-hover:scale-105 transition duration-500"
                        />
                        {post.category && (
                          <span className="absolute top-3 left-3 px-2 py-1 bg-amber-400 text-[#0B1F3A] text-xs font-bold rounded-full">
                            {post.category}
                          </span>
                        )}
                      </div>
                      <div className="p-5">
                        <div className="flex items-center gap-3 text-xs text-[#6b7280] mb-3">
                          <span>{formatDate(post.createdAt)}</span>
                          {post.readTime && <><span>·</span><span>{post.readTime}</span></>}
                        </div>
                        <h3 className="font-bold text-[#0B1F3A] mb-2 leading-snug group-hover:text-amber-600 transition line-clamp-2">
                          {post.title}
                        </h3>
                        {post.excerpt && (
                          <p className="text-sm text-[#6b7280] line-clamp-2 mb-4">{post.excerpt}</p>
                        )}
                        <span className="text-sm font-semibold text-amber-600 flex items-center gap-1.5">
                          Read More <IconChevronRight size={14} />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {filtered.length === 0 && (
              <div className="text-center py-24">
                <p className="text-5xl mb-4">📭</p>
                <h3 className="text-xl font-bold text-[#0B1F3A] mb-2">No posts found</h3>
                <p className="text-[#6b7280]">Try a different category.</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-72 shrink-0 space-y-8">
            {/* Categories */}
            <div className="bg-[#f7f5f0] rounded-2xl p-6 border border-[#eae6de]">
              <h3 className="font-bold text-[#0B1F3A] text-lg mb-5">Categories</h3>
              <ul className="space-y-3">
                {allCategories.slice(1).map((cat) => {
                  const count = posts.filter((p) => p.category === cat).length;
                  return (
                    <li key={cat}>
                      <button
                        onClick={() => setActiveCategory(cat)}
                        className="w-full flex items-center justify-between text-sm text-[#374151] hover:text-amber-600 transition group"
                      >
                        <span className="flex items-center gap-2">
                          <IconChevronRight size={12} className="text-amber-400" />
                          {cat}
                        </span>
                        <span className="px-2 py-0.5 bg-white rounded-full text-xs font-semibold border border-[#eae6de] group-hover:border-amber-300 transition">
                          {count}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Recent Posts */}
            <div className="bg-white rounded-2xl p-6 border border-[#eae6de]">
              <h3 className="font-bold text-[#0B1F3A] text-lg mb-5">Recent Posts</h3>
              <div className="space-y-5">
                {recentPosts.map((post) => (
                  <Link key={post.id} href={`/blog/${post.slug}`} className="flex gap-3 group">
                    <div className="relative w-16 h-14 rounded-lg overflow-hidden shrink-0 bg-[#0B1F3A]">
                      <Image
                        src={post.imageUrl ?? fallbackImage}
                        alt={post.title}
                        fill
                        sizes="64px"
                        className="object-cover"
                        unoptimized={!!post.imageUrl}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#0B1F3A] line-clamp-2 group-hover:text-amber-600 transition leading-snug">
                        {post.title}
                      </p>
                      <p className="text-xs text-[#6b7280] mt-1">{formatDate(post.createdAt)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-[#0B1F3A] rounded-2xl p-6 text-white">
              <h3 className="font-bold text-lg mb-2">Stay Updated</h3>
              <p className="text-[#8ba7c7] text-sm mb-5">
                Get the latest news and articles in your inbox.
              </p>
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-[#8ba7c7] text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 mb-3"
              />
              <button className="w-full py-3 bg-amber-400 text-[#0B1F3A] font-bold rounded-xl hover:bg-amber-300 transition text-sm">
                Subscribe
              </button>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
