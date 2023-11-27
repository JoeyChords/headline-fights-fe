/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = nextConfig;

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.cnn.com",
      },
      {
        protocol: "https",
        hostname: "**.foxnews.com",
      },
    ],
  },
  reactStrictMode: true,
};
