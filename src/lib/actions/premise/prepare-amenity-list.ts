import type { CreatePremiseSchema } from "./validation";

export function prepareAmenityList(
  amenities: CreatePremiseSchema["amenities"],
) {
  return Object.entries(amenities).reduce((list, [amenityTag, toggled]) => {
    if (toggled) {
      list.push(amenityTag);
    }

    return list;
  }, [] as string[]);
}
