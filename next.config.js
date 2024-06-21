/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    ppr: 'incremental',
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
