"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { IconChevronRight, IconCalendar, IconArrow } from "../components/icons";

const categories = [
  "All",
  "School Rankings",
  "Tips & Guides",
  "Academic Excellence",
  "School Life",
  "Events",
  "Alumni Stories",
  "Faculty Insights",
];

const posts = [
  {
    id: 1,
    title: "Best College in Nepal for Science Stream in 2082 — Complete Guide",
    excerpt:
      "Choosing the right +2 Science college in Nepal is one of the most important decisions of your life. We compare top institutions on faculty quality, lab facilities, pass rates, and entrance prep success — and explain why KMC Lalitpur consistently ranks at the top.",
    date: "April 6, 2026",
    category: "School Rankings",
    image: "/images/science.png",
    author: "KMC Academic Team",
    readTime: "8 min read",
    featured: true,
  },
  {
    id: 2,
    title: "Top +2 Colleges in Lalitpur for Science, Management & Law (2082)",
    excerpt:
      "Lalitpur has become one of Nepal's most competitive hubs for higher secondary education. Here is a detailed breakdown of the best +2 colleges in Lalitpur — what each offers, their NEB pass rates, and how to choose the right one for your stream and goals.",
    date: "April 4, 2026",
    category: "School Rankings",
    image: "/images/classroom.png",
    author: "KMC Admissions Team",
    readTime: "7 min read",
    featured: false,
  },
  {
    id: 3,
    title:
      "IOE Entrance Preparation: How KMC Science Students Crack Engineering",
    excerpt:
      "KMC Lalitpur students have one of the highest IOE entrance success rates in Lalitpur. Our dedicated entrance prep classes, mock tests, and Physics-Math intensive programs are designed to get you into Pulchowk and beyond.",
    date: "April 1, 2026",
    category: "Tips & Guides",
    image: "/images/computer-lab.png",
    author: "KMC Science Department",
    readTime: "6 min read",
    featured: false,
  },
  {
    id: 4,
    title: "NEB Exam 2082: What to Expect and How to Prepare",
    excerpt:
      "Everything Grade 12 students need to know about the NEB board examination — marking scheme, practical weightage, model questions, and the proven study plan our faculty recommends for a 90%+ score.",
    date: "March 25, 2026",
    category: "Tips & Guides",
    image: "/images/library.png",
    author: "KMC Faculty",
    readTime: "9 min read",
    featured: false,
  },
  {
    id: 5,
    title: "Management vs Science: Which Stream Should You Choose After SEE?",
    excerpt:
      "The stream you choose after SEE shapes your entire career path. This guide breaks down the real differences between Science, Management, and Law — career options, difficulty level, fees, and which suits your strengths.",
    date: "March 18, 2026",
    category: "Tips & Guides",
    image: "/images/hero-main.png",
    author: "KMC Counselling Team",
    readTime: "10 min read",
    featured: false,
  },
  {
    id: 6,
    title: "Best School for Management in Nepal: Why KMC Tops the List",
    excerpt:
      "From CMAT preparation to real-world business exposure, KMC's Management stream goes beyond textbooks. Learn why students across Kathmandu Valley choose KMC for their +2 Management education and how our alumni are leading in finance and entrepreneurship.",
    date: "March 10, 2026",
    category: "School Rankings",
    image: "/images/auditorium.png",
    author: "KMC Management Department",
    readTime: "6 min read",
    featured: false,
  },
  {
    id: 7,
    title: "How KMC Students Topped the NEB Examinations 3 Years Running",
    excerpt:
      "A deep dive into the study strategies, teacher mentorship, and daily routines that helped KMC students consistently outperform national averages in NEB board examinations.",
    date: "March 5, 2026",
    category: "Academic Excellence",
    image: "/images/hero-main.png",
    author: "KMC Academic Team",
    readTime: "5 min read",
    featured: false,
  },
  {
    id: 8,
    title: "From KMC to Google: An Alumni Interview with Sarina Maharjan",
    excerpt:
      "We sat down with Sarina (Science, Batch 2010) who is now a Software Engineer at Google to talk about her journey, lessons from KMC, and advice for current students.",
    date: "February 20, 2026",
    category: "Alumni Stories",
    image: "/images/computer-lab.png",
    author: "KMC Alumni Relations",
    readTime: "8 min read",
    featured: false,
  },
  {
    id: 9,
    title:
      "KMC Talent & Innovation Expo 2082 — A Celebration of Student Creativity",
    excerpt:
      "Hundreds of students showcased their innovations, artworks, and projects at this year's expo. Here are the highlights and the projects that wowed the judges.",
    date: "February 10, 2026",
    category: "Events",
    image: "/images/auditorium.png",
    author: "KMC Events Team",
    readTime: "6 min read",
    featured: false,
  },
  {
    id: 10,
    title: "Teaching with Purpose: A Day in the Life of a KMC Educator",
    excerpt:
      "Principal Ramesh Ji and three senior teachers reflect on what drives them to come to school every day, and how they see their role beyond just teaching subjects.",
    date: "February 10, 2026",
    category: "Faculty Insights",
    image: "/images/hero-main.png",
    author: "KMC Communications",
    readTime: "5 min read",
    featured: false,
  },
];

