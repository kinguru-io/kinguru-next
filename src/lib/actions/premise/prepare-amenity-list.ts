import type { CreatePremiseFormSchemaProps } from "./validation";

export function prepareAmenityList(
  amenities: CreatePremiseFormSchemaProps["parametersAndAmenities"]["amenities"],
) {
  return Object.entries(amenities).reduce((list, [amenityTag, toggled]) => {
    if (toggled) {
      list.push(amenityTag);
    }

    return list;
  }, [] as string[]);
}
