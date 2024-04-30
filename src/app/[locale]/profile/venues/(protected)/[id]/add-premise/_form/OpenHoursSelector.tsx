import { compareAsc } from "date-fns";
import { useLocale, useTranslations } from "next-intl";
import { useFieldArray, useFormContext } from "react-hook-form";
import toast from "react-hot-toast";
import { AddOpenHoursRecord } from "./AddOpenHoursRecord";
import { TimeSlotCard } from "@/components/calendar/TimeSlotCard";
import { Button } from "@/components/uikit";
import type { CreatePremiseSchema } from "@/lib/actions/premise";
import { groupBy } from "@/lib/utils/array";
import { DAYS_OF_WEEK_ORDERED } from "@/lib/utils/datetime";
import { Grid, GridItem, HStack, InlineBox, Stack } from "~/styled-system/jsx";

export function OpenHoursSelector() {
  const locale = useLocale();
  const t = useTranslations("profile.premises.add.fields");
  const weekdayFormatter = new Intl.DateTimeFormat(locale, {
    weekday: "long",
  });
  const { control, getValues } = useFormContext<CreatePremiseSchema>();
  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "openHours",
  });

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
          <AddOpenHoursRecord day={day} append={append} getValues={getValues} />
        </GridItem>
        <GridItem
          gridColumn="9 / -1"
          bgColor="neutral.4"
          paddingBlock="30px"
          paddingInline="10px"
        >
          <Stack gap="8px" maxWidth="240px" marginInline="auto">
            <InlineBox paddingBlockEnd="4px">
              {t("open_hours_operating_mode")}
            </InlineBox>
            {fieldsPerDay.length > 0 ? (
              fieldsPerDay.map((field) => (
                <TimeSlotCard
                  key={field.id}
                  time={new Date(field.startTime)}
                  endTime={new Date(field.endTime)}
                  timeZone="UTC"
                  price={field.price}
                  buttonLabel="X"
                  variant="primaryLighter"
                  onClick={() => remove(field.index)}
                />
              ))
            ) : (
              <InlineBox
                textStyle="body.3"
                color="neutral.2"
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
            borderBlockStart="2px dashed token(colors.neutral.3)"
            css={{ "& > .button": { flexShrink: "0" } }}
          >
            {t("open_hours_spread_mode")}
            <Button
              type="button"
              variant="solid"
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
    );
  });
}
