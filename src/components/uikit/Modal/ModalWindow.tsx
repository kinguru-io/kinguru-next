"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useModal } from "./Modal";
import { Button, Icon } from "@/components/uikit";
import headerLogotype from "~/public/img/logotypes/header-logotype.svg";
import { css } from "~/styled-system/css";
import { Box, HStack } from "~/styled-system/jsx";

export function _ModalWindow({
  children,
  headerSlot,
}: {
  children: React.ReactNode;
  headerSlot?: React.ReactNode;
}) {
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

  // click outside handler in terms of <dialog />
  const dialogBackdropClicked = ({
    target,
  }: React.PointerEvent<HTMLDialogElement>) => {
    if (closable && target === dialogRef.current) {
      setOpen(false);
    }
  };

  if (!open) return null;

  return createPortal(
    <dialog
      ref={dialogRef}
      onClick={dialogBackdropClicked}
      onCancel={modalCancelled}
      className={css({
        bgColor: "light",
        maxWidth: "100vw",
        maxHeight: "full",
        width: "full",
        height: "full",
        md: {
          maxWidth: "breakpoint-md",
          maxHeight: "90vh",
          borderRadius: "sm",
          margin: "auto",
          height: "min-content",
          width: "max-content",
        },
      })}
    >
      <ModalHeader>
        {headerSlot}
        {closable && (
          <Button
            className={css({ padding: "2" })}
            colorPalette="dark"
            onClick={closeButtonClicked}
            aria-label="Close"
          >
            <Icon name="action/cross" />
          </Button>
        )}
      </ModalHeader>
      <Box padding="4">{children}</Box>
    </dialog>,
    document.body,
  );
}

function ModalHeader({ children }: { children: React.ReactNode }) {
  return (
    <HStack
      gap="2"
      padding="4"
      position="sticky"
      top="0"
      bgColor="light"
      boxShadow="header"
      zIndex="1"
      md={{
        "& > img": { display: "none" },
      }}
    >
      <Image
        src={headerLogotype.src}
        alt="Eventify"
        width="87"
        height="32"
        unoptimized
      />
      <HStack gap="6" marginInlineStart="auto">
        {children}
      </HStack>
    </HStack>
  );
}
