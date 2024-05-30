import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";
import { Checkbox } from "@/components/uikit";
import { CreatePremiseFormSchemaProps } from "@/lib/actions/premise/validation";
import {
  amenitiesTags,
  type AmenityGroup,
} from "@/lib/shared/config/amenities";
import { getError } from "@/utils/forms/errors";
import { Flex, Stack } from "~/styled-system/jsx";

export function AmenitySelector() {
  const t = useTranslations("amenities");
  const {
    register,
    clearErrors,
    getValues,
    formState: { errors },
  } = useFormContext<CreatePremiseFormSchemaProps>();

  const formFieldPath = "parametersAndAmenities";

  // Filter the amenities to get only those that are checked (i.e., have a true value) and get the count.
  const checkedAmenitiesCount = () => {
    const amenities = getValues().parametersAndAmenities.amenities;
    return Object.values(amenities).filter((value) => value).length;
  };

  return (Object.keys(amenitiesTags) as AmenityGroup[]).map((amenityGroup) => (
    <>
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
              data-invalid={getError(
                errors,
                `${formFieldPath}.amenities.${amenity}`,
              )}
              {...register(`${formFieldPath}.amenities.${amenity}`, {
                onChange: () => {
                  if (checkedAmenitiesCount() === 5) {
                    clearErrors(formFieldPath);
                  }
                },
              })}
            />
          ))}
        </Flex>
      </Stack>
    </>
  ));
}
