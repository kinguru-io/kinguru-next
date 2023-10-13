import {
  Heading,
  Text,
  Avatar,
  useColorModeValue,
  LinkOverlay,
  LinkBox,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  AspectRatio,
  AvatarGroup,
  Button,
  Flex,
  Skeleton,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { trpc } from "@/utils/trpc.ts";
import { useLocale } from "@/utils/use-locale.ts";

export function EventCard({
  event,
}: {
  event: {
    id: string;
    topic: string;
    description: string;
    poster: string | null;
    starts: Date;
    takenPlace: boolean;
  };
}) {
  const { t } = useLocale();
  const { status } = useSession();
  const { mutateAsync: attendTheEvent, isLoading: attendTheEventLoading } =
    trpc.event.attendTheEvent.useMutation();
  const {
    mutateAsync: cancelEventRegistration,
    isLoading: cancelEventRegistrationLoading,
  } = trpc.event.cancelEventRegistration.useMutation();
  const { data: isPresentOnEvent, refetch: isPresentOnEventRefetch } =
    trpc.event.isPresentOnEvent.useQuery({
      eventId: event.id,
    });
  const {
    data: participants,
    refetch: participantsRrefetch,
    isLoading: participantsLoading,
  } = trpc.event.usersOnEvent.useInfiniteQuery(
    { limit: 10, eventId: event.id },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );
  return (
    <Card
      key={event.id}
      maxW="sm"
      mx={5}
      boxShadow={["md", "2xl"]}
      rounded={"md"}
    >
      <CardHeader p={0} bg={useColorModeValue("white", "gray.900")}>
        <AspectRatio maxHeight={250} ratio={16 / 9}>
          <Image
            src={event.poster ?? ""}
            width={640}
            height={480}
            style={{
              objectFit: "cover",
              borderRadius: "6px 6px 0 0",
            }}
            alt={event.topic}
          />
        </AspectRatio>
      </CardHeader>
      <CardBody pt={6}>
        <LinkBox>
          <Heading
            color={useColorModeValue("gray.700", "white")}
            fontSize={"2xl"}
            fontFamily={"body"}
          >
            <LinkOverlay as={Link} href={`/events/${event.id}`}>
              {event.topic}
            </LinkOverlay>
          </Heading>
          <Text>{event.starts.toLocaleDateString()}</Text>
          <Text color={"gray.500"} mt={2} textAlign={"left"}>
            {event.description}
          </Text>
        </LinkBox>
      </CardBody>
      <CardFooter>
        <Flex w={"full"} justifyContent={"space-between"}>
          {status === "authenticated" && !event.takenPlace ? (
            isPresentOnEvent ? (
              <Button
                isLoading={cancelEventRegistrationLoading}
                variant={"primary"}
                onClick={() => {
                  void cancelEventRegistration({ eventId: event.id })
                    .then(() => isPresentOnEventRefetch())
                    .then(() => participantsRrefetch());
                }}
              >
                {t("events.cancel")}
              </Button>
            ) : (
              <Button
                isLoading={attendTheEventLoading}
                variant={"primary"}
                disabled={true}
                onClick={() => {
                  void attendTheEvent({ eventId: event.id })
                    .then(() => isPresentOnEventRefetch())
                    .then(() => participantsRrefetch());
                }}
              >
                {t("events.join")}
              </Button>
            )
          ) : null}
          <Skeleton isLoaded={!participantsLoading}>
            <AvatarGroup max={2}>
              {participants?.pages[0].items.map((participant) => (
                <Avatar
                  key={participant.eventId + participant.user.id}
                  name={participant.user.name ?? undefined}
                  src={participant.user.image ?? undefined}
                />
              ))}
            </AvatarGroup>
          </Skeleton>
        </Flex>
      </CardFooter>
    </Card>
  );
}
