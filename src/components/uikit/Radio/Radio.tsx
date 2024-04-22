import { ComponentPropsWithoutRef, ForwardedRef, forwardRef } from "react";
import { radio, type RadioVariantProps } from "~/styled-system/recipes";

type RadioProps = Omit<ComponentPropsWithoutRef<"input">, "type" | "children"> &
  RadioVariantProps & {
    label?: string;
  };

export const Radio = forwardRef(function Radio(
  { label, ...props }: RadioProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const classes = radio();

  return (
    <label className={classes.root}>
      <input ref={ref} className="peer" type="radio" {...props} />
      <span className={classes.radio} />
      {label && <span className={classes.label}>{label}</span>}
    </label>
  );
});
