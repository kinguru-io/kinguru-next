import {
  Avatar,
  Badge,
  Box,
  Container,
  Flex,
  Heading,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import "@egjs/react-flicking/dist/flicking-inline.css";
import Link from "next/link";
import { Stripes } from "@/components/common/stripes";
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
          <Flicking>
            {data?.speakersOnEvent.map(({ speaker }) => (
              <Flex
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
                  <Text
                    as={Link}
                    href={`/speakers/${speaker.id}`}
                    fontWeight="bold"
                  >
                    {speaker.user.name}
                    <Badge ml="1">5.00</Badge>
                  </Text>
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
