import { AbsoluteCenter, Container, Flex, Heading } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { FC } from "react";

export const Total: FC = () => {
  const t = useTranslations();
  return (
    <>
      <Container py={5}>
        <Heading fontSize={"xxx-large"}>25</Heading>
        <Heading fontSize={"lg"}>{t("dashboard.main_total")}</Heading>
      </Container>
      <AbsoluteCenter
        as={Flex}
        bg={
          "linear-gradient(90deg, rgba(224, 224, 224, .8) 0%, rgba(224, 224, 224, 1) 70%, rgba(224, 224, 224, 1) 100%)"
        }
        w={"full"}
        h={"full"}
        borderRadius={10}
        justifyContent={"center"}
        alignItems={"center"}
        p={5}
      >
        <Heading fontSize={"sm"} textAlign={"center"} wordBreak={"break-word"}>
          {t("dashboard.main_become_speaker_total")}
        </Heading>
      </AbsoluteCenter>
    </>
  );
};
