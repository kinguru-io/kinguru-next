import { ComponentPropsWithoutRef, ForwardedRef, forwardRef } from "react";
import { input, type InputVariantProps } from "~/styled-system/recipes";

export type InputProps = InputVariantProps & ComponentPropsWithoutRef<"input">;

export const Input = forwardRef(function Input(
  { variant, ...restProps }: InputProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  return <input ref={ref} className={input({ variant })} {...restProps} />;
});
