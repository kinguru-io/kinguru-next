import {Noto_Sans} from 'next/font/google'
import {notFound} from 'next/navigation'
import {unstable_setRequestLocale as setRequestLocale} from 'next-intl/server'
import {ReactNode} from 'react'
import {Header} from 'lib/components/Header'
import {NavBar, NavItem} from 'lib/uikit/Nav'
import {locales} from 'navigation'

export function generateStaticParams() {
  return locales.map((locale) => ({locale}))
}

const notoSans = Noto_Sans({
  subsets: ['latin', 'cyrillic'],
  weight: ['100', '200', '300', '400', '500', '600', '700']
})

export default async function Layout({
  children,
  params: {locale}
}: {
  children: Array<ReactNode>
  params: {locale: string}
}) {
  const isValidLocale = locales.some((cur) => cur === locale)
  if (!isValidLocale) notFound()
  setRequestLocale(locale)

  return (
    <html lang={locale}>
      <body className={notoSans.className}>
        <Header>
          <NavBar>
            <NavItem href="/page">Hehe</NavItem>
            <NavItem href="/page">Hehe</NavItem>
          </NavBar>
        </Header>
        {children}
        {children}
        {children}
        {children}
      </body>
    </html>
  )
}
