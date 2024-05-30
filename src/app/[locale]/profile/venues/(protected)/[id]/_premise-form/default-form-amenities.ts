import type { Premise } from "@prisma/client";
import type { CreatePremiseFormSchemaProps } from "@/lib/actions/premise";
import { amenitiesTags } from "@/lib/shared/config/amenities";

export function getDefaultFormAmenities(
  premiseAmenities?: Premise["amenities"],
) {
  return Object.values(amenitiesTags)
    .flat()
    .reduce(
      (defaultAmenities, amenity) => {
        defaultAmenities[amenity] = premiseAmenities?.includes(amenity);
        return defaultAmenities;
      },
      {} as CreatePremiseFormSchemaProps["parametersAndAmenities"]["amenities"],
    );
}
