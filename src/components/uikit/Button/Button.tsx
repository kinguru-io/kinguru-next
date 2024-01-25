import { ComponentProps } from "react";
import { cva, type RecipeVariantProps } from "~/styled-system/css";

export const button = cva({
  base: {
    lineHeight: "1.2em",
    display: "flex",
    alignItems: "center",
    gap: "2",
    borderRadius: "3xl",
    color: "neutral.1",
    border: "1px solid",
    cursor: "pointer",
    position: "relative",
    overflow: "hidden",
    _disabled: {
      cursor: "not-allowed",
    },
  },
  variants: {
    variant: {
      primary: {
        bg: "primary",
        borderColor: "primary",
        fontWeight: "bold",
        _hoverEnabled: {
          bg: "primary.hover",
          borderColor: "primary.hover",
        },
        _disabled: {
          bg: "neutral.3",
          borderColor: "neutral.3",
          color: "neutral.2",
        },
      },
      outline: {
        bg: "neutral.4",
        borderColor: "neutral.1",
        fontWeight: "normal",
        _hoverEnabled: {
          textDecoration: "underline",
        },
        _disabled: {
          borderColor: "neutral.2",
          color: "neutral.2",
        },
      },
      success: {
        bg: "success",
        borderColor: "success",
        color: "neutral.4",
        fontWeight: "bold",
        _hoverEnabled: {
          bg: "success.hover",
          borderColor: "success.hover",
        },
        _disabled: {
          bg: "success.disabled",
          borderColor: "success.disabled",
        },
      },
      danger: {
        bg: "danger",
        borderColor: "danger",
        color: "neutral.4",
        fontWeight: "bold",
        _hoverEnabled: {
          bg: "danger.hover",
          borderColor: "danger.hover",
        },
        _disabled: {
          bg: "danger.disabled",
          borderColor: "danger.disabled",
        },
      },
    },
    size: {
      sm: {
        fontSize: "xs",
        px: "20px",
        py: "7px",
      },
      md: {
        fontSize: "sm",
        px: "25px",
        py: "11px",
      },
    },
    iconPosition: {
      left: {
        flexDirection: "row",
      },
      right: {
        flexDirection: "row-reverse",
      },
    },
  },
});

type ButtonProps = {
  icon?: React.ReactNode;
} & RecipeVariantProps<typeof button> &
  ComponentProps<"button">;

export function Button({
  icon = null,
  iconPosition = "left",
  variant = "primary",
  size = "sm",
  children,
  ...restProps
}: ButtonProps) {
  return (
    <button className={button({ variant, size, iconPosition })} {...restProps}>
      {icon}
      {children}
    </button>
  );
}
