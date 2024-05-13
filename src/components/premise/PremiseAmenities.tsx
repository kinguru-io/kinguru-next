import { getTranslations } from "next-intl/server";
import { Tag } from "@/components/uikit";
import type { Amenity } from "@/lib/shared/config/amenities";
import { Flex } from "~/styled-system/jsx";

export async function PremiseAmenities({ amenities }: { amenities: string[] }) {
  const t = await getTranslations("amenities");

  return (
    <Flex gap="23px" wrap="wrap">
      {amenities.map((amenity) => (
        <Tag key={amenity} variant="ellipse" size="ellipse">
          {t(amenity as Amenity)}
        </Tag>
      ))}
    </Flex>
  );
}
