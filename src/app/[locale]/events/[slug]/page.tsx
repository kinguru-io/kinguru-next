import Image from "next/image";
import { notFound } from "next/navigation";
import { SingleMarkerMap } from "@/components/common/maps/SingleMarkerMap";
import { EventCardView } from "@/components/event/EventCardView";
import { EventDescription } from "@/components/event/EventDescription";
import { EventMainInfo } from "@/components/event/EventMainInfo";
import { EventSpeakersSlider } from "@/components/event/EventSpeakersSlider";
import { AvatarGroup, Button, Tag } from "@/components/uikit";
import { EventMainInfoLayout } from "@/layout/block/event/EventMainInfoLayout";
import { EventMapLayout } from "@/layout/block/event/EventMapLayout";
import { EventPopularEventsLayout } from "@/layout/block/event/EventPopularEventsLayout";
import prisma from "@/server/prisma";
import defaultEventImage from "~/public/img/defaultImages/event.png";
import { css } from "~/styled-system/css";
import { AspectRatio, Box, Flex, HStack, VStack } from "~/styled-system/jsx";

export default async function EventPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const event = await prisma.event.findFirst({
    where: { slug },
    include: {
      usersOnEvent: { include: { user: true } },
      speakersOnEvent: { include: { speaker: { include: { user: true } } } },
      place: true,
    },
  });

  const popularEvents = await prisma.event.findMany({
    take: 3,
    include: {
      usersOnEvent: { include: { user: true } },
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  if (!event) {
    notFound();
  }

  const {
    poster,
    topic,
    starts,
    speakersOnEvent,
    usersOnEvent,
    description,
    tags,
    place,
  } = event;

  return (
    <>
      <EventMainInfoLayout bgImageSrc={poster || ""}>
        <h2
          className={css({
            paddingBottom: "20px",
            textAlign: "center",
            w: "100%",
          })}
        >
          {topic}
        </h2>
        <Flex justify="space-between" w="100%">
          <Box w="100%" maxW="755px">
            <AspectRatio ratio={16 / 9} w="auto" h="auto">
              <Image
                className={css({ borderRadius: "8px" })}
                src={poster || defaultEventImage.src}
                alt={topic}
                width={755}
                height={435}
              />
            </AspectRatio>
          </Box>
          <Flex direction="column" justify="space-between" align="baseline">
            <EventMainInfo starts={starts} mapboxId={place.locationMapboxId} />
            <Flex direction="column" gap="20px" align="baseline">
              <h3>Гости мероприятия:</h3>
              <AvatarGroup
                showCount={5}
                avatars={usersOnEvent.map(({ user: { image, name } }: any) => ({
                  name: name || "username",
                  image: image || "",
                }))}
              />
            </Flex>
            <Button size="lg" variant="solid" colorPalette="primary">
              Присоединиться
            </Button>
          </Flex>
        </Flex>
        <VStack gap="20px" alignItems="baseline">
          <h3>Спикеры мероприятия:</h3>
          <EventSpeakersSlider speakers={speakersOnEvent} />
        </VStack>
        <EventDescription description={description} />
        <HStack gap="15px" color="black">
          {tags.map((tag: any) => (
            <Tag variant="secondary" key={tag}>{`#${tag}`}</Tag>
          ))}
        </HStack>
      </EventMainInfoLayout>
      <EventMapLayout>
        <h2 className={css({ textAlign: "center" })}>Карта</h2>
        <AspectRatio ratio={16 / 9} marginBlockStart="50px">
          <SingleMarkerMap
            mapboxId={place.locationMapboxId}
            image={poster || defaultEventImage.src}
            name={topic}
          />
        </AspectRatio>
      </EventMapLayout>
      <EventPopularEventsLayout>
        <VStack gap="50px">
          <h2>Популярные события в этой неделе</h2>
          <HStack gap="40px">
            {popularEvents.map((popularEvent) => (
              <Box w="310px" key={topic}>
                <EventCardView
                  price={popularEvent.price || "free"}
                  poster={popularEvent.poster || defaultEventImage.src}
                  topic={popularEvent.topic}
                  description={popularEvent.description}
                  usersOnEvent={popularEvent.usersOnEvent}
                  slug={popularEvent.slug}
                />
              </Box>
            ))}
          </HStack>
        </VStack>
      </EventPopularEventsLayout>
    </>
  );
}
