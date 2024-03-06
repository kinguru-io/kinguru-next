"use server";

import { AuthFormState, createFormAction } from "@/lib/utils";
import { OrgRegisterInput, orgRegisterSchema } from "@/lib/validations";

const orgRegisterHandler = async ({
  ...props
}: OrgRegisterInput): Promise<AuthFormState> => {
  console.log(props);
  return null;
};

export const orgRegister = createFormAction(
  orgRegisterHandler,
  orgRegisterSchema,
);
export type OrgRegisterAction = typeof orgRegister;
