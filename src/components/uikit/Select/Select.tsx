import { type ComponentPropsWithoutRef, ForwardedRef, forwardRef } from "react";
import { Icon } from "@/components/uikit";
import { select, type SelectVariantProps } from "~/styled-system/recipes";

export type SelectProps = SelectVariantProps &
  ComponentPropsWithoutRef<"select"> & {
    icon?: React.ReactNode;
    placeholder?: string;
  };

export const Select = forwardRef(function Select(
  {
    icon,
    placeholder,
    children,
    value,
    defaultValue,
    className,
    rounded,
    ...props
  }: SelectProps,
  ref: ForwardedRef<HTMLSelectElement>,
) {
  const classes = select({ rounded, withIcon: Boolean(icon) });

  const valueProp = value
    ? { value: value || "" }
    : { defaultValue: defaultValue || "" };

  return (
    <span className={classes.outerWrapper}>
      {icon && <span className={classes.icon}>{icon}</span>}
      <select
        ref={ref}
        className={classes.selectRoot}
        {...valueProp}
        {...props}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {children}
      </select>
      <Icon name="action/arrow" className={classes.arrow} />
    </span>
  );
});
