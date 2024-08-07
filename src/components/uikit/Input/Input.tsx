import {
  type ComponentPropsWithoutRef,
  type ForwardedRef,
  forwardRef,
} from "react";
import { cx } from "~/styled-system/css";
import { input, type InputVariantProps } from "~/styled-system/recipes";

export type InputProps = InputVariantProps &
  Omit<ComponentPropsWithoutRef<"input">, "prefix"> & {
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
    "data-invalid"?: unknown;
    hideLabel?: boolean;
  };

export const Input = forwardRef(function Input(
  {
    variant,
    rounded,
    textCentered,
    className,
    prefix,
    suffix,
    hideLabel = false,
    ...restProps
  }: InputProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const classes = input({ variant, rounded, textCentered });
  const inputClassName = cx(className, classes.label);
  const {
    hidden,
    disabled,
    placeholder,
    "aria-invalid": ariaInvalid,
    "data-invalid": dataInvalid,
  } = restProps;
  const invalidTag = [ariaInvalid, dataInvalid].some(Boolean) && {
    "data-invalid": true,
  };

  return (
    <label
      className={inputClassName}
      data-disabled={disabled}
      hidden={hidden}
      {...invalidTag}
    >
      {prefix}
      <input ref={ref} className={cx("peer", classes.input)} {...restProps} />
      {!hideLabel && placeholder && (
        <span className={classes.placeholder}>{placeholder}</span>
      )}
      {suffix}
    </label>
  );
});
