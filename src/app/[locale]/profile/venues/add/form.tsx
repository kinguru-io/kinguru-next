"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useFormStatus } from "react-dom";
import { UseFormRegister, UseFormReturn, useForm } from "react-hook-form";
import { ProfileImagePicker } from "@/components/common/form/ProfileImagePicker";
import { AccordionGroup, Button, Input, Textarea } from "@/components/uikit";
import { type CreateVenueInput, createVenueSchema } from "@/lib/actions/venue";
import { Box, VStack } from "~/styled-system/jsx";

export function AddVenueForm() {
  const {
    register,
    formState: { isValid, dirtyFields },
  } = useForm<CreateVenueInput>({
    mode: "onChange",
    resolver: zodResolver(createVenueSchema),
  });

  return (
    <form action={console.log}>
      <AddVenueFormInner
        register={register}
        isValid={isValid}
        dirtyFields={dirtyFields}
      />
    </form>
  );
}

function AddVenueFormInner({
  register,
  isValid,
  dirtyFields,
}: {
  register: UseFormRegister<CreateVenueInput>;
  isValid: boolean;
  dirtyFields: UseFormReturn<CreateVenueInput>["formState"]["dirtyFields"];
}) {
  const { pending } = useFormStatus();
  const t = useTranslations("profile.venues.add");

  const formGroupItems = [
    {
      title: t("groups.main_info"),
      content: (
        <VStack
          gap="20px"
          css={{
            "& span": {
              textStyle: "heading.6",
              color: "neutral.0",
              marginBlockStart: "10px",
            },
          }}
        >
          <span>{t("fields.name")}</span>
          <Input
            placeholder={t("fields.name_placeholder")}
            {...register("name")}
          />
          <span>{t("fields.description")}</span>
          <Textarea
            placeholder={t("fields.description_placeholder")}
            rows={9}
            {...register("description")}
          />
        </VStack>
      ),
      isNextBtnDisabled: !(dirtyFields.name && dirtyFields.description),
    },
    {
      title: t("groups.photo"),
      content: (
        <VStack gap="30px" marginBlockEnd="20px">
          <p>{t("fields.photo_tip")}</p>
          <ProfileImagePicker groupKey="venues" {...register("image")} />
        </VStack>
      ),
      isNextBtnDisabled: !dirtyFields.image,
    },
  ];

  return (
    <Box
      css={{ "& .button": { marginInline: "auto", marginBlockStart: "20px" } }}
    >
      <AccordionGroup
        items={formGroupItems}
        btnLabel={t("next_group_btn_label")}
      />
      <Button type="submit" size="md" isLoading={pending} disabled={!isValid}>
        {t("submit_btn_label")}
      </Button>
    </Box>
  );
}
