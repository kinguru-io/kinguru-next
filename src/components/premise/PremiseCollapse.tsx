"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Button, Collapse } from "@/components/uikit";

export function PremiseCollapse({ children }: { children: React.ReactNode }) {
  const [isShown, setShownState] = useState(false);
  const t = useTranslations("premise");

  return (
    <>
      <Collapse isShown={isShown}>{children}</Collapse>
      <Button
        onClick={() => setShownState((prev) => !prev)}
        colorPalette="secondary"
        centered
      >
        {isShown ? t("hide") : t("see_all")}
      </Button>
    </>
  );
}
