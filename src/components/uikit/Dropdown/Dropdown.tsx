import React from "react";
import { Divider } from "~/styled-system/jsx";
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

  const child =
    children instanceof Array
      ? children!.flatMap((elem) => [
          elem,
          <Divider color={"token(colors.neutral.4)"} />,
        ])
      : [];
  const dividedChildren = child.slice(0, child.length - 1);
  return (
    <div className={classes.menu} data-hidden={hidden}>
      {dividedChildren}
    </div>
  );
}

export function DropdownInitiator({ children }: DropdownProps) {
  const { hidden, setHidden } = React.useContext(DropdownContext);

  const clickHandler = () => {
    setHidden(!hidden);
  };

  return <div onClick={clickHandler}>{children}</div>;
}
