"use server";

import { revalidatePath } from "next/cache";
import {
  mergedVenueSchema,
  type MergedVenueFormSchemaProps,
} from "./validation";
import { getSession } from "@/auth";
import { type FormActionResponse } from "@/lib/utils";
import prisma from "@/server/prisma";

export async function editVenueAction(
  input: MergedVenueFormSchemaProps,
): Promise<FormActionResponse> {
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
    return { status: "error", message: parseResult.error.message };
  }

  const {
    manager,
    venueId,
    managerId,
    name: _unused,
    information,
    ...restVenueInput
  } = parseResult.data;

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
    prisma.venue.update({
      where: { id: venueId },
      data: {
        ...restVenueInput,
        information: { deleteMany: {}, createMany: { data: information } },
      },
    }),
    prisma.manager.update({ where: { id: managerId }, data: manager }),
  ]);

  revalidatePath(`[locale]/profile/venues/${venue.id}`, "page");

  return {
    status: "success",
    message: "Venue updated successfully",
  };
}

export type EditVenueAction = typeof editVenueAction;
