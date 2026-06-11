import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
  if (!privateKey) {
    return NextResponse.json({ error: "ImageKit not configured." }, { status: 500 });
  }

  const form = await req.formData();
  const file = form.get("file") as File | null;
  const folder = (form.get("folder") as string) || "/kmc";

  if (!file) {
    return NextResponse.json({ error: "No file provided." }, { status: 400 });
  }

  const fd = new FormData();
  fd.append("file", file);
  fd.append("fileName", file.name);
  fd.append("folder", folder);

  const res = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(privateKey + ":").toString("base64")}`,
    },
    body: fd,
  });

  if (!res.ok) {
    const j = await res.json().catch(() => ({}));
    return NextResponse.json(
      { error: (j as { message?: string })?.message ?? "Upload failed." },
      { status: res.status }
    );
  }

  const data = (await res.json()) as { url: string };
  return NextResponse.json({ url: data.url });
}
