import {
  type ComponentPropsWithoutRef,
  type ForwardedRef,
  forwardRef,
} from "react";
import { toggle } from "~/styled-system/recipes";

type RadioProps = Omit<
  ComponentPropsWithoutRef<"input">,
  "type" | "children"
> & { label: string };

export const Radio = forwardRef(function Radio(
  { label, ...props }: RadioProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const classes = toggle({ rounded: true });

  return (
    <label className={classes.root}>
      <input ref={ref} className="peer" type="radio" {...props} />
      <span className={classes.toggle} />
      {label && <span className={classes.label}>{label}</span>}
    </label>
  );
});
