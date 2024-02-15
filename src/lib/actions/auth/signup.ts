import { noopAction } from "@/lib/actions/auth/action.ts";
import { createFormAction } from "@/lib/utils";
import { signupFormSchema } from "@/lib/validations";

export const signUp = createFormAction(noopAction, signupFormSchema);
export type SignUpAction = typeof signUp;
