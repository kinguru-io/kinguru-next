"use server";

import { prepareSocialLinks } from "./prepare-social-links";
import { getSession } from "@/auth.ts";
import { FormActionState, createFormAction } from "@/lib/utils";
import { OrgRegisterInput, orgRegisterSchema } from "@/lib/validations";
import prisma from "@/server/prisma.ts";

const orgRegisterHandler = async ({
  socialLinks,
  address,
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

  await prisma.organization.upsert({
    where: { id: organization?.id || "" },
    update: {
      ...restInput,
      socialLinks: {
        deleteMany: {},
        createMany: { data: prepareSocialLinks(socialLinks) },
      },
      // @ts-expect-error
      address: { deleteMany: {}, createMany: { data: address } },
    },
    create: {
      ...restInput,
      ownerId: user.id,
      socialLinks: {
        createMany: { data: prepareSocialLinks(socialLinks) },
      },
      // @ts-expect-error
      address: { createMany: { data: address } },
    },
  });

  return { status: "success", message: "" };
};

export const orgRegister = createFormAction(
  orgRegisterHandler,
  orgRegisterSchema(),
);
export type OrgRegisterAction = typeof orgRegister;
