import { ComponentPropsWithoutRef } from "react";
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

export function Select({ placeholder, children, ...props }: SelectProps) {
  const { outerWrapper, selectRoot } = select();
  const selectClass = cx(input(), selectRoot);

  return (
    <div className={outerWrapper}>
      <select className={selectClass} {...props}>
        {placeholder && (
          <option value="" selected disabled>
            {placeholder}
          </option>
        )}
        {children}
      </select>
    </div>
  );
}
