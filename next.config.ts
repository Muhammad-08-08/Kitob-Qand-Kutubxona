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
  experimental: {
    optimizePackageImports: false,
  },
};

export default nextConfig;