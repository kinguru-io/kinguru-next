/* eslint-disable import/no-extraneous-dependencies */
import { defineRecipe } from "@pandacss/dev";

export const buttonRecipe = defineRecipe({
  className: "button",
  base: {
    colorPalette: "primary",
    display: "flex",
    alignItems: "center",
    gap: "2",
    borderRadius: "full",
    borderStyle: "solid",
    cursor: "pointer",
    position: "relative",
    overflow: "hidden",
    transition: "colors",
    outline: "none",
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
        _focusVisible: {
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
      ghost: {
        bg: "transparent",
        borderColor: "transparent",
        color: "neutral.1",
        fontWeight: "bold",
        _hoverEnabled: { textDecoration: "underline" },
        _activeEnabled: { bg: "neutral.4" },
        _disabled: { color: "neutral.2" },
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
        borderWidth: "1px",
      },
      md: {
        textStyle: "button.md",
        px: "25px",
        py: "10.6px",
        borderWidth: "1px",
      },
      lg: {
        textStyle: "button.lg",
        px: "40px",
        py: "13.5px",
        borderWidth: "2px",
      },
      xl: {
        textStyle: "button.xl",
        px: "44px",
        py: "17.6px",
        borderWidth: "3px",
      },
      iconOnly: {
        h: "2.5em",
        w: "2.5em",
        borderWidth: "1px",
        alignItems: "center",
        justifyContent: "center",
        "& [data-label]": {
          srOnly: true,
        },
      },
    },
  },
  defaultVariants: {
    variant: "solid",
    size: "sm",
  },
  staticCss: [{ size: ["*"], responsive: true }, { variant: ["*"] }],
});
