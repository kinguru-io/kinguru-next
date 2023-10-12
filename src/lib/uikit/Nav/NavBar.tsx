import {ReactNode} from 'react'

export interface NavBarProps {
  children: Array<ReactNode> | ReactNode
}

export function NavBar({children}: NavBarProps) {
  return <nav>{children}</nav>
}
