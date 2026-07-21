import { NextRequest, NextResponse } from "next/server";
import { requireAdminAuth } from "@/app/lib/admin-auth";

const MAX_SIZE = 10 * 1024 * 1024; // 10 MB

// Magic-byte signatures — the client-declared MIME type can be spoofed, so we
// sniff the actual file content before trusting it.
const SIGNATURES: { type: string; bytes: number[]; offset?: number }[] = [
  { type: "image/jpeg", bytes: [0xff, 0xd8, 0xff] },
  { type: "image/png", bytes: [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a] },
  { type: "image/gif", bytes: [0x47, 0x49, 0x46, 0x38] },
  { type: "image/webp", bytes: [0x52, 0x49, 0x46, 0x46] }, // "RIFF"; WEBP marker follows at offset 8
];

function sniffImageType(bytes: Uint8Array): string | null {
  for (const sig of SIGNATURES) {
    const offset = sig.offset ?? 0;
    if (sig.bytes.every((b, i) => bytes[offset + i] === b)) {
      if (sig.type === "image/webp") {
        const marker = String.fromCharCode(...bytes.slice(8, 12));
        if (marker !== "WEBP") continue;
      }
      return sig.type;
    }
  }
  return null;
}

export async function POST(req: NextRequest) {
  const { response } = await requireAdminAuth();
  if (response) return response;

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

  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "File too large. Max 10 MB." }, { status: 400 });
  }

  const head = new Uint8Array(await file.slice(0, 12).arrayBuffer());
  if (!sniffImageType(head)) {
    return NextResponse.json(
      { error: "Only JPEG, PNG, WebP, or GIF images are allowed." },
      { status: 400 }
    );
  }

  const fd = new FormData();
  fd.append("file", file);
  fd.append("fileName", file.name);
  fd.append("folder", folder);

  let res: Response;
  try {
    res = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(privateKey + ":").toString("base64")}`,
      },
      body: fd,
    });
  } catch (err) {
    console.error("ImageKit upload request failed:", err);
    return NextResponse.json({ error: "Upload failed. Try again." }, { status: 502 });
  }

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
