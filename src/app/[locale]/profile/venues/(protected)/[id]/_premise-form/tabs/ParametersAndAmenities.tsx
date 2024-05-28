import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

import { AmenitySelector } from "../AmenitySelector";
import { TabInnerSection } from "@/components/profile/profile-premise";
import { Input, Select, ErrorField } from "@/components/uikit";
import { CreatePremiseFormSchemaProps } from "@/lib/actions/premise/validation";
import { premiseTypes } from "@/lib/shared/config/premise-types";
import { CLEAR_ERROR_TIMEOUT_DURATION, getError } from "@/utils/forms/errors";
import { HStack, Stack } from "~/styled-system/jsx";

export default function ParametersAndAmenities() {
  const {
    register,
    clearErrors,
    formState: { errors },
  } = useFormContext<CreatePremiseFormSchemaProps>();
  const t = useTranslations("profile.premises.add");

  const formFieldPath = "parametersAndAmenities";

  useEffect(() => {
    const errorTimeout = setTimeout(
      () => clearErrors(`${formFieldPath}.amenities`),
      CLEAR_ERROR_TIMEOUT_DURATION,
    );
    return () => clearTimeout(errorTimeout);
  }, [errors]);

  return (
    <>
      <TabInnerSection>
        <h3>{t("fields.premise_parameters")}</h3>
        <Stack maxWidth="293px" whiteSpace="nowrap">
          <div>
            <Select
              placeholder={t("fields.type_placeholder")}
              data-invalid={getError(errors, `${formFieldPath}.type`)}
              {...register(`${formFieldPath}.type`)}
            >
              <PremiseTypeSelectOptions />
            </Select>
            <ErrorField error={errors.parametersAndAmenities?.type} />
          </div>
          <div>
            <HStack gap="10px">
              {t("fields.area_prefix")}
              <Input
                type="number"
                inputMode="decimal"
                step="0.01"
                placeholder="1000"
                data-invalid={getError(errors, `${formFieldPath}.area`)}
                {...register(`${formFieldPath}.area`, {
                  valueAsNumber: true,
                })}
              />
              <span>
                {t("fields.area_literal")}
                <sup>2</sup>
              </span>
            </HStack>
            <ErrorField error={errors.parametersAndAmenities?.area} />
          </div>
          <div>
            <HStack gap="10px">
              {t("fields.capacity_prefix")}
              <Input
                type="number"
                inputMode="numeric"
                placeholder="1000"
                data-invalid={getError(errors, `${formFieldPath}.capacity`)}
                {...register(`${formFieldPath}.capacity`, {
                  valueAsNumber: true,
                })}
              />
              {t("fields.capacity_literal")}
            </HStack>
            <ErrorField error={errors.parametersAndAmenities?.capacity} />
          </div>
        </Stack>
      </TabInnerSection>
      <TabInnerSection>
        <h3>{t("fields.amenities")}</h3>
        <p className="subheading">{t("fields.amenities_tip")}</p>
        <AmenitySelector />
        <ErrorField
          error={errors?.parametersAndAmenities?.amenities?.amenitiesError}
        />
      </TabInnerSection>
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
