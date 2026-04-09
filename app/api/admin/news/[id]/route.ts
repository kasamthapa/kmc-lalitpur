import { NextRequest } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { apiSuccess, apiError, apiNotFound, apiServerError } from "@/app/lib/api-response";
import { requireAdminAuth } from "@/app/lib/admin-auth";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { response } = await requireAdminAuth();
  if (response) return response;

  const { id } = await params;

  try {
    const article = await prisma.news.findUnique({ where: { id } });
    if (!article) return apiNotFound("Article not found.");
    return apiSuccess(article);
  } catch (error) {
    return apiServerError(error, "news GET [id]");
  }
}

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
    const article = await prisma.news.update({
      where: { id },
      data: body as object,
    });
    return apiSuccess(article);
  } catch (error: unknown) {
    if ((error as { code?: string }).code === "P2025") return apiNotFound("Article not found.");
    if ((error as { code?: string }).code === "P2002") return apiError("Slug already in use.");
    return apiServerError(error, "news PATCH");
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
    await prisma.news.delete({ where: { id } });
    return apiSuccess({ deleted: true });
  } catch (error: unknown) {
    if ((error as { code?: string }).code === "P2025") return apiNotFound("Article not found.");
    return apiServerError(error, "news DELETE");
  }
}
