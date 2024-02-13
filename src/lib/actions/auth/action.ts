export type ResetPasswordState = { status: string; message: string } | null;

export async function resetPassword(
  _prevState: ResetPasswordState,
  data: FormData,
): Promise<ResetPasswordState> {
  await delay(500);

  return {
    status: "success",
    message: JSON.stringify([...data.entries()]),
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
