import type { PremisePriceMode } from "@prisma/client";
import { useTranslations } from "next-intl";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { SubSection } from "@/components/common/cards/sub-section";
import { Input, Radio } from "@/components/uikit";
import type { CreatePremiseFormSchemaProps } from "@/lib/actions/premise";
import { minimalDonation } from "@/lib/shared/config/donation";
import { priceFormatter } from "@/lib/utils";
import { css } from "~/styled-system/css";
import { HStack, Stack } from "~/styled-system/jsx";

const priceModes: PremisePriceMode[] = ["arbitrary", "donation"];

export function PriceModeSelector() {
  const t = useTranslations("profile.premises.add");
  const {
    register,
    setValue,
    getValues,
    formState: { defaultValues },
  } = useFormContext<CreatePremiseFormSchemaProps>();

  return (
    <SubSection>
      <h2 className="title">{t("groups.price_mode")}</h2>
      <HStack gap="4">
        {priceModes.map((mode) => (
          <Radio
            key={mode}
            label={t(`price_modes.${mode}`)}
            value={mode}
            defaultChecked={
              mode === getValues("openHoursAndPrice.priceMode") ||
              mode === defaultValues?.openHoursAndPrice?.priceMode
            }
            {...register("openHoursAndPrice.priceMode", {
              onChange: () => {
                setValue("openHoursAndPrice.openHours", []);
              },
            })}
          />
        ))}
      </HStack>
      <DonationPriceSelector />
    </SubSection>
  );
}

function DonationPriceSelector() {
  const t = useTranslations("profile.premises.add");
  const { control, watch } = useFormContext<CreatePremiseFormSchemaProps>();
  const priceMode = useWatch({ control, name: "openHoursAndPrice.priceMode" });
  console.log(watch("openHoursAndPrice.minimalPrice"));
  if (priceMode !== "donation") return null;

  return (
    <Stack gap="4">
      <Controller
        control={control}
        name="openHoursAndPrice.minimalPrice"
        render={({ field }) => (
          <Input
            {...field}
            onChange={({ target }) => {
              field.onChange(Number(target.value) || undefined);
            }}
            className={css({ maxWidth: "60" })}
            type="number"
            inputMode="decimal"
            min={minimalDonation}
            step="0.01"
            placeholder={t("fields.donation_minimal_price")}
          />
        )}
      />
      <span
        className={css({
          fontSize: "sm",
          bgColor: "secondary.lightest",
          borderRadius: "sm",
          padding: "4",
          flexBasis: "max-content",
        })}
      >
        {t("fields.donation_price_notice", {
          price: priceFormatter.format(minimalDonation),
        })}
      </span>
    </Stack>
  );
}
