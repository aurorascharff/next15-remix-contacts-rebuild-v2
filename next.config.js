/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    reactCompiler: true,
    staleTimes: {
      dynamic: 30
    },
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
