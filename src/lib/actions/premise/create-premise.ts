"use server";

import { createPremiseSchema, type CreatePremiseSchema } from "./validation";
import type { AuthFormState } from "@/lib/utils";

// TODO incomplete

export async function createPremiseAction(
  payload: CreatePremiseSchema,
): Promise<AuthFormState> {
  const parseResult = createPremiseSchema.safeParse(payload);

  if (parseResult.error) {
    return {
      status: "error",
      message: "Incorrect input",
    };
  }

  console.log(parseResult.data);

  return {
    status: "success",
    message: "Test message",
  };
}

export type CreatePremiseAction = typeof createPremiseAction;
