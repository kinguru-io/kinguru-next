import { resetFormSchema } from "./validation";

export type ResetPasswordState = {
  status: "success" | "error";
  message: string;
} | null;

export async function resetPassword(
  _prevState: ResetPasswordState,
  data: FormData,
): Promise<ResetPasswordState> {
  await delay(500);

  const parseResult = resetFormSchema.safeParse(data);

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
