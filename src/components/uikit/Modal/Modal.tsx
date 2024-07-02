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
} | null>(null);

export function useModal() {
  const context = useContext(ModalContext);

  if (context === null) {
    // TODO need to be refactored to fit SSR
    if (process.env.NODE_ENV === "development") {
      console.warn("useModal() must be used within a <Modal />");
    }

    return {
      open: false,
      setOpen: () => {},
      closable: true,
      setClosable: () => {},
    };
  }

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
