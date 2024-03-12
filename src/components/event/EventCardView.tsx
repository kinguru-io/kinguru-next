"use client";

import { Prisma } from "@prisma/client";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { IoShareOutline, IoTimeOutline } from "react-icons/io5";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { useClipboard } from "use-clipboard-copy";
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
  Input,
  Tag,
} from "../uikit";
import { DefaultImage } from "../uikit/DefaultImage/DefaultImage";
import { useSearchBoxCore } from "@/hooks/mapbox/useSearchBoxCore";
import { Link } from "@/navigation";
import textLogo from "~/public/img/defaultImages/eventify-logo-text.svg";
import { css } from "~/styled-system/css";
import { AspectRatio, Flex, Float, VStack } from "~/styled-system/jsx";
import { visuallyHidden } from "~/styled-system/patterns";

type EventCardViewProps = {
  poster: string;
  topic: string;
  description: string;
  price: number | string;
  usersOnEvent: Prisma.UsersOnEventMaxAggregateOutputType[];
  slug: string;
  id: string;
  url: string;
  mapboxId: string;
  starts: Date;
  isLikedAction: Function;
  createLikeAction: Function;
  deleteLikeAction: Function;
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
  url,
  mapboxId,
  starts,
  isLikedAction,
  createLikeAction,
  deleteLikeAction,
}: EventCardViewProps) {
  const clipboard = useClipboard();
  const [placeAddress, setPlaceAddress] = useState("");
  const { retrieve } = useSearchBoxCore({ accessToken });
  const t = useTranslations("event");
  const locale = useLocale();

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
          },
        })}
      >
        <span className={visuallyHidden()}>More</span>
      </Link>
      {poster ? (
        <AspectRatio ratio={16 / 9}>
          <Image src={poster} width={640} height={480} alt="template image" />
          <span className={css({ bgGradient: "cardImage" })} />
        </AspectRatio>
      ) : (
        <DefaultImage />
      )}
      <CardInner>
        <Float placement="top-end" offset="15px" translate="none">
          <Tag variant="tertiary">
            {price === 0 ? t("future_event_page.free") : price}
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
              <Input
                type="text"
                disabled
                value={`${url}/en/events/${slug}`}
                ref={clipboard.target}
              />
              <Button onClick={clipboard.copy} variant="ghost">
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
                  name: name || "username",
                  image: image || textLogo.src,
                }))}
              />
            </VStack>
            <EventLikeButton
              id={id}
              isLikedAction={isLikedAction}
              createLikeAction={createLikeAction}
              deleteLikeAction={deleteLikeAction}
            />
          </Flex>
        </CardFooter>
      </CardInner>
    </Card>
  );
}
