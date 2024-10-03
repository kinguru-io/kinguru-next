import { getTranslations } from "next-intl/server";
import { Tag } from "@/components/uikit";
import {
  amenityTagKeyMap,
  isAmenityHandled,
  type Amenity,
  type AmenityGroup,
} from "@/lib/shared/config/amenities";
import { groupBy } from "@/lib/shared/utils/array";
import { css } from "~/styled-system/css";
import { Flex, Stack } from "~/styled-system/jsx";

export async function PremiseAmenities({ amenities }: { amenities: string[] }) {
  const t = await getTranslations("amenities");

  const groupedTags = groupBy(amenities, (amenity) =>
    isAmenityHandled(amenity) ? amenityTagKeyMap[amenity] : "else",
  );

  return (
    <Stack gap="1">
      {Object.entries(groupedTags).map(([group, amenitiesList]) => {
        if (!amenitiesList) return null;

        return (
          <Stack gap="1">
            <span className={css({ fontWeight: "bold", fontSize: "xs" })}>
              {t(`group.${group as AmenityGroup}`)}
            </span>
            <Flex gap="1" flexWrap="wrap">
              {amenitiesList.map((amenity) => (
                <Tag key={amenity} colorPalette="tertiary" fontSize="sm">
                  {t(amenity as Amenity)}
                </Tag>
              ))}
            </Flex>
          </Stack>
        );
      })}
    </Stack>
  );
}
