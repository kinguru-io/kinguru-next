import cn from 'classnames'
import {ReactNode} from 'react'
import {UIKitProps} from '../index'

export interface ContainerProps extends UIKitProps {
  children: Array<ReactNode> | ReactNode
  className: string
}
export function Container(props: Partial<ContainerProps>) {
  const {children, className, full} = Object.assign(
    {
      full: false,
      className: ''
    },
    props
  )

  const fullWidth = full ? ['w-full'] : ['max-w-4xl']

  const classNames = cn(...fullWidth) + ' ' + className

  return <div className={classNames}>{children}</div>
}
