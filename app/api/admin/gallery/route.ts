import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/app/lib/prisma";
import { apiSuccess, apiError, apiServerError } from "@/app/lib/api-response";
import { requireAdminAuth } from "@/app/lib/admin-auth";

export async function GET() {
  const { response } = await requireAdminAuth();
  if (response) return response;

  try {
    const items = await prisma.gallery.findMany({
      orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
    });
    return apiSuccess(items);
  } catch (error) {
    return apiServerError(error, "gallery GET");
  }
}

export async function POST(req: NextRequest) {
  const { response } = await requireAdminAuth();
  if (response) return response;

  let body: unknown;
  try { body = await req.json(); } catch { return apiError("Invalid body."); }

  const b = body as Record<string, unknown>;

  if (!b.src || typeof b.src !== "string" || !b.src.trim()) {
    return apiError("Image URL (src) is required.");
  }
  if (!b.alt || typeof b.alt !== "string" || !b.alt.trim()) {
    return apiError("Alt text is required.");
  }

  try {
    const item = await prisma.gallery.create({
      data: {
        src: (b.src as string).trim(),
        alt: (b.alt as string).trim(),
        category: b.category ? (b.category as string).trim() : null,
        caption: b.caption ? (b.caption as string).trim() : null,
        displayOrder: typeof b.displayOrder === "number" ? b.displayOrder : 0,
      },
    });
    revalidatePath("/gallery");
    return apiSuccess(item, 201);
  } catch (error) {
    return apiServerError(error, "gallery POST");
  }
}
