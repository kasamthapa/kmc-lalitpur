import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ── Image optimisation ──────────────────────────────────────────────────────
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // ── Security & performance ──────────────────────────────────────────────────
  compress: true,
  poweredByHeader: false,

  // ── HTTP headers ─────────────────────────────────────────────────────────────
  async headers() {
    return [
      {
        // Apply cache headers to all static assets
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },

  // ── Redirects ────────────────────────────────────────────────────────────────
  async redirects() {
    return [
      // Redirect trailing slashes for consistency
      {
        source: "/:path+/",
        destination: "/:path+",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
