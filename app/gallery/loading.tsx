import { Header } from "../components/header";

export default function GalleryLoading() {
  return (
    <main className="bg-white">
      <Header />

      {/* Hero */}
      <section className="pt-28 pb-16 bg-[#101F46]">
        <div className="max-w-7xl mx-auto px-4 space-y-4">
          <div className="h-3 bg-white/10 rounded animate-pulse w-24" />
          <div className="h-10 bg-white/10 rounded animate-pulse w-56 md:w-72" />
          <div className="h-5 bg-white/10 rounded animate-pulse w-64 md:w-96" />
        </div>
      </section>

      {/* Filter chips */}
      <div className="py-6 bg-white border-b border-[#eae6de]">
        <div className="max-w-7xl mx-auto px-4 flex gap-3 flex-wrap">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="h-9 w-24 bg-gray-100 rounded-full animate-pulse" />
          ))}
        </div>
      </div>

      {/* Photo grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="h-80 rounded-2xl bg-gray-100 animate-pulse"
                style={{ animationDelay: `${i * 60}ms` }}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
