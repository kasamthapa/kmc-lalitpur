import Link from "next/link";
import { prisma } from "@/app/lib/prisma";

export const revalidate = 30;

async function getStats() {
  const [
    totalNews,
    totalEnquiries,
    unreadEnquiries,
    activeNotices,
    totalFaculty,
    totalAlumni,
    pendingAlumni,
    recent,
  ] = await Promise.all([
    prisma.news.count(),
    prisma.enquiry.count(),
    prisma.enquiry.count({ where: { read: false } }),
    prisma.notice.count({ where: { active: true } }),
    prisma.faculty.count({ where: { active: true } }),
    prisma.alumni.count(),
    prisma.alumni.count({ where: { approved: false } }),
    prisma.enquiry.findMany({
      orderBy: { createdAt: "desc" },
      take: 6,
      select: { id: true, name: true, email: true, stream: true, createdAt: true, read: true },
    }),
  ]);
  return { totalNews, totalEnquiries, unreadEnquiries, activeNotices, totalFaculty, totalAlumni, pendingAlumni, recent };
}

export default async function DashboardPage() {
  const { totalNews, totalEnquiries, unreadEnquiries, activeNotices, totalFaculty, totalAlumni, pendingAlumni, recent } =
    await getStats();

  const stats = [
    {
      label: "News Articles",
      value: totalNews,
      href: "/admin/news",
      color: "text-blue-400",
      bg: "bg-blue-400/10",
      icon: (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/>
          <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
        </svg>
      ),
    },
    {
      label: "Unread Enquiries",
      value: unreadEnquiries,
      sub: `${totalEnquiries} total`,
      href: "/admin/enquiries",
      color: unreadEnquiries > 0 ? "text-amber-400" : "text-green-400",
      bg: unreadEnquiries > 0 ? "bg-amber-400/10" : "bg-green-400/10",
      icon: (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
        </svg>
      ),
    },
    {
      label: "Active Notices",
      value: activeNotices,
      href: "/admin/notices",
      color: "text-purple-400",
      bg: "bg-purple-400/10",
      icon: (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/>
        </svg>
      ),
    },
    {
      label: "Faculty Members",
      value: totalFaculty,
      sub: "active",
      href: "/admin/faculty",
      color: "text-teal-400",
      bg: "bg-teal-400/10",
      icon: (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
        </svg>
      ),
    },
    {
      label: "Alumni Profiles",
      value: totalAlumni,
      sub: pendingAlumni > 0 ? `${pendingAlumni} pending review` : "all approved",
      href: "/admin/alumni",
      color: pendingAlumni > 0 ? "text-orange-400" : "text-indigo-400",
      bg: pendingAlumni > 0 ? "bg-orange-400/10" : "bg-indigo-400/10",
      icon: (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
        </svg>
      ),
    },
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-7">
        <h1 className="text-white text-xl font-bold">Dashboard</h1>
        <p className="text-gray-600 text-sm mt-0.5">Site content overview</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-7">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="bg-gray-900 hover:bg-gray-800 border border-white/[0.06] hover:border-white/[0.1] rounded-xl p-4 transition-all cursor-pointer"
          >
            <div className={`w-8 h-8 rounded-lg ${s.bg} flex items-center justify-center mb-3 ${s.color}`}>
              {s.icon}
            </div>
            <p className="text-2xl font-bold text-white tabular-nums">{s.value}</p>
            <p className="text-gray-400 text-xs mt-0.5 font-medium leading-snug">{s.label}</p>
            {s.sub && <p className="text-gray-600 text-[10px] mt-0.5">{s.sub}</p>}
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Recent enquiries */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Recent Enquiries</h2>
            <Link href="/admin/enquiries" className="text-amber-400 hover:text-amber-300 text-xs font-medium transition-colors">
              View all →
            </Link>
          </div>
          <div className="bg-gray-900 border border-white/[0.06] rounded-xl overflow-hidden">
            {recent.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10">
                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center mb-3">
                  <svg width="18" height="18" className="text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
                  </svg>
                </div>
                <p className="text-gray-600 text-sm">No enquiries yet</p>
              </div>
            ) : (
              <div className="divide-y divide-white/[0.04]">
                {recent.map((enq) => (
                  <div key={enq.id} className="flex items-center gap-3 px-4 py-3 hover:bg-white/[0.02] transition-colors">
                    <div className="w-7 h-7 rounded-full bg-gray-800 flex items-center justify-center shrink-0 text-[11px] font-bold text-gray-500">
                      {enq.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <p className="text-white text-sm font-medium truncate">{enq.name}</p>
                        {!enq.read && <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-amber-400" />}
                      </div>
                      <p className="text-gray-600 text-xs truncate">{enq.email}</p>
                    </div>
                    <div className="text-right shrink-0">
                      {enq.stream && <p className="text-gray-500 text-xs">{enq.stream}</p>}
                      <p className="text-gray-700 text-[10px]">
                        {new Date(enq.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short" })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick actions */}
        <div>
          <h2 className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-3">Quick Actions</h2>
          <div className="space-y-1.5">
            {[
              { label: "+ Add News Article", href: "/admin/news", primary: true, badge: null },
              { label: "+ Add Notice", href: "/admin/notices", primary: false, badge: null },
              { label: "+ Add Faculty Member", href: "/admin/faculty", primary: false, badge: null },
              { label: "Review Alumni", href: "/admin/alumni", primary: false, badge: pendingAlumni > 0 ? pendingAlumni : null },
              { label: "View Enquiries", href: "/admin/enquiries", primary: false, badge: unreadEnquiries > 0 ? unreadEnquiries : null },
            ].map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                  action.primary
                    ? "bg-amber-400 hover:bg-amber-300 text-gray-900"
                    : "bg-gray-900 hover:bg-gray-800 border border-white/[0.06] text-gray-300 hover:text-white"
                }`}
              >
                <span>{action.label}</span>
                {action.badge != null && (
                  <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center leading-none">
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
