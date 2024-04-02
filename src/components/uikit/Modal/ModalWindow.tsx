"use client";

import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { RxCross2 } from "react-icons/rx";
import { ModalProps, useModal } from "./Modal";
import { Button } from "@/components/uikit";
import { css } from "~/styled-system/css";
import { Float } from "~/styled-system/jsx";

export function _ModalWindow({ children }: ModalProps) {
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
    document.body,
  );
}
