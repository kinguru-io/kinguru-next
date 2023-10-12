import {ReactNode, ButtonHTMLAttributes} from 'react'
import {UIKitProps} from 'lib/uikit'
import {Spinner} from 'lib/uikit/Spinner'
import {buttonClassNames} from './styles'

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    UIKitProps {
  isLoading: boolean
  isDisabled: boolean
  children: Array<ReactNode> | ReactNode
}
export function Button(props: Partial<ButtonProps>) {
  const {
    children,
    full,
    isDisabled,
    isLoading,
    onClick,
    size,
    variant,
    ...buttonProps
  } = Object.assign(
    {
      size: 'base',
      variant: 'secondary',
      full: false,
      isDisabled: false
    },
    props
  )

  return (
    <button
      className={buttonClassNames(size, variant, full)}
      disabled={isDisabled || isLoading}
      onClick={(e) => (!isDisabled && !isLoading ? onClick?.(e) : undefined)}
      type="button"
      {...buttonProps}
    >
      <Spinner show={isLoading} />
      {!isLoading && children}
    </button>
  )
}
