process.env.I18NEXT_DEFAULT_CONFIG_PATH = `${__dirname}/next-i18next.config.cjs`;

const { i18n } = require("./next-i18next.config");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  i18n,
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
  output: "standalone",
  experimental: {
    instrumentationHook: true,
  },
  publicRuntimeConfig: {
    elasticSearchApiKey: process.env.ELASTICSEARCH_API_KEY,
    elasticSearchEndpoint: process.env.ELASTICSEARCH_ENDPOINT,
  },
  productionBrowserSourceMaps: true,
};

module.exports = nextConfig;
