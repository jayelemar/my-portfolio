/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    imageSizes: [32, 48, 64, 96, 128, 160, 192, 256, 320, 384, 480, 512],
  },
  env: {
    NEXT_PUBLIC_BACKEND_API: process.env.NEXT_PUBLIC_BACKEND_API,
  },
};

module.exports = nextConfig;
