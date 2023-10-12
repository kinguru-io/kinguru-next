import {
  Button,
  Center,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Image,
  Input,
  Textarea,
  VStack
} from '@chakra-ui/react'
import {Field, FieldProps, Form, Formik} from 'formik'
import {usePresignedUpload} from 'next-s3-upload'
import {Dispatch, SetStateAction, SyntheticEvent} from 'react'
import {BiMinus, BiPlus} from 'react-icons/bi'
import {z} from 'zod'
import {toFormikValidationSchema} from 'zod-formik-adapter'
import ChakraTagInput from 'components/common/form/tag'
import {useLocale} from 'utils/use-locale'

export const EventDetailsSchema = z.object({
  topic: z.string(),
  description: z.string().min(40).max(2048),
  tags: z.array(z.string()).optional(),
  price: z.number().min(20),
  poster: z.string().url()
})

export function NewEventDetails({
  activeStep,
  details,
  setActiveStep,
  setDetails
}: {
  details?: z.infer<typeof EventDetailsSchema>
  setDetails?: Dispatch<
    SetStateAction<z.infer<typeof EventDetailsSchema> | undefined>
  >
  activeStep?: number
  setActiveStep?: Dispatch<SetStateAction<number>>
}) {
  const {t} = useLocale()
  const {FileInput, files, openFileDialog, uploadToS3} = usePresignedUpload()

  return (
    <Formik
      initialValues={
        details || {
          topic: '',
          description: '',
          tags: [],
          price: 20,
          poster: ''
        }
      }
      onSubmit={(values, actions) => {
        setActiveStep?.((activeStep || 0) + 1)
        setDetails?.(values)
        actions.setSubmitting(false)
      }}
      validationSchema={toFormikValidationSchema(EventDetailsSchema)}
    >
      {(props) => (
        <Form>
          <Flex flexDirection={['column', 'column', 'row']} py={10} w="full">
            <VStack px={5} w={['full', 'full', '50%']}>
              <Field name="topic">
                {({field, form, meta}: FieldProps) => (
                  <FormControl
                    isInvalid={
                      !!form.errors.topic?.length &&
                      form.touched.topic !== undefined
                    }
                  >
                    <FormLabel>{t('events.new_event_topic')}</FormLabel>
                    <Input variant="brand" {...field} />
                    <FormErrorMessage>{meta.error}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="description">
                {({field, form, meta}: FieldProps) => (
                  <FormControl
                    isInvalid={
                      !!form.errors.description?.length &&
                      form.touched.description !== undefined
                    }
                  >
                    <FormLabel>{t('events.new_event_description')}</FormLabel>
                    <Textarea variant="brand" {...field} />
                    <FormErrorMessage>{meta.error}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="tags">
                {({field, form, meta}: FieldProps) => (
                  <FormControl
                    isInvalid={
                      !!form.errors.tags?.length &&
                      form.touched.tags !== undefined
                    }
                  >
                    <FormLabel>{t('events.new_event_tags')}</FormLabel>
                    <ChakraTagInput
                      onTagsChange={(e: SyntheticEvent, tags) =>
                        field.onChange(
                          Object.assign(e, {
                            target: {
                              name: 'tags',
                              value: tags
                            }
                          })
                        )
                      }
                      tags={field.value}
                      variant="brand"
                    />
                    <FormErrorMessage>{meta.error}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="price">
                {({field, form, meta}: FieldProps) => (
                  <FormControl
                    isInvalid={
                      !!form.errors.price?.length &&
                      form.touched.price !== undefined
                    }
                  >
                    <FormLabel>{t('events.new_event_ticket_price')}</FormLabel>
                    <HStack maxW="320px">
                      <Button
                        onClick={() =>
                          field.onChange({
                            target: {
                              name: 'price',
                              value: field.value + 1
                            }
                          })
                        }
                      >
                        <BiPlus size={36} />
                      </Button>
                      <Input type="number" variant="brand" {...field} />
                      <Button
                        onClick={() =>
                          field.onChange({
                            target: {
                              name: 'price',
                              value: field.value - 1
                            }
                          })
                        }
                      >
                        <BiMinus size={36} />
                      </Button>
                    </HStack>
                    <FormErrorMessage>{meta.error}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </VStack>
            <Center>
              <Divider orientation="vertical" />
            </Center>
            <VStack pt={[5, 5, 0]} px={5} w={['full', 'full', '50%']}>
              <Field name="poster">
                {({field, form, meta}: FieldProps) => (
                  <FormControl
                    alignItems="center"
                    bgColor="gray.50"
                    display="flex"
                    flexDirection="column"
                    h="full"
                    isInvalid={
                      !!form.errors.poster?.length &&
                      form.touched.poster !== undefined
                    }
                    justifyContent="center"
                    p={5}
                    w="full"
                  >
                    <FileInput
                      onChange={async (file: any) => {
                        const {url} = await uploadToS3(file)
                        field.onChange({
                          target: {
                            name: 'poster',
                            value: url
                          }
                        })
                      }}
                    />
                    {field.value && (
                      <Image
                        backgroundColor="white"
                        border="1px solid"
                        borderColor="gray.100"
                        maxWidth="320px"
                        mb={5}
                        p={5}
                        src={field.value}
                      />
                    )}
                    <Button
                      isLoading={
                        files.filter((file) => file.size !== file.uploaded)
                          .length > 0
                      }
                      onClick={openFileDialog}
                      variant="secondary"
                    >
                      {t('events.new_event_select_poster')}
                    </Button>
                    <FormErrorMessage>{meta.error}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </VStack>
          </Flex>
          <HStack justifyContent="center" w="full">
            {activeStep !== 0 ? (
              <Button
                onClick={() =>
                  setActiveStep && setActiveStep((activeStep || 0) - 1)
                }
                variant="secondary"
              >
                {t('events.new_event_prev')}
              </Button>
            ) : null}
            <Button
              isLoading={props.isSubmitting}
              type="submit"
              variant="secondary"
            >
              {t('events.new_event_next')}
            </Button>
          </HStack>
        </Form>
      )}
    </Formik>
  )
}
