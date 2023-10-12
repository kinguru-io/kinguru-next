import {
  // @ts-ignore experimental react feature
  experimental_useOptimistic,
  useOptimistic as uOptimistic
} from 'react'
import {
  // @ts-ignore experimental react feature
  experimental_useFormState,
  useFormState as ufState,
  // @ts-ignore experimental react feature
  experimental_useFormStatus,
  useFormStatus as ufStatus
} from 'react-dom'

export const useFormState = experimental_useFormState as typeof ufState
export const useFormStatus = experimental_useFormStatus as typeof ufStatus
export const useOptimistic = experimental_useOptimistic as typeof uOptimistic
