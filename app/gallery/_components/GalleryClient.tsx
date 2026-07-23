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
  const [broken, setBroken] = useState(false);
  useEffect(() => setBroken(false), [image?.id]);

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
      className="fixed inset-0 bg-black/97 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute -top-11 right-0 text-white/60 hover:text-white transition z-10"
          aria-label="Close"
        >
          <IconX size={28} />
        </button>

        {/* Image */}
        <div
          className="relative w-full h-72 sm:h-[60vh] md:h-[72vh] overflow-hidden flex items-center justify-center"
          style={broken ? { background: gradients[index % gradients.length] } : undefined}
        >
          {broken ? (
            <span className="text-white/50 text-sm">Image unavailable</span>
          ) : (
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="100vw"
              className="object-contain"
              priority
              onError={() => setBroken(true)}
            />
          )}
        </div>

        {/* Caption — minimal */}
        <div className="mt-5 flex items-center justify-between px-1">
          <div>
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest">{image.category}</span>
            <h3 className="text-white text-base font-semibold mt-0.5">{image.alt}</h3>
            {image.caption && (
              <p className="text-white/40 text-sm mt-1">{image.caption}</p>
            )}
          </div>
          <span className="text-white/30 text-sm tabular-nums">{index + 1}/{images.length}</span>
        </div>

        {/* Prev / Next */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); onPrev(); }}
              className="absolute left-0 top-[40%] -translate-y-1/2 -translate-x-16 w-10 h-10 flex items-center justify-center text-white/50 hover:text-white border border-white/10 hover:border-white/30 transition"
              aria-label="Previous"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onNext(); }}
              className="absolute right-0 top-[40%] -translate-y-1/2 translate-x-16 w-10 h-10 flex items-center justify-center text-white/50 hover:text-white border border-white/10 hover:border-white/30 transition"
              aria-label="Next"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ── Masonry-style grid layout using CSS columns ───────────────────────────────
