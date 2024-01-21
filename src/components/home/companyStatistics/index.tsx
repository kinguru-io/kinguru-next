import {
  Avatar,
  AvatarGroup,
  Container,
  Heading,
  SimpleGrid,
  Skeleton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { Stripes } from "@/components/common/stripes";
import { trpc } from "@/utils/trpc.ts";

export const CompanyStatisticsSection = () => {
  const t = useTranslations();
  const { data: events, status: eventsLoading } =
    trpc.statistics.lastEvents.useQuery();
  const { data: speakers, status: speakersLoading } =
    trpc.statistics.lastSpeakers.useQuery();
  const { data: establishments, status: establishmentsLoading } =
    trpc.statistics.lastEstablishments.useQuery();
  return (
    <Container maxWidth={"full"} py={20} bgColor={"brand.primary"}>
      <SimpleGrid columns={[1, 3]} maxWidth={"5xl"} mx={"auto"}>
        <VStack mb={[10, 0]}>
          <Heading variant={"brand"} fontSize={"5xl"}>
            50+
          </Heading>
          <Stripes color="#fff" mt="30px" mb="30px" />
          <Text textAlign={"center"} fontSize={"3xl"}>
            {t("company_statistics.events_held")}
          </Text>
          <Skeleton isLoaded={eventsLoading !== "loading"}>
            <AvatarGroup my={2}>
              {events?.map(({ id, topic, poster }) => (
                <Avatar
                  key={id}
                  name={topic}
                  border={0}
                  src={poster || undefined}
                />
              ))}
            </AvatarGroup>
          </Skeleton>
        </VStack>
        <VStack mb={[10, 0]}>
          <Heading variant={"brand"} fontSize={"5xl"}>
            100+
          </Heading>
          <Stripes color="#fff" mt="30px" mb="30px" />
          <Text textAlign={"center"} fontSize={"3xl"}>
            {t("company_statistics.speakers")}
          </Text>
          <Skeleton isLoaded={speakersLoading !== "loading"}>
            <AvatarGroup my={2}>
              {speakers?.map(({ id, user: { name, image } }) => (
                <Avatar
                  key={id}
                  name={name || undefined}
                  border={0}
                  src={image || undefined}
                />
              ))}
            </AvatarGroup>
          </Skeleton>
        </VStack>
        <VStack>
          <Heading variant={"brand"} fontSize={"5xl"}>
            150+
          </Heading>
          <Stripes color="#fff" mt="30px" mb="30px" />
          <Text textAlign={"center"} fontSize={"3xl"}>
            {t("company_statistics.connected_establishments")}
          </Text>
          <Skeleton isLoaded={establishmentsLoading !== "loading"}>
            <AvatarGroup my={2}>
              {establishments?.map(({ id, name, resources }) => (
                <Avatar
                  key={id}
                  name={name || undefined}
                  border={0}
                  src={resources[0]?.url || undefined}
                />
              ))}
            </AvatarGroup>
          </Skeleton>
        </VStack>
      </SimpleGrid>
    </Container>
  );
};
