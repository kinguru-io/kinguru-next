"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { toast } from "react-hot-toast";
import { InputSearchLocation } from "@/components/common/form/InputSearchLocation";
import { ProfileImagePicker } from "@/components/common/form/ProfileImagePicker";
import {
  AccordionGroup,
  Button,
  Dropdown,
  Input,
  Radio,
  Select,
  Textarea,
} from "@/components/uikit";
import {
  createVenueSchema,
  type CreateVenueInput,
  type CreateVenueAction,
} from "@/lib/actions/venue";
import { ageRestrictionList } from "@/lib/shared/config/age-restriction.ts";
import type { FormActionState } from "@/lib/utils";
import { Box, Flex, InlineBox, VStack } from "~/styled-system/jsx";

export function AddVenueForm({
  createVenue,
}: {
  createVenue: CreateVenueAction;
}) {
  const methods = useForm<CreateVenueInput>({
    mode: "onChange",
    resolver: zodResolver(createVenueSchema),
  });

  const [response, formAction] = useFormState<FormActionState, FormData>(
    createVenue,
    null,
  );

  useEffect(() => {
    if (!response || response.status !== "error") return;

    const toastId = toast.error(response.message);

    return () => toast.remove(toastId);
  }, [response]);

  return (
    <FormProvider {...methods}>
      <form action={formAction}>
        <AddVenueFormInner />
      </form>
    </FormProvider>
  );
}

export function AddVenueFormInner({
  isEditing = false,
}: {
  isEditing?: boolean;
}) {
  const {
    register,
    control,
    formState: { dirtyFields, isValid, defaultValues },
  } = useFormContext<CreateVenueInput>();
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
          {!isEditing && <span>{t("fields.name")}</span>}
          <Input
            placeholder={t("fields.name_placeholder")}
            readOnly={isEditing}
            hidden={isEditing}
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
          <ProfileImagePicker
            imageSrc={defaultValues?.image}
            groupKey="venues"
            placeholderWrapper="rectangle"
            {...register("image")}
          />
        </VStack>
      ),
      isNextBtnDisabled: !dirtyFields.image,
    },
    {
      title: t("groups.location"),
      content: (
        <VStack gap="20px">
          <Dropdown size="full">
            <InputSearchLocation
              name={"locationMapboxId"}
              control={control}
              placeholder={t("fields.locationMapboxId_placeholder")}
            />
          </Dropdown>
          <p>{t("fields.locationTutorial_tip")}</p>
          <Textarea
            placeholder={t("fields.locationTutorial_placeholder")}
            rows={9}
            {...register("locationTutorial")}
          />
        </VStack>
      ),
      isNextBtnDisabled: !(
        dirtyFields.locationMapboxId && dirtyFields.locationTutorial
      ),
    },
    {
      title: t("groups.additional"),
      content: (
        <Flex justifyContent="space-between" flexWrap="wrap" gap="20px">
          <VStack alignItems="flex-start" gap="10px">
            <span>{t("fields.featureCCTV_tip")}</span>
            <Radio
              value="1"
              defaultChecked={defaultValues?.featureCCTV === true}
              label={t("fields.yes_label")}
              {...register("featureCCTV")}
            />
            <Radio
              value="0"
              defaultChecked={defaultValues?.featureCCTV === false}
              label={t("fields.no_label")}
              {...register("featureCCTV")}
            />
          </VStack>

          <VStack alignItems="flex-start" gap="10px">
            <span>{t("fields.featureParking_tip")}</span>
            <Radio
              value="1"
              defaultChecked={defaultValues?.featureParking === true}
              label={t("fields.yes_label")}
              {...register("featureParking")}
            />
            <Radio
              value="0"
              label={t("fields.no_label")}
              defaultChecked={defaultValues?.featureParking === false}
              {...register("featureParking")}
            />
          </VStack>

          <VStack alignItems="stretch" gap="10px">
            <span>{t("fields.featureAge_tip")}</span>
            <Select
              placeholder={t("fields.featureAge_placeholder")}
              {...register("featureAge")}
            >
              {ageRestrictionList.map((age) => (
                <option key={age} value={age}>
                  {age}+
                </option>
              ))}
            </Select>
          </VStack>
        </Flex>
      ),
      isNextBtnDisabled: !(
        dirtyFields.featureCCTV &&
        dirtyFields.featureParking &&
        dirtyFields.featureAge
      ),
    },
    {
      title: t("groups.contacts"),
      content: (
        <Flex justifyContent="space-around" flexWrap="wrap" gap="20px">
          <InlineBox flexBasis="full">{t("fields.contacts_tip")}</InlineBox>
          <VStack alignItems="flex-start" gap="10px" width="35%">
            <Input
              placeholder={t("fields.firstname_placeholder")}
              {...register("manager.firstname")}
            />
            <Input
              placeholder={t("fields.lastname_placeholder")}
              {...register("manager.lastname")}
            />
          </VStack>
          <VStack alignItems="flex-start" gap="10px" width="35%">
            <Input
              type="email"
              inputMode="email"
              placeholder={t("fields.email_placeholder")}
              {...register("manager.email")}
            />
            <Input
              type="text"
              inputMode="tel"
              placeholder={t("fields.phoneNumber_placeholder")}
              {...register("manager.phoneNumber")}
            />
          </VStack>
        </Flex>
      ),
      isNextBtnDisabled: !(
        dirtyFields.manager?.firstname &&
        dirtyFields.manager?.lastname &&
        dirtyFields.manager?.email &&
        dirtyFields.manager?.phoneNumber
      ),
    },
  ];

  const isSubmitEnabled = isEditing
    ? isValid && Object.values(dirtyFields).some(Boolean)
    : isValid;

  return (
    <Box
      css={{ "& .button": { marginInline: "auto", marginBlockStart: "20px" } }}
    >
      <AccordionGroup
        items={formGroupItems}
        btnLabel={t("next_group_btn_label")}
        allowAll={isEditing}
      />
      <Button
        type="submit"
        size="md"
        isLoading={pending}
        disabled={!isSubmitEnabled}
      >
        {t(isEditing ? "edit_btn_label" : "submit_btn_label")}
      </Button>
    </Box>
  );
}
