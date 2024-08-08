import { createSharedPathnamesNavigation } from "next-intl/navigation";

export const locales = ["en", "pl"] as const;
export type Locale = (typeof locales)[number];
export function isLocale(locale: string): locale is Locale {
  return locales.includes(locale as any);
}

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales });

export const staticPaths = locales.map((locale) => ({
  params: {
    locale,
  },
}));
