"use client";

import { useTranslations } from "next-intl";
import { useCallback } from "react";
import { Button, Icon, Modal, ModalWindow, useModal } from "@/components/uikit";
import { useMediaQuery } from "@/hooks/use-media-query";
import { css } from "~/styled-system/css";
import { HStack } from "~/styled-system/jsx";
import { token } from "~/styled-system/tokens";

const mdMediaQuery = `(min-width:${token("breakpoints.md")})`;

export function FilterModal({
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback: React.ReactNode;
}) {
  const isBelowMd = useMediaQuery(mdMediaQuery);

  if (isBelowMd === null) {
    return <>{fallback}</>;
  }

  if (!isBelowMd) {
    return (
      <Modal>
        <FilterToggle />
        <ModalWindow>{children}</ModalWindow>
      </Modal>
    );
  }

  return <>{children}</>;
}

function FilterToggle() {
  const t = useTranslations("filters");
  const { setOpen } = useModal();

  return (
    <Button
      className={css({ alignSelf: "flex-start" })}
      onClick={() => setOpen((prev) => !prev)}
      icon={<Icon name="common/settings" className={css({ fontSize: "xl" })} />}
    >
      {t("all")}
    </Button>
  );
}

export function FilterControlWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const modalContext = useModal();

  const anyButtonInsideClicked = useCallback(() => {
    modalContext.setOpen((prev) => !prev);
  }, [modalContext]);

  return (
    <HStack
      gap="2"
      position="sticky"
      bottom="4"
      justifyContent="center"
      mdDown={{
        boxShadow: "0 0 46px 10px {colors.light}",
        bgColor: "rgba(255, 255, 255, 0.67)",
        paddingBlockStart: "4",
      }}
      onClick={anyButtonInsideClicked}
    >
      {children}
    </HStack>
  );
}
