/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  output: 'export',
  basePath: '/BookShopNext', 
  assetPrefix: '/BookShopNext/',
  reactStrictMode: true,
  images: {
    domains: ["books.google.com"],
  },
};

module.exports = nextConfig;