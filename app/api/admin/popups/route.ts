import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/app/lib/prisma";
import { apiSuccess, apiError, apiServerError } from "@/app/lib/api-response";
import { requireAdminAuth } from "@/app/lib/admin-auth";

export async function GET() {
  const { response } = await requireAdminAuth();
  if (response) return response;

  try {
    const popups = await prisma.popup.findMany({
      orderBy: { createdAt: "desc" },
    });
    return apiSuccess(popups);
  } catch (error) {
    return apiServerError(error);
  }
}

export async function POST(req: NextRequest) {
  const { response } = await requireAdminAuth();
  if (response) return response;

  try {
    const body = await req.json();
    const { title, body: bodyText, imageUrl, imageFit, buttons, active, showOnce, delaySeconds } = body;

    // If activating this popup, deactivate all others first
    if (active) {
      await prisma.popup.updateMany({ data: { active: false } });
    }

    const popup = await prisma.popup.create({
      data: {
        title: title || null,
        body: bodyText || null,
        imageUrl: imageUrl || null,
        imageFit: imageFit || "natural",
        buttons: buttons || null,
        active: active ?? false,
        showOnce: showOnce ?? true,
        delaySeconds: delaySeconds ?? 2,
      },
    });

    revalidatePath("/");
    return apiSuccess(popup, 201);
  } catch (error) {
    return apiServerError(error);
  }
}
