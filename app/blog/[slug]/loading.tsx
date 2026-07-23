import { Header } from "@/app/components/header";

export default function BlogPostLoading() {
  return (
    <main className="bg-white">
      <Header />

      {/* Hero */}
      <section className="pt-28 pb-0 bg-[#1B3E72]">
        <div className="max-w-4xl mx-auto px-4 space-y-4 pb-10">
          <div className="flex gap-2">
            <div className="h-3 bg-white/10 rounded animate-pulse w-10" />
            <div className="h-3 bg-white/10 rounded animate-pulse w-3" />
            <div className="h-3 bg-white/10 rounded animate-pulse w-10" />
          </div>
          <div className="h-6 bg-amber-400/30 rounded-full animate-pulse w-24" />
          <div className="h-10 bg-white/10 rounded animate-pulse w-full" />
          <div className="h-10 bg-white/10 rounded animate-pulse w-4/5" />
          <div className="flex gap-4">
            <div className="h-3 bg-white/10 rounded animate-pulse w-24" />
            <div className="h-3 bg-white/10 rounded animate-pulse w-16" />
          </div>
        </div>
        {/* Cover image placeholder */}
        <div className="max-w-5xl mx-auto px-4">
          <div className="w-full h-72 md:h-[440px] rounded-t-2xl bg-white/5 animate-pulse" />
        </div>
      </section>

      {/* Article body */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 space-y-4">
          <div className="border-l-4 border-amber-400 pl-6 space-y-2">
            <div className="h-5 bg-gray-100 rounded animate-pulse w-full" />
            <div className="h-5 bg-gray-100 rounded animate-pulse w-5/6" />
            <div className="h-5 bg-gray-100 rounded animate-pulse w-3/4" />
          </div>
          <div className="pt-6 space-y-3">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="h-4 bg-gray-100 rounded animate-pulse"
                style={{ width: `${85 + Math.sin(i) * 15}%`, animationDelay: `${i * 40}ms` }}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
