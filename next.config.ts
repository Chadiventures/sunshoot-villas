import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "cdn.gtranslate.net",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/families", destination: "/about", permanent: true },
      { source: "/rates", destination: "/villas", permanent: true },
      { source: "/promos", destination: "/contact", permanent: true },
      { source: "/book", destination: "/admin", permanent: false },
    ];
  },
};

export default nextConfig;
