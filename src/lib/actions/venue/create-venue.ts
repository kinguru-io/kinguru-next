"use server";

import slugify from "@sindresorhus/slugify";
import { revalidatePath } from "next/cache";
import { type CreateVenueInput, createVenueSchema } from "./validation";
import { getSession } from "@/auth";
import { type FormActionState, createFormAction } from "@/lib/utils";
import { redirect } from "@/navigation";
import prisma from "@/server/prisma";

async function createVenue({
  manager,
  ...restVenueInput
}: CreateVenueInput): Promise<FormActionState> {
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

  const potentialSlug = slugify(restVenueInput.name);

  const foundVenue = await prisma.venue.findUnique({
    where: { slug: potentialSlug },
  });

  const slug = foundVenue
    ? `${slugify(organization.name)}-${potentialSlug}`
    : potentialSlug;

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

  revalidatePath("[locale]/profile/venues/(protected)", "layout");
  redirect(`/profile/venues/created?venueId=${createdVenue.id}`);

  return null;
}

export const createVenueAction = createFormAction(
  createVenue,
  createVenueSchema,
);

export type CreateVenueAction = typeof createVenueAction;
