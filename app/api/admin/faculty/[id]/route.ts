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
    const faculty = await prisma.faculty.findUnique({ where: { id } });
    if (!faculty) return apiNotFound("Faculty member not found.");
    return apiSuccess(faculty);
  } catch (error) {
    return apiServerError(error, "faculty GET [id]");
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
    const faculty = await prisma.faculty.update({
      where: { id },
      data: { ...(body as object), updatedAt: new Date() },
    });
    return apiSuccess(faculty);
  } catch (error: unknown) {
    if ((error as { code?: string }).code === "P2025") return apiNotFound("Faculty member not found.");
    return apiServerError(error, "faculty PATCH");
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
    await prisma.faculty.delete({ where: { id } });
    return apiSuccess({ deleted: true });
  } catch (error: unknown) {
    if ((error as { code?: string }).code === "P2025") return apiNotFound("Faculty member not found.");
    return apiServerError(error, "faculty DELETE");
  }
}
