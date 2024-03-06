import { ComponentPropsWithoutRef, ForwardedRef, forwardRef } from "react";
import { cx } from "styled-system/css";
import {
  input,
  select,
  type SelectVariantProps,
} from "~/styled-system/recipes";

type SelectProps = SelectVariantProps &
  ComponentPropsWithoutRef<"select"> & {
    placeholder?: string;
  };

export const Select = forwardRef(function Select(
  { placeholder, children, ...props }: SelectProps,
  ref: ForwardedRef<HTMLSelectElement>,
) {
  const { outerWrapper, selectRoot } = select();
  const selectClass = cx(input(), selectRoot);

  return (
    <div className={outerWrapper}>
      <select ref={ref} className={selectClass} defaultValue={""} {...props}>
        <option disabled={true} value="">
          {placeholder}
        </option>
        {children}
      </select>
    </div>
  );
});
