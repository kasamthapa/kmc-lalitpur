import { NextRequest } from "next/server";
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
    const item = await prisma.gallery.update({
      where: { id },
      data: body as object,
    });
    return apiSuccess(item);
  } catch (error: unknown) {
    if ((error as { code?: string }).code === "P2025") return apiNotFound("Gallery item not found.");
    return apiServerError(error, "gallery PATCH");
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
    await prisma.gallery.delete({ where: { id } });
    return apiSuccess({ deleted: true });
  } catch (error: unknown) {
    if ((error as { code?: string }).code === "P2025") return apiNotFound("Gallery item not found.");
    return apiServerError(error, "gallery DELETE");
  }
}
