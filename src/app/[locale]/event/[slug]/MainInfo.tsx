"use client";
import Image from "next/image";
import { useState } from "react";
import { MdExpandMore } from "react-icons/md";
import {
  Avatar,
  AvatarGroup,
  Button,
  Card,
  CardBody,
  Tag,
  TextCollapse,
} from "@/components/uikit";
import { EventMainInfoLayout } from "@/layout/block/EventMainInfoLayout";
import calendarIcon from "~/public/img/calendar.svg";
import markerIcon from "~/public/img/location.svg";
import timeIcon from "~/public/img/time.svg";
import { css } from "~/styled-system/css";
import { AspectRatio, Box, Flex } from "~/styled-system/jsx";

type MainInfoProps = {
  event: any;
};

export function MainInfo({ event }: MainInfoProps) {
  const [isShown, setIsShown] = useState(false);
  const {
    poster,
    topic,
    starts,
    speakersOnEvent,
    usersOnEvent,
    description,
    tags,
  } = event;

  const mainInfo = [
    {
      iconSrc: calendarIcon.src,
      text: starts.toLocaleDateString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
      altText: "Calendar Icon",
    },
    {
      iconSrc: timeIcon.src,
      text: starts.toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      altText: "Time Icon",
    },
    {
      iconSrc: markerIcon.src,
      text: "addres example",
      altText: "Location Icon",
    },
  ];

  return (
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
            <Flex direction="column" gap="20px" maxW="360px">
              <h3>Основная информация:</h3>
              <Flex direction="column" gap="5px">
                {mainInfo.map(({ iconSrc, text, altText }) => (
                  <Flex gap="15px" align="center" key={altText}>
                    <Image src={iconSrc} alt={altText} width={25} height={25} />
                    <span>{text}</span>
                  </Flex>
                ))}
              </Flex>
            </Flex>
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
            <Button size="lg">Присоединиться</Button>
          </Flex>
        </Flex>
        <Flex direction="column" gap="20px">
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
                        image={image || markerIcon.src}
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
        </Flex>
        <Flex direction="column" gap="20px">
          <h3>Описание мероприятия</h3>
          <Flex maxW="660px" gap="25px" direction="column" align="baseline">
            <TextCollapse
              isShown={isShown}
              textContent={description}
              visibleCharsCount={500}
            />
            <Button
              variant="outline"
              onClick={() => setIsShown(!isShown)}
              iconPosition="right"
              icon={<MdExpandMore fill="neutral.1" />}
            >
              {isShown ? (
                <span className={css({ color: "neutral.1" })}>Меньше</span>
              ) : (
                <span className={css({ color: "neutral.1" })}>Подробнее</span>
              )}
            </Button>
          </Flex>
        </Flex>
        <Flex gap="15px">
          {tags.map((tag: any) => (
            <Tag variant="secondary" key={tag}>{`#${tag}`}</Tag>
          ))}
        </Flex>
      </Flex>
    </EventMainInfoLayout>
  );
}
