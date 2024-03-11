import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { SingleMarkerMap } from "@/components/common/maps/SingleMarkerMap";
import {
  EventCardView,
  EventDescription,
  EventLikeButton,
  EventMainInfo,
  EventSpeakersSlider,
} from "@/components/event";
import { AvatarGroup, Button, Tag } from "@/components/uikit";
import { DefaultImage } from "@/components/uikit/DefaultImage/DefaultImage";
import {
  EventMainInfoLayout,
  EventMapLayout,
  EventPopularEventsLayout,
} from "@/layout/block/event";
import prisma from "@/server/prisma";
import textLogo from "~/public/img/defaultImages/eventify-logo-text.svg";
import { css } from "~/styled-system/css";
import {
  AspectRatio,
  Box,
  Flex,
  Float,
  HStack,
  VStack,
} from "~/styled-system/jsx";

const url = process.env.NEXTAUTH_URL;

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
      place: true,
    },
    orderBy: {
      createdAt: "desc",
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
    id,
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
              <EventLikeButton id={id} />
            </Float>
            {poster ? (
              <AspectRatio ratio={16 / 9} w="auto" h="auto">
                <Image
                  className={css({ borderRadius: "8px" })}
                  src={poster}
                  alt={topic}
                  width={755}
                  height={435}
                />
              </AspectRatio>
            ) : (
              <DefaultImage />
            )}
          </Box>
          <Flex direction="column" justify="space-between" align="baseline">
            <EventMainInfo starts={starts} mapboxId={place.locationMapboxId} />
            <Flex direction="column" gap="20px" align="baseline">
              <h3>{t("event_guests")}</h3>
              <AvatarGroup
                showCount={5}
                avatars={usersOnEvent.map(({ user: { image, name } }) => ({
                  name: name || "username",
                  image: image || textLogo.src,
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
        <HStack gap="15px">
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
            image={poster || textLogo.src}
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
                  id={popularEvent.id}
                  price={popularEvent.price || 0}
                  poster={popularEvent.poster || textLogo.src}
                  topic={popularEvent.topic}
                  description={popularEvent.description}
                  usersOnEvent={popularEvent.usersOnEvent}
                  slug={popularEvent.slug}
                  url={url || "eventify.today"}
                  mapboxId={popularEvent.place.locationMapboxId}
                  starts={popularEvent.starts}
                />
              </Box>
            ))}
          </HStack>
        </VStack>
      </EventPopularEventsLayout>
    </>
  );
}
