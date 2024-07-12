"use client";

import { useTranslations } from "next-intl";
import { useFormContext, type Control } from "react-hook-form";
import { InputSearchLocation } from "@/components/common/form/InputSearchLocation";
import { Dropdown, ErrorField, Textarea } from "@/components/uikit";
import type { CreateVenueFormSchemaProps } from "@/lib/actions/venue";
import { getError } from "@/utils/forms/errors";
import { css } from "~/styled-system/css";
import { Stack } from "~/styled-system/jsx";

export function LocationGroup({
  control,
}: {
  control: Control<CreateVenueFormSchemaProps>;
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext<CreateVenueFormSchemaProps>();
  const t = useTranslations("profile.venues.add");

  return (
    <>
      <Dropdown size="full">
        <InputSearchLocation
          name="location.locationMapboxId"
          control={control}
          placeholder={t("fields.locationMapboxId_placeholder")}
        />
        <ErrorField error={errors?.location?.locationMapboxId} />
      </Dropdown>

      <Stack gap="3">
        <p className={css({ fontSize: "sm" })}>
          {t("fields.locationTutorial_tip")}
        </p>
        <Textarea
          placeholder={t("fields.locationTutorial_placeholder")}
          rows={9}
          data-invalid={getError(errors, `location.locationTutorial`)}
          {...register("location.locationTutorial")}
        />
        <ErrorField error={errors?.location?.locationTutorial} />
      </Stack>
    </>
  );
}
