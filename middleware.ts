import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Detect mobile/tablet user-agents
function isMobileDevice(ua: string): boolean {
  return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile|tablet/i.test(ua);
}

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Block mobile devices from the entire admin panel
  const ua = request.headers.get("user-agent") ?? "";
  if (isMobileDevice(ua)) {
    return new NextResponse(
      `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Desktop Only — KMC Admin</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      min-height: 100dvh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #030712;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      padding: 24px;
    }
    .card {
      background: #111827;
      border: 1px solid rgba(255,255,255,0.07);
      border-radius: 20px;
      padding: 40px 32px;
      text-align: center;
      max-width: 360px;
      width: 100%;
    }
    .icon {
      width: 56px; height: 56px;
      background: rgba(251,191,36,0.1);
      border: 1px solid rgba(251,191,36,0.2);
      border-radius: 16px;
      display: flex; align-items: center; justify-content: center;
      margin: 0 auto 20px;
    }
    h1 { color: #f9fafb; font-size: 18px; font-weight: 700; margin-bottom: 10px; }
    p { color: #6b7280; font-size: 14px; line-height: 1.6; }
    .badge {
      display: inline-flex; align-items: center; gap: 6px;
      margin-top: 24px;
      background: rgba(251,191,36,0.08);
      border: 1px solid rgba(251,191,36,0.15);
      border-radius: 999px;
      padding: 6px 14px;
      color: #fbbf24;
      font-size: 12px;
      font-weight: 600;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="icon">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    </div>
    <h1>Desktop Only</h1>
    <p>The KMC admin panel is only accessible from a desktop or laptop computer for security reasons.</p>
    <div class="badge">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
      Access restricted
    </div>
  </div>
</body>
</html>`,
      {
        status: 403,
        headers: { "Content-Type": "text/html; charset=utf-8" },
      }
    );
  }

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET,
  });

  const isLoginPage = pathname === "/admin/login";

  // Logged-in user hitting login page → send to dashboard
  if (token && isLoginPage) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  // Unauthenticated user on any other /admin page → send to login
  if (!token && !isLoginPage) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
