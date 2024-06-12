"use client";

import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";
import { InputSearchLocation } from "@/components/common/form/InputSearchLocation";
import { Dropdown, ErrorField, Textarea } from "@/components/uikit";
import { CreateVenueFormSchemaProps } from "@/lib/actions/venue";
import { getError } from "@/utils/forms/errors";
import { Box, VStack } from "~/styled-system/jsx";

interface LocationGroupProps {
  control: any;
}

export function LocationGroup({ control }: LocationGroupProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext<CreateVenueFormSchemaProps>();
  const t = useTranslations("profile.venues.add");

  return (
    <VStack gap="20px">
      <Dropdown size="full">
        <InputSearchLocation
          name="location.locationMapboxId"
          control={control}
          placeholder={t("fields.locationMapboxId_placeholder")}
        />
        <ErrorField error={errors?.location?.locationMapboxId} />
      </Dropdown>
      <p>{t("fields.locationTutorial_tip")}</p>
      <Box width="100%">
        <Textarea
          placeholder={t("fields.locationTutorial_placeholder")}
          rows={9}
          data-invalid={getError(errors, `location.locationTutorial`)}
          {...register("location.locationTutorial")}
        />
        <ErrorField error={errors?.location?.locationTutorial} />
      </Box>
    </VStack>
  );
}
