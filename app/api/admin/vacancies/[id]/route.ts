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

  const updates = body as Record<string, unknown>;

  // Validate optional fields if provided
  if ("title" in updates) {
    const t = updates.title;
    if (!t || typeof t !== "string" || (t as string).trim().length < 2 || (t as string).trim().length > 100) {
      return apiError("Title must be 2–100 characters.");
    }
    updates.title = (t as string).trim();
  }
  if ("category" in updates && updates.category !== "Teaching" && updates.category !== "Non-Teaching") {
    return apiError("Category must be 'Teaching' or 'Non-Teaching'.");
  }
  if ("posts" in updates) {
    const p = typeof updates.posts === "number" ? updates.posts : Number(updates.posts);
    if (!Number.isInteger(p) || p < 1) return apiError("Posts must be a positive integer.");
    updates.posts = p;
  }

  try {
    const vacancy = await prisma.vacancy.update({
      where: { id },
      data: updates,
    });
    return apiSuccess(vacancy);
  } catch (error: unknown) {
    if ((error as { code?: string }).code === "P2025") return apiNotFound("Vacancy not found.");
    return apiServerError(error, "vacancies PATCH");
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
    await prisma.vacancy.delete({ where: { id } });
    return apiSuccess({ deleted: true });
  } catch (error: unknown) {
    if ((error as { code?: string }).code === "P2025") return apiNotFound("Vacancy not found.");
    return apiServerError(error, "vacancies DELETE");
  }
}
