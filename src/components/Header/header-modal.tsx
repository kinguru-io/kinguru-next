"use client";

import { useTranslations } from "next-intl";
import type React from "react";
import { LanguageDropdown } from "./language-dropdown";
import { Icon, Modal, ModalWindow, useModal } from "@/components/uikit";
import { useMediaQuery } from "@/hooks/use-media-query";
import { css } from "~/styled-system/css";
import { token } from "~/styled-system/tokens";

const mdMediaQuery = `(min-width:${token("breakpoints.md")})`;

export function HeaderModal({
  children,
  content,
}: {
  children?: React.ReactNode;
  content?: React.ReactNode;
}) {
  const isAboveMd = useMediaQuery(mdMediaQuery);

  if (isAboveMd === null) {
    return (
      <>
        {children}
        <Icon name="common/spinner" className={css({ animation: "spin" })} />
      </>
    );
  }

  if (isAboveMd) {
    return (
      <>
        {children}
        <LanguageDropdown />
      </>
    );
  }

  return (
    <Modal>
      {children}
      <MenuButton />
      <ModalWindow>{content}</ModalWindow>
    </Modal>
  );
}

function MenuButton() {
  const { setOpen } = useModal();
  const t = useTranslations("navbar");

  return (
    <button
      type="button"
      className={css({ "& > svg": { fontSize: "2xl" } })}
      onClick={() => setOpen((prev) => !prev)}
      aria-label={t("toggle_nav")}
    >
      <Icon name="action/menu" />
    </button>
  );
}
