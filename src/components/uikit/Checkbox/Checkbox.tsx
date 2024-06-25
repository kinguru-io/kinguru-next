import {
  type ComponentPropsWithoutRef,
  type ForwardedRef,
  forwardRef,
} from "react";
import { toggle } from "~/styled-system/recipes";

type CheckboxProps = Omit<
  ComponentPropsWithoutRef<"input">,
  "type" | "children"
> & { label: string };

export const Checkbox = forwardRef(function Checkbox(
  { label, ...props }: CheckboxProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const classes = toggle();
  return (
    <label className={classes.root}>
      <input ref={ref} className="peer" type="checkbox" {...props} />
      <span className={classes.toggle} />
      <span className={classes.label}>{label}</span>
    </label>
  );
});
