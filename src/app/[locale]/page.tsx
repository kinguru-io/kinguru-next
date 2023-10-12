'use client'
import {SendingOutInvitations} from 'lib/actions/SendingOutInvitations'
import {SubmitButton} from 'lib/components'
import {
  Textarea,
  Input,
  FormControl,
  FormErrorMessage,
  FormTitle
} from 'lib/uikit'
import {useFormState} from 'utils/use-form'

const initialState = {
  message: ''
}

export default function Home() {
  const [state, formAction] = useFormState(SendingOutInvitations, initialState)
  return (
    <form action={formAction}>
      <FormControl>
        <FormTitle isRequired>E-mail:</FormTitle>
        <Input name="email" type="email" />
        <FormErrorMessage>Enter valid email</FormErrorMessage>
      </FormControl>
      <FormControl>
        <FormTitle isRequired>E-mail2:</FormTitle>
        <Input type="email" />
        <FormErrorMessage>Enter valid email2</FormErrorMessage>
      </FormControl>
      <FormControl>
        <FormTitle isRequired>E-mail2:</FormTitle>
        <Textarea />
        <FormErrorMessage>Enter valid email2</FormErrorMessage>
      </FormControl>
      <div>{state.message}</div>
      <SubmitButton>bl</SubmitButton>
    </form>
  )
}
