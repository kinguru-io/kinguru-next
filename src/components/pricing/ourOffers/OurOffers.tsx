import { Container, Heading, Text } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { FC } from "react";
import { Stripes } from "@/components/common/stripes";

export const OurOffers: FC = () => {
  const t = useTranslations();
  return (
    <Container maxW={"full"} bgColor={"#F7F8F9"} pb={16} pt={28} px={0} m={0}>
      <Container maxW={"2xl"}>
        <Heading variant={"brand"}>{t("pricing.our_offers")}</Heading>
        <Stripes mb={"2rem"} />
        <Text mt={3} textAlign={"center"}>
          {t("pricing.choose_optimal")}
        </Text>
      </Container>
    </Container>
  );
};
