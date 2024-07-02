import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";
import { ErrorField, Radio, Select } from "@/components/uikit";
import { CreateVenueFormSchemaProps } from "@/lib/actions/venue";
import { Flex, VStack } from "~/styled-system/jsx";

interface AdditionalGroupProps {
  defaultValues?: {
    featureCCTV?: boolean;
    featureParking?: boolean;
  };
  ageRestrictionList: number[];
}

export function AdditionalGroup({
  defaultValues,
  ageRestrictionList,
}: AdditionalGroupProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext<CreateVenueFormSchemaProps>();
  const t = useTranslations("profile.venues.add");

  const formFieldPath = "features";

  return (
    <Flex justifyContent="space-between" flexWrap="wrap" gap="20px">
      <VStack alignItems="flex-start" gap="10px">
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
      </VStack>

      <VStack alignItems="flex-start" gap="10px">
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
      </VStack>

      <VStack alignItems="stretch" gap="10px">
        <span>{t("fields.featureAge_tip")}</span>
        <Select
          placeholder={t("fields.featureAge_placeholder")}
          data-invalid={errors?.features?.featureAge}
          {...register(`${formFieldPath}.featureAge`)}
        >
          {ageRestrictionList.map((age) => (
            <option key={age} value={age}>
              {age}+
            </option>
          ))}
        </Select>
        <ErrorField error={errors?.features?.featureAge} />
      </VStack>
    </Flex>
  );
}

export default AdditionalGroup;
