"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { IconChevronRight, IconArrow, IconMail, IconPhone } from "../components/icons";
import { SITE_CONFIG } from "../config/site";

const allNews = [
  {
    id: 1,
    title: "KMC Talent and Innovation Expo 2082",
    description:
      "Successfully completed the KMC Talent and Innovation Expo 2082 at KMC Lalitpur on 12th Mangshir. Students showcased projects spanning science, technology, arts, and entrepreneurship.",
    date: "February 2, 2026",
    category: "Events",
    image: "/images/news4.png",
    featured: true,
  },
  {
    id: 2,
    title: "Celebrating Mathematical Talent: KMC Lalitpur Olympiad 2082",
    description:
      "KMC Lalitpur proudly organized the Olympiad 2082 to celebrate and nurture mathematical excellence among students. The event brought together talented participants from various institutions, challenging them with thought-provoking problems that tested their analytical and problem-solving skills.",
    date: "January 30, 2026",
    category: "Academic",
    image: "/images/news1.png",
    featured: false,
  },
  {
    id: 3,
    title: "Theme Drama Competition 2082 — A Showcase of Student Creativity",
    description:
      "The Theme Drama Competition 2082 was successfully conducted on 26th Mangshir at the KMC Seminar Hall. The event showcased the creativity, talent, and expressive abilities of students as they performed thought-provoking dramas based on diverse themes.",
    date: "February 2, 2026",
    category: "Cultural Events",
    image: "/images/news3.png",
    featured: false,
  },
  {
    id: 4,
    title: "World NGO Day Celebration — Building Partnerships for Change",
    description:
      "Students engaged in community service and social responsibility initiatives, learning the importance of giving back to society and building meaningful partnerships with organizations making a difference.",
    date: "February 1, 2026",
    category: "Community",
    image: "/images/news5.png",
    featured: false,
  },
  {
    id: 5,
    title: "KMC Student Catalyst Committee Celebrates Young Orators",
    description:
      "The KMC Student Catalyst Committee successfully organized a Debate & Speech Event to celebrate and nurture the art of public speaking among students. The program brought together enthusiastic participants who showcased their confidence, critical thinking, and communication skills.",
    date: "January 28, 2026",
    category: "Academic",
    image: "/images/news3.png",
    featured: false,
  },
];

const notices = [
  {
    id: 1,
    title: "Admission Open for 2082/83 Academic Year",
    date: "April 1, 2026",
    type: "Admissions",
    urgent: true,
  },
  {
    id: 2,
    title: "Scholarship Examination Date: Baisakh 20, 2082",
    date: "March 28, 2026",
    type: "Examination",
    urgent: true,
  },
  {
    id: 3,
    title: "Fee Payment Deadline — Chaitra 30",
    date: "March 20, 2026",
    type: "Finance",
    urgent: false,
  },
  {
    id: 4,
    title: "Annual Sports Day — Baisakh 12, 2082",
    date: "March 15, 2026",
    type: "Events",
    urgent: false,
  },
  {
    id: 5,
    title: "NEB Practical Examination Schedule Released",
    date: "March 10, 2026",
    type: "Examination",
    urgent: false,
  },
  {
    id: 6,
    title: "Hostel Application Deadline — Chaitra 25",
    date: "March 5, 2026",
    type: "Hostel",
    urgent: false,
  },
];

