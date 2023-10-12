'use client'

import {ReactNode} from 'react'
import {Button} from 'lib/uikit/Button'
import {useFormStatus} from 'utils/use-form'

export interface SubmitButtonProps {
  children: Array<ReactNode> | ReactNode
}

export function SubmitButton({children}: SubmitButtonProps) {
  const {pending} = useFormStatus()
  return (
    <Button isLoading={pending} type="submit">
      {children}
    </Button>
  )
}
