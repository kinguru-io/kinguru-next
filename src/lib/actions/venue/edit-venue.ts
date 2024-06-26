"use server";

import { revalidatePath } from "next/cache";
import {
  mergedVenueSchema,
  type MergedVenueFormSchemaProps,
} from "./validation";
import { getSession } from "@/auth";
import { type FormActionState, createFormAction } from "@/lib/utils";
import prisma from "@/server/prisma";

async function editVenue({
  manager,
  venueId,
  managerId,
  name: _unused,
  ...restVenueInput
}: MergedVenueFormSchemaProps): Promise<FormActionState> {
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

  const venue = await prisma.venue.findUnique({
    where: { id: venueId, organizationId: organization.id },
    include: { manager: { select: { id: true } } },
  });

  if (!venue) {
    return {
      status: "error",
      message: "Venue is not associated with your organization",
    };
  }

  if (venue.manager.at(0)?.id !== String(managerId)) {
    return {
      status: "error",
      message: "Manager is not associated with this venue",
    };
  }

  await prisma.$transaction([
    prisma.venue.update({ where: { id: venueId }, data: restVenueInput }),
    prisma.manager.update({ where: { id: managerId }, data: manager }),
  ]);

  revalidatePath(`[locale]/profile/venues/${venue.id}`, "page");

  return {
    status: "success",
    message: "Venue updated successfully",
  };
}

// @ts-expect-error
export const editVenueAction = createFormAction(editVenue, mergedVenueSchema);

export type EditVenueAction = typeof editVenueAction;
