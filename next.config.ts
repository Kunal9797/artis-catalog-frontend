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
  // Generate static pages for deployment
  output: 'export',
  trailingSlash: true,
};

export default nextConfig;
