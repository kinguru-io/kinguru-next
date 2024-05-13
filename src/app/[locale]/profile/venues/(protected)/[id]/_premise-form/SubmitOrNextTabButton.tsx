import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { Button, useTabs } from "@/components/uikit";

export function SubmitOrNextTabButton({ lastTabIdx }: { lastTabIdx: number }) {
  const { activeTabIdx, setActiveTabIdx } = useTabs();
  const {
    formState: { isValid, isSubmitting },
  } = useFormContext();
  const t = useTranslations("profile.premises.add");

  const isLastTab = activeTabIdx === lastTabIdx;

  useEffect(() => {
    // using an effect to scroll to the top when the next tab is shown
    window.scrollTo({ top: 0 });
  }, [activeTabIdx]);

  const buttonClicked = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (isLastTab) return;

    e.preventDefault();
    setActiveTabIdx((prevIdx) => prevIdx + 1);
  };

  return (
    <Button
      size="md"
      type="submit"
      onClick={buttonClicked}
      isLoading={isSubmitting}
      disabled={isLastTab && !isValid}
      centered
    >
      {t(isLastTab ? "submit_btn_label" : "next_group_btn_label")}
    </Button>
  );
}
