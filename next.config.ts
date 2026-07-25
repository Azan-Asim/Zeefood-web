import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'drm.devsinntechnologies.com',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'drm.devsinntechnologies.com',
        pathname: '/**',
      },
      {
        // Noise texture for glassmorphic backgrounds
        protocol: 'https',
        hostname: 'grainy-gradients.vercel.app',
      },
    ],
  },
};

export default nextConfig;
