import { ComponentProps } from "react";
import { input, type InputVariantProps } from "~/styled-system/recipes";

type InputProps = InputVariantProps & ComponentProps<"input">;

export function Input({ variant, ...restProps }: InputProps) {
  return <input className={input({ variant })} {...restProps} />;
}
