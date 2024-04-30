"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { Premise } from "@prisma/client";
import { useTranslations } from "next-intl";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import toast from "react-hot-toast";
import { AmenitySelector } from "./AmenitySelector";
import { BookingCancelTermsRadioGroup } from "./BookingCancelTermsRadioGroup";
import { OpenHoursSelector } from "./OpenHoursSelector";
import { PremiseImageSelector } from "./PremiseImageSelector";
import { SubmitOrNextTabButton } from "./SubmitOrNextTabButton";
import { TabInnerSection } from "@/components/profile/profile-premise";
import {
  Tab,
  TabContent,
  TabList,
  TabsWrapper,
  Textarea,
  Input,
  Select,
} from "@/components/uikit";
import {
  createPremiseSchema,
  type CreatePremiseAction,
  type CreatePremiseSchema,
} from "@/lib/actions/premise";
import { amenitiesTags } from "@/lib/shared/config/amenities";
import { premiseTypes } from "@/lib/shared/config/premise-types";
import { useRouter } from "@/navigation";
import { css } from "~/styled-system/css";
import { HStack, Stack } from "~/styled-system/jsx";

export function AddPremiseForm({
  createPremiseAction,
  venueId,
}: {
  createPremiseAction: CreatePremiseAction;
  venueId: string;
}) {
  const { push } = useRouter();
  const methods = useForm<CreatePremiseSchema>({
    mode: "onChange",
    resolver: zodResolver(createPremiseSchema),
  });

  const formSubmitted = async (payload: CreatePremiseSchema) => {
    const response = await createPremiseAction(payload, venueId);
    if (!response) return;

    const { status, message } = response;

    if (status === "error") {
      toast.error(message);
    }

    if (status === "success") {
      toast.success(message);
      push(`/profile/venues/${venueId}`);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        // `action` prop isn't working as expected since <TabsContent /> is rendering only the current tab
        // The form is really complex, so `display: none` isn't used. Btw `next/submit` button requires JS too
        onSubmit={methods.handleSubmit(formSubmitted)}
      >
        <TabsWrapper>
          <AddPremiseFormInner />
        </TabsWrapper>
      </form>
    </FormProvider>
  );
}

function AddPremiseFormInner() {
  const { register } = useFormContext<CreatePremiseSchema>();
  const t = useTranslations("profile.premises.add");

  const tabs = [
    {
      label: t("groups.main_info"),
      content: (
        <>
          <TabInnerSection>
            <h3>{t("fields.name_and_description")}</h3>
            <Input
              placeholder={t("fields.name_placeholder")}
              {...register("name")}
            />
            <Textarea
              placeholder={t("fields.description_placeholder")}
              rows={9}
              {...register("description")}
            />
          </TabInnerSection>
          <TabInnerSection>
            <h3>{t("fields.address")}</h3>
            <p>{t("fields.address_tip")}</p>
            <HStack
              justifyContent="space-between"
              css={{ "& > .input": { flexBasis: "38%" } }}
            >
              <Input
                placeholder={t("fields.room_placeholder")}
                {...register("room")}
              />
              <Input
                placeholder={t("fields.floor_placeholder")}
                {...register("floor")}
              />
            </HStack>
          </TabInnerSection>
        </>
      ),
    },
    {
      label: t("groups.photo"),
      content: (
        <TabInnerSection fullWidthContent>
          <h3>{t("fields.photo")}</h3>
          <p className="subheading">{t("fields.photo_tip")}</p>
          <PremiseImageSelector />
        </TabInnerSection>
      ),
    },
    {
      label: t("groups.amenities"),
      content: (
        <>
          <TabInnerSection>
            <h3>{t("fields.premise_parameters")}</h3>
            <Stack maxWidth="293px" whiteSpace="nowrap">
              <Select
                placeholder={t("fields.type_placeholder")}
                {...register("type")}
              >
                <PremiseTypeSelectOptions />
              </Select>
              <HStack gap="10px">
                {t("fields.area_prefix")}
                <Input
                  type="number"
                  inputMode="decimal"
                  step="0.01"
                  placeholder="1000"
                  {...register("area", { min: 0, valueAsNumber: true })}
                />
                <span>
                  {t("fields.area_literal")}
                  <sup>2</sup>
                </span>
              </HStack>
              <HStack gap="10px">
                {t("fields.capacity_prefix")}
                <Input
                  type="number"
                  inputMode="numeric"
                  placeholder="1000"
                  {...register("capacity", { min: 0, valueAsNumber: true })}
                />
                {t("fields.capacity_literal")}
              </HStack>
            </Stack>
          </TabInnerSection>
          <TabInnerSection>
            <h3>{t("fields.amenities")}</h3>
            <p className="subheading">{t("fields.amenities_tip")}</p>
            <AmenitySelector />
          </TabInnerSection>
        </>
      ),
    },
    {
      label: t("groups.open_hours"),
      content: (
        <>
          <TabInnerSection>
            <h3>{t("fields.open_hours")}</h3>
            <p
              className={css({
                whiteSpace: "pre-line",
                "& > b": { fontSize: "18px" },
              })}
            >
              {t.rich("fields.open_hours_example", {
                bold: (chunks) => <b>{chunks}</b>,
              })}
            </p>
          </TabInnerSection>
          <OpenHoursSelector />
        </>
      ),
    },
    {
      label: t("groups.rules"),
      content: (
        <TabInnerSection>
          <h3>{t("fields.rules")}</h3>
          <p className="subheading">{t("fields.rules_tip")}</p>
          <Textarea
            placeholder={t("fields.rules_placeholder")}
            rows={12}
            {...register("rules")}
          />
        </TabInnerSection>
      ),
    },
    {
      label: t("groups.booking_cancel_terms"),
      content: (
        <TabInnerSection>
          <h3>{t("fields.booking_cancel_terms")}</h3>
          <p className="subheading">{t("fields.booking_cancel_terms_tip")}</p>
          <BookingCancelTermsRadioGroup />
        </TabInnerSection>
      ),
    },
  ];

  return (
    <>
      <TabList overflowX="auto" marginBlockEnd="50px">
        {tabs.map(({ label }, i) => (
          <Tab key={label} tabIdx={i} label={label} variant="line-below" />
        ))}
      </TabList>
      <TabContent
        tabList={tabs}
        display="flex"
        flexDirection="column"
        gap="40px"
        marginBlockEnd="40px"
      />
      <SubmitOrNextTabButton lastTabIdx={tabs.length - 1} />
    </>
  );
}

function PremiseTypeSelectOptions() {
  const t = useTranslations("premise_types");

  return premiseTypes.map((premiseType) => (
    <option key={premiseType} value={premiseType}>
      {t(premiseType)}
    </option>
  ));
}

function getDefaultFormAmenities(premiseAmenities?: Premise["amenities"]) {
  return Object.values(amenitiesTags)
    .flat()
    .reduce(
      (defaultAmenities, amenity) => {
        defaultAmenities[amenity] = premiseAmenities?.includes(amenity);
        return defaultAmenities;
      },
      {} as CreatePremiseSchema["amenities"],
    );
}
