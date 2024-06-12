export type AnyObject = { [key: string]: any };
// Generic function to merge first-level children of an object
export function transformMultiFormPayload<
  T extends AnyObject,
  R extends AnyObject,
>(obj: T): R {
  let result: R = {} as R;

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      if (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value)
      ) {
        for (const childKey in value) {
          if (value.hasOwnProperty(childKey)) {
            result[childKey] = value[childKey];
          }
        }
      }
    }
  }

  return result;
}
