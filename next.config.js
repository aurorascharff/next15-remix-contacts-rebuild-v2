/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    staleTimes: {
      dynamic: 30
    },
  },
  images: {
    domains: ['sessionize.com'],
  },
};

module.exports = nextConfig;
