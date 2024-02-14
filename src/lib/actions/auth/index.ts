import { createFormAction } from "./action";
import {
  resetFormSchema,
  signinFormSchema,
  signupFormSchema,
} from "./validation";

// ? простое использование фабрики при эскпорте из модуля. вроде как похоже на deps inversion (?)
// TODO refactor fabriс using once discussed
export const resetPassword = createFormAction(resetFormSchema);
export const signIn = createFormAction(signinFormSchema);
export const signUp = createFormAction(signupFormSchema);

export { resetFormSchema, signinFormSchema, signupFormSchema };

export type { AuthFormState } from "./action";
export type {
  ResetFormInput,
  SigninFormInput,
  SignupFormInput,
} from "./validation";
