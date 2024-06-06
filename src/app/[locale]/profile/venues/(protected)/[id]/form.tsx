"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { Manager, Venue } from "@prisma/client";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useTransition } from "react";
import { useFormState } from "react-dom";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AddVenueFormInner } from "../add/form";
import {
  createVenueFormSchema,
  type CreateVenueFormSchemaProps,
  type EditVenueAction,
} from "@/lib/actions/venue";
import { MergedVenueFormSchemaProps } from "@/lib/actions/venue/validation";
import type { FormActionState } from "@/lib/utils";
import { handleFormErrorMsg } from "@/utils/forms/errors";
import { transformMultiFormPayload } from "@/utils/forms/multiFormHandlers";

export function EditVenueForm({
  editVenue,
  venue: {
    id,
    name,
    description,
    image,
    locationMapboxId,
    locationTutorial,
    featureCCTV,
    featureParking,
    featureAge,
    manager: [manager],
  },
}: {
  editVenue: EditVenueAction;
  venue: Venue & { manager: Manager[] };
}) {
  const [_isPending, startTransition] = useTransition();
  const t = useTranslations("profile.venues.add");
  const formT = useTranslations("form.common");

  const methods = useForm<CreateVenueFormSchemaProps>({
    mode: "all",
    // @ts-expect-error
    resolver: zodResolver(createVenueFormSchema(t)),
    defaultValues: {
      mainInfo: {
        name,
        description,
      },
      image: {
        image,
      },
      location: {
        locationMapboxId,
        locationTutorial,
      },
      features: {
        featureCCTV,
        featureParking,
        featureAge,
      },
      manager: {
        manager: {
          firstname: manager.firstname,
          lastname: manager.lastname,
          email: manager.email,
          phoneNumber: manager.phoneNumber,
        },
      },
    },
  });

  const [response, formAction] = useFormState<FormActionState, FormData>(
    editVenue,
    null,
  );

  useEffect(() => {
    if (!response) return;
    const { status, message } = response;

    // @ts-expect-error
    const errorMsg = handleFormErrorMsg(message, t);
    if (status === "error") {
      toast.error(() => (
        <span style={{ wordBreak: "break-all" }}>{errorMsg}</span>
      ));
    }

    if (status === "success") {
      toast.success(formT("updated"));
      methods.reset(methods.getValues());
    }
  }, [response]);

  const onSubmit: SubmitHandler<CreateVenueFormSchemaProps> =
    useCallback(() => {
      if (!methods.formState.isValid) return;

      const formData = {
        ...methods.getValues(),
        ids: {
          venueId: id,
          managerId: manager.id,
        },
      };
      const multiFormPayload = transformMultiFormPayload<
        CreateVenueFormSchemaProps,
        MergedVenueFormSchemaProps
      >(formData);

      // @ts-expect-error
      startTransition(() => formAction(multiFormPayload));
    }, [formAction]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} action={formAction}>
        <AddVenueFormInner isEditing />
      </form>
    </FormProvider>
  );
}
