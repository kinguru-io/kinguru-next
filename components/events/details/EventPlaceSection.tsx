import { Container, Heading, Image, SimpleGrid } from "@chakra-ui/react";
import { Arrow } from "@egjs/flicking-plugins";
import Flicking, { ViewportSlot } from "@egjs/react-flicking";
import { Stripes } from "@/components/common/stripes";
import { trpc } from "@/utils/trpc.ts";
import { useLocale } from "@/utils/use-locale.ts";

export const EventPlaceSection = ({ eventId }: { eventId: string }) => {
  const { t } = useLocale();
  const { data: place } = trpc.event.getEventPlace.useQuery({
    eventId,
  });

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
      }}
    >
      <Heading variant={"brand"}>{t("events.meeting_place")}</Heading>
      <Stripes />
      <SimpleGrid w={"70%"} mx={"auto"} columns={[1, 2]}>
        <Flicking horizontal={true} circular={true} plugins={[new Arrow()]}>
          {place?.resources.map((photo) => (
            <Image src={photo.url} width={photo.width} height={photo.height} />
          ))}
          <ViewportSlot>
            <span slot="viewport" className="flicking-arrow-prev"></span>
            <span slot="viewport" className="flicking-arrow-next"></span>
          </ViewportSlot>
        </Flicking>
      </SimpleGrid>
    </Container>
  );
};
