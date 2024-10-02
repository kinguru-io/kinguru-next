"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type {
  Premise,
  PremiseDiscount,
  PremiseInformation,
  PremiseOpenHours,
  PremiseResource,
} from "@prisma/client";
import { useTranslations } from "next-intl";
import { FormProvider, UseFormReturn, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { getDefaultFormAmenities } from "../_premise-form/default-form-amenities";
import { PremiseFormInner } from "../_premise-form/premise-form-inner";
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
    room,
    floor,
    type,
    area,
    capacity,
    amenities,
    discounts,
    resources,
    information,
    openHours,
    rules,
    bookingCancelTerm,
    priceMode,
    minimalPrice,
    minimalSlotsToBook,
  },
}: {
  editPremise: EditPremiseAction;
  mapboxId: string;
  premise: Premise & {
    discounts: PremiseDiscount[];
    openHours: PremiseOpenHours[];
    resources: PremiseResource[];
    information: PremiseInformation[];
  };
}) {
  const t = useTranslations("form.common");
  const formT = useTranslations("profile.premises.add");

  const defaultValues = {
    formType: CreatePremiseFormTypeEnum.MainInformation,
    mainInformation: {
      name,
      information,
      room: room || undefined,
      floor: floor || undefined,
    },
    resources: { resources },
    parametersAndAmenities: {
      type: (type as PremiseType) || undefined,
      area: area || undefined,
      capacity: capacity || undefined,
      amenities: getDefaultFormAmenities(amenities),
    },
    openHoursAndPrice: {
      priceMode,
      minimalPrice: minimalPrice || undefined,
      minimalSlotsToBook: minimalSlotsToBook || undefined,
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
    // @ts-expect-error
    resolver: zodResolver(createPremiseFormSchema(formT)),
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
        <PremiseFormInner mapboxId={mapboxId} editMode />
      </form>
    </FormProvider>
  );
}
