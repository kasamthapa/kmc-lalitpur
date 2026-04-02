"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Search } from "lucide-react";
import { useState } from "react";
import { Header } from "../components/header";
import { Footer } from "../components/footer";

const allNews = [
  {
    id: 1,
    title: "KMC Talent and Innovation Expo 2082",
    description:
      "Successfully completed the KMC Talent and Innovation Expo 2082 at KMC Lalitpur on 12th Mangshir",
    date: "February 2, 2026",
    category: "Events",
    image: "/images/news4.png",
    featured: true,
  },
  {
    id: 2,
    title: "Celebrating Mathematical Talent: KMC Lalitpur Olympiad 2082",
    description:
      "KMC Lalitpur proudly organized the Olympiad 2082 to celebrate and nurture mathematical excellence among students. The event brought together talented participants from various institutions, challenging them with thought-provoking problems that tested their analytical and problem-solving skills. Through this initiative, the college continues to promote academic curiosity, critical thinking, and a passion for mathematics.",
    category: "Student Stories",
    image: "/images/news1.png",
  },
  {
    id: 3,
    title:
      "The Theme Drama Competition 2082 was successfully conducted on 26th Mangshir at the KMC Seminar Hall",
    description:
      "The Theme Drama Competition 2082 was successfully conducted on 26th Mangshir at the KMC Seminar Hall. The event showcased the creativity, talent, and expressive abilities of students as they performed thought-provoking dramas based on diverse themes. It provided a vibrant platform for participants to highlight social issues, storytelling skills, and teamwork, making the program both entertaining and meaningful.",
    date: "February 2, 2026",
    category: "Cultural Events",
    image: "/images/news3.png",
  },
  {
    id: 4,
    title: "World NGO Day Celebration - Building Partnerships for Change",
    description:
      "Students engaged in community service and social responsibility initiatives, learning the importance of giving back to society and building meaningful partnerships with organizations making a difference.",
    date: "February 1, 2026",
    category: "Community",
    image: "/images/news5.png",
  },
  {
    id: 5,
    title:
      "KMC Student Catalyst Committee Celebrates Young Orators at Debate & Speech Event",
    description:
      "The KMC Student Catalyst Committee successfully organized a Debate & Speech Event to celebrate and nurture the art of public speaking among students. The program brought together enthusiastic participants who showcased their confidence, critical thinking, and communication skills through engaging debates and inspiring speeches. The event highlighted the importance of expressing ideas effectively and encouraged students to become impactful communicators.",
    date: "January 28, 2026",
    category: "Academic",
    image: "/images/news3.png",
  },
  //   {
  //     id: 6,
  //     title: "Annual Sports Day - A Spectacular Display of Excellence",
  //     description:
  //       "Our annual sports day celebrated athletic excellence and team spirit with students showcasing remarkable talent across various sports disciplines and activities.",
  //     date: "January 25, 2026",
  //     category: "Sports",
  //     image: "/images/news-thumb-1.png",
  //   },
  //   {
  //     id: 7,
  //     title: "Scholarship Examination Date Announced for 2081/82",
  //     description:
  //       "The scholarship examination for the academic year 2081/82 has been scheduled. Interested students are encouraged to register and prepare for this competitive selection process.",
  //     date: "January 20, 2026",
  //     category: "Admissions",
  //     image: "/images/news-thumb-2.png",
  //   },
  //   {
  //     id: 8,
  //     title: "Admission Open for 2081/82 Academic Year",
  //     description:
  //       "We are pleased to announce the opening of admissions for the 2081/82 academic year. Students can now apply online through our portal with scholarship opportunities available.",
  //     date: "January 15, 2026",
  //     category: "Admissions",
  //     image: "/images/news-thumb-3.png",
  //   },
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
  const otherNews = filteredNews.filter((item) => item.id !== featuredNews.id);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Page Header */}
        <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white pt-32 pb-16 mt-16">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              News & Updates
            </h1>
            <p className="text-xl text-slate-300">
              Stay informed about the latest developments, achievements, and
              events at our institution
            </p>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="py-12 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4">
            {/* Search Bar */}
            <div className="mb-8">
              <div className="relative">
                <Search
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search news..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-slate-900"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-amber-500 text-white shadow-lg"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured News */}
        {featuredNews && (
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-3xl font-bold text-slate-900 mb-8">
                Featured Story
              </h2>
              <div className="bg-white rounded-2xl overflow-hidden shadow-xl border border-slate-200 hover:shadow-2xl transition-all duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  {/* Featured Image */}
                  <div className="relative h-96 lg:h-full bg-gradient-to-br from-slate-600 to-slate-900 overflow-hidden">
                    <Image
                      src={featuredNews.image}
                      alt={featuredNews.title}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Featured Content */}
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-bold">
                        {featuredNews.category}
                      </span>
                      <span className="text-slate-500 font-semibold text-sm">
                        {featuredNews.date}
                      </span>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
                      {featuredNews.title}
                    </h3>
                    <p className="text-lg text-slate-700 leading-relaxed mb-8">
                      {featuredNews.description}
                    </p>
                    <Link
                      href="#"
                      className="inline-flex items-center text-amber-600 font-bold text-lg hover:text-amber-700 transition-colors"
                    >
                      Read Full Story
                      <ChevronRight size={20} className="ml-2" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* News Grid */}
        {otherNews.length > 0 && (
          <section className="py-16 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-3xl font-bold text-slate-900 mb-8">
                Latest News
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {otherNews.map((news) => (
                  <div
                    key={news.id}
                    className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-amber-300 group cursor-pointer"
                  >
                    {/* News Image */}
                    <div className="relative h-48 bg-gradient-to-br from-slate-600 to-slate-900 overflow-hidden">
                      <Image
                        src={news.image}
                        alt={news.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>

                    {/* News Content */}
                    <div className="p-6">
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-bold">
                          {news.category}
                        </span>
                        <span className="text-slate-500 font-semibold text-xs">
                          {news.date}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-amber-600 transition-colors">
                        {news.title}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed line-clamp-2 mb-4">
                        {news.description}
                      </p>
                      <Link
                        href="#"
                        className="inline-flex items-center text-amber-600 font-semibold text-sm hover:text-amber-700 transition-colors group-hover:gap-2 gap-1"
                      >
                        Read More
                        <ChevronRight size={16} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* No Results */}
        {filteredNews.length === 0 && (
          <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                No news found
              </h3>
              <p className="text-slate-600 mb-8">
                Try adjusting your search or filter criteria
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="px-8 py-3 bg-amber-500 text-white font-bold rounded-lg hover:bg-amber-600 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
