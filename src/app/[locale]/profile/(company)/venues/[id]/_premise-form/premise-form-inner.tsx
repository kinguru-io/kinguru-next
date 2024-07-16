"use client";

import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { SubmitOrNextTabButton } from "./submit-next-tab-button";
import { BookingCancelTerm } from "./tabs/booking-cancel-term";
import { MainInformation } from "./tabs/main-information";
import { OpenHoursAndPrices } from "./tabs/open-hours-and-prices";
import { ParametersAndAmenities } from "./tabs/parameters-and-amenities";
import { Resources } from "./tabs/resources";
import { Rules } from "./tabs/rules";
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
import { css } from "~/styled-system/css";

export function PremiseFormInner({ editMode = false }: { editMode?: boolean }) {
  const { setValue } = useFormContext<CreatePremiseFormSchemaProps>();
  const t = useTranslations("profile.premises.add");

  function setActiveForm(tabIdx: number) {
    setValue("formType", tabs[tabIdx].formType);
  }

  const tabs = [
    {
      label: t("groups.main_info"),
      content: <MainInformation editMode={editMode} />,
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
      content: <OpenHoursAndPrices />,
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
      <TabList
        className={css({ caretColor: "red.400" })}
        css={{
          "&::-webkit-scrollbar-track": {
            marginInline: "0.5",
            boxShadow: "inset 0 0 2px rgba(0,0,0,0.2)",
            borderRadius: "lg",
            bgColor: "gray.300",
          },
          "&::-webkit-scrollbar": {
            width: "15",
            height: "2",
            bgColor: "gray.300",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundClip: "padding-box",
            bgColor: "tertiary",
            borderRadius: "lg",
          },
          md: { marginInline: "8", marginBlockEnd: "5" },
        }}
      >
        {tabs.map(({ label }, i) => (
          <Tab
            key={label}
            setActiveForm={setActiveForm}
            tabIdx={i}
            label={label}
            isDisabled={
              !editMode && !PassVisitedTabsProvider.tabsVisited.includes(i)
            }
          />
        ))}
      </TabList>
      <TabContent
        tabList={tabs}
        css={{
          display: "flex",
          flexDirection: "column",
          gap: "6",
          marginBlockEnd: "6",
        }}
      />
      {editMode ? (
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
    <Button type="submit" isLoading={isSubmitting} centered>
      {t("edit_btn_label")}
    </Button>
  );
}
