import type { Locale } from "@/navigation";

export function hoursFormatter(locale: Locale) {
  return new Intl.NumberFormat(locale, {
    style: "unit",
    unit: "hour",
    unitDisplay: "long",
  });
}
