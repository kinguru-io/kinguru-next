"use client";

import {
  type Dispatch,
  type SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

export type ModalProps = {
  children: React.ReactNode;
};

const ModalContext = createContext<{
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  closable: boolean;
  setClosable: Dispatch<SetStateAction<boolean>>;
}>({
  open: false,
  setOpen: () => {},
  closable: true,
  setClosable: () => {},
});

export function useModal() {
  const context = useContext(ModalContext);
  return context;
}

export function Modal({ children }: ModalProps) {
  const [open, setOpen] = useState(false);
  const [closable, setClosable] = useState(true);

  return (
    <ModalContext.Provider value={{ open, setOpen, closable, setClosable }}>
      {children}
    </ModalContext.Provider>
  );
}

export function ModalInitiator({ children }: ModalProps) {
  const { setOpen, open } = useModal();

  return <div onClick={() => setOpen(!open)}>{children}</div>;
}
