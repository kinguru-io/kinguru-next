"use client";

import { useTranslations } from "next-intl";
import { useEffect } from "react";
import {
  ArrowIcon,
  Button,
  Icon,
  Modal,
  ModalWindow,
  useModal,
} from "@/components/uikit";
import { useMediaQuery } from "@/hooks/use-media-query";
import { css } from "~/styled-system/css";
import { token } from "~/styled-system/tokens";

const mdMediaQuery = `(min-width:${token("breakpoints.md")})`;

export function ProfileMenuModal({
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback: React.ReactNode;
}) {
  const isAboveMd = useMediaQuery(mdMediaQuery);

  if (isAboveMd === null) {
    return <>{fallback}</>;
  }

  if (isAboveMd) {
    return <>{children}</>;
  }

  return (
    <Modal>
      <MenuToggle />
      <ModalWindow>{children}</ModalWindow>
    </Modal>
  );
}

function MenuToggle() {
  const t = useTranslations("profile.menu");
  const { setOpen } = useModal();

  // `expanded` stands for keeping copyright visible due to fixed button position somewhere (e.g. mobile profile)
  // TODO may be adjusted but I didn't manage to find correct way to load a button at the bottom of the footer
  useEffect(() => {
    const footer = document.body.querySelector("footer");

    if (!footer) return;

    footer.setAttribute("data-state", "expanded");
    return () => {
      footer.removeAttribute("data-state");
    };
  }, []);

  return (
    <Button
      className={css({
        position: "fixed",
        bottom: "0",
        insetInline: "0",
        zIndex: "1",
        borderRadius: "{radii.xl} {radii.xl} 0 0",
        paddingBlock: "3",
        "& > [data-label=true]": {
          display: "inline-flex",
          flexBasis: "full",
          justifyContent: "space-between",
        },
      })}
      onClick={() => setOpen((prev) => !prev)}
      icon={<Icon name="action/menu" className={css({ fontSize: "xl" })} />}
    >
      {t("menu_label")} <ArrowIcon direction="right" />
    </Button>
  );
}
