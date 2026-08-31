"use client";

import { useIsDesktop } from "./useIsDesktop";
import { Sidebar } from "./Sidebar";

export function AdminViewportGate({
  userName,
  children,
}: {
  userName: string;
  children: React.ReactNode;
}) {
  const isDesktop = useIsDesktop();

  if (isDesktop === null) return null;

  if (!isDesktop) {
    return (
      <div className="fixed inset-0 z-[9999] bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center max-w-sm w-full shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto mb-5">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#b45309" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
            </svg>
          </div>
          <h2 className="text-gray-900 font-bold text-lg mb-2">Desktop Only</h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            The KMC admin panel is only accessible from a desktop or laptop computer for security reasons.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full px-4 py-2 text-amber-700 text-xs font-semibold">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            Access restricted
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar userName={userName} />
      <main className="flex-1 min-w-0 overflow-auto">{children}</main>
    </div>
  );
}
