import Link from 'next/link'
import {ReactNode} from 'react'

export interface NavItemProps {
  href: string
  children: Array<ReactNode> | ReactNode
}

export function NavItem({children, href}: NavItemProps) {
  return <Link href={href}>{children}</Link>
}
