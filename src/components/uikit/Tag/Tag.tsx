import { cva } from "~/styled-system/css";
import { styled } from "~/styled-system/jsx";
import type { StyledVariantProps } from "~/styled-system/types";

export const tagStyles = cva({
  base: {
    display: "inline-block",
    flexShrink: "0",
    whiteSpace: "nowrap",
    borderRadius: "sm",
    fontSize: "px15",
    lineHeight: "0.75",
    padding: "2",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "colorPalette",
  },
  variants: {
    variant: {
      solid: {
        color: "colorPalette.text",
        backgroundColor: "colorPalette",
      },
      outline: {},
      primary: {
        bg: "primary",
        color: "dark",
      },
      primaryLighter: {
        bg: "primary.lighter",
        color: "dark",
      },
      secondary: {
        bg: "secondary",
        color: "light",
      },
      secondaryLighter: {
        bg: "secondary.lighter",
        color: "dark",
      },
      tertiary: {
        bg: "light",
        color: "dark",
      },
      ellipse: {
        bg: "secondary.lighter",
        color: "dark",
        borderRadius: "full",
      },
    },
    size: {
      xs: {
        fontSize: "14px",
        lineHeight: "19px",
        px: "4.5px",
        py: "1.5px",
      },
      sm: {
        fontSize: "18px",
        lineHeight: "25px",
        px: "8px",
        py: "3.5px",
      },
      md: {
        fontSize: "22px",
        lineHeight: "30px",
        px: "11px",
        py: "5px",
      },
      lg: {
        fontSize: "26px",
        lineHeight: "38px",
        px: "13px",
        py: "6px",
      },
      ellipse: {
        fontSize: "20px",
        fontWeight: "normal",
        lineHeight: "22.5px",
        px: "19px",
        py: "8.5px",
      },
    },
  },
});

export const Tag = styled("span", tagStyles);
export type TagVariantProps = StyledVariantProps<typeof Tag>;
