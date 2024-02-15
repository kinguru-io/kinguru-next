import { ZodEffects, ZodError, ZodType, ZodTypeDef } from "zod";

export type AuthFormResponse = {
  status: "success" | "error";
  message: string;
};
export type AuthFormState = AuthFormResponse | null;
export type ActionType = (data: FormData) => Promise<AuthFormState>;

export function createFormAction<
  I,
  O,
  T extends ZodEffects<ZodType<O, ZodTypeDef, I>>,
>(action: ActionType, schema: T) {
  return async function processAction(
    _prevState: AuthFormState,
    data: FormData,
  ): Promise<AuthFormState> {
    try {
      schema.parse(data);
      const result = await action(data);

      return {
        status: "success",
        message: JSON.stringify(result?.message),
      };
    } catch (e) {
      if (e instanceof ZodError) {
        return {
          status: "error",
          message: JSON.stringify(e.errors),
        };
      }

      return {
        status: "error",
        message: "Something went wrong!",
      };
    }
  };
}
