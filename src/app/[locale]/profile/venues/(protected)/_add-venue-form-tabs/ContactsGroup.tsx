import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";
import { ErrorField, Input } from "@/components/uikit";
import { CreateVenueFormSchemaProps } from "@/lib/actions/venue";
import { Box, Flex, InlineBox, VStack } from "~/styled-system/jsx";

export function ContactsGroup() {
  const {
    register,
    formState: { errors },
  } = useFormContext<CreateVenueFormSchemaProps>();
  const t = useTranslations("profile.venues.add");

  const formFieldPath = "manager.manager";

  return (
    <Flex justifyContent="space-around" flexWrap="wrap" gap="20px">
      <InlineBox flexBasis="full">{t("fields.contacts_tip")}</InlineBox>
      <VStack alignItems="flex-start" gap="10px" width="35%">
        <Box width="100%">
          <Input
            placeholder={t("fields.firstname_placeholder")}
            data-invalid={errors?.manager?.manager?.firstname}
            {...register(`${formFieldPath}.firstname`)}
          />
          <ErrorField error={errors?.manager?.manager?.firstname} />
        </Box>
        <Box width="100%">
          <Input
            placeholder={t("fields.lastname_placeholder")}
            data-invalid={errors?.manager?.manager?.lastname}
            {...register(`${formFieldPath}.lastname`)}
          />
          <ErrorField error={errors?.manager?.manager?.lastname} />
        </Box>
      </VStack>
      <VStack alignItems="flex-start" gap="10px" width="35%">
        <Box width="100%">
          <Input
            type="email"
            inputMode="email"
            placeholder={t("fields.email_placeholder")}
            data-invalid={errors?.manager?.manager?.email}
            {...register(`${formFieldPath}.email`)}
          />
          <ErrorField error={errors?.manager?.manager?.email} />
        </Box>
        <Box width="100%">
          <Input
            type="text"
            inputMode="tel"
            placeholder={t("fields.phoneNumber_placeholder")}
            data-invalid={errors?.manager?.manager?.phoneNumber}
            {...register(`${formFieldPath}.phoneNumber`)}
          />
          <ErrorField error={errors?.manager?.manager?.phoneNumber} />
        </Box>
      </VStack>
    </Flex>
  );
}
