import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/app/lib/prisma";
import { apiSuccess, apiError, apiServerError } from "@/app/lib/api-response";
import { requireAdminAuth } from "@/app/lib/admin-auth";

export async function GET() {
  const { response } = await requireAdminAuth();
  if (response) return response;

  try {
    const news = await prisma.news.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true, title: true, slug: true, category: true,
        published: true, featured: true, createdAt: true, imageUrl: true,
      },
    });
    return apiSuccess(news);
  } catch (error) {
    return apiServerError(error, "news GET");
  }
}

export async function POST(req: NextRequest) {
  const { response } = await requireAdminAuth();
  if (response) return response;

  let body: unknown;
  try { body = await req.json(); } catch { return apiError("Invalid body."); }

  const b = body as Record<string, unknown>;

  if (!b.title || typeof b.title !== "string" || b.title.trim().length < 3) {
    return apiError("Title is required (min 3 characters).");
  }
  if (!b.slug || typeof b.slug !== "string") {
    return apiError("Slug is required.");
  }

  try {
    const article = await prisma.news.create({
      data: {
        title: (b.title as string).trim(),
        slug: (b.slug as string).trim().toLowerCase(),
        description: b.description ? (b.description as string).trim() : null,
        content: b.content ? (b.content as string).trim() : null,
        category: b.category ? (b.category as string).trim() : null,
        imageUrl: b.imageUrl ? (b.imageUrl as string).trim() : null,
        published: b.published === true,
        featured: b.featured === true,
        metaTitle: b.metaTitle ? (b.metaTitle as string).trim() : null,
        metaDescription: b.metaDescription ? (b.metaDescription as string).trim() : null,
      },
    });
    revalidatePath("/news");
    revalidatePath("/");
    return apiSuccess(article, 201);
  } catch (error: unknown) {
    if ((error as { code?: string }).code === "P2002") {
      return apiError("A news article with this slug already exists.");
    }
    return apiServerError(error, "news POST");
  }
}
