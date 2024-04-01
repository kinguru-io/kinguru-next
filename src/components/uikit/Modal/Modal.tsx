"use client";

import {
  type Dispatch,
  type SetStateAction,
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";
import { createPortal } from "react-dom";
import { RxCross2 } from "react-icons/rx";

import { Button } from "@/components/uikit";
import { css } from "~/styled-system/css";
import { Float } from "~/styled-system/jsx";

type ModalProps = {
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

export function ModalWindow({ children }: ModalProps) {
  const { open, setOpen, closable } = useModal();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!dialogRef.current) return;

    if (open) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [open]);

  const closeButtonClicked = () => {
    setOpen(false);
  };

  return createPortal(
    <dialog
      ref={dialogRef}
      className={css({
        bg: "neutral.3",
        borderRadius: "10px",
        top: "50%",
        left: "50%",
        transform: "translateX(-50%) translateY(-50%)",
        p: "18px",
        overflow: "initial",
      })}
    >
      {children}
      {closable && (
        <Float
          placement="top-end"
          offset="-10px"
          fontSize="10px"
          translate="none"
        >
          <Button
            size="iconOnly"
            variant="solid"
            colorPalette="danger"
            onClick={closeButtonClicked}
            icon={<RxCross2 />}
          />
        </Float>
      )}
    </dialog>,
    globalThis.document.body,
  );
}
