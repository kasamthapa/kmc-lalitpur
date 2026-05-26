import { NextRequest } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { apiSuccess, apiError, apiNotFound, apiServerError } from "@/app/lib/api-response";
import { requireAdminAuth } from "@/app/lib/admin-auth";
import { del } from "@vercel/blob";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { response } = await requireAdminAuth();
  if (response) return response;

  const { id } = await params;

  try {
    const application = await prisma.jobApplication.findUnique({ where: { id } });
    if (!application) return apiNotFound("Application not found.");

    // Delete CV file from storage
    if (application.resumeUrl) {
      try {
        if (application.resumeUrl.includes("blob.vercel-storage.com")) {
          await del(application.resumeUrl);
        } else if (application.resumeUrl.includes("cloudinary.com")) {
          const match = application.resumeUrl.match(/\/raw\/upload\/(?:v\d+\/)?(.+)$/);
          if (match) {
            await cloudinary.uploader.destroy(match[1], { resource_type: "raw" });
          }
        }
      } catch {
        // File deletion failure shouldn't block DB deletion
      }
    }

    await prisma.jobApplication.delete({ where: { id } });
    return apiSuccess({ deleted: true });
  } catch (error: unknown) {
    if ((error as { code?: string }).code === "P2025")
      return apiNotFound("Application not found.");
    return apiServerError(error, "careers DELETE");
  }
}