function MasonryGrid({
  images,
  onClickImage,
}: {
  images: GalleryImage[];
  onClickImage: (i: number) => void;
}) {
  const [broken, setBroken] = useState<Set<string>>(new Set());

  return (
    <div
      className="columns-1 sm:columns-2 lg:columns-3 gap-3"
      style={{ columnGap: "12px" }}
    >
      {images.map((image, i) => (
        <div
          key={image.id}
          onClick={() => onClickImage(i)}
          className="break-inside-avoid mb-3 relative overflow-hidden cursor-pointer group"
          style={{ background: gradients[i % gradients.length] }}
        >
          {broken.has(image.id) ? (
            <div
              className="w-full flex items-center justify-center"
              style={{ height: i % 3 === 0 ? 480 : i % 3 === 1 ? 320 : 400 }}
            >
              <span className="text-white/50 text-sm">Image unavailable</span>
            </div>
          ) : (
            <Image
              src={image.src}
              alt={image.alt}
              width={600}
              height={i % 3 === 0 ? 480 : i % 3 === 1 ? 320 : 400}
              className="w-full h-auto object-cover group-hover:scale-[1.03] transition duration-500 block"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              onError={() => setBroken((prev) => new Set(prev).add(image.id))}
            />
          )}
          {/* Hover overlay — clean, just text at bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
            <div className="p-4 w-full">
              <p className="text-white text-sm font-semibold leading-snug">{image.alt}</p>
              {image.caption && (
                <p className="text-white/60 text-xs mt-0.5 line-clamp-1">{image.caption}</p>
              )}
            </div>
          </div>
          {/* Expand icon — subtle */}
          <div className="absolute top-3 right-3 w-7 h-7 bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
            </svg>
          </div>
        </div>
      ))}
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
      setActiveCategory(image.category);
      const categoryImages = images.filter((img) => img.category === image.category);
      const idxInCategory = categoryImages.findIndex((img) => img.id === image.id);
      setLightboxIndex(idxInCategory >= 0 ? idxInCategory : 0);
    } else {
      openLightbox(globalIndex);
    }
  }

  return (
    <main className="bg-[#111111]">
      <Header />

      {/* Hero — dark, photographic, minimal text */}
      <section className="pt-28 pb-14 bg-[#101F46]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-2 mb-12 text-[#8ba7c7] text-sm">
            <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <span className="text-[#8ba7c7]/40 mx-1">/</span>
            <span className="text-white/60">Gallery</span>
          </nav>
          <div className="flex items-end justify-between gap-10">
            <div>
              <div className="w-8 h-px bg-amber-400 mb-5" />
              <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight leading-[0.97]">
                Campus<br />
                <span className="text-amber-400">Gallery</span>
              </h1>
            </div>
            <p className="hidden md:block text-[#8ba7c7] text-sm max-w-xs leading-relaxed text-right">
              Life at KMC Lalitpur — captured across classrooms, events, and beyond.
            </p>
          </div>
          <p className="md:hidden text-[#8ba7c7] text-sm leading-relaxed mt-5">
            Life at KMC Lalitpur — captured across classrooms, events, and beyond.
          </p>
        </div>
      </section>

      {/* Category Filter — tab-style, dark bar */}
      <div className="bg-[#0d0d0d] border-b border-white/8 sticky top-[72px] z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-0 overflow-x-auto scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setLightboxIndex(null);
                }}
                className={`relative shrink-0 px-5 py-4 text-sm font-semibold transition-colors border-b-2 ${
                  activeCategory === cat
                    ? "border-amber-400 text-white"
                    : "border-transparent text-white/40 hover:text-white/70"
                }`}
              >
                {cat}
                {cat !== "All" && (
                  <span className="ml-1.5 opacity-40 text-xs">
                    {images.filter((i) => i.category === cat).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery — masonry */}
      <section className="py-8 bg-[#111111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          {/* Breadcrumb when in category */}
          {activeCategory !== "All" && (
            <div className="flex items-center gap-3 mb-7">
              <button
                onClick={() => setActiveCategory("All")}
                className="text-white/40 hover:text-white text-xs font-semibold transition"
              >
                ← All
              </button>
              <span className="text-white/20">/</span>
              <span className="text-amber-400 text-xs font-semibold">{activeCategory}</span>
              <span className="ml-auto text-white/30 text-xs">{filtered.length} photo{filtered.length !== 1 ? "s" : ""}</span>
            </div>
          )}

          {filtered.length === 0 ? (
            <div className="text-center py-32">
              <h3 className="text-lg font-semibold text-white/40">No photos in this category</h3>
            </div>
          ) : (
            <MasonryGrid
              images={filtered}
              onClickImage={(i) => {
                if (activeCategory === "All") {
                  handleAllViewClick(filtered[i], i);
                } else {
                  openLightbox(i);
                }
              }}
            />
          )}

          {activeCategory === "All" && filtered.length > 0 && (
            <p className="text-center text-xs text-white/25 mt-10 tracking-wider uppercase">
              {images.length} photographs · {categories.length - 1} collections · click any photo to browse
            </p>
          )}
        </div>
      </section>

      {/* CTA — sparse */}
      <section className="py-20 bg-[#101F46]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div>
              <div className="w-8 h-px bg-amber-400 mb-4" />
              <h2 className="text-3xl font-bold text-white">Visit in Person</h2>
              <p className="text-[#8ba7c7] text-sm mt-2 max-w-md leading-relaxed">
                Photographs only capture so much. Schedule a guided campus tour and see KMC Lalitpur for yourself.
              </p>
            </div>
            <Link
              href="/contact"
              className="shrink-0 inline-flex items-center gap-2 px-7 py-3.5 bg-amber-400 text-[#101F46] font-bold text-sm hover:bg-amber-300 transition-colors"
            >
              Schedule a Tour
              <IconChevronRight size={16} />
            </Link>
          </div>
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
