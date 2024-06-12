"use client";

import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { SubmitOrNextTabButton } from "./SubmitOrNextTabButton";
import BookingCancelTerm from "./tabs/BookingCancelTerm";
import MainInformation from "./tabs/MainInformation";
import OpenHoursAndPrices from "./tabs/OpenHoursAndPrices";
import ParametersAndAmenities from "./tabs/ParametersAndAmenities";
import Resources from "./tabs/Resources";
import Rules from "./tabs/Rules";
import {
  Tab,
  TabContent,
  TabList,
  TabsWrapper,
  Button,
} from "@/components/uikit";
import { PassVisitedTabsProvider } from "@/components/uikit/Tabs/Tabs";
import type { CreatePremiseFormSchemaProps } from "@/lib/actions/premise";
import { CreatePremiseFormTypeEnum } from "@/lib/actions/premise/validation";

export function PremiseFormInner({ mapboxId }: { mapboxId: string }) {
  const { setValue } = useFormContext<CreatePremiseFormSchemaProps>();
  const t = useTranslations("profile.premises.add");
  const pathname = usePathname();
  const isEditing = pathname?.includes("edit-premise");

  function setActiveForm(tabIdx: number) {
    setValue("formType", tabs[tabIdx].formType);
  }

  const tabs = [
    {
      label: t("groups.main_info"),
      content: <MainInformation isEditing={isEditing} />,
      formType: CreatePremiseFormTypeEnum.MainInformation,
    },
    {
      label: t("groups.photo"),
      content: <Resources />,
      formType: CreatePremiseFormTypeEnum.Resources,
    },
    {
      label: t("groups.amenities"),
      content: <ParametersAndAmenities />,
      formType: CreatePremiseFormTypeEnum.ParametersAndAmenities,
    },
    {
      label: t("groups.open_hours"),
      content: <OpenHoursAndPrices mapboxId={mapboxId} />,
      formType: CreatePremiseFormTypeEnum.OpenHoursAndPrice,
    },
    {
      label: t("groups.rules"),
      content: <Rules />,
      formType: CreatePremiseFormTypeEnum.Rules,
    },
    {
      label: t("groups.booking_cancel_terms"),
      content: <BookingCancelTerm />,
      formType: CreatePremiseFormTypeEnum.BookingCancelTerm,
    },
  ];

  useEffect(() => {
    return () => {
      PassVisitedTabsProvider.resetTabsVisited();
    };
  }, []);

  return (
    <TabsWrapper>
      <TabList overflowX="auto" marginBlockEnd="50px">
        {tabs.map(({ label }, i) => (
          <Tab
            key={`${label}_${isEditing}`}
            setActiveForm={setActiveForm}
            tabIdx={i}
            label={label}
            variant="line-below"
            isDisabled={
              !isEditing && !PassVisitedTabsProvider.tabsVisited.includes(i)
            }
          />
        ))}
      </TabList>
      <TabContent
        tabList={tabs}
        display="flex"
        flexDirection="column"
        gap="40px"
        marginBlockEnd="40px"
      />
      {isEditing ? (
        <SaveChangesButton />
      ) : (
        <SubmitOrNextTabButton lastTabIdx={tabs.length - 1} tabs={tabs} />
      )}
    </TabsWrapper>
  );
}

function SaveChangesButton() {
  const {
    formState: { isSubmitting },
  } = useFormContext();
  const t = useTranslations("profile.premises.add");

  return (
    <Button type="submit" size="md" isLoading={isSubmitting} centered>
      {t("edit_btn_label")}
    </Button>
  );
}
