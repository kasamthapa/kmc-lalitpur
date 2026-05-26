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
    // Vercel Blob URLs are public — redirect directly
    if (url.includes("blob.vercel-storage.com")) {
      return NextResponse.redirect(url);
    }

    // Cloudinary URLs — generate a signed delivery URL valid for 1 hour
    const match = url.match(/\/raw\/upload\/(?:v\d+\/)?(.+)$/);
    if (!match) return NextResponse.redirect(url);

    const publicId = match[1];

    const signedUrl = cloudinary.url(publicId, {
      resource_type: "raw",
      type: "upload",
      sign_url: true,
      expires_at: Math.floor(Date.now() / 1000) + 3600,
      secure: true,
    });

    return NextResponse.redirect(signedUrl);
  } catch {
    return NextResponse.redirect(url);
  }
}
