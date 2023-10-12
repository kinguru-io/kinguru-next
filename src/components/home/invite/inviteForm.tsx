import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useColorModeValue
} from '@chakra-ui/react'
import {Field, FieldProps, Form, Formik} from 'formik'
import {z} from 'zod'
import {toFormikValidationSchema} from 'zod-formik-adapter'
import {useLocale} from 'utils/use-locale'

export function InviteForm() {
  const {t} = useLocale()
  const inviteSchema = z.object({
    telephone: z.string().optional(),
    email: z.string().email(t('invite.invalid_email'))
  })
  const color = useColorModeValue('gray.100', 'gray.700')

  return (
    <Formik
      initialValues={{telephone: '', email: ''}}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2))
          actions.setSubmitting(false)
        }, 1000)
      }}
      validationSchema={toFormikValidationSchema(inviteSchema)}
    >
      {(props) => (
        <Form>
          <Field name="telephone">
            {({field, form, meta}: FieldProps) => (
              <FormControl
                isInvalid={
                  !!form.errors.telephone?.length &&
                  form.touched.telephone !== undefined
                }
                py={1}
              >
                <FormLabel color={color}>{t('invite.telephone')}</FormLabel>
                <Input variant="invitation" {...field} placeholder="+" />
                <FormErrorMessage>{meta.error}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="email">
            {({field, form, meta}: FieldProps) => (
              <FormControl
                isInvalid={
                  !!form.errors.email?.length &&
                  form.touched.email !== undefined
                }
                py={1}
              >
                <FormLabel color={color}>{t('invite.email')}</FormLabel>
                <Input variant="invitation" {...field} />
                <FormErrorMessage>{meta.error}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Button
            isLoading={props.isSubmitting}
            mt={6}
            type="submit"
            variant="primary"
          >
            {t('invite.subscribe')}
          </Button>
        </Form>
      )}
    </Formik>
  )
}
