import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { AdminViewportGate } from "@/app/admin/_components/AdminViewportGate";
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
      <AdminViewportGate userName={session.user.name ?? session.user.email ?? "Admin"}>
        {children}
      </AdminViewportGate>
    </SessionWrapper>
  );
}
