import cn from 'classnames'
import {HTMLInputTypeAttribute} from 'react'
import {buttonClassNames} from '../Button'
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

const inputTypes = <const>['submit', 'text']
type inputTypesType = (typeof inputTypes)[number]

const inputStyles: {
  [key in inputTypesType]: (props: inputClassNamesProps) => string
} = {
  submit: ({full, size, variant}: inputClassNamesProps) =>
    buttonClassNames(size, variant, full),
  text: ({isRounded, size, variant}: inputClassNamesProps) => {
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
}

type inputClassNamesProps = {
  type: HTMLInputTypeAttribute
  isRounded: boolean
  full: boolean
} & UIKitProps

export function inputClassNames(props: inputClassNamesProps) {
  const type = inputTypes.find((value) => props.type === value)
  return inputStyles[type || 'text'](props)
}
