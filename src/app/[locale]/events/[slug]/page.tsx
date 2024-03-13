import Image from "next/image";
import { notFound } from "next/navigation";
import { getFormatter, getTranslations } from "next-intl/server";
import { Description } from "@/components/common/description";
import { SingleMarkerMap } from "@/components/common/maps/SingleMarkerMap";
import {
  EventCardView,
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
import { createLikeEvent, deleteLikeEvent, isLikedEvent } from "@/lib/actions/";
import prisma from "@/server/prisma";
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
  const event = await prisma.event.findFirst({
    where: { slug },
    include: {
      usersOnEvent: {
        include: { user: { select: { image: true, name: true } } },
      },
      speakersOnEvent: {
        include: {
          speaker: {
            include: {
              user: { select: { image: true, name: true, position: true } },
              comments: { select: { rating: true } },
            },
          },
        },
      },
      place: true,
    },
  });

  if (!event) {
    notFound();
  }

  const t = await getTranslations("event.future_event_page");
  const format = await getFormatter();

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
      <EventMainInfoLayout bgImageSrc={poster}>
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
                {price === 0 || price === null
                  ? t("free")
                  : format.number(price, {
                      style: "currency",
                      currency: "PLN",
                    })}
              </Tag>
            </Float>
            <Float
              placement="bottom-end"
              offset="20px"
              translate="none"
              zIndex="1"
            >
              <EventLikeButton
                id={id}
                isLikedAction={isLikedEvent}
                createLikeAction={createLikeEvent}
                deleteLikeAction={deleteLikeEvent}
                likeTranslate={t("like_event")}
                dislikeTranslate={t("dislike_event")}
              />
            </Float>
            <AspectRatio ratio={16 / 9} w="auto" h="auto">
              {poster ? (
                <Image
                  className={css({ borderRadius: "8px" })}
                  src={poster}
                  alt={topic}
                  width={755}
                  height={435}
                />
              ) : (
                <DefaultImage />
              )}
            </AspectRatio>
          </Box>
          <Flex direction="column" justify="space-between" align="baseline">
            <EventMainInfo starts={starts} mapboxId={place.locationMapboxId} />
            <Flex direction="column" gap="20px" align="baseline">
              <h3>{t("event_guests")}</h3>
              <AvatarGroup
                showCount={5}
                avatars={usersOnEvent.map(({ user }) => user)}
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
        <Description
          description={description}
          showLessLabel={t("show_less")}
          showMoreLabel={t("show_more")}
          maxW="660px"
        />
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
            image={poster}
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
                  poster={popularEvent.poster}
                  topic={popularEvent.topic}
                  description={popularEvent.description}
                  usersOnEvent={popularEvent.usersOnEvent}
                  slug={popularEvent.slug}
                  mapboxId={popularEvent.place.locationMapboxId}
                  starts={popularEvent.starts}
                  isLikedAction={isLikedEvent}
                  createLikeAction={createLikeEvent}
                  deleteLikeAction={deleteLikeEvent}
                />
              </Box>
            ))}
          </HStack>
        </VStack>
      </EventPopularEventsLayout>
    </>
  );
}
