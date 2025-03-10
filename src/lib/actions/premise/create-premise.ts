"use server";

import { revalidatePath } from "next/cache";
import { getPremiseSlug } from "./get-premise-slug";
import { prepareAmenityList } from "./prepare-amenity-list";
import { MergedFormSchemaProps, mergedSchema } from "./validation";
import { getSession } from "@/auth";
import type { FormActionState } from "@/lib/utils";

export async function createPremiseAction(
  payload: MergedFormSchemaProps,
  venueId: string,
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

  // TODO add check if all open hours records are isolated
  // server-check only since UI validation doesn't allow such behavior

  const parentVenue = await prisma.venue.findUnique({
    where: { id: venueId, organizationId: organization.id },
    select: { name: true, slug: true },
  });

  if (!parentVenue) {
    return {
      status: "error",
      message: "Venue doesn't exist or is not in your organization",
    };
  }

  const {
    amenities,
    openHours,
    discounts,
    resources,
    information,
    ...restPremiseInput
  } = parseResult.data;

  try {
    const slug = await getPremiseSlug(restPremiseInput.name);
    const createdPremise = await prisma.premise.create({
      data: {
        ...restPremiseInput,
        venueId,
        slug,
        amenities: prepareAmenityList(amenities),
        resources: {
          createMany: {
            data: resources.filter((resource) => resource.url),
          },
        },
        openHours: {
          createMany: {
            data: openHours.map(({ day, startTime, endTime, price }) => ({
              day,
              openTime: startTime,
              closeTime: endTime,
              price: price ?? 0,
            })),
          },
        },
        discounts: {
          createMany: {
            data: discounts,
          },
        },
        information: {
          createMany: {
            data: information,
          },
        },
      },
    });

    revalidatePath("[locale]/profile/venues/(protected)/[id]", "page");

    return {
      status: "success",
      message: `${parentVenue.name} | ${createdPremise.name}`,
    };
  } catch (error) {
    return {
      status: "error",
      message: "Something went wrong",
    };
  }
}

export type CreatePremiseAction = typeof createPremiseAction;
