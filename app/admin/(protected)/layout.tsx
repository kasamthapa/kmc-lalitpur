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
      <div className="flex min-h-screen bg-gray-950">
        <Sidebar userName={session.user.name ?? session.user.email ?? "Admin"} />
        <main className="flex-1 min-w-0 overflow-auto">{children}</main>
      </div>
    </SessionWrapper>
  );
}
