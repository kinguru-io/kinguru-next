import type { ComponentProps } from "react";
import { SpinnerIcon } from "@/components/uikit";
import { cx, css } from "~/styled-system/css";
import { button, type ButtonVariantProps } from "~/styled-system/recipes";

export type ButtonProps = ButtonVariantProps &
  ComponentProps<"button"> & {
    icon?: React.ReactNode;
    isLoading?: boolean;
    iconPosition?: "left" | "right";
  };

export function Button({
  icon,
  iconPosition,
  centered,
  colorPalette,
  size,
  children,
  isLoading = false,
  disabled = false,
  className,
  rounded,
  contentCentered,
  ...restProps
}: ButtonProps) {
  const buttonClassName = cx(
    className,
    button({ colorPalette, size, centered, rounded, contentCentered }),
  );

  return (
    <button
      className={buttonClassName}
      disabled={isLoading || disabled}
      data-icon-position={iconPosition}
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
      {children && (
        <span
          className={css({ _loading: { opacity: 0 } })}
          aria-busy={isLoading}
          data-label
        >
          {children}
        </span>
      )}
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
      <SpinnerIcon />
    </span>
  );
}
