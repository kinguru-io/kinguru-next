"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useTransition } from "react";
import { useFormState } from "react-dom";
import {
  useForm,
  FormProvider,
  useFormContext,
  SubmitHandler,
} from "react-hook-form";
import { toast } from "react-hot-toast";
import {
  AdditionalGroup,
  ContactsGroup,
  LocationGroup,
  MainInfoGroup,
  PhotoGroup,
} from "../_add-venue-form-tabs";
import { AccordionGroup, Button } from "@/components/uikit";
import {
  createVenueFormSchema,
  type CreateVenueFormSchemaProps,
  type CreateVenueAction,
} from "@/lib/actions/venue";
import {
  CreateVenueFormTypeEnum,
  MergedVenueFormSchemaProps,
} from "@/lib/actions/venue/validation";
import { ageRestrictionList } from "@/lib/shared/config/age-restriction.ts";
import { FormActionState } from "@/lib/utils";
import { transformMultiFormPayload } from "@/utils/forms/multiFormHandlers";
import { Box } from "~/styled-system/jsx";

export function AddVenueForm({
  createVenue,
}: {
  createVenue: CreateVenueAction;
}) {
  const router = useRouter();
  const t = useTranslations("profile.venues.add");
  const [_isPending, startTransition] = useTransition();

  const methods = useForm<CreateVenueFormSchemaProps>({
    mode: "all",
    // @ts-expect-error
    resolver: zodResolver(createVenueFormSchema(t)),
    defaultValues: {
      formType: CreateVenueFormTypeEnum.MainInfo,
    },
  });

  const [response, formAction] = useFormState<FormActionState, FormData>(
    createVenue,
    null,
  );

  useEffect(() => {
    if (!response) return;

    if (response.status === "success" && response.redirectUrl) {
      router.push(response.redirectUrl);
    }

    if (response.status !== "error") return;

    const toastId = toast.error(response.message);

    return () => toast.remove(toastId);
  }, [response]);

  const onSubmit: SubmitHandler<CreateVenueFormSchemaProps> = useCallback(
    (data) => {
      if (!methods.formState.isValid) return;
      const formData = {
        ...methods.getValues(),
        ...data,
      };

      const multiFormPayload = transformMultiFormPayload<
        CreateVenueFormSchemaProps,
        MergedVenueFormSchemaProps
      >(formData);
      // @ts-expect-error
      startTransition(() => formAction(multiFormPayload));
    },
    [formAction],
  );

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
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
    control,
    setValue,
    trigger,
    watch,
    formState: { isValid, defaultValues, isSubmitting },
  } = useFormContext<CreateVenueFormSchemaProps>();

  const t = useTranslations("profile.venues.add");

  const formGroupItems = [
    {
      title: t("groups.main_info"),
      content: <MainInfoGroup isEditing={isEditing} />,
      formType: CreateVenueFormTypeEnum.MainInfo,
    },
    {
      title: t("groups.photo"),
      content: <PhotoGroup defaultValues={defaultValues?.image} />,
      formType: CreateVenueFormTypeEnum.Image,
    },
    {
      title: t("groups.location"),
      content: <LocationGroup control={control} />,
      formType: CreateVenueFormTypeEnum.Location,
    },
    {
      title: t("groups.additional"),
      content: (
        <AdditionalGroup
          defaultValues={defaultValues?.features}
          ageRestrictionList={Array.from(ageRestrictionList)}
        />
      ),
      formType: CreateVenueFormTypeEnum.Features,
    },
    {
      title: t("groups.contacts"),
      content: <ContactsGroup />,
      formType: CreateVenueFormTypeEnum.Manager,
    },
  ];

  function setActiveForm(tabIdx: number) {
    setValue(
      "formType",
      formGroupItems?.[tabIdx]?.formType || formGroupItems?.[0]?.formType,
    );
  }

  const validateFormType = async (callbackNextStep?: () => void) => {
    const formType = watch("formType");
    const isValidForm = await trigger(formType);

    if (callbackNextStep && isValidForm) {
      callbackNextStep();
    }
  };

  return (
    <Box
      css={{ "& .button": { marginInline: "auto", marginBlockStart: "20px" } }}
    >
      <AccordionGroup
        items={formGroupItems}
        btnLabel={t("next_group_btn_label")}
        allowAll={isEditing}
        isValid={isValid}
        setActiveForm={setActiveForm}
        validateFormType={validateFormType}
      />
      <Button type="submit" size="md" isLoading={isSubmitting}>
        {t(isEditing ? "edit_btn_label" : "submit_btn_label")}
      </Button>
    </Box>
  );
}
