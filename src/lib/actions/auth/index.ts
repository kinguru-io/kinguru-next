import { noopAction } from "./action";
import { createFormAction } from "./util";
import {
  resetFormSchema,
  signinFormSchema,
  signupFormSchema,
} from "./validation";

export const resetPassword = createFormAction(noopAction, resetFormSchema);
export const signIn = createFormAction(noopAction, signinFormSchema);
export const signUp = createFormAction(noopAction, signupFormSchema);

export { resetFormSchema, signinFormSchema, signupFormSchema };

export type { AuthFormState } from "./util";
export type {
  ResetFormInput,
  SigninFormInput,
  SignupFormInput,
} from "./validation";
