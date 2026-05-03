import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ── Turbopack root (silences the multiple-lockfile warning) ─────────────────
  turbopack: {
    root: __dirname,
  },

  // ── Image optimisation ──────────────────────────────────────────────────────
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        pathname: "/**",
      },
    ],
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
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.youtube.com https://va.vercel-scripts.com https://maps.googleapis.com https://maps.gstatic.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https://res.cloudinary.com https://img.youtube.com https://i.ytimg.com https://maps.gstatic.com https://maps.googleapis.com https://*.ggpht.com",
              "frame-src https://www.youtube.com https://youtube.com https://www.google.com https://maps.google.com https://maps.googleapis.com",
              "connect-src 'self' https://generativelanguage.googleapis.com https://vitals.vercel-insights.com https://maps.googleapis.com https://api.cloudinary.com https://res.cloudinary.com",
              "font-src 'self' data:",
              "media-src 'self' https://res.cloudinary.com",
            ].join("; "),
          },
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
