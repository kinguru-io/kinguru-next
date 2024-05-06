"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { getDefaultFormAmenities } from "../_premise-form/default-form-amenities";
import { PremiseFormInner } from "../_premise-form/PremiseFormInner";
import {
  createPremiseSchema,
  type CreatePremiseAction,
  type CreatePremiseSchema,
} from "@/lib/actions/premise";
import { useRouter } from "@/navigation";

export function AddPremiseForm({
  createPremiseAction,
  venueId,
  mapboxId,
}: {
  createPremiseAction: CreatePremiseAction;
  venueId: string;
  mapboxId: string;
}) {
  const { push } = useRouter();
  const methods = useForm<CreatePremiseSchema>({
    mode: "onChange",
    resolver: zodResolver(createPremiseSchema),
    defaultValues: {
      resources: Array.from({ length: 12 }, () => ({ url: "" })),
      amenities: getDefaultFormAmenities(),
      discounts: [],
    },
  });

  const formSubmitted = async (payload: CreatePremiseSchema) => {
    const response = await createPremiseAction(payload, venueId);
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
        onSubmit={methods.handleSubmit(formSubmitted)}
      >
        <PremiseFormInner mapboxId={mapboxId} />
      </form>
    </FormProvider>
  );
}
