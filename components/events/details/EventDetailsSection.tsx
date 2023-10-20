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
  SimpleGrid,
  Skeleton,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { trpc } from "@/utils/trpc.ts";
import { useLocale } from "@/utils/use-locale.ts";

export const EventDetailsSection = ({ eventId }: { eventId: string }) => {
  const { t } = useLocale();
  const { status: userStatus } = useSession();
  const { mutateAsync: attendTheEvent, isLoading: attendTheEventLoading } =
    trpc.event.attendTheEvent.useMutation();
  const {
    mutateAsync: cancelEventRegistration,
    isLoading: cancelEventRegistrationLoading,
  } = trpc.event.cancelEventRegistration.useMutation();
  const { data: isPresentOnEvent, refetch: isPresentOnEventRefetch } =
    trpc.event.isPresentOnEvent.useQuery({
      eventId: eventId,
    });
  const { data, status } = trpc.event.getEventDetails.useQuery({ eventId });
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
                  <Image src={"/img/calendar.png"} />
                  <Text>{data?.starts?.toLocaleDateString()}</Text>
                </HStack>
                <HStack>
                  <Image src={"/img/time.png"} />
                  <Text>{data?.starts?.toLocaleTimeString()}</Text>
                </HStack>
                <HStack>
                  <Image src={"/img/place.png"} />
                  <Text as={Link} href={`/places/${data?.place?.id}`}>
                    {data?.place?.location}
                  </Text>
                </HStack>
                <HStack>
                  <Image src={"/img/dollar_yellow.png"} />
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
                  <Button
                    isLoading={attendTheEventLoading}
                    variant={"primary"}
                    color={"black"}
                    disabled={true}
                    onClick={() => {
                      void attendTheEvent({ eventId: eventId }).then(() =>
                        isPresentOnEventRefetch(),
                      );
                    }}
                  >
                    {t("events.join")}
                  </Button>
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
