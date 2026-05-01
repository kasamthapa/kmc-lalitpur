"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useCallback, useEffect } from "react";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import { IconChevronRight, IconX } from "../../components/icons";

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
  caption?: string | null;
}

const gradients = [
  "linear-gradient(135deg, #1a2e5a, #4a90d9)",
  "linear-gradient(135deg, #2d6a4f, #74c69d)",
  "linear-gradient(135deg, #7b2d8b, #c77dff)",
  "linear-gradient(135deg, #c75000, #f5a623)",
  "linear-gradient(135deg, #1a2e5a, #f5a623)",
  "linear-gradient(135deg, #2d6a4f, #1a2e5a)",
];

// ── Lightbox ──────────────────────────────────────────────────────────────────
function Lightbox({
  images,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  images: GalleryImage[];
  index: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const image = index !== null ? images[index] : null;

  // Keyboard navigation
  useEffect(() => {
    if (index === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [index, onClose, onPrev, onNext]);

  // Prevent body scroll when open
  useEffect(() => {
    if (index !== null) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [index]);

  if (!image || index === null) return null;

  return (
    <div
      className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Main image */}
      <div
        className="relative w-full max-w-5xl mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-amber-400 transition z-10"
          aria-label="Close"
        >
          <IconX size={32} />
        </button>

        {/* Image */}
        <div className="relative w-full h-72 sm:h-[60vh] md:h-[70vh] rounded-2xl overflow-hidden">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="100vw"
            className="object-contain"
            priority
          />
        </div>

        {/* Caption */}
        <div className="mt-4 text-center px-4">
          <span className="inline-block px-3 py-1 bg-amber-400 text-[#0B1F3A] text-xs font-bold rounded-full mb-2">
            {image.category}
          </span>
          <h3 className="text-white text-lg font-bold">{image.alt}</h3>
          {image.caption && (
            <p className="text-[#8ba7c7] text-sm mt-1">{image.caption}</p>
          )}
          <p className="text-gray-500 text-xs mt-2">
            {index + 1} / {images.length}
          </p>
        </div>

        {/* Prev / Next */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); onPrev(); }}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 w-11 h-11 rounded-full bg-white/10 hover:bg-amber-400 text-white hover:text-[#0B1F3A] flex items-center justify-center transition"
              aria-label="Previous"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onNext(); }}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 w-11 h-11 rounded-full bg-white/10 hover:bg-amber-400 text-white hover:text-[#0B1F3A] flex items-center justify-center transition"
              aria-label="Next"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export function GalleryClient({ images }: { images: GalleryImage[] }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = [
    "All",
    ...Array.from(new Set(images.map((i) => i.category))).sort(),
  ];

  const filtered =
    activeCategory === "All"
      ? images
      : images.filter((img) => img.category === activeCategory);

  // Open lightbox for a specific image within the current filtered set
  const openLightbox = useCallback((filteredIndex: number) => {
    setLightboxIndex(filteredIndex);
  }, []);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const goPrev = useCallback(() => {
    setLightboxIndex((i) =>
      i === null ? null : (i - 1 + filtered.length) % filtered.length
    );
  }, [filtered.length]);

  const goNext = useCallback(() => {
    setLightboxIndex((i) =>
      i === null ? null : (i + 1) % filtered.length
    );
  }, [filtered.length]);

  // When user clicks image in "All" view — switch to that category then open lightbox
  function handleAllViewClick(image: GalleryImage, globalIndex: number) {
    if (activeCategory === "All") {
      // Switch to category first, then open lightbox for that image
      setActiveCategory(image.category);
      // After switching category, find the index of this image in the new filtered set
      const categoryImages = images.filter((img) => img.category === image.category);
      const idxInCategory = categoryImages.findIndex((img) => img.id === image.id);
      setLightboxIndex(idxInCategory >= 0 ? idxInCategory : 0);
    } else {
      openLightbox(globalIndex);
    }
  }

  return (
    <main className="bg-white">
      <Header />

      {/* Hero */}
      <section className="pt-24 pb-16 bg-[#0B1F3A] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-8 text-[#8ba7c7] text-sm">
            <Link href="/" className="hover:text-amber-400 transition">Home</Link>
            <IconChevronRight size={14} />
            <span className="text-amber-400 font-semibold">Gallery</span>
          </div>
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-400 mb-4">
            Campus Life
          </p>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">Photo Gallery</h1>
          <p className="text-xl text-[#8ba7c7] max-w-2xl">
            Explore campus life, events, facilities, and achievements through our comprehensive photo collection.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-6 bg-white border-b border-[#eae6de] sticky top-[100px] z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setLightboxIndex(null);
                }}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
                  activeCategory === cat
                    ? "bg-[#0B1F3A] text-white shadow"
                    : "bg-[#f7f5f0] text-[#374151] hover:bg-[#eae6de]"
                }`}
              >
                {cat}
                {cat !== "All" && (
                  <span className="ml-1.5 opacity-60 text-xs">
                    ({images.filter((i) => i.category === cat).length})
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">

          {/* Context label when in a category */}
          {activeCategory !== "All" && (
            <div className="flex items-center gap-3 mb-8">
              <button
                onClick={() => setActiveCategory("All")}
                className="text-amber-600 hover:text-amber-700 text-sm font-semibold flex items-center gap-1 transition"
              >
                ← All Photos
              </button>
              <span className="text-gray-300">/</span>
              <span className="text-[#0B1F3A] font-bold">{activeCategory}</span>
            </div>
          )}

          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-5xl mb-4">🖼️</p>
              <h3 className="text-xl font-bold text-[#0B1F3A]">No photos in this category</h3>
            </div>
          ) : activeCategory === "All" ? (
            /* ── ALL VIEW — always-visible labels, click → category view ── */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((image, i) => (
                <div
                  key={image.id}
                  onClick={() => handleAllViewClick(image, i)}
                  className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition cursor-pointer h-80"
                  style={{ background: gradients[i % gradients.length] }}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition duration-500"
                  />
                  {/* Always-visible gradient + label */}
                  <div className="absolute inset-0 bg-linear-to-t from-[#0B1F3A]/80 via-transparent to-transparent flex items-end">
                    <div className="p-5 w-full">
                      <div className="text-amber-400 text-xs font-semibold mb-1 uppercase tracking-wider flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
                        {image.category}
                      </div>
                      <h3 className="text-white text-base font-bold leading-snug">{image.alt}</h3>
                      {/* "View all" hint on hover */}
                      <p className="text-[#8ba7c7] text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1">
                        View all {image.category} photos
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* ── CATEGORY VIEW — lightbox on click ── */
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filtered.map((image, i) => (
                  <div
                    key={image.id}
                    onClick={() => openLightbox(i)}
                    className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition cursor-pointer h-80"
                    style={{ background: gradients[i % gradients.length] }}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-110 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#0B1F3A]/80 via-transparent to-transparent flex items-end">
                      <div className="p-5 w-full">
                        <h3 className="text-white text-base font-bold leading-snug">{image.alt}</h3>
                        {image.caption && (
                          <p className="text-[#8ba7c7] text-xs mt-1 line-clamp-1">{image.caption}</p>
                        )}
                        <p className="text-amber-400 text-xs mt-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                          Click to enlarge
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                          </svg>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-center text-sm text-[#6b7280] mt-10">
                {filtered.length} photo{filtered.length !== 1 ? "s" : ""} in {activeCategory}
              </p>
            </>
          )}

          {activeCategory === "All" && (
            <p className="text-center text-sm text-[#6b7280] mt-10">
              {images.length} photos across {categories.length - 1} categories · Click any photo to browse that category
            </p>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#f7f5f0]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-[#0B1F3A] mb-6">Schedule a Campus Tour</h2>
          <p className="text-[#374151] text-lg mb-10">
            Experience the excellence of KMC Lalitpur firsthand with a guided campus tour.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#0B1F3A] text-white font-bold rounded-xl hover:bg-[#162d54] hover:shadow-xl transition"
          >
            Contact Us
            <IconChevronRight size={20} />
          </Link>
        </div>
      </section>

      <Lightbox
        images={filtered}
        index={lightboxIndex}
        onClose={closeLightbox}
        onPrev={goPrev}
        onNext={goNext}
      />
      <Footer />
    </main>
  );
}
