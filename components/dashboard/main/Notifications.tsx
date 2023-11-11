import { Container, Heading } from "@chakra-ui/react";
import { FC } from "react";
import { useLocale } from "@/utils/use-locale.ts";

export const Notifications: FC = () => {
  const { t } = useLocale();
  return (
    <Container py={5}>
      <Heading fontSize={"lg"}>{t("dashboard.main_notifications")}</Heading>
    </Container>
  );
};
