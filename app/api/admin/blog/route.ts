import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/app/lib/prisma";
import { apiSuccess, apiError, apiServerError } from "@/app/lib/api-response";
import { requireAdminAuth } from "@/app/lib/admin-auth";

export async function GET() {
  const { response } = await requireAdminAuth();
  if (response) return response;

  try {
    const posts = await prisma.blogPost.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true, title: true, slug: true, category: true,
        published: true, featured: true, author: true,
        imageUrl: true, createdAt: true,
      },
    });
    return apiSuccess(posts);
  } catch (error) {
    return apiServerError(error, "blog GET");
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
    const post = await prisma.blogPost.create({
      data: {
        title: (b.title as string).trim(),
        slug: (b.slug as string).trim().toLowerCase(),
        excerpt: b.excerpt ? (b.excerpt as string).trim() : null,
        content: b.content ? (b.content as string).trim() : null,
        category: b.category ? (b.category as string).trim() : null,
        imageUrl: b.imageUrl ? (b.imageUrl as string).trim() : null,
        author: b.author ? (b.author as string).trim() : null,
        readTime: b.readTime ? (b.readTime as string).trim() : null,
        published: b.published === true,
        featured: b.featured === true,
      },
    });
    revalidatePath("/blog");
    revalidatePath("/");
    return apiSuccess(post, 201);
  } catch (error: unknown) {
    if ((error as { code?: string }).code === "P2002") {
      return apiError("A blog post with this slug already exists.");
    }
    return apiServerError(error, "blog POST");
  }
}
