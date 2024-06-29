"use server";

import { toDate } from "date-fns";
import { prepareSocialLinks } from "./prepare-social-links";
import { revalidateAll } from "./revalidate-all";
import { getSession } from "@/auth";
import type { FormActionState } from "@/lib/utils";
import type { UserProfileInput } from "@/lib/validations/auth/user-profile";
import prisma from "@/server/prisma";

export async function updateUserProfile({
  socialLinks,
  birthdate,
  image,
  ...restInput
}: UserProfileInput): Promise<FormActionState> {
  const session = await getSession();
  if (!session || !session.user) {
    return {
      status: "error",
      message: "Not authorized",
    };
  }

  const { firstname, lastname } = restInput;
  const name = lastname ? `${firstname} ${lastname}` : firstname;

  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      ...restInput,
      name: name.trim(),
      birthdate: toDate(birthdate),
      image: image || "",
      socialLinks: {
        deleteMany: {},
        createMany: { data: prepareSocialLinks(socialLinks) },
      },
    },
  });

  await revalidateAll();

  return null;
}

export type UpdateUserProfileAction = typeof updateUserProfile;
