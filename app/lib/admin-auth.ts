import { auth } from "@/auth";
import { apiUnauthorized } from "@/app/lib/api-response";

export async function requireAdminAuth() {
  const session = await auth();
  if (!session?.user) {
    return { session: null, response: apiUnauthorized() };
  }
  return { session, response: null };
}
