import type { StorybookConfig } from "@storybook/nextjs";
import { TsconfigPathsPlugin } from "tsconfig-paths-webpack-plugin";
import path from "node:path";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    {
      name: "storybook-addon-module-mock",
      options: {
        include: ["**/src/lib/**"],
        exclude: ["**/node_modules/**"],
      },
    },
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  staticDirs: ["../public"],
  features: {
    experimentalRSC: true,
  },

  webpackFinal: async (config) => {
    if (config.resolve) {
      config.resolve.plugins = [
        ...(config.resolve?.plugins || []),
        new TsconfigPathsPlugin({
          extensions: config.resolve?.extensions,
        }),
      ];
    }
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        stripe: path.resolve(__dirname, "stripe.mock.ts"),
      },
    };
    return config;
  },
};
export default config;
