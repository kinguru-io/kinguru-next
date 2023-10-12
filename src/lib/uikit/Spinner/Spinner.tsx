import './styles.scss'
import cn from 'classnames'
import {SVGAttributes} from 'react'

export type SpinnerSize = 'sm' | 'base' | 'lg'

export interface SpinnerProps extends SVGAttributes<SVGElement> {
  size: SpinnerSize
  color: string
  show: boolean
}

export function Spinner(props: Partial<SpinnerProps>) {
  const {color, show, size, ...svgProps} = Object.assign(
    {
      size: 'base',
      color: 'black',
      show: true
    },
    props
  )

  const classNames = cn(`spinner-${size}`, show && `spinner-show-${size}`)

  return (
    <svg className={classNames} {...svgProps}>
      <circle
        className={show ? `circle-show-${size}` : ''}
        fill="transparent"
        stroke={color}
      />
    </svg>
  )
}
