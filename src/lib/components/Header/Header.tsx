import Image from 'next/image'
import Link from 'next/link'
import {useTranslations} from 'next-intl'
import {ReactNode} from 'react'
import {Container} from 'lib/uikit'
import logoHeader from '../../../../public/img/logo_header.png'
import {UserSpace} from './UserSpace'

export interface HeaderProps {
  children: Array<ReactNode> | ReactNode
}
export function Header({children}: HeaderProps) {
  const t = useTranslations()
  return (
    <header className="h-15 p-3 sticky top-0 bg-white">
      <Container className="mx-auto flex justify-between items-center">
        <Link href="/">
          <Image
            alt={t.raw('company')}
            className="block h-auto w-auto"
            height={36}
            priority
            src={logoHeader}
            width={96}
          />
        </Link>
        <div className="invisible sm:visible">{children}</div>
        <UserSpace />
      </Container>
    </header>
  )
}
