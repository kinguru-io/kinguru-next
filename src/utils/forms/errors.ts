type ErrorsType = Record<string, any>;
export const getError = (errors: ErrorsType, fieldName: string) => {
  const fieldNames = fieldName.split(".");
  let currentError = errors;

  for (const name of fieldNames) {
    currentError = currentError?.[name];
    if (!currentError) {
      break;
    }
  }

  return currentError;
};

type TranslationFunction<T extends Record<string, any>> = <
  K extends keyof T,
  TranslationValues = {},
  Formats = any,
>(
  key: K,
  values?: TranslationValues,
  formats?: Formats,
) => string;

export const handleFormErrorMsg = (
  message: string,
  t: TranslationFunction<{
    [key: string]: string;
  }>,
) => {
  return JSON.parse(message)
    .issues.map((issue: { message: string; path: string[] }) => {
      const messageT = issue.message || issue.path[0];
      return t(messageT);
    })
    .join("\r\n");
};
