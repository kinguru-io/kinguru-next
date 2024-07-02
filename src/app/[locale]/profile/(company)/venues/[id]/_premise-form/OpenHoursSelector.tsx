import { compareAsc } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import { useLocale, useTranslations } from "next-intl";
import { useFieldArray, useFormContext } from "react-hook-form";
import toast from "react-hot-toast";
import { AddOpenHoursRecord } from "./AddOpenHoursRecord";
import { TagClosable } from "@/components/common";
import { useSearchBoxTimeZone } from "@/components/common/maps/MapboxResponseProvider";
import { Button, ErrorField } from "@/components/uikit";
import { CreatePremiseFormSchemaProps } from "@/lib/actions/premise/validation";
import { priceFormatter } from "@/lib/utils";
import { groupBy } from "@/lib/utils/array";
import { DAYS_OF_WEEK_ORDERED } from "@/lib/utils/datetime";
import { Grid, GridItem, HStack, InlineBox, Stack } from "~/styled-system/jsx";

export function OpenHoursSelector() {
  const locale = useLocale();
  const t = useTranslations("profile.premises.add.fields");

  const formFieldPath = "openHoursAndPrice.openHours";

  const weekdayFormatter = new Intl.DateTimeFormat(locale, {
    weekday: "long",
  });

  const {
    control,
    getValues,
    formState: { errors },
  } = useFormContext<CreatePremiseFormSchemaProps>();
  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: formFieldPath,
  });

  const timeZone = useSearchBoxTimeZone() || "UTC";

  const groupedFields = groupBy(
    fields
      .map((field, index) => ({ ...field, index }))
      .sort((fieldA, fieldB) => compareAsc(fieldA.startTime, fieldB.startTime)),
    (field) => field.day,
  );

  const spreadButtonClicked = () => {
    const mondayOpenHours = fields.filter(
      (field) => field.day === DAYS_OF_WEEK_ORDERED[0],
    );

    const copiedHoursToSunday = Array.from({ length: 6 }, (_, weekDayIndex) =>
      mondayOpenHours.map((field) => ({
        ...field,
        day: DAYS_OF_WEEK_ORDERED[weekDayIndex + 1],
      })),
    ).flat();

    replace(mondayOpenHours.concat(copiedHoursToSunday));
    toast.success("");
  };

  return DAYS_OF_WEEK_ORDERED.map((day, idx) => {
    const fieldsPerDay = groupedFields[day] || [];

    return (
      <>
        <Grid
          key={day}
          gap="0"
          gridTemplateColumns="repeat(14, 1fr)"
          layerStyle="outlineSecondaryWrapper"
          padding="0"
          overflow="hidden"
        >
          <GridItem
            gridColumn="2 / 9"
            paddingBlock="30px"
            paddingInlineEnd="10px"
          >
            <InlineBox textStyle="heading.6" textTransform="capitalize">
              {weekdayFormatter.format(new Date(0).setDate(5 + idx))}
            </InlineBox>
            <ErrorField error={errors?.openHoursAndPrice?.openHours} />
            <AddOpenHoursRecord
              day={day}
              append={append}
              getValues={getValues}
            />
          </GridItem>
          <GridItem
            gridColumn="9 / -1"
            bgColor="secondary.lighter"
            paddingBlock="30px"
            paddingInline="10px"
          >
            <Stack gap="8px" maxWidth="240px" marginInline="auto">
              <InlineBox paddingBlockEnd="4px">
                {t("open_hours_operating_mode")}
              </InlineBox>
              {fieldsPerDay.length > 0 ? (
                fieldsPerDay.map((field) => {
                  const start = formatInTimeZone(
                    field.startTime,
                    timeZone,
                    "H:mm",
                  );
                  const end = formatInTimeZone(field.endTime, timeZone, "H:mm");

                  return (
                    <TagClosable
                      key={field.id}
                      content={`${start} - ${end}`}
                      helper={priceFormatter.format(field.price)}
                      buttonLabel="X"
                      variant="primaryLighter"
                      onClick={() => remove(field.index)}
                    />
                  );
                })
              ) : (
                <InlineBox
                  textStyle="body.3"
                  color="secondary"
                  paddingBlockStart="17px"
                >
                  {t("open_hours_empty_notice")}
                </InlineBox>
              )}
            </Stack>
          </GridItem>
          {idx === 0 && (
            <HStack
              gridColumn="1 / -1"
              gap="10px"
              justifyContent="space-between"
              paddingBlock="20px"
              paddingInline="7.143%" // 100% / 14 columns
              borderBlockStart="2px dashed token(colors.tertiary)"
              css={{ "& > .button": { flexShrink: "0" } }}
            >
              {t("open_hours_spread_mode")}
              <Button
                type="button"
                onClick={spreadButtonClicked}
                disabled={fields.every(
                  (field) => field.day !== DAYS_OF_WEEK_ORDERED[0],
                )}
              >
                {t("open_hours_spread_mode_btn_label")}
              </Button>
            </HStack>
          )}
        </Grid>
      </>
    );
  });
}
