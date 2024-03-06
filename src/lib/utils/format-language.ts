import type { Locale } from "@/navigation";

export function languageFormatter(locale: Locale) {
  return new Intl.DisplayNames(locale, { type: "language" });
}
