import { compareAsc } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import { useLocale, useTranslations } from "next-intl";
import { useFieldArray, useFormContext } from "react-hook-form";
import toast from "react-hot-toast";
import { AddOpenHoursRecord } from "./add-open-hours-record";
import { TagClosable } from "@/components/common";
import { SubSection } from "@/components/common/cards/sub-section";
import { useSearchBoxTimeZone } from "@/components/common/maps/MapboxResponseProvider";
import {
  Accordion,
  AccordionItemContent,
  AccordionItemToggle,
  Button,
  ErrorField,
} from "@/components/uikit";
import { CreatePremiseFormSchemaProps } from "@/lib/actions/premise/validation";
import { priceFormatter } from "@/lib/utils";
import { groupBy } from "@/lib/utils/array";
import { DAYS_OF_WEEK_ORDERED } from "@/lib/utils/datetime";
import { css } from "~/styled-system/css";
import { HStack, InlineBox, Stack } from "~/styled-system/jsx";

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
    toast.success(t("open_hours_spread_mode_success"));
  };

  return (
    <Stack gap={{ base: "0", md: "4" }}>
      {DAYS_OF_WEEK_ORDERED.map((day, idx) => {
        const fieldsPerDay = groupedFields[day];

        return (
          <SubSection key={day} className={css({ paddingBlock: "4" })}>
            <Accordion>
              <AccordionItemToggle
                bgColor="unset"
                padding="0"
                checkboxProps={{ defaultChecked: idx === 0 }}
              >
                <InlineBox className="title" textTransform="capitalize">
                  {weekdayFormatter.format(new Date(0).setDate(5 + idx))}
                </InlineBox>
              </AccordionItemToggle>
              <AccordionItemContent>
                <Stack gap={{ base: "4", md: "6" }}>
                  <AddOpenHoursRecord
                    day={day}
                    append={append}
                    getValues={getValues}
                  />
                  {fieldsPerDay && (
                    <Stack gap="2">
                      {fieldsPerDay.map((field) => {
                        const start = formatInTimeZone(
                          field.startTime,
                          timeZone,
                          "H:mm",
                        );
                        const end = formatInTimeZone(
                          field.endTime,
                          timeZone,
                          "H:mm",
                        );

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
                      })}
                    </Stack>
                  )}
                  {day === "MONDAY" && (
                    <HStack
                      css={{
                        gap: "4",
                        padding: "4",
                        justifyContent: "space-between",
                        borderRadius: "md",
                        bgColor: "secondary.lighter",
                        flexWrap: "wrap",
                        fontSize: "px13",
                      }}
                    >
                      {t("open_hours_spread_mode")}
                      <Button
                        className={css({ paddingBlock: "3" })}
                        type="button"
                        colorPalette="success"
                        onClick={spreadButtonClicked}
                        disabled={fields.every(
                          (field) => field.day !== "MONDAY",
                        )}
                      >
                        {t("open_hours_spread_mode_btn_label")}
                      </Button>
                    </HStack>
                  )}
                </Stack>
              </AccordionItemContent>
            </Accordion>
            <ErrorField error={errors?.openHoursAndPrice?.openHours} />
          </SubSection>
        );
      })}
    </Stack>
  );
}
