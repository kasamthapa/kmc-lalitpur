import { NextRequest } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { apiSuccess, apiError, apiNotFound, apiServerError } from "@/app/lib/api-response";
import { requireAdminAuth } from "@/app/lib/admin-auth";

const VALID_STATUSES = ["new", "reviewed", "shortlisted", "rejected"];

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { response } = await requireAdminAuth();
  if (response) return response;

  const { id } = await params;
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return apiError("Invalid body.");
  }

  const { status } = body as { status?: string };

  if (!status || !VALID_STATUSES.includes(status)) {
    return apiError("Provide a valid status: new, reviewed, shortlisted, or rejected.");
  }

  try {
    const application = await prisma.jobApplication.update({
      where: { id },
      data: { status },
    });
    return apiSuccess(application);
  } catch (error: unknown) {
    if ((error as { code?: string }).code === "P2025")
      return apiNotFound("Application not found.");
    return apiServerError(error, "careers PATCH");
  }
}
