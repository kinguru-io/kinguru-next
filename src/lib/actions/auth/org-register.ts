"use server";

import type { SocialNetwork } from "@prisma/client";
import { getSession } from "@/auth.ts";
import { FormActionState, createFormAction } from "@/lib/utils";
import { OrgRegisterInput, orgRegisterSchema } from "@/lib/validations";
import { redirect } from "@/navigation.ts";
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
    where: { id: organization?.id },
    update: {
      ...restInput,
      socialLinks: {
        deleteMany: {},
        createMany: { data: prepareSocialLinks(socialLinks) },
      },
      address: { deleteMany: {}, createMany: { data: address } },
    },
    create: {
      ...restInput,
      ownerId: user.id,
      socialLinks: {
        createMany: { data: prepareSocialLinks(socialLinks) },
      },
      address: { createMany: { data: address } },
    },
  });

  // redirecting in case it was a registration
  if (!organization) {
    redirect("/profile");
  }

  return { status: "success", message: "" };
};

function prepareSocialLinks(links: OrgRegisterInput["socialLinks"]) {
  return links.reduce(
    (preparedLinks, { network, url }) => {
      if (url) {
        preparedLinks.push({ network, url });
      }
      return preparedLinks;
    },
    [] as Array<{ network: SocialNetwork; url: string }>,
  );
}

export const orgRegister = createFormAction(
  orgRegisterHandler,
  orgRegisterSchema,
);
export type OrgRegisterAction = typeof orgRegister;
