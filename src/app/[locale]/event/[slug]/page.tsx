/* eslint-disable @typescript-eslint/no-shadow */
"use server";

import Image from "next/image";
import { notFound } from "next/navigation";
import { FaRegHeart } from "react-icons/fa";
import { SingleMarkerMap } from "@/components/common/maps/SingleMarkerMap";
import { EventDescription } from "@/components/event/EventDescription";
import { EventMainInfo } from "@/components/event/EventMainInfo";
import { EventSpeakersSlider } from "@/components/event/EventSpeakersSlider";
import {
  AvatarGroup,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeading,
  CardInner,
  Tag,
} from "@/components/uikit";
import { EventMainInfoLayout } from "@/layout/block/EventMainInfoLayout";
import { EventMapLayout } from "@/layout/block/EventMapLayout";
import { EventPopularEventsLayout } from "@/layout/block/EventPopularEventsLayout";
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
import { visuallyHidden } from "~/styled-system/patterns";

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
        <Flex direction="column" gap="20px" maxW="1180px">
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
                  src={poster || ""}
                  alt={topic}
                  width={755}
                  height={435}
                />
              </AspectRatio>
            </Box>
            <Flex direction="column" justify="space-between">
              <EventMainInfo
                starts={starts}
                mapboxId={place.locationMapboxId}
              />
              <Flex direction="column" gap="20px" align="baseline">
                <h3>Гости мероприятия:</h3>
                <AvatarGroup
                  showCount={5}
                  avatars={usersOnEvent.map(
                    ({ user: { image, name } }: any) => ({
                      name: name || "username",
                      image: image || "",
                    }),
                  )}
                />
              </Flex>
              <Button size="lg" variant="solid">
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
        </Flex>
      </EventMainInfoLayout>
      <EventMapLayout>
        <h2 className={css({ textAlign: "center" })}>Карта</h2>
        <AspectRatio ratio={16 / 9} marginBlockStart="50px">
          <SingleMarkerMap
            mapboxId={place.locationMapboxId}
            image={poster || ""}
            name={topic || ""}
          />
        </AspectRatio>
      </EventMapLayout>
      <EventPopularEventsLayout>
        <VStack gap="50px">
          <h2>Популярные события в этой неделе</h2>
          <HStack gap="40px">
            {popularEvents.map(({ topic, poster, description }) => (
              <Box w="310px" key={topic}>
                <Card variant="event" data-interactive>
                  <a
                    className={css({
                      _before: {
                        content: "''",
                        position: "absolute",
                        inset: 0,
                      },
                    })}
                  >
                    <span className={visuallyHidden()}>More</span>
                  </a>
                  <AspectRatio ratio={16 / 9}>
                    <Image
                      src={poster || ""}
                      width={640}
                      height={480}
                      alt="template image"
                    />
                    <span className={css({ bgGradient: "cardImage" })} />
                  </AspectRatio>
                  <CardInner>
                    <Float placement="top-end" offset="15px" translate="none">
                      <Tag variant="tertiary">{event.price}</Tag>
                    </Float>

                    <CardHeading>
                      <h4>{topic}</h4>
                    </CardHeading>
                    <CardBody>
                      <p>{description}</p>
                    </CardBody>

                    <CardFooter>
                      <Flex alignItems="center" justifyContent="space-between">
                        <VStack gap="4px" alignItems="baseline">
                          <span className={css({ textStyle: "body.4" })}>
                            Уже присоединились
                          </span>
                          <AvatarGroup
                            showCount={3}
                            avatars={event.usersOnEvent.map(
                              ({ user: { image, name } }: any) => ({
                                name: name || "username",
                                image: image || "",
                              }),
                            )}
                          />
                        </VStack>
                        <Button size="md">
                          <FaRegHeart />
                        </Button>
                      </Flex>
                    </CardFooter>
                  </CardInner>
                </Card>
              </Box>
            ))}
          </HStack>
        </VStack>
      </EventPopularEventsLayout>
    </>
  );
}
