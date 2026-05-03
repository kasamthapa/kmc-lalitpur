import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/app/lib/prisma";
import { apiSuccess, apiError, apiNotFound, apiServerError } from "@/app/lib/api-response";
import { requireAdminAuth } from "@/app/lib/admin-auth";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { response } = await requireAdminAuth();
  if (response) return response;

  const { id } = await params;
  let body: unknown;
  try { body = await req.json(); } catch { return apiError("Invalid body."); }

  try {
    const notice = await prisma.notice.update({
      where: { id },
      data: body as object,
    });
    revalidatePath("/");
    revalidatePath("/news");
    return apiSuccess(notice);
  } catch (error: unknown) {
    if ((error as { code?: string }).code === "P2025") return apiNotFound("Notice not found.");
    return apiServerError(error, "notices PATCH");
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { response } = await requireAdminAuth();
  if (response) return response;

  const { id } = await params;

  try {
    await prisma.notice.delete({ where: { id } });
    revalidatePath("/");
    revalidatePath("/news");
    return apiSuccess({ deleted: true });
  } catch (error: unknown) {
    if ((error as { code?: string }).code === "P2025") return apiNotFound("Notice not found.");
    return apiServerError(error, "notices DELETE");
  }
}
