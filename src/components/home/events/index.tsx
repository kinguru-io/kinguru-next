import {
  Container,
  SimpleGrid,
  Skeleton,
  Text,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { EventCard } from "@/components/common/cards/eventCard";
import { Stripes } from "@/components/common/stripes";
import { trpc } from "@/utils/trpc";

export const Events = () => {
  const t = useTranslations();
  const { data: upcomingEvents, status: upcomingStatus } =
    trpc.event.upcoming.useQuery();
  return (
    <>
      <Container maxW="6xl" py={20}>
        <Heading variant={"brand"}>{t("events.upcoming_events")}</Heading>
        <Stripes />
        <Skeleton isLoaded={upcomingStatus === "success"}>
          {!upcomingEvents?.length ? (
            <Text
              color={useColorModeValue("gray.700", "white")}
              fontWeight={400}
              fontSize={"xl"}
              fontFamily={"body"}
              textAlign={"center"}
            >
              {t("events.not_found")}
            </Text>
          ) : (
            <SimpleGrid spacing={4} columns={{ sm: 2, md: 3 }}>
              {upcomingEvents?.map((event) => (
                <EventCard event={event} key={event.id} />
              ))}
            </SimpleGrid>
          )}
        </Skeleton>
      </Container>
    </>
  );
};
