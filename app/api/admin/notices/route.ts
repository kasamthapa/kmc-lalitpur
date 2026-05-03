import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/app/lib/prisma";
import { apiSuccess, apiError, apiServerError } from "@/app/lib/api-response";
import { requireAdminAuth } from "@/app/lib/admin-auth";

export async function GET() {
  const { response } = await requireAdminAuth();
  if (response) return response;

  try {
    const notices = await prisma.notice.findMany({
      orderBy: { displayOrder: "asc" },
    });
    return apiSuccess(notices);
  } catch (error) {
    return apiServerError(error, "notices GET");
  }
}

export async function POST(req: NextRequest) {
  const { response } = await requireAdminAuth();
  if (response) return response;

  let body: unknown;
  try { body = await req.json(); } catch { return apiError("Invalid body."); }

  const { text, active, displayOrder, startDate, endDate } = body as Record<string, unknown>;

  if (!text || typeof text !== "string" || text.trim().length < 3) {
    return apiError("Notice text is required (min 3 characters).");
  }

  try {
    const notice = await prisma.notice.create({
      data: {
        text: (text as string).trim(),
        active: active !== false,
        displayOrder: typeof displayOrder === "number" ? displayOrder : 0,
        startDate: startDate ? new Date(startDate as string) : null,
        endDate: endDate ? new Date(endDate as string) : null,
      },
    });
    revalidatePath("/");
    revalidatePath("/news");
    return apiSuccess(notice, 201);
  } catch (error) {
    return apiServerError(error, "notices POST");
  }
}
