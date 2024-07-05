import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";
import { ErrorField, Radio, Select } from "@/components/uikit";
import { CreateVenueFormSchemaProps } from "@/lib/actions/venue";
import { ageRestrictionList } from "@/lib/shared/config/age-restriction";
import { Flex, Stack } from "~/styled-system/jsx";

interface AdditionalGroupProps {
  defaultValues?: {
    featureCCTV?: boolean;
    featureParking?: boolean;
  };
}

export function AdditionalGroup({ defaultValues }: AdditionalGroupProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext<CreateVenueFormSchemaProps>();
  const t = useTranslations("profile.venues.add");

  const formFieldPath = "features";

  return (
    <Flex gap="6" justifyContent="space-between" flexWrap="wrap">
      <Stack gap="2" flexGrow="1">
        <span>{t("fields.featureCCTV_tip")}</span>
        <Radio
          value="1"
          defaultChecked={defaultValues?.featureCCTV === true}
          label={t("fields.yes_label")}
          data-invalid={errors?.features?.featureCCTV}
          {...register(`${formFieldPath}.featureCCTV`)}
        />
        <Radio
          value="0"
          defaultChecked={defaultValues?.featureCCTV === false}
          label={t("fields.no_label")}
          data-invalid={errors?.features?.featureCCTV}
          {...register(`${formFieldPath}.featureCCTV`)}
        />
        <ErrorField error={errors?.features?.featureCCTV} />
      </Stack>

      <Stack gap="2" flexGrow="1">
        <span>{t("fields.featureParking_tip")}</span>
        <Radio
          value="1"
          defaultChecked={defaultValues?.featureParking === true}
          label={t("fields.yes_label")}
          data-invalid={errors?.features?.featureParking}
          {...register(`${formFieldPath}.featureParking`)}
        />
        <Radio
          value="0"
          defaultChecked={defaultValues?.featureParking === false}
          label={t("fields.no_label")}
          data-invalid={errors?.features?.featureParking}
          {...register(`${formFieldPath}.featureParking`)}
        />
        <ErrorField error={errors?.features?.featureParking} />
      </Stack>

      <Stack flexGrow="1" flexBasis="fit-content" gap="2">
        <span>{t("fields.featureAge_tip")}</span>
        <Select
          placeholder={t("fields.featureAge_placeholder")}
          data-invalid={errors?.features?.featureAge}
          {...register(`${formFieldPath}.featureAge`)}
          hideLabel
        >
          {ageRestrictionList.map((age) => (
            <option key={age} value={age}>
              {age}+
            </option>
          ))}
        </Select>
        <ErrorField error={errors?.features?.featureAge} />
      </Stack>
    </Flex>
  );
}

export default AdditionalGroup;
