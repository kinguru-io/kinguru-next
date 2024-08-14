"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { Manager, Venue, VenueInformation } from "@prisma/client";
import { useTranslations } from "next-intl";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AddVenueFormInner } from "../add/form";
import {
  createVenueFormSchema,
  type CreateVenueFormSchemaProps,
  type EditVenueAction,
} from "@/lib/actions/venue";
import { MergedVenueFormSchemaProps } from "@/lib/actions/venue/validation";
import { handleFormErrorMsg } from "@/utils/forms/errors";
import { transformMultiFormPayload } from "@/utils/forms/multiFormHandlers";

export function EditVenueForm({
  editVenue,
  venue: {
    id,
    name,
    information,
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
  venue: Venue & { manager: Manager[]; information: VenueInformation[] };
}) {
  const t = useTranslations("profile.venues.add");
  const formT = useTranslations("form.common");

  const methods = useForm<CreateVenueFormSchemaProps>({
    mode: "all",
    // @ts-expect-error
    resolver: zodResolver(createVenueFormSchema(t)),
    defaultValues: {
      mainInfo: {
        name,
        information,
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

  const onSubmit: SubmitHandler<CreateVenueFormSchemaProps> = async () => {
    if (!(await methods.trigger())) return;

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

    const { status, message } = await editVenue(multiFormPayload);

    if (status === "error") {
      // @ts-expect-error
      const errorMsg = handleFormErrorMsg(message, t);
      toast.error(() => (
        <span style={{ wordBreak: "break-all" }}>{errorMsg}</span>
      ));
    }

    if (status === "success") {
      toast.success(formT("updated"));
      methods.reset(methods.getValues());
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <AddVenueFormInner isEditing />
      </form>
    </FormProvider>
  );
}
