import withNextIntl from "next-intl/plugin";
import svg from '@neodx/svg/webpack';


/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.plugins.push(
        svg({
          root: 'assets',
          group: true,
          output: 'public/sprites',
          fileName: '{name}.{hash:8}.svg',
          metadata: {
            path: 'src/components/uikit/icon/sprite.gen.ts',
            runtime: {
              size: true,
              viewBox: true
            }
          },
          resetColors: {
            exclude: [/[a-z]*-colored\.svg$/],
            replaceUnknown: 'currentColor'
          }
        })
      );
    }
    return config;
  },
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
      {
        protocol: "https",
        hostname: "kinguru-storage.s3.pl-waw.scw.cloud",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cloudflare-ipfs.com",
        port: "",
        pathname: "/**"
      }
    ],
  },
  experimental: {
    instrumentationHook: true,
    serverComponentsExternalPackages: ["oslo", "@aws-sdk/middleware-sdk-s3"],
  },
};

export default withNextIntl()(nextConfig);
