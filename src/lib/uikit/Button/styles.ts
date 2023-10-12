import cn from 'classnames'

const variants = {
  primary: [
    'bg-primary',
    'hover:bg-primary-light',
    'active:ring-primary-light'
  ],
  secondary: ['bg-gray-200', 'hover:bg-gray-100', 'active:ring-gray-100']
}

const sizes = {
  sm: ['text-sm', 'px-6', 'py-3'],
  base: ['text-base', 'px-8', 'py-3'],
  lg: ['text-lg', 'px-10', 'py-4']
}

export function buttonClassNames(
  size: keyof typeof sizes,
  variant: keyof typeof variants,
  full: boolean
) {
  const fullStyle = full ? ['w-full'] : []
  return cn(
    'text-black',
    'outline:none',
    'active:ring-2',
    'rounded-full',
    'uppercase',
    'font-black',
    'tracking-tight',
    'transition-colors',
    'disabled:opacity-75',
    'disabled:active:ring-0',
    'disabled:cursor-not-allowed',
    ...fullStyle,
    ...variants[variant],
    ...sizes[size]
  )
}
