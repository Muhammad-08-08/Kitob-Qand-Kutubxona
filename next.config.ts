import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "*",
      },
    ],
    unoptimized: true,
  },
  transpilePackages: ["recharts"],
  experimental: { optimizeCss: true },
};

export default nextConfig;