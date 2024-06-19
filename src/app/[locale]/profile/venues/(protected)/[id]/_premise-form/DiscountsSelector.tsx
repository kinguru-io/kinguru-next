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
import { Button, Input, Select } from "@/components/uikit";
import {
  type DiscountsSchema,
  discountsSchema,
} from "@/lib/actions/premise/tabs/openHoursAndPrices";
import { CreatePremiseFormSchemaProps } from "@/lib/actions/premise/validation";
import { hoursFormatter } from "@/lib/utils";
import type { Locale } from "@/navigation";
import { Grid, GridItem, HStack, InlineBox, Stack } from "~/styled-system/jsx";

export function DiscountsSelector() {
  const t = useTranslations("profile.premises.add.fields");
  const { control, getValues } = useFormContext<CreatePremiseFormSchemaProps>();
  const { fields, append, update, remove } = useFieldArray({
    control,
    name: "openHoursAndPrice.discounts",
  });

  return (
    <Stack gap="20px">
      <InlineBox textStyle="heading.6">
        {t("open_hours_discounts_heading")}
      </InlineBox>
      <InlineBox maxWidth="660px">{t("open_hours_discounts_tip")}</InlineBox>
      <Grid
        gap="0"
        gridTemplateColumns="repeat(14, 1fr)"
        layerStyle="outlineSecondaryWrapper"
        padding="0"
      >
        <GridItem
          gridColumn="2 / 9"
          paddingBlock="30px"
          paddingInlineEnd="10px"
        >
          <InlineBox textStyle="heading.6">
            {t("open_hours_discounts_form")}
          </InlineBox>
          <AddOpenHoursDiscountRecord
            append={append}
            update={update}
            getValues={getValues}
          />
        </GridItem>
        <GridItem
          gridColumn="9 / -1"
          bgColor="neutral.4"
          paddingBlock="30px"
          paddingInline="10px"
        >
          <Stack gap="8px" maxWidth="240px" marginInline="auto">
            <InlineBox paddingBlockEnd="4px">
              {t("open_hours_discounts")}
            </InlineBox>
            {fields.length > 0 ? (
              fields.map(({ id, duration, discountPercentage }, index) => {
                return (
                  <TagClosable
                    key={id}
                    content={`${discountPercentage}%`}
                    helper={
                      <InlineBox textStyle="body.3" whiteSpace="pre-line">
                        {t("open_hours_discounts_helper", { duration })}
                      </InlineBox>
                    }
                    buttonLabel="X"
                    variant="primaryLighter"
                    onClick={() => remove(index)}
                  />
                );
              })
            ) : (
              <InlineBox
                textStyle="body.3"
                color="neutral.2"
                paddingBlockStart="17px"
              >
                {t("open_hours_discounts_empty_notice")}
              </InlineBox>
            )}
          </Stack>
        </GridItem>
      </Grid>
    </Stack>
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

    if (index !== -1) {
      update(index, input);
    } else {
      append(input);
    }

    reset();
  };

  return (
    <Stack gap="10px" marginBlockStart="24px" alignItems="flex-start">
      <HStack whiteSpace="nowrap" flexWrap="wrap">
        {t.rich("open_hours_discounts_input", {
          noWrap: (chunks) => (
            <HStack
              flexShrink="0"
              css={{ "& > input[type=number]": { maxWidth: "50px" } }}
            >
              {chunks}
            </HStack>
          ),
          hoursSelector: (placeholder) => (
            <Select
              placeholder={placeholder as string}
              {...register("duration", { valueAsNumber: true })}
            >
              {Array.from({ length: 23 }, (_, i) => (
                <option key={i} value={i + 1}>
                  {formatter.format(i + 1)}
                </option>
              ))}
            </Select>
          ),
          percentageSelector: (placeholder) => (
            <Input
              type="number"
              inputMode="decimal"
              min="0.1"
              step="0.1"
              max="100"
              placeholder={placeholder as string}
              {...register("discountPercentage", { valueAsNumber: true })}
            />
          ),
        })}
      </HStack>
      <Button
        type="button"
        onClick={handleSubmit(addButtonClicked)}
        disabled={!isValid}
      >
        {t("open_hours_add_record_btn_label")}
      </Button>
    </Stack>
  );
}
