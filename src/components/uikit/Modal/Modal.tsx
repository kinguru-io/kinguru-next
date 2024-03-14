import React from "react";
import { css } from "~/styled-system/css";

type ModalProps = {
  children: React.ReactNode;
};

const DropdownContext = React.createContext({
  hidden: true,
  setHidden: (_value: boolean) => {},
});

export function Modal({ children }: ModalProps) {
  const [hidden, setHidden] = React.useState(true);

  return (
    <DropdownContext.Provider value={{ hidden, setHidden }}>
      {children}
    </DropdownContext.Provider>
  );
}

export function ModalInitiator({ children }: ModalProps) {
  const { setHidden, hidden } = React.useContext(DropdownContext);
  return <div onClick={() => setHidden(!hidden)}>{children}</div>;
}

export function ModalWindow({ children }: ModalProps) {
  const { hidden } = React.useContext(DropdownContext);
  return (
    <dialog
      open={hidden}
      className={css({ bg: "gray", w: "300px", m: "auto", h: "100px" })}
    >
      {children}
    </dialog>
  );
}
