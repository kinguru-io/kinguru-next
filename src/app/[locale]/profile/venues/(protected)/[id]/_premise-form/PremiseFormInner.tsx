"use client";

import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";
import { AmenitySelector } from "./AmenitySelector";
import { BookingCancelTermsRadioGroup } from "./BookingCancelTermsRadioGroup";
import { DiscountsSelector } from "./DiscountsSelector";
import { OpenHoursSelector } from "./OpenHoursSelector";
import { PremiseImageSelector } from "./PremiseImageSelector";
import { SubmitOrNextTabButton } from "./SubmitOrNextTabButton";
import { MapboxSearchBoxResponseProvider } from "@/components/common/maps/MapboxResponseProvider";
import { TabInnerSection } from "@/components/profile/profile-premise";
import {
  Tab,
  TabContent,
  TabList,
  TabsWrapper,
  Textarea,
  Input,
  Select,
  Button,
  ErrorField,
} from "@/components/uikit";
import type { CreatePremiseSchema } from "@/lib/actions/premise";
import { premiseTypes } from "@/lib/shared/config/premise-types";
import { css } from "~/styled-system/css";
import { HStack, Stack } from "~/styled-system/jsx";

export function PremiseFormInner({
  mapboxId,
  isEditing = false,
}: {
  mapboxId: string;
  isEditing?: boolean;
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext<CreatePremiseSchema>();
  const t = useTranslations("profile.premises.add");

  const tabs = [
    {
      label: t("groups.main_info"),
      content: (
        <>
          <TabInnerSection>
            <h3>
              {t(
                isEditing
                  ? "fields.name_and_description_editing"
                  : "fields.name_and_description",
              )}
            </h3>
            <div>
              <Input
                placeholder={t("fields.name_placeholder")}
                readOnly={isEditing}
                hidden={isEditing}
                data-invalid={errors}
                {...register("name")}
              />
              {errors.name && <ErrorField error={errors.name} />}
            </div>
            <div>
              <Textarea
                placeholder={t("fields.description_placeholder")}
                rows={9}
                data-invalid={errors}
                {...register("description")}
              />
              {errors.description && <ErrorField error={errors.description} />}
            </div>
          </TabInnerSection>
          <TabInnerSection>
            <h3>{t("fields.address")}</h3>
            <p>{t("fields.address_tip")}</p>
            <HStack
              justifyContent="space-between"
              css={{ "& > div": { flexBasis: "38%" } }}
            >
              <div>
                <Input
                  placeholder={t("fields.room_placeholder")}
                  data-invalid={errors}
                  {...register("room")}
                />
                {errors.room && <ErrorField error={errors.room} />}
              </div>
              <div>
                <Input
                  placeholder={t("fields.floor_placeholder")}
                  data-invalid={errors}
                  {...register("floor")}
                />
                {errors.floor && <ErrorField error={errors.floor} />}
              </div>
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
              {errors.type && <ErrorField error={errors.type} />}
              <HStack gap="10px">
                {t("fields.area_prefix")}
                <Input
                  type="number"
                  inputMode="decimal"
                  step="0.01"
                  placeholder="1000"
                  {...register("area", { min: 0, valueAsNumber: true })}
                />
                {errors.area && <ErrorField error={errors.area.message} />}
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
                {errors.capacity && <ErrorField error={errors.capacity} />}
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
          <MapboxSearchBoxResponseProvider mapboxId={mapboxId}>
            <OpenHoursSelector />
          </MapboxSearchBoxResponseProvider>
          <DiscountsSelector />
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
          {errors.rules && <ErrorField error={errors.rules} />}
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
    <TabsWrapper>
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
      {isEditing ? (
        <SaveChangesButton />
      ) : (
        <SubmitOrNextTabButton lastTabIdx={tabs.length - 1} />
      )}
    </TabsWrapper>
  );
}

function SaveChangesButton() {
  const {
    formState: { isValid, dirtyFields, isSubmitting },
  } = useFormContext();
  const t = useTranslations("profile.premises.add");

  const isSubmitEnabled = isValid && Object.values(dirtyFields).some(Boolean);

  return (
    <Button
      type="submit"
      size="md"
      isLoading={isSubmitting}
      disabled={!isSubmitEnabled}
      centered
    >
      {t("edit_btn_label")}
    </Button>
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
