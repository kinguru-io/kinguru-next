import { type ComponentPropsWithoutRef, ForwardedRef, forwardRef } from "react";
import { Icon } from "@/components/uikit";
import { cx } from "~/styled-system/css";
import { select, type SelectVariantProps } from "~/styled-system/recipes";

export type SelectProps = SelectVariantProps &
  ComponentPropsWithoutRef<"select"> & {
    icon?: React.ReactNode;
    placeholder?: string;
    hideLabel?: boolean;
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
    hideLabel = false,
    ...props
  }: SelectProps,
  ref: ForwardedRef<HTMLSelectElement>,
) {
  const classes = select({ rounded, withIcon: Boolean(icon) });

  const valueProp = value
    ? { value: value || "" }
    : { defaultValue: defaultValue || "" };

  return (
    <label className={classes.outerWrapper}>
      {icon && <span className={classes.icon}>{icon}</span>}
      <select
        ref={ref}
        className={cx("peer", classes.selectRoot)}
        {...valueProp}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {children}
      </select>
      {!hideLabel && placeholder && (
        <span className={classes.placeholder}>{placeholder}</span>
      )}
      <Icon name="action/arrow" className={classes.arrow} />
    </label>
  );
});
