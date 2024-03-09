import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
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
import {
  AspectRatio,
  Box,
  Flex,
  Float,
  HStack,
  VStack,
} from "~/styled-system/jsx";

export default async function EventPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const t = await getTranslations("event.future_event_page");

  const event = await prisma.event.findFirst({
    where: { slug },
    include: {
      usersOnEvent: { include: { user: true } },
      speakersOnEvent: {
        include: { speaker: { include: { user: true, comments: true } } },
      },
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
    price,
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
          <Box w="100%" maxW="755px" position="relative">
            <Float
              placement="top-end"
              offset="20px"
              translate="none"
              zIndex="1"
            >
              <Tag size="lg" variant="primary">
                {price === 0 ? t("free") : price}
              </Tag>
            </Float>
            <Float
              placement="bottom-end"
              offset="20px"
              translate="none"
              zIndex="1"
            >
              <Button size="lg">
                {true ? <FaRegHeart /> : <FaHeart fill="red" />}
              </Button>
            </Float>
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
              <h3>{t("event_guests")}</h3>
              <AvatarGroup
                showCount={5}
                avatars={usersOnEvent.map(({ user: { image, name } }) => ({
                  name: name || "username",
                  image: image || "",
                }))}
              />
            </Flex>
            <Button size="lg" variant="solid" colorPalette="primary">
              {t("join")}
            </Button>
          </Flex>
        </Flex>
        <VStack gap="20px" alignItems="baseline">
          <h3>{t("event_speakers")}</h3>
          <EventSpeakersSlider speakers={speakersOnEvent} />
        </VStack>
        <VStack gap="20px" alignItems="baseline">
          <h3>{t("event_description")}</h3>
        </VStack>
        <EventDescription description={description} />
        <HStack gap="15px" color="black">
          {tags.map((tag) => (
            <Tag variant="secondary" key={tag}>{`#${tag}`}</Tag>
          ))}
        </HStack>
      </EventMainInfoLayout>
      <EventMapLayout>
        <h2 className={css({ textAlign: "center" })}>{t("map")}</h2>
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
          <h2>{t("popular_event_this_week")}</h2>
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
