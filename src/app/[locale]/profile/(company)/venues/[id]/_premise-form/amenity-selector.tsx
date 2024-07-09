import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";
import {
  Accordion,
  AccordionItemContent,
  AccordionItemToggle,
  Checkbox,
} from "@/components/uikit";
import { CreatePremiseFormSchemaProps } from "@/lib/actions/premise/validation";
import {
  amenitiesTags,
  type AmenityGroup,
} from "@/lib/shared/config/amenities";
import { getError } from "@/utils/forms/errors";
import { Grid, Stack } from "~/styled-system/jsx";

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
    return Object.values(amenities).filter(Boolean).length;
  };

  return (
    <Stack gap="2">
      {(Object.keys(amenitiesTags) as AmenityGroup[]).map(
        (amenityGroup, idx) => (
          <Accordion key={amenityGroup}>
            <AccordionItemToggle
              css={{
                fontWeight: "bold",
                paddingInline: "0",
                bgColor: "unset",
                borderBlockEnd: "1px solid {colors.primary}",
                borderRadius: "0",
                _peerChecked: { borderBlockEndColor: "transparent" },
              }}
              checkboxProps={{ defaultChecked: idx <= 1 }} // the first two sections are opened
            >
              {t(`group.${amenityGroup}`)}
            </AccordionItemToggle>
            <AccordionItemContent>
              <Grid
                gridTemplateColumns="repeat(auto-fit, minmax({spacing.60}, 1fr))"
                gap="4"
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
                        if (checkedAmenitiesCount() >= 5) {
                          clearErrors(formFieldPath);
                        }
                      },
                    })}
                  />
                ))}
              </Grid>
            </AccordionItemContent>
          </Accordion>
        ),
      )}
    </Stack>
  );
}
