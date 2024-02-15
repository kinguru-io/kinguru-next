"use server";

import { noopAction } from "@/lib/actions/auth/action.ts";
import { createFormAction } from "@/lib/utils";
import { signinFormSchema } from "@/lib/validations";

export const signIn = createFormAction(noopAction, signinFormSchema);
export type SignInAction = typeof signIn;
