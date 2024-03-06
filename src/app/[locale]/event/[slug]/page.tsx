/* eslint-disable @typescript-eslint/no-shadow */
"use server";

import { VStack } from "@chakra-ui/react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FaRegHeart } from "react-icons/fa";
import { EventDescription } from "@/components/event/EventDescription";
import { EventMainInfo } from "@/components/event/EventMainInfo";
import {
  Avatar,
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
import { EventPopularEventsLayout } from "@/layout/block/EventPopularEventsLayout";
import prisma from "@/server/prisma";
import { css } from "~/styled-system/css";
import { AspectRatio, Box, Flex, Float, HStack } from "~/styled-system/jsx";
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
              <EventMainInfo starts={starts} />
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
              <Button size="lg">Присоединиться</Button>
            </Flex>
          </Flex>
          <VStack gap="20px" alignItems="baseline">
            <h3>Спикеры мероприятия:</h3>
            {speakersOnEvent.map(
              ({
                speaker: {
                  user: { image, name, position },
                },
              }: any) => (
                <Box w="270px" color="neutral.1" key={name}>
                  <Card variant="speaker">
                    <CardBody>
                      <Flex gap="5px" p="7px 10px">
                        <Avatar
                          image={image || ""}
                          name={name || "speakerName"}
                        />
                        <Flex direction="column" gap="3px">
                          <h4>{name}</h4>
                          <div className={css({ textStyle: "body.3" })}>
                            {position}
                          </div>
                        </Flex>
                      </Flex>
                    </CardBody>
                  </Card>
                </Box>
              ),
            )}
          </VStack>
          <EventDescription description={description} />
          <HStack gap="15px" color="black">
            {tags.map((tag: any) => (
              <Tag variant="secondary" key={tag}>{`#${tag}`}</Tag>
            ))}
          </HStack>
        </Flex>
      </EventMainInfoLayout>
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
