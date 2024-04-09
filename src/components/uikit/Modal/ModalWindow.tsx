"use client";

import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { RxCross2 } from "react-icons/rx";
import { ModalProps, useModal } from "./Modal";
import { Button } from "@/components/uikit";
import { css } from "~/styled-system/css";
import { Box, Float } from "~/styled-system/jsx";

export function _ModalWindow({ children }: ModalProps) {
  const { open, setOpen, closable } = useModal();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialogElement = dialogRef.current;

    if (!dialogElement) return;

    if (open) {
      dialogElement.showModal();
    } else {
      dialogElement.close();
    }
  }, [open]);

  const closeButtonClicked = () => {
    setOpen(false);
  };

  const modalCancelled = (e: React.SyntheticEvent<HTMLDialogElement>) => {
    if (closable) {
      setOpen(false);
    } else {
      e.preventDefault();
    }
  };

  return createPortal(
    <dialog
      ref={dialogRef}
      onCancel={modalCancelled}
      className={css({
        bg: "neutral.3",
        borderRadius: "10px",
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translateX(-50%) translateY(-50%)",
        p: "18px",
        overflow: "initial",
      })}
    >
      <Box overflowY="auto" maxHeight="90vh">
        {children}
      </Box>
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
