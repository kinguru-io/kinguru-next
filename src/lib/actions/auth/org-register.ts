"use server";

import moment from "moment";
import { getSession } from "@/auth.ts";
import { AuthFormState, createFormAction } from "@/lib/utils";
import { OrgRegisterInput, orgRegisterSchema } from "@/lib/validations";
import { redirect } from "@/navigation.ts";
import prisma from "@/server/prisma.ts";

const orgRegisterHandler = async (
  props: OrgRegisterInput,
): Promise<AuthFormState> => {
  const session = await getSession();
  if (!session || !session.user || !session.user.email) {
    return {
      status: "error",
      message: "Not authorized",
    };
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });
  if (!user) {
    return {
      status: "error",
      message: "User not found",
    };
  }

  await prisma.organization.create({
    data: {
      ...props,
      foundationDate: moment(props.foundationDate, "YYYY").toDate(),
      activitySphere: [props.activitySphere],
      ownerId: user.id,
    },
  });

  redirect("/");
  return null;
};

export const orgRegister = createFormAction(
  orgRegisterHandler,
  orgRegisterSchema,
);
export type OrgRegisterAction = typeof orgRegister;
