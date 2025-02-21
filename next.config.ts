import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    dynamicIO: true,
    reactCompiler: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: 'sessionize.com',
        pathname: '/image/**',
        port: '',
        protocol: 'https',
      },
    ],
  },
};

module.exports = nextConfig;
