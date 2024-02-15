import type { ActionType, AuthFormResponse } from "@/lib/utils";

// TODO remove once real actions are available
export const noopAction: ActionType = (_data) => {
  return new Promise<AuthFormResponse>((res) => {
    const id = setTimeout(() => {
      res({
        status: "success",
        message: "PLACEHOLDER SERVER ACTION: resolved after 500ms",
      });
      clearTimeout(id);
    }, 500);
  });
};
