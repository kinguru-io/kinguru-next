import {TextareaHTMLAttributes} from 'react'
import {UIKitProps} from 'lib/uikit'
import {textareaClassNames} from './styles'

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement>,
    UIKitProps {
  isRounded: boolean
}

export function Textarea(props: Partial<TextareaProps>) {
  const {full, isRounded, size, variant, ...textareaProps} = Object.assign(
    {
      size: 'base',
      variant: 'secondary',
      isRounded: false,
      full: false
    },
    props
  )

  return (
    <textarea
      className={textareaClassNames({
        isRounded,
        size,
        variant,
        full
      })}
      {...textareaProps}
    />
  )
}
