import { Container, Heading } from "@chakra-ui/react";
import { Stripes } from "@/components/common/stripes";
import { useLocale } from "@/utils/use-locale.ts";

export const EventGuestsSection = () => {
  const { t } = useLocale();
  return (
    <Container
      maxWidth={"100%"}
      py={16}
      px={0}
      style={{
        position: "relative",
        background:
          "#ffd800 url(/img/parallax-speakers.png) no-repeat center center",
        backgroundAttachment: "fixed",
        backgroundSize: "contain",
        color: "white",
      }}
    >
      <Heading variant={"brand"}>{t("events.meeting_guests")}</Heading>
      <Stripes />
    </Container>
  );
};
