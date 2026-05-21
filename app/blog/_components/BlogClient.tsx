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
      {/* Category Filter — tab strip with amber underline */}
      <section className="bg-white border-b border-[#eae6de] sticky top-[100px] z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap">
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-3 text-sm font-semibold transition border-b-2 -mb-px ${
                  activeCategory === cat
                    ? "border-amber-500 text-[#0B1F3A]"
                    : "border-transparent text-[#6b7280] hover:text-[#0B1F3A]"
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
            {/* Featured Post — editorial horizontal split at md+ */}
            {featured && (
              <div className="mb-14">
                <p className="text-xs font-bold tracking-[0.15em] uppercase text-[#374151] pb-3 border-b-2 border-[#0B1F3A] mb-5 inline-block">
                  Featured
                </p>
                <Link
                  href={`/blog/${featured.slug}`}
                  className="block overflow-hidden border-b-4 border-[#0B1F3A] hover:shadow-xl transition group md:flex md:h-72"
                >
                  <div className="relative h-64 md:h-full md:w-2/5 bg-[#0B1F3A] overflow-hidden shrink-0">
                    <Image
                      src={featured.imageUrl ?? fallbackImage}
                      alt={featured.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 40vw"
                      className="object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#0B1F3A]/60 to-transparent pointer-events-none" />
                    {featured.category && (
                      <span className="absolute top-4 left-4 px-3 py-1 bg-amber-400 text-[#0B1F3A] text-xs font-bold">
                        {featured.category}
                      </span>
                    )}
                  </div>
                  <div className="p-8 md:w-3/5 flex flex-col justify-center">
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

            {/* Post Grid — first post 2-col featured, rest 3-col compact */}
            {rest.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-[#0B1F3A] mb-8 border-b border-[#eae6de] pb-4">
                  Latest Articles
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {rest.map((post, index) => (
                    <Link
                      key={post.id}
                      href={`/blog/${post.slug}`}
                      className={`group overflow-hidden border border-[#eae6de] hover:-translate-y-1 hover:shadow-xl transition ${
                        index === 0 ? "md:col-span-2" : ""
                      }`}
                    >
                      <div
                        className={`relative bg-[#0B1F3A] overflow-hidden ${
                          index === 0 ? "h-56" : "h-44"
                        }`}
                      >
                        <Image
                          src={post.imageUrl ?? fallbackImage}
                          alt={post.title}
                          fill
                          sizes="(max-width: 640px) 100vw, 50vw"
                          className="object-cover group-hover:scale-105 transition duration-500"
                        />
                        {post.category && (
                          <span className="absolute top-3 left-3 px-2 py-1 bg-amber-400 text-[#0B1F3A] text-xs font-bold">
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
            {/* Categories — divider-based list, no card box */}
            <div>
              <h3 className="text-xs font-bold tracking-[0.15em] uppercase text-[#374151] pb-3 border-b-2 border-[#0B1F3A] mb-4">
                Categories
              </h3>
              <ul>
                {allCategories.slice(1).map((cat) => {
                  const count = posts.filter((p) => p.category === cat).length;
                  return (
                    <li key={cat}>
                      <button
                        onClick={() => setActiveCategory(cat)}
                        className="w-full py-3 border-b border-[#eae6de] flex items-center justify-between text-sm"
                      >
                        <span
                          className={
                            activeCategory === cat
                              ? "font-bold text-[#0B1F3A]"
                              : "text-[#374151] hover:text-[#0B1F3A] transition"
                          }
                        >
                          {cat}
                        </span>
                        <span className="text-xs text-[#6b7280]">{count}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Recent Posts — divider-based list, no card box */}
            <div>
              <h3 className="text-xs font-bold tracking-[0.15em] uppercase text-[#374151] pb-3 border-b-2 border-[#0B1F3A] mb-4">
                Recent Posts
              </h3>
              <div>
                {recentPosts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="py-4 border-b border-[#eae6de] flex gap-3 group"
                  >
                    <div className="relative w-16 h-14 overflow-hidden shrink-0 bg-[#0B1F3A]">
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

            {/* Newsletter — flat underline input */}
            <div className="bg-[#0B1F3A] p-6 text-white">
              <h3 className="font-bold text-lg mb-2">Stay Updated</h3>
              <p className="text-[#8ba7c7] text-sm mb-5">
                Get the latest news and articles in your inbox.
              </p>
              <input
                type="email"
                placeholder="Your email address"
                className="w-full py-3 bg-transparent border-b-2 border-white/30 text-white placeholder:text-[#8ba7c7] text-sm focus:outline-none focus:border-amber-400 mb-4"
              />
              <button className="w-full py-3 bg-amber-400 text-[#0B1F3A] font-bold hover:bg-amber-300 transition text-sm">
                Subscribe
              </button>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
