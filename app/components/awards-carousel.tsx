"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { IconChevronRight } from "./icons";

const awards = [
  {
    id: 1,
    title: "Ministry of Education Excellence Award",
    subtitle: "Among 4000+ Schools",
    image: "/images/award1.png",
    fallbackGradient: "from-amber-700 to-amber-900",
    description:
      "Recognized for outstanding educational standards and institutional management by the Ministry of Education.",
    // highlight: "National Recognition",
  },

  {
    id: 2,
    title: "NEB Outstanding Results",
    year: "2079",
    subtitle: "100% Pass Rate Achievement",
    image: "/images/award2.png",
    fallbackGradient: "from-blue-800 to-blue-950",
    description:
      "Consecutive 100% NEB pass rate with exceptional student performance across all streams.",
    highlight: "Excellence in Education",
  },

  {
    id: 3,
    title: "Excellence Award — Letter of Appreciation",
    year: "2074",
    subtitle: "Ministry of Education, Nepal",
    image: "/images/award3.png",
    fallbackGradient: "from-emerald-700 to-emerald-900",
    description:
      "Received the Letter of Appreciation from the Ministry of Education for outstanding contribution to secondary education in Nepal.",
    highlight: "Government Recognition",
  },
  {
    id: 4,
    title: "Academic Excellence Award",
    year: "2075",
    subtitle: "Top Performer",
    image: "/images/award4.png",
    fallbackGradient: "from-purple-800 to-purple-950",
    description:
      "Excellence in academic performance with consistent high achievement in national examinations.",
    highlight: "Top Performer",
  },
  {
    id: 5,
    title: "100% NEB Pass Rate",
    subtitle: "Consistent Every Year — All Streams",
    image: "/images/award5.png",
    fallbackGradient: "from-rose-700 to-rose-900",
    description:
      "KMC Lalitpur has achieved a 100% NEB pass rate every single year across Science, Management, and Law streams — a record unmatched by peers.",
    highlight: "Academic Excellence",
  },
  {
    id: 6,
    title: "Top-Ranked Among 4,000+ Schools",
    subtitle: "Nationwide Recognition",
    image: "/images/award6.png",
    fallbackGradient: "from-teal-700 to-teal-900",
    description:
      "Recognised as the best +2 institution among over 4,000 plus-two schools across Nepal by the Ministry of Education.",
    highlight: "National Ranking",
  },
];

export function AwardsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % awards.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 8000);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % awards.length);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 8000);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + awards.length) % awards.length);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 8000);
  };

  const award = awards[currentIndex];

  return (
    <section className="py-20 pb-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
            Awards & Recognition
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Celebrating our institution&apos;s commitment to excellence and
            innovation in education
          </p>
        </div>

        {/* Single card — keyed to currentIndex so React remounts on change */}
        <div className="max-w-5xl mx-auto">
          <div
            key={currentIndex}
            className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-amber-200"
            style={{ animation: "fadeSlideIn 0.4s ease-out" }}
          >
            <div className="grid grid-cols-1 md:grid-cols-5 md:h-96">
              {/* Left — Image */}
              <div
                className={`md:col-span-2 bg-linear-to-br ${award.fallbackGradient} overflow-hidden min-h-72 md:min-h-0`}
                style={{ position: "relative" }}
              >
                <Image
                  src={award.image}
                  alt={award.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority={currentIndex === 0}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent pointer-events-none" />
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="text-6xl md:text-7xl font-black text-amber-300 drop-shadow-lg">
                    {award.year}
                  </div>
                </div>
              </div>

              {/* Right — Details */}
              <div className="md:col-span-3 bg-white p-10 md:p-12 flex flex-col justify-center">
                <div className="inline-flex items-center w-fit mb-6">
                  <span className="bg-amber-100 text-amber-700 font-bold text-xs px-4 py-2 rounded-full uppercase tracking-wider">
                    {award.highlight}
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3 leading-tight">
                  {award.title}
                </h3>
                <p className="text-amber-600 font-semibold text-sm mb-6 uppercase tracking-wider">
                  {award.subtitle}
                </p>
                <p className="text-slate-700 text-base leading-relaxed mb-8">
                  {award.description}
                </p>
                <div className="h-1 w-16 bg-amber-400 rounded-full mb-8" />
                <div className="flex gap-3 items-center">
                  <button
                    onClick={prevSlide}
                    className="w-10 h-10 rounded-full border-2 border-amber-400 text-amber-500 hover:bg-amber-400 hover:text-white transition-all duration-300 flex items-center justify-center"
                    aria-label="Previous award"
                  >
                    <span className="rotate-180 inline-flex"><IconChevronRight size={20} /></span>
                  </button>
                  <button
                    onClick={nextSlide}
                    className="w-10 h-10 rounded-full border-2 border-amber-400 text-amber-500 hover:bg-amber-400 hover:text-white transition-all duration-300 flex items-center justify-center"
                    aria-label="Next award"
                  >
                    <IconChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-3 mt-12">
          {awards.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-500 rounded-full ${
                index === currentIndex
                  ? "bg-amber-400 w-8 h-2"
                  : "bg-slate-300 hover:bg-slate-400 w-2 h-2"
              }`}
              aria-label={`Go to award ${index + 1}`}
            />
          ))}
        </div>
      </div>

    </section>
  );
}
