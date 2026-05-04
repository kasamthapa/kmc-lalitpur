import { NextRequest } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { apiSuccess, apiError, apiServerError } from "@/app/lib/api-response";
import { requireAdminAuth } from "@/app/lib/admin-auth";

export async function PATCH(req: NextRequest) {
  const { response } = await requireAdminAuth();
  if (response) return response;

  let body: unknown;
  try { body = await req.json(); } catch { return apiError("Invalid body."); }

  const b = body as Record<string, unknown>;
  const ids    = b.ids as string[] | undefined;
  const status = b.status as string | undefined;

  if (!ids || !Array.isArray(ids) || ids.length === 0)
    return apiError("ids must be a non-empty array.");
  if (ids.length > 200)
    return apiError("Cannot bulk-update more than 200 records at once.");

  const validStatuses = ["pending", "verified", "rejected"];
  if (!status || !validStatuses.includes(status))
    return apiError("Invalid status value.");

  try {
    const extraData: Record<string, unknown> = {};
    if (status === "verified")                          extraData.verifiedAt = new Date();
    if (status === "pending" || status === "rejected")  extraData.verifiedAt = null;

    const result = await prisma.entranceApplication.updateMany({
      where: { id: { in: ids } },
      data:  { status, ...extraData, updatedAt: new Date() },
    });

    return apiSuccess({ updated: result.count });
  } catch (error) {
    return apiServerError(error, "applications bulk PATCH");
  }
}
