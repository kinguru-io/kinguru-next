import {InputHTMLAttributes} from 'react'
import {UIKitProps} from 'lib/uikit'
import {inputClassNames} from './styles'

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
    UIKitProps {
  isRounded: boolean
}

export function Input(props: Partial<InputProps>) {
  const {full, isRounded, size, variant, ...inputProps} = Object.assign(
    {
      full: false,
      size: 'base',
      variant: 'secondary',
      isRounded: false
    },
    props
  ) as InputProps

  return (
    <input
      className={inputClassNames({
        isRounded,
        size,
        variant,
        full,
        type: inputProps.type || 'text'
      })}
      {...inputProps}
    />
  )
}
