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
  useDisclosure,
} from "@chakra-ui/react";
import Flicking from "@egjs/react-flicking";
import { Field, FieldProps, Form, Formik } from "formik";
import { useSession } from "next-auth/react";
import { useInView } from "react-intersection-observer";
import { Rating } from "react-simple-star-rating";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { Stripes } from "@/components/common/stripes";
import { trpc } from "@/utils/trpc.ts";
import { useLocale } from "@/utils/use-locale.ts";
import "@egjs/react-flicking/dist/flicking.css";

export const EventCommentsSection = ({ eventId }: { eventId: string }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useLocale();
  const { status: userStatus } = useSession();
  const {
    data: comments,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = trpc.event.getEventComments.useInfiniteQuery(
    { limit: 10, eventId },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );
  const { mutateAsync: sendEventComment } =
    trpc.event.sendEventComment.useMutation();
  const { ref } = useInView({
    threshold: 0,
    onChange: (inView) => (inView && hasNextPage ? fetchNextPage() : null),
  });

  const commentSchema = z.object({
    message: z.string(),
    rating: z.number().gt(0),
  });

  return (
    <Container
      maxWidth={"100%"}
      py={16}
      px={0}
      style={{
        position: "relative",
        background:
          "#2c2c2c url(/img/parallax-speakers.png) no-repeat center center",
        backgroundAttachment: "fixed",
        backgroundSize: "contain",
        color: "white",
      }}
    >
      <Heading variant={"brand"}>{t("events.meeting_comments")}</Heading>
      <Stripes />
      <Flicking hideBeforeInit={true}>
        {comments?.pages
          .reduce((acc, page) => ({
            items: acc.items.concat(page.items),
            nextCursor: page.nextCursor,
          }))
          .items.map((comment, index, allComments) => (
            <Card w={["sm", "md"]} mr={10} key={index}>
              <CardHeader>
                <Flex>
                  <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                    <Avatar
                      name={comment.user.name || undefined}
                      src={comment.user.image || undefined}
                    />
                    <Box>
                      <Heading
                        size="sm"
                        ref={index + 1 === allComments.length ? ref : undefined}
                      >
                        {comment.user.name}
                      </Heading>
                      <Text>{comment.user.position}</Text>
                    </Box>
                  </Flex>
                </Flex>
              </CardHeader>
              <CardBody pb={0} mb={1}>
                <Text>{comment.message}</Text>
              </CardBody>
              <CardFooter pt={0} mt={0} justifyContent={"center"}>
                <Rating
                  initialValue={comment.rating}
                  readonly
                  size={24}
                  SVGstrokeColor="#ffd700"
                  SVGstyle={{
                    display: "inline-block",
                  }}
                  fillColor="#ffd700"
                />
              </CardFooter>
            </Card>
          ))}
      </Flicking>
      {userStatus === "authenticated" && (
        <>
          <Flex color={"black"} justifyContent={"center"} pt={10}>
            <Button variant={"primary"} onClick={onOpen}>
              {t("events.meeting_send_comment")}
            </Button>
          </Flex>

          <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                {t("events.meeting_send_comment_title")}
              </ModalHeader>
              <ModalCloseButton />
              <Formik
                initialValues={{ message: "", rating: 0 }}
                validationSchema={toFormikValidationSchema(commentSchema)}
                onSubmit={(values, actions) => {
                  void sendEventComment({ ...values, eventId })
                    .then(() => refetch())
                    .then(() => actions.setSubmitting(false))
                    .then(() => onClose())
                    .catch(() => actions.setSubmitting(false));
                }}
              >
                {(props) => (
                  <Form>
                    <ModalBody>
                      <Field name="message">
                        {({ field, form, meta }: FieldProps) => (
                          <FormControl
                            isInvalid={
                              !!form.errors.message?.length &&
                              form.touched.message !== undefined
                            }
                          >
                            <FormLabel>
                              {t("events.meeting_send_comment_message")}
                            </FormLabel>
                            <Textarea
                              placeholder={t(
                                "events.meeting_send_comment_message",
                              )}
                              {...field}
                            />
                            <FormErrorMessage>{meta.error}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="rating">
                        {({ field, form, meta }: FieldProps) => (
                          <FormControl
                            mt={5}
                            isInvalid={
                              !!form.errors.rating?.length &&
                              form.touched.rating !== undefined
                            }
                          >
                            <FormLabel>
                              {t("events.meeting_send_comment_rating")}
                            </FormLabel>
                            <Rating
                              size={24}
                              SVGstrokeColor="#ffd700"
                              SVGstyle={{
                                display: "inline-block",
                              }}
                              fillColor="#ffd700"
                              onClick={(value: number) =>
                                field.onChange({
                                  target: { value, name: field.name },
                                })
                              }
                            />
                            <FormErrorMessage>{meta.error}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </ModalBody>
                    <ModalFooter justifyContent={"center"}>
                      <Button
                        variant={"primary"}
                        isLoading={props.isSubmitting}
                        type="submit"
                      >
                        {t("events.meeting_send_comment_send")}
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
  );
};
