import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/app/lib/prisma";
import { apiSuccess, apiError, apiServerError } from "@/app/lib/api-response";
import { requireAdminAuth } from "@/app/lib/admin-auth";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { response } = await requireAdminAuth();
  if (response) return response;

  const { id } = await params;

  try {
    const body = await req.json();
    const { title, body: bodyText, imageUrl, buttons, active, showOnce, delaySeconds } = body;

    // If activating this popup, deactivate all others first
    if (active) {
      await prisma.popup.updateMany({
        where: { id: { not: id } },
        data: { active: false },
      });
    }

    const popup = await prisma.popup.update({
      where: { id },
      data: {
        ...(title !== undefined && { title: title || null }),
        ...(bodyText !== undefined && { body: bodyText || null }),
        ...(imageUrl !== undefined && { imageUrl: imageUrl || null }),
        ...(buttons !== undefined && { buttons: buttons || null }),
        ...(active !== undefined && { active }),
        ...(showOnce !== undefined && { showOnce }),
        ...(delaySeconds !== undefined && { delaySeconds }),
      },
    });

    revalidatePath("/");
    return apiSuccess(popup);
  } catch (error) {
    return apiServerError(error);
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
    await prisma.popup.delete({ where: { id } });
    revalidatePath("/");
    return apiSuccess({ deleted: true });
  } catch (error) {
    return apiServerError(error);
  }
}
