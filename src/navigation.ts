import { createSharedPathnamesNavigation } from "next-intl/navigation";

export const locales = ["en", "pl", "ru"] as const;
export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales });
export const staticPaths = locales.map((locale) => ({
  params: {
    locale,
  },
}));
