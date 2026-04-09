// Shared skeleton primitives for public-page loading states.
// All loading.tsx files import from here — keeps the pulse animation consistent.

export function SkeletonBlock({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`bg-white/10 rounded-lg animate-pulse ${className}`}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl overflow-hidden border border-[#eae6de]">
      <div className="h-48 bg-gray-200 animate-pulse" />
      <div className="p-5 space-y-3">
        <div className="h-3 bg-gray-200 rounded animate-pulse w-1/3" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
        <div className="h-3 bg-gray-200 rounded animate-pulse w-1/4 mt-4" />
      </div>
    </div>
  );
}

export function SkeletonFeatured() {
  return (
    <div className="rounded-2xl overflow-hidden border border-[#eae6de] shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="h-80 bg-gray-200 animate-pulse" />
        <div className="p-8 md:p-12 space-y-4">
          <div className="h-3 bg-gray-200 rounded animate-pulse w-1/4" />
          <div className="h-7 bg-gray-200 rounded animate-pulse w-full" />
          <div className="h-7 bg-gray-200 rounded animate-pulse w-5/6" />
          <div className="space-y-2 pt-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
          </div>
        </div>
      </div>
    </div>
  );
}

// KMC amber spinner — 32px, used on admin pages
export function Spinner({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className="animate-spin"
      aria-label="Loading"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeOpacity="0.2"
      />
      <path
        d="M12 2a10 10 0 0 1 10 10"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
