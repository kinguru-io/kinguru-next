import React from "react";
import { css } from "~/styled-system/css";
import { Divider } from "~/styled-system/jsx";
import { dropdown, DropdownVariantProps } from "~/styled-system/recipes";

type DropdownProps = {
  children: React.ReactNode[] | React.ReactNode;
} & DropdownVariantProps;

const DropdownContext = React.createContext({
  open: false,
  setOpen: (_value: boolean) => {},
});

export function Dropdown({ children }: DropdownProps) {
  const [open, setOpen] = React.useState(false);
  return (
    <DropdownContext.Provider value={{ open, setOpen }}>
      <div className={css({ position: "relative" })}>{children}</div>
    </DropdownContext.Provider>
  );
}

export function DropdownMenu({ children, size }: DropdownProps) {
  const { open } = React.useContext(DropdownContext);

  const child =
    children instanceof Array
      ? children!.flatMap((elem) => [
          elem,
          <Divider color={"token(colors.neutral.4)"} />,
        ])
      : [];
  const dividedChildren = child.slice(0, child.length - 1);
  return (
    <div className={dropdown({ size })} data-hidden={open}>
      {dividedChildren}
    </div>
  );
}

export function DropdownInitiator({ children }: DropdownProps) {
  const { open, setOpen } = React.useContext(DropdownContext);

  const clickHandler = () => {
    setOpen(!open);
  };

  return <div onClick={clickHandler}>{children}</div>;
}
