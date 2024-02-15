"use client";
import React from "react";
import { cx } from "~/styled-system/css";
import { customDivider } from "~/styled-system/patterns";
import { dropdown, DropdownVariantProps } from "~/styled-system/recipes";

type DropdownProps = {
  children: React.ReactNode[] | React.ReactNode;
} & DropdownVariantProps;

const DropdownContext = React.createContext({
  hidden: true,
  setHidden: (_value: boolean) => {},
  dropdownSlot: dropdown(),
});

export function Dropdown({ children, size = "sm" }: DropdownProps) {
  const [hidden, setHidden] = React.useState(true);
  const dropdownSlot = dropdown({ size });
  return (
    <DropdownContext.Provider value={{ hidden, setHidden, dropdownSlot }}>
      <div className={dropdownSlot.dropdown}>{children}</div>
    </DropdownContext.Provider>
  );
}

export function DropdownMenu({ children }: DropdownProps) {
  const { hidden, dropdownSlot } = React.useContext(DropdownContext);
  return (
    <div
      className={cx(dropdownSlot.menu, customDivider({}))}
      data-hidden={hidden}
    >
      {children}
    </div>
  );
}

export function DropdownInitiator({ children }: DropdownProps) {
  const { hidden, setHidden } = React.useContext(DropdownContext);

  const clickHandler = () => {
    setHidden(!hidden);
  };

  return (
    <div role="button" tabIndex={0} onClick={clickHandler}>
      {children}
    </div>
  );
}
