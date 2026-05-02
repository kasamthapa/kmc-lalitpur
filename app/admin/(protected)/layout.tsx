import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Sidebar } from "@/app/admin/_components/Sidebar";
import { SessionWrapper } from "@/app/admin/_components/SessionWrapper";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  return (
    <SessionWrapper>
      {/* Mobile block — shown on small screens even if UA check was bypassed */}
      <div className="lg:hidden fixed inset-0 z-[9999] bg-gray-950 flex items-center justify-center p-6">
        <div className="bg-gray-900 border border-white/[0.07] rounded-2xl p-10 text-center max-w-sm w-full">
          <div className="w-14 h-14 rounded-2xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center mx-auto mb-5">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
            </svg>
          </div>
          <h2 className="text-white font-bold text-lg mb-2">Desktop Only</h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            The KMC admin panel is only accessible from a desktop or laptop computer for security reasons.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 bg-amber-400/8 border border-amber-400/15 rounded-full px-4 py-2 text-amber-400 text-xs font-semibold">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            Access restricted
          </div>
        </div>
      </div>

      {/* Desktop layout */}
      <div className="flex min-h-screen bg-gray-950">
        <Sidebar userName={session.user.name ?? session.user.email ?? "Admin"} />
        <main className="flex-1 min-w-0 overflow-auto">{children}</main>
      </div>
    </SessionWrapper>
  );
}
