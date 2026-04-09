import { Spinner } from "@/app/components/page-skeleton";

// The admin layout (Sidebar) is already rendered by layout.tsx.
// This loading.tsx only covers the main content area on the right.

export default function AdminLoading() {
  return (
    <div className="flex-1 flex items-center justify-center min-h-screen bg-gray-900">
      <div className="flex flex-col items-center gap-4">
        <div className="text-amber-400">
          <Spinner size={36} />
        </div>
        <p className="text-gray-500 text-sm">Loading…</p>
      </div>
    </div>
  );
}
