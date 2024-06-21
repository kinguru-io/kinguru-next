/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig, defineRecipe } from "@pandacss/dev";
import { footerSlot } from "./src/components/Footer/Footer.recipe";
import { headerSlot } from "./src/components/Header/Header.recipe";
import { avatarRecipe } from "./src/components/uikit/Avatar/Avatar.recipe";
import { buttonRecipe } from "./src/components/uikit/Button/Button.recipe";
import { checkboxSlot } from "./src/components/uikit/Checkbox/Checkbox.recipe";
import { dropdownSlot } from "./src/components/uikit/Dropdown/Dropdown.recipe";
import { inputSlot } from "./src/components/uikit/Input/Input.recipe";
import { premiseCardSlot } from "./src/components/uikit/PremiseCard/PremiseCard.recipe";
import { radioSlot } from "./src/components/uikit/Radio/Radio.recipe";
import { selectSlot } from "./src/components/uikit/Select/Select.recipe";
import { sliderSlot } from "./src/components/uikit/Slider/Slider.recipe";
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
      keyframes: {
        fadein: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      layerStyles,
      textStyles: additionalTextStyles,
      recipes: {
        button: buttonRecipe,
        avatar: avatarRecipe,
        icon: defineRecipe({
          className: "icon",
          base: {
            boxSizing: "content-box",
            color: "inherit",
            display: "inline-block",
            fill: "currentcolor",
            userSelect: "none",
            "&[data-axis*=x]": { width: "1em" },
            "&[data-axis*=y]": { height: "1em" },
          },
        }),
      },
      slotRecipes: {
        input: inputSlot,
        dropdown: dropdownSlot,
        select: selectSlot,
        footer: footerSlot,
        header: headerSlot,
        slider: sliderSlot,
        premiseCard: premiseCardSlot,
        checkbox: checkboxSlot,
        radio: radioSlot,
      },
      tokens: {
        animations: {
          "fade-in": { value: "fadein 150ms linear" },
        },
        gradients: {
          cardImage: {
            value:
              "linear-gradient(269deg, rgba(0, 0, 0, 0.2) 34.5%, transparent 88%)",
          },
          "dark-overlay": {
            value:
              "linear-gradient(0deg, rgba(0, 0, 0, 0.64), rgba(0, 0, 0, 0.64))",
          },
          "darken-to-bottom": {
            value:
              "linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.58) 100%)",
          },
        },
        shadows: {
          cardShadow: { value: "7px 7px 20px 6px rgba(0, 0, 0, 0.08)" },
          header: { value: "0px 4px 48px 0px rgba(0, 0, 0, 0.06)" },
          dropdown: { value: "0px 14px 45px rgba(0, 0, 0, 0.2)" },
        },
        fonts: {
          noto: { value: "var(--font-noto-sans), sans-serif" },
        },
        fontSizes: {
          // `px__` means pixels reference for the 16px root font size
          px13: { value: "0.8125rem" },
          px15: { value: "0.9375rem" },
          px17: { value: "1.0625rem" },
        },
        zIndex: {
          dropdown: { value: "100" },
          modal: { value: "110" },
        },
        spacing: {
          13: { value: "3.25rem" },
          15: { value: "3.75rem" },
        },
      },
    },
    semanticTokens: {
      colors: {
        focus: { value: "#0B99FF" },
        primary: {
          DEFAULT: { value: "#FFD800" },
          lighter: { value: "#FFEC82" },
          lightest: { value: "#FEF7D2" },
        },
        secondary: {
          DEFAULT: { value: "#7A7A7A" },
          lighter: { value: "#F5F5F5" },
          lightest: { value: "#FBFBFB" },
        },
        tertiary: { DEFAULT: { value: "#D9D9D9" } },
        dark: { DEFAULT: { value: "#212529" } },
        light: { DEFAULT: { value: "#FFFFFF" } },
        neutral: { 1: { value: "#FCFCFC" } }, // white darkened by 1%
        danger: {
          DEFAULT: { value: "#DC1414" },
          text: { value: "{colors.light}" },
        },
        success: {
          DEFAULT: { value: "#1C9109" },
          text: { value: "{colors.light}" },
        },
      },
    },
  },
  // Custom conditions (css-selectors)
  conditions: {
    extend: {
      hoverEnabled: "&:not([disabled]):hover",
      activeEnabled: "&:not([disabled]):active",
      peerCheckedAndDisabled: ".peer:is(:checked:disabled) ~ &",
      placeholderHidden: "&:is(:not(:placeholder-shown))",
    },
  },

  // The output directory for your css system
  outdir: "styled-system",

  staticCss: {
    recipes: "*",
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
      container: {
        transform(props) {
          return {
            position: "relative",
            maxWidth: "1328px", // 1280px (sizes.7xl) + 2 * 24px (sizes.6)
            mx: "auto",
            px: { base: "4", sm: "6" },
            ...props,
          };
        },
      },
      // JSX <span /> component. As simple as the `Box` component
      inlineBox: { jsxElement: "span", transform: (props) => props },
    },
  },
  hooks: {
    "config:resolved": ({ config, utils }) => {
      // removing base color palette
      return utils.omit(config, ["theme.tokens.colors"]);
    },
  },
});
