import Link from "next/link";
import { prisma } from "@/app/lib/prisma";

export const revalidate = 30;

async function getStats() {
  const [
    [totalNews, totalBlog, totalEnquiries, unreadEnquiries, activeNotices],
    [totalFaculty, totalAlumni, pendingAlumni, totalGallery, recent],
  ] = await Promise.all([
    Promise.all([
      prisma.news.count(),
      prisma.blogPost.count(),
      prisma.enquiry.count(),
      prisma.enquiry.count({ where: { read: false } }),
      prisma.notice.count({ where: { active: true } }),
    ]),
    Promise.all([
      prisma.faculty.count({ where: { active: true } }),
      prisma.alumni.count(),
      prisma.alumni.count({ where: { approved: false } }),
      prisma.gallery.count(),
      prisma.enquiry.findMany({
        orderBy: { createdAt: "desc" },
        take: 8,
        select: {
          id: true,
          name: true,
          email: true,
          stream: true,
          subject: true,
          createdAt: true,
          read: true,
          responded: true,
        },
      }),
    ]),
  ]);
  return {
    totalNews, totalBlog, totalEnquiries, unreadEnquiries,
    activeNotices, totalFaculty, totalAlumni, pendingAlumni,
    totalGallery, recent,
  };
}

function formatDate(d: Date) {
  return d.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function DashboardPage() {
  const {
    totalNews, totalBlog, totalEnquiries, unreadEnquiries,
    activeNotices, totalFaculty, totalAlumni, pendingAlumni,
    totalGallery, recent,
  } = await getStats();

  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  const stats = [
    {
      label: "Unread Enquiries",
      value: unreadEnquiries,
      sub: `${totalEnquiries} total`,
      href: "/admin/enquiries",
      accent: unreadEnquiries > 0 ? "text-amber-400" : "text-green-400",
      bg: unreadEnquiries > 0 ? "bg-amber-400/10" : "bg-green-400/10",
      dot: unreadEnquiries > 0,
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        </svg>
      ),
    },
    {
      label: "Active Notices",
      value: activeNotices,
      sub: "on marquee",
      href: "/admin/notices",
      accent: "text-violet-400",
      bg: "bg-violet-400/10",
      dot: false,
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 01-3.46 0" />
        </svg>
      ),
    },
    {
      label: "News Articles",
      value: totalNews,
      sub: `${totalBlog} blog posts`,
      href: "/admin/news",
      accent: "text-blue-400",
      bg: "bg-blue-400/10",
      dot: false,
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      ),
    },
    {
      label: "Faculty Members",
      value: totalFaculty,
      sub: "active profiles",
      href: "/admin/faculty",
      accent: "text-teal-400",
      bg: "bg-teal-400/10",
      dot: false,
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 00-3-3.87" />
          <path d="M16 3.13a4 4 0 010 7.75" />
        </svg>
      ),
    },
    {
      label: "Alumni",
      value: totalAlumni,
      sub: pendingAlumni > 0 ? `${pendingAlumni} pending` : "all approved",
      href: "/admin/alumni",
      accent: pendingAlumni > 0 ? "text-orange-400" : "text-indigo-400",
      bg: pendingAlumni > 0 ? "bg-orange-400/10" : "bg-indigo-400/10",
      dot: pendingAlumni > 0,
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
      ),
    },
    {
      label: "Gallery Images",
      value: totalGallery,
      sub: "in photo library",
      href: "/admin/gallery",
      accent: "text-pink-400",
      bg: "bg-pink-400/10",
      dot: false,
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
      ),
    },
  ];

  // Items that need attention
  const alerts: { text: string; href: string }[] = [];
  if (unreadEnquiries > 0) alerts.push({ text: `${unreadEnquiries} unread enquir${unreadEnquiries > 1 ? "ies" : "y"} waiting`, href: "/admin/enquiries" });
  if (pendingAlumni > 0) alerts.push({ text: `${pendingAlumni} alumni profile${pendingAlumni > 1 ? "s" : ""} pending approval`, href: "/admin/alumni" });
  if (activeNotices === 0) alerts.push({ text: "No active notices on the homepage marquee", href: "/admin/notices" });

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="text-gray-600 text-xs font-semibold uppercase tracking-widest mb-1">
            {formatDate(now)}
          </p>
          <h1 className="text-white text-2xl font-bold">{greeting} 👋</h1>
          <p className="text-gray-500 text-sm mt-1">Here&apos;s what&apos;s happening on the KMC website.</p>
        </div>
        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.07] text-gray-400 hover:text-white text-xs font-semibold rounded-xl transition-all"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
          View live site
        </Link>
      </div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <div className="bg-amber-400/[0.06] border border-amber-400/20 rounded-2xl px-4 py-3 mb-6 flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-5 h-5 rounded-full bg-amber-400/20 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            </div>
            <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">Needs attention</span>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {alerts.map((a) => (
              <Link key={a.href} href={a.href} className="text-amber-300 hover:text-amber-200 text-xs font-medium transition-colors underline-offset-2 hover:underline">
                {a.text}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-7">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="group bg-gray-900 hover:bg-gray-800/80 border border-white/[0.06] hover:border-white/[0.1] rounded-xl p-4 transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-7 h-7 rounded-lg ${s.bg} flex items-center justify-center ${s.accent}`}>
                {s.icon}
              </div>
              {s.dot && <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />}
            </div>
            <p className="text-2xl font-bold text-white tabular-nums leading-none mb-1">{s.value}</p>
            <p className="text-gray-400 text-[11px] font-semibold leading-snug">{s.label}</p>
            {s.sub && <p className="text-gray-700 text-[10px] mt-0.5">{s.sub}</p>}
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Recent enquiries */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Recent Enquiries</h2>
            <Link href="/admin/enquiries" className="text-amber-400 hover:text-amber-300 text-xs font-semibold transition-colors">
              View all →
            </Link>
          </div>
          <div className="bg-gray-900 border border-white/[0.06] rounded-2xl overflow-hidden">
            {recent.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-11 h-11 rounded-full bg-gray-800 flex items-center justify-center mb-3">
                  <svg width="18" height="18" className="text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                  </svg>
                </div>
                <p className="text-gray-600 text-sm font-medium">No enquiries yet</p>
                <p className="text-gray-700 text-xs mt-0.5">Contact form submissions will appear here</p>
              </div>
            ) : (
              <div className="divide-y divide-white/[0.04]">
                {recent.map((enq) => (
                  <Link
                    key={enq.id}
                    href="/admin/enquiries"
                    className={`flex items-center gap-3 px-4 py-3 hover:bg-white/[0.02] transition-colors group ${!enq.read ? "bg-amber-400/[0.025]" : ""}`}
                  >
                    <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center shrink-0 text-xs font-bold text-gray-400 group-hover:bg-gray-700 transition-colors">
                      {enq.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <p className="text-white text-sm font-medium truncate">{enq.name}</p>
                        {!enq.read && (
                          <span className="shrink-0 text-[9px] bg-amber-400 text-gray-900 font-bold px-1.5 py-0.5 rounded-full leading-none">
                            NEW
                          </span>
                        )}
                        {enq.responded && (
                          <span className="shrink-0 text-[9px] bg-blue-500/20 text-blue-400 border border-blue-500/20 font-semibold px-1.5 py-0.5 rounded-full leading-none">
                            Done
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 text-xs truncate">{enq.subject ?? enq.email}</p>
                    </div>
                    <div className="text-right shrink-0">
                      {enq.stream && (
                        <span className="text-[10px] bg-white/[0.05] text-gray-500 px-1.5 py-0.5 rounded-full">
                          {enq.stream}
                        </span>
                      )}
                      <p className="text-gray-700 text-[10px] mt-0.5">
                        {new Date(enq.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short" })}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick actions */}
        <div>
          <h2 className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-3">Quick Actions</h2>
          <div className="space-y-2">
            {[
              {
                label: "New News Article",
                desc: "Publish a school update",
                href: "/admin/news",
                primary: true,
                badge: null,
                icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
              },
              {
                label: "Add Notice",
                desc: "Homepage marquee",
                href: "/admin/notices",
                primary: false,
                badge: null,
                icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>,
              },
              {
                label: "Add Faculty",
                desc: "Staff profiles",
                href: "/admin/faculty",
                primary: false,
                badge: null,
                icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>,
              },
              {
                label: "Review Alumni",
                desc: pendingAlumni > 0 ? `${pendingAlumni} awaiting approval` : "All up to date",
                href: "/admin/alumni",
                primary: false,
                badge: pendingAlumni > 0 ? pendingAlumni : null,
                icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>,
              },
              {
                label: "View Enquiries",
                desc: unreadEnquiries > 0 ? `${unreadEnquiries} unread` : "All caught up",
                href: "/admin/enquiries",
                primary: false,
                badge: unreadEnquiries > 0 ? unreadEnquiries : null,
                icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
              },
            ].map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className={`flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all group ${
                  action.primary
                    ? "bg-amber-400 hover:bg-amber-300 text-gray-900"
                    : "bg-gray-900 hover:bg-gray-800/80 border border-white/[0.06] hover:border-white/[0.1] text-gray-300 hover:text-white"
                }`}
              >
                <div className={`shrink-0 ${action.primary ? "text-gray-900" : "text-gray-500 group-hover:text-gray-300"} transition-colors`}>
                  {action.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold leading-none">{action.label}</p>
                  <p className={`text-[10px] mt-0.5 truncate ${action.primary ? "text-gray-700" : "text-gray-600"}`}>
                    {action.desc}
                  </p>
                </div>
                {action.badge != null && (
                  <span className="shrink-0 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center leading-tight">
                    {action.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
