import { noopAction } from "@/lib/actions/auth/action.ts";
import { createFormAction } from "@/lib/utils";
import { resetFormSchema } from "@/lib/validations";

export const resetPassword = createFormAction(noopAction, resetFormSchema);
export type ResetPasswordAction = typeof resetPassword;
