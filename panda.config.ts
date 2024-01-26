// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  jsxFramework: "react",
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      tokens: {
        fonts: {
          noto: { value: "var(--font-noto-sans), sans-serif" },
        },
        colors: {
          "yellow.1": { value: "#FFD800" },
          "yellow.2": { value: "#FFE44D" },
          "yellow.3": { value: "#FFEC82" },
          "yellow.4": { value: "#FEF7D2" },
          "red.1": { value: "#DC1414" },
          "red.2": { value: "#E75B5B" },
          "red.3": { value: "#EE8C8C" },
          "red.4": { value: "#F5BDBD" },
          "green.1": { value: "#1C9109" },
          "green.2": { value: "#60B253" },
          "green.3": { value: "#90C987" },
          "green.4": { value: "#C0E0BB" },
          "neutral.1": { value: "#212529" },
          "neutral.2": { value: "#AFAFAF" },
          "neutral.3": { value: "#D9D9D9" },
          "neutral.4": { value: "#F2F2F2" },
          "neutral.5": { value: "#FFFFFF" },
        },
      },
    },
    semanticTokens: {
      colors: {
        primary: {
          DEFAULT: { value: "{colors.yellow.1}" },
          hover: { value: "{colors.yellow.2}" },
          active: { value: "{colors.yellow.3}" },
          disabled: { value: "{colors.yellow.4}" },
        },
        secondary: {
          DEFAULT: { value: "{colors.neutral.2}" },
          hover: { value: "{colors.neutral.3}" },
          active: { value: "{colors.neutral.4}" },
          disabled: { value: "{colors.neutral.4}" },
        },
        danger: {
          DEFAULT: { value: "{colors.red.1}" },
          hover: { value: "{colors.red.2}" },
          active: { value: "{colors.red.3}" },
          disabled: { value: "{colors.red.4}" },
        },
        success: {
          DEFAULT: { value: "{colors.green.1}" },
          hover: { value: "{colors.green.2}" },
          active: { value: "{colors.green.3}" },
          disabled: { value: "{colors.green.4}" },
        },
      },
    },
  },
  conditions: {
    extend: {
      hoverEnabled: "&:not([disabled]):hover",
      activeEnabled: "&:not([disabled]):active",
    },
  },

  // The output directory for your css system
  outdir: "styled-system",
});
