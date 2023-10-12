import {
  createLocalizedPathnamesNavigation,
  Pathnames
} from 'next-intl/navigation'

export const locales = ['en', 'pl'] as const

export const pathnames = {
  '/': '/',
  '/about': {
    en: '/about',
    pl: '/about'
  }
} satisfies Pathnames<typeof locales>

export const {Link, redirect, usePathname, useRouter} =
  createLocalizedPathnamesNavigation({
    locales,
    pathnames
  })
