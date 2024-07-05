"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { getDefaultFormAmenities } from "../_premise-form/default-form-amenities";
import { PremiseFormInner } from "../_premise-form/premise-form-inner";
import { type CreatePremiseAction } from "@/lib/actions/premise";
import {
  type CreatePremiseFormSchemaProps,
  CreatePremiseFormTypeEnum,
  createPremiseFormSchema,
  MergedFormSchemaProps,
} from "@/lib/actions/premise/validation";
import { transformMultiFormPayload } from "@/utils/forms/multiFormHandlers";

interface AddPremiseFormProps {
  createPremiseAction: CreatePremiseAction;
  venueId: string;
  mapboxId: string;
}

export function AddPremiseForm({
  createPremiseAction,
  venueId,
  mapboxId,
}: AddPremiseFormProps) {
  const { push } = useRouter();
  const t = useTranslations("profile.premises.add");

  const methods = useForm<CreatePremiseFormSchemaProps>({
    mode: "onChange",
    // @ts-expect-error
    resolver: zodResolver(createPremiseFormSchema(t)),
    defaultValues: {
      formType: CreatePremiseFormTypeEnum.MainInformation,
      resources: {
        resources: Array.from({ length: 12 }, () => ({ url: "" })),
      },
      parametersAndAmenities: {
        amenities: getDefaultFormAmenities(),
      },
      openHoursAndPrice: {
        discounts: [],
      },
    },
  });

  const { getValues, handleSubmit } = methods;

  const formSubmit = async () => {
    const multiFormPayload = transformMultiFormPayload<
      CreatePremiseFormSchemaProps,
      MergedFormSchemaProps
    >(getValues());

    const response = await createPremiseAction(multiFormPayload, venueId);
    if (!response) return;

    const { status, message } = response;

    if (status === "error") {
      toast.error(message);
    }

    if (status === "success") {
      toast.success(message);
      push(`/profile/venues/${venueId}`);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        // `action` prop isn't working as expected since <TabsContent /> is rendering only the current tab
        // The form is really complex, so `display: none` isn't used. Btw `next/submit` button requires JS too
        onSubmit={handleSubmit(formSubmit)}
      >
        <PremiseFormInner mapboxId={mapboxId} />
      </form>
    </FormProvider>
  );
}
