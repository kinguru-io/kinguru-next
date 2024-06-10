import { ComponentPropsWithoutRef, ForwardedRef, forwardRef } from "react";
import { cx } from "styled-system/css";
import {
  input,
  select,
  type SelectVariantProps,
} from "~/styled-system/recipes";

export type SelectProps = SelectVariantProps &
  ComponentPropsWithoutRef<"select"> & {
    placeholder?: string;
  };

export const Select = forwardRef(function Select(
  { placeholder, children, value, defaultValue, ...props }: SelectProps,
  ref: ForwardedRef<HTMLSelectElement>,
) {
  const { outerWrapper, selectRoot } = select();
  const selectClass = cx(input(), selectRoot);

  const valueProp = value
    ? { value: value || "" }
    : { defaultValue: defaultValue || "" };

  return (
    <div className={outerWrapper}>
      <select ref={ref} className={selectClass} {...valueProp} {...props}>
        <option value="" disabled>
          {placeholder}
        </option>
        {children}
      </select>
    </div>
  );
});
