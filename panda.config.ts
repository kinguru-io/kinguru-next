/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig, defineRecipe } from "@pandacss/dev";
import { buttonRecipe } from "./src/components/uikit/Button/Button.recipe";

const inputRecipe = defineRecipe({
  className: "input",
  base: {
    display: "block",
    w: "full",
    fontSize: "16px",
    lineHeight: "1.25",
    bg: "neutral.5",
    border: "1px solid token(colors.secondary)",
    transition: "colors",
    _placeholder: {
      color: "neutral.2",
    },
    _hoverEnabled: {
      borderColor: "primary",
    },
    _focusVisible: {
      outline: "none",
      borderColor: "primary",
    },
    _disabled: {
      color: "neutral.3",
      borderColor: "neutral.3",
      cursor: "not-allowed",
    },
  },
  variants: {
    variant: {
      default: {
        borderInline: "none",
        borderBlockStart: "none",
        py: "2px",
      },
      outline: {
        borderRadius: "full",
        px: "25px",
        py: "10px",
      },
    },
  },
  defaultVariants: {
    variant: "default",
  },
  staticCss: [{ variant: ["*"] }],
});

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
      recipes: {
        button: buttonRecipe,
        input: inputRecipe,
      },
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
    // Semantic tokens declaration
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
          darker: { value: "{colors.neutral.1}" },
          hover: { value: "{colors.neutral.3}" },
          active: { value: "{colors.neutral.4}" },
          disabled: { value: "{colors.neutral.4}" },
        },
        danger: {
          DEFAULT: { value: "{colors.red.1}" },
          hover: { value: "{colors.red.2}" },
          active: { value: "{colors.red.3}" },
          disabled: { value: "{colors.red.4}" },
          text: { value: "{colors.neutral.5}" },
        },
        success: {
          DEFAULT: { value: "{colors.green.1}" },
          hover: { value: "{colors.green.2}" },
          active: { value: "{colors.green.3}" },
          disabled: { value: "{colors.green.4}" },
          text: { value: "{colors.neutral.5}" },
        },
      },
    },
  },
  // Custom conditions (css-selectors)
  conditions: {
    extend: {
      hoverEnabled: "&:not([disabled]):hover",
      activeEnabled: "&:not([disabled]):active",
    },
  },

  // The output directory for your css system
  outdir: "styled-system",

  staticCss: {
    recipes: {
      button: [
        { size: ["*"], responsive: true },
        { variant: ["*"] },
        { iconPosition: ["*"] },
      ],
    },
    css: [
      {
        properties: {
          colorPalette: ["primary", "secondary", "success", "danger"],
        },
      },
    ],
  },
});
