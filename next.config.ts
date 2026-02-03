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
  // Removed 'output: export' to enable middleware for auth
  // Static optimization still happens automatically for static pages
  trailingSlash: true,
};

export default nextConfig;
