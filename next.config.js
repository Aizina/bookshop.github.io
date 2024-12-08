/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
 // output: 'export',
  reactStrictMode: true,
  images: {
    domains: ["books.google.com"],
  },
};

module.exports = nextConfig;
