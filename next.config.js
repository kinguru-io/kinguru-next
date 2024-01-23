const withNextIntl = require("next-intl/plugin");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "loremflickr.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "s3.pl-waw.scw.cloud",
        port: "",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    instrumentationHook: true,
  },
  publicRuntimeConfig: {
    elasticSearchApiKey: process.env.ELASTICSEARCH_API_KEY,
    elasticSearchEndpoint: process.env.ELASTICSEARCH_ENDPOINT,
  },
  productionBrowserSourceMaps: true,
  transpilePackages: ["@stylexjs/open-props"],
};

module.exports = withNextIntl()(nextConfig);
