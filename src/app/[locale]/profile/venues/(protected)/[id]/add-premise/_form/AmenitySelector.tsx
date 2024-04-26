"use client";

import { useTranslations, type MessageKeys } from "next-intl";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Checkbox } from "@/components/uikit";
import { type CreatePremiseSchema } from "@/lib/actions/premise";
import {
  amenitiesTags,
  type AmenityGroup,
} from "@/lib/shared/config/amenities";
import { Flex, Stack } from "~/styled-system/jsx";

export function AmenitySelector() {
  const t = useTranslations("amenities");
  const { control } = useFormContext<CreatePremiseSchema>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "amenities",
  });

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
      <h5>{t(`${amenityGroup}_group`)}</h5>
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
            name={amenity}
            onChange={(e) => {
              const index = fields.findIndex(
                (field) => field.amenity === e.target.name,
              );

              if (index === -1) {
                append({ amenity });
              } else {
                remove(index);
              }
            }}
            label={t(`${amenityGroup}.${amenity}` as MessageKeys<never, never>)}
          />
        ))}
      </Flex>
    </Stack>
  ));
}
