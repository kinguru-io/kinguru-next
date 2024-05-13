"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type {
  Premise,
  PremiseDiscount,
  PremiseOpenHours,
  PremiseResource,
} from "@prisma/client";
import { useTranslations } from "next-intl";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { getDefaultFormAmenities } from "../_premise-form/default-form-amenities";
import { PremiseFormInner } from "../_premise-form/PremiseFormInner";
import {
  createPremiseSchema,
  type CreatePremiseSchema,
  type EditPremiseAction,
} from "@/lib/actions/premise";
import type { BookingCancelTerm } from "@/lib/shared/config/booking-cancel-terms";
import type { PremiseType } from "@/lib/shared/config/premise-types";

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
  const methods = useForm<CreatePremiseSchema>({
    mode: "onChange",
    resolver: zodResolver(createPremiseSchema),
    defaultValues: {
      name,
      description,
      room: room || undefined,
      floor: floor || undefined,
      type: (type as PremiseType) || undefined,
      area: area || undefined,
      capacity: capacity || undefined,
      resources: resources
        .map(({ url }) => ({ url }))
        .concat(
          Array.from({ length: 12 - resources.length }, () => ({ url: "" })),
        ),
      amenities: getDefaultFormAmenities(amenities),
      discounts: discounts.map(({ duration, discountPercentage }) => ({
        duration,
        discountPercentage,
      })),
      rules: rules || undefined,
      bookingCancelTerm: (bookingCancelTerm as BookingCancelTerm) || undefined,
      openHours: openHours.map(({ day, openTime, closeTime, price }) => ({
        day,
        startTime: openTime.toISOString(),
        endTime: closeTime.toISOString(),
        price,
      })),
    },
  });

  const formSubmitted = async (input: CreatePremiseSchema) => {
    const response = await editPremise(input, {
      venueId,
      premiseId: id,
      changedFields: methods.formState.dirtyFields,
    });

    if (response === null) {
      toast.success(t("updated"));
      methods.reset(input);
    } else {
      toast.error(response.message);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(formSubmitted)}>
        <PremiseFormInner mapboxId={mapboxId} isEditing />
      </form>
    </FormProvider>
  );
}
