import Image from "next/image";
import { FaRegHeart } from "react-icons/fa";
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
import { EventPopularEventsLayout } from "@/layout/block/EventPoppularEventsLayout";
import { css } from "~/styled-system/css";
import {
  VStack,
  HStack,
  AspectRatio,
  Box,
  Float,
  Flex,
} from "~/styled-system/jsx";
import { visuallyHidden } from "~/styled-system/patterns";

type PopularEventsProps = {
  popularEvents: any;
};

export function PopularEvents({ popularEvents }: PopularEventsProps) {
  return (
    <EventPopularEventsLayout>
      <VStack gap="50px">
        <h2>Популярные события в этой неделе</h2>
        <HStack gap="40px">
          {popularEvents.map((event: any) => (
            <Box w="310px" key={event.topic}>
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
                    src={event.poster}
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
                    <h4>{event.topic}</h4>
                  </CardHeading>
                  <CardBody>
                    <p>{event.description}</p>
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
  );
}
