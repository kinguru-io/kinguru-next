import { ComponentProps } from "react";
import { ImSpinner8 } from "react-icons/im";
import { css, cva, type RecipeVariantProps } from "~/styled-system/css";

export const button = cva({
  base: {
    lineHeight: "1.2",
    display: "flex",
    alignItems: "center",
    gap: "2",
    borderRadius: "3rem",
    color: "neutral.1",
    fontWeight: "bold",
    border: "1px solid",
    cursor: "pointer",
    position: "relative",
    overflow: "hidden",
    transition: "colors",
    _disabled: {
      color: "neutral.2",
      cursor: "not-allowed",
    },
  },
  variants: {
    variant: {
      primary: {
        bg: "primary",
        borderColor: "primary",
        _hoverEnabled: {
          bg: "primary.hover",
          borderColor: "primary.hover",
        },
        _activeEnabled: {
          bg: "primary.active",
          borderColor: "primary.active",
        },
        _disabled: {
          bg: "primary.disabled",
          borderColor: "primary.disabled",
        },
      },
      secondary: {
        bg: "secondary",
        borderColor: "secondary",
        color: "neutral.5",
        _hoverEnabled: {
          bg: "secondary.hover",
          borderColor: "secondary.hover",
        },
        _activeEnabled: {
          bg: "secondary.active",
          borderColor: "secondary.active",
        },
        _disabled: {
          bg: "secondary.disabled",
          borderColor: "secondary.disabled",
        },
      },
      outline: {
        bg: "neutral.5",
        borderColor: "neutral.1",
        fontWeight: "normal",
        _hoverEnabled: {
          textDecoration: "underline",
        },
        _activeEnabled: {
          borderColor: "neutral.2",
        },
        _disabled: {
          borderColor: "neutral.2",
        },
      },
      success: {
        bg: "success",
        borderColor: "success",
        color: "neutral.5",
        _hoverEnabled: {
          bg: "success.hover",
          borderColor: "success.hover",
        },
        _activeEnabled: {
          bg: "success.active",
          borderColor: "success.active",
        },
        _disabled: {
          bg: "success.disabled",
          borderColor: "success.disabled",
          color: "neutral.5",
        },
      },
      danger: {
        bg: "danger",
        borderColor: "danger",
        color: "neutral.5",
        _hoverEnabled: {
          bg: "danger.hover",
          borderColor: "danger.hover",
        },
        _activeEnabled: {
          bg: "danger.active",
          borderColor: "danger.active",
        },
        _disabled: {
          bg: "danger.disabled",
          borderColor: "danger.disabled",
          color: "neutral.5",
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

function LoaderIcon() {
  return (
    <span
      className={css({
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      })}
      aria-hidden
    >
      <ImSpinner8 className={css({ animation: "spin" })} />
    </span>
  );
}

type ButtonProps = {
  icon?: React.ReactNode;
  isLoading?: boolean;
} & RecipeVariantProps<typeof button> &
  ComponentProps<"button">;

export function Button({
  icon = null,
  iconPosition = "left",
  variant = "primary",
  size = "sm",
  children,
  isLoading = false,
  disabled = false,
  ...restProps
}: ButtonProps) {
  return (
    <button
      className={button({ variant, size, iconPosition })}
      disabled={isLoading || disabled}
      {...restProps}
    >
      {!isLoading && icon && <span aria-hidden>{icon}</span>}
      <span
        className={css({ "&[data-loading=true]": { opacity: 0 } })}
        data-loading={isLoading}
      >
        {children}
      </span>
      {isLoading && <LoaderIcon />}
    </button>
  );
}
