import { Header } from "../components/header";
import { SkeletonFeatured, SkeletonCard } from "../components/page-skeleton";

export default function NewsLoading() {
  return (
    <main className="bg-white">
      <Header />

      {/* Hero — real colors, skeleton text */}
      <section className="pt-28 pb-16 bg-[#101F46]">
        <div className="max-w-7xl mx-auto px-4 space-y-4">
          <div className="h-3 bg-white/10 rounded animate-pulse w-32" />
          <div className="h-10 bg-white/10 rounded animate-pulse w-72 md:w-96" />
          <div className="h-5 bg-white/10 rounded animate-pulse w-64 md:w-80" />
        </div>
      </section>

      {/* Notice board placeholder */}
      <section className="py-12 bg-amber-50 border-y border-amber-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-5 bg-amber-200 rounded animate-pulse w-36 mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-20 bg-white rounded-xl border border-amber-100 animate-pulse" />
            ))}
          </div>
        </div>
      </section>

      {/* Filter bar */}
      <div className="py-8 bg-white border-b border-[#eae6de]">
        <div className="max-w-7xl mx-auto px-4 flex gap-3 flex-wrap">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-9 w-20 bg-gray-100 rounded-full animate-pulse" />
          ))}
        </div>
      </div>

      {/* Featured skeleton */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-6 bg-gray-200 rounded animate-pulse w-40 mb-8" />
          <SkeletonFeatured />
        </div>
      </section>

      {/* Grid skeleton */}
      <section className="py-16 bg-[#f7f5f0]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-6 bg-gray-200 rounded animate-pulse w-32 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
