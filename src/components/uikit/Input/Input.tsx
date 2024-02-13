import { ComponentProps, LegacyRef, forwardRef } from "react";
import { input, type InputVariantProps } from "~/styled-system/recipes";

type InputProps = InputVariantProps & ComponentProps<"input">;

export const Input = forwardRef(function Input(
  { variant, ...restProps }: InputProps,
  ref: LegacyRef<HTMLInputElement>,
) {
  return <input ref={ref} className={input({ variant })} {...restProps} />;
});
