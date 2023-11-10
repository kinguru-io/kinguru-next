import { AbsoluteCenter, Container, Flex, Heading } from "@chakra-ui/react";
import { FC } from "react";
import { useLocale } from "@/utils/use-locale.ts";

export const NextEvent: FC = () => {
  const { t } = useLocale();
  return (
    <>
      <Container py={5}>
        <Heading fontSize={"lg"}>{t("dashboard.main_next_event")}</Heading>
      </Container>
      <AbsoluteCenter
        as={Flex}
        bg={
          "linear-gradient(90deg, rgba(212, 212, 212, .8) 0%, rgba(212, 212, 212, 1) 70%, rgba(212, 212, 212, 1) 100%)"
        }
        w={"full"}
        h={"full"}
        borderRadius={10}
        justifyContent={"center"}
        alignItems={"center"}
        p={5}
      >
        <Heading fontSize={"sm"} textAlign={"center"} wordBreak={"break-word"}>
          {t("dashboard.main_become_speaker_next_event")}
        </Heading>
      </AbsoluteCenter>
    </>
  );
};
