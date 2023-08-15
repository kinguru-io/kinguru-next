import { Container, Heading, SimpleGrid, Skeleton } from "@chakra-ui/react";
import { Stripes } from "@/components/common/stripes";
import { SpeakerCard } from "@/components/home/bestSpeakers/speakerCard";
import { trpc } from "@/utils/trpc";
import { useLocale } from "@/utils/use-locale";

export const BestSpeakersSection = () => {
  const { t } = useLocale();
  const { data: speakers, status } = trpc.speaker.bestSpeakers.useQuery();
  return (
    <Container
      maxWidth={"100%"}
      py={16}
      style={{
        background:
          "#f7f8f9 url(/img/parallax-speakers.png) no-repeat center center",
        backgroundAttachment: "fixed",
        backgroundSize: "contain",
      }}
    >
      <Heading variant={"brand"}>{t("best_speakers.title")}</Heading>
      <Stripes />
      <Skeleton isLoaded={status !== "loading"}>
        <SimpleGrid columns={[1, 3]} maxW={"4xl"} spacing={10} mx={"auto"}>
          {speakers?.map((speaker) => (
            <SpeakerCard key={speaker.id} speaker={speaker} />
          ))}
        </SimpleGrid>
      </Skeleton>
    </Container>
  );
};
