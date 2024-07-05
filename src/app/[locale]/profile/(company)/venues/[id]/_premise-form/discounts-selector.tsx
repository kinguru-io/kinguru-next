import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import {
  useFieldArray,
  useForm,
  useFormContext,
  type UseFieldArrayAppend,
  type UseFieldArrayUpdate,
  type UseFormGetValues,
} from "react-hook-form";
import { TagClosable } from "@/components/common";
import { SubSection } from "@/components/common/cards/sub-section";
import { Button, Input, Select } from "@/components/uikit";
import {
  type DiscountsSchema,
  discountsSchema,
} from "@/lib/actions/premise/tabs/openHoursAndPrices";
import { CreatePremiseFormSchemaProps } from "@/lib/actions/premise/validation";
import { hoursFormatter } from "@/lib/utils";
import type { Locale } from "@/navigation";
import { css } from "~/styled-system/css";
import { Flex, Stack } from "~/styled-system/jsx";

export function DiscountsSelector() {
  const t = useTranslations("profile.premises.add.fields");
  const { control, getValues } = useFormContext<CreatePremiseFormSchemaProps>();
  const { fields, append, update, remove } = useFieldArray({
    control,
    name: "openHoursAndPrice.discounts",
  });

  return (
    <SubSection>
      <h2 className="title">{t("open_hours_discounts_heading")}</h2>
      <p className="helper">{t("open_hours_discounts_tip")}</p>
      <Stack gap={{ base: "4", md: "6" }}>
        <AddOpenHoursDiscountRecord
          append={append}
          update={update}
          getValues={getValues}
        />
        {fields.length > 0 && (
          <Stack gap="2">
            {fields.map(({ id, duration, discountPercentage }, index) => {
              return (
                <TagClosable
                  key={id}
                  content={`${discountPercentage}%`}
                  helper={t("open_hours_discounts_helper", { duration })}
                  buttonLabel="X"
                  variant="primaryLighter"
                  onClick={() => remove(index)}
                />
              );
            })}
          </Stack>
        )}
      </Stack>
    </SubSection>
  );
}

function AddOpenHoursDiscountRecord({
  append,
  update,
  getValues,
}: {
  append: UseFieldArrayAppend<
    CreatePremiseFormSchemaProps,
    "openHoursAndPrice.discounts"
  >;
  update: UseFieldArrayUpdate<
    CreatePremiseFormSchemaProps,
    "openHoursAndPrice.discounts"
  >;
  getValues: UseFormGetValues<CreatePremiseFormSchemaProps>;
}) {
  const locale = useLocale() as Locale;
  const t = useTranslations("profile.premises.add.fields");
  const {
    register,
    reset,
    handleSubmit,
    formState: { isValid },
  } = useForm<DiscountsSchema>({
    mode: "onChange",
    resolver: zodResolver(discountsSchema),
  });

  const formatter = hoursFormatter(locale);

  const addButtonClicked = (input: DiscountsSchema) => {
    const discounts = getValues("openHoursAndPrice.discounts");

    const index = discounts.findIndex(
      (discount) => discount.duration === input.duration,
    );

    if (index === -1) {
      append(input);
    } else {
      update(index, input);
    }

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
          placeholder={t("open_hours_discounts_label_time")}
          {...register("duration", { valueAsNumber: true })}
        >
          {Array.from({ length: 23 }, (_, i) => (
            <option key={i} value={i + 1}>
              {formatter.format(i + 1)}
            </option>
          ))}
        </Select>
        <Input
          type="number"
          inputMode="decimal"
          min="0.1"
          step="0.1"
          max="100"
          placeholder={t("open_hours_discounts_label")}
          {...register("discountPercentage", { valueAsNumber: true })}
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
