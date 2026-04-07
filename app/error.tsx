"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center px-4">
        <p className="text-8xl font-bold text-[#0B1F3A] mb-4">500</p>
        <h1 className="text-2xl font-bold text-[#0B1F3A] mb-3">
          Something went wrong
        </h1>
        <p className="text-slate-500 mb-8 max-w-md mx-auto">
          An unexpected error occurred. Please try again or contact us if the
          problem persists.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-[#C9A84C] text-[#0B1F3A] font-bold rounded-xl hover:bg-[#d4b560] transition-colors"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-6 py-3 border border-[#0B1F3A]/20 text-[#0B1F3A] font-bold rounded-xl hover:bg-[#f7f5f0] transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    </main>
  );
}
