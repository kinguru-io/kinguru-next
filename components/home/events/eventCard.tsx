"use client";
import {
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
  LinkOverlay,
  LinkBox,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  AspectRatio,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

export function EventCard({
  event,
}: {
  event: {
    id: string;
    topic: string;
    description: string;
    poster: string | null;
    starts: Date;
    place: {
      id: string;
      location: string;
    };
    initiator: {
      id: string;
      name: string | null;
      image: string | null;
    };
  };
}) {
  return (
    <Card key={event.id} maxW="sm" boxShadow={"2xl"} rounded={"md"}>
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
          <Text color={"gray.500"} mt={2} textAlign={"left"}>
            {event.description}
          </Text>
        </LinkBox>
      </CardBody>
      <CardFooter>
        <Stack direction={"row"} spacing={4} align={"center"}>
          <Avatar src={event.initiator.image ?? undefined} />
          <Stack direction={"column"} spacing={0} fontSize={"sm"}>
            <Text
              as={Link}
              href={`/users/${event.initiator.id}`}
              fontWeight={600}
            >
              {event.initiator.name}
            </Text>
            <Text color={"gray.500"}>{event.starts.toDateString()}</Text>
          </Stack>
        </Stack>
      </CardFooter>
    </Card>
  );
}
