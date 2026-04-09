import Link from "next/link";
import { prisma } from "@/app/lib/prisma";

async function getStats() {
  const [totalNews, totalEnquiries, unreadEnquiries, activeNotices, recent] =
    await Promise.all([
      prisma.news.count(),
      prisma.enquiry.count(),
      prisma.enquiry.count({ where: { read: false } }),
      prisma.notice.count({ where: { active: true } }),
      prisma.enquiry.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        select: {
          id: true,
          name: true,
          email: true,
          stream: true,
          createdAt: true,
          read: true,
        },
      }),
    ]);
  return { totalNews, totalEnquiries, unreadEnquiries, activeNotices, recent };
}

export default async function DashboardPage() {
  const { totalNews, totalEnquiries, unreadEnquiries, activeNotices, recent } =
    await getStats();

  const stats = [
    { label: "Total News", value: totalNews, href: "/admin/news", color: "bg-blue-500" },
    { label: "Total Enquiries", value: totalEnquiries, href: "/admin/enquiries", color: "bg-purple-500" },
    { label: "Unread Enquiries", value: unreadEnquiries, href: "/admin/enquiries", color: "bg-red-500" },
    { label: "Active Notices", value: activeNotices, href: "/admin/notices", color: "bg-green-500" },
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-white text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">Overview of your site content</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="bg-gray-800 hover:bg-gray-750 border border-gray-700 rounded-xl p-5 transition-colors group"
          >
            <div className={`w-2 h-2 rounded-full ${s.color} mb-3`} />
            <p className="text-3xl font-bold text-white">{s.value}</p>
            <p className="text-gray-400 text-sm mt-1">{s.label}</p>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="mb-8">
        <h2 className="text-gray-300 text-sm font-semibold uppercase tracking-wider mb-3">
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/news"
            className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-gray-900 text-sm font-semibold rounded-lg transition-colors"
          >
            + Add News
          </Link>
          <Link
            href="/admin/notices"
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm font-semibold rounded-lg transition-colors"
          >
            + Add Notice
          </Link>
          <Link
            href="/admin/enquiries"
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm font-semibold rounded-lg transition-colors"
          >
            View Enquiries
          </Link>
        </div>
      </div>

      {/* Recent enquiries */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-gray-300 text-sm font-semibold uppercase tracking-wider">
            Recent Enquiries
          </h2>
          <Link href="/admin/enquiries" className="text-amber-400 hover:text-amber-300 text-sm">
            View all →
          </Link>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
          {recent.length === 0 ? (
            <p className="text-gray-500 text-sm p-6">No enquiries yet.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left text-gray-400 font-medium px-4 py-3">Name</th>
                  <th className="text-left text-gray-400 font-medium px-4 py-3 hidden sm:table-cell">Email</th>
                  <th className="text-left text-gray-400 font-medium px-4 py-3 hidden md:table-cell">Stream</th>
                  <th className="text-left text-gray-400 font-medium px-4 py-3 hidden md:table-cell">Date</th>
                  <th className="text-left text-gray-400 font-medium px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((enq) => (
                  <tr key={enq.id} className="border-b border-gray-700/50 last:border-0">
                    <td className="px-4 py-3 text-white">{enq.name}</td>
                    <td className="px-4 py-3 text-gray-300 hidden sm:table-cell">{enq.email}</td>
                    <td className="px-4 py-3 text-gray-400 hidden md:table-cell">{enq.stream ?? "—"}</td>
                    <td className="px-4 py-3 text-gray-400 hidden md:table-cell">
                      {new Date(enq.createdAt).toLocaleDateString("en-GB")}
                    </td>
                    <td className="px-4 py-3">
                      {enq.read ? (
                        <span className="text-xs text-green-400">Read</span>
                      ) : (
                        <span className="text-xs text-amber-400 font-semibold">Unread</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
