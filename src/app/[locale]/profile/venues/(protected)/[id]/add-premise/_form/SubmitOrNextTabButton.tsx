"use client";

import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";
import { Button, useTabs } from "@/components/uikit";
import { InlineBox } from "~/styled-system/jsx";

export function SubmitOrNextTabButton({ lastTabIdx }: { lastTabIdx: number }) {
  const { activeTabIdx, setActiveTabIdx } = useTabs();
  const {
    formState: { isValid, isSubmitting },
  } = useFormContext();
  const t = useTranslations("profile.premises.add");

  const isLastTab = activeTabIdx === lastTabIdx;

  const buttonClicked = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isLastTab) return;

    e.preventDefault();
    setActiveTabIdx((prevIdx) => prevIdx + 1);
  };

  return (
    <InlineBox css={{ "& > .button": { marginInline: "auto" } }}>
      <Button
        size="md"
        type="submit"
        onClick={buttonClicked}
        isLoading={isSubmitting}
        disabled={isLastTab && !isValid}
      >
        {t(isLastTab ? "submit_btn_label" : "next_group_btn_label")}
      </Button>
    </InlineBox>
  );
}
