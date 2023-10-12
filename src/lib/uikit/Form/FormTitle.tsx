import cn from 'classnames'
import {ReactNode} from 'react'

export type FormTitleSize = 'sm' | 'base' | 'lg'

export interface FormTitleProps {
  size: FormTitleSize
  isRequired: boolean
  children: Array<ReactNode> | ReactNode
}

export function FormTitle(props: Partial<FormTitleProps>) {
  const {children, isRequired, size} = Object.assign(
    {
      size: 'base',
      isRequired: false
    },
    props
  )

  const sizes = {
    sm: ['text-sm'],
    base: ['text-base'],
    lg: ['text-lg']
  }

  const required = isRequired
    ? ["after:content-['*']", 'after:ml-0.5', 'after:text-red-500']
    : []

  const classNames = cn('mb-1', ...required, ...sizes[size])

  return <span className={classNames}>{children}</span>
}
