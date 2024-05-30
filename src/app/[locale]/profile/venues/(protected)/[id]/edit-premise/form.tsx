"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type {
  Premise,
  PremiseDiscount,
  PremiseOpenHours,
  PremiseResource,
} from "@prisma/client";
import { useTranslations } from "next-intl";
import { FormProvider, UseFormReturn, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { getDefaultFormAmenities } from "../_premise-form/default-form-amenities";
import { PremiseFormInner } from "../_premise-form/PremiseFormInner";
import {
  createPremiseFormSchema,
  type CreatePremiseFormSchemaProps,
  type EditPremiseAction,
} from "@/lib/actions/premise";
import {
  CreatePremiseFormTypeEnum,
  MergedFormSchemaProps,
} from "@/lib/actions/premise/validation";
import type { BookingCancelTerm } from "@/lib/shared/config/booking-cancel-terms";
import type { PremiseType } from "@/lib/shared/config/premise-types";
import { transformMultiFormPayload } from "@/utils/forms/multiFormHandlers";

export function EditPremiseForm({
  editPremise,
  mapboxId,
  premise: {
    id,
    venueId,
    name,
    description,
    room,
    floor,
    type,
    area,
    capacity,
    amenities,
    discounts,
    resources,
    openHours,
    rules,
    bookingCancelTerm,
  },
}: {
  editPremise: EditPremiseAction;
  mapboxId: string;
  premise: Premise & {
    discounts: PremiseDiscount[];
    openHours: PremiseOpenHours[];
    resources: PremiseResource[];
  };
}) {
  const t = useTranslations("form.common");

  const defaultValues = {
    formType: CreatePremiseFormTypeEnum.MainInformation,
    mainInformation: {
      name,
      description,
      room: room || undefined,
      floor: floor || undefined,
    },
    resources: {
      resources: resources
        .map(({ url }) => ({ url }))
        .concat(
          Array.from({ length: 12 - resources.length }, () => ({ url: "" })),
        ),
    },
    parametersAndAmenities: {
      type: (type as PremiseType) || undefined,
      area: area || undefined,
      capacity: capacity || undefined,
      amenities: getDefaultFormAmenities(amenities),
    },
    openHoursAndPrice: {
      openHours: openHours.map(({ day, openTime, closeTime, price }) => ({
        day,
        startTime: openTime.toISOString(),
        endTime: closeTime.toISOString(),
        price,
      })),
      discounts: discounts.map(({ duration, discountPercentage }) => ({
        duration,
        discountPercentage,
      })),
    },
    rules: {
      rules: rules || undefined,
    },
    bookingCancelTerm: {
      bookingCancelTerm: (bookingCancelTerm as BookingCancelTerm) || undefined,
    },
  };

  const methods = useForm<CreatePremiseFormSchemaProps>({
    mode: "all",
    resolver: zodResolver(createPremiseFormSchema),
    defaultValues,
  });

  const formSubmitted = async () => {
    const multiFormPayload = transformMultiFormPayload<
      CreatePremiseFormSchemaProps,
      MergedFormSchemaProps
    >(methods.getValues());

    const changedFields = transformMultiFormPayload<
      UseFormReturn<CreatePremiseFormSchemaProps>["formState"]["dirtyFields"],
      UseFormReturn<MergedFormSchemaProps>["formState"]["dirtyFields"]
    >(methods.formState.dirtyFields);

    const response = await editPremise(multiFormPayload, {
      venueId,
      premiseId: id,
      changedFields,
    });

    if (response === null) {
      toast.success(t("updated"));
    } else {
      toast.error(response.message);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(formSubmitted)}>
        <PremiseFormInner key="edit-premise_form" mapboxId={mapboxId} />
      </form>
    </FormProvider>
  );
}
