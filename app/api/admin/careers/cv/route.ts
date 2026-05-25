// Generates a short-lived signed Cloudinary URL so admins can view/download
// restricted raw files (CVs/resumes) without exposing the API secret client-side.

import { NextRequest, NextResponse } from "next/server";
import { requireAdminAuth } from "@/app/lib/admin-auth";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME ?? process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(req: NextRequest) {
  const { response } = await requireAdminAuth();
  if (response) return response;

  const url = req.nextUrl.searchParams.get("url");
  if (!url) return NextResponse.json({ error: "Missing url" }, { status: 400 });

  try {
    // Extract public_id from the Cloudinary URL
    // e.g. https://res.cloudinary.com/{cloud}/raw/upload/v123/kmc/resumes/abc.pdf
    const match = url.match(/\/raw\/upload\/(?:v\d+\/)?(.+)$/);
    if (!match) return NextResponse.redirect(url); // fallback: redirect directly

    const publicId = match[1];

    // Generate a signed URL valid for 1 hour
    const signedUrl = cloudinary.utils.private_download_url(publicId, "pdf", {
      resource_type: "raw",
      expires_at: Math.floor(Date.now() / 1000) + 3600,
    });

    return NextResponse.redirect(signedUrl);
  } catch {
    // Fallback: try direct redirect
    return NextResponse.redirect(url);
  }
}
