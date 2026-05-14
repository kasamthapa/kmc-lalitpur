import { prisma } from "@/app/lib/prisma";
import { apiSuccess, apiServerError } from "@/app/lib/api-response";

export const revalidate = 30;

export async function GET() {
  try {
    const popup = await prisma.popup.findFirst({
      where: { active: true },
      orderBy: { updatedAt: "desc" },
    });
    return apiSuccess(popup ?? null);
  } catch (error) {
    return apiServerError(error);
  }
}
