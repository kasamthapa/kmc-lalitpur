import { Header } from "../components/header";

function BlogCardSkeleton() {
  return (
    <div className="rounded-xl overflow-hidden border border-[#eae6de]">
      <div className="h-48 bg-gray-100 animate-pulse" />
      <div className="p-5 space-y-3">
        <div className="h-3 bg-gray-100 rounded animate-pulse w-1/4" />
        <div className="h-4 bg-gray-100 rounded animate-pulse w-full" />
        <div className="h-4 bg-gray-100 rounded animate-pulse w-5/6" />
        <div className="h-3 bg-gray-100 rounded animate-pulse w-1/5 mt-2" />
      </div>
    </div>
  );
}

export default function BlogLoading() {
  return (
    <main className="bg-white">
      <Header />

      {/* Hero */}
      <section className="pt-28 pb-16 bg-[#0B1F3A]">
        <div className="max-w-7xl mx-auto px-4 space-y-4">
          <div className="h-3 bg-white/10 rounded animate-pulse w-20" />
          <div className="h-12 bg-white/10 rounded animate-pulse w-40 md:w-56" />
          <div className="h-5 bg-white/10 rounded animate-pulse w-64 md:w-80" />
        </div>
      </section>

      {/* Category bar */}
      <div className="py-6 bg-white border-b border-[#eae6de]">
        <div className="max-w-7xl mx-auto px-4 flex gap-3 flex-wrap">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="h-9 w-28 bg-gray-100 rounded-full animate-pulse" />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main */}
          <div className="flex-1 min-w-0 space-y-10">
            {/* Featured skeleton */}
            <div className="rounded-2xl overflow-hidden border border-[#eae6de] shadow-sm">
              <div className="h-72 bg-gray-100 animate-pulse" />
              <div className="p-8 space-y-4">
                <div className="h-3 bg-gray-100 rounded animate-pulse w-1/3" />
                <div className="h-7 bg-gray-100 rounded animate-pulse w-full" />
                <div className="h-7 bg-gray-100 rounded animate-pulse w-4/5" />
                <div className="space-y-2 pt-2">
                  <div className="h-4 bg-gray-100 rounded animate-pulse w-full" />
                  <div className="h-4 bg-gray-100 rounded animate-pulse w-3/4" />
                </div>
              </div>
            </div>
            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {Array.from({ length: 4 }).map((_, i) => (
                <BlogCardSkeleton key={i} />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-72 shrink-0 space-y-6">
            <div className="bg-[#f7f5f0] rounded-2xl p-6 border border-[#eae6de]">
              <div className="h-5 bg-gray-200 rounded animate-pulse w-28 mb-5" />
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-4 bg-gray-200 rounded animate-pulse mb-3 w-full" />
              ))}
            </div>
            <div className="bg-white rounded-2xl p-6 border border-[#eae6de]">
              <div className="h-5 bg-gray-200 rounded animate-pulse w-28 mb-5" />
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex gap-3 mb-4">
                  <div className="w-16 h-14 bg-gray-100 rounded-lg animate-pulse shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 bg-gray-100 rounded animate-pulse w-full" />
                    <div className="h-3 bg-gray-100 rounded animate-pulse w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
