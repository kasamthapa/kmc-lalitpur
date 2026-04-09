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

  const { read, responded } = body as { read?: boolean; responded?: boolean };
  const data: { read?: boolean; responded?: boolean } = {};
  if (typeof read === "boolean") data.read = read;
  if (typeof responded === "boolean") data.responded = responded;

  if (Object.keys(data).length === 0) {
    return apiError("Provide read or responded field.");
  }

  try {
    const enquiry = await prisma.enquiry.update({ where: { id }, data });
    return apiSuccess(enquiry);
  } catch (error: unknown) {
    if ((error as { code?: string }).code === "P2025") return apiNotFound("Enquiry not found.");
    return apiServerError(error, "enquiries PATCH");
  }
}
