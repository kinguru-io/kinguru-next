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
import { SubSection } from "@/components/common/cards/sub-section";
import { Button } from "@/components/uikit";
import {
  createVenueFormSchema,
  type CreateVenueFormSchemaProps,
  type CreateVenueAction,
} from "@/lib/actions/venue";
import { MergedVenueFormSchemaProps } from "@/lib/actions/venue/validation";
import { FormActionState } from "@/lib/utils";
import { transformMultiFormPayload } from "@/utils/forms/multiFormHandlers";
import { Stack } from "~/styled-system/jsx";

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
      const formData = {
        ...data,
        ...methods.getValues(),
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
  isEditing: editMode = false,
}: {
  isEditing?: boolean;
}) {
  const {
    control,
    formState: { defaultValues, isSubmitting },
  } = useFormContext<CreateVenueFormSchemaProps>();

  const t = useTranslations("profile.venues.add");

  const formGroupItems = [
    {
      title: t("groups.main_info"),
      content: <MainInfoGroup isEditing={editMode} />,
    },
    {
      title: t("groups.photo"),
      content: <PhotoGroup defaultValues={defaultValues?.image} />,
    },
    {
      title: t("groups.location"),
      content: <LocationGroup control={control} />,
    },
    {
      title: t("groups.additional"),
      content: <AdditionalGroup defaultValues={defaultValues?.features} />,
    },
    {
      title: t("groups.contacts"),
      content: <ContactsGroup />,
    },
  ];

  return (
    <Stack css={{ md: { gap: "6" } }}>
      {formGroupItems.map(({ title, content }) => (
        <SubSection key={title}>
          <h2 className="title">{title}</h2>
          {content}
        </SubSection>
      ))}
      <Button type="submit" isLoading={isSubmitting} centered>
        {t(editMode ? "edit_btn_label" : "submit_btn_label")}
      </Button>
    </Stack>
  );
}
