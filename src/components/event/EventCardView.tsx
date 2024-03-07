import { Prisma } from "@prisma/client";
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
} from "../uikit";
import { css } from "~/styled-system/css";
import { AspectRatio, Flex, Float, VStack } from "~/styled-system/jsx";
import { visuallyHidden } from "~/styled-system/patterns";

type EventCardViewProps = {
  poster: string;
  topic: string;
  description: string;
  price: number | string;
  usersOnEvent: Prisma.UsersOnEventMaxAggregateOutputType[];
};

export function EventCardView({
  poster,
  topic,
  description,
  price,
  usersOnEvent,
}: EventCardViewProps) {
  return (
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
          <Tag variant="tertiary">{price}</Tag>
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
                avatars={usersOnEvent.map(({ user: { image, name } }: any) => ({
                  name: name || "username",
                  image: image || "",
                }))}
              />
            </VStack>
            <Button size="md">
              <FaRegHeart />
            </Button>
          </Flex>
        </CardFooter>
      </CardInner>
    </Card>
  );
}