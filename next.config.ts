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
        // DRM live product images
        protocol: 'https',
        hostname: 'drm.devsinntechnologies.com',
        pathname: '/uploads/**',
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
