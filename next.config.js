/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    reactCompiler: true,
    staleTimes: {
      dynamic: 30
    },
  },
  images: {
    domains: ['sessionize.com'],
  },
};

module.exports = nextConfig;
