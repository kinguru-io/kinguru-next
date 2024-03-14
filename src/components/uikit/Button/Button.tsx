import { ComponentProps } from "react";
import { ImSpinner8 } from "react-icons/im";
import { cx, css } from "~/styled-system/css";
import { button, type ButtonVariantProps } from "~/styled-system/recipes";

export const buttonColorPalette = [
  "primary",
  "secondary",
  "danger",
  "success",
] as const;

export type ButtonProps = ButtonVariantProps &
  ComponentProps<"button"> & {
    icon?: React.ReactNode;
    isLoading?: boolean;
    iconPosition?: "left" | "right";
    colorPalette?: (typeof buttonColorPalette)[number];
  };

export function Button({
  icon = null,
  variant,
  iconPosition = "left",
  colorPalette,
  size,
  children,
  isLoading = false,
  disabled = false,
  ...restProps
}: ButtonProps) {
  const className = cx(css({ colorPalette }), button({ variant, size }));

  return (
    <button
      data-icon-position={iconPosition}
      className={className}
      disabled={isLoading || disabled}
      {...restProps}
    >
      {icon && (
        <span
          className={css({ _loading: { opacity: 0 } })}
          aria-busy={isLoading}
          aria-hidden
        >
          {icon}
        </span>
      )}
      <span
        className={css({ _loading: { opacity: 0 } })}
        aria-busy={isLoading}
        data-label
      >
        {children}
      </span>
      {isLoading && <LoaderIcon />}
    </button>
  );
}

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
