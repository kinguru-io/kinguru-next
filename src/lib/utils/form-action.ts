import { ZodEffects, ZodType, ZodTypeDef } from "zod";

export type AuthFormResponse = {
  status: "success" | "error";
  message: string;
};
export type AuthFormState = AuthFormResponse | null;
export type ActionType<T> = (data: T) => Promise<AuthFormState>;

export function createFormAction<
  I,
  O,
  T extends ZodEffects<ZodType<O, ZodTypeDef, I>>,
>(action: ActionType<O>, schema: T) {
  return async function processAction(
    _prevState: AuthFormState,
    data: FormData,
  ): Promise<AuthFormState> {
    const parsedSchema = schema.safeParse(data);
    if (!parsedSchema.success) {
      return {
        status: "error",
        message: JSON.stringify(parsedSchema.error),
      };
    }
    return action(parsedSchema.data);
  };
}
