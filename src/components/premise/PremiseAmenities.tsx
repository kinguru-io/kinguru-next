import { getTranslations } from "next-intl/server";
import { Tag } from "@/components/uikit";
import type { Amenity } from "@/lib/shared/config/amenities";

export async function PremiseAmenities({ amenities }: { amenities: string[] }) {
  const t = await getTranslations("amenities");

  return amenities.map((amenity) => (
    <Tag key={amenity} colorPalette="tertiary" fontSize="sm">
      {t(amenity as Amenity)}
    </Tag>
  ));
}
