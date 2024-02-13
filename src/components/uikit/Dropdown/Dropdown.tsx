import React from "react";
import { customDivider } from "~/styled-system/patterns";
import { dropdown, DropdownVariantProps } from "~/styled-system/recipes";

type DropdownProps = {
  children: React.ReactNode[] | React.ReactNode;
} & DropdownVariantProps;

const DropdownContext = React.createContext({
  hidden: true,
  setHidden: (_value: boolean) => {},
});

export function Dropdown({ children, size }: DropdownProps) {
  const [hidden, setHidden] = React.useState(true);
  const classes = dropdown({ size });
  return (
    <DropdownContext.Provider value={{ hidden, setHidden }}>
      <div className={classes.dropdown}>{children}</div>
    </DropdownContext.Provider>
  );
}

export function DropdownMenu({ children, size }: DropdownProps) {
  const { hidden } = React.useContext(DropdownContext);
  const classes = dropdown({ size });
  return (
    <div
      className={classes.menu + " " + customDivider({})}
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
    <div role="button" onClick={clickHandler}>
      {children}
    </div>
  );
}
