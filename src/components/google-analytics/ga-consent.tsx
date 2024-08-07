"use client";

import { differenceInDays } from "date-fns";
import { useTranslations, type RichTranslationValues } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import { Button, Modal, ModalWindow } from "@/components/uikit";
import { css } from "~/styled-system/css";
import { HStack } from "~/styled-system/jsx";

export function GoogleAnalyticsConsent() {
  const [didUserChose, setUserOption] = useState<boolean | null>(null);

  const consentButtonClicked = useCallback(
    (agreed: boolean) => {
      const flag = agreed ? "granted" : "denied";

      localStorage.setItem("ga_consent.date", new Date().toISOString());
      localStorage.setItem("ga_consent.analytics_storage", flag);

      window.gtag("consent", "update", { analytics_storage: flag });

      setUserOption(true);
    },
    [setUserOption],
  );

  // sync from local storage
  useEffect(() => {
    const date = localStorage.getItem("ga_consent.date");

    // do nothing if no consent was provided earlier or clear up if the consent is expired (default lifetime is 2 years)
    if (date === null || differenceInDays(date, new Date()) >= 365 * 2) {
      localStorage.removeItem("ga_consent.date");
      localStorage.removeItem("ga_consent.analytics_storage");

      window.gtag("consent", "update", { analytics_storage: "denied" });

      return;
    }

    const storageFlag = localStorage.getItem("ga_consent.analytics_storage");
    consentButtonClicked(storageFlag === "granted");
  }, [consentButtonClicked]);

  if (didUserChose) return null;

  return (
    <Modal initialOpenState={true}>
      <ConsentInner callback={consentButtonClicked} />
    </Modal>
  );
}

const consentRich: RichTranslationValues = {
  bold: (chunks) => <b>{chunks}</b>,
};
function ConsentInner({
  callback,
}: {
  callback: (agreed: boolean) => unknown;
}) {
  const t = useTranslations("cookie_consent");

  return (
    <ModalWindow type="drawer-bottom" hideCloseButton>
      <HStack gap="5" flexWrap="wrap">
        <span className={css({ whiteSpace: "pre-line", fontSize: "sm" })}>
          {t.rich("info", consentRich)}
        </span>
        <HStack
          css={{
            gap: "2",
            flexDirection: "row-reverse",
            marginInlineStart: "auto",
            "& > .button": { padding: "3" },
          }}
        >
          <Button type="button" onClick={() => callback(true)}>
            {t("accept")}
          </Button>
          <Button
            type="button"
            colorPalette="dark"
            onClick={() => callback(false)}
          >
            {t("decline")}
          </Button>
        </HStack>
      </HStack>
    </ModalWindow>
  );
}
