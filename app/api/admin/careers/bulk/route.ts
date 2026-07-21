import { NextRequest } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { apiSuccess, apiError, apiServerError } from "@/app/lib/api-response";
import { requireAdminAuth } from "@/app/lib/admin-auth";
import { del } from "@vercel/blob";
import { v2 as cloudinary } from "cloudinary";

const cloudName = process.env.CLOUDINARY_CLOUD_NAME ?? process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const cloudinaryConfigured = Boolean(
  cloudName && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET
);

if (cloudinaryConfigured) {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

const MAX_IDS = 500;

export async function DELETE(req: NextRequest) {
  const { response } = await requireAdminAuth();
  if (response) return response;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return apiError("Invalid body.");
  }

  const { ids } = body as { ids?: unknown };
  if (!Array.isArray(ids) || ids.length === 0 || !ids.every((id) => typeof id === "string")) {
    return apiError("Provide a non-empty array of application ids.");
  }
  if (ids.length > MAX_IDS) {
    return apiError(`Cannot delete more than ${MAX_IDS} applications at once.`);
  }

  try {
    const applications = await prisma.jobApplication.findMany({
      where: { id: { in: ids } },
      select: { id: true, resumeUrl: true },
    });

    // Best-effort storage cleanup — a failed file delete shouldn't block DB deletion.
    await Promise.all(
      applications.map(async (app) => {
        if (!app.resumeUrl) return;
        try {
          if (app.resumeUrl.includes("blob.vercel-storage.com")) {
            await del(app.resumeUrl);
          } else if (app.resumeUrl.includes("cloudinary.com") && cloudinaryConfigured) {
            const match = app.resumeUrl.match(/\/raw\/upload\/(?:v\d+\/)?(.+)$/);
            if (match) await cloudinary.uploader.destroy(match[1], { resource_type: "raw" });
          }
        } catch {
          // ignore — already best-effort
        }
      })
    );

    const { count } = await prisma.jobApplication.deleteMany({
      where: { id: { in: ids } },
    });

    return apiSuccess({ deleted: count });
  } catch (error) {
    return apiServerError(error, "careers bulk DELETE");
  }
}
