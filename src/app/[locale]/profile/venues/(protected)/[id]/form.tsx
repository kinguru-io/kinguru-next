"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { Manager, Venue } from "@prisma/client";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AddVenueFormInner } from "../add/form";
import {
  createVenueSchema,
  type CreateVenueInput,
  type EditVenueAction,
} from "@/lib/actions/venue";
import type { FormActionState } from "@/lib/utils";

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
  const t = useTranslations("form.common");
  const methods = useForm<CreateVenueInput>({
    mode: "onChange",
    resolver: zodResolver(createVenueSchema),
    defaultValues: {
      name,
      description,
      image,
      locationMapboxId,
      locationTutorial,
      featureCCTV,
      featureParking,
      featureAge,
      manager: {
        firstname: manager.firstname,
        lastname: manager.lastname,
        email: manager.email,
        phoneNumber: manager.phoneNumber,
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

    if (status === "error") {
      toast.error(message);
    }

    if (status === "success") {
      toast.success(t("updated"));
      methods.reset(methods.getValues());
    }
  }, [response]);

  return (
    <FormProvider {...methods}>
      <form action={formAction}>
        <AddVenueFormInner isEditing />
        <input defaultValue={id} name="venueId" readOnly hidden />
        <input defaultValue={manager.id} name="managerId" readOnly hidden />
      </form>
    </FormProvider>
  );
}
