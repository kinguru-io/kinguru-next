type ErrorsType = Record<string, any>;

export const CLEAR_ERROR_TIMEOUT_DURATION = 4000;

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
