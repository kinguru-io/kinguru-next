"use server";

import { z } from "zod";
import { prepareSocialLinks } from "./prepare-social-links";
import { getSession } from "@/auth";
import { revalidateAll } from "@/lib/actions";
import { FormActionState, createFormAction } from "@/lib/utils";
import { OrgRegisterInput, orgRegisterSchema } from "@/lib/validations";
import prisma from "@/server/prisma";

const orgRegisterHandler = async ({
  socialLinks,
  address,
  logotype,
  ...restInput
}: OrgRegisterInput): Promise<FormActionState> => {
  const session = await getSession();
  if (!session || !session.user || !session.user.email) {
    return {
      status: "error",
      message: "Not authorized",
    };
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { organizations: { select: { id: true } } },
  });
  if (!user) {
    return {
      status: "error",
      message: "User not found",
    };
  }

  const organization = user.organizations.at(0);
  const image = z.string().url().safeParse(logotype).success ? logotype : "";

  await prisma.organization.upsert({
    where: { id: organization?.id || "" },
    update: {
      ...restInput,
      logotype: image,
      socialLinks: {
        deleteMany: {},
        createMany: { data: prepareSocialLinks(socialLinks) },
      },
      // @ts-expect-error
      address: { deleteMany: {}, createMany: { data: address } },
    },
    create: {
      ...restInput,
      logotype: image,
      ownerId: user.id,
      socialLinks: {
        createMany: { data: prepareSocialLinks(socialLinks) },
      },
      // @ts-expect-error
      address: { createMany: { data: address } },
    },
  });

  await revalidateAll();

  return { status: "success", message: "" };
};

export const orgRegister = createFormAction(
  orgRegisterHandler,
  orgRegisterSchema(),
);
export type OrgRegisterAction = typeof orgRegister;
