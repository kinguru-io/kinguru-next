import { zodResolver } from "@hookform/resolvers/zod";
import type { $Enums } from "@prisma/client";
import { useTranslations } from "next-intl";
import {
  useForm,
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
import { css } from "~/styled-system/css";
import { Flex } from "~/styled-system/jsx";

export function AddOpenHoursRecord({
  day,
  append,
  getValues,
}: {
  day: $Enums.DayOfTheWeek;
  append: UseFieldArrayAppend<
    CreatePremiseFormSchemaProps,
    "openHoursAndPrice.openHours"
  >;
  getValues: UseFormGetValues<CreatePremiseFormSchemaProps>;
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

  const addButtonClicked = (input: OpenHoursSchema) => {
    const openHours = getValues("openHoursAndPrice.openHours");

    // checking if a user is trying to add the range intersecting with an existing range
    const foundRecord = openHours.find(
      (field) =>
        field.day === input.day &&
        input.openTime <= field.closeTime &&
        field.openTime <= input.closeTime,
    );
    if (foundRecord) {
      const errorMessage = {
        start: foundRecord.openTime / 100 + ":00",
        end: foundRecord.closeTime / 100 + ":00",
      };
      toast.error(`${t("open_hours_existing_range_error_msg", errorMessage)}`);

      return;
    }

    append(input);
    reset();
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
          {...register("openTime", { valueAsNumber: true })}
        >
          <TimeSelectOptions watchedName="closeTime" control={control} />
        </Select>
        <Select
          placeholder={t("open_hours_to_label")}
          {...register("closeTime", { valueAsNumber: true })}
        >
          <TimeSelectOptions watchedName="openTime" control={control} />
        </Select>
        <Input
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
  watchedName: Extract<keyof OpenHoursSchema, "openTime" | "closeTime">;
  control: Control<OpenHoursSchema>;
}) {
  const isObservingOpenTime = watchedName === "openTime";
  const watchedValue = useWatch({
    control,
    name: watchedName,
    defaultValue: -1,
  });

  return Array.from({ length: 25 }, (_, i) => {
    const inputValue = i * 100;
    const disabled = isObservingOpenTime
      ? inputValue < watchedValue
      : inputValue > watchedValue;

    return (
      <option
        key={inputValue}
        value={inputValue}
        disabled={
          watchedValue !== -1 && (disabled || watchedValue === inputValue)
        }
      >
        {String(i).padStart(2, "0")}:00
      </option>
    );
  });
}
