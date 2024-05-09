import { zodResolver } from "@hookform/resolvers/zod";
import type { $Enums } from "@prisma/client";
import { areIntervalsOverlapping, isBefore } from "date-fns";
import { millisecondsInHour } from "date-fns/constants";
import { formatInTimeZone, getTimezoneOffset } from "date-fns-tz";
import { useTranslations } from "next-intl";
import {
  useForm,
  useWatch,
  type Control,
  type UseFieldArrayAppend,
  type UseFormGetValues,
} from "react-hook-form";
import toast from "react-hot-toast";
import { useSearchBoxTimeZone } from "@/components/common/maps/MapboxResponseProvider";
import { Input, Select, Button } from "@/components/uikit";
import type { CreatePremiseSchema } from "@/lib/actions/premise";
import {
  openHoursSchema,
  type OpenHoursSchema,
} from "@/lib/actions/premise/validation";
import { HStack, InlineBox, Stack, styled } from "~/styled-system/jsx";

export function AddOpenHoursRecord({
  day,
  append,
  getValues,
}: {
  day: $Enums.DayOfTheWeek;
  append: UseFieldArrayAppend<CreatePremiseSchema, "openHours">;
  getValues: UseFormGetValues<CreatePremiseSchema>;
}) {
  const t = useTranslations("profile.premises.add.fields");
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { isValid },
  } = useForm<OpenHoursSchema>({
    mode: "onChange",
    resolver: zodResolver(openHoursSchema),
    defaultValues: { day },
  });
  const timeZone = useSearchBoxTimeZone();

  const addButtonClicked = (input: OpenHoursSchema) => {
    if (!timeZone) return;

    const openHours = getValues("openHours");

    // checking if a user is trying to add the range intersecting with an existing range
    const foundRecord = openHours.find(
      (field) =>
        field.day === input.day &&
        areIntervalsOverlapping(
          { start: input.startTime, end: input.endTime },
          { start: field.startTime, end: field.endTime },
        ),
    );
    if (foundRecord) {
      const errorMessage = {
        start: formatInTimeZone(foundRecord.startTime, timeZone, "HH:mm"),
        end: formatInTimeZone(foundRecord.endTime, timeZone, "HH:mm"),
      };
      toast.error(`${t("open_hours_existing_range_error_msg", errorMessage)}`);

      return;
    }

    append(input);
    reset();
  };

  return (
    <Stack gap="10px" marginBlockStart="24px" alignItems="flex-start">
      <HStack gap="7px">
        <Select placeholder="XX:00" {...register("startTime")}>
          <TimeSelectOptions watchedName="endTime" control={control} />
        </Select>
        <span>-</span>
        <Select placeholder="XX:00" {...register("endTime")}>
          <TimeSelectOptions watchedName="startTime" control={control} />
        </Select>
      </HStack>
      <styled.label
        display="flex"
        alignItems="center"
        gap="7px"
        flexWrap="wrap"
        whiteSpace="nowrap"
      >
        {t("open_hours_price_label")}
        <InlineBox
          display="flex"
          alignItems="center"
          flexBasis="min-content"
          gap="7px"
          css={{ "& > .input": { minWidth: "65px" } }}
        >
          <Input
            type="number"
            inputMode="decimal"
            step="0.01"
            min="0"
            placeholder="000,00"
            {...register("price", { valueAsNumber: true })}
          />
          zł
        </InlineBox>
      </styled.label>
      <Button
        type="button"
        variant="outline"
        onClick={handleSubmit(addButtonClicked)}
        disabled={!isValid || !timeZone}
      >
        {t("open_hours_add_record_btn_label")}
      </Button>
    </Stack>
  );
}

function TimeSelectOptions({
  watchedName,
  control,
}: {
  watchedName: Extract<keyof OpenHoursSchema, "startTime" | "endTime">;
  control: Control<OpenHoursSchema>;
}) {
  const isStartTime = watchedName === "startTime";
  const watchedValue = useWatch({
    control,
    name: watchedName,
    defaultValue: "",
  });
  const timeZone = useSearchBoxTimeZone();

  if (!timeZone) return null;

  return Array.from({ length: 25 }, (_, i) => {
    const date = new Date(0);

    // to avoid timezone offset issues and to leave consistency between all DB records
    date.setUTCHours(i - getTimezoneOffset(timeZone) / millisecondsInHour);

    const value = date.toISOString();
    const isDisabled =
      watchedValue.length > 0 && isStartTime
        ? isBefore(value, watchedValue)
        : isBefore(watchedValue, value);

    const isSameTime =
      watchedValue.length > 0 && new Date(watchedValue).toISOString() === value;

    return (
      <option key={value} value={value} disabled={isDisabled || isSameTime}>
        {String(i).padStart(2, "0")}:00
      </option>
    );
  });
}
