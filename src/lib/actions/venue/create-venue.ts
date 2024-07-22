"use server";

import slugify from "@sindresorhus/slugify";
import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";
import {
  type MergedVenueFormSchemaProps,
  mergedVenueSchema,
} from "./validation";
import { getSession } from "@/auth";
import { type FormActionResponse } from "@/lib/utils";
import prisma from "@/server/prisma";

export async function createVenueAction(
  input: MergedVenueFormSchemaProps,
): Promise<FormActionResponse> {
  const t = await getTranslations("profile.venues.add");
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

  const parseResult = mergedVenueSchema.safeParse(input);

  if (!parseResult.success) {
    return {
      status: "error",
      message: "Incorrect input",
    };
  }

  const { manager, ...restVenueInput } = parseResult.data;

  const potentialSlug = slugify(restVenueInput.name);

  const foundVenue = await prisma.venue.findUnique({
    where: { slug: potentialSlug },
  });

  const slug = foundVenue
    ? `${slugify(organization.name)}-${potentialSlug}`
    : potentialSlug;

  try {
    const createdVenue = await prisma.venue.create({
      data: {
        ...restVenueInput,
        slug,
        organizationId: organization.id,
        manager: {
          createMany: {
            data: [manager],
          },
        },
      },
    });

    revalidatePath("[locale]/profile/(company)", "layout");
    return {
      status: "success",
      message: "Venue created successfully",
      redirectUrl: `/profile/venues/created?venueId=${createdVenue.id}`,
    };
  } catch (error) {
    // Add catch block to handle errors
    console.error("error", error);
    return {
      status: "error",
      message: t("fields.errors.alreadyExistsError"),
    };
  }
}

export type CreateVenueAction = typeof createVenueAction;
