import { ComponentPropsWithoutRef, ForwardedRef, forwardRef } from "react";
import { checkbox, type CheckboxVariantProps } from "~/styled-system/recipes";

type CheckboxProps = Omit<
  ComponentPropsWithoutRef<"input">,
  "type" | "children"
> &
  CheckboxVariantProps & {
    label?: string;
  };

export const Checkbox = forwardRef(function Checkbox(
  { label, ...props }: CheckboxProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const classes = checkbox();
  return (
    <label className={classes.root}>
      <input ref={ref} className="peer" type="checkbox" {...props} />
      <span className={classes.checkbox} />
      <span className={classes.label}>{label}</span>
    </label>
  );
});
