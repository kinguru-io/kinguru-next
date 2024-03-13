import { ComponentProps } from "react";
import { ImSpinner8 } from "react-icons/im";
import { cx, css } from "~/styled-system/css";
import { button, type ButtonVariantProps } from "~/styled-system/recipes";

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

export const buttonColorPalette = [
  "primary",
  "secondary",
  "danger",
  "success",
] as const;

export type ButtonProps = {
  icon?: React.ReactNode;
  isLoading?: boolean;
  iconPosition?: "left" | "right";
  colorPalette?: (typeof buttonColorPalette)[number];
  isIconButton?: boolean;
  label?: boolean;
} & ButtonVariantProps &
  ComponentProps<"button">;

export function Button({
  icon = null,
  variant,
  iconPosition = "left",
  colorPalette,
  size,
  children,
  isLoading = false,
  disabled = false,
  label = true,
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
      {!isLoading && icon && <span aria-hidden>{icon}</span>}
      <span
        className={css({ "&[data-loading=true]": { opacity: 0 } })}
        data-loading={isLoading}
        data-label={label}
      >
        {children}
      </span>
      {isLoading && <LoaderIcon />}
    </button>
  );
}
