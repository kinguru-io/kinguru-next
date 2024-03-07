import { ComponentPropsWithoutRef } from "react";
import { checkbox, type CheckboxVariantProps } from "~/styled-system/recipes";

type CheckboxProps = Omit<
  ComponentPropsWithoutRef<"input">,
  "type" | "children"
> &
  CheckboxVariantProps & {
    label?: string;
  };

export function Checkbox({ label, ...props }: CheckboxProps) {
  const classes = checkbox();
  return (
    <label className={classes.root}>
      <input className="peer" type="checkbox" {...props} />
      <span className={classes.checkbox} />
      <span className={classes.label}>{label}</span>
    </label>
  );
}
