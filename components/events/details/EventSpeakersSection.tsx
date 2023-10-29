import {
  Avatar,
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  LinkBox,
  LinkOverlay,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import "@egjs/react-flicking/dist/flicking-inline.css";
import Image from "next/image";
import Link from "next/link";
import { Stripes } from "@/components/common/stripes";
import bigStar from "@/public/img/big_star.png";
import { trpc } from "@/utils/trpc.ts";
import { useLocale } from "@/utils/use-locale.ts";

export const EventSpeakersSection = ({ eventId }: { eventId: string }) => {
  const { t } = useLocale();
  const { data, status } = trpc.event.getEventSpeakers.useQuery({ eventId });
  return (
    <Container
      maxWidth={"100%"}
      py={16}
      px={0}
      style={{
        background:
          "#f7f8f9 url(/img/parallax-speakers.png) no-repeat center center",
        backgroundAttachment: "fixed",
        backgroundSize: "contain",
        marginTop: "-40px",
      }}
    >
      <Skeleton isLoaded={status === "success"}>
        <Heading variant={"brand"}>{t("events.meeting_speakers")}</Heading>
        <Stripes />
        <Stack mx={"auto"} mt={5}>
          <Flicking hideBeforeInit={true}>
            {data?.speakersOnEvent.map(({ speaker }) => (
              <Flex
                as={LinkBox}
                key={speaker.id}
                px={3}
                py={2}
                borderRadius={"xl"}
                border={"1px solid #ccc"}
                ml={5}
                bg={"white"}
              >
                <Avatar src={speaker.user.image || undefined} />
                <Box ml="3">
                  <HStack>
                    <Text fontWeight="bold">
                      <LinkOverlay
                        as={Link}
                        href={speaker.user.website || `/speakers/${speaker.id}`}
                      >
                        {speaker.user.name}
                      </LinkOverlay>
                    </Text>
                    <Image src={bigStar} alt={"rating"} width={16} />
                  </HStack>
                  <Text fontSize="sm">{speaker.user.position}</Text>
                </Box>
              </Flex>
            ))}
          </Flicking>
        </Stack>
      </Skeleton>
    </Container>
  );
};
