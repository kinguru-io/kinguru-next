import { AuthFormState, createFormAction } from "@/lib/utils";
import { ResetFormInput, resetFormSchema } from "@/lib/validations";

const resetPasswordHandler =
  async ({}: ResetFormInput): Promise<AuthFormState> => {
    return null;
  };

export const resetPassword = createFormAction(
  resetPasswordHandler,
  resetFormSchema,
);
export type ResetPasswordAction = typeof resetPassword;
