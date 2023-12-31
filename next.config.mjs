process.env.I18NEXT_DEFAULT_CONFIG_PATH = `./next-i18next.config.cjs`;

import i18next from "./next-i18next.config.cjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: i18next.i18n,
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
};

export default nextConfig;
