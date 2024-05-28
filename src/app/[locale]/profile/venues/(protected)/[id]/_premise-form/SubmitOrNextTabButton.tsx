import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { Button, useTabs } from "@/components/uikit";

export function SubmitOrNextTabButton({ lastTabIdx }: { lastTabIdx: number }) {
  const { activeTabIdx } = useTabs();
  const {
    formState: { isValid, isSubmitting },
  } = useFormContext();
  const t = useTranslations("profile.premises.add");

  const isLastTab = activeTabIdx === lastTabIdx;

  useEffect(() => {
    if (isValid) {
      // using an effect to scroll to the top when the next tab is shown
      window.scrollTo({ top: 0 });
    }
  }, [activeTabIdx]);

  return (
    <Button
      size="md"
      type="submit"
      isLoading={isSubmitting}
      // disabled={isLastTab && !isValid}
      centered
    >
      {t(isLastTab ? "submit_btn_label" : "next_group_btn_label")}
    </Button>
  );
}
