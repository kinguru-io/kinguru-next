/* eslint-disable import/no-extraneous-dependencies */
import { defineRecipe } from "@pandacss/dev";

export const buttonRecipe = defineRecipe({
  className: "button",
  base: {
    lineHeight: "1.2",
    display: "flex",
    alignItems: "center",
    gap: "2",
    borderRadius: "3rem",
    border: "1px solid",
    cursor: "pointer",
    position: "relative",
    overflow: "hidden",
    transition: "colors",
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
      },
    },
    size: {
      sm: {
        fontSize: "12px",
        px: "20px",
        py: "7px",
      },
      md: {
        fontSize: "14px",
        px: "25px",
        py: "11px",
      },
      lg: {
        fontSize: "20px",
        px: "40px",
        py: "16px",
      },
      xl: {
        fontSize: "24px",
        px: "44px",
        py: "20px",
      },
    },
    iconPosition: {
      left: { flexDirection: "row" },
      right: { flexDirection: "row-reverse" },
    },
  },
});
