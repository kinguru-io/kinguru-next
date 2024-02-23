/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from "@pandacss/dev";
import { footerSlot } from "./src/components/Footer/Footer.recipe";
import { headerSlot } from "./src/components/Header/Header.recipe";
import { avatarRecipe } from "./src/components/uikit/Avatar/Avatar.recipe";
import { buttonRecipe } from "./src/components/uikit/Button/Button.recipe";
import { dropdownSlot } from "./src/components/uikit/Dropdown/Dropdown.recipe";
import { inputRecipe } from "./src/components/uikit/Input/Input.recipe";
import { selectSlot } from "./src/components/uikit/Select/Select.recipe";
import { additionalGlobalCss } from "./src/theme/globalCss";
import { layerStyles } from "./src/theme/layerStyles";
import { customDividerPattern } from "./src/theme/patterns/customDivider";
import { additionalTextStyles } from "./src/theme/textStyles";

export default defineConfig({
  globalCss: additionalGlobalCss,
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
      layerStyles,
      textStyles: additionalTextStyles,
      recipes: {
        button: buttonRecipe,
        input: inputRecipe,
        avatar: avatarRecipe,
      },
      slotRecipes: {
        dropdown: dropdownSlot,
        select: selectSlot,
        footer: footerSlot,
        header: headerSlot,
      },
      tokens: {
        gradients: {
          cardImage: {
            value:
              "linear-gradient(269deg, rgba(0, 0, 0, 0.2) 34.5%, transparent 88%)",
          },
        },
        shadows: {
          cardShadow: { value: "7px 7px 20px 6px rgba(0, 0, 0, 0.08)" },
        },
        fonts: {
          noto: { value: "var(--font-noto-sans), sans-serif" },
        },
        zIndex: {
          dropdown: { value: "100" },
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
          blue: { value: "#0B99FF" },
        },
      },
    },
    // Semantic tokens declaration
    semanticTokens: {
      colors: {
        focus: { value: "{colors.blue}" },
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
    css: [
      {
        properties: {
          colorPalette: ["primary", "secondary", "success", "danger"],
        },
      },
    ],
  },
  patterns: {
    extend: {
      customDivider: customDividerPattern,
    },
  },
});
