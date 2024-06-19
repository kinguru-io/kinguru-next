/* eslint-disable import/no-extraneous-dependencies */
import { defineRecipe } from "@pandacss/dev";

export const buttonRecipe = defineRecipe({
  className: "button",
  base: {
    display: "flex",
    alignItems: "center",
    gap: "2.5",
    borderRadius: "full",
    lineHeight: "0.75",
    position: "relative",
    overflow: "hidden",
    transition: "colors",
    outline: "1px solid transparent",
    _hoverEnabled: {
      bgColor: "neutral.1",
      color: "neutral.5",
    },
    _focusVisible: {
      boxShadow: "0 0 0 2px token(colors.focus)",
    },
    _disabled: {
      opacity: "0.4",
    },
    "&[data-icon-position=right]": { flexDirection: "row-reverse" },
  },
  variants: {
    colorPalette: {
      primary: {
        bgColor: "primary",
        _hoverEnabled: {
          bgColor: "neutral.1",
        },
      },
      secondary: {
        bgColor: "secondary",
        _hoverEnabled: {
          bgColor: "neutral.1",
        },
      },
      dark: {
        bgColor: "neutral.1",
        color: "neutral.5",
        _hoverEnabled: {
          bgColor: "danger",
        },
      },
    },
    size: {
      sm: {
        fontSize: "sm",
        padding: "4",
      },
      lg: {
        fontSize: "px15",
        paddingBlock: "6",
        paddingInline: "8",
      },
    },
    centered: { true: { marginInline: "auto" } },
    rounded: { false: { borderRadius: "sm" } },
  },
  defaultVariants: {
    colorPalette: "primary",
    size: "sm",
  },
});
