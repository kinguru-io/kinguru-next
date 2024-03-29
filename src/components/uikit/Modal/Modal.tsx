"use client";

import React from "react";
import { RxCross2 } from "react-icons/rx";
import { css } from "~/styled-system/css";
import { Float } from "~/styled-system/jsx";

type ModalProps = {
  children: React.ReactNode;
};

const ModalContext = React.createContext({
  open: false,
  setOpen: (_value: boolean) => {},
});

export function useModal() {
  const context = React.useContext(ModalContext);
  return context;
}

export function Modal({ children }: ModalProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <ModalContext.Provider value={{ open, setOpen }}>
      {children}
    </ModalContext.Provider>
  );
}

export function ModalInitiator({ children }: ModalProps) {
  const { setOpen, open } = useModal();

  return <div onClick={() => setOpen(!open)}>{children}</div>;
}

export function ModalWindow({ children }: ModalProps) {
  const { open, setOpen } = useModal();

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
