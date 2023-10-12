import cn from 'classnames'
import {UIKitProps} from '../index'

const sizes = {
  sm: ['text-sm', 'py-2.5', 'px-4'],
  base: ['text-base', 'py-2.5', 'px-4'],
  lg: ['text-lg', 'py-3.5', 'px-5']
} as const

const variants = {
  primary: ['bg-gray-50'],
  secondary: ['bg-gray-50']
}

type textareaClassNamesProps = {
  isRounded: boolean
} & UIKitProps

export function textareaClassNames({
  isRounded,
  size,
  variant
}: textareaClassNamesProps) {
  const rounded = isRounded ? ['rounded-full'] : ['rounded-lg']
  return cn(
    `peer`,
    'border-2',
    'border-gray-700',
    'disabled:border-gray-500',
    'disabled:cursor-not-allowed',
    ...sizes[size],
    ...variants[variant],
    ...rounded
  )
}
