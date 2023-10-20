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
  Collapse,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import posterPlaceholder from "@/public/img/event-1.jpg";
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
  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);
  const { t } = useLocale();
  const { data: participants, isLoading: participantsLoading } =
    trpc.event.usersOnEvent.useInfiniteQuery(
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
      <LinkBox>
        <CardHeader p={0} bg={useColorModeValue("white", "gray.900")}>
          <AspectRatio maxHeight={250} ratio={16 / 9}>
            <Image
              src={event.poster ?? posterPlaceholder}
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
          <Collapse startingHeight={80} in={show} color={"gray.500"}>
            <Text mt={2} textAlign={"left"}>
              {event.description}
            </Text>
          </Collapse>
        </CardBody>
      </LinkBox>
      <CardFooter>
        <Flex w={"full"} justifyContent={"space-between"}>
          <Button variant={"secondary"} onClick={handleToggle}>
            {show ? t("events.less") : t("events.more")}
          </Button>
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
