"use server";

import { FormActionState, createFormAction } from "@/lib/utils";
import { ResetFormInput, resetFormSchema } from "@/lib/validations";

const resetPasswordHandler =
  async ({}: ResetFormInput): Promise<FormActionState> => {
    return null;
  };

export const resetPassword = createFormAction(
  resetPasswordHandler,
  resetFormSchema,
);
export type ResetPasswordAction = typeof resetPassword;
