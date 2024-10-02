import { useTranslations } from "next-intl";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { SubSection } from "@/components/common/cards/sub-section";
import { Checkbox, Input } from "@/components/uikit";
import type { CreatePremiseFormSchemaProps } from "@/lib/actions/premise";
import { Flex } from "~/styled-system/jsx";

export function OptionsSelector() {
  const t = useTranslations("profile.premises.add.groups");

  return (
    <SubSection>
      <h2 className="title">{t("options")}</h2>
      <MinimalBookingSlotsNumber />
    </SubSection>
  );
}

function MinimalBookingSlotsNumber() {
  const t = useTranslations("profile.premises.add");
  const { register, formState, setValue } =
    useFormContext<CreatePremiseFormSchemaProps>();
  const [isWithMinimumSlots, setMinimumSlotsState] = useState(
    (formState.defaultValues?.openHoursAndPrice?.minimalSlotsToBook || 0) > 0,
  );

  const checkboxChanged = () =>
    setMinimumSlotsState((prevState) => {
      if (prevState) {
        setValue("openHoursAndPrice.minimalSlotsToBook", undefined);
      }

      return !prevState;
    });

  return (
    <Flex css={{ gap: "4", "& > *": { flexBasis: "fit-content" } }}>
      <Checkbox
        checked={isWithMinimumSlots}
        onChange={checkboxChanged}
        label={t("booking_amount")}
      />
      <Input
        type="number"
        inputMode="numeric"
        min="1"
        step="1"
        placeholder={t("booking_amount_input_label")}
        {...register("openHoursAndPrice.minimalSlotsToBook", {
          valueAsNumber: true,
          disabled: !isWithMinimumSlots,
        })}
      />
    </Flex>
  );
}
