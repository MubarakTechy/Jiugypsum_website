import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"] },

  async redirects() {
    return [
      // Old domain -> canonical domain (replaces the old .htaccess rule)
      {
        source: "/:path*",
        has: [{ type: "host", value: "(www\\.)?jiugypsum\\.com\\.ng" }],
        destination: "https://jiugypsum.ng/:path*",
        permanent: true,
      },
      // Preserve SEO equity from the PHP URLs
      { source: "/index.php", destination: "/", permanent: true },
      { source: "/about.php", destination: "/about", permanent: true },
      { source: "/services.php", destination: "/services", permanent: true },
      { source: "/gallery.php", destination: "/gallery", permanent: true },
      { source: "/privacy.php", destination: "/privacy", permanent: true },
    ];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