const categories = [
  "All",
  "Events",
  "Academic",
  "Student Stories",
  "Cultural Events",
  "Community",
  "Sports",
  "Admissions",
];

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNews = allNews.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredNews =
    filteredNews.find((item) => item.featured) || filteredNews[0];
  const otherNews = filteredNews.filter((item) => item.id !== featuredNews?.id);

  return (
    <main className="bg-white">
      <Header />

      {/* Hero */}
      <section className="pt-24 pb-16 bg-[#0B1F3A] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-8 text-[#8ba7c7] text-sm">
            <Link href="/" className="hover:text-amber-400 transition">Home</Link>
            <IconChevronRight size={14} />
            <span className="text-amber-400 font-semibold">News & Notices</span>
          </div>
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-400 mb-4">Latest from KMC</p>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">News & Updates</h1>
          <p className="text-xl text-[#8ba7c7] max-w-2xl">
            Stay informed about the latest developments, achievements, events, and notices at KMC Lalitpur.
          </p>
        </div>
      </section>

      {/* Notice Board */}
      <section className="py-12 bg-amber-50 border-y border-amber-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-6 bg-amber-400 rounded-full" />
            <h2 className="text-xl font-bold text-[#0B1F3A]">Notice Board</h2>
            <span className="ml-2 text-xs font-bold px-2 py-1 bg-red-500 text-white rounded-full">
              {notices.filter((n) => n.urgent).length} Urgent
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {notices.map((notice) => (
              <div
                key={notice.id}
                className={`flex items-start gap-4 p-4 rounded-xl border bg-white hover:shadow-md transition cursor-pointer ${
                  notice.urgent ? "border-red-200" : "border-[#eae6de]"
                }`}
              >
                <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
                  notice.urgent ? "bg-red-50" : "bg-amber-50"
                }`}>
                  <span className="text-lg">📋</span>
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    {notice.urgent && (
                      <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full shrink-0">
                        Urgent
                      </span>
                    )}
                    <span className="text-xs text-[#6b7280]">{notice.type}</span>
                  </div>
                  <p className="text-sm font-semibold text-[#0B1F3A] leading-snug">{notice.title}</p>
                  <p className="text-xs text-[#6b7280] mt-1">{notice.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-8 bg-white border-b border-[#eae6de]">
        <div className="max-w-7xl mx-auto px-4">
          {/* Search */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6b7280]"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Search news and events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-[#eae6de] rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 text-[#374151] text-sm"
              />
            </div>
          </div>
          {/* Categories */}
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
                  selectedCategory === cat
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

      {/* Featured */}
      {featuredNews && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-[#0B1F3A] mb-8">Featured Story</h2>
            <div className="rounded-2xl overflow-hidden border border-[#eae6de] shadow-sm hover:shadow-xl transition group cursor-pointer">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-80 lg:h-full bg-[#0B1F3A] overflow-hidden">
                  <Image
                    src={featuredNews.image}
                    alt={featuredNews.title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-bold">
                      {featuredNews.category}
                    </span>
                    <span className="text-[#6b7280] text-sm">{featuredNews.date}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-[#0B1F3A] mb-5 leading-tight">
                    {featuredNews.title}
                  </h3>
                  <p className="text-[#374151] leading-relaxed mb-8">{featuredNews.description}</p>
                  <span className="inline-flex items-center gap-2 text-amber-600 font-bold">
                    Read Full Story <IconArrow size={16} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* News Grid */}
      {otherNews.length > 0 && (
        <section className="py-16 bg-[#f7f5f0]">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-[#0B1F3A] mb-8">Latest News</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherNews.map((news) => (
                <div
                  key={news.id}
                  className="bg-white rounded-xl overflow-hidden border border-[#eae6de] hover:border-amber-300 hover:shadow-xl transition group cursor-pointer"
                >
                  <div className="relative h-48 bg-[#0B1F3A] overflow-hidden">
                    <Image
                      src={news.image}
                      alt={news.title}
                      fill
                      className="object-cover group-hover:scale-110 transition duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-bold">
                        {news.category}
                      </span>
                      <span className="text-[#6b7280] text-xs">{news.date}</span>
                    </div>
                    <h3 className="font-bold text-[#0B1F3A] mb-3 line-clamp-2 group-hover:text-amber-600 transition leading-snug">
                      {news.title}
                    </h3>
                    <p className="text-sm text-[#374151] line-clamp-2 mb-4 leading-relaxed">
                      {news.description}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-amber-600 font-semibold text-sm">
                      Read More <IconChevronRight size={14} />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {filteredNews.length === 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-5xl mb-4">📭</p>
            <h3 className="text-xl font-bold text-[#0B1F3A] mb-3">No news found</h3>
            <p className="text-[#6b7280] mb-8">Try adjusting your search or filter criteria.</p>
            <button
              onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }}
              className="px-8 py-3 bg-amber-400 text-[#0B1F3A] font-bold rounded-xl hover:bg-amber-300 transition"
            >
              Clear Filters
            </button>
          </div>
        </section>
      )}

      {/* Stay Connected */}
      <section className="py-20 bg-[#0B1F3A] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Connected</h2>
          <p className="text-[#8ba7c7] text-lg mb-10">
            Follow our social media pages for real-time updates, event photos, and important notices.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={SITE_CONFIG.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-amber-400 text-[#0B1F3A] font-bold rounded-xl hover:bg-amber-300 transition"
            >
              Follow on Facebook
            </a>
            <a
              href={SITE_CONFIG.socials.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-white/20 text-white font-bold rounded-xl hover:bg-white/10 transition"
            >
              Subscribe on YouTube
            </a>
            <Link
              href="/contact"
              className="px-6 py-3 border border-white/20 text-white font-bold rounded-xl hover:bg-white/10 transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
