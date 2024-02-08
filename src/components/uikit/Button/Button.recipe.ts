/* eslint-disable import/no-extraneous-dependencies */
import { defineRecipe } from "@pandacss/dev";

export const buttonRecipe = defineRecipe({
  className: "button",
  base: {
    display: "flex",
    alignItems: "center",
    gap: "2",
    borderRadius: "3rem",
    border: "1px solid",
    cursor: "pointer",
    position: "relative",
    overflow: "hidden",
    transition: "colors",
    outline: "none",
    "&[data-icon-position=left]": { flexDirection: "row" },
    "&[data-icon-position=right]": { flexDirection: "row-reverse" },
    _disabled: {
      cursor: "not-allowed",
    },
  },
  variants: {
    variant: {
      solid: {
        bg: "token(colors.colorPalette)",
        borderColor: "token(colors.colorPalette)",
        color: "token(colors.colorPalette.text, colors.neutral.1)",
        fontWeight: "bold",
        _hoverEnabled: {
          bg: "token(colors.colorPalette.hover)",
          borderColor: "token(colors.colorPalette.hover)",
        },
        _activeEnabled: {
          bg: "token(colors.colorPalette.active)",
          borderColor: "token(colors.colorPalette.active)",
        },
        _disabled: {
          bg: "token(colors.colorPalette.disabled)",
          borderColor: "token(colors.colorPalette.disabled)",
          color: "token(colors.colorPalette.text, colors.neutral.2)",
        },
        _focus: {
          borderColor: "token(colors.focus)",
        },
      },
      outline: {
        bg: "neutral.5",
        borderColor: "token(colors.colorPalette.darker, colors.colorPalette)",
        fontWeight: "normal",
        _hoverEnabled: {
          textDecoration: "underline",
        },
        _activeEnabled: {
          borderColor: "token(colors.colorPalette.active)",
        },
        _disabled: {
          color: "neutral.2",
          borderColor: "token(colors.colorPalette.disabled)",
        },
        _focusVisible: {
          borderColor: "token(colors.focus)",
        },
      },
    },
    size: {
      sm: {
        textStyle: "button.sm",
        px: "20px",
        py: "6.8px",
        border: "1px solid",
      },
      md: {
        textStyle: "button.md",
        px: "25px",
        py: "10.6px",
        border: "1px solid",
      },
      lg: {
        textStyle: "button.lg",
        px: "40px",
        py: "13.5px",
        border: "2px solid",
      },
      xl: {
        textStyle: "button.xl",
        px: "44px",
        py: "17.6px",
        border: "3px solid",
      },
    },
  },
  staticCss: [
    { size: ["*"], responsive: true },
    { variant: ["*"] },
    { iconPosition: ["*"] },
  ],
});
