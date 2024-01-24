import { ComponentProps } from "react";
import { cva, type RecipeVariantProps } from "~/styled-system/css";

export const button = cva({
  base: {
    display: "flex",
    alignItems: "center",
    gap: "1",
    borderRadius: "3xl",
    color: "slate.950",
    border: "0.5px solid",
    cursor: "pointer",
  },
  variants: {
    variant: {
      primary: {
        bg: "yellow.300",
        borderColor: "yellow.300",
        fontWeight: "bold",
        _hover: {
          bg: "yellow.200",
          borderColor: "yellow.200",
        },
      },
      outline: {
        bg: "slate.50",
        borderColor: "slate.950",
        fontWeight: "normal",
        _hover: {
          textDecoration: "underline",
        },
      },
    },
    size: {
      sm: {
        fontSize: "md",
        lineHeight: "normal",
        px: "25px",
        py: "8px",
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
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
}
