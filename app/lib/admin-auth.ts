import { auth } from "@/auth";
import { apiUnauthorized, apiError } from "@/app/lib/api-response";

export async function requireAdminAuth(requiredRole?: string) {
  const session = await auth();
  if (!session?.user) {
    return { session: null, response: apiUnauthorized() };
  }
  if (requiredRole && (session.user as { role?: string }).role !== requiredRole) {
    return { session, response: apiError("Insufficient permissions.", {}, 403) };
  }
  return { session, response: null };
}
