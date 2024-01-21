import { Container, Heading } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { FC } from "react";

export const UpcomingEventsCalendar: FC = () => {
  const t = useTranslations();
  return (
    <Container py={5}>
      <Heading fontSize={"lg"}>{t("dashboard.main_upcoming_events")}</Heading>
    </Container>
  );
};
