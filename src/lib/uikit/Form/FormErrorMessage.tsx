import cn from 'classnames'
import {ReactNode} from 'react'

export type FormErrorMessageSize = 'sm' | 'base' | 'lg'
export interface FormErrorMessageProps {
  size: FormErrorMessageSize
  isInvalid: boolean
  children: Array<ReactNode> | ReactNode
}
export function FormErrorMessage(props: Partial<FormErrorMessageProps>) {
  const {children, size} = Object.assign(
    {
      size: 'base'
    },
    props
  )

  const sizes = {
    sm: ['text-sm'],
    base: ['text-base'],
    lg: ['text-lg']
  }

  const classNames = cn(
    'mt-1',
    'invisible',
    'h-0',
    'peer-invalid:visible',
    'peer-invalid:h-auto',
    'text-red-500',
    ...sizes[size]
  )

  return <span className={classNames}>{children}</span>
}
