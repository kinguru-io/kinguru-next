export const requiredFieldMessage = (
  t: (arg: string) => string,
  fieldName: string,
) => t(`fields.errors.${fieldName}_required`);
