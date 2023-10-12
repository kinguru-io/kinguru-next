const withNextIntl = require('next-intl/plugin')('./src/i18n.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'loremflickr.com',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 's3.pl-waw.scw.cloud',
        port: '',
        pathname: '/**'
      }
    ]
  },
  experimental: {
    instrumentationHook: true,
    serverActions: true
  },
  productionBrowserSourceMaps: true
}

module.exports = withNextIntl(nextConfig)
