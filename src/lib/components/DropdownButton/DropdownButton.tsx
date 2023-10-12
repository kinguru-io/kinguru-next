import Link from 'next/link'
import {ReactNode, ButtonHTMLAttributes} from 'react'
import {UIKitProps} from 'lib/uikit'
import {dropdownButtonClassNames} from './styles'

export interface DropdownButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    Omit<Omit<UIKitProps, 'variant'>, 'size'> {
  isLoading: boolean
  variant: 'primary' | 'secondary' | 'base'
  size: 'sm' | 'base' | 'lg' | 'none'
  isDisabled: boolean
  children: Array<ReactNode> | ReactNode
}
export function DropdownButton(props: Partial<DropdownButtonProps>) {
  const {children, full, isDisabled, size, variant, ...buttonProps} =
    Object.assign(
      {
        size: 'none',
        variant: 'base',
        full: false,
        isDisabled: false
      },
      props
    )

  return (
    <>
      <button
        className={dropdownButtonClassNames(size, variant, full)}
        disabled={isDisabled}
        type="button"
      >
        {children}
      </button>
      <div className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
          <li>
            <Link
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              href="#"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              href="#"
            >
              Settings
            </Link>
          </li>
          <li>
            <Link
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              href="#"
            >
              Earnings
            </Link>
          </li>
          <li>
            <Link
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              href="#"
            >
              Sign out
            </Link>
          </li>
        </ul>
      </div>
    </>
  )
}
