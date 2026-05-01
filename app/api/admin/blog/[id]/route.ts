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
    const post = await prisma.blogPost.findUnique({ where: { id } });
    if (!post) return apiNotFound("Blog post not found.");
    return apiSuccess(post);
  } catch (error) {
    return apiServerError(error, "blog GET [id]");
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
    const post = await prisma.blogPost.update({
      where: { id },
      data: body as object,
    });
    return apiSuccess(post);
  } catch (error: unknown) {
    if ((error as { code?: string }).code === "P2025") return apiNotFound("Blog post not found.");
    if ((error as { code?: string }).code === "P2002") return apiError("Slug already in use.");
    return apiServerError(error, "blog PATCH");
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
    await prisma.blogPost.delete({ where: { id } });
    return apiSuccess({ deleted: true });
  } catch (error: unknown) {
    if ((error as { code?: string }).code === "P2025") return apiNotFound("Blog post not found.");
    return apiServerError(error, "blog DELETE");
  }
}
