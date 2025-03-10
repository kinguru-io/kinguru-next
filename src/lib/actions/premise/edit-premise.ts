"use server";

import { revalidatePath } from "next/cache";
import type { UseFormReturn } from "react-hook-form";
import { getPremiseSlug } from "./get-premise-slug";
import { prepareAmenityList } from "./prepare-amenity-list";
import { OpenHoursSchema } from "./tabs/openHoursAndPrices";
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
    name,
    openHours,
    discounts,
    resources,
    amenities,
    information,
    ...restPremiseInput
  } = parseResult.data;

  const slug =
    name === premise.name ? premise.slug : await getPremiseSlug(name);

  await prisma.premise.update({
    where: { id: premise.id },
    data: {
      ...restPremiseInput,
      name,
      slug,
      amenities: prepareAmenityList(amenities),
      discounts: { deleteMany: {}, create: discounts },
      resources: { deleteMany: {}, create: resources },
      information: { deleteMany: {}, create: information },
      openHours: {
        deleteMany: {},
        create: openHours.map(
          ({ day, startTime, endTime, price }: OpenHoursSchema) => ({
            day,
            openTime: startTime,
            closeTime: endTime,
            price: price ?? 0,
          }),
        ),
      },
    },
  });

  revalidatePath(`[locale]/profile/venues/${venue.id}`, "page");

  return null;
}

export type EditPremiseAction = typeof editPremiseAction;
