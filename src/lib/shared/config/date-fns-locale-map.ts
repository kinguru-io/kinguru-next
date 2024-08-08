import { pl, enUS, type Locale as DateFnsLocale } from "date-fns/locale";
import type { Locale } from "@/navigation";

export const localeMap: Record<Locale, DateFnsLocale> = {
  en: enUS,
  pl: pl,
};
