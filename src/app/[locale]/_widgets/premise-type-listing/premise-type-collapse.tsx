"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Button, Collapse } from "@/components/uikit";
import { css } from "~/styled-system/css";

export function PremiseTypeCollapse({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations("main");
  const [isShown, setShownState] = useState(false);

  return (
    <>
      <Collapse isShown={isShown}>{children}</Collapse>
      <Button
        centered
        className={css({ marginBlockStart: { base: "6", sm: "8" } })}
        type="button"
        onClick={() => setShownState((prevState) => !prevState)}
        colorPalette="secondary"
      >
        {t(isShown ? "hide_shown" : "show_more")}
      </Button>
    </>
  );
}
