// Generates a short-lived signed Cloudinary URL so admins can view/download
// restricted raw files (CVs/resumes) without exposing the API secret client-side.

import { NextRequest, NextResponse } from "next/server";
import { requireAdminAuth } from "@/app/lib/admin-auth";
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

export async function GET(req: NextRequest) {
  const { response } = await requireAdminAuth();
  if (response) return response;

  const url = req.nextUrl.searchParams.get("url");
  if (!url) return NextResponse.json({ error: "Missing url" }, { status: 400 });

  // Only ever redirect to one of our own known storage providers — never to
  // an arbitrary caller-supplied URL (that would be an open redirect).
  if (url.includes("blob.vercel-storage.com")) {
    return NextResponse.redirect(url);
  }

  if (!url.includes("cloudinary.com")) {
    return NextResponse.json({ error: "Unrecognized file URL." }, { status: 400 });
  }

  if (!cloudinaryConfigured) {
    return NextResponse.json(
      { error: "This CV is stored on a Cloudinary account that is no longer configured/active and cannot be retrieved." },
      { status: 503 }
    );
  }

  const match = url.match(/\/raw\/upload\/(?:v\d+\/)?(.+)$/);
  if (!match) {
    return NextResponse.json({ error: "Unrecognized Cloudinary file URL." }, { status: 400 });
  }

  try {
    const publicId = match[1];
    const signedUrl = cloudinary.url(publicId, {
      resource_type: "raw",
      type: "upload",
      sign_url: true,
      expires_at: Math.floor(Date.now() / 1000) + 3600,
      secure: true,
    });

    return NextResponse.redirect(signedUrl);
  } catch (err) {
    console.error("Cloudinary signed URL generation failed:", err);
    return NextResponse.json({ error: "Failed to generate file link." }, { status: 502 });
  }
}