const recentPosts = posts.slice(0, 4);

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  const featured = filtered.find((p) => p.featured) || filtered[0];
  const rest = filtered.filter((p) => p.id !== featured?.id);

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

      {/* Category Filter */}
      <section className="py-6 bg-white border-b border-[#eae6de] sticky top-[100px] z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
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
                <div className="rounded-2xl overflow-hidden border border-[#eae6de] shadow-sm hover:shadow-xl transition group cursor-pointer">
                  <div className="relative h-64 md:h-80 bg-[#0B1F3A] overflow-hidden">
                    <Image
                      src={featured.image}
                      alt={featured.title}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#0B1F3A]/60 to-transparent" />
                    <span className="absolute top-4 left-4 px-3 py-1 bg-amber-400 text-[#0B1F3A] text-xs font-bold rounded-full">
                      {featured.category}
                    </span>
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-4 text-sm text-[#6b7280] mb-4">
                      <span className="flex items-center gap-1.5">
                        <IconCalendar size={14} />
                        {featured.date}
                      </span>
                      <span>·</span>
                      <span>{featured.readTime}</span>
                      <span>·</span>
                      <span>{featured.author}</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-[#0B1F3A] mb-4 leading-tight group-hover:text-amber-600 transition">
                      {featured.title}
                    </h2>
                    <p className="text-[#374151] leading-relaxed mb-6">
                      {featured.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-2 text-amber-600 font-bold hover:gap-3 transition-all">
                      Read Full Article <IconArrow size={16} />
                    </span>
                  </div>
                </div>
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
                    <div
                      key={post.id}
                      className="group rounded-xl overflow-hidden border border-[#eae6de] hover:border-amber-300 hover:shadow-lg transition cursor-pointer"
                    >
                      <div className="relative h-48 bg-[#0B1F3A] overflow-hidden">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition duration-500"
                        />
                        <span className="absolute top-3 left-3 px-2 py-1 bg-amber-400 text-[#0B1F3A] text-xs font-bold rounded-full">
                          {post.category}
                        </span>
                      </div>
                      <div className="p-5">
                        <div className="flex items-center gap-3 text-xs text-[#6b7280] mb-3">
                          <span>{post.date}</span>
                          <span>·</span>
                          <span>{post.readTime}</span>
                        </div>
                        <h3 className="font-bold text-[#0B1F3A] mb-2 leading-snug group-hover:text-amber-600 transition line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-sm text-[#6b7280] line-clamp-2 mb-4">
                          {post.excerpt}
                        </p>
                        <span className="text-sm font-semibold text-amber-600 flex items-center gap-1.5">
                          Read More <IconChevronRight size={14} />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {filtered.length === 0 && (
              <div className="text-center py-24">
                <p className="text-5xl mb-4">📭</p>
                <h3 className="text-xl font-bold text-[#0B1F3A] mb-2">
                  No posts found
                </h3>
                <p className="text-[#6b7280]">Try a different category.</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-72 shrink-0 space-y-8">
            {/* Categories */}
            <div className="bg-[#f7f5f0] rounded-2xl p-6 border border-[#eae6de]">
              <h3 className="font-bold text-[#0B1F3A] text-lg mb-5">
                Categories
              </h3>
              <ul className="space-y-3">
                {categories.slice(1).map((cat) => {
                  const count = posts.filter((p) => p.category === cat).length;
                  return (
                    <li key={cat}>
                      <button
                        onClick={() => setActiveCategory(cat)}
                        className="w-full flex items-center justify-between text-sm text-[#374151] hover:text-amber-600 transition group"
                      >
                        <span className="flex items-center gap-2">
                          <IconChevronRight
                            size={12}
                            className="text-amber-400"
                          />
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
              <h3 className="font-bold text-[#0B1F3A] text-lg mb-5">
                Recent Posts
              </h3>
              <div className="space-y-5">
                {recentPosts.map((post) => (
                  <div
                    key={post.id}
                    className="flex gap-3 group cursor-pointer"
                  >
                    <div className="relative w-16 h-14 rounded-lg overflow-hidden shrink-0 bg-[#0B1F3A]">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#0B1F3A] line-clamp-2 group-hover:text-amber-600 transition leading-snug">
                        {post.title}
                      </p>
                      <p className="text-xs text-[#6b7280] mt-1">{post.date}</p>
                    </div>
                  </div>
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

      <Footer />
    </main>
  );
}
