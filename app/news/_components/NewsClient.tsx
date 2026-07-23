"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import { IconChevronRight, IconArrow, IconMail, IconPhone } from "../../components/icons";
import { SITE_CONFIG } from "../../config/site";

export interface NewsArticle {
  id: string;
  title: string;
  description: string | null;
  date: string;
  category: string | null;
  image: string | null;
  featured: boolean;
  slug: string;
  isFallback?: boolean;
}

export interface NoticeCard {
  id: string | number;
  title: string;
  date: string;
  type: string;
  urgent: boolean;
}

const CATEGORIES = [
  "All", "Events", "Academic", "Student Stories",
  "Cultural Events", "Community", "Sports", "Admissions",
];

const PLACEHOLDER_IMG = "/images/news1.png";

export function NewsClient({
  initialNews,
  notices,
}: {
  initialNews: NewsArticle[];
  notices: NoticeCard[];
}) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNews = initialNews.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description ?? "").toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredNews =
    filteredNews.find((item) => item.featured) ?? filteredNews[0] ?? null;
  const otherNews = filteredNews.filter((item) => item.id !== featuredNews?.id);

  return (
    <main className="bg-[#f7f5f0]">
      <Header />

      {/* Hero — editorial, dark, minimal */}
      <section className="pt-28 pb-20 bg-[#1B3E72] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-2 mb-12 text-[#8ba7c7] text-sm">
            <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <span className="text-[#8ba7c7]/40 mx-1">/</span>
            <span className="text-white/70">News &amp; Notices</span>
          </nav>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-7">
              <div className="w-8 h-px bg-amber-400 mb-5" />
              <h1 className="text-6xl md:text-7xl font-bold tracking-tight leading-[0.95] mb-6">
                News &amp;<br />
                <span className="text-amber-400">Updates</span>
              </h1>
              <p className="text-lg text-[#8ba7c7] leading-relaxed max-w-lg">
                Achievements, events, and official notices from Kathmandu Model Secondary School, Lalitpur.
              </p>
            </div>
            <div className="lg:col-span-5">
              {/* Search — right-aligned in the hero */}
              <div className="relative">
                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8ba7c7]"
                  width="17" height="17" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  placeholder="Search stories…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-white/8 border border-white/15 rounded-lg focus:outline-none focus:border-amber-400/60 text-white placeholder:text-[#8ba7c7] text-sm transition-colors"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category strip — minimal tabs, not pills */}
      <div className="bg-white border-b border-[#e8e8e8] sticky top-[72px] z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-0 overflow-x-auto scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`relative shrink-0 px-5 py-4 text-sm font-semibold transition-colors border-b-2 ${
                  selectedCategory === cat
                    ? "border-amber-400 text-[#1B3E72]"
                    : "border-transparent text-[#6b7280] hover:text-[#1B3E72]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Notice Board — horizontal strip, understated */}
      {notices.length > 0 && (
        <section className="bg-white border-b border-[#e8e8e8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
            <div className="flex items-baseline justify-between mb-6">
              <div>
                <h2 className="text-sm font-bold text-[#1B3E72] uppercase tracking-[0.12em]">Notice Board</h2>
                <div className="w-6 h-0.5 bg-amber-400 mt-2" />
              </div>
              {notices.filter((n) => n.urgent).length > 0 && (
                <span className="text-xs font-semibold text-red-600 bg-red-50 border border-red-100 px-2.5 py-1 rounded">
                  {notices.filter((n) => n.urgent).length} urgent
                </span>
              )}
            </div>
            <div className="divide-y divide-[#f0ede7]">
              {notices.map((notice, i) => (
                <div
                  key={notice.id}
                  className="flex items-start justify-between gap-6 py-4"
                >
                  <div className="flex items-start gap-4 min-w-0">
                    <span className={`mt-0.5 shrink-0 w-1.5 h-1.5 rounded-full ${notice.urgent ? "bg-red-500" : "bg-amber-400"}`} />
                    <p className="text-sm text-[#1f2937] leading-snug font-medium">{notice.title}</p>
                  </div>
                  <div className="shrink-0 flex items-center gap-3">
                    {notice.urgent && (
                      <span className="text-xs font-bold text-red-600 uppercase tracking-wide">Urgent</span>
                    )}
                    <span className="text-xs text-[#9ca3af] whitespace-nowrap">{notice.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Story — full-width editorial treatment */}
      {featuredNews && (
        <section className="bg-white pt-16 pb-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-baseline justify-between mb-8">
              <h2 className="text-xs font-bold text-[#1B3E72] uppercase tracking-[0.15em]">Featured Story</h2>
            </div>
            {featuredNews.isFallback ? (
              <div className="grid grid-cols-1 lg:grid-cols-5 overflow-hidden rounded-lg border border-[#e8e8e8]">
                <div className="lg:col-span-3 relative min-h-[340px]">
                  <Image
                    src={featuredNews.image ?? PLACEHOLDER_IMG}
                    alt={featuredNews.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 60vw"
                    className="object-cover"
                    priority
                  />
                  {featuredNews.category && (
                    <span className="absolute top-5 left-5 text-xs font-semibold text-[#1B3E72] bg-amber-400 px-3 py-1.5 tracking-wide uppercase">
                      {featuredNews.category}
                    </span>
                  )}
                </div>
                <div className="lg:col-span-2 bg-[#1B3E72] p-10 flex flex-col justify-center">
                  <span className="text-xs text-[#8ba7c7] mb-5 tracking-wider">{featuredNews.date}</span>
                  <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-5">
                    {featuredNews.title}
                  </h3>
                  {featuredNews.description && (
                    <p className="text-[#8ba7c7] leading-relaxed text-sm">{featuredNews.description}</p>
                  )}
                </div>
              </div>
            ) : (
              <Link
                href={`/news/${featuredNews.slug}`}
                className="group grid grid-cols-1 lg:grid-cols-5 overflow-hidden rounded-lg border border-[#e8e8e8] hover:border-amber-300 transition-colors"
              >
                <div className="lg:col-span-3 relative min-h-[340px] overflow-hidden">
                  <Image
                    src={featuredNews.image ?? PLACEHOLDER_IMG}
                    alt={featuredNews.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 60vw"
                    className="object-cover group-hover:scale-[1.03] transition duration-700"
                    priority
                  />
                  {featuredNews.category && (
                    <span className="absolute top-5 left-5 text-xs font-semibold text-[#1B3E72] bg-amber-400 px-3 py-1.5 tracking-wide uppercase">
                      {featuredNews.category}
                    </span>
                  )}
                </div>
                <div className="lg:col-span-2 bg-[#1B3E72] p-10 flex flex-col justify-center">
                  <span className="text-xs text-[#8ba7c7] mb-5 tracking-wider">{featuredNews.date}</span>
                  <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-5 group-hover:text-amber-400 transition-colors">
                    {featuredNews.title}
                  </h3>
                  {featuredNews.description && (
                    <p className="text-[#8ba7c7] leading-relaxed text-sm mb-8">{featuredNews.description}</p>
                  )}
                  <span className="inline-flex items-center gap-2 text-amber-400 text-sm font-semibold">
                    Read full story <IconArrow size={14} />
                  </span>
                </div>
              </Link>
            )}
          </div>
        </section>
      )}

      {/* Latest News — asymmetric grid */}
      {otherNews.length > 0 && (
        <section className="bg-[#f7f5f0] pt-10 pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-baseline justify-between mb-8">
              <div>
                <h2 className="text-xs font-bold text-[#1B3E72] uppercase tracking-[0.15em]">Latest News</h2>
                <div className="w-6 h-0.5 bg-amber-400 mt-2" />
              </div>
              <span className="text-xs text-[#9ca3af]">{otherNews.length} stories</span>
            </div>

            {/* First two items large, rest 3-col */}
            <div className="space-y-10">
              {/* Pair row — two-column */}
              {otherNews.length >= 2 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {otherNews.slice(0, 2).map((news) =>
                    news.isFallback ? (
                      <div
                        key={news.id}
                        className="bg-white overflow-hidden border border-[#e8e8e8] flex flex-col"
                      >
                        <div className="relative h-56 overflow-hidden">
                          <Image
                            src={news.image ?? PLACEHOLDER_IMG}
                            alt={news.title}
                            fill
                            sizes="(max-width: 640px) 100vw, 50vw"
                            className="object-cover"
                          />
                        </div>
                        <div className="p-6 flex flex-col flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            {news.category && (
                              <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider">{news.category}</span>
                            )}
                            <span className="text-xs text-[#9ca3af]">{news.date}</span>
                          </div>
                          <h3 className="font-bold text-[#1B3E72] text-lg leading-snug mb-3 line-clamp-2">
                            {news.title}
                          </h3>
                          {news.description && (
                            <p className="text-sm text-[#4b5563] line-clamp-2 leading-relaxed">
                              {news.description}
                            </p>
                          )}
                        </div>
                      </div>
                    ) : (
                      <Link
                        key={news.id}
                        href={`/news/${news.slug}`}
                        className="group bg-white overflow-hidden border border-[#e8e8e8] hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300 flex flex-col"
                      >
                        <div className="relative h-56 overflow-hidden">
                          <Image
                            src={news.image ?? PLACEHOLDER_IMG}
                            alt={news.title}
                            fill
                            sizes="(max-width: 640px) 100vw, 50vw"
                            className="object-cover group-hover:scale-[1.04] transition duration-600"
                          />
                        </div>
                        <div className="p-6 flex flex-col flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            {news.category && (
                              <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider">{news.category}</span>
                            )}
                            <span className="text-xs text-[#9ca3af]">{news.date}</span>
                          </div>
                          <h3 className="font-bold text-[#1B3E72] text-lg leading-snug mb-3 line-clamp-2 group-hover:text-amber-600 transition-colors">
                            {news.title}
                          </h3>
                          {news.description && (
                            <p className="text-sm text-[#4b5563] line-clamp-2 leading-relaxed mb-4">
                              {news.description}
                            </p>
                          )}
                          <span className="mt-auto text-xs font-semibold text-[#1B3E72] uppercase tracking-wider flex items-center gap-1.5">
                            Read more <IconChevronRight size={12} />
                          </span>
                        </div>
                      </Link>
                    )
                  )}
                </div>
              )}

              {/* Remaining — compact 3-col list-style */}
              {otherNews.length > 2 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {otherNews.slice(2).map((news) =>
                    news.isFallback ? (
                      <div
                        key={news.id}
                        className="bg-white border border-[#e8e8e8] overflow-hidden flex flex-col"
                      >
                        <div className="relative h-40 overflow-hidden">
                          <Image
                            src={news.image ?? PLACEHOLDER_IMG}
                            alt={news.title}
                            fill
                            sizes="33vw"
                            className="object-cover"
                          />
                        </div>
                        <div className="p-5">
                          {news.category && (
                            <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider block mb-2">{news.category}</span>
                          )}
                          <h3 className="font-bold text-[#1B3E72] text-sm leading-snug line-clamp-2">{news.title}</h3>
                          <span className="text-xs text-[#9ca3af] mt-2 block">{news.date}</span>
                        </div>
                      </div>
                    ) : (
                      <Link
                        key={news.id}
                        href={`/news/${news.slug}`}
                        className="group bg-white border border-[#e8e8e8] overflow-hidden hover:border-amber-300 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 flex flex-col"
                      >
                        <div className="relative h-40 overflow-hidden">
                          <Image
                            src={news.image ?? PLACEHOLDER_IMG}
                            alt={news.title}
                            fill
                            sizes="33vw"
                            className="object-cover group-hover:scale-[1.05] transition duration-500"
                          />
                        </div>
                        <div className="p-5 flex-1">
                          {news.category && (
                            <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider block mb-2">{news.category}</span>
                          )}
                          <h3 className="font-bold text-[#1B3E72] text-sm leading-snug line-clamp-2 group-hover:text-amber-600 transition-colors">{news.title}</h3>
                          <span className="text-xs text-[#9ca3af] mt-2 block">{news.date}</span>
                        </div>
                      </Link>
                    )
                  )}
                </div>
              )}

              {/* If only one story (no pair) */}
              {otherNews.length === 1 && (
                otherNews[0].isFallback ? (
                  <div className="bg-white border border-[#e8e8e8] overflow-hidden max-w-md">
                    <div className="relative h-48">
                      <Image src={otherNews[0].image ?? PLACEHOLDER_IMG} alt={otherNews[0].title} fill className="object-cover" />
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-[#1B3E72]">{otherNews[0].title}</h3>
                    </div>
                  </div>
                ) : (
                  <Link href={`/news/${otherNews[0].slug}`} className="group bg-white border border-[#e8e8e8] overflow-hidden max-w-md hover:shadow-lg transition">
                    <div className="relative h-48 overflow-hidden">
                      <Image src={otherNews[0].image ?? PLACEHOLDER_IMG} alt={otherNews[0].title} fill className="object-cover group-hover:scale-105 transition" />
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-[#1B3E72] group-hover:text-amber-600 transition">{otherNews[0].title}</h3>
                    </div>
                  </Link>
                )
              )}
            </div>
          </div>
        </section>
      )}

      {/* Empty state */}
      {filteredNews.length === 0 && (
        <section className="py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-4xl mb-5 opacity-30">—</p>
            <h3 className="text-xl font-bold text-[#1B3E72] mb-3">No stories found</h3>
            <p className="text-[#6b7280] mb-8 text-sm">Try adjusting your search or filter criteria.</p>
            <button
              onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }}
              className="px-7 py-2.5 bg-[#1B3E72] text-white text-sm font-semibold hover:bg-[#162d54] transition"
            >
              Clear filters
            </button>
          </div>
        </section>
      )}

      {/* Stay Connected — stripped back */}
      <section className="py-16 bg-[#1B3E72]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-8 h-px bg-amber-400 mb-5" />
              <h2 className="text-3xl font-bold text-white mb-3">Stay Connected</h2>
              <p className="text-[#8ba7c7] text-sm leading-relaxed">
                Follow our social channels for real-time updates, event photos, and important notices from KMC Lalitpur.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={SITE_CONFIG.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-amber-400 text-[#1B3E72] font-bold text-sm hover:bg-amber-300 transition-colors text-center"
              >
                Facebook
              </a>
              <a
                href={SITE_CONFIG.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-white/20 text-white font-bold text-sm hover:bg-white/8 transition-colors text-center"
              >
                YouTube
              </a>
              <Link
                href="/contact"
                className="px-6 py-3 border border-white/20 text-white font-bold text-sm hover:bg-white/8 transition-colors text-center flex items-center justify-center gap-2"
              >
                Contact <IconChevronRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
