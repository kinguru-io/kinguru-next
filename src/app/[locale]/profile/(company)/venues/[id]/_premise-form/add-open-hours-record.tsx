import { zodResolver } from "@hookform/resolvers/zod";
import type { DayOfTheWeek } from "@prisma/client";
import { areIntervalsOverlapping, isBefore } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import {
  useForm,
  useFormContext,
  useWatch,
  type Control,
  type UseFieldArrayAppend,
  type UseFormGetValues,
} from "react-hook-form";
import toast from "react-hot-toast";
import { Input, Select, Button } from "@/components/uikit";
import {
  type OpenHoursSchema,
  openHoursSchema,
} from "@/lib/actions/premise/tabs/openHoursAndPrices";
import { CreatePremiseFormSchemaProps } from "@/lib/actions/premise/validation";
import { minimalDonation } from "@/lib/shared/config/donation";
import { css } from "~/styled-system/css";
import { Flex } from "~/styled-system/jsx";

type AddOpenHoursRecordProps = {
  day: DayOfTheWeek;
  append: UseFieldArrayAppend<
    CreatePremiseFormSchemaProps,
    "openHoursAndPrice.openHours"
  >;
  getValues: UseFormGetValues<CreatePremiseFormSchemaProps>;
};

export function AddOpenHoursRecord({
  day,
  append,
  getValues,
}: AddOpenHoursRecordProps) {
  const t = useTranslations("profile.premises.add.fields");
  const baseForm = useFormContext<CreatePremiseFormSchemaProps>();
  const minimalPrice = useWatch({
    control: baseForm.control,
    name: "openHoursAndPrice.minimalPrice",
  });
  const priceMode = useWatch({
    control: baseForm.control,
    name: "openHoursAndPrice.priceMode",
  });
  const {
    register,
    handleSubmit,
    resetField,
    control,
    setValue,
    formState: { isValid },
  } = useForm<OpenHoursSchema>({
    mode: "onChange",
    resolver: zodResolver(openHoursSchema),
    defaultValues: { day },
  });
  console.log(isValid);
  useEffect(() => {
    if (getValues("openHoursAndPrice.priceMode") === "donation") {
      setValue("price", minimalPrice || minimalDonation);
    }
  }, [minimalPrice, setValue, getValues]);

  useEffect(() => {
    if (priceMode === "arbitrary") {
      resetField("price");
    }
  }, [priceMode, resetField]);
  console.log(getValues("openHoursAndPrice.minimalPrice"));
  const addButtonClicked = (input: OpenHoursSchema) => {
    const openHours = getValues("openHoursAndPrice.openHours");

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
        start: formatInTimeZone(foundRecord.startTime, "UTC", "HH:mm"),
        end: formatInTimeZone(foundRecord.endTime, "UTC", "HH:mm"),
      };
      toast.error(`${t("open_hours_existing_range_error_msg", errorMessage)}`);

      return;
    }

    append(input);
    resetField("startTime");
    resetField("endTime");

    if (getValues("openHoursAndPrice.priceMode") === "arbitrary") {
      resetField("price");
    }
  };

  return (
    <Flex css={{ gap: "2", flexWrap: "wrap" }}>
      <Flex
        css={{
          flexGrow: "3",
          gap: "2",
          flexWrap: "wrap",
          "& > *": { flexBasis: "48", flexGrow: "1" },
        }}
      >
        <Select
          placeholder={t("open_hours_from_label")}
          {...register("startTime")}
        >
          <TimeSelectOptions watchedName="endTime" control={control} />
        </Select>
        <Select placeholder={t("open_hours_to_label")} {...register("endTime")}>
          <TimeSelectOptions watchedName="startTime" control={control} />
        </Select>
        <Input
          hidden={getValues("openHoursAndPrice.priceMode") === "donation"}
          type="number"
          inputMode="decimal"
          step="0.1"
          min="0"
          placeholder={t("open_hours_price_label")}
          {...register("price", { valueAsNumber: true })}
        />
      </Flex>
      <Button
        className={css({
          justifyContent: "center",
          flexBasis: "fit-content",
          flexGrow: "1",
        })}
        type="button"
        onClick={handleSubmit(addButtonClicked)}
        disabled={!isValid}
        rounded={false}
      >
        {t("open_hours_add_record_btn_label")}
      </Button>
    </Flex>
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
  return Array.from({ length: 25 }, (_, i) => {
    const date = new Date(0);
    // to avoid timezone offset issues and to leave consistency between all DB records
    date.setUTCHours(i);

    const value = date.toISOString();
    const isDisabled =
      watchedValue.length > 0 && isStartTime
        ? isBefore(value, watchedValue)
        : isBefore(watchedValue, value);

    const isSameTime =
      watchedValue.length > 0 && new Date(watchedValue).toISOString() === value;

    return (
      <option key={value} value={value} disabled={isDisabled || isSameTime}>
        {formatInTimeZone(date, "UTC", "HH:mm")}
      </option>
    );
  });
}
