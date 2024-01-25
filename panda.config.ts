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
        colors: {
          "yellow.1": { value: "#FFD800" },
          "yellow.2": { value: "#FFE44D" },
          "yellow.3": { value: "#FFEC82" },
          "red.1": { value: "#DC1414" },
          "red.2": { value: "#E75B5B" },
          "red.3": { value: "#EE8C8C" },
          "green.1": { value: "#1C9109" },
          "green.2": { value: "#60B253" },
          "green.3": { value: "#90C987" },
          "neutral.1": { value: "#212529" },
          "neutral.2": { value: "#AFAFAF" },
          "neutral.3": { value: "#F2F2F2" },
          "neutral.4": { value: "#FFFFFF" },
        },
      },
    },
    semanticTokens: {
      colors: {
        primary: {
          DEFAULT: { value: "{colors.yellow.1}" },
          hover: { value: "{colors.yellow.2}" },
          disabled: { value: "{colors.yellow.3}" },
        },
        danger: {
          DEFAULT: { value: "{colors.red.1}" },
          hover: { value: "{colors.red.2}" },
          disabled: { value: "{colors.red.3}" },
        },
        success: {
          DEFAULT: { value: "{colors.green.1}" },
          hover: { value: "{colors.green.2}" },
          disabled: { value: "{colors.green.3}" },
        },
      },
    },
  },
  conditions: {
    extend: {
      hoverEnabled: "&:not([disabled]):hover",
    },
  },

  // The output directory for your css system
  outdir: "styled-system",
});
