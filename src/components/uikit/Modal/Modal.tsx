import React from "react";
import { RxCross2 } from "react-icons/rx";
import { css } from "~/styled-system/css";
import { Float } from "~/styled-system/jsx";

type ModalProps = {
  children: React.ReactNode;
};

export const ModalContext = React.createContext({
  open: false,
  setOpen: (_value: boolean) => {},
});

export function Modal({ children }: ModalProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <ModalContext.Provider value={{ open, setOpen }}>
      {children}
    </ModalContext.Provider>
  );
}

export function ModalInitiator({ children }: ModalProps) {
  const { setOpen, open } = React.useContext(ModalContext);

  return <div onClick={() => setOpen(!open)}>{children}</div>;
}

export function ModalWindow({ children }: ModalProps) {
  const { open, setOpen } = React.useContext(ModalContext);
  return (
    <dialog
      open={open}
      className={css({
        zIndex: "modal",
        bg: "neutral.3",
        position: "fixed",
        borderRadius: "10px",
        top: "50%",
        left: "50%",
        transform: "translateX(-50%) translateY(-50%)",
        p: "18px",
      })}
    >
      <Float placement="top-end" offset="18px" translate="none">
        <RxCross2 size="20px" onClick={() => setOpen(!open)} />
      </Float>
      {children}
    </dialog>
  );
}
