import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { Stripes } from "@/components/common/stripes";
import { InviteForm } from "@/components/home/invite/inviteForm";

export const InviteSection = () => {
  const t = useTranslations();

  return (
    <Container
      maxWidth={"100%"}
      py={16}
      style={{
        background:
          "#2a2a2a url(/img/parallax-mobile.png) no-repeat center 200px",
        backgroundAttachment: "fixed",
        backgroundSize: "contain",
      }}
    >
      <SimpleGrid
        columns={{ sm: 1, md: 2 }}
        spacing={8}
        maxW="6xl"
        mx={"auto"}
        alignContent={"center"}
      >
        <Box>
          <Heading variant={"invitation"}>{t("invite.title")}</Heading>
          <Stripes />
          <Text
            color={useColorModeValue("gray.100", "gray.700")}
            textAlign={"center"}
          >
            {t("invite.description")}
          </Text>
        </Box>
        <Box>
          <InviteForm />
        </Box>
      </SimpleGrid>
    </Container>
  );
};
