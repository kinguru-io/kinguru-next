"use server";

import { revalidatePath } from "next/cache";
import type { UseFormReturn } from "react-hook-form";
import { prepareAmenityList } from "./prepare-amenity-list";
import { mergedSchema, type MergedFormSchemaProps } from "./validation";
import { getSession } from "@/auth";
import type { FormActionState } from "@/lib/utils";

export async function editPremiseAction(
  payload: MergedFormSchemaProps,
  {
    venueId,
    premiseId,
  }: {
    venueId: string;
    premiseId: string;
    changedFields: UseFormReturn<MergedFormSchemaProps>["formState"]["dirtyFields"];
  },
): Promise<FormActionState> {
  const session = await getSession();

  if (!session || !session.user || !session.user.email) {
    return {
      status: "error",
      message: "Not authorized",
    };
  }
  const organization = session.user.organizations.at(0);

  if (session.user.role !== "organization" || !organization) {
    return {
      status: "error",
      message: "Not an organization",
    };
  }

  const parseResult = mergedSchema.safeParse(payload);

  if (parseResult.error) {
    return {
      status: "error",
      message: "Incorrect input",
    };
  }

  const venue = await prisma.venue.findUnique({
    where: {
      id: venueId,
      organizationId: organization.id,
    },
    include: { premises: { where: { id: premiseId } } },
  });

  if (!venue) {
    return {
      status: "error",
      message: "Venue doesn't exists or is not in your organization",
    };
  }

  const premise = venue.premises.at(0);

  if (!premise) {
    return {
      status: "error",
      message: "Premise doesn't associated with your venue",
    };
  }
  const {
    name: _unused,
    openHours,
    discounts,
    resources,
    amenities,
    ...restPremiseInput
  } = parseResult.data;

  const requests = [
    prisma.premise.update({
      where: { id: premise.id },
      data: {
        ...restPremiseInput,
        amenities: prepareAmenityList(amenities),
        discounts: {
          deleteMany: {},
          create: discounts,
        },
        resources: {
          deleteMany: {},
          create: resources,
        },
        openHours: {
          deleteMany: {},
          create: openHours,
        },
      },
    }),
  ];

  await prisma.$transaction(requests);
  revalidatePath(`[locale]/profile/venues/${venue.id}`, "page");

  return null;
}

export type EditPremiseAction = typeof editPremiseAction;
