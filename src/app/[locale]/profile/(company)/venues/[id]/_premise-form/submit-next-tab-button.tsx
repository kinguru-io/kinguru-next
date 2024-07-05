import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { Button, useTabs } from "@/components/uikit";

export function SubmitOrNextTabButton({
  lastTabIdx,
  tabs,
}: {
  lastTabIdx: number;
  tabs: any;
}) {
  const { activeTabIdx, setActiveTabIdx, setTabsVisited } = useTabs();
  const {
    setValue,
    formState: { isValid, isSubmitting },
  } = useFormContext();
  const t = useTranslations("profile.premises.add");

  const isLastTab = activeTabIdx === lastTabIdx;

  useEffect(() => {
    // using an effect to scroll to the top when the next tab is shown
    // due to undefined content height (temporary)
    window.scroll({ top: 0, behavior: "instant" });
  }, [activeTabIdx]);

  function setActiveForm() {
    const nextTabIdx = activeTabIdx + 1;
    setValue("formType", tabs[nextTabIdx].formType);
    setActiveTabIdx((prevIdx) => prevIdx + 1);
    setTabsVisited((prev) => [...prev, nextTabIdx]);
  }

  const buttonClicked = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (isValid) {
      if (!isLastTab) {
        e.preventDefault();
        setActiveForm();
      } else {
        return;
      }
    }
  };

  return (
    <Button
      type="submit"
      onClick={buttonClicked}
      isLoading={isSubmitting}
      centered
    >
      {t(isLastTab ? "submit_btn_label" : "next_group_btn_label")}
    </Button>
  );
}
