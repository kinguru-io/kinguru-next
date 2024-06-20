"use client";

import { Prisma } from "@prisma/client";
import Image from "next/image";
import { useFormatter, useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { IoShareOutline, IoTimeOutline } from "react-icons/io5";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { EventLikeButton } from "./EventLikeButton";
import {
  AvatarGroup,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeading,
  CardInner,
  Dropdown,
  DropdownInitiator,
  DropdownMenu,
  Tag,
  DefaultImage,
} from "@/components/uikit";
import { useSearchBoxCore } from "@/hooks/mapbox/useSearchBoxCore";
import {
  CreateLikeAction,
  DeleteLikeAction,
  IsLikedAction,
} from "@/lib/actions";
import { Link } from "@/navigation";
import { css } from "~/styled-system/css";
import { AspectRatio, Flex, Float, VStack } from "~/styled-system/jsx";
import { visuallyHidden } from "~/styled-system/patterns";

type EventCardViewProps = {
  poster: string | null;
  topic: string;
  description: string;
  price: number;
  usersOnEvent: Prisma.UsersOnEventMaxAggregateOutputType[];
  slug: string;
  id: string;
  mapboxId: string;
  starts: Date;
  isLikedAction: IsLikedAction;
  createLikeAction: CreateLikeAction;
  deleteLikeAction: DeleteLikeAction;
};

const accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export function EventCardView({
  poster,
  topic,
  description,
  price,
  usersOnEvent,
  slug,
  id,
  mapboxId,
  starts,
  isLikedAction,
  createLikeAction,
  deleteLikeAction,
}: EventCardViewProps) {
  const [placeAddress, setPlaceAddress] = useState("");
  const { retrieve } = useSearchBoxCore({ accessToken });
  const t = useTranslations("event");
  const locale = useLocale();
  const format = useFormatter();

  useEffect(() => {
    retrieve({ mapbox_id: mapboxId }, (data) => {
      const { address } = data.features[0].properties;
      setPlaceAddress(address);
    });
  }, [mapboxId]);

  const mainInfo = [
    {
      icon: <MdOutlineCalendarMonth />,
      text: starts.toLocaleDateString(locale, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
      altText: "Calendar Icon",
    },
    {
      icon: <IoTimeOutline />,
      text: starts.toLocaleTimeString(locale, {
        hour: "2-digit",
        minute: "2-digit",
      }),
      altText: "Time Icon",
    },
    {
      icon: <CiLocationOn />,
      text: placeAddress,
      altText: "Location Icon",
    },
  ];

  return (
    <Card variant="event" data-interactive>
      <Link
        href={`/events/${slug}`}
        className={css({
          _before: {
            content: "''",
            position: "absolute",
            inset: 0,
          },
        })}
      >
        <span className={visuallyHidden()}>More</span>
      </Link>
      <AspectRatio ratio={16 / 9}>
        {poster ? (
          <>
            <Image src={poster} fill alt={topic} />
            <span className={css({ bgGradient: "cardImage" })} />
          </>
        ) : (
          <DefaultImage />
        )}
      </AspectRatio>
      <CardInner>
        <Float placement="top-end" offset="15px" translate="none">
          <Tag variant="tertiary">
            {price === 0 || price === null
              ? t("future_event_page.free")
              : format.number(price, {
                  style: "currency",
                  currency: "PLN",
                })}
          </Tag>
        </Float>
        <Float
          placement="top-end"
          offsetX="15px"
          offsetY="145px"
          translate="none"
        >
          <Dropdown size="lg">
            <DropdownInitiator>
              <IoShareOutline size="14px" />
            </DropdownInitiator>
            <DropdownMenu>
              <Button
                onClick={async () => {
                  const link = `${globalThis.location.origin}/${locale}/events/${slug}`;
                  await navigator.clipboard.writeText(link);
                }}
              >
                {t("event_card.copy_link")}
              </Button>
            </DropdownMenu>
          </Dropdown>
        </Float>
        <CardHeading>
          <h4>{topic}</h4>
        </CardHeading>
        <ul
          className={css({
            display: "flex",
            gap: "19px",
            "& li": {
              display: "flex",
              alignItems: "center",
              gap: "3px",
            },
          })}
        >
          {mainInfo.map(({ altText, text, icon }) => (
            <li key={altText}>
              <span>{icon}</span>
              <span>{text}</span>
            </li>
          ))}
        </ul>
        <CardBody>
          <p>{description}</p>
        </CardBody>

        <CardFooter>
          <Flex alignItems="center" justifyContent="space-between">
            <VStack gap="4px" alignItems="baseline">
              <span className={css({ textStyle: "body.4" })}>
                {t("event_card.already_join")}
              </span>
              <AvatarGroup
                showCount={3}
                avatars={usersOnEvent.map(({ user: { image, name } }: any) => ({
                  name: name,
                  image: image,
                }))}
              />
            </VStack>
            <EventLikeButton
              id={id}
              isLikedAction={isLikedAction}
              createLikeAction={createLikeAction}
              deleteLikeAction={deleteLikeAction}
              likeTranslate={t("future_event_page.like_event")}
              dislikeTranslate={t("future_event_page.dislike_event")}
            />
          </Flex>
        </CardFooter>
      </CardInner>
    </Card>
  );
}
