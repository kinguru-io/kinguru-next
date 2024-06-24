import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";
import { ErrorField, Input, Textarea } from "@/components/uikit";
import { CreateVenueFormSchemaProps } from "@/lib/actions/venue";
import { getError } from "@/utils/forms/errors";
import { Box, VStack } from "~/styled-system/jsx";

interface MainInfoGroupProps {
  isEditing: boolean;
}

export function MainInfoGroup({ isEditing }: MainInfoGroupProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext<CreateVenueFormSchemaProps>();
  const t = useTranslations("profile.venues.add");

  const formFieldPath = "mainInfo";

  return (
    <VStack
      gap="20px"
      css={{
        "& span": {
          textStyle: "heading.6",
          color: "dark",
          marginBlockStart: "10px",
        },
      }}
    >
      {!isEditing && <span>{t("fields.name")}</span>}
      <Box width="100%">
        <Input
          placeholder={t("fields.name_placeholder")}
          readOnly={isEditing}
          hidden={isEditing}
          data-invalid={getError(errors, `${formFieldPath}.name`)}
          {...register(`${formFieldPath}.name`)}
        />
        <ErrorField error={errors?.mainInfo?.name} />
      </Box>
      <span>{t("fields.description")}</span>
      <Box width="100%">
        <Textarea
          placeholder={t("fields.description_placeholder")}
          rows={9}
          data-invalid={getError(errors, `${formFieldPath}.description`)}
          {...register(`${formFieldPath}.description`)}
        />
        <ErrorField error={errors?.mainInfo?.description} />
      </Box>
    </VStack>
  );
}
