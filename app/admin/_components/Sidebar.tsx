"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useState } from "react";

const NAV_GROUPS = [
  {
    label: "Content",
    items: [
      {
        label: "Dashboard",
        href: "/admin",
        icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/></svg>,
      },
      {
        label: "News",
        href: "/admin/news",
        icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
      },
      {
        label: "Blog",
        href: "/admin/blog",
        icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>,
      },
      {
        label: "Gallery",
        href: "/admin/gallery",
        icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>,
      },
      {
        label: "Notices",
        href: "/admin/notices",
        icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>,
      },
      {
        label: "Popups",
        href: "/admin/popups",
        icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="14" rx="2"/><path d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25"/></svg>,
      },
    ],
  },
  {
    label: "People",
    items: [
      {
        label: "Faculty",
        href: "/admin/faculty",
        icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
      },
      {
        label: "Alumni",
        href: "/admin/alumni",
        icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>,
      },
      {
        label: "Enquiries",
        href: "/admin/enquiries",
        icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
      },
      {
        label: "Job Applications",
        href: "/admin/careers",
        icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></svg>,
      },
      {
        label: "Vacancies",
        href: "/admin/vacancies",
        icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>,
      },
    ],
  },
  {
    label: "System",
    items: [
      {
        label: "Settings",
        href: "/admin/settings",
        icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>,
      },
    ],
  },
];

function NavContent({ userName, pathname, onClose }: { userName: string; pathname: string; onClose: () => void }) {
  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <div className="flex flex-col h-full">
      {/* Brand */}
      <div className="px-4 py-4 border-b border-white/[0.06] shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-amber-400 flex items-center justify-center shrink-0">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
            </svg>
          </div>
          <div>
            <p className="text-white font-bold text-[13px] leading-none">KMC Admin</p>
            <p className="text-gray-600 text-[10px] mt-0.5">Content Management</p>
          </div>
        </div>
      </div>

      {/* User */}
      <div className="px-4 py-3 border-b border-white/[0.06] shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-linear-to-br from-amber-400 to-amber-500 flex items-center justify-center font-bold text-gray-900 text-[11px] shrink-0">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="text-gray-200 font-semibold text-xs truncate leading-none">{userName}</p>
            <p className="text-gray-600 text-[10px] mt-0.5">Administrator</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-2.5 py-3 space-y-4">
        {NAV_GROUPS.map((group) => (
          <div key={group.label}>
            <p className="text-[9px] font-bold text-gray-700 uppercase tracking-[0.14em] px-2 mb-1">
              {group.label}
            </p>
            <div className="space-y-px">
              {group.items.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={`flex items-center gap-2.5 px-2 py-2 rounded-md text-[12.5px] font-medium transition-all duration-100 border-l-2 ${
                      active
                        ? "border-amber-400 bg-amber-400/[0.12] text-amber-300 pl-[6px]"
                        : "border-transparent text-gray-500 hover:bg-white/[0.04] hover:text-gray-300 pl-[6px]"
                    }`}
                  >
                    <span className={active ? "text-amber-400" : "text-gray-600"}>
                      {item.icon}
                    </span>
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer actions */}
      <div className="px-2.5 py-3 border-t border-white/[0.06] shrink-0 space-y-px">
        <Link
          href="/"
          target="_blank"
          onClick={onClose}
          className="flex items-center gap-2.5 px-2 py-2 rounded-md text-[12.5px] text-gray-500 hover:bg-white/[0.04] hover:text-gray-300 transition-all pl-[6px] border-l-2 border-transparent"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
          View Site
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="w-full flex items-center gap-2.5 px-2 py-2 rounded-md text-[12.5px] text-gray-500 hover:bg-red-500/[0.08] hover:text-red-400 transition-all pl-[6px] border-l-2 border-transparent"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          Sign Out
        </button>
      </div>
    </div>
  );
}

export function Sidebar({ userName }: { userName: string }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-56 bg-gray-950 shrink-0 h-screen sticky top-0 border-r border-white/[0.05]">
        <NavContent userName={userName} pathname={pathname} onClose={() => {}} />
      </aside>

      {/* Mobile top bar */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-gray-950 border-b border-white/[0.06] sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-amber-400 flex items-center justify-center">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
            </svg>
          </div>
          <p className="text-white font-bold text-sm">KMC Admin</p>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-gray-400 hover:text-white transition p-1"
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          )}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div className="w-56 bg-gray-950 flex flex-col border-r border-white/[0.06]">
            <NavContent userName={userName} pathname={pathname} onClose={() => setMobileOpen(false)} />
          </div>
          <div className="flex-1 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
        </div>
      )}
    </>
  );
}
