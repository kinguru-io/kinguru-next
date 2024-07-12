import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";

import { AmenitySelector } from "../amenity-selector";
import { SubSection } from "@/components/common/cards/sub-section";
import { Input, Select, ErrorField } from "@/components/uikit";
import { CreatePremiseFormSchemaProps } from "@/lib/actions/premise/validation";
import { premiseTypes } from "@/lib/shared/config/premise-types";
import { getError } from "@/utils/forms/errors";
import { Flex } from "~/styled-system/jsx";

export function ParametersAndAmenities() {
  const {
    register,
    formState: { errors },
  } = useFormContext<CreatePremiseFormSchemaProps>();
  const t = useTranslations("profile.premises.add");

  const formFieldPath = "parametersAndAmenities";

  return (
    <>
      <SubSection>
        <h2 className="title">{t("fields.premise_parameters")}</h2>
        <Flex
          css={{
            gap: "2",
            flexWrap: "wrap",
            "& > div": {
              display: "flex",
              flexGrow: "1",
              flexBasis: "60",
            },
          }}
        >
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
            <Input
              type="number"
              inputMode="decimal"
              step="0.01"
              placeholder={t("fields.area_prefix")}
              data-invalid={getError(errors, `${formFieldPath}.area`)}
              {...register(`${formFieldPath}.area`)}
            />
            <ErrorField error={errors.parametersAndAmenities?.area} />
          </div>
          <div>
            <Input
              type="number"
              inputMode="numeric"
              placeholder={t("fields.capacity_prefix")}
              data-invalid={getError(errors, `${formFieldPath}.capacity`)}
              {...register(`${formFieldPath}.capacity`, {
                valueAsNumber: true,
              })}
            />
            <ErrorField error={errors.parametersAndAmenities?.capacity} />
          </div>
        </Flex>
      </SubSection>
      <SubSection>
        <h2 className="title">{t("fields.amenities")}</h2>
        <p className="helper">{t("fields.amenities_tip")}</p>
        <AmenitySelector />
        <ErrorField error={errors?.parametersAndAmenities?.amenities} />
      </SubSection>
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
