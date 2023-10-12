import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useDisclosure
} from '@chakra-ui/react'
import Flicking from '@egjs/react-flicking'
import {Field, FieldProps, Form, Formik} from 'formik'
import {useSession} from 'next-auth/react'
import {useInView} from 'react-intersection-observer'
// @ts-ignore old component
import ReactStars from 'react-rating-stars-component'
import {z} from 'zod'
import {toFormikValidationSchema} from 'zod-formik-adapter'
import {Stripes} from 'components/common/stripes'
import {trpc} from 'utils/trpc'
import {useLocale} from 'utils/use-locale'

export function EventCommentsSection({eventId}: {eventId: string}) {
  const {isOpen, onClose, onOpen} = useDisclosure()
  const {t} = useLocale()
  const {status: userStatus} = useSession()
  const {
    data: comments,
    fetchNextPage,
    hasNextPage,
    refetch
  } = trpc.event.getEventComments.useInfiniteQuery(
    {limit: 10, eventId},
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor
    }
  )
  const {mutateAsync: sendEventComment} =
    trpc.event.sendEventComment.useMutation()
  const {ref} = useInView({
    threshold: 0,
    onChange: (inView) =>
      inView && hasNextPage ? void fetchNextPage() : undefined
  })

  const commentSchema = z.object({
    message: z.string(),
    rating: z.number().gt(0)
  })

  return (
    <Container
      maxWidth="100%"
      px={0}
      py={16}
      style={{
        position: 'relative',
        background:
          '#2c2c2c url(/img/parallax-speakers.png) no-repeat center center',
        backgroundAttachment: 'fixed',
        backgroundSize: 'contain',
        color: 'white'
      }}
    >
      <Heading variant="brand">{t('events.meeting_comments')}</Heading>
      <Stripes />
      <Flicking>
        {comments?.pages
          .reduce((acc, page) => ({
            items: acc.items.concat(page.items),
            nextCursor: page.nextCursor
          }))
          .items.map((comment, index, allComments) => (
            <Card key={index} maxW="md" mr={10}>
              <CardHeader>
                <Flex>
                  <Flex alignItems="center" flex="1" flexWrap="wrap" gap="4">
                    <Avatar
                      name={comment.user.name || undefined}
                      src={comment.user.image || undefined}
                    />
                    <Box>
                      <Heading
                        ref={index + 1 === allComments.length ? ref : undefined}
                        size="sm"
                      >
                        {comment.user.name}
                      </Heading>
                      <Text>{comment.user.position}</Text>
                    </Box>
                  </Flex>
                </Flex>
              </CardHeader>
              <CardBody mb={1} pb={0}>
                <Text>{comment.message}</Text>
              </CardBody>
              <CardFooter justifyContent="center" mt={0} pt={0}>
                <ReactStars
                  activeColor="#ffd700"
                  count={5}
                  edit={false}
                  size={24}
                  value={comment.rating}
                />
              </CardFooter>
            </Card>
          ))}
      </Flicking>
      {userStatus === 'authenticated' && (
        <>
          <Flex color="black" justifyContent="center" pt={10}>
            <Button onClick={onOpen} variant="primary">
              {t('events.meeting_send_comment')}
            </Button>
          </Flex>

          <Modal isCentered isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                {t('events.meeting_send_comment_title')}
              </ModalHeader>
              <ModalCloseButton />
              <Formik
                initialValues={{message: '', rating: 0}}
                onSubmit={(values, actions) => {
                  void sendEventComment({...values, eventId})
                    .then(() => refetch())
                    .then(() => actions.setSubmitting(false))
                    .then(() => onClose())
                    .catch(() => actions.setSubmitting(false))
                }}
                validationSchema={toFormikValidationSchema(commentSchema)}
              >
                {(props) => (
                  <Form>
                    <ModalBody>
                      <Field name="message">
                        {({field, form, meta}: FieldProps) => (
                          <FormControl
                            isInvalid={
                              !!form.errors.message?.length &&
                              form.touched.message !== undefined
                            }
                          >
                            <FormLabel>
                              {t('events.meeting_send_comment_message')}
                            </FormLabel>
                            <Textarea
                              placeholder={t(
                                'events.meeting_send_comment_message'
                              )}
                              {...field}
                            />
                            <FormErrorMessage>{meta.error}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="rating">
                        {({field, form, meta}: FieldProps) => (
                          <FormControl
                            isInvalid={
                              !!form.errors.rating?.length &&
                              form.touched.rating !== undefined
                            }
                            mt={5}
                          >
                            <FormLabel>
                              {t('events.meeting_send_comment_rating')}
                            </FormLabel>
                            <ReactStars
                              activeColor="#ffd700"
                              count={5}
                              size={24}
                              {...field}
                              onChange={(value: number) =>
                                field.onChange({
                                  target: {value, name: field.name}
                                })
                              }
                            />
                            <FormErrorMessage>{meta.error}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </ModalBody>
                    <ModalFooter justifyContent="center">
                      <Button
                        isLoading={props.isSubmitting}
                        type="submit"
                        variant="primary"
                      >
                        {t('events.meeting_send_comment_send')}
                      </Button>
                    </ModalFooter>
                  </Form>
                )}
              </Formik>
            </ModalContent>
          </Modal>
        </>
      )}
    </Container>
  )
}
