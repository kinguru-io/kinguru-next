import cn from 'classnames'
import {LabelHTMLAttributes} from 'react'

export interface FormControlProps
  extends LabelHTMLAttributes<HTMLLabelElement> {}

export function FormControl(props: Partial<FormControlProps>) {
  const {children, ...labelProps} = Object.assign({}, props)
  const classNames = cn('flex', 'flex-col', 'mb-1')

  return (
    <label className={classNames} {...labelProps}>
      {children}
    </label>
  )
}
