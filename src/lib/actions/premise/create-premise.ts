"use server";

import slugify from "@sindresorhus/slugify";
import { revalidatePath } from "next/cache";
import { createPremiseSchema, type CreatePremiseSchema } from "./validation";
import { getSession } from "@/auth";
import type { AuthFormState } from "@/lib/utils";

export async function createPremiseAction(
  payload: CreatePremiseSchema,
  venueId: string,
): Promise<AuthFormState> {
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

  const parseResult = createPremiseSchema.safeParse(payload);

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

  const { openHours, amenities, resources, discounts, ...restPremiseInput } =
    parseResult.data;

  const potentialSlug = slugify(restPremiseInput.name);

  const foundPremise = await prisma.premise.findUnique({
    where: { slug: potentialSlug },
  });

  const slug = foundPremise
    ? `${parentVenue.slug}-${potentialSlug}`
    : potentialSlug;

  try {
    const createdPremise = await prisma.premise.create({
      data: {
        venueId,
        slug,
        ...restPremiseInput,
        amenities: prepareAmenityList(amenities),
        resources: {
          createMany: {
            data: resources.filter((resource) => resource.url),
          },
        },
        openHours: {
          createMany: {
            data: openHours.map(({ day, startTime, endTime }) => ({
              day,
              openTime: startTime,
              closeTime: endTime,
            })),
          },
        },
        discounts: {
          createMany: {
            data: discounts,
          },
        },
      },
      include: { openHours: true },
    });

    await prisma.premisePricing.createMany({
      data: createdPremise.openHours.map(({ id, openTime, closeTime }) => {
        const priceForHour = openHours.find(
          ({ startTime, endTime }) =>
            new Date(startTime).getTime() === openTime.getTime() &&
            new Date(endTime).getTime() === closeTime.getTime(),
        )?.price;

        if (!priceForHour && priceForHour !== 0) {
          throw new Error("Unexpected error occurred");
        }

        return {
          premiseOpenHoursId: id,
          startTime: openTime,
          endTime: closeTime,
          priceForHour,
        };
      }),
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

function prepareAmenityList(amenities: CreatePremiseSchema["amenities"]) {
  return Object.entries(amenities).reduce((list, [amenityTag, toggled]) => {
    if (toggled) {
      list.push(amenityTag);
    }

    return list;
  }, [] as string[]);
}
