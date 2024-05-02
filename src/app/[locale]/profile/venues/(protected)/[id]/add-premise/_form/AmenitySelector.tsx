import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";
import { Checkbox } from "@/components/uikit";
import type { CreatePremiseSchema } from "@/lib/actions/premise";
import {
  amenitiesTags,
  type AmenityGroup,
} from "@/lib/shared/config/amenities";
import { Flex, Stack } from "~/styled-system/jsx";

export function AmenitySelector() {
  const t = useTranslations("amenities");
  const { register } = useFormContext<CreatePremiseSchema>();

  return (Object.keys(amenitiesTags) as AmenityGroup[]).map((amenityGroup) => (
    <Stack
      key={amenityGroup}
      gap="25px"
      css={{
        "& > h5": {
          textStyle: "heading.6",
          textDecoration: "none",
          textAlign: "center",
        },
      }}
    >
      <h5>{t(`group.${amenityGroup}`)}</h5>
      <Flex
        flexWrap="wrap"
        justifyContent="space-between"
        gap="5px"
        css={{
          "& > .input_checkbox__root": {
            maxWidth: "239px",
            flexBasis: "40%",
            flexGrow: "1",
          },
        }}
      >
        {amenitiesTags[amenityGroup].map((amenity) => (
          <Checkbox
            key={amenity}
            label={t(amenity)}
            {...register(`amenities.${amenity}`)}
          />
        ))}
      </Flex>
    </Stack>
  ));
}
