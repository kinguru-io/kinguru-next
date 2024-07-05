import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";
import { ErrorField, Input, Textarea } from "@/components/uikit";
import { CreateVenueFormSchemaProps } from "@/lib/actions/venue";
import { getError } from "@/utils/forms/errors";
import { Box, Stack } from "~/styled-system/jsx";

export function MainInfoGroup({ isEditing }: { isEditing: boolean }) {
  const {
    register,
    formState: { errors },
  } = useFormContext<CreateVenueFormSchemaProps>();
  const t = useTranslations("profile.venues.add");

  const formFieldPath = "mainInfo";

  return (
    <Stack gap="2">
      <Box width="full">
        <Input
          placeholder={t("fields.name_placeholder")}
          readOnly={isEditing}
          hidden={isEditing}
          data-invalid={getError(errors, `${formFieldPath}.name`)}
          {...register(`${formFieldPath}.name`)}
        />
        <ErrorField error={errors?.mainInfo?.name} />
      </Box>
      <Box width="full">
        <Textarea
          placeholder={t("fields.description_placeholder")}
          data-invalid={getError(errors, `${formFieldPath}.description`)}
          {...register(`${formFieldPath}.description`)}
        />
        <ErrorField error={errors?.mainInfo?.description} />
      </Box>
    </Stack>
  );
}
