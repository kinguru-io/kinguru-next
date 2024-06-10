import { useLocale } from "next-intl";
import { forwardRef, type ForwardedRef } from "react";
import { countryCodes } from "./country-codes-list";
import { Select } from "@/components/uikit";
import type { SelectProps } from "@/components/uikit/Select/Select";

export const CountrySelect = forwardRef(function CountrySelect(
  props: Omit<SelectProps, "children">,
  ref: ForwardedRef<HTMLSelectElement>,
) {
  const locale = useLocale();
  const formatter = new Intl.DisplayNames(locale, { type: "region" });

  // due to different languages it is need to be sorted again
  const countryList = countryCodes
    .map((code) => ({
      code,
      label: formatter.of(code),
    }))
    .sort(({ label: labelA = "" }, { label: labelB = "" }) =>
      labelA.localeCompare(labelB),
    );

  return (
    <Select ref={ref} {...props}>
      {countryList.map(({ code, label }) => {
        return (
          label && (
            <option key={code} value={code}>
              {label}
            </option>
          )
        );
      })}
    </Select>
  );
});
