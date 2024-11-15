import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['cdn.shopify.com']
  },
  typescript: {
    // Recommended for development, remove in production
    ignoreBuildErrors: false,
  },
  experimental: {
    // Enable statically typed links
    typedRoutes: true
  }
};

export default nextConfig; 