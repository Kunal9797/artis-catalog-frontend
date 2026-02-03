import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lamital.in',
        port: '',
        pathname: '/public/storage/product/**',
      },
    ],
    unoptimized: true,
  },
  // Back to static export - using Vercel Deployment Protection for auth instead
  output: 'export',
  trailingSlash: true,
};

export default nextConfig;
