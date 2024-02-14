import { ZodEffects, ZodTypeAny } from "zod";

export type AuthFormState = {
  status: "success" | "error";
  message: string;
} | null;

// ? фабрика выглядит неплохо, если сами экшены можно уместить в функцию
// храниться будет в `lib/actions/auth/utils.ts` без экспорта во внешний мир
//
// TODO remove once fabric using is discussed
// function createFormAction(action, schema) {
//   return async function processAction(prevState, formData) {
//     try {
//       await schema.parse(formData) // unsafe parsing so ZodError will be thrown
//       await action()

//       return { status: 'success', message: 'xxx' }
//     } catch(e) {
//       if (e instanceof ZodError) { ... }

//       return { status: 'error', message: 'xxx' }
//     }
//   }
// }

export function createFormAction<T extends ZodEffects<ZodTypeAny>>(schema: T) {
  return async function processAction(
    _prevState: AuthFormState,
    data: FormData,
  ): Promise<AuthFormState> {
    await delay(500);

    const parseResult = schema.safeParse(data);

    if (!parseResult.success) {
      return {
        status: "error",
        message: JSON.stringify(parseResult.error),
      };
    }

    return {
      status: "success",
      message: JSON.stringify(data),
    };
  };
}

// placeholder
function delay(timeout: number) {
  return new Promise<void>((res) => {
    const id = setTimeout(() => {
      res();
      clearTimeout(id);
    }, timeout);
  });
}
