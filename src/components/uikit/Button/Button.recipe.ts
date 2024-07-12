/* eslint-disable import/no-extraneous-dependencies */
import { defineRecipe } from "@pandacss/dev";

export const buttonRecipe = defineRecipe({
  className: "button",
  base: {
    display: "flex",
    alignItems: "center",
    gap: "2.5",
    borderRadius: "full",
    lineHeight: "1",
    position: "relative",
    overflow: "hidden",
    transition: "colors",
    outline: "1px solid transparent",
    whiteSpace: "nowrap",
    _hoverEnabled: {
      bgColor: "dark",
      color: "light",
    },
    _focusVisible: {
      boxShadow: "focus",
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
          bgColor: "dark",
        },
      },
      secondary: {
        bgColor: "secondary.lighter",
        _hoverEnabled: {
          bgColor: "dark",
        },
      },
      dark: {
        bgColor: "dark",
        color: "light",
        _hoverEnabled: {
          bgColor: "danger",
        },
      },
      danger: {
        backgroundColor: "danger",
        color: "light",
        _hoverEnabled: {
          bgColor: "danger.darker",
        },
      },
      success: {
        backgroundColor: "success",
        color: "light",
        _hoverEnabled: {
          bgColor: "success.darker",
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
