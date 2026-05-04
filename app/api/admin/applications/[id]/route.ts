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
    const app = await prisma.entranceApplication.findUnique({ where: { id } });
    if (!app) return apiNotFound("Application not found.");
    return apiSuccess(app);
  } catch (error) {
    return apiServerError(error, "application GET [id]");
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

  const b = body as Record<string, unknown>;
  const validStatuses = ["pending", "verified", "rejected"];
  if (b.status && !validStatuses.includes(b.status as string)) {
    return apiError("Invalid status value.");
  }

  try {
    // If verifying, stamp verifiedAt
    const extraData: Record<string, unknown> = {};
    if (b.status === "verified") extraData.verifiedAt = new Date();
    if (b.status === "pending" || b.status === "rejected") extraData.verifiedAt = null;

    const app = await prisma.entranceApplication.update({
      where: { id },
      data: {
        ...(b.status    ? { status:    b.status as string }    : {}),
        ...(b.adminNote !== undefined ? { adminNote: b.adminNote as string | null } : {}),
        ...extraData,
        updatedAt: new Date(),
      },
    });
    return apiSuccess(app);
  } catch (error: unknown) {
    if ((error as { code?: string }).code === "P2025") return apiNotFound("Application not found.");
    return apiServerError(error, "application PATCH");
  }
}

// NOTE: No DELETE — application data must never be destroyed.
// Use status "rejected" + admin note to mark invalid submissions.
