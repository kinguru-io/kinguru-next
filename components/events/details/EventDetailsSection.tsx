import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  HStack,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Skeleton,
  Tag,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import moment from "moment/moment";
import NextImage from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import CheckoutForm from "@/components/common/checkout/CheckoutForm.tsx";
import time from "@/public/img/calendar.png";
import price from "@/public/img/dollar_yellow.png";
import place from "@/public/img/place.png";
import calendar from "@/public/img/time.png";
import * as gtag from "@/utils/gtag.ts";
import { trpc } from "@/utils/trpc.ts";
import { useLocale } from "@/utils/use-locale.ts";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

export const EventDetailsSection = ({ eventId }: { eventId: string }) => {
  const { t } = useLocale();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { status: userStatus } = useSession();
  const {
    mutateAsync: cancelEventRegistration,
    isLoading: cancelEventRegistrationLoading,
  } = trpc.event.cancelEventRegistration.useMutation();
  const { data: isPresentOnEvent, refetch: isPresentOnEventRefetch } =
    trpc.event.isPresentOnEvent.useQuery({
      eventId: eventId,
    });
  const { data, status } = trpc.event.getEventDetails.useQuery({ eventId });

  const [transactionId, setTransactionId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const { mutateAsync: ticketIntent, isLoading: ticketIntentLoading } =
    trpc.payment.ticketIntent.useMutation();
  const ticketIntentNotification = useToast();

  const checkoutEvent = gtag.eventItem({
    item: {
      id: data?.id || "",
      name: data?.topic || "",
    },
    value: data?.price || 0,
  });

  useEffect(() => {
    if (data) checkoutEvent.view();
  }, []);

  return (
    <Container
      maxWidth={"100%"}
      py={16}
      pt={32}
      style={{
        background:
          "url(/img/stars.png) repeat center center, #2a2a2a url(/img/main-dark.png) no-repeat center 0",
        backgroundAttachment: "fixed, scroll",
        backgroundSize: "contain, cover",
        color: "white",
      }}
    >
      <Skeleton isLoaded={status === "success"}>
        <SimpleGrid
          w={["full", "70%"]}
          mx={"auto"}
          columns={[1, 1, 1, 2]}
          alignItems={"center"}
        >
          <Image src={data?.poster || "/img/event-1.jpg"} />
          <VStack w={"full"}>
            <Heading pt={[5, 0]} textAlign={"center"}>
              {data?.topic}
            </Heading>
            <Container py={7} display={"block"} textAlign={"center"}>
              {data?.tags?.map((tag) => (
                <Tag
                  key={tag}
                  background={"transparent"}
                  color={"gray.100"}
                  border={"2px solid rgb(123, 123, 123)"}
                  px={4}
                  py={2}
                  mr={3}
                  mt={2}
                  borderRadius={"full"}
                >
                  {tag}
                </Tag>
              ))}
            </Container>
            <SimpleGrid w={["full", "80%"]} mx={"auto"} columns={2}>
              <VStack alignItems={"baseline"} spacing={5}>
                <HStack>
                  <NextImage src={calendar} alt={"calendar"} />
                  <Text>{moment(data?.starts).format("DD.MM.yyyy")}</Text>
                </HStack>
                <HStack>
                  <NextImage src={time} alt={"time"} />
                  <Text>{moment(data?.starts).format("HH:mm")}</Text>
                </HStack>
                <HStack>
                  <NextImage src={place} alt={"place"} />
                  <Text as={Link} href={`/places/${data?.place?.id}`}>
                    {data?.place?.location}
                  </Text>
                </HStack>
                <HStack>
                  <NextImage src={price} alt={"price"} />
                  <Text>{data?.price} zł</Text>
                </HStack>
              </VStack>
              <VStack alignItems={["center", "baseline"]} spacing={5}>
                {data?.speakersOnEvent?.map(({ speaker }) => (
                  <HStack key={speaker.userId}>
                    <Image src={"/img/speak.png"} />
                    <Text
                      as={Link}
                      href={speaker.user.website || `/speakers/${speaker.id}`}
                    >
                      {speaker.user.name}
                    </Text>
                  </HStack>
                ))}
              </VStack>
            </SimpleGrid>
            <Flex w={"full"} mx={"auto"} justifyContent={"center"} mt={5}>
              {userStatus === "authenticated" && !data?.takenPlace ? (
                isPresentOnEvent ? (
                  <Button
                    isLoading={cancelEventRegistrationLoading}
                    variant={"primary"}
                    color={"black"}
                    onClick={() => {
                      void cancelEventRegistration({
                        eventId: eventId,
                      }).then(() => isPresentOnEventRefetch());
                    }}
                  >
                    {t("events.cancel")}
                  </Button>
                ) : (
                  <>
                    <Modal
                      closeOnOverlayClick={false}
                      isOpen={isOpen}
                      onClose={onClose}
                      blockScrollOnMount={false}
                      isCentered
                    >
                      <ModalOverlay />
                      <ModalContent>
                        <ModalHeader>{t("events.buy_a_ticket")}</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                          {clientSecret !== "" && (
                            <Elements
                              stripe={stripePromise}
                              options={{ clientSecret }}
                            >
                              <CheckoutForm
                                succeedRefetch={() => {
                                  void ticketIntentNotification({
                                    status: "success",
                                    title: t("events.ticket_intent_succeed"),
                                    description: t(
                                      "events.ticket_intent_succeed_description",
                                    ),
                                  });
                                  checkoutEvent.purchase(transactionId);
                                  void isPresentOnEventRefetch();
                                  onClose();
                                }}
                              />
                            </Elements>
                          )}
                        </ModalBody>
                      </ModalContent>
                    </Modal>

                    <Button
                      isLoading={ticketIntentLoading}
                      variant={"primary"}
                      color={"black"}
                      disabled={true}
                      onClick={() => {
                        void ticketIntent({ eventId: eventId }).then(
                          ({ clientSecret: secret, id }) => {
                            checkoutEvent.beginCheckout();
                            setClientSecret(secret);
                            setTransactionId(id);
                            onOpen();
                          },
                        );
                      }}
                    >
                      {t("events.join")}
                    </Button>
                  </>
                )
              ) : null}
            </Flex>
          </VStack>
        </SimpleGrid>
        <VStack w={["full", "70%"]} mx={"auto"} display={"block"} mt={5}>
          <Text></Text>
          <Accordion defaultIndex={[0]} allowToggle>
            <AccordionItem border={0}>
              <AccordionButton>
                <VStack
                  as={"span"}
                  alignItems={"left"}
                  flex="1"
                  textAlign="left"
                >
                  <Heading variant={"eventDescription"}>
                    {t("events.meeting_about")}
                  </Heading>
                  <Divider variant={"eventDetails"} my={3} />
                </VStack>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4} w={["full", "80%"]}>
                {data?.description}
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </VStack>
      </Skeleton>
    </Container>
  );
};
