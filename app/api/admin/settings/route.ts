import { NextRequest } from "next/server";
import { prisma } from "@/app/lib/prisma";
import bcrypt from "bcryptjs";
import { apiSuccess, apiError, apiServerError } from "@/app/lib/api-response";
import { requireAdminAuth } from "@/app/lib/admin-auth";

export async function PATCH(req: NextRequest) {
  const { session, response } = await requireAdminAuth();
  if (response || !session) return response!;

  let body: unknown;
  try { body = await req.json(); } catch { return apiError("Invalid body."); }

  const { currentPassword, newPassword } = body as Record<string, string>;

  if (!currentPassword || !newPassword) {
    return apiError("Current and new password are required.");
  }
  if (newPassword.length < 8) {
    return apiError("New password must be at least 8 characters.");
  }

  try {
    const user = await prisma.adminUser.findUnique({
      where: { email: session.user.email! },
    });
    if (!user) return apiError("User not found.");

    const match = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!match) return apiError("Current password is incorrect.");

    const hash = await bcrypt.hash(newPassword, 12);
    await prisma.adminUser.update({
      where: { id: user.id },
      data: { passwordHash: hash },
    });

    return apiSuccess({ message: "Password updated successfully." });
  } catch (error) {
    return apiServerError(error, "settings PATCH");
  }
}
